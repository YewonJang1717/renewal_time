// ---------- 화면 전환 ----------
const screens = {
  main: document.getElementById('screen-main'),
  explain: document.getElementById('screen-explain'),
  experience: document.getElementById('screen-experience'),
};

function goTo(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  updateActiveTab(name);

  if (name === 'explain') {
    document.getElementById('explain-scroll').scrollTop = 0;
    playIntroHeadingAnimation();
    const toast = document.getElementById('scroll-toast');
    toast.classList.add('show');
    clearTimeout(goTo._toastTimer);
    goTo._toastTimer = setTimeout(() => toast.classList.remove('show'), 1000);
  }
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') goTo('main');
});
document.querySelectorAll('[data-nav]').forEach(btn => {
  btn.addEventListener('click', () => goTo(btn.dataset.nav));
});

function updateActiveTab(name) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === name);
  });
}

// ---------- 설명 화면 ----------
const explainParagraphs = [
  "  오늘날 우리는 디지털 환경에서 많은 시간을 보낸다. 그 속에서 5년, 10년, 20년, 또는 그보다도 더 된 과거의 기록들을 마주하기도 한다. 그럴 때 우리는 디지털 기록에서 영원을 느낀다. 우리가 죽어도, 우리의 다음 세대가 죽어도, 우리의 기록은 이 인터넷 세계에 똑같이 남아있는 게 아닐까? 그러나 동시에 디지털 기록은 어쩌면, 아날로그보다 훨씬 연약한 것일 수 있다. 우리가 남긴 기록은 우리가 눈 한 번 깜빡하는 사이 완전히 다른 내용으로 바뀌어 있을지도 모른다.<br><br>  웹은 갱신된다. 이 작업에서, 우리는 그렇게 정의했다. 그 갱신이란 건 무엇일까? 비물질적인 매체인 웹에는 어떻게 시간의 흔적이 남고 있는 것일까?",
  "  네이버 국어사전에 따르면, 갱신이란 단어는 '이미 있던 것을 고쳐 새롭게 하다', '기존의 내용을 변동된 사실에 따라 변경ㆍ추가ㆍ삭제하는 일'이라는 의미를 갖고 있다. 종이에 인쇄된 내용은 변하지 않는다. 물론 찢어지고, 물에 젖고, 불에 타는 등의 변화는 일어난다. 하지만 그것은 종이라는 매체에 일어나는 변화일 뿐, 내용에 일어나는 변화가 아니다. \n\n  웹에서는 다르다. 이미 완성해 배포한 웹이라도, 코드를 조금 수정하면 순식간에 디자인을 바꿀 수 있다. 배경색을 바꾸는 것도, 새로운 사진을 넣는 것도, 글을 조금 삭제하는 것도 너무 간단한 일이다. 웹에서는 매체 뿐만 아니라 내용도 변화를 겪는다. 변경되고, 추가되고, 삭제된다. 그래서 우리는 웹이 갱신된다고 한다.",
  "  우리는 어떨 때 웹에서 갱신을 경험할까? 일상적인 예시로는 새로고침에 의한 갱신이 있다. 유튜브, 인스타그램, 뉴스 사이트 등··· 많은 웹에서 흔히 마주할 수 있다.",
  "  또다른 예시로는 덮어쓰기가 있다. 글의 내용이, 이미지가, 어떨 땐 사이트 자체가 통째로 덮어씌워져 아예 다른 무언가가 되어버린다. 업데이트도 이와 비슷한 방식으로 이루어진다. 이전의 버전이 새로운 버전으로 덮어씌워진다.",
  "  예전에 본 적 있는 사이트에 404 error가 뜨며 접속이 불가능하게 된 경험이 있을 것이다. 화면에 남은 건 오류 메시지 뿐이지만, 이 역시 기존의 기록이 삭제되었다는 점에서 갱신으로 볼 수 있다.",
  "  이 웹사이트는 갱신을 테마로 한다. 우리는 갱신을 특징으로 하는 웹의 형태 중 위키를 선택했다. 이유는 간단하다. 누구나 위키를 알고 있기 때문이다. 편집을 해본 적은 없더라도, 위키에 있는 정보를 마주한 경험은 누구나 있을 것이다. 그리고 위키 문서를 보다가 저번에 봤을 때와 내용이 조금 달라진 것을 눈치챈 적이 있는 사람도 분명 많을 것이다. 갱신되었음을 체감하는 순간이다. \n\n '경험하는 시간' 탭은 간단히 설명하면 체험 화면이다. '경험하는 시간'에서 관객은 위키 문서의 글을 자유롭게 수정할 수 있다. 내용을 추가할 수도 있고, 완전히 다른 내용으로 덮어씌울 수도 있다. 그것만으로도 이미 갱신을 경험할 수 있지만, 이 웹은 거기서 한 발짝 더 나아간다. 우측 패널에 방금 수정된 문장만을 띄우는 것이다. 가장 최근의 기록만을 보여주는 우측 패널은 끊임없이 갱신되는 웹의 현재성을 강조한다. 이는 지나간 흔적을 담아내는 진과 대비되는 모습으로, 과거의 기록을 흔적도 없이 지울 수 있는 웹만의 특성을 보여준다.",
  "  웹은 지금 이 순간, 현재를 보여준다. 그렇다면 과거를 저장하는 데 있어 웹은 진보다 못한 매체인 것일까? 결코 그렇지 않다. 웹은 종이와 다른 방식으로 정보를 기록하는 것뿐이다. 종이가 순간을 저장한다면 웹은 상태를 저장한다. 세계 최초의 웹사이트인 World Wide Web을 떠올려 보자. 30년도 넘은 웹사이트지만 전혀 낡지 않았다. 마지막으로 편집되었을 때의 상태를 유지하고 있기 때문이다. 즉 웹은 지나간 순간들을 축적할 수는 없어도, 과거의 상태를 유지하는 데는 특화되어 있다. 그리고 언제나, 가장 최신의 상태로 갱신될 준비가 되어 있다. \n\n 또한 무언가 새로워졌다는 것을 알아차리려면 바뀌기 전의 모습을 함께 기억하고 있어야 한다. 그렇다면 웹의 갱신은 웹 고유의 방법으로 과거를 환기시키는 것이라고 볼 수 있는 것이 아닐까. 갱신됨으로써 남는 시간의 흔적이, 분명 있을 것이다."
];
const explainIntroCount = 1;
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

