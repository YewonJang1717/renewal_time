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
    playFirstPageFade();
    setupClickableWord(2, '새로고침', () => {
      sessionStorage.setItem('reloadTarget', 'explain-2');
      location.reload();
    });
    setupClickableWord(3, '덮어쓰기', () => {
      const body = explainPages[3].querySelector('.explain-body');
      typewriterOverwrite(body, body.textContent, overwriteReplacementText);
    });
    setupClickableWord(4, '404 error', () => {
      window.open('https://yewonjang1717.github.io/renewal_time/this-page-does-not-exist', '_blank');
    });
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
  "오늘날 우리는 디지털 환경에서 많은 시간을 보낸다. 그 속에서 5년, 10년, 20년, 또는 그보다도 더 된 과거의 기록들을 마주하기도 한다. 그럴 때 우리는 디지털 기록에서 영원을 느낀다. 우리가 죽어도, 우리의 다음 세대가 죽어도, 우리의 기록은 이 인터넷 세계에 똑같이 남아있는 게 아닐까? 그러나 동시에 디지털 기록은 어쩌면, 아날로그보다 훨씬 연약한 것일 수 있다. 우리가 남긴 기록은 우리가 눈 한 번 깜빡하는 사이 완전히 다른 내용으로 바뀌어 있을지도 모른다.<br><br>  웹은 갱신된다. 이 작업에서, 우리는 그렇게 정의했다. 그 갱신이란 건 무엇일까? 비물질적인 매체인 웹에는 어떻게 시간의 흔적이 남고 있는 것일까?",
  "네이버 국어사전에 따르면, 갱신이란 단어는 '이미 있던 것을 고쳐 새롭게 하다', '기존의 내용을 변동된 사실에 따라 변경ㆍ추가ㆍ삭제하는 일'이라는 의미를 갖고 있다. 종이에 인쇄된 내용은 변하지 않는다. 물론 찢어지고, 물에 젖고, 불에 타는 등의 변화는 일어난다. 하지만 그것은 종이라는 매체에 일어나는 변화일 뿐, 내용에 일어나는 변화가 아니다. \n\n웹에서는 다르다. 이미 완성해 배포한 웹이라도, 코드를 조금 수정하면 순식간에 디자인을 바꿀 수 있다. 배경색을 바꾸는 것도, 새로운 사진을 넣는 것도, 글을 조금 삭제하는 것도 너무 간단한 일이다. 웹에서는 매체 뿐만 아니라 내용도 변화를 겪는다. 변경되고, 추가되고, 삭제된다. 그래서 우리는 웹이 갱신된다고 한다.",
  "우리는 어떨 때 웹에서 갱신을 경험할까? 일상적인 예시로는 새로고침에 의한 갱신이 있다. 유튜브, 인스타그램, 뉴스 사이트 등··· 많은 웹에서 흔히 마주할 수 있다.",
  "또다른 예시로는 덮어쓰기가 있다. 글의 내용이, 이미지가, 어떨 땐 사이트 자체가 통째로 덮어씌워져 아예 다른 무언가가 되어버린다. 업데이트도 이와 비슷한 방식으로 이루어진다. 이전의 버전이 새로운 버전으로 덮어씌워진다.",
  "예전에 본 적 있는 사이트에 404 error가 뜨며 접속이 불가능하게 된 경험이 있을 것이다. 화면에 남은 건 오류 메시지 뿐이지만, 이 역시 기존의 기록이 삭제되었다는 점에서 갱신으로 볼 수 있다.",
  "이 웹사이트는 갱신을 테마로 한다. 우리는 갱신을 특징으로 하는 웹의 형태 중 위키를 선택했다. 이유는 간단하다. 누구나 위키를 알고 있기 때문이다. 편집을 해본 적은 없더라도, 위키에 있는 정보를 마주한 경험은 누구나 있을 것이다. 그리고 위키 문서를 보다가 저번에 봤을 때와 내용이 조금 달라진 것을 눈치챈 적이 있는 사람도 분명 많을 것이다. 갱신되었음을 체감하는 순간이다. \n\n'경험하는 시간' 탭은 간단히 설명하면 체험 화면이다. '경험하는 시간'에서 관객은 위키 문서의 글을 자유롭게 수정할 수 있다. 내용을 추가할 수도 있고, 완전히 다른 내용으로 덮어씌울 수도 있다. 그것만으로도 이미 갱신을 경험할 수 있지만, 이 웹은 거기서 한 발짝 더 나아간다. 우측 패널에 방금 수정된 문장만을 띄우는 것이다. 가장 최근의 기록만을 보여주는 우측 패널은 끊임없이 갱신되는 웹의 현재성을 강조한다. 이는 지나간 흔적을 담아내는 진과 대비되는 모습으로, 과거의 기록을 흔적도 없이 지울 수 있는 웹만의 특성을 보여준다.",
  "웹은 지금 이 순간, 현재를 보여준다. 그렇다면 과거를 저장하는 데 있어 웹은 진보다 못한 매체인 것일까? 결코 그렇지 않다. 웹은 종이와 다른 방식으로 정보를 기록하는 것뿐이다. 종이가 순간을 저장한다면 웹은 상태를 저장한다. 세계 최초의 웹사이트를 떠올려 보자. 30년도 넘은 웹사이트지만 전혀 낡지 않았다. 마지막으로 편집되었을 때의 상태를 유지하고 있기 때문이다. 즉 웹은 지나간 순간들을 축적할 수는 없어도, 과거의 상태를 유지하는 데는 특화되어 있다. 그리고 언제나, 가장 최신의 상태로 갱신될 준비가 되어 있다. \n\n또한 무언가 새로워졌다는 것을 알아차리려면 바뀌기 전의 모습을 함께 기억하고 있어야 한다. 그렇다면 웹의 갱신은 웹 고유의 방법으로 과거를 환기시키는 것이라고 볼 수 있는 것이 아닐까. 갱신됨으로써 남는 시간의 흔적이, 분명 있을 것이다."
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
    // 자유 배치: 일러스트레이터 시안의 흰 박스 위치 그대로, 페이지마다 다른 배치
    const chunks = paragraph.split(/\n+/).filter(c => c.trim().length > 0);
    const wrap = document.createElement('div');
    wrap.className = 'explain-freeform-wrap ' + (pIndex === 5 ? 'layout-a' : 'layout-b');
        chunks.forEach((chunk, i) => {
      const box = document.createElement('div');
      box.className = 'explain-freeform-box box-' + (i + 1) + ' fade-up-target';
      const p = document.createElement('p');
      p.textContent = chunk;
      box.appendChild(p);
      wrap.appendChild(box);
    });
    page.appendChild(wrap);
  } else {
    const body = document.createElement('div');
    body.className = 'explain-body fade-up-target';

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

explainPages.forEach((page, pageIdx) => {
  if (pageIdx === 0) return; // 첫 페이지는 아래에서 따로 처리
  const targets = page.querySelectorAll('.fade-up-target');
  if (!targets.length) return;

  gsap.fromTo(targets,
    { opacity: 0, y: 36 },
    {
      opacity: 1, y: 0, duration: 1.1, ease: 'power1.out', stagger: 0.25,
      scrollTrigger: { trigger: page, scroller: '#explain-scroll', start: 'top 60%', toggleActions: 'play none none reverse' }
    }
  );
});

// 첫 페이지는 스크롤로 진입하는 게 아니라 항상 화면에 떠 있는 상태로 시작하니,
// 설명 화면에 들어갈 때마다 이 함수를 직접 호출해서 재생
function playFirstPageFade() {
  const firstPage = explainPages[0];
  if (!firstPage) return;
  const targets = firstPage.querySelectorAll('.fade-up-target');
  gsap.fromTo(targets,
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
  );
}

// 3번째 페이지(새로고침 예시) 도착 시 진짜 새로고침 + 그 페이지로 복귀 + 문장 추가
// 특정 페이지의 특정 단어를 클릭 가능하게 만드는 공통 함수 (원본 텍스트로 항상 리셋)
function setupClickableWord(pageIdx, target, onClick) {
  const page = explainPages[pageIdx];
  if (!page) return;
  const body = page.querySelector('.explain-body');
  if (!body) return;
  const original = explainParagraphs[pageIdx];
  const idx = original.indexOf(target);
  if (idx === -1) { body.textContent = original; return; }
  body.innerHTML = '';
  body.appendChild(document.createTextNode(original.slice(0, idx)));
  const link = document.createElement('span');
  link.className = 'clickable-word';
  link.textContent = target;
  link.addEventListener('click', onClick);
  body.appendChild(link);
  body.appendChild(document.createTextNode(original.slice(idx + target.length)));
}

setupClickableWord(2, '새로고침', () => {
  sessionStorage.setItem('reloadTarget', 'explain-2');
  location.reload();
});



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

const overwriteReplacementText = " 방금 이 글은 덮어쓰기 되었다. 순식간에 벌어진 일이다. 당신은 덮어씌워지기 전의 텍스트를 기억하는가?";

if (sessionStorage.getItem('reloadTarget') === 'explain-2') {
  sessionStorage.removeItem('reloadTarget');
  goTo('explain');
  const targetPage = explainPages[2];
  if (targetPage) {
    targetPage.scrollIntoView({ block: 'start' });
    const body = targetPage.querySelector('.explain-body');
    body.textContent += '\n\n바로 방금 전처럼 말이다.';
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
// ---------- 체험 화면: 자유 항목 + 표 추가/삭제 + 내용 기반 diff ----------
const leftTitle = document.getElementById('left-title');
const leftBody = document.getElementById('left-body');
const editBtn = document.getElementById('edit-toggle-btn');
const addTableBtn = document.getElementById('add-table-btn');
const rightTitle = document.getElementById('right-title');
const rightVersion = document.getElementById('right-version');
const rightBody = document.getElementById('right-body');

let isEditing = false;
let version = 1.0;

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
    span.innerHTML = escapeHtml(prefix) +
      '<span class="diff-added">' + escapeHtml(newMiddle.slice(0, j)) + '</span>' +
      escapeHtml(suffix);
    if (j < newMiddle.length) {
      setTimeout(typeNew, 45);
    } else {
      setTimeout(() => { span.textContent = newText; }, 500);
    }
  }

  if (oldMiddle.length > 0) {
    setTimeout(backspace, 500);
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
  if (wrap.querySelector('.table-remove-btn')) return;

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

// ---------- 내용 기반 스냅샷 (DOM 꼬리표 없이, 순수 데이터로만) ----------
function snapshotBlocks(bodyEl) {
  const blocks = [];
  Array.from(bodyEl.children).forEach(el => {
    if (el.classList && el.classList.contains('wiki-subheading1')) {
      blocks.push({ type: 'heading1', text: el.querySelector('.heading-text').textContent.trim() });
    } else if (el.classList && el.classList.contains('wiki-subheading2')) {
      blocks.push({ type: 'heading2', text: el.querySelector('.heading-text').textContent.trim() });
    } else if (el.tagName === 'P' && !el.classList.contains('wiki-notice')) {
      const text = el.textContent.trim();
      if (text) blocks.push({ type: 'paragraph', sentences: splitSentences(text) });
    } else if (el.classList && el.classList.contains('table-block')) {
      const table = el.querySelector('table');
      if (!table) return;
      const rows = Array.from(table.querySelectorAll('tr')).map(tr => {
        const tds = Array.from(tr.querySelectorAll('td'));
        return { label: tds[0] ? tds[0].textContent.trim() : '', value: tds[1] ? tds[1].textContent.trim() : '' };
      });
      blocks.push({ type: 'table', rows });
    }
  });
  return blocks;
}

// 블록을 "같은 블록인지" 판단하는 기준값
function blockKey(b) {
  if (b.type === 'heading1') return 'h1:' + b.text;
  if (b.type === 'heading2') return 'h2:' + b.text;
  if (b.type === 'table') return 'table:' + JSON.stringify(b.rows);
  if (b.type === 'paragraph') return 'p:' + (b.sentences[0] || ''); // 문단의 첫 문장으로 정체성 판단
  return '';
}

// LCS 기반 시퀀스 비교: 문서 전체를 위키피디아 편집 이력 비교하듯 훑음
function computeLCSDiff(oldArr, newArr) {
  const oldKeys = oldArr.map(blockKey);
  const newKeys = newArr.map(blockKey);
  const m = oldKeys.length, n = newKeys.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = oldKeys[i] === newKeys[j] ? dp[i+1][j+1] + 1 : Math.max(dp[i+1][j], dp[i][j+1]);
    }
  }
  const result = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (oldKeys[i] === newKeys[j]) {
      result.push({ type: 'same', oldItem: oldArr[i], newItem: newArr[j] });
      i++; j++;
    } else if (dp[i+1][j] >= dp[i][j+1]) {
      result.push({ type: 'removed', oldItem: oldArr[i] });
      i++;
    } else {
      result.push({ type: 'added', newItem: newArr[j] });
      j++;
    }
  }
  while (i < m) { result.push({ type: 'removed', oldItem: oldArr[i] }); i++; }
  while (j < n) { result.push({ type: 'added', newItem: newArr[j] }); j++; }
  return result;
}

