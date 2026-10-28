// 東京外国語大学生活ガチャ：サークル・部活動
// 2026年6月9日現在の東京外国語大学公式一覧をもとに作成
// https://www.tufs.ac.jp/student/extraordinary/extracurricular/

const clubCatalog = [
  {
    category: "体育系",
    effects: { "体調": 4, "人間関係": 3, "資金余裕": -1 },
    names: [
      "K-POPカバーダンスサークルSoul",
      "TUFSAL",
      "アメリカンフットボール部",
      "アルゼンチンタンゴサークル",
      "クラシックバレエ部Etoile",
      "サイクリング部",
      "ストリートダンス部Quattro",
      "スペイン舞踊部",
      "ソフトテニス部",
      "チアリーディング部RAMS",
      "バドミントン部",
      "フィギュアスケート部",
      "フィリピン民族舞踊部",
      "フェンシング部",
      "ベトナム舞踊同好会 HOA MAI",
      "ポンダンスサークルAmity",
      "ラクロス部",
      "ラグビー部",
      "ワンダーフォーゲル部",
      "体育会剣道部",
      "卓球部",
      "合気道部",
      "女子バスケットボール部",
      "女子バレーボール部",
      "女子フライングディスク部",
      "女子硬式庭球部",
      "少林寺拳法部",
      "弓道部",
      "朝鮮舞踊部",
      "東京外国語大学タップダンスサークルTUPS",
      "東京外国語大学フロアーボールクラブ",
      "東京外国語大学ベリーダンス部",
      "東京外国語大学女子サッカー部",
      "水泳部",
      "男子サッカー部",
      "男子バスケットボール部",
      "男子バレーボール部",
      "男子フライングディスク部",
      "男子硬式庭球部",
      "硬式野球部",
      "空手道部",
      "端艇部",
      "競技ダンス部",
      "軟式野球部",
      "陸上競技部",
      "日本舞踊部",
      "水分補給部"
    ]
  },
  {
    category: "文化系",
    effects: { "学業力": 2, "人間関係": 4, "資金余裕": -1 },
    names: [
      "ELAN",
      "Enjoy!TUFS",
      "Femme Café",
      "GMC",
      "MPJ Youth",
      "Mres",
      "NOPIA",
      "TUFCOMMU(たふこみゅ)",
      "TUFS Japaneque",
      "TUFS世界のボードゲームサークル",
      "アイドルコピーダンスサークル牡丹坂46",
      "アカペラサークルLINES",
      "アコースティックサークルAA",
      "インドネシア舞踊部",
      "お笑いサークルXBULL",
      "カタックダンス部",
      "カンテ研究会",
      "クイズ研究会",
      "サルサ研究会",
      "シリア研究会",
      "セクマイサークル Pas A Pas",
      "たふえね",
      "バルカン研究会",
      "ブラジル研究会",
      "メディアサークルTUFPOST",
      "モダンジャズ研究所",
      "ロシア語劇団コンツェルト",
      "ロシア民謡研究会ルムーク",
      "映画研究会",
      "華道部",
      "学生NGO ALPHA",
      "劇団ダダン",
      "国際理解教育サークルくらふと",
      "混声合唱団コール・ソレイユ",
      "児童学習支援サークル　くりふ",
      "写真部",
      "手話サークル",
      "総合ボランティアサークルPeek A Boo",
      "丹法会",
      "地域活性化サークルいもに会",
      "着付けサークル",
      "中央ユーラシア同好会ユルタ",
      "東京外国語大学 航空宇宙同好会 (RJTuF)",
      "東京外国語大学E.S.S.",
      "東京外国語大学かるた会",
      "東京外国語大学フラチーム　Ka Pili Oha",
      "東京外国語大学ロシアサークル　リュボーフィ",
      "東京外国語大学管弦楽団",
      "東京外国語大学公認軽音サークルダルマダーツ",
      "東京外国語大学吹奏楽団",
      "東京外大ミクライブ研究会",
      "伯牙会",
      "美術部",
      "表千家茶道部",
      "漫画研究会",
      "模擬国連国立研究会",
      "裏千家茶道倶楽部",
      "NPO法人MIS",
      "Polygno Lab.",
      "オセロ同好会",
      "たびびと同好会",
      "ボランティアサークルMonsoon",
      "外麺会",
      "東アジア研究会",
      "東京外国語大学　歩行同好会",
      "文芸部",
      "北欧研究会",
      "模擬投資&経済研究会",
      "The Band Lab Japan",
      "アイセック東京外国語大学",
      "たふテック",
      "紅茶サークル",
      "哲学会",
      "東京外国語大学奇術同好会「TKG」",
      "東京外国語大学歴史会",
      "東南アジア会",
      "日本ロシア学生交流会",
      "Blue Bubble",
      "BOND TUFS",
      "アイリッシュ音楽研究会たふける",
      "ふらんくチャット",
      "東京外大DTMサークル 330Records",
      "南アジア研究会",
      "國学研究会"
    ]
  },
  {
    category: "学生委員会・運営組織",
    effects: { "人間関係": 5, "学業力": 2, "体調": -2 },
    names: [
      "外語祭実行委員会",
      "生協学生委員会 TuCoS"
    ]
  }
];