const explainScroll = document.getElementById('explain-scroll');
const explainHeadings = ["들어가는 말", "갱신되는 웹", "갱신되는 경험", "갱신되는 경험","갱신되는 경험", "갱신되는 시간", "끝맺는 말"];

explainParagraphs.forEach((paragraph, pIndex) => {
  const page = document.createElement('div');
  page.className = 'explain-page';

  const h2 = document.createElement('h2');
  h2.textContent = explainHeadings[pIndex] || '';
  page.appendChild(h2);

  if (pIndex === 5 || pIndex === 6) {
    // 2단 조판: \n\n(또는 \n) 기준으로 나눈 문단을 왼쪽/오른쪽 칸에 하나씩 배정
    const chunks = paragraph.split(/\n+/).map(c => c.trim()).filter(Boolean);
    const wrap = document.createElement('div');
    wrap.className = 'explain-columns-wrap';
    const col1 = document.createElement('div');
    col1.className = 'explain-col';
    const col2 = document.createElement('div');
    col2.className = 'explain-col';
    chunks.forEach((chunk, i) => {
      const p = document.createElement('p');
      p.textContent = chunk;
      (i % 2 === 0 ? col1 : col2).appendChild(p);
    });
    wrap.appendChild(col1);
    wrap.appendChild(col2);
    page.appendChild(wrap);
  } else {
    const body = document.createElement('div');
    body.className = 'explain-body';

    if (pIndex < explainIntroCount) {
      const words = paragraph.split(' ');
      words.forEach((word, i) => {
        if (word.includes('\n') || word.includes('<br>')) {
          const parts = word.split(/\n|<br>/);
          parts.forEach((part, idx) => {
            if (idx > 0) body.appendChild(document.createElement('br'));
            if (part) {
              const span = document.createElement('span');
              span.className = 'word';
              span.textContent = part;
              span.dataset.original = part;
              body.appendChild(span);
              attachScramble(span);
            }
          });
        } else {
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = word;
          span.dataset.original = word;
          body.appendChild(span);
          attachScramble(span);
        }
        if (i < words.length - 1) body.appendChild(document.createTextNode(' '));
      });
    } else {
      body.textContent = paragraph;
    }
    page.appendChild(body);
  }

  explainScroll.appendChild(page);
});

gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.explain-page h2').forEach((heading, hIndex) => {
  const chars = heading.textContent.split('');
  heading.innerHTML = chars.map(c => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
  if (hIndex === 0) return;
  gsap.fromTo(
    heading.querySelectorAll('.char'),
    { opacity: 0, y: 50, rotateX: -70 },
    {
      opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.035, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: heading, scroller: '#explain-scroll', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );
});

function playIntroHeadingAnimation() {
  const firstHeading = document.querySelector('.explain-page h2');
  if (!firstHeading) return;
  gsap.fromTo(
    firstHeading.querySelectorAll('.char'),
    { opacity: 0, y: 50, rotateX: -70 },
    { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.035, ease: 'back.out(1.7)' }
  );
}

const scrollHint = document.getElementById('scroll-hint');
explainScroll.addEventListener('scroll', () => {
  const nearBottom = explainScroll.scrollTop + explainScroll.clientHeight >= explainScroll.scrollHeight - 10;
  scrollHint.classList.toggle('faded', nearBottom);
});

const explainPages = document.querySelectorAll('.explain-page');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
}, { threshold: 0.4 });
explainPages.forEach(page => revealObserver.observe(page));

// 3번째 페이지(새로고침 예시) 도착 시 진짜 새로고침 + 그 페이지로 복귀 + 문장 추가
const refreshDemoPage = explainPages[2];
if (refreshDemoPage) {
  const body = refreshDemoPage.querySelector('.explain-body');
  const original = body.textContent;
  const target = '새로고침';
  const idx = original.indexOf(target);
  if (idx !== -1) {
    body.innerHTML = '';
    body.appendChild(document.createTextNode(original.slice(0, idx)));
    const link = document.createElement('span');
    link.className = 'clickable-word';
    link.textContent = target;
    link.addEventListener('click', () => {
      sessionStorage.setItem('reloadTarget', 'explain-2');
      location.reload();
    });
    body.appendChild(link);
    body.appendChild(document.createTextNode(original.slice(idx + target.length)));
  }
}
// 새로고침 이후, 원래 있던 자리(설명 화면 3번째 페이지)로 자동 복귀
if (sessionStorage.getItem('reloadTarget') === 'explain-2') {
  sessionStorage.removeItem('reloadTarget');
  goTo('explain');
  const targetPage = explainPages[2];
  if (targetPage) {
    explainScroll.scrollTop = targetPage.offsetTop;
    const body = targetPage.querySelector('.explain-body');
    body.textContent += '\n\n  바로 방금 전처럼 말이다.';
  }
}

function typewriterOverwrite(el, oldText, newText, speed = 18) {
  const len = Math.max(oldText.length, newText.length);
  let i = 0;
  const interval = setInterval(() => {
    if (i >= len) {
      clearInterval(interval);
      el.textContent = newText;
      return;
    }
    el.textContent = newText.slice(0, i + 1) + oldText.slice(i + 1);
    i++;
  }, speed);
}

const overwriteReplacementText = "  방금 이 글은 덮어쓰기 되었다. 순식간에 벌어진 일이다. 당신은 덮어씌워지기 전의 텍스트를 기억하는가?";
const overwritePage = explainPages[3];
if (overwritePage) {
  const body = overwritePage.querySelector('.explain-body');
  const original = body.textContent;
  const target = '덮어쓰기';
  const idx = original.indexOf(target);
  if (idx !== -1) {
    body.innerHTML = '';
    body.appendChild(document.createTextNode(original.slice(0, idx)));
    const link = document.createElement('span');
    link.className = 'clickable-word';
    link.textContent = target;
    link.addEventListener('click', () => {
      typewriterOverwrite(body, body.textContent, overwriteReplacementText);
    });
    body.appendChild(link);
    body.appendChild(document.createTextNode(original.slice(idx + target.length)));
  }
}

