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

// ---------- 체험 화면: 편집 모드 + 오른쪽 = 왼쪽과 동일한 구조의 거울 ----------
const leftTitle = document.getElementById('left-title');
const leftBody = document.getElementById('left-body');
const leftMeta = document.getElementById('left-meta');
const editBtn = document.getElementById('edit-toggle-btn');
const rightTitle = document.getElementById('right-title');
const rightVersion = document.getElementById('right-version');
const rightBody = document.getElementById('right-body');
const leftTable = document.getElementById('left-table');
const rightTable = document.getElementById('right-table');
const flashLeft = document.getElementById('flash-left');
const flashRight = document.getElementById('flash-right');

let isEditing = false;
let version = 1.0;
let touchCounter = 0;

// key = "p3-1" (3번째 문단의 2번째 문장) -> { text, lastTouched }
const revealedMap = new Map();

function splitSentences(text) {
  return text.trim().split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 0);
}

// 왼쪽 각 문단의 "현재 문장 배열"을 저장해둠 (편집 시작 시 스냅샷으로도 사용)
let paragraphState = {}; // { "0": [문장, 문장...], "1": [...], ... }

function captureParagraphState() {
  const state = {};
  leftBody.querySelectorAll('p[data-p]').forEach(p => {
    state[p.dataset.p] = splitSentences(p.textContent);
  });
  return state;
}
paragraphState = captureParagraphState();

// 오른쪽 본문의 각 <p>에 왼쪽과 동일한 개수의 <span class="sentence hidden">를 채워 넣는다.
function initRightParagraphs() {
  rightBody.querySelectorAll('p[data-p]').forEach(p => {
    const pIndex = p.dataset.p;
    const sentences = paragraphState[pIndex] || [];
    p.innerHTML = sentences.map((s, i) =>
      `<span class="sentence hidden" data-p="${pIndex}" data-s="${i}">${s}</span>`
    ).join(' ');
  });
}
initRightParagraphs();

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

// 새로고침처럼 두 번 깜빡이는, 이전보다 뚜렷한 플래시
function refreshFlash(el) {
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, 90);
  setTimeout(() => { el.style.opacity = '1'; }, 170);
  setTimeout(() => { el.style.opacity = '0'; }, 270);
}

function evictIfNeeded() {
  while (revealedMap.size > 5) {
    let oldestKey = null, oldestTouch = Infinity;
    revealedMap.forEach((entry, key) => {
      if (entry.lastTouched < oldestTouch) { oldestTouch = entry.lastTouched; oldestKey = key; }
    });
    if (oldestKey !== null) {
      revealedMap.delete(oldestKey);
      const span = rightBody.querySelector(`.sentence[data-p="${oldestKey.split('-')[0]}"][data-s="${oldestKey.split('-')[1]}"]`);
      if (span) { span.classList.add('hidden'); span.classList.remove('diff-removed','diff-added'); }
    }
  }
}

