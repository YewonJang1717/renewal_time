// ---------- 화면 전환 ----------
const screens = {
  main: document.getElementById('screen-main'),
  explain: document.getElementById('screen-explain'),
  experience: document.getElementById('screen-experience'),
};

function goTo(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  closeAllMenus();
  if (name === 'experience') {
    const hint = document.getElementById('intro-hint');
    hint.classList.add('show');
    clearTimeout(goTo._hintTimer);
    goTo._hintTimer = setTimeout(() => hint.classList.remove('show'), 4000);
  }
}

document.querySelectorAll('[data-nav]').forEach(btn => {
  btn.addEventListener('click', () => goTo(btn.dataset.nav));
});

// ---------- 햄버거 메뉴 ----------
const menus = {
  explain: document.getElementById('menu-explain'),
  experience: document.getElementById('menu-experience'),
};

function closeAllMenus() {
  Object.values(menus).forEach(m => m.classList.remove('open'));
}

document.querySelectorAll('[data-menu-toggle]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const screenId = btn.closest('.screen').id.replace('screen-', '');
    const menu = menus[screenId];
    const isOpen = menu.classList.contains('open');
    closeAllMenus();
    if (!isOpen) menu.classList.add('open');
  });
});
document.addEventListener('click', closeAllMenus);

// ---------- 설명 화면: 단어별 scramble 효과 (줄바꿈 \n 지원) ----------
const explainSource = "오늘날 우리는 디지털 환경에서 많은 시간을 보낸다. 그 속에서 5년, 10년, 20년, 또는 그보다도 더 된 과거의 기록들을 마주하기도 한다. 그럴 때 우리는 디지털 기록에서 영원을 느낀다. 우리가 죽어도, 우리의 다음 세대가 죽어도, 우리의 기록은 이 인터넷 세계에 똑같이 남아있는 게 아닐까? 그러나 동시에 디지털 기록은 어쩌면, 아날로그보다 훨씬 연약한 것일 수 있다. 우리가 남긴 기록은 우리가 눈 한 번 깜빡하는 사이 완전히 다른 내용으로 바뀌어 있을지도 모른다.\n\n웹은 갱신된다. 이 작업에서, 우리는 그렇게 정의했다. 그 갱신이란 건 무엇일까? 웹에는 어떻게 시간의 흔적이 남고 있는 것일까.";
const explainEl = document.getElementById('explain-text');
const scrambleChars = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ#%&*';

function attachScramble(span) {
  span.addEventListener('mouseenter', () => {
    const original = span.dataset.original;
    let frame = 0;
    const totalFrames = 6;
    const interval = setInterval(() => {
      frame++;
      if (frame < totalFrames) {
        span.textContent = original.split('').map(c =>
          scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        ).join('');
      } else {
        clearInterval(interval);
        span.textContent = original;
      }
    }, 45);
  });
}

const explainWords = explainSource.split(' ');
explainWords.forEach((word, i) => {
  if (word.includes('\n')) {
    const parts = word.split('\n');
    parts.forEach((part, idx) => {
      if (idx > 0) explainEl.appendChild(document.createElement('br'));
      if (part) {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = part;
        span.dataset.original = part;
        explainEl.appendChild(span);
        attachScramble(span);
      }
    });
  } else {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    span.dataset.original = word;
    explainEl.appendChild(span);
    attachScramble(span);
  }
  if (i < explainWords.length - 1) explainEl.appendChild(document.createTextNode(' '));
});

// ---------- 체험 화면: 좌우 패널 hover 확대 ----------
const panelLeft = document.getElementById('panel-left');
const panelRight = document.getElementById('panel-right');
const experienceStage = document.getElementById('screen-experience');

function setActivePanel(activePanel) {
  [panelLeft, panelRight].forEach(p => { p.classList.remove('grow'); p.classList.remove('shrink'); });
  if (activePanel) {
    activePanel.classList.add('grow');
    (activePanel === panelLeft ? panelRight : panelLeft).classList.add('shrink');
  }
}
panelLeft.addEventListener('mouseenter', () => setActivePanel(panelLeft));
panelRight.addEventListener('mouseenter', () => setActivePanel(panelRight));
experienceStage.addEventListener('mouseleave', () => setActivePanel(null));
panelLeft.addEventListener('click', () => {
  document.getElementById('intro-hint').classList.remove('show');
});

// ==========================================================================
// 체험 화면: 자유 항목(==제목== 형식) + 표 추가/삭제 + 위치 고정 5문장 로그
// ==========================================================================
const leftTitle = document.getElementById('left-title');
const leftBody = document.getElementById('left-body');
const leftMeta = document.getElementById('left-meta');
const editBtn = document.getElementById('edit-toggle-btn');
const addTableBtn = document.getElementById('add-table-btn');
const rightTitle = document.getElementById('right-title');
const rightVersion = document.getElementById('right-version');
const rightBody = document.getElementById('right-body');

