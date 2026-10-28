/*
 * 東京外大生活ガチャ STEP22：専攻言語の履修制限・進捗表示
 * 出典：東京外国語大学 2026年度 モジュール制専攻言語科目履修上の注意
 * 科目の曜日・時限は公式資料で未確認のため、ユーザーが確認して入力する。
 */
const TUFS_MODULE_LANGUAGES = new Set([
  "ポーランド語", "チェコ語", "ウズベク語", "モンゴル語",
  "インドネシア語", "マレーシア語", "フィリピン語", "タイ語",
  "ラオス語", "ベトナム語", "カンボジア語", "ビルマ語",
  "ヒンディー語", "ウルドゥー語", "ベンガル語", "ペルシア語", "トルコ語"
]);
const TUFS_MAJOR_GUIDE_URL =
  "https://www.tufs.ac.jp/documents/student/lesson_course/kaikokamoku/attention/2_module_language_2026.pdf";
const TUFS_OTHER_GUIDE_URL =
  "https://www.tufs.ac.jp/documents/student/lesson_course/1_2026_handbook_schedule_search.pdf";
const TUFS_LANGUAGE_NAMES = [
  "ロシア語およびウズベク語", "インドネシア語", "マレーシア語", "フィリピン語",
  "ポルトガル語", "カンボジア語", "ポーランド語", "ベトナム語",
  "フランス語", "スペイン語", "イタリア語", "ドイツ語", "チェコ語",
  "ロシア語", "ウズベク語", "モンゴル語", "中国語", "朝鮮語",
  "アラビア語", "ペルシア語", "トルコ語", "タイ語", "ラオス語",
  "ビルマ語", "ウルドゥー語", "ヒンディー語", "ベンガル語", "英語"
].sort((a,b) => b.length - a.length);
function tufsStudentLanguage(game) {
  if (!game || !["言語文化学部", "国際社会学部"].includes(game.faculty)) return null;
  return game.language || (game.faculty === "言語文化学部" ? game.major : null);
}
function tufsLanguageMatches(a,b) {
  if (!a || !b) return false;
  if (a === b) return true;
  // 中央アジア専攻の複合表記は、単独のロシア語・ウズベク語も許容。
  if (a === "ロシア語およびウズベク語") return b === "ロシア語" || b === "ウズベク語";
  return false;
}
function tufsInferredLanguage(course) {
  if (typeof course?.language === "string" && course.language.trim()) return course.language.trim();
  const s = String(course?.name || "");
  // 専攻言語・教養外国語・諸地域言語以外からは言語を推定しない。
  if (!["専攻言語", "専攻言語科目", "教養外国語", "教養外国語科目",
        "諸地域言語", "諸地域言語科目"].includes(course?.category)) return null;
  return TUFS_LANGUAGE_NAMES.find(name => s.includes(name)) || null;
}
function tufsCourseEligibility(game,course) {
  const language = tufsStudentLanguage(game);
  const group = String(course.category || "");
  const named = tufsInferredLanguage(course);
  const majorGroup = group === "専攻言語" || group === "専攻言語科目";
  if (majorGroup) {
    if (!language) return {ok:false, reason:"この学部には専攻言語が設定されていません。"};
    if (!named) return {ok:false, reason:"専攻言語の識別情報がありません。"};
    const textName = TUFS_LANGUAGE_NAMES.find(name => String(course.name || "").includes(name));
    if (textName && !tufsLanguageMatches(language,textName))
      return {ok:false, reason:"科目名が別の専攻言語を指しています。"};
    if (!tufsLanguageMatches(language,named)) return {ok:false, reason:"自分の専攻言語以外の専攻語科目です。"};
    if (Number.isInteger(course.majorLevel) && course.majorLevel > game.year)
      return {ok:false, reason:"上級学年向けの専攻語科目です。"};
  }
  if (["教養外国語", "教養外国語科目", "諸地域言語", "諸地域言語科目"].includes(group) &&
      language && named && tufsLanguageMatches(language,named)) {
    return {ok:false, reason:"専攻言語と同じ言語の教養外国語・諸地域言語は履修できません。"};
  }
  return {ok:true, reason:""};
}
function tufsValidateManualMajorRegistration(game, courses) {
  if (tufsStudentLanguage(game) !== "ベトナム語") return {ok:true, reason:""};
  const ids = new Set(courses.map(c => c.id));
  const a = ids.has("vi-2026-Ⅰ-1");
  const b = ids.has("vi-2026-Ⅰ-2");
  if (a !== b) return {ok:false, reason:"ベトナム語Ⅰの文法Ⅰ-1・Ⅰ-2は2コマセット履修です。両方登録してください。"};
  for (const [next,required] of [["vi-2026-Ⅰ-7","vi-2026-Ⅰ-3"], ["vi-2026-Ⅰ-8","vi-2026-Ⅰ-4"]]) {
    if (!ids.has(next)) continue;
    // 旧方式で春学期を自動履修した場合、科目別履歴がないため暫定で通す。
    const manualSpring = Object.values(game.courseRegistrations || {}).some(r =>
      r.mode === "manual" && (r.courses || []).some(c => c.id === required));
    const passed = (game.semesterRecords || []).some(r =>
      (r.courseGrades || []).some(g => g.id === required && g.passed));
    if (manualSpring && !passed) return {ok:false, reason:
      `ベトナム語Ⅰの${next.slice(-1)}を履修するには、対応する春学期科目の単位修得が必要です。`};
  }
  return {ok:true, reason:""};
}
function tufsMajorProgress(game) {
  const language = tufsStudentLanguage(game);
  let count = 0;
  for (const r of game.semesterRecords || []) {
    const courses = game.courseRegistrations?.[r.key]?.courses || [];
    const lookup = new Map(courses.map(c => [c.id,c]));
    for (const grade of r.courseGrades || []) {
      if (!grade.passed) continue;
      const course = lookup.get(grade.id) || grade;
      if (["専攻言語", "専攻言語科目"].includes(course.category) &&
          tufsLanguageMatches(language,tufsInferredLanguage(course))) {
        count += Number(grade.earned ?? grade.credits) || 0;
      }
    }
  }
  return count;
}
function tufsMajorMinimum(game) {
  const lang = tufsStudentLanguage(game);
  if (!lang) return null;
  if (!TUFS_MODULE_LANGUAGES.has(lang)) return null;
  return game.faculty === "言語文化学部" ? 28 : 20;
}
// 2026年度の公式履修上の注意に掲載されたベトナム語1年次の標準科目。
// 授業の実施曜日・時限・担当教員はここでは未収録。
const TUFS_VERIFIED_VIETNAMESE_FIRST_YEAR = [
  ["春", "Ⅰ-1", "文法１（前半）"],
  ["春", "Ⅰ-2", "文法１（後半）"],
  ["春", "Ⅰ-3", "読解１"],
  ["春", "Ⅰ-4", "会話１"],
  ["春", "Ⅰ-5", "聴解１"],
  ["秋", "Ⅰ-6", "文法２"],
  ["秋", "Ⅰ-7", "読解２"],
  ["秋", "Ⅰ-8", "会話２"],
  ["秋", "Ⅰ-9", "聴解２"],
  ["秋", "Ⅰ-10", "表現１"]
].map(([term,code,title]) => ({
  id:`vi-2026-${code}`, term, code, title,
  name:`専攻言語（ベトナム語${code}）：${title}`,
  category:"専攻言語", language:"ベトナム語", majorLevel:1,
  source:TUFS_MAJOR_GUIDE_URL
}));

