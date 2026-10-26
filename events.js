
const firstYearEvents = [
  {
    month: 4,
    title: "新歓・サークル選び",
    description:
      "東京外国語大学に入学！新しい友達を作る？それとも勉強に集中する？",
    choices: [
      {
        text: "サークルの新歓に積極的に参加する",
        effects: { "人間関係": 10, "体調": -3 }
      },
      {
        text: "専攻語の勉強を始める",
        effects: { "専攻語力": 8, "学業力": 5 }
      },
      {
        text: "アルバイトを始める",
        effects: {
          "資金余裕": 11,
          "人間関係": 2,
          "体調": -5
        }
      }
    ]
  },
  {
    month: 5,
    title: "ボート大会",
    description:
      "大学のボート大会が近づいてきた。どう過ごす？",
    choices: [
      {
        text: "仲間と練習に励む",
        effects: { "人間関係": 7, "体調": 8 }
      },
      {
        text: "友達の応援に行く",
        effects: { "人間関係": 6, "体調": 3 }
      },
      {
        text: "勉強を優先する",
        effects: { "学業力": 9, "人間関係": -4 }
      }
    ]
  },
  {
    month: 7,
    title: "初めての期末試験",
    description:
      "大学で初めての本格的な試験。専攻語の勉強も大変だ。",
    choices: [
      {
        text: "試験勉強に全力を注ぐ",
        effects: {
          "学業力": 10,
          "専攻語力": 6,
          "体調": -8
        }
      },
      {
        text: "無理せず計画的に勉強する",
        effects: {
          "学業力": 6,
          "専攻語力": 3,
          "体調": -2
        }
      },
      {
        text: "勉強より休息を優先する",
        effects: { "体調": 8, "学業力": -7 }
      }
    ]
  },
  {
    month: 9,
    title: "夏休みの過ごし方",
    description:
      "長い夏休み。海外に行く？それとも日本で過ごす？",
    choices: [
      {
        text: "短期留学・海外研修に参加する",
        effects: {
          "専攻語力": 10,
          "人間関係": 5,
          "資金余裕": -12
        }
      },
      {
        text: "アルバイトでお金を貯める",
        effects: { "資金余裕": 15, "体調": -7 }
      },
      {
        text: "専攻語の勉強を続ける",
        effects: {
          "専攻語力": 12,
          "学業力": 5,
          "体調": -3
        }
      }
    ]
  },
  {
    month: 11,
    title: "初めての外語祭",
    description:
      "外語祭が開幕！語科の料理店を成功させたい。",
    choices: [
      {
        text: "料理店の準備に全力投球する",
        effects: {
          "人間関係": 12,
          "専攻語力": 4,
          "体調": -9
        }
      },
      {
        text: "勉強と外語祭を両立する",
        effects: {
          "人間関係": 6,
          "学業力": 6,
          "体調": -4
        }
      },
      {
        text: "お客さんとして外語祭を楽しむ",
        effects: {
          "人間関係": 3,
          "体調": 4,
          "専攻語力": 1
        }
      }
    ]
  },
  {
    month: 2,
    title: "1年目の年度末",
    description:
      "もうすぐ2年生。残りの時間をどう過ごす？",
    choices: [
      {
        text: "最後まで試験勉強を頑張る",
        effects: {
          "学業力": 12,
          "専攻語力": 5,
          "体調": -6
        }
      },
      {
        text: "友人との時間を大切にする",
        effects: {
          "人間関係": 8,
          "体調": 5,
          "学業力": -3
        }
      },
      {
        text: "新しい活動に挑戦する",
        effects: {
          "人間関係": 7,
          "専攻語力": 5,
          "体調": -2
        }
      }
    ]
  }
];


