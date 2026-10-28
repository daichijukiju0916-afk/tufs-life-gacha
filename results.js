
function calculateFinalScore(game) {
  const s = game.stats;
  const values = Object.values(s);

  const average =
    values.reduce((sum, value) => sum + value, 0)
    / values.length;

  const gpa = game.gpa ?? 0;
  const credits = game.credits ?? 0;
  const friendship = game.relationships?.friendship ?? 25;

  const score =
    average * 0.45 +
    (gpa / 4) * 25 +
    Math.min(credits / 125, 1) * 20 +
    friendship * 0.10;

  return Math.round(Math.min(100, score));
}

function getFinalAwards(game) {
  const awards = [];
  const s = game.stats;
  const r = game.relationships || {};
  const history = game.eventHistory || [];

  if (s["専攻語力"] >= 80) {
    awards.push("語学マスター");
  }

  if (s["英語力"] >= 85) {
    awards.push("英語の達人");
  }

  if ((game.gpa ?? 0) >= 3.5) {
    awards.push("学業優秀");
  }

  if (game.abroad?.completed) {
    awards.push("国際派外大生");
  }

  if ((r.friendship ?? 0) >= 70) {
    awards.push("友情の達人");
  }

  if (r.dating) {
    awards.push("キャンパスラブ");
  }

  const festival = history.some(item =>
    /外語祭|語劇/.test(item.event || "") &&
    /全力|準備|支える|裏方/.test(item.choice || "")
  );

  if (festival) {
    awards.push("外語祭の功労者");
  }

  if (meetsDegreeRequirements(game)) {
  awards.push("卒業達成");
}
  if (awards.length === 0) {
    awards.push("自分らしく生きた外大生");
  }

  return awards;
}

function getFinalTitle(game) {
  const s = game.stats;
  const graduated = meetsDegreeRequirements(game);

  if (!graduated) {
    return "挑戦を続ける外大生";
  }

  if (
    game.abroad?.completed &&
    s["専攻語力"] >= 80
  ) {
    return "世界を駆ける語学者";
  }

  if ((game.gpa ?? 0) >= 3.5) {
    return "学問に生きた外大生";
  }

  if ((game.relationships?.friendship ?? 0) >= 75) {
    return "人に恵まれた外大生";
  }

  if (s["専攻語力"] >= 80) {
    return "語学に青春を捧げた外大生";
  }

  return "自分だけの4年間を歩んだ外大生";
}

function renderFinalResult(game) {
  const panel = document.getElementById("final-result");
  const eventPanel = document.getElementById("event-panel");
  const relationshipPanel =
    document.getElementById("relationship-panel");

  // 最終学期の成績発表後に表示
  const completed = isGameFinished(game);
    game.yearFourComplete && !game.gradeNotice;

  panel.hidden = !completed;
  eventPanel.hidden = completed;
  relationshipPanel.hidden = completed;

  if (!completed) return;

  const graduated = meetsDegreeRequirements(game);

  document.getElementById("final-heading").textContent =
  graduated
    ? `${game.year}年で卒業おめでとう！`
    : "6年目終了：卒業要件未達";
  document.getElementById("final-title").textContent =
    getFinalTitle(game);

  document.getElementById("final-faculty").textContent =
    `${game.faculty}・${game.major}`;

  document.getElementById("final-score").textContent =
    calculateFinalScore(game);

  document.getElementById("final-gpa").textContent =
    Number.isFinite(game.gpa)
      ? game.gpa.toFixed(2) : "未確定";

  document.getElementById("final-credits").textContent =
    game.credits ?? 0;

  document.getElementById("final-friendship").textContent =
    game.relationships?.friendship ?? 25;

  document.getElementById("final-romance").textContent =
    game.relationships?.romance ?? 0;

  const abroadText = game.studyLeaveCompleted
  ? "休学留学を修了"
  : game.abroad?.completed
    ? "長期派遣留学を修了"
    : "長期留学の修了記録なし";
  document.getElementById("final-abroad").textContent =
    abroadText;

  const careerText = graduated
    ? getCareerEnding(game)
    : "卒業要件を満たしていないため進路は未確定";

  document.getElementById("final-career").textContent =
    careerText;

  // 称号を表示
  const awardsBox = document.getElementById("final-awards");
  awardsBox.replaceChildren();

  getFinalAwards(game).forEach(award => {
    const badge = document.createElement("span");
    badge.className = "final-award";
    badge.textContent = award;
    awardsBox.appendChild(badge);
  });
}
