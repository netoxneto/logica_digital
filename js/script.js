// ═══════════════════════════════════════════════════════════
// DADOS
// ═══════════════════════════════════════════════════════════

const GATES = [
  {
    name: 'AND', symbol: '&', color: '#00d4ff',
    inputs: 2,
    formula: 'S = A · B',
    desc: 'Saída 1 somente quando TODAS as entradas são 1. Símbolo: ·',
    truth: [[0,0,0],[0,1,0],[1,0,0],[1,1,1]],
    fn: (a,b) => a & b,
    svg: `<path d="M20 20 L20 80 L60 80 Q100 80 100 50 Q100 20 60 20 Z" fill="none" stroke="#00d4ff" stroke-width="2.5"/>
          <line x1="0" y1="35" x2="20" y2="35" stroke="#00d4ff" stroke-width="2"/>
          <line x1="0" y1="65" x2="20" y2="65" stroke="#00d4ff" stroke-width="2"/>
          <line x1="100" y1="50" x2="120" y2="50" stroke="#00d4ff" stroke-width="2"/>
          <text x="50" y="55" fill="#00d4ff" font-size="18" font-family="monospace" text-anchor="middle">&amp;</text>`
  },
  {
    name: 'OR', symbol: '≥1', color: '#7c3aed',
    inputs: 2,
    formula: 'S = A + B',
    desc: 'Saída 1 quando PELO MENOS UMA entrada é 1. Símbolo: +',
    truth: [[0,0,0],[0,1,1],[1,0,1],[1,1,1]],
    fn: (a,b) => a | b,
    svg: `<path d="M15 20 Q35 50 15 80 Q50 80 70 80 Q105 65 105 50 Q105 35 70 20 Q50 20 15 20 Z" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
          <line x1="0" y1="35" x2="22" y2="35" stroke="#7c3aed" stroke-width="2"/>
          <line x1="0" y1="65" x2="22" y2="65" stroke="#7c3aed" stroke-width="2"/>
          <line x1="105" y1="50" x2="120" y2="50" stroke="#7c3aed" stroke-width="2"/>
          <text x="58" y="55" fill="#7c3aed" font-size="14" font-family="monospace" text-anchor="middle">≥1</text>`
  },
  {
    name: 'NOT', symbol: '1', color: '#10b981',
    inputs: 1,
    formula: 'S = Ā',
    desc: 'Inverte a entrada. 0→1, 1→0. Também chamada de INVERSOR.',
    truth: [[0,1],[1,0]],
    fn: (a) => a ^ 1,
    svg: `<polygon points="20,20 90,50 20,80" fill="none" stroke="#10b981" stroke-width="2.5"/>
          <circle cx="95" cy="50" r="6" fill="none" stroke="#10b981" stroke-width="2.5"/>
          <line x1="0" y1="50" x2="20" y2="50" stroke="#10b981" stroke-width="2"/>
          <line x1="101" y1="50" x2="120" y2="50" stroke="#10b981" stroke-width="2"/>`
  },
  {
    name: 'NAND', symbol: '&̄', color: '#f59e0b',
    inputs: 2,
    formula: 'S = A · B̄',
    desc: 'AND negado. Universal: qualquer circuito pode ser feito só com NANDs!',
    truth: [[0,0,1],[0,1,1],[1,0,1],[1,1,0]],
    fn: (a,b) => (a & b) ^ 1,
    svg: `<path d="M20 20 L20 80 L60 80 Q100 80 100 50 Q100 20 60 20 Z" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
          <circle cx="106" cy="50" r="6" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
          <line x1="0" y1="35" x2="20" y2="35" stroke="#f59e0b" stroke-width="2"/>
          <line x1="0" y1="65" x2="20" y2="65" stroke="#f59e0b" stroke-width="2"/>
          <line x1="112" y1="50" x2="120" y2="50" stroke="#f59e0b" stroke-width="2"/>
          <text x="50" y="55" fill="#f59e0b" font-size="14" font-family="monospace" text-anchor="middle">!&amp;</text>`
  },
  {
    name: 'NOR', symbol: '≥1̄', color: '#ec4899',
    inputs: 2,
    formula: 'S = A + B̄',
    desc: 'OR negado. Também universal! NOR + NOR = qualquer função.',
    truth: [[0,0,1],[0,1,0],[1,0,0],[1,1,0]],
    fn: (a,b) => (a | b) ^ 1,
    svg: `<path d="M15 20 Q35 50 15 80 Q50 80 70 80 Q105 65 105 50 Q105 35 70 20 Q50 20 15 20 Z" fill="none" stroke="#ec4899" stroke-width="2.5"/>
          <circle cx="111" cy="50" r="6" fill="none" stroke="#ec4899" stroke-width="2.5"/>
          <line x1="0" y1="35" x2="22" y2="35" stroke="#ec4899" stroke-width="2"/>
          <line x1="0" y1="65" x2="22" y2="65" stroke="#ec4899" stroke-width="2"/>
          <line x1="117" y1="50" x2="120" y2="50" stroke="#ec4899" stroke-width="2"/>
          <text x="58" y="55" fill="#ec4899" font-size="12" font-family="monospace" text-anchor="middle">!≥1</text>`
  },
  {
    name: 'XOR', symbol: '=1', color: '#06b6d4',
    inputs: 2,
    formula: 'S = A ⊕ B',
    desc: 'OU Exclusivo. Saída 1 quando as entradas são DIFERENTES.',
    truth: [[0,0,0],[0,1,1],[1,0,1],[1,1,0]],
    fn: (a,b) => a ^ b,
    svg: `<path d="M15 20 Q35 50 15 80 Q50 80 70 80 Q105 65 105 50 Q105 35 70 20 Q50 20 15 20 Z" fill="none" stroke="#06b6d4" stroke-width="2.5"/>
          <path d="M8 20 Q28 50 8 80" fill="none" stroke="#06b6d4" stroke-width="2.5"/>
          <line x1="0" y1="35" x2="25" y2="35" stroke="#06b6d4" stroke-width="2"/>
          <line x1="0" y1="65" x2="25" y2="65" stroke="#06b6d4" stroke-width="2"/>
          <line x1="105" y1="50" x2="120" y2="50" stroke="#06b6d4" stroke-width="2"/>
          <text x="60" y="55" fill="#06b6d4" font-size="16" font-family="monospace" text-anchor="middle">⊕</text>`
  },
  {
    name: 'XNOR', symbol: '=', color: '#a78bfa',
    inputs: 2,
    formula: 'S = A ⊙ B',
    desc: 'XOR negado. Saída 1 quando as entradas são IGUAIS.',
    truth: [[0,0,1],[0,1,0],[1,0,0],[1,1,1]],
    fn: (a,b) => (a ^ b) ^ 1,
    svg: `<path d="M15 20 Q35 50 15 80 Q50 80 70 80 Q105 65 105 50 Q105 35 70 20 Q50 20 15 20 Z" fill="none" stroke="#a78bfa" stroke-width="2.5"/>
          <path d="M8 20 Q28 50 8 80" fill="none" stroke="#a78bfa" stroke-width="2.5"/>
          <circle cx="111" cy="50" r="6" fill="none" stroke="#a78bfa" stroke-width="2.5"/>
          <line x1="0" y1="35" x2="25" y2="35" stroke="#a78bfa" stroke-width="2"/>
          <line x1="0" y1="65" x2="25" y2="65" stroke="#a78bfa" stroke-width="2"/>
          <line x1="117" y1="50" x2="120" y2="50" stroke="#a78bfa" stroke-width="2"/>
          <text x="60" y="55" fill="#a78bfa" font-size="14" font-family="monospace" text-anchor="middle">⊙</text>`
  }
];

