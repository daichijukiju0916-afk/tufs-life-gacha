/*
  STEP23: 3年次進級判定（ベトナム語・モジュール制の試作）
  2026年度言語文化学部履修ガイダンス：
  専攻言語15、地域基礎6、基礎リテラシー1、基礎演習2、導入6。
  このゲームの科目区分では、基礎リテラシーと基礎演習を合計3単位として扱う。
  地域基礎のクラス指定・学部コース指定までは自動検証しない。
*/
function step23Progression(game) {
  // 当面、ベトナム語専攻の言語文化学部の2年次のみ判定する。
  if (!game || game.year !== 2 ||
      game.faculty !== "言語文化学部" ||
      (typeof tufsStudentLanguage === "function"
        ? tufsStudentLanguage(game) !== "ベトナム語"
        : (game.language || game.major) !== "ベトナム語")) {
    return {applicable:false, passed:true, checks:[], message:""};
  }

  const records = (game.semesterRecords || []).filter(r => r.year === 1 || r.year === 2);
  // 科目別記録がない旧セーブ・自動履修は厳密な判定ができないので救済。
  const legacy = records.length === 0 || records.some(r => !Array.isArray(r.courseGrades));
  if (legacy) {
    return {applicable:true, passed:true, legacy:true, checks:[],
      message:"過去の学期に科目別記録がないため、進級判定は旧方式を適用しました。"};
  }

  const category = {};
  for (const record of records) {
    for (const [name, count] of Object.entries(record.categoryCredits || {})) {
      category[name] = (category[name] || 0) + count;
    }
  }
  const major = typeof tufsMajorProgress === "function"
    ? tufsMajorProgress(game) : 0;
  const checks = [
    {name:"専攻言語（ベトナム語）", got:major, need:15},
    {name:"地域基礎（地域科目で代用）", got:(category["地域科目"] || 0) + (category["地域基礎科目"] || 0), need:6},
    {name:"基礎リテラシー＋基礎演習（基礎科目で代用）", got:(category["基礎科目"] || 0), need:3},
    {name:"導入科目", got:category["導入科目"] || 0, need:6}
  ];
  const missing = checks.filter(c => c.got < c.need);
  const display = checks.map(c => `${c.name}：${c.got}/${c.need}単位${c.got < c.need ? "（不足" + (c.need-c.got) + "）" : " ✓"}`).join("\n");
  return {applicable:true, passed:missing.length===0, legacy:false, checks,
    message:display + (missing.length
      ? "\n未修得科目と不足区分を履修して、再び進級判定を受けよう。過去の合格単位・GPAは残るよ。"
      : "\n進級要件を満たした！") +
      "\n※ゲームでは地域基礎の指定クラスと基礎2科目の内訳までは判定できません。"};
}