let isEditing = false;
let version = 1.0;
let touchCounter = 0;

// key = "b3-1" (블록 b3의 2번째 문장) -> { text, lastTouched }
const revealedMap = new Map();

// 블록(문단/소제목/표) 하나하나에 안정적인 id를 부여 — DOM 노드가 같으면 id도 유지됨
const blockIdMap = new WeakMap();
let blockIdCounter = 0;
function getBlockId(node) {
  if (!blockIdMap.has(node)) blockIdMap.set(node, 'b' + (blockIdCounter++));
  return blockIdMap.get(node);
}

function splitSentences(text) {
  return text.trim().split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 0);
}

function formatTimestamp(d) {
  const pad = n => String(n).padStart(2, '0');
  return `${String(d.getFullYear()).slice(2)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function simpleWordDiff(oldText, newText) {
  const oldWords = oldText.split(/(\s+)/);
  const newWords = newText.split(/(\s+)/);
  let prefix = 0;
  while (prefix < oldWords.length && prefix < newWords.length && oldWords[prefix] === newWords[prefix]) prefix++;
  let oldEnd = oldWords.length, newEnd = newWords.length;
  while (oldEnd > prefix && newEnd > prefix && oldWords[oldEnd-1] === newWords[newEnd-1]) { oldEnd--; newEnd--; }
  return {
    before: oldWords.slice(0, prefix).join(''),
    removed: oldWords.slice(prefix, oldEnd).join(''),
    added: newWords.slice(prefix, newEnd).join(''),
    after: oldWords.slice(oldEnd).join('')
  };
}

function refreshFlash(el) {
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, 90);
  setTimeout(() => { el.style.opacity = '1'; }, 170);
  setTimeout(() => { el.style.opacity = '0'; }, 270);
}

// 헤딩 요소 생성 (번호 부분은 별도 span으로, 실제 편집 대상은 .heading-text만)
function makeHeadingDiv(rawText, level) {
  const div = document.createElement('div');
  div.className = 'wiki-subheading wiki-subheading' + level;
  const num = document.createElement('span');
  num.className = 'heading-num';
  const textSpan = document.createElement('span');
  textSpan.className = 'heading-text';
  textSpan.textContent = rawText;
  div.appendChild(num);
  div.appendChild(document.createTextNode(' '));
  div.appendChild(textSpan);
  return div;
}

// "=내용=" -> 1단계 항목(1. 2. 3. ...), "-내용-" -> 2단계 항목(1.1, 1.2 ...)으로 변환
function convertPendingHeadings(bodyEl) {
  Array.from(bodyEl.querySelectorAll('p')).forEach(p => {
    const text = p.textContent.trim();
    let m = text.match(/^-\s*(.+?)\s*-$/);
    if (m) { p.replaceWith(makeHeadingDiv(m[1], 2)); return; }
    m = text.match(/^=\s*(.+?)\s*=$/);
    if (m) { p.replaceWith(makeHeadingDiv(m[1], 1)); return; }
  });
}

// 문서 순서대로 훑으며 1단계/2단계 번호를 새로 매김
function renumberHeadings(containerEl) {
  let topCount = 0, subCount = 0;
  Array.from(containerEl.children).forEach(el => {
    if (!el.classList || !el.classList.contains('wiki-subheading')) return;
    const numEl = el.querySelector('.heading-num');
    if (el.classList.contains('wiki-subheading1')) {
      topCount++; subCount = 0;
      if (numEl) numEl.textContent = topCount + '.';
    } else if (el.classList.contains('wiki-subheading2')) {
      subCount++;
      if (numEl) numEl.textContent = topCount + '.' + subCount;
    }
  });
}

// 행에 삭제 버튼(세 번째 칸, 편집 중에만 보임) 부착
function ensureRowControls(table) {
  table.querySelectorAll('tr').forEach(tr => {
    if (tr.querySelector('.row-controls')) return;
    const td = document.createElement('td');
    td.className = 'row-controls';
    const btn = document.createElement('button');
    btn.className = 'row-remove-btn';
    btn.textContent = '✕';
    btn.addEventListener('click', () => { tr.remove(); });
    td.appendChild(btn);
    tr.appendChild(td);
  });
}

// 표에 삭제 버튼(편집 중에만 보임) 부착 + 행 추가 버튼 + 행별 삭제 컨트롤
function ensureTableRemoveButton(table) {
  ensureRowControls(table);
  if (table.parentElement && table.parentElement.classList.contains('table-block')) return;
  const wrap = document.createElement('div');
  wrap.className = 'table-block';
  table.parentNode.insertBefore(wrap, table);
  wrap.appendChild(table);

  const removeBtn = document.createElement('button');
  removeBtn.className = 'table-remove-btn';
  removeBtn.textContent = '✕ 표 삭제';
  removeBtn.addEventListener('click', () => { wrap.remove(); });

  const addRowBtn = document.createElement('button');
  addRowBtn.className = 'row-add-btn';
  addRowBtn.textContent = '+ 행 추가';
  addRowBtn.addEventListener('click', () => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="label" contenteditable="true">항목</td><td contenteditable="true"></td>`;
    table.appendChild(tr);
    ensureRowControls(table);
    tr.querySelector('td').focus();
  });

  wrap.insertBefore(addRowBtn, table);
  wrap.insertBefore(removeBtn, table);
}
leftBody.querySelectorAll('table.wiki-table').forEach(ensureTableRemoveButton);