const secondYearEvents = [
  {
    month: 4,
    title: "2年生、新しい挑戦",
    description:
      "語劇の準備が始まる。学業との両立をどうする？",
    choices: [
      {
        text: "語劇の中心メンバーに立候補",
        effects: {
          "人間関係": 10,
          "専攻語力": 6,
          "体調": -6
        }
      },
      {
        text: "裏方として参加する",
        effects: {
          "人間関係": 7,
          "学業力": 3,
          "体調": -2
        }
      },
      {
        text: "授業を優先する",
        effects: {
          "学業力": 10,
          "専攻語力": 4,
          "人間関係": -3
        }
      }
    ]
  },
  {
    month: 5,
    title: "友達からの誘い",
    description:
      "仲のいい友達に旅行へ誘われた。気になる人も参加するらしい。",
    choices: [
      {
        text: "一緒に旅行する",
        effects: {
          "人間関係": 11,
          "資金余裕": -9,
          "体調": 3
        }
      },
      {
        text: "二人で話せる機会を作る",
        effects: {
          "人間関係": 8,
          "体調": -2
        }
      },
      {
        text: "今回は断って勉強する",
        effects: {
          "学業力": 8,
          "人間関係": -4
        }
      }
    ]
  },
  {
    month: 7,
    title: "専門科目と期末試験",
    description:
      "授業の内容が難しくなってきた。成績も気になる。",
    choices: [
      {
        text: "集中して試験対策",
        effects: {
          "学業力": 12,
          "体調": -7
        }
      },
      {
        text: "友達と勉強会を開く",
        effects: {
          "学業力": 7,
          "人間関係": 5
        }
      },
      {
        text: "無理せず体調を整える",
        effects: {
          "体調": 9,
          "学業力": -4
        }
      }
    ]
  },
  {
    month: 9,
    title: "留学への準備",
    description:
      "留学に興味が湧いてきた。語学とお金、どちらも必要だ。",
    choices: [
      {
        text: "派遣留学の学内選考に応募する",        effects: {
          "専攻語力": 12,
          "英語力": 5,
          "体調": -4
        }
      },
      {
        text: "留学資金を貯める",
        effects: {
          "資金余裕": 13,
          "体調": -5
        }
      },
      {
        text: "短期留学に挑戦する",
        effects: {
          "専攻語力": 9,
          "人間関係": 6,
          "資金余裕": -12
        }
      }
    ]
  },
  {
    month: 11,
    title: "外語祭・語劇の本番",
    description:
      "2年生の外語祭。専攻語を使って舞台に挑むチャンス！",
    choices: [
      {
        text: "語劇に全力を注ぐ",
        effects: {
          "専攻語力": 10,
          "人間関係": 12,
          "体調": -10
        }
      },
      {
        text: "裏方で公演を支える",
        effects: {
          "人間関係": 9,
          "学業力": 3,
          "体調": -5
        }
      },
      {
        text: "外語祭を観客として楽しむ",
        effects: {
          "人間関係": 5,
          "体調": 4
        }
      }
    ]
  },
  {
    month: 2,
    title: "2年生の年度末",
    description:
      "将来の進路が少しずつ見えてきた。次に何を優先する？",
    choices: [
      {
        text: "研究分野を探す",
        effects: {
          "学業力": 11,
          "専攻語力": 5
        }
      },
      {
        text: "留学の出願準備を進める",
        effects: {
          "英語力": 8,
          "専攻語力": 6,
          "体調": -3
        }
      },
      {
        text: "友人・恋人との時間を大切にする",
        effects: {
          "人間関係": 12,
          "体調": 5,
          "学業力": -3
        }
      }
    ]
  }
];

