
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

  
  // 5・6年目は不足している科目区分を優先して再履修
  if (!plan) {
    const rules =
      degreeRequirements[game.faculty]?.categories || [];

    const totals = {};

    for (const record of game.semesterRecords || []) {
      for (const [name, credits] of
        Object.entries(record.categoryCredits || {})) {
        totals[name] = (totals[name] || 0) + credits;
      }
    }

    const repeatPlan = [];
    let left = registered;

    for (const rule of rules) {
      const missing = Math.max(
        0,
        rule.min - (totals[rule.name] || 0)
      );

      const take = Math.min(left, missing);

      if (take > 0) {
        repeatPlan.push({
          name: rule.name,
          remaining: take
        });

        left -= take;
      }

      if (left === 0) break;
    }

    // 必修区分を満たした後の余りは選択科目
    if (left > 0) {
      repeatPlan.push({
        name: "選択科目",
        remaining: left
      });
    }

    return repeatPlan;
  }

  return Object.entries(plan).map(([name, remaining]) => ({
    name,
    remaining
  }));
}

function renderCategoryProgress(game) {
  const panel = document.getElementById("degree-requirements");
  const rules = degreeRequirements[game.faculty];
  if (!panel || !rules) return;

  panel.replaceChildren();

  const heading = document.createElement("h3");
  heading.textContent = "卒業要件チェック";
  panel.appendChild(heading);

  const summary = document.createElement("p");
  summary.textContent =
    `総取得単位：${game.credits ?? 0} / ${rules.total}`;
  panel.appendChild(summary);

  if (!rules.categories) {
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = "この学部の科目別要件は準備中です。";
    panel.appendChild(note);
    return;
  }

  const totals = {};
  let unknown = 0;

  for (const record of game.semesterRecords || []) {
    if (!record.categoryCredits) {
      unknown += record.earned || 0;
      continue;
    }

    for (const [name, units] of
      Object.entries(record.categoryCredits)) {
      totals[name] = (totals[name] || 0) + units;
    }
  }

  for (const rule of rules.categories) {
    const have = totals[rule.name] || 0;

    const item = document.createElement("div");
    item.className = "degree-category";

    const label = document.createElement("div");
    label.textContent =
      `${rule.name}：${have} / ${rule.min}単位` +
      (have >= rule.min ? " ✓" : "");

    const bar = document.createElement("progress");
    bar.max = rule.min;
    bar.value = Math.min(have, rule.min);

    item.append(label, bar);
    panel.appendChild(item);
  }

  if (unknown > 0) {
    const oldNote = document.createElement("p");
    oldNote.className = "note";
    oldNote.textContent =
      `旧セーブの${unknown}単位は科目内訳が未記録のため、` +
      "上の区分別表示には含めていません。";
    panel.appendChild(oldNote);
  }

  const note = document.createElement("p");
  note.className = "note";
  note.textContent =
    "科目別の取得状況はゲーム用の仮モデルです。" +
    "卒業判定はまだ従来の合計単位数で行います。";
  panel.appendChild(note);
}

function getDegreeCheck(game) {
  const rules = degreeRequirements[game.faculty];
  const credits = game.credits ?? 0;
  const required = rules?.total ?? 125;
  const records = game.semesterRecords || [];

  const recordedCredits = records.reduce(
    (sum, r) => sum + (r.earned || 0), 0
  );

  // 旧セーブは科目別の履修記録が不足している
  const legacy =
    records.some(r => !r.categoryCredits) ||
    recordedCredits < credits;

  const totals = {};

  for (const record of records) {
    for (const [name, value] of
      Object.entries(record.categoryCredits || {})) {
      totals[name] = (totals[name] || 0) + value;
    }
  }

  const missingCategories =
    rules?.categories && !legacy
      ? rules.categories
          .map(rule => ({
            name: rule.name,
            remaining: Math.max(
              0,
              rule.min - (totals[rule.name] || 0)
            )
          }))
          .filter(item => item.remaining > 0)
      : [];

  return {
    passed:
      credits >= required &&
      missingCategories.length === 0,
    missingTotal: Math.max(0, required - credits),
    missingCategories,
    legacy
  };
}

function meetsDegreeRequirements(game) {
  return getDegreeCheck(game).passed;
}