// '404 error' 클릭 시 가짜 404 화면 오버레이 (5번째 페이지)
const errorPage = explainPages[4];
if (errorPage) {
  const body = errorPage.querySelector('.explain-body');
  const original = body.textContent;
  const target = '404 error';
  const idx = original.indexOf(target);
  if (idx !== -1) {
    body.innerHTML = '';
    body.appendChild(document.createTextNode(original.slice(0, idx)));
    const link = document.createElement('span');
    link.className = 'clickable-word';
    link.textContent = target;
    link.addEventListener('click', () => {
  window.open('https://yewonjang1717.github.io/renewal_time/this-page-does-not-exist', '_blank');
});
    body.appendChild(link);
    body.appendChild(document.createTextNode(original.slice(idx + target.length)));
  }
}

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

// ---------- 체험 화면: 자유 항목 + 표 추가/삭제 + 위치 고정 1문장 표시 ----------
const leftTitle = document.getElementById('left-title');
const leftBody = document.getElementById('left-body');
const editBtn = document.getElementById('edit-toggle-btn');
const addTableBtn = document.getElementById('add-table-btn');
const rightTitle = document.getElementById('right-title');
const rightVersion = document.getElementById('right-version');
const rightBody = document.getElementById('right-body');

let isEditing = false;
let version = 1.0;
let touchCounter = 0;
const MAX_REVEALED = 1; // 여기 숫자만 바꾸면 몇 개까지 남길지 조절돼요 (예: 5로 바꾸면 예전 방식)

const revealedMap = new Map();
const revealedStructuralIds = new Set();
let blockIdCounter = 0;
function getBlockId(node) {
  if (node.dataset.blockId) return node.dataset.blockId;
  const id = 'b' + (blockIdCounter++);
  node.dataset.blockId = id;
  return id;
}

function splitSentences(text) {
  return text.trim().split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 0);
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
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function animateSentenceReplace(span, oldText, newText) {
  let p = 0;
  const maxP = Math.min(oldText.length, newText.length);
  while (p < maxP && oldText[p] === newText[p]) p++;
  let s = 0;
  const maxS = Math.min(oldText.length - p, newText.length - p);
  while (s < maxS && oldText[oldText.length - 1 - s] === newText[newText.length - 1 - s]) s++;

  const prefix = oldText.slice(0, p);
  const oldMiddle = oldText.slice(p, oldText.length - s);
  const newMiddle = newText.slice(p, newText.length - s);
  const suffix = oldText.slice(oldText.length - s);

    // 1단계: 바뀐 부분(oldMiddle)만 빨간색으로 표시하고, 잠깐 멈춰서 눈에 담기게 함
  span.innerHTML = escapeHtml(prefix) +
    (oldMiddle ? '<span class="diff-removed">' + escapeHtml(oldMiddle) + '</span>' : '') +
    escapeHtml(suffix);
  const removedEl = span.querySelector('.diff-removed');

  let i = oldMiddle.length;
  function backspace() {
    if (i > 0) {
      i--;
      removedEl.textContent = oldMiddle.slice(0, i);
      setTimeout(backspace, 45);
    } else {
      if (removedEl) removedEl.remove();
      typeNew();
    }
  }

  let j = 0;
  function typeNew() {
    if (newMiddle.length === 0) {
      span.textContent = newText;
      return;
    }
    j++;
    // 2단계: 새로 채워지는 부분(newMiddle)은 초록색으로 표시
    span.innerHTML = escapeHtml(prefix) +
      '<span class="diff-added">' + escapeHtml(newMiddle.slice(0, j)) + '</span>' +
      escapeHtml(suffix);
    if (j < newMiddle.length) {
      setTimeout(typeNew, 45);
    } else {
      // 3단계: 잠깐 뒤 색이 빠지고 완전히 정착
      setTimeout(() => { span.textContent = newText; }, 500);
    }
  }

    if (oldMiddle.length > 0) {
    setTimeout(backspace, 500); // 빨간색이 눈에 들어올 시간을 0.5초 줌
  } else {
    typeNew();
  }
}

