
const STORAGE_KEY = "tufs-life-gacha-v2";

// 学部ごとの専攻データ
const facultyData = {
  "言語文化学部": {
    label: "専攻言語",
    majors: [
      "英語",
      "ドイツ語",
      "ポーランド語",
      "チェコ語",
      "フランス語",
      "イタリア語",
      "スペイン語",
      "ポルトガル語",
      "ロシア語",
      "ロシア語およびウズベク語",
      "モンゴル語",
      "中国語",
      "朝鮮語",
      "インドネシア語",
      "マレーシア語",
      "フィリピン語",
      "タイ語",
      "ラオス語",
      "ベトナム語",
      "カンボジア語",
      "ビルマ語",
      "ウルドゥー語",
      "ヒンディー語",
      "ベンガル語",
      "アラビア語",
      "ペルシア語",
      "トルコ語"
    ]
  },

  "国際社会学部": {
    label: "専攻地域",
    majors: [
      "北西ヨーロッパ・北アメリカ",
      "中央ヨーロッパ",
      "西南ヨーロッパ",
      "イベリア・ラテンアメリカ",
      "ロシア",
      "中央アジア",
      "東アジア",
      "東南アジア第1（島嶼部）",
      "東南アジア第2（大陸部）",
      "南アジア",
      "中東",
      "アフリカ",
      "オセアニア"
    ]
  },



  "国際日本学部": {
    label: "学科",
    majors: ["国際日本学科"]
  }
};
const socialLanguages = {
  "北西ヨーロッパ・北アメリカ": ["英語"],
  "中央ヨーロッパ": ["ドイツ語", "ポーランド語", "チェコ語"],
  "西南ヨーロッパ": ["フランス語", "イタリア語"],
  "イベリア・ラテンアメリカ": ["スペイン語", "ポルトガル語"],
  "ロシア": ["ロシア語"],
  "中央アジア": ["ロシア語およびウズベク語", "モンゴル語"],
  "東アジア": ["中国語", "朝鮮語"],
  "東南アジア第1（島嶼部）": [
    "インドネシア語", "マレーシア語", "フィリピン語"
  ],
  "東南アジア第2（大陸部）": [
    "タイ語", "ラオス語", "ベトナム語",
    "カンボジア語", "ビルマ語"
  ],
  "南アジア": ["ウルドゥー語", "ヒンディー語", "ベンガル語"],
  "中東": ["アラビア語", "ペルシア語", "トルコ語"],
  "アフリカ": ["英語"],
  "オセアニア": ["英語"]
};

// ステータス
const statNames = [
  "専攻語力",
  "英語力",
  "学業力",
  "人間関係",
  "体調",
  "資金余裕"
];

const facultySelect = document.getElementById("faculty-select");
const majorSelect = document.getElementById("major-select");
const majorLabel = document.getElementById("major-label");
const languageSelect = document.getElementById("language-select");
const languageLabel = document.getElementById("language-label");
const startButton = document.getElementById("start-button");
const continueButton = document.getElementById("continue-button");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

// 学部の選択肢を追加
Object.keys(facultyData).forEach(faculty => {
  facultySelect.add(new Option(faculty, faculty));
});

// 学部に合わせて専攻を切り替える
function updateMajors() {
  const faculty = facultySelect.value;
  const data = facultyData[faculty];

  majorSelect.replaceChildren();

  if (!data) {
    majorLabel.textContent = "専攻語・地域";
    majorSelect.add(new Option("先に学部を選択してください", ""));
    majorSelect.disabled = true;
    startButton.disabled = true;
    return;
  }

  majorLabel.textContent = data.label;

  majorSelect.add(new Option(
    `${data.label}を選択してください`, ""
  ));

  data.majors.forEach(major => {
    majorSelect.add(new Option(major, major));
  });

  // 国際日本学部は学科が1つなので自動選択
  if (data.majors.length === 1) {
    majorSelect.value = data.majors[0];
    majorSelect.disabled = true;
  } else {
    majorSelect.disabled = false;
  }

  updateLanguages();
}

function updateLanguages() {
  const isSocial = facultySelect.value === "国際社会学部";

  languageLabel.hidden = !isSocial;
  languageSelect.hidden = !isSocial;
  languageSelect.replaceChildren();
  languageSelect.disabled = true;

  if (isSocial) {
    languageSelect.add(
      new Option("専攻言語を選択してください", "")
    );

    const languages = socialLanguages[majorSelect.value] || [];

    languages.forEach(language => {
      languageSelect.add(new Option(language, language));
    });

    languageSelect.disabled = languages.length === 0;

    // その地域の言語が1つなら自動選択
    if (languages.length === 1) {
      languageSelect.value = languages[0];
    }
  }

  updateStartButton();
}