const LAWS = [
  { name: 'IDENTIDADE', rules: ['A + 0 = A', 'A · 1 = A'] },
  { name: 'DOMINÂNCIA', rules: ['A + 1 = 1', 'A · 0 = 0'] },
  { name: 'IDEMPOTÊNCIA', rules: ['A + A = A', 'A · A = A'] },
  { name: 'COMPLEMENTO', rules: ['A + Ā = 1', 'A · Ā = 0'] },
  { name: 'DUPLA NEGAÇÃO', rules: ['Ā̄ = A'] },
  { name: 'COMUTATIVIDADE', rules: ['A + B = B + A', 'A · B = B · A'] },
  { name: 'ASSOCIATIVIDADE', rules: ['(A+B)+C = A+(B+C)', '(A·B)·C = A·(B·C)'] },
  { name: 'DISTRIBUTIVIDADE', rules: ['A·(B+C) = A·B + A·C', 'A+(B·C) = (A+B)·(A+C)'] },
  { name: 'DE MORGAN 1', rules: ['NOT(A·B) = Ā + B̄'] },
  { name: 'DE MORGAN 2', rules: ['NOT(A+B) = Ā · B̄'] },
  { name: 'ABSORÇÃO', rules: ['A + A·B = A', 'A · (A+B) = A'] },
  { name: 'CONSENSO', rules: ['A·B + Ā·C + B·C = A·B + Ā·C'] },
];