function refreshFlash(el) {
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, 90);
  setTimeout(() => { el.style.opacity = '1'; }, 170);
  setTimeout(() => { el.style.opacity = '0'; }, 270);
}

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

function convertPendingHeadings(bodyEl) {
  Array.from(bodyEl.querySelectorAll('p')).forEach(p => {
    const text = p.textContent.trim();
    let m = text.match(/^-\s*(.+?)\s*-$/);
    if (m) { p.replaceWith(makeHeadingDiv(m[1], 2)); return; }
    m = text.match(/^=\s*(.+?)\s*=$/);
    if (m) { p.replaceWith(makeHeadingDiv(m[1], 1)); return; }
  });
}

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

function ensureRowControls(table) {
  table.querySelectorAll('tr').forEach(tr => {
    if (tr.querySelector('.row-controls')) return;
    const td = document.createElement('td');
    td.className = 'row-controls';
    const btn = document.createElement('button');
    btn.className = 'row-remove-btn';
    btn.textContent = '✕';
    btn.setAttribute('contenteditable', 'false');
    btn.addEventListener('click', () => { tr.remove(); });
    td.appendChild(btn);
    tr.appendChild(td);
  });
}

function ensureTableRemoveButton(table) {
  ensureRowControls(table);
  let wrap = table.parentElement;
  if (!wrap || !wrap.classList.contains('table-block')) {
    wrap = document.createElement('div');
    wrap.className = 'table-block';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  }
  if (wrap.querySelector('.table-remove-btn')) return; // 버튼이 이미 있으면 중복 부착 방지

  const removeBtn = document.createElement('button');
  removeBtn.className = 'table-remove-btn';
  removeBtn.textContent = '표 삭제';
  removeBtn.setAttribute('contenteditable', 'false');
  removeBtn.addEventListener('click', () => { wrap.remove(); });

  const addRowBtn = document.createElement('button');
  addRowBtn.className = 'row-add-btn';
  addRowBtn.textContent = '행 추가';
  addRowBtn.setAttribute('contenteditable', 'false');
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

function getCurrentBlockElement() {
  const sel = window.getSelection();
  if (!sel.rangeCount) return null;
  let node = sel.getRangeAt(0).startContainer;
  if (node.nodeType === 3) node = node.parentElement;
  while (node && node.parentElement !== leftBody) {
    node = node.parentElement;
    if (!node) return null;
  }
  return node;
}

addTableBtn.addEventListener('click', () => {
  const table = document.createElement('table');
  table.className = 'wiki-table';
  table.innerHTML = `
    <tr><td class="label" contenteditable="true">항목</td><td contenteditable="true"></td></tr>
    <tr><td class="label" contenteditable="true">항목</td><td contenteditable="true"></td></tr>
  `;
  const currentBlock = getCurrentBlockElement();
  let insertAfterNode;
  if (currentBlock && currentBlock.nextSibling) {
    leftBody.insertBefore(table, currentBlock.nextSibling);
    insertAfterNode = table;
  } else {
    leftBody.appendChild(table);
    insertAfterNode = table;
  }
  const nextEl = insertAfterNode.nextElementSibling;
  if (!nextEl || nextEl.tagName !== 'P') {
    const emptyP = document.createElement('p');
    emptyP.setAttribute('contenteditable', 'true');
    emptyP.innerHTML = '<br>';
    leftBody.insertBefore(emptyP, insertAfterNode.nextSibling);
  }
  ensureTableRemoveButton(table);
  table.querySelector('td').focus();
});

function extractBlocks(bodyEl) {
  const blocks = [];
  Array.from(bodyEl.children).forEach(el => {
    if (el.classList && el.classList.contains('wiki-subheading1')) {
      const textEl = el.querySelector('.heading-text');
      blocks.push({ id: getBlockId(el), type: 'heading1', text: (textEl || el).textContent.trim() });
    } else if (el.classList && el.classList.contains('wiki-subheading2')) {
      const textEl = el.querySelector('.heading-text');
      blocks.push({ id: getBlockId(el), type: 'heading2', text: (textEl || el).textContent.trim() });
        } else if (el.tagName === 'P' && !el.classList.contains('wiki-notice')) {
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

const STORAGE_KEY = 'renewalTimeWikiState';

function getCleanBodyHTML() {
  const clone = leftBody.cloneNode(true);
  clone.querySelectorAll('.table-remove-btn, .row-add-btn, .row-controls').forEach(el => el.remove());
  return clone.innerHTML;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      title: leftTitle.textContent,
      html: getCleanBodyHTML(),
      version: version,
      blockIdCounter: blockIdCounter,
      touchCounter: touchCounter,
      revealed: Array.from(revealedMap.entries()),
      revealedStructural: Array.from(revealedStructuralIds)
    }));
  } catch (e) { /* 저장 실패해도 사이트는 계속 작동해야 하니 조용히 무시 */ }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const state = JSON.parse(raw);
    leftTitle.textContent = state.title;
    leftBody.innerHTML = state.html;
    rightTitle.textContent = state.title;
    version = state.version || 1.0;
    rightVersion.textContent = 'ver. ' + version.toFixed(1);
    blockIdCounter = state.blockIdCounter || 0;
    touchCounter = state.touchCounter || 0;
    (state.revealed || []).forEach(([key, val]) => revealedMap.set(key, val));
    (state.revealedStructural || []).forEach(id => revealedStructuralIds.add(id));
    leftBody.querySelectorAll('table.wiki-table').forEach(ensureTableRemoveButton);
    return true;
  } catch (e) {
    return false;
  }
}