// 2026年度の公式履修上の注意から確認できた1年次科目。
// 名前・学期のみ収録（曜日と時限は未収録）。架空の時間割を設定しない。
const TUFS_VERIFIED_OTHER_FIRST_YEAR = [
  ...[
    ["春",1,"文法１Ａ"],["春",2,"文法１Ｂ"],
    ["春",3,"コミュニケーション１"],["春",4,"プレゼンテーション１"],
    ["春",5,"作文１"],["秋",6,"作文２"],
    ["秋",7,"文法２Ａ"],["秋",8,"文法２Ｂ"],
    ["秋",9,"コミュニケーション２"],["秋",10,"プレゼンテーション２"]
  ].map(([term,n,title]) => ({
    id:`pl-2026-I-${n}`,term,code:`Ⅰ-${n}`,title,
    name:`専攻言語（ポーランド語Ⅰ-${n}）：${title}`,
    category:"専攻言語",language:"ポーランド語",majorLevel:1,
    source:TUFS_MAJOR_GUIDE_URL
  })),
  ...[
    ["春",1,"文法１Ａ"],["春",2,"文法１Ｂ"],
    ["春",3,"会話１Ａ"],["春",4,"会話１Ｂ"],
    ["春",5,"聴解１"],["秋",6,"文法２Ａ"],
    ["秋",7,"文法２Ｂ"],["秋",8,"会話２Ａ"],
    ["秋",9,"会話２Ｂ"],["秋",10,"聴解２"]
  ].map(([term,n,title]) => ({
    id:`cz-2026-I-${n}`,term,code:`Ⅰ-${n}`,title,
    name:`専攻言語（チェコ語Ⅰ-${n}）：${title}`,
    category:"専攻言語",language:"チェコ語",majorLevel:1,
    source:TUFS_MAJOR_GUIDE_URL
  }))
];