const thirdYearEvents = [
  {
    month: 4,
    title: "ゼミ・専門分野の選択",
    description:
      "3年生になった！自分の専門分野をどう深める？",
    choices: [
      {
        text: "興味のある研究に全力を注ぐ",
        effects: {
          "学業力": 12,
          "専攻語力": 5,
          "体調": -5
        }
      },
      {
        text: "語学力の向上を優先する",
        effects: {
          "専攻語力": 11,
          "英語力": 5
        }
      },
      {
        text: "課外活動も積極的に続ける",
        effects: {
          "人間関係": 10,
          "学業力": 4,
          "体調": -5
        }
      }
    ]
  },
  {
    month: 5,
    title: "留学と将来の進路",
    description:
      "留学する友達も増えてきた。自分の将来について考える。",
    choices: [
      {
        text: "留学を目指して準備する",
        effects: {
          "専攻語力": 9,
          "英語力": 8,
          "体調": -4
        }
      },
      {
        text: "就活に向けて情報収集する",
        effects: {
          "学業力": 6,
          "人間関係": 5
        }
      },
      {
        text: "アルバイトで資金を貯める",
        effects: {
          "資金余裕": 14,
          "体調": -7
        }
      }
    ]
  },
  {
    month: 7,
    title: "専門科目の期末試験",
    description:
      "専門科目が本格化。良い成績を残せるだろうか？",
    choices: [
      {
        text: "徹底的に試験対策する",
        effects: {
          "学業力": 13,
          "体調": -8
        }
      },
      {
        text: "友達と勉強する",
        effects: {
          "学業力": 8,
          "人間関係": 6
        }
      },
      {
        text: "無理せず休息を取る",
        effects: {
          "体調": 10,
          "学業力": -5
        }
      }
    ]
  },
  {
    month: 9,
    title: "夏の挑戦",
    description:
      "海外経験を積む？インターン？それとも研究を進める？",
    choices: [
      {
        text: "海外で語学を学ぶ",
        effects: {
          "専攻語力": 13,
          "人間関係": 5,
          "資金余裕": -12
        }
      },
      {
        text: "インターンシップに参加する",
        effects: {
          "学業力": 7,
          "人間関係": 9,
          "体調": -5
        }
      },
      {
        text: "卒業研究の準備を始める",
        effects: {
          "学業力": 12,
          "専攻語力": 5
        }
      }
    ]
  },
  {
    month: 11,
    title: "3年目の外語祭",
    description:
      "外語祭にも慣れてきた。今年はどう参加しよう？",
    choices: [
      {
        text: "後輩の企画を全力で支える",
        effects: {
          "人間関係": 12,
          "体調": -7
        }
      },
      {
        text: "友達と外語祭を楽しむ",
        effects: {
          "人間関係": 8,
          "体調": 5
        }
      },
      {
        text: "研究・勉強を優先する",
        effects: {
          "学業力": 11,
          "人間関係": -4
        }
      }
    ]
  },
  {
    month: 2,
    title: "進路の分岐点",
    description:
      "3年生も終わり。就職、大学院、留学……自分の道を考える。",
    choices: [
      {
        text: "就職活動の準備を始める",
        effects: {
          "英語力": 7,
          "学業力": 7,
          "体調": -4
        }
      },
      {
        text: "大学院進学を目指して研究する",
        effects: {
          "学業力": 13,
          "専攻語力": 6,
          "体調": -5
        }
      },
      {
        text: "友人との時間を大切にする",
        effects: {
          "人間関係": 12,
          "体調": 7
        }
      }
    ]
  }
];