addTableBtn.addEventListener('click', () => {
  const table = document.createElement('table');
  table.className = 'wiki-table';
  table.innerHTML = `
    <tr><td class="label" contenteditable="true">항목</td><td contenteditable="true"></td></tr>
    <tr><td class="label" contenteditable="true">항목</td><td contenteditable="true"></td></tr>
  `;
  leftBody.appendChild(table);
  ensureTableRemoveButton(table);
  table.querySelector('td').focus();
});

// 왼쪽 body를 순서대로 훑어 블록 리스트로 추출 (문단/소제목/표)
function extractBlocks(bodyEl) {
  const blocks = [];
  Array.from(bodyEl.children).forEach(el => {
    if (el.classList && el.classList.contains('wiki-subheading1')) {
      const textEl = el.querySelector('.heading-text');
      blocks.push({ id: getBlockId(el), type: 'heading1', text: (textEl || el).textContent.trim() });
    } else if (el.classList && el.classList.contains('wiki-subheading2')) {
      const textEl = el.querySelector('.heading-text');
      blocks.push({ id: getBlockId(el), type: 'heading2', text: (textEl || el).textContent.trim() });
    } else if (el.tagName === 'P') {
      const text = el.textContent.trim();
      if (text) blocks.push({ id: getBlockId(el), type: 'paragraph', sentences: splitSentences(text) });
    } else if (el.classList && el.classList.contains('table-block')) {
      const table = el.querySelector('table');
      if (!table) return;
      const rows = Array.from(table.querySelectorAll('tr')).map(tr => {
        const tds = Array.from(tr.querySelectorAll('td'));
        return { label: tds[0] ? tds[0].textContent.trim() : '', value: tds[1] ? tds[1].textContent.trim() : '' };
      });
      blocks.push({ id: getBlockId(el), type: 'table', rows });
    }
  });
  return blocks;
}

let previousBlocks = extractBlocks(leftBody);

