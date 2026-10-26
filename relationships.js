
const relationshipMoments = {
  "1-2": {
    title: "ボート大会後の交流",
    description: "語科の仲間と親しくなるチャンス。誰と時間を過ごす？"
  },
  "1-5": {
    title: "初めての外語祭の夜",
    description: "外語祭が終わった。思い出を誰と共有する？"
  },
  "2-2": {
    title: "2年生の休日",
    description: "新しい友達も増えてきた。休日の予定を決めよう。"
  },
  "2-5": {
    title: "語劇の打ち上げ",
    description: "語劇の本番が終わった。今日は特別な夜になりそう。"
  },
  "3-2": {
    title: "進路と人間関係",
    description: "忙しくなってきた大学生活。大切な人との時間はどうする？"
  },
  "3-5": {
    title: "気持ちを伝える秋",
    description: "外語祭の季節。気になる人との関係を進めるチャンス。"
  },
  "4-2": {
    title: "卒業前の大切な人",
    description: "卒業が近づく前に、自分の気持ちを整理したい。"
  },
  "4-5": {
    title: "最後の外語祭の思い出",
    description: "4年間で築いた関係を振り返ろう。"
  }
};

function ensureRelationships(game) {
  if (!game.relationships || typeof game.relationships !== "object") {
    game.relationships = {
      friendship: 25,
      romance: 0,
      dating: false,
      played: [],
      last: null
    };
  }
  const r = game.relationships;
  if (!Array.isArray(r.played)) r.played = [];
  return r;
}

function relationshipStatus(r) {
  if (r.dating) return "交際中：大切な恋人がいる";
  if (r.romance >= 40) return "恋愛：気になる人とかなり親しくなった";
  if (r.romance >= 15) return "恋愛：気になる人がいる";
  return "恋愛：まだ特別な相手はいない";
}

function relationshipChoices(game, key) {
  const r = ensureRelationships(game);
  const choices = [
    { type: "friend", label: "友達と過ごす（友情＋12）" },
    {
      type: "romance",
      label: r.dating
        ? "恋人と時間を過ごす（恋愛＋10）"
        : "気になる人と話す（恋愛＋14）"
    },
    { type: "rest", label: "自分の時間を楽しむ（体調＋7）" }
  ];

  if (
    (key === "3-5" || key === "4-2") &&
    !r.dating &&
    r.romance >= 35
  ) {
    choices.splice(2, 0, {
      type: "confess",
      label: "思い切って告白する（成功判定あり）"
    });
  }
  return choices;
}

function chooseRelationshipAction(type) {
  const game = loadGame();
  if (!game || game.yearFourComplete || game.gradeNotice) return;

  const key = `${game.year}-${game.turn}`;
  if (!relationshipMoments[key]) return;

  const r = ensureRelationships(game);
  if (r.played.includes(key)) return;
  if (!relationshipChoices(game, key).some(c => c.type === type)) return;

  let message;

  if (type === "friend") {
    r.friendship = Math.min(100, r.friendship + 12);
    game.stats["人間関係"] =
      Math.min(100, game.stats["人間関係"] + 3);
    message = "友達と楽しい時間を過ごした。絆が深まった！";

  } else if (type === "romance") {
    r.romance = Math.min(100, r.romance + (r.dating ? 10 : 14));
    game.stats["人間関係"] =
      Math.min(100, game.stats["人間関係"] + 2);
    message = r.dating
      ? "恋人との思い出が増えた！"
      : "気になる人との距離が縮まった！";

  } else if (type === "rest") {
    game.stats["体調"] =
      Math.min(100, game.stats["体調"] + 7);
    message = "自分の時間を楽しんでリフレッシュできた！";

  } else if (type === "confess") {
    const chance = Math.min(0.9, 0.3 + r.romance / 120);

    if (Math.random() < chance) {
      r.dating = true;
      r.romance = Math.min(100, r.romance + 15);
      message = "告白成功！恋人ができた！";
    } else {
      r.romance = Math.max(0, r.romance - 8);
      message = "告白したけれど、今回は想いが届かなかった。";
    }
  }

  r.played.push(key);
  r.last = { key, message };

  saveGame(game);
  renderGame(game);
}

function renderRelationshipPanel(game) {
  const r = ensureRelationships(game);
  const panel = document.getElementById("relationship-panel");
  const eventBox = document.getElementById("relationship-event");
  const options = document.getElementById("relationship-options");
  const message = document.getElementById("relationship-message");
  const key = `${game.year}-${game.turn}`;
  const moment = relationshipMoments[key];

  panel.hidden = false;
  document.getElementById("friendship-value").textContent = r.friendship;
  document.getElementById("romance-value").textContent = r.romance;
  document.getElementById("relationship-status").textContent =
    relationshipStatus(r);

  eventBox.hidden = true;
  message.hidden = true;
  options.replaceChildren();

  // 卒業時の人間関係エンディング
  if (game.yearFourComplete) {
    const friends = r.friendship >= 65
      ? "一生の友人ができた"
      : r.friendship >= 40
        ? "気の合う友人ができた"
        : "自分のペースで人間関係を築いた";

    message.textContent =
      `4年間の結果：${friends}。` +
      (r.dating
        ? "恋人と卒業を迎えた。"
        : "恋愛はこれからの可能性を残した。");
    message.hidden = false;
    return;
  }

  if (!moment) return;

  // 同じイベントの二重実行を防止
  if (r.played.includes(key)) {
    if (r.last?.key === key) {
      message.textContent = r.last.message;
      message.hidden = false;
    }
    return;
  }

  if (
    game.gradeNotice ||
    game.yearOneComplete ||
    game.yearTwoComplete ||
    game.yearThreeComplete
  ) return;

  eventBox.hidden = false;
  document.getElementById("relationship-event-title").textContent =
    moment.title;
  document.getElementById("relationship-event-description").textContent =
    moment.description;

  relationshipChoices(game, key).forEach(choice => {
    const button = document.createElement("button");
    button.className = "relationship-choice";
    button.textContent = choice.label;
    button.addEventListener("click", () => {
      chooseRelationshipAction(choice.type);
    });
    options.appendChild(button);
  });
}