editBtn.addEventListener('click', () => {
  if (!isEditing) {
    // 편집 시작
    isEditing = true;
    editBtn.textContent = '완료';
    editBtn.classList.add('done');
    leftTitle.setAttribute('contenteditable', 'true');
    leftBody.querySelectorAll('p[data-p]').forEach(p => p.setAttribute('contenteditable', 'true'));
    leftTable.querySelectorAll('td').forEach(td => td.setAttribute('contenteditable', 'true'));
    paragraphState = captureParagraphState();
    leftTitle.focus();
  } else {
    // 편집 완료 -> 오른쪽에 반영
    isEditing = false;
    editBtn.textContent = '편집';
    editBtn.classList.remove('done');
    leftTitle.removeAttribute('contenteditable');
    leftBody.querySelectorAll('p[data-p]').forEach(p => p.removeAttribute('contenteditable'));
    leftTable.querySelectorAll('td').forEach(td => td.removeAttribute('contenteditable'));

    leftMeta.textContent = '최종 수정 시각 : ' + formatTimestamp(new Date());
    refreshFlash(flashLeft);

    // 제목: 즉시 반영 (구조 요소라 5문장 큐와 무관)
    const currentTitle = leftTitle.textContent.trim();
    if (currentTitle !== rightTitle.textContent.trim()) {
      rightTitle.textContent = currentTitle;
    }

    // 문단별 문장 비교
    const newState = captureParagraphState();
    let anyChange = false;
    const touchedThisRound = [];

    Object.keys(newState).forEach(pIndex => {
      const oldSentences = paragraphState[pIndex] || [];
      const newSentences = newState[pIndex] || [];

      if (newSentences.length !== oldSentences.length) {
        // 문장 개수 자체가 바뀐 경우: 이 문단은 span을 다시 만들고, 전부 숨김에서 시작
        const p = rightBody.querySelector(`p[data-p="${pIndex}"]`);
        if (p) {
          p.innerHTML = newSentences.map((s, i) =>
            `<span class="sentence hidden" data-p="${pIndex}" data-s="${i}">${s}</span>`
          ).join(' ');
        }
        // 이 문단에 속했던 기존 revealedMap 항목은 정리
        Array.from(revealedMap.keys()).forEach(key => {
          if (key.split('-')[0] === pIndex) revealedMap.delete(key);
        });
      }

      const maxLen = Math.max(oldSentences.length, newSentences.length);
      for (let i = 0; i < maxLen; i++) {
        const oldS = oldSentences[i] || '';
        const newS = newSentences[i] || '';
        if (oldS !== newS && newS) {
          anyChange = true;
          const key = pIndex + '-' + i;
          const d = simpleWordDiff(oldS, newS);
          const diffHtml = d.before +
            (d.removed ? '<span class="diff-removed">' + d.removed + '</span>' : '') +
            (d.added ? '<span class="diff-added">' + d.added + '</span>' : '') +
            d.after;

          touchCounter++;
          revealedMap.set(key, { text: newS, lastTouched: touchCounter });
          touchedThisRound.push({ key, diffHtml, plain: newS });
        }
      }
    });

    // 표 셀 비교 (틀은 항상 보이고, 값이 채워지면 그 즉시 드러남 — 5개 제한 없음)
    leftTable.querySelectorAll('td[data-cell]').forEach(td => {
      const cellIndex = td.dataset.cell;
      const rightTd = rightTable.querySelector(`td[data-cell="${cellIndex}"]`);
      const val = td.textContent.trim();
      if (rightTd && rightTd.textContent.trim() !== val) {
        rightTd.textContent = val;
        anyChange = true;
      }
    });
    // 표 라벨 열도 왼쪽 수정 시 함께 반영
    leftTable.querySelectorAll('td.label').forEach((td, i) => {
      const rightLabelTds = rightTable.querySelectorAll('td.label');
      if (rightLabelTds[i] && rightLabelTds[i].textContent.trim() !== td.textContent.trim()) {
        rightLabelTds[i].textContent = td.textContent.trim();
      }
    });

    if (anyChange) {
      evictIfNeeded();

      // 새로 바뀐 문장들: diff 표시 후 정착
      touchedThisRound.forEach(({ key, diffHtml }) => {
        const [p, s] = key.split('-');
        const span = rightBody.querySelector(`.sentence[data-p="${p}"][data-s="${s}"]`);
        if (span) {
          span.classList.remove('hidden');
          span.innerHTML = diffHtml;
        }
      });

      refreshFlash(flashRight);
      version += 0.1;
      rightVersion.textContent = 'ver. ' + version.toFixed(1);

      setTimeout(() => {
        touchedThisRound.forEach(({ key, plain }) => {
          const [p, s] = key.split('-');
          const span = rightBody.querySelector(`.sentence[data-p="${p}"][data-s="${s}"]`);
          if (span) span.textContent = plain;
        });
      }, 1300);
    }

    paragraphState = newState;
  }
});

leftMeta.textContent = '최종 수정 시각 : ' + formatTimestamp(new Date());