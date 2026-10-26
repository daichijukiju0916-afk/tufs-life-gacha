
const abroadSpecialEvents = {
  departure: {
    month: 9,
    title: "長期派遣留学への出発",
    description:
      "学内選考に合格した！いよいよ海外へ。留学に出発する？",
    choices: [
      {
        text: "派遣留学に出発する",
        effects: {
          "専攻語力": 8,
          "英語力": 4,
          "資金余裕": -10
        }
      },
      {
        text: "留学を辞退して国内に残る",
        effects: {
          "学業力": 7,
          "資金余裕": 5
        }
      }
    ]
  },

  november: {
    month: 11,
    title: "留学先での生活",
    description:
      "現地での生活にも慣れてきた。何に力を入れる？",
    choices: [
      {
        text: "現地の友人を積極的に作る",
        effects: {
          "専攻語力": 10,
          "人間関係": 12
        }
      },
      {
        text: "大学の授業に集中する",
        effects: {
          "専攻語力": 12,
          "学業力": 10,
          "体調": -5
        }
      },
      {
        text: "現地の文化を体験する",
        effects: {
          "専攻語力": 8,
          "人間関係": 6,
          "資金余裕": -6
        }
      }
    ]
  },

  february: {
    month: 2,
    title: "留学先での試験",
    description:
      "慣れない言語での試験。どう乗り越える？",
    choices: [
      {
        text: "試験勉強に全力を注ぐ",
        effects: {
          "学業力": 13,
          "専攻語力": 8,
          "体調": -8
        }
      },
      {
        text: "現地の友人と勉強する",
        effects: {
          "学業力": 8,
          "専攻語力": 8,
          "人間関係": 6
        }
      },
      {
        text: "体調を整えながら勉強する",
        effects: {
          "学業力": 5,
          "体調": 8
        }
      }
    ]
  },

  april: {
    month: 4,
    title: "留学先から将来を考える",
    description:
      "4年生になった。海外にいながら卒業後の進路を考える。",
    choices: [
      {
        text: "民間企業への就職を目指す",
        effects: {
          "英語力": 8,
          "人間関係": 5
        }
      },
      {
        text: "大学院進学を目指す",
        effects: {
          "学業力": 12,
          "専攻語力": 5
        }
      },
      {
        text: "海外で働く道を探す",
        effects: {
          "英語力": 10,
          "専攻語力": 8
        }
      }
    ]
  },

  may: {
    month: 5,
    title: "留学生活の後半",
    description:
      "帰国まであと少し。現地での時間をどう過ごす？",
    choices: [
      {
        text: "専門科目をさらに勉強する",
        effects: {
          "学業力": 12,
          "専攻語力": 6
        }
      },
      {
        text: "現地の友人と交流する",
        effects: {
          "人間関係": 10,
          "専攻語力": 9
        }
      },
      {
        text: "将来の進路準備を進める",
        effects: {
          "英語力": 8,
          "学業力": 7
        }
      }
    ]
  },

  returnHome: {
    month: 7,
    title: "留学終了・日本へ帰国",
    description:
      "約10か月の留学生活が終了。最後に何をする？",
    choices: [
      {
        text: "学業の成果を整理する",
        effects: {
          "学業力": 10,
          "専攻語力": 5
        }
      },
      {
        text: "現地の友人と思い出を作る",
        effects: {
          "人間関係": 12,
          "専攻語力": 6
        }
      },
      {
        text: "語学力を最後まで磨く",
        effects: {
          "専攻語力": 13,
          "英語力": 5
        }
      }
    ]
  }
};

// 留学状況によってイベントを変更
function getAbroadEvent(game) {
  const status = game.abroad?.status;
  const key = `${game.year}-${game.turn}`;

  // 合格後の出発イベント
  if (
    key === "3-4" &&
    ["accepted", "abroad", "declined"].includes(status)
  ) {
    return abroadSpecialEvents.departure;
  }

  // 帰国直後の結果表示にも対応
  if (
    key === "4-3" &&
    status === "returned"
  ) {
    return abroadSpecialEvents.returnHome;
  }

  if (status !== "abroad") return null;

  const events = {
    "3-5": abroadSpecialEvents.november,
    "3-6": abroadSpecialEvents.february,
    "4-1": abroadSpecialEvents.april,
    "4-2": abroadSpecialEvents.may,
    "4-3": abroadSpecialEvents.returnHome
  };

  return events[key] || null;
}

// 応募・合否・出発・帰国の状態管理
function updateAbroadProgress(game, choiceText) {
  const key = `${game.year}-${game.turn}`;
  const status = game.abroad?.status;

  // 2年9月：学内選考に応募
  if (
    key === "2-4" &&
    choiceText === "派遣留学の学内選考に応募する"
  ) {
    if ((game.gpa ?? 0) < 2.0) {
      game.abroad = { status: "ineligible" };
      return "GPAが2.0未満のため応募できなかった。";
    }

    game.abroad = { status: "applied" };
    return "学内選考に応募した！結果は2年生の2月に発表される。";
  }

  // 2年2月：合否発表
  if (key === "2-6" && status === "applied") {
    const s = game.stats;
    const gpa = game.gpa ?? 0;

    // ゲーム独自の選考確率
    const chance = Math.min(0.9, Math.max(0.15,
      0.30 +
      (gpa - 2) * 0.16 +
      (s["専攻語力"] + s["英語力"] - 100) * 0.003
    ));

    const passed = Math.random() < chance;

    game.abroad.status = passed ? "accepted" : "rejected";

    return passed
      ? "派遣留学の学内選考に合格！3年9月に渡航できる。"
      : "残念ながら学内選考は不合格だった。";
  }

  // 3年9月：渡航または辞退
  if (key === "3-4" && status === "accepted") {
    if (choiceText === "派遣留学に出発する") {
      game.abroad.status = "abroad";
      return "海外生活が始まった！現地での挑戦が待っている。";
    }

    game.abroad.status = "declined";
    return "留学を辞退し、日本での大学生活を続ける。";
  }

  // 4年7月：帰国
  if (key === "4-3" && status === "abroad") {
    game.abroad.status = "returned";
    game.abroad.completed = true;
    return "長期派遣留学を修了し、日本へ帰国した！";
  }

  return "";
}
