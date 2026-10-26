
/*
  東京外国語大学生活ガチャ
  バランステスト（開発者用）
  セーブデータは変更しない
*/

(function () {
  const start = document.getElementById("start-screen");
  if (!start) return;

  const button = document.createElement("button");
  button.textContent = "開発者用：バランステストを実行";
  button.className = "secondary";
  start.appendChild(button);

  const report = document.createElement("pre");
  report.style.whiteSpace = "pre-wrap";
  report.style.textAlign = "left";
  report.style.fontSize = "13px";
  report.style.lineHeight = "1.8";
  report.style.overflowWrap = "anywhere";
  report.hidden = true;
  start.appendChild(report);

  // プレイ方針ごとの選択肢を決める
  function selectChoice(event, mode) {
    if (mode === "random") {
      return Math.floor(Math.random() * event.choices.length);
    }

    const weights = mode === "study"
      ? {
          "学業力": 3,
          "専攻語力": 2,
          "英語力": 1,
          "体調": 0.5,
          "資金余裕": 0.2
        }
      : {
          "人間関係": 3,
          "体調": 1,
          "資金余裕": 0.5,
          "専攻語力": 0.2
        };

    const scores = event.choices.map(choice =>
      Object.entries(choice.effects).reduce(
        (total, [name, value]) =>
          total + value * (weights[name] || 0),
        0
      )
    );

    const highest = Math.max(...scores);
    const best = scores
      .map((score, index) => score === highest ? index : -1)
      .filter(index => index >= 0);

    return best[Math.floor(Math.random() * best.length)];
  }

  function playOneGame(mode) {
    // 実際の新規ゲーム作成関数を使う
    // saveGame() は呼ばない
    const game = createGame("言語文化学部", "ベトナム語");
    game.eventHistory = [];

    for (let year = 1; year <= 4; year++) {
      for (let turn = 1; turn <= 6; turn++) {
        game.year = year;
        game.turn = turn;

        const event = currentEvent(game);
        if (!event) {
          throw new Error(`${year}年・${turn}ターンがありません`);
        }

        const index = selectChoice(event, mode);
        const choice = event.choices[index];

        // 通常のステータス増減
        for (const [name, amount] of Object.entries(choice.effects)) {
          game.stats[name] = Math.max(
            0,
            Math.min(100, game.stats[name] + amount)
          );
        }

        // 実際のゲームと同じ幸運・不運の処理
        const luck = Math.random();
        const luckStat = Object.keys(choice.effects)[0];

        if (luck < 0.25) {
          game.stats[luckStat] = Math.min(
            100, game.stats[luckStat] + 4
          );
        } else if (luck < 0.5) {
          game.stats[luckStat] = Math.max(
            0, game.stats[luckStat] - 3
          );
        }

        // 留学関連の進行
        updateAbroadProgress(game, choice.text);

        game.eventHistory.push({
          year,
          turn,
          event: event.title,
          choice: choice.text
        });

        // 実際の成績計算関数を使用
        if (turn === 3 || turn === 6) {
          assessSemester(game);
          game.gradeNotice = null;
        }
      }
    }

    return game;
  }

  function runSimulation(mode, count) {
    let graduated = 0;
    let totalGpa = 0;
    let totalCredits = 0;
    let highGpa = 0;
    let abroadCompleted = 0;

    for (let i = 0; i < count; i++) {
      const game = playOneGame(mode);

      if (game.credits >= 125) graduated++;
      if (game.gpa >= 3.5) highGpa++;
      if (game.abroad?.completed) abroadCompleted++;

      totalGpa += game.gpa;
      totalCredits += game.credits;
    }

    return {
      graduationRate: (graduated / count * 100).toFixed(1),
      averageGpa: (totalGpa / count).toFixed(2),
      averageCredits: (totalCredits / count).toFixed(1),
      highGpaRate: (highGpa / count * 100).toFixed(1),
      abroadRate: (abroadCompleted / count * 100).toFixed(1)
    };
  }

  button.addEventListener("click", () => {
    const count = 1000;
    report.hidden = false;

    try {
      const modes = [
        ["ランダム", "random"],
        ["学業優先", "study"],
        ["交流優先", "social"]
      ];

      const lines = [
        "=== 大学生活ガチャ バランステスト ===",
        `各${count}回・合計${count * modes.length}回`,
        ""
      ];

      for (const [label, mode] of modes) {
        const r = runSimulation(mode, count);

        lines.push(
          `【${label}】`,
          `卒業率：${r.graduationRate}%`,
          `平均GPA：${r.averageGpa}`,
          `平均取得単位：${r.averageCredits}`,
          `GPA3.5以上：${r.highGpaRate}%`,
          `長期留学修了率：${r.abroadRate}%`,
          ""
        );
      }

      lines.push("※ゲーム内の仮ルールに基づくシミュレーション");
      lines.push("※友情・恋愛の追加行動は計算対象外");

      report.textContent = lines.join("\n");
    } catch (error) {
      report.textContent = "テスト中にエラー：" + error.message;
      console.error(error);
    }
  });
})();