const QUIZ_QUESTIONS = [
  { q: "Qual porta lógica produz saída 1 somente quando TODAS as entradas são 1?", opts: ["OR", "AND", "XOR", "NOT"], answer: 1, exp: "A porta AND exige que todas as entradas sejam 1. É equivalente à multiplicação booleana." },
  { q: "Qual é o resultado de NOT(1 AND 0)?", opts: ["0", "1", "Indefinido", "2"], answer: 1, exp: "1 AND 0 = 0. NOT(0) = 1. Logo o resultado é 1." },
  { q: "A porta XOR retorna 1 quando:", opts: ["Ambas entradas são 1", "Ambas entradas são 0", "As entradas são diferentes", "Pelo menos uma é 1"], answer: 2, exp: "XOR (OU Exclusivo) retorna 1 apenas quando as entradas têm valores DIFERENTES entre si." },
  { q: "Qual porta é chamada de 'universal' porque pode implementar qualquer função lógica sozinha?", opts: ["AND", "OR", "XOR", "NAND"], answer: 3, exp: "NAND é universal: NOT(A) = NAND(A,A); AND(A,B) = NAND(NAND(A,B), NAND(A,B)); etc. NOR também é universal." },
  { q: "Pela Lei de De Morgan, NOT(A OR B) é equivalente a:", opts: ["NOT A OR NOT B", "NOT A AND NOT B", "A AND B", "NOT A XOR NOT B"], answer: 1, exp: "De Morgan: NOT(A+B) = Ā·B̄. A negação de uma OR vira AND das negações individuais." },
  { q: "Um Flip-Flop é um exemplo de circuito:", opts: ["Combinacional", "Sequencial", "Aritmético", "Analógico"], answer: 1, exp: "Flip-Flops são circuitos SEQUENCIAIS — sua saída depende das entradas atuais E do estado anterior (memória)." },
  { q: "Quantas linhas tem a tabela verdade de uma porta com 3 entradas?", opts: ["3", "6", "8", "16"], answer: 2, exp: "Para N entradas: 2ᴺ linhas. Com 3 entradas: 2³ = 8 linhas." },
  { q: "Qual é o valor de: 1 XOR 1?", opts: ["0", "1", "2", "Indefinido"], answer: 0, exp: "XOR retorna 1 quando as entradas são DIFERENTES. Como 1 = 1, as entradas são iguais, então o resultado é 0." },
  { q: "Na álgebra booleana, A + Ā (A OR NOT A) é sempre igual a:", opts: ["0", "A", "1", "Indefinido"], answer: 2, exp: "Lei do Complemento: A + Ā = 1. Uma variável OU sua negação sempre resulta em 1 (tautologia)." },
  { q: "O meio somador (Half Adder) usa qual combinação de portas?", opts: ["AND + OR", "XOR + AND", "OR + NOT", "NAND + NOR"], answer: 1, exp: "Half Adder: SUM = A XOR B (bit da soma) e CARRY = A AND B (carry-out para o próximo dígito)." },
];

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════
let currentGate = 0;
let inputValues = [0, 0];
let evalVars = { a: 0, b: 0, c: 0 };
let ffState = 0;
let quizAnswered = new Array(QUIZ_QUESTIONS.length).fill(false);
let quizScore = 0;

// ═══════════════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════════════
function showSection(){}

function updateProgress(step) {
  const pct = (step / 6) * 100;
  document.getElementById('progress').style.width = pct + '%';
}