loadState();
let previousBlocks = extractBlocks(leftBody);

function renderRightBody(blocks) {
  rightBody.innerHTML = '';
  blocks.forEach(block => {
       if (block.type === 'heading1' || block.type === 'heading2') {
      const headingDiv = makeHeadingDiv(block.text, block.type === 'heading1' ? 1 : 2);
      if (!revealedStructuralIds.has(block.id)) headingDiv.classList.add('hidden');
      rightBody.appendChild(headingDiv);
       } else if (block.type === 'paragraph') {
      const p = document.createElement('p');
      p.dataset.blockId = block.id;
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
      wrap.className = 'table-block' + (revealedStructuralIds.has(block.id) ? '' : ' hidden');
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
renderRightBody(previousBlocks);
renumberHeadings(leftBody);

function evictIfNeeded() {
  while (revealedMap.size > MAX_REVEALED) {
    let oldestKey = null, oldestTouch = Infinity;
    revealedMap.forEach((entry, key) => {
      if (entry.lastTouched < oldestTouch) { oldestTouch = entry.lastTouched; oldestKey = key; }
    });
    if (oldestKey !== null) {
      revealedMap.delete(oldestKey);
      const span = rightBody.querySelector(`.sentence[data-key="${oldestKey}"]`);
      if (span) { span.classList.add('hidden'); span.classList.remove('diff-removed', 'diff-added'); }
    }
  }
}

editBtn.addEventListener('click', () => {
  if (!isEditing) {
    isEditing = true;
    leftBody.classList.add('is-editing');
    const guideP = document.createElement('p');
guideP.className = 'wiki-edit-guide';
guideP.id = 'wiki-edit-guide';
guideP.innerHTML = '대분류: <code>=내용=</code> → 1, 2, 3 ...<br>하위항목: <code>-내용-</code> → 1.1, 1.2 ...';
document.querySelector('.wiki-notice').insertAdjacentElement('afterend', guideP);
    editBtn.textContent = '완료';
    editBtn.classList.add('done');
    addTableBtn.style.display = 'inline-block';
    leftTitle.setAttribute('contenteditable', 'true');
        leftBody.querySelectorAll('p:not(.wiki-notice), .heading-text').forEach(el => el.setAttribute('contenteditable', 'true'));
    leftBody.querySelectorAll('td:not(.row-controls)').forEach(td => td.setAttribute('contenteditable', 'true'));
    leftBody.setAttribute('contenteditable', 'true');
    previousBlocks = extractBlocks(leftBody);
    leftTitle.focus();
  } else {
    isEditing = false;
     document.getElementById('wiki-edit-guide')?.remove();
    leftBody.classList.remove('is-editing');
    editBtn.textContent = '편집';
    editBtn.classList.remove('done');
    addTableBtn.style.display = 'none';
    leftTitle.removeAttribute('contenteditable');
    leftBody.removeAttribute('contenteditable');
    leftBody.querySelectorAll('p, .heading-text').forEach(el => el.removeAttribute('contenteditable'));
    leftBody.querySelectorAll('td:not(.row-controls)').forEach(td => td.removeAttribute('contenteditable'));

    convertPendingHeadings(leftBody);
    renumberHeadings(leftBody);
    leftBody.querySelectorAll('table.wiki-table').forEach(ensureTableRemoveButton);
    refreshFlash(document.getElementById('flash-left'));

    const currentTitle = leftTitle.textContent.trim();
    if (currentTitle !== rightTitle.textContent.trim()) rightTitle.textContent = currentTitle;

        const currentBlocks = extractBlocks(leftBody);
    const prevById = new Map(previousBlocks.map(b => [b.id, b]));
    let anyChange = false;
    const sentenceAnimations = [];
    const deletedSentences = [];

        currentBlocks.forEach(block => {
      if (block.type !== 'paragraph') {
        const prevBlock = prevById.get(block.id);
        const isNew = !prevBlock;
        const isChanged = prevBlock && JSON.stringify(prevBlock) !== JSON.stringify(block);
        if (isNew || isChanged) {
          revealedStructuralIds.add(block.id);
          anyChange = true;
        }
        return;
      }
      const prevBlock = prevById.get(block.id);
      const oldSentences = prevBlock && prevBlock.type === 'paragraph' ? prevBlock.sentences : [];
      const maxLen = Math.max(oldSentences.length, block.sentences.length);
                for (let i = 0; i < maxLen; i++) {
        const oldS = oldSentences[i] || '';
        const newS = block.sentences[i] || '';
        if (oldS === newS) continue;
        anyChange = true;
        const key = block.id + '-' + i;
        const previouslyDisplayed = revealedMap.has(key) ? revealedMap.get(key).text : oldS;

        if (newS) {
          sentenceAnimations.push({ key, oldDisplayed: previouslyDisplayed, newText: newS });
          touchCounter++;
          revealedMap.set(key, { text: newS, lastTouched: touchCounter });
        } else {
          deletedSentences.push({ blockId: block.id, oldDisplayed: previouslyDisplayed });
          revealedMap.delete(key);
        }
      }
    });

    if (currentBlocks.length !== previousBlocks.length) anyChange = true;

          if (anyChange) {
  renderRightBody(currentBlocks);
  refreshFlash(document.getElementById('flash-right'));
  version += 0.1;
  rightVersion.textContent = 'ver. ' + version.toFixed(1);

  sentenceAnimations.forEach(({ key, oldDisplayed, newText }) => {
    const span = rightBody.querySelector(`.sentence[data-key="${key}"]`);
    if (span) animateSentenceReplace(span, oldDisplayed, newText);
  });

  // 완전히 삭제된 문장: 그 문단 끝에 잠깐 나타났다가 지워지는 유령 문장으로 표시
  deletedSentences.forEach(({ blockId, oldDisplayed }) => {
    const p = rightBody.querySelector(`p[data-block-id="${blockId}"]`);
    if (!p) return;
    const ghost = document.createElement('span');
    ghost.className = 'sentence';
    p.appendChild(ghost);
    animateSentenceReplace(ghost, oldDisplayed, '');
  });

  // 애니메이션이 다 끝난 뒤에야 "1개만 남기기" 규칙 적용
  setTimeout(() => {
    evictIfNeeded();
  }, 1500);
}

    previousBlocks = currentBlocks;
    saveState();
  }
});