const fourthYearEvents = [
  {
    month: 4,
    title: "卒業後の進路選択",
    description:
      "いよいよ4年生。就職する？大学院に進学する？",
    choices: [
      {
        text: "民間企業への就職を目指す",
        effects: {
          "英語力": 8,
          "人間関係": 5,
          "体調": -5
        }
      },
      {
        text: "大学院進学を目指す",
        effects: {
          "学業力": 12,
          "専攻語力": 5,
          "体調": -5
        }
      },
      {
        text: "海外で働く道を探す",
        effects: {
          "英語力": 10,
          "専攻語力": 8,
          "資金余裕": -5
        }
           },
{
  text: "休学留学を選び5年卒業を目指す",
  effects: {
    "専攻語力": 6,
    "英語力": 4,
    "資金余裕": -8
  }
}
    ]
  },
  {
    month: 5,
    title: "将来への挑戦",
    description:
      "就活や大学院入試が近づいてきた。どんな準備をする？",
    choices: [
      {
        text: "面接・就活対策に集中する",
        effects: {
          "英語力": 7,
          "人間関係": 7,
          "体調": -6
        }
      },
      {
        text: "大学院入試の勉強をする",
        effects: {
          "学業力": 13,
          "専攻語力": 5,
          "体調": -7
        }
      },
      {
        text: "自分の興味を優先して活動する",
        effects: {
          "人間関係": 8,
          "専攻語力": 5,
          "体調": 3
        }
      }
    ]
  },
  {
    month: 7,
    title: "最後の重要な試験",
    description:
      "卒業に必要な単位を確保したい。試験期間をどう過ごす？",
    choices: [
      {
        text: "試験勉強に全力を注ぐ",
        effects: {
          "学業力": 15,
          "専攻語力": 5,
          "体調": -10
        }
      },
      {
        text: "計画的に勉強する",
        effects: {
          "学業力": 8,
          "体調": -2
        }
      },
      {
        text: "就活や研究を優先する",
        effects: {
          "英語力": 8,
          "学業力": -6,
          "人間関係": 5
        }
      }
    ]
  },
  {
    month: 9,
    title: "卒業研究と海外経験",
    description:
      "大学生活も残り半年。最後に何を頑張る？",
    choices: [
      {
        text: "卒業研究に集中する",
        effects: {
          "学業力": 15,
          "専攻語力": 6,
          "体調": -7
        }
      },
      {
        text: "海外旅行・短期留学に行く",
        effects: {
          "専攻語力": 12,
          "英語力": 6,
          "資金余裕": -15
        }
      },
      {
        text: "アルバイトで貯金する",
        effects: {
          "資金余裕": 15,
          "体調": -5
        }
      }
    ]
  },
  {
    month: 11,
    title: "最後の外語祭",
    description:
      "学生生活最後の外語祭。どのように参加する？",
    choices: [
      {
        text: "後輩の活動を全力で支える",
        effects: {
          "人間関係": 13,
          "体調": -6
        }
      },
      {
        text: "友達と最後の外語祭を満喫する",
        effects: {
          "人間関係": 11,
          "体調": 5,
          "資金余裕": -5
        }
      },
      {
        text: "卒業研究に集中する",
        effects: {
          "学業力": 12,
          "人間関係": -4
        }
      }
    ]
  },
  {
    month: 2,
    title: "大学生活最後の選択",
    description:
      "東京外国語大学で過ごした4年間も終わり。最後の時間をどう使う？",
    choices: [
      {
        text: "最後まで勉強を頑張る",
        effects: {
          "学業力": 12,
          "専攻語力": 8,
          "体調": -6
        }
      },
      {
        text: "友達との思い出を作る",
        effects: {
          "人間関係": 15,
          "体調": 7,
          "資金余裕": -7
        }
      },
      {
        text: "将来のための準備を進める",
        effects: {
          "英語力": 10,
          "学業力": 7,
          "体調": -5
        }
      }
    ]
  }
];

// ステータスを0〜100に制限
function clampStat(value) {
  return Math.max(0, Math.min(100, value));
}

// 現在の学年に対応するイベント



function currentEvent(game) {
  // 5・6年目は追加イベント
  if (game.year === 5 || game.year === 6) {
    return getExtraYearEvent(game);
  }

  const eventLists = {
    1: firstYearEvents,
    2: secondYearEvents,
    3: thirdYearEvents,
    4: fourthYearEvents
  };

  const list = eventLists[game.year] || [];

  return getAbroadEvent(game) ||
         list[game.turn - 1] ||
         null;
}
// 学期末のGPA・単位計算