function tufsSuggestedMajorCourses(game, term) {
  const language = tufsStudentLanguage(game);
  if (!language || game.year !== 1) return [];
  return [...TUFS_VERIFIED_VIETNAMESE_FIRST_YEAR,
          ...TUFS_VERIFIED_OTHER_FIRST_YEAR]
    .filter(c => c.term === term && tufsLanguageMatches(language,c.language))
    .map(c => ({...c, credits:1, day:null, period:null, teacher:"",
      official:true, scheduleVerified:false}));
}
function tufsRenderMajorGuide(game, host, term) {
  const language = tufsStudentLanguage(game);
  if (!language) return;
  const wrap = document.createElement("details");
  wrap.className = "cr-guide";
  wrap.open = game.year <= 2;
  const heading = document.createElement("summary");
  heading.textContent = `専攻言語：${language}の履修ガイド`;
  wrap.append(heading);
  function paragraph(value) {
    const p = document.createElement("p"); p.textContent = value; wrap.append(p); return p;
  }
  const min = tufsMajorMinimum(game), got = tufsMajorProgress(game);
  if (min !== null) {
    paragraph(`科目別成績が記録された専攻語：${got}単位／卒業までの必要数${min}単位。2年次末までに15単位が進級要件（モジュール制）。`);
  } else {
    paragraph("この専攻語の詳細な単位認定方式は別途履修案内で確認してください。非モジュール制の1年次は年間一括認定のため、ゲームの科目別・学期別計算とは異なります。");
  }
  paragraph("未登録の過去セーブや自動履修の専攻語は上記の内訳に含めていません。現在は履修ガイドの表示であり、進級・卒業の自動判定は変更しません。");
  const guide = document.createElement("a");
  guide.href = min !== null ? TUFS_MAJOR_GUIDE_URL : TUFS_OTHER_GUIDE_URL;
  guide.textContent = "大学公式の履修案内を開く";
  guide.target = "_blank"; guide.rel = "noopener noreferrer";
  wrap.append(guide);

  const available = typeof tufsSuggestedMajorCourses === "function"
    ? tufsSuggestedMajorCourses(game,term) : [];
  if (available.length > 0) {
    paragraph(`この学期の専攻言語${available.length}科目は履修候補へ自動表示しています。` +
      "検索や手入力は不要です。最初から選択済みなので、不要な科目だけ取り消してね。");
    paragraph("公式2026年度の曜日・時限を確認できた専攻語は実際のマスに表示します。" +
      "未確認の専攻語はゲーム用の仮配置として表示します（実際の時間割ではありません）。" +
      "GPA・単位はゲーム内で計算します。");
  } else if (game.year === 1) {
    paragraph("この専攻言語の1年次授業データはまだ未収録です。" +
      "架空の授業名や曜日時限は作らず、今後のデータ追加で自動対応していきます。");
  } else {
    paragraph("現在、2年次以降の専攻語授業は自動収録されていません。" +
      "不合格だった科目は再履修候補として表示されます。");
  }
  host.append(wrap);
}