// 오른쪽 패널을 blocks 데이터로부터 통째로 다시 그림
function renderRightBody(blocks) {
  rightBody.innerHTML = '';
  blocks.forEach(block => {
    if (block.type === 'heading1' || block.type === 'heading2') {
      rightBody.appendChild(makeHeadingDiv(block.text, block.type === 'heading1' ? 1 : 2));
    } else if (block.type === 'paragraph') {
      const p = document.createElement('p');
      block.sentences.forEach((s, i) => {
        const key = block.id + '-' + i;
        const span = document.createElement('span');
        span.className = 'sentence' + (revealedMap.has(key) ? '' : ' hidden');
        span.dataset.key = key;
        span.textContent = s;
        p.appendChild(span);
        p.appendChild(document.createTextNode(' '));
      });
      rightBody.appendChild(p);
    } else if (block.type === 'table') {
      const wrap = document.createElement('div');
      wrap.className = 'table-block';
      const table = document.createElement('table');
      table.className = 'wiki-table';
      block.rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="label">${row.label}</td><td>${row.value}</td>`;
        table.appendChild(tr);
      });
      wrap.appendChild(table);
      rightBody.appendChild(wrap);
    }
  });
  renumberHeadings(rightBody);
}
renderRightBody(previousBlocks); // 초기 상태 렌더
renumberHeadings(leftBody); // 왼쪽 초기 번호 매기기

function evictIfNeeded() {
  while (revealedMap.size > 5) {
    let oldestKey = null, oldestTouch = Infinity;
    revealedMap.forEach((entry, key) => {
      if (entry.lastTouched < oldestTouch) { oldestTouch = entry.lastTouched; oldestKey = key; }
    });
    if (oldestKey !== null) revealedMap.delete(oldestKey);
  }
}

const helpWrap = document.getElementById('help-wrap');
const helpBtn = document.getElementById('help-btn');
const helpPopover = document.getElementById('help-popover');
helpBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  helpPopover.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!helpWrap.contains(e.target)) helpPopover.classList.remove('open');
});

editBtn.addEventListener('click', () => {
  if (!isEditing) {
    // 편집 시작
    isEditing = true;
    leftBody.classList.add('is-editing');
    editBtn.textContent = '완료';
    editBtn.classList.add('done');
    addTableBtn.style.display = 'inline-block';
    document.getElementById('help-wrap').style.display = 'inline-block';
    leftTitle.setAttribute('contenteditable', 'true');
    leftBody.querySelectorAll('p, .heading-text').forEach(el => el.setAttribute('contenteditable', 'true'));
    leftBody.querySelectorAll('td:not(.row-controls)').forEach(td => td.setAttribute('contenteditable', 'true'));
    leftBody.setAttribute('contenteditable', 'true'); // 새 문단(Enter)이나 맨 끝 추가 입력 허용
    previousBlocks = extractBlocks(leftBody);
    leftTitle.focus();
  } else {
    // 편집 완료 -> 오른쪽에 반영
    isEditing = false;
    leftBody.classList.remove('is-editing');
    editBtn.textContent = '편집';
    editBtn.classList.remove('done');
    addTableBtn.style.display = 'none';
    document.getElementById('help-wrap').style.display = 'none';
    helpPopover.classList.remove('open');
    leftTitle.removeAttribute('contenteditable');
    leftBody.removeAttribute('contenteditable');
    leftBody.querySelectorAll('p, .heading-text').forEach(el => el.removeAttribute('contenteditable'));
    leftBody.querySelectorAll('td:not(.row-controls)').forEach(td => td.removeAttribute('contenteditable'));

    convertPendingHeadings(leftBody);
    renumberHeadings(leftBody);
    leftBody.querySelectorAll('table.wiki-table').forEach(ensureTableRemoveButton);

    leftMeta.textContent = '최종 수정 시각 : ' + formatTimestamp(new Date());
    refreshFlash(document.getElementById('flash-left'));

    const currentTitle = leftTitle.textContent.trim();
    if (currentTitle !== rightTitle.textContent.trim()) rightTitle.textContent = currentTitle;

    const currentBlocks = extractBlocks(leftBody);
    const prevById = new Map(previousBlocks.map(b => [b.id, b]));
    let anyChange = false;

    currentBlocks.forEach(block => {
      if (block.type !== 'paragraph') { anyChange = true; return; } // 소제목/표는 구조 변경이라 항상 갱신으로 취급
      const prevBlock = prevById.get(block.id);
      const oldSentences = prevBlock && prevBlock.type === 'paragraph' ? prevBlock.sentences : [];
      const maxLen = Math.max(oldSentences.length, block.sentences.length);
      for (let i = 0; i < maxLen; i++) {
        const oldS = oldSentences[i] || '';
        const newS = block.sentences[i] || '';
        if (oldS !== newS && newS) {
          anyChange = true;
          const key = block.id + '-' + i;
          touchCounter++;
          revealedMap.set(key, { text: newS, lastTouched: touchCounter });
        }
      }
    });

    if (currentBlocks.length !== previousBlocks.length) anyChange = true;

    if (anyChange) {
      evictIfNeeded();
      renderRightBody(currentBlocks);

      // 이번 편집에서 바뀐 문장만 diff로 잠깐 보여주고 정착
      currentBlocks.forEach(block => {
        if (block.type !== 'paragraph') return;
        const prevBlock = prevById.get(block.id);
        const oldSentences = prevBlock && prevBlock.type === 'paragraph' ? prevBlock.sentences : [];
        block.sentences.forEach((newS, i) => {
          const oldS = oldSentences[i] || '';
          if (oldS !== newS && newS) {
            const key = block.id + '-' + i;
            const d = simpleWordDiff(oldS, newS);
            const diffHtml = d.before +
              (d.removed ? '<span class="diff-removed">' + d.removed + '</span>' : '') +
              (d.added ? '<span class="diff-added">' + d.added + '</span>' : '') +
              d.after;
            const span = rightBody.querySelector(`.sentence[data-key="${key}"]`);
            if (span) span.innerHTML = diffHtml;
          }
        });
      });

      refreshFlash(document.getElementById('flash-right'));
      version += 0.1;
      rightVersion.textContent = 'ver. ' + version.toFixed(1);

      setTimeout(() => {
        renderRightBody(currentBlocks);
      }, 1300);
    }

    previousBlocks = currentBlocks;
  }
});

leftMeta.textContent = '최종 수정 시각 : ' + formatTimestamp(new Date());