function assessSemester(game) {
  game.semesterRecords ||= [];

  const term = game.turn === 3 ? "春学期" : "秋学期";
  const key = `${game.year}-${term}`;

  // 二重計算を防止
  if (game.semesterRecords.some(r => r.key === key)) {
    return;
  }
  // 休学留学中は通常の国内授業成績を計算しない
  if (isStudyLeaveYear(game)) {
    return;
  }

  const s = game.stats;

  // 各学期の履修単位数（ゲーム内の仮設定）
  const courseLoads = [
  22, 22, 22, 22,
  20, 20, 18, 18,
  16, 16,
  14, 14
];
  const index = (game.year - 1) * 2
    + (game.turn === 3 ? 0 : 1);

  const registered = courseLoads[index];
const coursePlan = makeSemesterPlan(game, registered);
const categoryCredits = {};

  let remaining = registered;
  let earned = 0;
  let gradePoints = 0;

  // 東京外大の成績評価基準
  function getGP(score) {
    if (score >= 90) return 4.0;
    if (score >= 87) return 3.7;
    if (score >= 83) return 3.3;
    if (score >= 80) return 3.0;
    if (score >= 77) return 2.7;
    if (score >= 73) return 2.3;
    if (score >= 70) return 2.0;
    if (score >= 67) return 1.7;
    if (score >= 63) return 1.3;
    if (score >= 60) return 1.0;
    return 0;
  }

 
// 科目ごとに成績と単位を決定
while (remaining > 0) {
  const course = coursePlan.find(
    part => part.remaining > 0
  );

  if (!course) {
    throw new Error("履修計画の単位数が一致しません");
  }

  const credits = course.name === "卒業研究"
    ? course.remaining
    : course.remaining >= 2 && Math.random() < 0.7
      ? 2 : 1;

  course.remaining -= credits;

  const baseScore =
    70 +
    (s["学業力"] - 50) * 0.18 +
    (s["専攻語力"] - 50) * 0.10 +
    (s["体調"] - 50) * 0.04;

  const score = Math.max(0, Math.min(100,
    Math.round(
      baseScore +
      randomNumber(-18, 18) +
      randomNumber(-7, 7)
    )
  ));

  const gp = getGP(score);

  if (score >= 60) {
    earned += credits;

    categoryCredits[course.name] =
      (categoryCredits[course.name] || 0) + credits;
  }

  gradePoints += gp * credits;
  remaining -= credits;
}

  const gpa = Math.round(
    gradePoints / registered * 100
  ) / 100;

  game.semesterRecords.push({
  key,
  year: game.year,
  term,
  registeredCredits: registered,
  earned,
  gradePoints,
  gpa,
  categoryCredits
});
  // 累計取得単位
  game.credits = game.semesterRecords.reduce(
    (sum, r) => sum + r.earned, 0
  );

  // 単位数で加重した累積GPA
  // 旧形式のセーブも暫定的に読み込める
  let totalPoints = 0;
  let totalRegistered = 0;

  game.semesterRecords.forEach(r => {
    const units = r.registeredCredits ?? r.earned;
    totalRegistered += units;
    totalPoints += r.gradePoints ?? r.gpa * units;
  });

  game.gpa = totalRegistered > 0
    ? Math.round(
        totalPoints / totalRegistered * 100
      ) / 100
    : null;

  game.gradeNotice = {
    year: game.year,
    term,
    gpa,
    earned
  };
}

 
// イベントの選択
function chooseEvent(choiceIndex) {
  const game = loadGame();

  
  if (
    !game ||
    game.pendingResult ||
    game.gradeNotice ||
    game.yearOneComplete ||
    game.yearTwoComplete ||
    game.yearThreeComplete ||
    game.yearFourComplete ||
    game.yearFiveComplete ||
    game.yearSixComplete
  ) {
    return;
  }

  const event = currentEvent(game);
  const choice = event?.choices[choiceIndex];

  if (!choice) return;

  const changes = {};

  function changeStat(name, amount) {
    const before = game.stats[name];

    game.stats[name] = clampStat(before + amount);

    changes[name] =
      (changes[name] || 0) + game.stats[name] - before;
  }

  // 選択によるステータス変化
  Object.entries(choice.effects).forEach(([name, amount]) => {
    changeStat(name, amount);
  });

  // ランダムイベント
  const roll = Math.random();
  const luckStat = Object.keys(choice.effects)[0];

  let luck = "特別な出来事は起こらなかった。";

  if (roll < 0.25) {
    changeStat(luckStat, 4);
    luck = "幸運！予想以上にうまくいった！";
  } else if (roll < 0.5) {
    changeStat(luckStat, -3);
    luck = "少し運が悪かったようだ……。";
  }

  
// 留学の応募・選考・帰国を処理
const abroadMessage = updateAbroadProgress(game, choice.text);

if (abroadMessage) {
  luck += " " + abroadMessage;
}

game.pendingResult = {
  choice: choice.text,
  changes,
  luck
};

  game.eventHistory ||= [];

  game.eventHistory.push({
    year: game.year,
    turn: game.turn,
    event: event.title,
    choice: choice.text,
    changes
  });

  saveGame(game);
  renderGame(game);
}

// イベント画面の表示