// diff 결과를 오른쪽 화면에 그리고, 애니메이션까지 재생
function renderDiffAndAnimate(oldBlocks, newBlocks, opts) {
  opts = opts || {};
  const diffOps = computeLCSDiff(oldBlocks, newBlocks);

  rightBody.innerHTML = '';
  const animations = [];
  const removals = [];

  diffOps.forEach(op => {
    if (op.type === 'removed') {
      if (op.oldItem.type === 'paragraph') {
        const p = document.createElement('p');
        op.oldItem.sentences.forEach(s => {
          const span = document.createElement('span');
          span.className = 'sentence';
          span.textContent = s;
          p.appendChild(span);
          p.appendChild(document.createTextNode(' '));
          removals.push({ span, text: s });
        });
        rightBody.appendChild(p);
      }
      return;
    }

    if (op.type === 'added') {
      const b = op.newItem;
      if (b.type === 'heading1' || b.type === 'heading2') {
        rightBody.appendChild(makeHeadingDiv(b.text, b.type === 'heading1' ? 1 : 2));
      } else if (b.type === 'paragraph') {
        const p = document.createElement('p');
        b.sentences.forEach(s => {
          const span = document.createElement('span');
          span.className = 'sentence hidden';
          p.appendChild(span);
          p.appendChild(document.createTextNode(' '));
          animations.push({ span, oldText: '', newText: s });
        });
        rightBody.appendChild(p);
      } else if (b.type === 'table') {
        const wrap = document.createElement('div');
        wrap.className = 'table-block';
        const table = document.createElement('table');
        table.className = 'wiki-table';
        b.rows.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `<td class="label">${escapeHtml(row.label)}</td><td>${escapeHtml(row.value)}</td>`;
          table.appendChild(tr);
        });
        wrap.appendChild(table);
        rightBody.appendChild(wrap);
      }
      return;
    }

    // same
    const b = op.newItem;
    if (b.type === 'heading1' || b.type === 'heading2') {
      const div = makeHeadingDiv(b.text, b.type === 'heading1' ? 1 : 2);
      div.classList.add('hidden');
      rightBody.appendChild(div);
    } else if (b.type === 'table') {
      const wrap = document.createElement('div');
      wrap.className = 'table-block hidden';
      const table = document.createElement('table');
      table.className = 'wiki-table';
      b.rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="label">${escapeHtml(row.label)}</td><td>${escapeHtml(row.value)}</td>`;
        table.appendChild(tr);
      });
      wrap.appendChild(table);
      rightBody.appendChild(wrap);
    } else if (b.type === 'paragraph') {
      const oldSentences = op.oldItem.sentences;
      const newSentences = b.sentences;
      const p = document.createElement('p');
      const maxLen = Math.max(oldSentences.length, newSentences.length);
      for (let k = 0; k < maxLen; k++) {
        const oldS = oldSentences[k] || '';
        const newS = newSentences[k] || '';
        const span = document.createElement('span');
        span.className = 'sentence';
        if (oldS === newS) {
          span.classList.add('hidden');
          span.textContent = newS;
        } else if (newS) {
          span.classList.add('hidden');
          animations.push({ span, oldText: oldS, newText: newS });
        } else {
          span.textContent = oldS;
          removals.push({ span, text: oldS });
        }
        p.appendChild(span);
        p.appendChild(document.createTextNode(' '));
      }
      rightBody.appendChild(p);
    }
  });

  renumberHeadings(rightBody);

  if (!opts.silent) {
    refreshFlash(document.getElementById('flash-right'));
    version += 0.1;
    rightVersion.textContent = 'ver. ' + version.toFixed(1);
  }

   animations.forEach(({ span, oldText, newText }) => {
    span.classList.remove('hidden');
    animateSentenceReplace(span, oldText, newText);
  });

  removals.forEach(({ span, text }) => {
    animateSentenceReplace(span, text, '');
    setTimeout(() => { span.remove(); }, 1600);
  });

  // 방금 바뀐 부분으로 오른쪽 패널을 자동 스크롤
  const firstTarget = (animations[0] && animations[0].span) || (removals[0] && removals[0].span);
  if (firstTarget) {
    firstTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
// ---------- 저장/불러오기 (이제 순수 텍스트/HTML만 저장하면 충분해요) ----------
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
      version: version
    }));
  } catch (e) { /* 저장 실패해도 조용히 무시 */ }
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
    leftBody.querySelectorAll('table.wiki-table').forEach(ensureTableRemoveButton);
    return true;
  } catch (e) {
    return false;
  }
}

loadState();
renumberHeadings(leftBody);
let previousBlocks = snapshotBlocks(leftBody);
renderDiffAndAnimate(previousBlocks, previousBlocks, { silent: true }); // 초기 상태: 전부 배경색

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

    previousBlocks = snapshotBlocks(leftBody);
    renderDiffAndAnimate(previousBlocks, previousBlocks, { silent: true }); // 편집 시작 즉시 전부 배경색으로
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

    const newBlocks = snapshotBlocks(leftBody);
    const anyChange = JSON.stringify(previousBlocks) !== JSON.stringify(newBlocks);
    if (anyChange) {
      renderDiffAndAnimate(previousBlocks, newBlocks);
    }
    previousBlocks = newBlocks;
    saveState();
  }
});

document.getElementById('edit-guide-confirm-btn').addEventListener('click', () => {
  document.getElementById('edit-guide-overlay')?.classList.remove('show');
});