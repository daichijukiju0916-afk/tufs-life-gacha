// 恋愛・サークル選択を通常イベントと同じイベント欄に表示する
// clubs.js / relationships.js / events.js より後、app.js より前に読み込む。

function lifeEventActive(game) {
  return !game.gradeNotice && ![
    'yearOneComplete', 'yearTwoComplete', 'yearThreeComplete',
    'yearFourComplete', 'yearFiveComplete', 'yearSixComplete'
  ].some(key => game[key]);
}

function clubEventYear(game) {
  if (!lifeEventActive(game) || game.pendingResult) return null;
  const done = game.lifeClubEvents || [];
  if (game.year === 1 && !done.includes(1)) return 1;
  if ((game.year === 2 || game.year === 3) &&
      game.turn === 1 && !done.includes(game.year)) return game.year;
  return null;
}

function lifeEventCanvas(number, title, description) {
  const panel = document.getElementById('event-panel');
  const choices = document.getElementById('choice-buttons');
  panel.hidden = false;
  document.getElementById('event-number').textContent = number;
  document.getElementById('event-title').textContent = title;
  document.getElementById('event-description').textContent = description;
  document.getElementById('event-result').hidden = true;
  document.getElementById('next-button').hidden = true;
  choices.hidden = false;
  choices.replaceChildren();
  return choices;
}

function lifeChoiceButton(parent, label, action) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'choice-button';
  button.textContent = label;
  button.addEventListener('click', action);
  parent.append(button);
  return button;
}

function saveClubEvent(game, year, message) {
  game.lifeClubEvents = [...new Set([...(game.lifeClubEvents || []), year])];
  game.lifeEventResult = { title: 'サークル選択の結果', message };
  saveGame(game);
  renderGame(game);
}

function renderClubLifeEvent(game, year) {
  const joined = getJoinedClubs(game);
  const choices = lifeEventCanvas(
    'SPECIAL EVENT',
    year === 1 ? '新歓・サークル選び' : '新年度のサークル選び',
    '参加する団体を選ぼう。兼サーは最大3団体まで！'
  );

  const membership = document.createElement('p');
  membership.textContent = '現在の所属：' + (joined.join('、') || '無所属');
  choices.append(membership);

  if (joined.length < CLUB_LIMIT) {
    const search = document.createElement('input');
    search.type = 'search';
    search.placeholder = '団体名で検索（例：オセロ、外語祭、TuCoS）';
    search.style.width = '100%';
    search.style.boxSizing = 'border-box';
    const select = document.createElement('select');
    select.style.width = '100%';
    select.setAttribute('aria-label', '入部する団体');
    choices.append(search, select);

    function refresh() {
      select.replaceChildren();
      select.add(new Option('団体を選択', ''));
      const q = search.value.trim().toLocaleLowerCase();
      for (const group of clubCatalog) {
        const names = group.names.filter(n =>
          !joined.includes(n) && n.toLocaleLowerCase().includes(q)
        );
        if (!names.length) continue;
        const opt = document.createElement('optgroup');
        opt.label = group.category;
        for (const name of names) opt.append(new Option(name, name));
        select.append(opt);
      }
    }
    search.addEventListener('input', refresh);
    refresh();

    lifeChoiceButton(choices, '選んだ団体に入部する', () => {
      const name = select.value;
      const group = findClubGroup(name);
      const current = loadGame();
      if (!current || !group || !name) return;
      const members = getJoinedClubs(current);
      if (members.includes(name) || members.length >= CLUB_LIMIT) return;
      current.clubs = [...members, name];
      current.club = current.clubs[0];
      current.clubCategory = findClubGroup(current.club)?.category || '未分類';
      const history = new Set(current.clubBonusHistory || []);
      if (!history.has(name)) {
        for (const [stat, amount] of Object.entries(group.effects)) {
          current.stats[stat] = Math.max(0, Math.min(100,
            (current.stats[stat] || 0) + amount));
        }
        history.add(name);
      }
      current.clubBonusHistory = [...history];
      saveClubEvent(current, year, `${name}に入部した！`);
    });
  }

  if (joined.length) {
    const leaveSelect = document.createElement('select');
    leaveSelect.style.width = '100%';
    for (const name of joined) leaveSelect.add(new Option(name, name));
    choices.append(leaveSelect);
    lifeChoiceButton(choices, '選んだ団体を退部する', () => {
      const current = loadGame();
      if (!current) return;
      const name = leaveSelect.value;
      const members = getJoinedClubs(current);
      if (!members.includes(name)) return;
      current.clubBonusHistory = [...new Set([
        ...(current.clubBonusHistory || []), ...members
      ])];
      current.clubs = members.filter(n => n !== name);
      current.club = current.clubs[0] || '無所属';
      current.clubCategory = findClubGroup(current.club)?.category || '無所属';
      saveClubEvent(current, year, `${name}を退部した。`);
    });
  }

  lifeChoiceButton(choices, '今回は変更しない', () => {
    const current = loadGame();
    if (current) saveClubEvent(current, year, '所属は変更しなかった。');
  });
}

function renderRomanceLifeEvent(game, key) {
  const moment = relationshipMoments[key];
  const r = ensureRelationships(game);
  const choices = lifeEventCanvas(
    'SPECIAL EVENT：友情・恋愛', moment.title,
    `${moment.description}（友情 ${r.friendship}／恋愛 ${r.romance}）`
  );
  for (const choice of relationshipChoices(game, key)) {
    lifeChoiceButton(choices, choice.label, () => {
      chooseRelationshipAction(choice.type);
      const updated = loadGame();
      if (!updated?.relationships?.played?.includes(key)) return;
      updated.lifeEventResult = {
        title: '友情・恋愛イベントの結果',
        message: updated.relationships.last?.message || '交流を楽しんだ。'
      };
      saveGame(updated);
      renderGame(updated);
    });
  }
}

function renderLifeEvent(game) {
  // 元の常設サイドパネルは隠す
  for (const id of ['relationship-panel', 'club-panel']) {
    const panel = document.getElementById(id);
    if (panel) panel.hidden = true;
  }

  if (game.lifeEventResult) {
    const choices = lifeEventCanvas('イベント結果',
      game.lifeEventResult.title, game.lifeEventResult.message);
    lifeChoiceButton(choices, '次へ進む', () => {
      const current = loadGame();
      if (!current) return;
      current.lifeEventResult = null;
      current.lifeEventStage = null;
      saveGame(current);
      if (current.pendingResult) {
        // イベント選択後なら、元の「次へ」処理で学期末計算まで行う
        document.getElementById('next-button').click();
      } else {
        renderGame(current);
      }
    });
    return;
  }

  if (game.lifeEventStage?.startsWith('relationship:')) {
    const key = game.lifeEventStage.slice('relationship:'.length);
    if (relationshipMoments[key]) renderRomanceLifeEvent(game, key);
    return;
  }

  const year = clubEventYear(game);
  if (year !== null) renderClubLifeEvent(game, year);
}

// 通常イベントの選択結果を見て「次へ」を押したところで恋愛イベントを挟む
// capture=true なので events.js の通常のクリック処理より先に呼ばれる。
document.getElementById('next-button').addEventListener('click', event => {
  const game = loadGame();
  if (!game || !game.pendingResult || !lifeEventActive(game) ||
      game.lifeEventStage || game.lifeEventResult) return;
  const key = `${game.year}-${game.turn}`;
  if (!relationshipMoments[key] || ensureRelationships(game).played.includes(key)) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  game.lifeEventStage = `relationship:${key}`;
  saveGame(game);
  renderGame(game);
}, true);