function getCareerEnding(game) {
  const history = game.eventHistory || [];

  const careerChoice = history.find(
    item => item.year === 4 && item.turn === 1
  )?.choice;

  const s = game.stats;
  const gpa = game.gpa ?? 2;

  let score = 0;

  if (careerChoice === "民間企業への就職を目指す") {
    score =
      s["英語力"] * 0.35 +
      s["人間関係"] * 0.30 +
      s["学業力"] * 0.20 +
      s["専攻語力"] * 0.15 +
      gpa * 5;

    if (score >= 100) {
      return "大手企業への内定を獲得！";
    } else if (score >= 75) {
      return "企業から内定を獲得！";
    } else {
      return "就職活動は継続中。";
    }
  }

  if (careerChoice === "大学院進学を目指す") {
    score =
      s["学業力"] * 0.45 +
      s["専攻語力"] * 0.35 +
      s["英語力"] * 0.20 +
      gpa * 5;

    if (score >= 100) {
      return "難関大学院に合格！";
    } else if (score >= 75) {
      return "大学院に合格！";
    } else {
      return "大学院入試への再挑戦を決意。";
    }
  }

  if (careerChoice === "海外で働く道を探す") {
    score =
      s["英語力"] * 0.50 +
      s["専攻語力"] * 0.35 +
      s["人間関係"] * 0.15 +
      gpa * 5;

    if (score >= 100) {
      return "海外企業への就職に成功！";
    } else if (score >= 75) {
      return "海外で働くチャンスを獲得！";
    } else {
      return "海外就職を目指して挑戦を続ける。";
    }
  }

  return "卒業後の進路はまだ決まっていない。";
}


function renderEvent(game) {
  const number = document.getElementById("event-number");
  const title = document.getElementById("event-title");
  const description = document.getElementById("event-description");
  const buttons = document.getElementById("choice-buttons");
  const result = document.getElementById("event-result");
  const next = document.getElementById("next-button");
  const turnLabel = document.getElementById("turn-label");

  buttons.replaceChildren();
  buttons.hidden = false;
  result.hidden = true;
  next.hidden = true;

  // 成績発表
  if (game.gradeNotice) {
    const r = game.gradeNotice;

    number.textContent = "成績発表";
    title.textContent = `${r.year}年次・${r.term}`;
    description.textContent =
      `学期GPA：${r.gpa.toFixed(2)} / 4.0、` +
      `取得単位：${r.earned}単位`;

    buttons.hidden = true;
    next.textContent = "次へ進む";
    next.hidden = false;
    return;
  }

  // 学年終了の判定
  const endYear =
    game.yearSixComplete ? 6 :
    game.yearFiveComplete ? 5 :
    game.yearFourComplete ? 4 :
    game.yearThreeComplete ? 3 :
    game.yearTwoComplete ? 2 :
    game.yearOneComplete ? 1 : 0;

  if (endYear > 0) {
    buttons.hidden = true;
    turnLabel.textContent = `${endYear}年目終了`;

    const credits = game.credits || 0;

    // 本当にゲームが終了する場合
    if (isGameFinished(game)) {
      number.textContent = "FINAL RESULT";

      title.textContent = credits >= 125
        ? `${endYear}年で卒業！`
        : "卒業要件がまだ足りない";

      description.textContent = credits >= 125
        ? `${credits}単位を取得して大学を卒業した。`
        : `6年目が終了したが、取得単位は${credits}単位。` +
          "このバージョンではここで終了します。";

      return;
    }

    // 単位不足・休学留学による5年目
    if (endYear === 4) {
      number.textContent = "GRADUATION EXTENSION";
      title.textContent = "5年目の大学生活へ";

      description.textContent = wantsStudyLeave(game)
        ? "休学留学を選んだため、5年目に海外生活を送る。"
        : `現在${credits}単位。125単位まで不足しているため、再履修に挑戦する。`;

      next.textContent = "5年目へ進む";
      next.hidden = false;
      return;
    }

    // 5年目でも卒業できない場合
    if (endYear === 5) {
      number.textContent = "GRADUATION EXTENSION";
      title.textContent = "6年目の大学生活へ";
      description.textContent =
        `現在${credits}単位。卒業要件を満たすため、もう1年頑張ろう。`;

      next.textContent = "6年目へ進む";
      next.hidden = false;
      return;
    }

    // 1〜3年目の進級
    number.textContent = `YEAR ${endYear} COMPLETE`;
    title.textContent = `${endYear}年目終了！`;
    description.textContent =
      `${endYear + 1}年生に進もう。`;

    next.textContent = `${endYear + 1}年生へ進む`;
    next.hidden = false;
    return;
  }

  // 通常イベント
  const event = currentEvent(game);

  if (!event) {
    number.textContent = "";
    title.textContent = "イベントが見つかりません";
    description.textContent = "";
    buttons.hidden = true;
    return;
  }

  turnLabel.textContent =
    `${game.year}年目・${event.month}月`;

  number.textContent =
    `EVENT ${(game.year - 1) * 6 + game.turn} / ` +
    (game.year >= 5 ? "36" : "24");

  title.textContent = event.title;
  description.textContent = event.description;

  // 行動を選択した直後
  if (game.pendingResult) {
    buttons.hidden = true;
    result.hidden = false;

    document.getElementById("result-choice").textContent =
      `選んだ行動：${game.pendingResult.choice}`;

    const changes = Object.entries(game.pendingResult.changes)
      .filter(([, amount]) => amount !== 0)
      .map(([name, amount]) =>
        `${name} ${amount > 0 ? "+" : ""}${amount}`
      );

    document.getElementById("result-effects").textContent =
      changes.length
        ? changes.join(" / ")
        : "ステータスの変化なし";

    document.getElementById("result-luck").textContent =
      game.pendingResult.luck;

    if (
      (game.turn === 3 || game.turn === 6) &&
      !isStudyLeaveYear(game)
    ) {
      next.textContent = "学期末の成績を確認";
    } else {
      next.textContent = "次のイベントへ";
    }

    next.hidden = false;
    return;
  }

  // 選択肢ボタン
  event.choices.forEach((choice, index) => {
    const button = document.createElement("button");

    button.className = "choice-button";
    button.textContent = choice.text;

    button.addEventListener("click", () => {
      chooseEvent(index);
    });

    buttons.appendChild(button);
  });
}