// ═══════════════════════════════════════════════════════════
// MÓDULO 1: BIT CALCULATOR
// ═══════════════════════════════════════════════════════════
function initBitCalc() {
  const container = document.getElementById('bit-toggles');
  const bits = Array(8).fill(0);
  for (let i = 7; i >= 0; i--) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px';
    wrapper.innerHTML = `
      <span style="font-family:var(--mono);font-size:0.65rem;color:var(--muted)">2<sup>${i}</sup></span>
      <button class="toggle-btn" id="bit-${i}" onclick="toggleBit(${i})"></button>
      <span style="font-family:var(--mono);font-size:0.75rem" id="bit-val-${i}">0</span>
    `;
    container.appendChild(wrapper);
  }
  updateBitCalc();
}

let bitValues = Array(8).fill(0);

function toggleBit(i) {
  bitValues[i] ^= 1;
  const btn = document.getElementById(`bit-${i}`);
  btn.classList.toggle('on', bitValues[i] === 1);
  document.getElementById(`bit-val-${i}`).style.color = bitValues[i] ? 'var(--accent3)' : 'var(--muted)';
  updateBitCalc();
}

function updateBitCalc() {
  let decimal = 0;
  let binStr = '';
  for (let i = 7; i >= 0; i--) {
    decimal += bitValues[i] * Math.pow(2, i);
    binStr += bitValues[i];
  }
  document.getElementById('decimal-result').textContent = decimal;
  document.getElementById('binary-string').textContent = binStr;
  document.getElementById('hex-string').textContent = '0x' + decimal.toString(16).toUpperCase().padStart(2, '0');
}