function updateStartButton() {
  const isSocial = facultySelect.value === "国際社会学部";

  startButton.disabled = !(
    facultySelect.value &&
    majorSelect.value &&
    (!isSocial || languageSelect.value)
  );
}
facultySelect.addEventListener("change", updateMajors);
majorSelect.addEventListener("change", updateLanguages);
languageSelect.addEventListener("change", updateStartButton);
// 乱数
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ゲームの初期データ
function createGame(faculty, major, language = null) {
  const stats = {};

  statNames.forEach(name => {
    stats[name] = randomNumber(30, 70);
  });

  return {
    version: 2,
    faculty: faculty,
    major: major,
language: faculty === "国際社会学部"
  ? language
  : faculty === "言語文化学部" ? major : null,
    majorType: facultyData[faculty].label,
    year: 1,
    turn: 1,
    gpa: null,
credits: 0,
semesterRecords: [],
stats: stats
  };
}

// セーブ
function saveGame(game) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
}

// ロード
function loadGame() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const game = JSON.parse(saved);

    if (
      game.version !== 2 ||
      !facultyData[game.faculty] ||
      !game.major ||
      !game.stats
    ) {
      return null;
    }

   
    // 以前のセーブデータとの互換性
    game.credits ??= 0;
    game.semesterRecords ??= [];
    game.gradeNotice ??= null;

    return game;
  } catch {
    return null;
  }
}


 // ゲーム画面の表示
function renderGame(game) {
  // タイトル画面を隠してゲーム画面を表示
  startScreen.hidden = true;
  gameScreen.hidden = false;

  // GPAと取得単位を表示
  document.getElementById("gpa-value").textContent =
    Number.isFinite(game.gpa)
      ? game.gpa.toFixed(2)
      : "未確定";

  document.getElementById("credits-value").textContent =
    game.credits || 0;

  document.getElementById("faculty-result").textContent =
    game.faculty;

 document.getElementById("major-result").textContent =
  `${game.majorType}：${game.major}` +
  (game.faculty === "国際社会学部" && game.language
    ? `／専攻言語：${game.language}`
    : "");
  document.getElementById("turn-label").textContent =
    `${game.year}年生・第${game.turn}ターン`;

  const statsElement = document.getElementById("stats");
  statsElement.replaceChildren();

  statNames.forEach(name => {
    const value = game.stats[name];

    const stat = document.createElement("div");
    stat.className = "stat";

    const label = document.createElement("div");
    label.className = "stat-label";

    const nameText = document.createElement("span");
    nameText.textContent = name;

    const valueText = document.createElement("span");
    valueText.textContent = `${value}/100`;

    label.append(nameText, valueText);

    const bar = document.createElement("div");
    bar.className = "bar";

    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.width = `${value}%`;

    
    bar.appendChild(fill);
    stat.append(label, bar);
    statsElement.appendChild(stat);
  });

      renderEvent(game);
renderLifeEvent(game);
renderCourseRegistration(game);
renderCategoryProgress(game);
renderFinalResult(game);
}// 新規ゲーム
startButton.addEventListener("click", () => {
  const faculty = facultySelect.value;
  const major = majorSelect.value;
const language = faculty === "国際社会学部"
  ? languageSelect.value
  : null;

if (
  faculty === "国際社会学部" &&
  !socialLanguages[major]?.includes(language)
) {
  return;
}

  if (!facultyData[faculty]) return;
  if (!facultyData[faculty].majors.includes(major)) return;

  if (
    loadGame() &&
    !confirm("今のセーブデータを上書きしますか？")
  ) {
    return;
  }

 const game = createGame(faculty, major, language);
  saveGame(game);
  renderGame(game);
});

// 続きから
continueButton.addEventListener("click", () => {
  const game = loadGame();

  if (game) {
    renderGame(game);
  }
});

// タイトルに戻る
document.getElementById("back-button").addEventListener("click", () => {
  gameScreen.hidden = true;
  startScreen.hidden = false;
  continueButton.hidden = !loadGame();
});

// 起動時
updateMajors();
continueButton.hidden = !loadGame();