// 次のイベントへ
document.getElementById("next-button")
  .addEventListener("click", () => {
    const game = loadGame();

    if (!game || isGameFinished(game)) return;

    // 成績発表を閉じる
    if (game.gradeNotice) {
      game.gradeNotice = null;

    // 学年終了後、次の学年へ
    } else if (
      game.yearOneComplete ||
      game.yearTwoComplete ||
      game.yearThreeComplete ||
      game.yearFourComplete ||
      game.yearFiveComplete
    ) {
      const flags = [
        "yearOneComplete",
        "yearTwoComplete",
        "yearThreeComplete",
        "yearFourComplete",
        "yearFiveComplete"
      ];

      const index = flags.findIndex(flag => game[flag]);
      if (index === -1) return;

      const completedYear = index + 1;

      if (completedYear === 4) {
        game.extensionReason = wantsStudyLeave(game)
          ? "study_leave"
          : "credit_shortfall";
      }

      if (completedYear === 5) {
        game.extensionReason = "credit_shortfall";
      }

      game[flags[index]] = false;
      game.year = completedYear + 1;
      game.turn = 1;

    // 選択結果から次へ
    } else if (game.pendingResult) {

      if (
        (game.turn === 3 || game.turn === 6) &&
        !isStudyLeaveYear(game)
      ) {
        assessSemester(game);
      }

      game.pendingResult = null;

      if (game.turn === 6) {
        const completionFlags = {
          1: "yearOneComplete",
          2: "yearTwoComplete",
          3: "yearThreeComplete",
          4: "yearFourComplete",
          5: "yearFiveComplete",
          6: "yearSixComplete"
        };

        if (isStudyLeaveYear(game)) {
          game.studyLeaveCompleted = true;
        }

        game[completionFlags[game.year]] = true;

      } else {
        game.turn += 1;
      }

    } else {
      return;
    }

    saveGame(game);
    renderGame(game);
  });