// ゲームバランス上、兼サーは最大3団体まで（大学の公式制限ではない）
const CLUB_LIMIT = 3;

// 旧セーブの game.club（文字列）も読めるようにする
function getJoinedClubs(game) {
  if (Array.isArray(game.clubs)) {
    return [...new Set(game.clubs.filter(name => typeof name === "string" && name !== "無所属"))];
  }
  return typeof game.club === "string" && game.club !== "無所属"
    ? [game.club]
    : [];
}

function findClubGroup(name) {
  return clubCatalog.find(group => group.names.includes(name));
}

function renderClubPanel(game) {
  let panel = document.getElementById("club-panel");
  if (!panel) {
    const eventPanel = document.getElementById("event-panel");
    if (!eventPanel) return;
    panel = document.createElement("section");
    panel.id = "club-panel";
    panel.className = "academic-panel";
    eventPanel.before(panel);
  }

  panel.replaceChildren();
  const heading = document.createElement("h3");
  heading.textContent = "所属サークル・部活動・学生委員会";
  panel.append(heading);

  const joined = getJoinedClubs(game);
  const count = document.createElement("p");
  count.textContent = `所属：${joined.length} / ${CLUB_LIMIT}団体（複数所属可）`;
  panel.append(count);

  if (joined.length > 0) {
    const list = document.createElement("ul");
    for (const name of joined) {
      const item = document.createElement("li");
      item.style.marginBottom = "8px";
      const label = document.createElement("span");
      label.textContent = `${name} `;
      const quit = document.createElement("button");
      quit.type = "button";
      quit.textContent = "脱退する";
      quit.addEventListener("click", () => {
        const current = loadGame();
        if (!current) return;
        const beforeQuit = getJoinedClubs(current);
        current.clubBonusHistory = [...new Set([
          ...(current.clubBonusHistory || []), ...beforeQuit
        ])];
        current.clubs = beforeQuit.filter(n => n !== name);
        current.club = current.clubs[0] || "無所属";
        current.clubCategory = findClubGroup(current.club)?.category || "無所属";
        // 過去に受けた入部ボーナスは取り消さない
        saveGame(current);
        renderGame(current);
      });
      item.append(label, quit);
      list.append(item);
    }
    panel.append(list);
  } else {
    const empty = document.createElement("p");
    empty.textContent = "現在は無所属です。";
    panel.append(empty);
  }

  if (joined.length >= CLUB_LIMIT) {
    const limitNote = document.createElement("p");
    limitNote.textContent = "これ以上加入するには、いずれかの団体を退部してください。";
    panel.append(limitNote);
    return;
  }

  const search = document.createElement("input");
  search.type = "search";
  search.placeholder = "団体名を検索（例：オセロ、ダンス）";
  search.setAttribute("aria-label", "団体名で検索");
  search.style.width = "100%";
  search.style.boxSizing = "border-box";
  search.style.marginBottom = "8px";

  const select = document.createElement("select");
  select.setAttribute("aria-label", "加入する団体");
  select.style.width = "100%";
  select.style.marginBottom = "8px";

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "加入する";
  button.disabled = true;

  function updateOptions() {
    const previous = select.value;
    const query = search.value.trim().toLocaleLowerCase();
    select.replaceChildren();
    select.add(new Option("団体を選択してください", ""));
    for (const group of clubCatalog) {
      const available = group.names.filter(name =>
        !joined.includes(name) && name.toLocaleLowerCase().includes(query)
      );
      if (available.length === 0) continue;
      const optgroup = document.createElement("optgroup");
      optgroup.label = group.category;
      for (const name of available) optgroup.append(new Option(name, name));
      select.append(optgroup);
    }
    if ([...select.options].some(option => option.value === previous)) {
      select.value = previous;
    }
    button.disabled = !select.value;
  }

  search.addEventListener("input", updateOptions);
  select.addEventListener("change", () => {
    button.disabled = !select.value;
  });

  button.addEventListener("click", () => {
    const current = loadGame();
    if (!current) return;
    const name = select.value;
    const group = findClubGroup(name);
    const existing = getJoinedClubs(current);
    if (!group || existing.includes(name) || existing.length >= CLUB_LIMIT) return;

    current.clubs = [...existing, name];
    // 旧来の単数clubフィールドも維持し、古いセーブと互換性を保つ
    current.club = current.clubs[0];
    current.clubCategory = findClubGroup(current.club)?.category || "未分類";
    // 退部→再入部でもボーナスを繰り返し獲得できないようにする
    const bonusHistory = [...new Set([
      ...(current.clubBonusHistory || []), ...existing
    ])];
    if (!bonusHistory.includes(name)) {
      for (const [stat, amount] of Object.entries(group.effects)) {
        current.stats[stat] = Math.max(0, Math.min(100, (current.stats[stat] ?? 0) + amount));
      }
      bonusHistory.push(name);
    }
    current.clubBonusHistory = bonusHistory;
    saveGame(current);
    renderGame(current);
  });

  updateOptions();
  panel.append(search, select, button);
  const note = document.createElement("p");
  note.className = "note";
  note.textContent = "加入時の能力変化と最大3団体の制限はゲーム独自の設定です。";
  panel.append(note);
}
