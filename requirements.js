
/*
  東京外国語大学生活ガチャ
  学部別卒業要件データ
*/

const degreeRequirements = {
  "言語文化学部": {
    total: 125,
    categories: [
      { name: "基礎科目", min: 3 },
      { name: "教養科目", min: 12 },
      { name: "言語科目", min: 38 },
      { name: "地域科目", min: 6 },
      { name: "導入科目", min: 6 },
      { name: "概論科目", min: 14 },
      { name: "専門科目", min: 24 },
      { name: "卒業研究", min: 8 }
    ]
  },

  "国際社会学部": {
    total: 125,
    categories: null
  },

  "国際日本学部": {
    total: 125,
    categories: null
  }
};

function renderDegreeRequirements(game) {
  const panel = document.getElementById(
    "degree-requirements"
  );

  if (!panel) return;

  const config = degreeRequirements[game.faculty];
  panel.replaceChildren();

  if (!config) return;

  const heading = document.createElement("h3");
  heading.textContent = "卒業要件チェック";
  panel.appendChild(heading);

  const total = document.createElement("p");
  total.textContent =
    `現在の取得単位：${game.credits ?? 0} / ${config.total}`;

  panel.appendChild(total);

  if (config.categories) {
    const list = document.createElement("ul");

    config.categories.forEach(category => {
      const item = document.createElement("li");
      item.textContent =
        `${category.name}：${category.min}単位以上`;
      list.appendChild(item);
    });

    panel.appendChild(list);
  } else {
    const notice = document.createElement("p");
    notice.textContent =
      "この学部の科目別要件は今後追加します。";
    panel.appendChild(notice);
  }

  const note = document.createElement("p");
  note.className = "note";
  note.textContent =
    "現在は必要条件の一覧です。科目別の取得実績と卒業判定への反映は次のステップで実装します。";
  panel.appendChild(note);
}

function makeSemesterPlan(game, registered) {
  // 言語文化学部以外は暫定的に一括管理
  if (game.faculty !== "言語文化学部") {
    return [
      { name: "科目区分未設定", remaining: registered }
    ];
  }

  // 1〜4年生の学期別履修計画
  const plans = [
    {
      "基礎科目": 1,
      "教養科目": 4,
      "言語科目": 10,
      "地域科目": 3,
      "導入科目": 4
    },
    {
      "基礎科目": 2,
      "教養科目": 5,
      "言語科目": 10,
      "地域科目": 3,
      "導入科目": 2
    },
    {
      "教養科目": 4,
      "言語科目": 10,
      "概論科目": 8
    },
    {
      "教養科目": 4,
      "言語科目": 8,
      "概論科目": 8,
      "選択科目": 2
    },
    {
      "言語科目": 6,
      "概論科目": 2,
      "専門科目": 10,
      "選択科目": 2
    },
    {
      "言語科目": 4,
      "専門科目": 12,
      "選択科目": 4
    },
    {
      "言語科目": 2,
      "専門科目": 12,
      "選択科目": 4
    },
    {
      "専門科目": 6,
      "卒業研究": 8,
      "選択科目": 4
    }
  ];

  const index = (game.year - 1) * 2 +
    (game.turn === 3 ? 0 : 1);

  const plan = plans[index];

  // 5・6年目は暫定的に再履修として扱う
  if (!plan) {
    return [
      { name: "再履修・選択科目", remaining: registered }
    ];
  }

  return Object.entries(plan).map(([name, remaining]) => ({
    name,
    remaining
  }));
}