// ═══════════════════════════════════════════════════════════
// MÓDULO 2: GATE CARDS
// ═══════════════════════════════════════════════════════════
function initGateCards() {
  const container = document.getElementById('gates-cards');
  GATES.forEach((g, i) => {
    const headers = g.inputs === 1 ? ['A','S'] : ['A','B','S'];
    const rows = g.truth.map(row => {
      const cells = row.map((v, ci) => `<td class="${v===1?'val-1':'val-0'}">${v}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    container.innerHTML += `
      <div class="card" style="border-top:3px solid ${g.color}20">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
          <div>
            <span style="font-family:var(--mono);font-size:1.8rem;font-weight:700;color:${g.color}">${g.name}</span>
            <div style="font-family:var(--mono);font-size:0.75rem;color:var(--muted);margin-top:2px">${g.formula}</div>
          </div>
          <svg width="60" height="50" viewBox="0 0 120 100">${g.svg}</svg>
        </div>
        <p style="margin-bottom:16px">${g.desc}</p>
        <table class="truth-table">
          <tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr>
          ${rows}
        </table>
      </div>
    `;
  });
}

// ═══════════════════════════════════════════════════════════
// MÓDULO 3: SIMULADOR
// ═══════════════════════════════════════════════════════════
function initSimulator() {
  const selector = document.getElementById('gate-selector');
  GATES.forEach((g, i) => {
    const btn = document.createElement('button');
    btn.className = 'gate-btn' + (i === 0 ? ' active' : '');
    btn.textContent = g.name;
    btn.onclick = () => selectGate(i);
    selector.appendChild(btn);
  });
  selectGate(0);
}

function selectGate(idx) {
  currentGate = idx;
  document.querySelectorAll('.gate-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  const g = GATES[idx];
  inputValues = Array(g.inputs).fill(0);
  renderInputs();
  updateSimulator();
}

function renderInputs() {
  const panel = document.getElementById('inputs-panel');
  const g = GATES[currentGate];
  const labels = ['A', 'B', 'C'];
  panel.innerHTML = '';
  for (let i = 0; i < g.inputs; i++) {
    const div = document.createElement('div');
    div.className = 'input-toggle';
    div.innerHTML = `
      <span class="input-label" style="color:${g.color}">${labels[i]}</span>
      <button class="toggle-btn ${inputValues[i]?'on':''}" id="sim-inp-${i}" onclick="toggleInput(${i})"></button>
      <span class="bit-display ${inputValues[i]?'val-1':'val-0'}" id="sim-bit-${i}">${inputValues[i]}</span>
    `;
    panel.appendChild(div);
  }
}

function toggleInput(i) {
  inputValues[i] ^= 1;
  document.getElementById(`sim-inp-${i}`).classList.toggle('on', inputValues[i] === 1);
  document.getElementById(`sim-bit-${i}`).textContent = inputValues[i];
  document.getElementById(`sim-bit-${i}`).className = `bit-display ${inputValues[i]?'val-1':'val-0'}`;
  updateSimulator();
}

function updateSimulator() {
  const g = GATES[currentGate];
  const out = g.fn(...inputValues);
  const bulb = document.getElementById('output-bulb');
  bulb.textContent = out;
  bulb.className = `output-bulb ${out ? 'on' : 'off'}`;

  document.getElementById('gate-svg').innerHTML = g.svg;
  document.getElementById('gate-name-display').textContent = g.name;
  document.getElementById('formula-box').innerHTML = g.formula;

  // Truth table
  const table = document.getElementById('truth-table-dyn');
  const headers = g.inputs === 1 ? ['A','S'] : ['A','B','S'];
  const currentRow = inputValues.join(',');
  let html = `<tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr>`;
  g.truth.forEach(row => {
    const isCurrentRow = row.slice(0, g.inputs).join(',') === currentRow;
    const style = isCurrentRow ? `style="background:rgba(0,212,255,0.1)"` : '';
    const cells = row.map((v,ci) => {
      const isLast = ci === row.length - 1;
      return `<td class="${v===1?'val-1':'val-0'}">${v}${isCurrentRow && isLast ? ' ◀' : ''}</td>`;
    }).join('');
    html += `<tr ${style}>${cells}</tr>`;
  });
  table.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════
// MÓDULO 4: ÁLGEBRA BOOLEANA
// ═══════════════════════════════════════════════════════════
function initAlgebra() {
  const container = document.querySelector('.law-grid');
  LAWS.forEach(law => {
    container.innerHTML += `
      <div class="law-card">
        <h4>${law.name}</h4>
        ${law.rules.map(r => `<div class="law-formula">${r}</div>`).join('')}
      </div>
    `;
  });
}

function toggleEval(v) {
  evalVars[v] ^= 1;
  document.getElementById(`ev-${v}`).classList.toggle('on', evalVars[v] === 1);
}

function evaluateExpr() {
  const expr = document.getElementById('bool-expr').value;
  const A = evalVars.a, B = evalVars.b, C = evalVars.c;
  try {
    const jsExpr = expr
      .replace(/AND/gi, '&&').replace(/OR/gi, '||').replace(/NOT\s*/gi, '!')
      .replace(/\bA\b/g, A).replace(/\bB\b/g, B).replace(/\bC\b/g, C);
    const result = eval(jsExpr) ? 1 : 0;
    const div = document.getElementById('eval-result');
    div.style.display = 'block';
    div.innerHTML = `<span style="color:var(--muted);font-size:0.8rem">Resultado: </span><span style="color:${result?'var(--accent3)':'var(--red)'}">${result}</span>
      <span style="color:var(--muted);font-size:0.75rem;margin-left:16px">(A=${A}, B=${B}, C=${C})</span>`;
  } catch(e) {
    const div = document.getElementById('eval-result');
    div.style.display = 'block';
    div.innerHTML = `<span style="color:var(--red)">Expressão inválida. Use: AND, OR, NOT, parênteses.</span>`;
  }
}

function updateDeMorgan() {
  const a1 = document.getElementById('dm1a').classList.contains('on') ? 1 : 0;
  const b1 = document.getElementById('dm1b').classList.contains('on') ? 1 : 0;
  const lhs1 = ((a1 & b1) ^ 1);
  const rhs1 = ((a1 ^ 1) | (b1 ^ 1));
  document.getElementById('dm1result').innerHTML =
    `NOT(${a1} AND ${b1}) = NOT(${a1&b1}) = <strong style="color:var(--accent)">${lhs1}</strong><br>
     NOT ${a1} OR NOT ${b1} = ${a1^1} OR ${b1^1} = <strong style="color:var(--accent2)">${rhs1}</strong><br>
     <span style="color:var(--accent3)">✓ ${lhs1 === rhs1 ? 'IGUAIS — teorema confirmado!' : 'Diferente?? Isso não deveria acontecer.'}</span>`;

  const a2 = document.getElementById('dm2a').classList.contains('on') ? 1 : 0;
  const b2 = document.getElementById('dm2b').classList.contains('on') ? 1 : 0;
  const lhs2 = ((a2 | b2) ^ 1);
  const rhs2 = ((a2 ^ 1) & (b2 ^ 1));
  document.getElementById('dm2result').innerHTML =
    `NOT(${a2} OR ${b2}) = NOT(${a2|b2}) = <strong style="color:var(--accent)">${lhs2}</strong><br>
     NOT ${a2} AND NOT ${b2} = ${a2^1} AND ${b2^1} = <strong style="color:var(--accent2)">${rhs2}</strong><br>
     <span style="color:var(--accent3)">✓ ${lhs2 === rhs2 ? 'IGUAIS — teorema confirmado!' : 'Diferente.'}</span>`;
}

// ═══════════════════════════════════════════════════════════
// MÓDULO 5: CIRCUITOS
// ═══════════════════════════════════════════════════════════
function updateAdders() {
  const haA = document.getElementById('ha-a').classList.contains('on') ? 1 : 0;
  const haB = document.getElementById('ha-b').classList.contains('on') ? 1 : 0;
  const hSum = haA ^ haB, hCarry = haA & haB;
  document.getElementById('ha-sum').textContent = hSum;
  document.getElementById('ha-carry').textContent = hCarry;
  document.getElementById('ha-result').textContent = `${haA} + ${haB} = ${hCarry}${hSum}₂ (${haA+haB})`;

  const faA = document.getElementById('fa-a').classList.contains('on') ? 1 : 0;
  const faB = document.getElementById('fa-b').classList.contains('on') ? 1 : 0;
  const faCin = document.getElementById('fa-cin').classList.contains('on') ? 1 : 0;
  const total = faA + faB + faCin;
  const fSum = total % 2, fCout = Math.floor(total / 2);
  document.getElementById('fa-sum').textContent = fSum;
  document.getElementById('fa-cout').textContent = fCout;
  document.getElementById('fa-result').textContent = `${faA}+${faB}+${faCin} = ${fCout}${fSum}₂ (${total})`;
}

// Make toggle buttons for adders/demorgan work
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.toggle-btn');
  if (!btn) return;
  const id = btn.id;
  if (['ha-a','ha-b','fa-a','fa-b','fa-cin'].includes(id)) {
    btn.classList.toggle('on');
    updateAdders();
  }
  if (['dm1a','dm1b','dm2a','dm2b'].includes(id)) {
    btn.classList.toggle('on');
    updateDeMorgan();
  }
});

function initMux() {
  const muxIn = document.getElementById('mux-inputs');
  const muxSel = document.getElementById('mux-selectors');

  for (let i = 0; i < 4; i++) {
    muxIn.innerHTML += `
      <label style="font-family:var(--mono);font-size:0.75rem;color:var(--muted)">D${i}</label>
      <button class="toggle-btn" id="mux-d${i}" onclick="updateMux()"></button>
    `;
  }
  for (let i = 1; i >= 0; i--) {
    muxSel.innerHTML += `
      <div class="adder-input-group">
        <label style="font-family:var(--mono);font-size:0.75rem;color:var(--muted)">S${i}</label>
        <button class="toggle-btn" id="mux-s${i}" onclick="updateMux()"></button>
      </div>
    `;
  }
  updateMux();
}

function updateMux() {
  const d = [0,1,2,3].map(i => document.getElementById(`mux-d${i}`)?.classList.contains('on') ? 1 : 0);
  const s1 = document.getElementById('mux-s1')?.classList.contains('on') ? 1 : 0;
  const s0 = document.getElementById('mux-s0')?.classList.contains('on') ? 1 : 0;
  const sel = s1 * 2 + s0;
  const out = d[sel];
  document.getElementById('mux-result').innerHTML =
    `<div style="color:var(--muted);font-size:0.75rem;margin-bottom:6px">S1S0 = ${s1}${s0} → seleciona D${sel}</div>
     <div style="color:${out?'var(--accent3)':'var(--red)'};font-size:1.5rem;font-weight:700">${out}</div>`;
}

// Mux toggle clicks
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.toggle-btn');
  if (!btn) return;
  const id = btn.id;
  if (id && id.startsWith('mux-')) {
    btn.classList.toggle('on');
    updateMux();
  }
});

let ffQ = 0;
function triggerFlipFlop() {
  const s = document.getElementById('sr-s').classList.contains('on') ? 1 : 0;
  const r = document.getElementById('sr-r').classList.contains('on') ? 1 : 0;
  let status = '';
  if (s === 0 && r === 0) { status = 'Mantém estado (sem mudança)'; }
  else if (s === 1 && r === 0) { ffQ = 1; status = '→ SET: Q=1'; }
  else if (s === 0 && r === 1) { ffQ = 0; status = '→ RESET: Q=0'; }
  else { status = '⚠ Estado proibido! S=R=1'; }
  document.getElementById('ff-q').textContent = ffQ;
  document.getElementById('ff-qbar').textContent = ffQ ^ 1;
  document.getElementById('ff-status').textContent = status;
  document.getElementById('ff-q').style.color = ffQ ? 'var(--accent3)' : 'var(--red)';
  document.getElementById('ff-qbar').style.color = (ffQ^1) ? 'var(--accent3)' : 'var(--red)';
}

// SR toggle clicks
document.addEventListener('click', function(e) {
  const btn = e.target.closest('#sr-s, #sr-r');
  if (btn) btn.classList.toggle('on');
});

// ═══════════════════════════════════════════════════════════
// MÓDULO 6: QUIZ
// ═══════════════════════════════════════════════════════════
function initQuiz() {
  const container = document.getElementById('quiz-questions');
  quizAnswered = new Array(QUIZ_QUESTIONS.length).fill(false);
  quizScore = 0;
  container.innerHTML = '';
  document.getElementById('quiz-score').classList.remove('show');

  QUIZ_QUESTIONS.forEach((q, qi) => {
    const div = document.createElement('div');
    div.className = 'quiz-question';
    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <span class="chip chip-blue">${String(qi+1).padStart(2,'0')}</span>
        <span style="font-family:var(--mono);font-size:0.7rem;color:var(--muted)" id="q-pts-${qi}"></span>
      </div>
      <div class="quiz-q-text">${q.q}</div>
      <div class="quiz-options" id="opts-${qi}">
        ${q.opts.map((o,oi) => `<button class="quiz-opt" onclick="answerQuiz(${qi},${oi})">${o}</button>`).join('')}
      </div>
      <div class="quiz-feedback" id="fb-${qi}"></div>
    `;
    container.appendChild(div);
  });
}

function answerQuiz(qi, oi) {
  if (quizAnswered[qi]) return;
  quizAnswered[qi] = true;
  const q = QUIZ_QUESTIONS[qi];
  const correct = oi === q.answer;
  if (correct) quizScore++;
  const opts = document.querySelectorAll(`#opts-${qi} .quiz-opt`);
  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === oi && !correct) btn.classList.add('wrong');
  });
  const fb = document.getElementById(`fb-${qi}`);
  fb.className = `quiz-feedback show ${correct?'ok':'err'}`;
  fb.innerHTML = (correct ? '✓ Correto! ' : '✗ Incorreto. ') + q.exp;
  document.getElementById(`q-pts-${qi}`).textContent = correct ? '+1 ponto' : '0 pontos';
  document.getElementById(`q-pts-${qi}`).style.color = correct ? 'var(--accent3)' : 'var(--red)';

  if (quizAnswered.every(a => a)) {
    setTimeout(() => {
      const score = document.getElementById('quiz-score');
      score.classList.add('show');
      document.getElementById('score-num').textContent = `${quizScore}/${QUIZ_QUESTIONS.length}`;
      const pct = quizScore / QUIZ_QUESTIONS.length;
      document.getElementById('score-msg').textContent =
        pct >= 0.9 ? '🎉 Excelente! Você domina lógica digital!' :
        pct >= 0.7 ? '👍 Muito bom! Continue praticando.' :
        pct >= 0.5 ? '📚 Razoável. Revise as seções anteriores.' :
        '🔄 Continue estudando e tente novamente!';
    }, 500);
  }
}

function restartQuiz() {
  initQuiz();
}

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
initBitCalc();
initGateCards();
initSimulator();
initAlgebra();
initMux();
initQuiz();
updateProgress(1);
updateDeMorgan();