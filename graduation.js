
/*
  5・6年目の大学生活
  卒業延期・休学留学システム
*/

const extraMonths = [4, 5, 7, 9, 11, 2];

// 単位不足で在学を延長した場合
const repeatYearThemes = [
  [
    "再履修計画",
    "不足単位を確認した。どう履修する？",
    ["必修科目を優先する", {"学業力": 12, "体調": -4}],
    ["無理のない時間割を組む", {"学業力": 6, "体調": 5}]
  ],
  [
    "後輩と同じ教室",
    "再履修の授業に出席する。",
    ["授業と復習を徹底する", {"学業力": 11, "専攻語力": 5}],
    ["後輩と交流する", {"人間関係": 9, "学業力": 4}]
  ],
  [
    "再履修の期末試験",
    "今度こそ単位を取りたい。",
    ["試験勉強に集中する", {"学業力": 14, "体調": -8}],
    ["計画的に復習する", {"学業力": 8, "体調": -2}]
  ],
  [
    "卒業までの道のり",
    "卒業要件を確認する時期だ。",
    ["卒業研究を進める", {"学業力": 12, "専攻語力": 4}],
    ["生活費を確保する", {"資金余裕": 13, "体調": -5}]
  ],
  [
    "もう一度迎える外語祭",
    "新しい後輩とともに外語祭を迎えた。",
    ["後輩の活動を手伝う", {"人間関係": 10, "体調": -4}],
    ["卒業に向けて勉強する", {"学業力": 11, "人間関係": -2}]
  ],
  [
    "卒業をかけた年度末",
    "残りの単位を取得できるだろうか。",
    ["最後まで勉強する", {"学業力": 15, "体調": -7}],
    ["体調を整えて試験に臨む", {"学業力": 7, "体調": 7}]
  ]
];

// 5年目に休学留学する場合
const studyLeaveThemes = [
  [
    "休学留学の開始",
    "新しい国での生活が始まった。",
    ["現地語の勉強に集中する", {"専攻語力": 12, "資金余裕": -5}],
    ["現地の友人を作る", {"人間関係": 10, "専攻語力": 5}]
  ],
  [
    "異文化の壁",
    "文化や習慣の違いを感じる。",
    ["現地の文化を学ぶ", {"専攻語力": 10, "人間関係": 6}],
    ["生活を立て直す", {"体調": 10, "資金余裕": -4}]
  ],
  [
    "留学先での試験",
    "慣れない言語で授業を受けている。",
    ["授業を徹底的に勉強する", {"学業力": 10, "専攻語力": 10}],
    ["友達と一緒に学ぶ", {"学業力": 6, "人間関係": 8}]
  ],
  [
    "海外での夏",
    "せっかくの海外生活。何をする？",
    ["国内を旅する", {"専攻語力": 8, "資金余裕": -12}],
    ["語学の勉強を続ける", {"専攻語力": 13, "学業力": 5}]
  ],
  [
    "現地で築いた人間関係",
    "留学生活も終盤に入った。",
    ["現地の友人との交流を深める", {"人間関係": 12, "専攻語力": 7}],
    ["研究活動に集中する", {"学業力": 13, "専攻語力": 6}]
  ],
  [
    "帰国と復学の準備",
    "海外での経験を振り返る。",
    ["留学の成果をまとめる", {"学業力": 10, "専攻語力": 8}],
    ["最後の交流を楽しむ", {"人間関係": 12, "専攻語力": 5}]
  ]
];

function wantsStudyLeave(game) {
  return (game.eventHistory || []).some(
    item =>
      item.year === 4 &&
      item.turn === 1 &&
      item.choice === "休学留学を選び5年卒業を目指す"
  );
}

function needsFifthYear(game) {
  return (game.credits || 0) < 125 || wantsStudyLeave(game);
}

function isStudyLeaveYear(game) {
  return game.year === 5 &&
         game.extensionReason === "study_leave";
}

function getExtraYearEvent(game) {
  if (game.year !== 5 && game.year !== 6) return null;

  const themes = isStudyLeaveYear(game)
    ? studyLeaveThemes
    : repeatYearThemes;

  const theme = themes[game.turn - 1];
  if (!theme) return null;

  return {
    month: extraMonths[game.turn - 1],
    title: theme[0],
    description: theme[1],
    choices: [
      {text: theme[2][0], effects: theme[2][1]},
      {text: theme[3][0], effects: theme[3][1]},
      {
        text: "休息して体調を整える",
        effects: {"体調": 8, "学業力": -2}
      }
    ]
  };
}

function isGameFinished(game) {
  if (game.gradeNotice) return false;

  if (game.yearFourComplete) {
    return !needsFifthYear(game);
  }

  if (game.yearFiveComplete) {
    return (game.credits || 0) >= 125;
  }

  // 6年目でこのバージョンのゲームは終了
  return !!game.yearSixComplete;
}
