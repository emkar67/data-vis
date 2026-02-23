const COMPANIES = ['a', 'b'];

const ACCOUNTS = [
  { key: 'current', pl: 'rachunek bieżący', en: 'current account', de: 'Girokonto' },
  { key: 'vat',     pl: 'rachunek VAT',     en: 'VAT account',     de: 'MwSt.-Konto' },
  { key: 'fx',      pl: 'rachunek walutowy',en: 'FX account',      de: 'Fremdwährungskonto' },
];

const CURRENCIES = [
  { code: 'PLN', label_pl: 'zł', label_en: 'PLN', label_de: 'PLN' },
  { code: 'EUR', label_pl: '€',  label_en: '€',   label_de: '€' },
];

/* =========================
   i18n
   ========================= */
const I18N = {
  pl: {
    'nav.calculator': 'Kalkulator',
    'nav.summary': 'Podsumowanie',
    'hero.title': 'Wizualizator Danych',
    'hero.subtitle': 'Salda rachunków bankowych dla spółek A i B.',
    'hero.note1': 'Edytowalne pola podświetlane są na żółto.',
    'section.summary': 'Podsumowanie',
    'summary.company': 'Spółka',
    'summary.balance': 'Suma sald',
    'summary.total': 'Razem',
    'label.total': 'Suma',
    'table.account': 'Rachunek',
    'table.amount': 'Kwota',
    'table.currency': 'Waluta',
    'clear.data': 'Wyczyść dane',
    'export.csv': 'Eksportuj CSV',
    'export.excel': 'Eksportuj Excel',
    'import.csv': 'Importuj CSV',
    'import.excel': 'Importuj Excel',
    'card.title': 'Salda Rachunków bankowych',
  },
  en: {
    'nav.calculator': 'Calculator',
    'nav.summary': 'Summary',
    'hero.title': 'Data Visualizer',
    'hero.subtitle': 'Bank account balances for companies A and B.',
    'hero.note1': 'Editable fields are highlighted in yellow.',
    'section.summary': 'Summary',
    'summary.company': 'Company',
    'summary.balance': 'Total balances',
    'summary.total': 'Total',
    'label.total': 'Total',
    'table.account': 'Account',
    'table.amount': 'Amount',
    'table.currency': 'Currency',
    'clear.data': 'Clear data',
    'export.csv': 'Export CSV',
    'export.excel': 'Export Excel',
    'import.csv': 'Import CSV',
    'import.excel': 'Import Excel',
    'card.title': 'Bank account balances',
  },
  de: {
    'nav.calculator': 'Rechner',
    'nav.summary': 'Zusammenfassung',
    'hero.title': 'Interaktiver Datenvisualisierer',
    'hero.subtitle': 'Kontostände für die Unternehmen A und B.',
    'hero.note1': 'Editierbare Felder sind gelb hervorgehoben.',
    'section.summary': 'Zusammenfassung',
    'summary.company': 'Unternehmen',
    'summary.balance': 'Summe der Salden',
    'summary.total': 'Insgesamt',
    'label.total': 'Summe',
    'table.account': 'Konto',
    'table.amount': 'Betrag',
    'table.currency': 'Währung',
    'clear.data': 'Daten löschen',
    'export.csv': 'CSV exportieren',
    'export.excel': 'Excel exportieren',
    'import.csv': 'CSV importieren',
    'import.excel': 'Excel importieren',
    'card.title': 'Kontostände',
  }
};

const LANG_KEY = 'calc_lang';
const SUPPORTED_LANGS = ['pl', 'en', 'de'];
let currentLang = 'pl';

/* =========================
   Number formatting
   ========================= */
const LOCALE_BY_LANG = { pl: 'pl-PL', en: 'en-US', de: 'de-DE' };
let nf = new Intl.NumberFormat(LOCALE_BY_LANG[currentLang], { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function setNumberLocale(lang) {
  const locale = LOCALE_BY_LANG[lang] || 'pl-PL';
  nf = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatNum(n) {
  return nf.format(n || 0);
}

/**
 * Flexible number parser
 */
function parseNum(v) {
  if (v === null || v === undefined) return 0;
  let s = String(v).trim();
  if (!s) return 0;

  s = s.replace(/[ \u00A0\u202F]/g, '');
  s = s.replace(/[^\d.,-]/g, '');

  const lastDot = s.lastIndexOf('.');
  const lastComma = s.lastIndexOf(',');

  let decSep = null;
  if (lastDot !== -1 || lastComma !== -1) decSep = (lastDot > lastComma) ? '.' : ',';

  if (decSep) {
    const otherSep = decSep === '.' ? ',' : '.';
    s = s.replaceAll(otherSep, '');
    if (decSep === ',') s = s.replace(',', '.');

    const first = s.indexOf('.');
    const last = s.lastIndexOf('.');
    if (first !== last) {
      let dotSeen = 0;
      const totalDots = [...s].filter(ch => ch === '.').length;
      s = [...s].filter(ch => {
        if (ch !== '.') return true;
        dotSeen++;
        return dotSeen === totalDots;
      }).join('');
    }
  }

  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

/* =========================
   i18n helpers
   ========================= */
function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.pl[key] || key;
}

function currencyLabel(code) {
  const c = CURRENCIES.find(x => x.code === code);
  if (!c) return code;
  if (currentLang === 'pl') return c.label_pl;
  if (currentLang === 'de') return c.label_de;
  return c.label_en;
}

function accountLabel(accKey) {
  const a = ACCOUNTS.find(x => x.key === accKey);
  if (!a) return accKey;
  if (currentLang === 'pl') return a.pl;
  if (currentLang === 'de') return a.de;
  return a.en;
}

function defaultCurrencyForAcc(accKey) {
  return accKey === 'fx' ? 'EUR' : 'PLN';
}

function applyTranslations() {
  document.documentElement.setAttribute('lang', currentLang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // table headers in template (not data-i18n)
  document.querySelectorAll('.js-th-account').forEach(el => el.textContent = t('table.account'));
  document.querySelectorAll('.js-th-amount').forEach(el => el.textContent = t('table.amount'));
  document.querySelectorAll('.js-th-currency').forEach(el => el.textContent = t('table.currency'));

  // card title
  document.querySelectorAll('.js-company-title').forEach(el => el.textContent = t('card.title'));
}

/* =========================
   needs-fill (yellow)
   ========================= */
function updateNeedsFill() {
  document.querySelectorAll('.cell-input:not([readonly])').forEach(inp => {
    const isZero = parseNum(inp.value) === 0;
    inp.classList.toggle('needs-fill', isZero);
  });
}

/* =========================
   Render
   ========================= */
function renderApp() {
  const wrapper = document.getElementById('companies-wrapper');
  const template = document.getElementById('company-template');
  const summaryBody = document.getElementById('summary-body');

  wrapper.innerHTML = '';
  summaryBody.innerHTML = '';

  // Summary rows for A and B
  COMPANIES.forEach(letter => {
    summaryBody.innerHTML += `
      <tr>
        <td>${letter.toUpperCase()}</td>
        <td class="num js-summary-${letter}">${formatNum(0)}</td>
      </tr>`;
  });

  // One card from template
  const clone = template.content.cloneNode(true);
  wrapper.appendChild(clone);

  // Fill tables A and B
  COMPANIES.forEach(letter => {
    const body = wrapper.querySelector(`.js-bank-body[data-company="${letter}"]`);
    if (!body) return;

    body.innerHTML = '';

    for (const acc of ACCOUNTS) {
      const id = `${letter}_${acc.key}`;
        body.innerHTML += `
          <tr>
            <td class="js-acc-label" data-acc="${acc.key}">${accountLabel(acc.key)}</td>
            <td class="num">
              <div class="amt-wrap">
                <input class="cell-input amt-input" id="${id}_amt" data-company="${letter}" data-acc="${acc.key}" value="${formatNum(0)}">
                <select class="currency-select amt-cur" id="${id}_cur" data-company="${letter}" data-acc="${acc.key}">
                  ${CURRENCIES.map(c => `
                    <option value="${c.code}" ${c.code === defaultCurrencyForAcc(acc.key) ? 'selected' : ''}>
                      ${currencyLabel(c.code)}
                    </option>
                  `).join('')}
                </select>
              </div>
            </td>
          </tr>`;
    }
  });

  applyTranslations();
  updateNeedsFill();
  recalcAll();
}

/* =========================
   Calculations
   - sums per company by currency (PLN + EUR)
   - summary shows PLN+EUR (text)
   ========================= */
function recalcAll() {
  const totals = {
    a: { PLN: 0, EUR: 0 },
    b: { PLN: 0, EUR: 0 },
  };

  COMPANIES.forEach(letter => {
    for (const acc of ACCOUNTS) {
      const amtEl = document.getElementById(`${letter}_${acc.key}_amt`);
      const curEl = document.getElementById(`${letter}_${acc.key}_cur`);
      if (!amtEl || !curEl) continue;

      const n = parseNum(amtEl.value);
      const cur = curEl.value || 'PLN';
      if (!totals[letter][cur]) totals[letter][cur] = 0;
      totals[letter][cur] += n;
    }
  });

  // helper format: "zł 1 234,00 | € 10,00"
  function fmtPair(obj) {
    const nbsp = '\u00A0';

    const pln = obj.PLN || 0;
    const eur = obj.EUR || 0;

    const plnPart = `${currencyLabel('PLN')}${nbsp}${formatNum(pln)}`;
    const eurPart = `${currencyLabel('EUR')}${nbsp}${formatNum(eur)}`;

    // specjalny separator do późniejszej podmiany
    return `${plnPart}${nbsp}|${nbsp}${eurPart}`;
  }

  function applyPipeRule(el, baseText) {
    if (!el) return;

    const oneLineText = baseText;               // "zł ... | € ..."
    const twoLineText = baseText.replace(/\s*\|\s*/g, '\n'); // "zł ...\n€ ..."

    // ustaw wersję 1-liniową
    if ('value' in el) el.value = oneLineText;
    else el.textContent = oneLineText;

    // sprawdź czy zawinęło / nie mieści się
    const cs = getComputedStyle(el);
    const lh = parseFloat(cs.lineHeight) || 16;

    let wrapped = false;

    if ('value' in el) {
      // input się nie zawija, ale możemy sprawdzić overflow
      wrapped = el.scrollWidth > el.clientWidth + 1;
    } else {
      // normalny tekst (td/th) – wykryj zawinięcie po wysokości
      wrapped = el.clientHeight > lh * 1.5;
    }

    if (!wrapped) return;

    // jeśli nie mieści się w 1 wierszu -> usuń "|"
    if ('value' in el) {
      // w input nie zrobimy prawdziwego enterka wizualnie,
      // ale usuwamy pipe żeby nie wisiał samotnie
      el.value = baseText.replace(/\s*\|\s*/g, '   ');
    } else {
      // w tabeli robimy 2 linie
      el.innerHTML = twoLineText.replace('\n', '<br>');
    }
  }

  // totals in card
  const tA = document.querySelector('.js-total-a');
  const tB = document.querySelector('.js-total-b');

  if (tA) tA.innerHTML = fmtPair(totals.a).replace(/\s*\|\s*/g, '<br>');
  if (tB) tB.innerHTML = fmtPair(totals.b).replace(/\s*\|\s*/g, '<br>');

  const sA = document.querySelector('.js-summary-a');
  const sB = document.querySelector('.js-summary-b');

  const sumTotal = {
    PLN: (totals.a.PLN || 0) + (totals.b.PLN || 0),
    EUR: (totals.a.EUR || 0) + (totals.b.EUR || 0),
  };
  const sT = document.querySelector('.js-summary-total');

  const aText = fmtPair(totals.a);
  const bText = fmtPair(totals.b);
  const totalText = fmtPair(sumTotal);

  applyPipeRule(tA, aText);
  applyPipeRule(tB, bText);

  applyPipeRule(sA, aText);
  applyPipeRule(sB, bText);

  applyPipeRule(sT, totalText);

  updateNeedsFill();
}

/* =========================
   Export / Import
   ========================= */
function getDateStamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function collectDataAoA() {
  const aoa = [];
  aoa.push(['lang', currentLang]);
  aoa.push(['exportedAt', new Date().toISOString()]);
  aoa.push([]);

  aoa.push(['Company', 'Account', 'Amount', 'Currency']);

  for (const letter of COMPANIES) {
    for (const acc of ACCOUNTS) {
      const amt = document.getElementById(`${letter}_${acc.key}_amt`)?.value ?? '';
      const cur = document.getElementById(`${letter}_${acc.key}_cur`)?.value ?? 'PLN';
      aoa.push([letter.toUpperCase(), acc.key, amt, cur]);
    }
  }

  return aoa;
}

function escapeCsvCell(v, sep) {
  const s = (v === null || v === undefined) ? '' : String(v);
  if (s.includes('"') || s.includes('\n') || s.includes('\r') || s.includes(sep)) {
    return `"${s.replaceAll('"', '""')}"`;
  }
  return s;
}

function aoaToCsv(aoa, sep) {
  return aoa.map(row => row.map(cell => escapeCsvCell(cell, sep)).join(sep)).join('\r\n');
}

function exportCSV() {
  const aoa = collectDataAoA();
  const sep = (currentLang === 'en') ? ',' : ';';
  const csv = '\ufeff' + aoaToCsv(aoa, sep);
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `bank_balances_${getDateStamp()}.csv`);
}

function exportExcel() {
  if (typeof XLSX === 'undefined') {
    alert('Brak biblioteki XLSX (SheetJS). Dodaj xlsx.full.min.js w index.html.');
    return;
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(collectDataAoA());
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  XLSX.writeFile(wb, `bank_balances_${getDateStamp()}.xlsx`);
}

function detectCsvSeparator(text) {
  const firstLine = (text || '').split(/\r?\n/).find(l => l.trim() !== '') || '';
  const commas = (firstLine.match(/,/g) || []).length;
  const semis = (firstLine.match(/;/g) || []).length;
  return semis > commas ? ';' : ',';
}

function parseCsvToAoA(text, sep) {
  let s = (text || '').replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const next = s[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') { cell += '"'; i++; }
      else inQuotes = !inQuotes;
      continue;
    }

    if (!inQuotes && ch === sep) { row.push(cell); cell = ''; continue; }

    if (!inQuotes && (ch === '\n' || ch === '\r')) {
      if (ch === '\r' && next === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += ch;
  }

  row.push(cell);
  rows.push(row);

  while (rows.length && rows[rows.length - 1].every(c => String(c ?? '').trim() === '')) rows.pop();
  return rows;
}

function applyImportFromAoA(aoa) {
  if (!Array.isArray(aoa) || !aoa.length) return;

  // Expect header: Company, Account, Amount, Currency
  // We accept either key names or localized text, so we just read rows with 4 columns.
  for (const r of aoa) {
    if (!r || r.length < 4) continue;
    const comp = String(r[0] ?? '').trim().toLowerCase();
    const accKey = String(r[1] ?? '').trim();
    const amountRaw = r[2];
    const cur = String(r[3] ?? 'PLN').trim().toUpperCase();

    if (!COMPANIES.includes(comp)) continue;
    if (!ACCOUNTS.some(a => a.key === accKey)) continue;

    const amtEl = document.getElementById(`${comp}_${accKey}_amt`);
    const curEl = document.getElementById(`${comp}_${accKey}_cur`);
    if (amtEl) amtEl.value = formatNum(parseNum(amountRaw));
    if (curEl && (cur === 'PLN' || cur === 'EUR')) curEl.value = cur;
  }

  recalcAll();
  scheduleSave();
}

function initImportUI() {
  const csvInput = document.createElement('input');
  csvInput.type = 'file';
  csvInput.accept = '.csv,text/csv';
  csvInput.style.display = 'none';

  const xlsxInput = document.createElement('input');
  xlsxInput.type = 'file';
  xlsxInput.accept =
    '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' +
    '.xls,application/vnd.ms-excel';
  xlsxInput.style.display = 'none';

  document.body.appendChild(csvInput);
  document.body.appendChild(xlsxInput);

  document.getElementById('importCsvBtn')?.addEventListener('click', () => {
    csvInput.value = '';
    csvInput.click();
  });

  document.getElementById('importXlsxBtn')?.addEventListener('click', () => {
    xlsxInput.value = '';
    xlsxInput.click();
  });

  csvInput.addEventListener('change', async () => {
    const file = csvInput.files?.[0];
    if (!file) return;
    const text = await file.text();
    const sep = detectCsvSeparator(text);
    const aoa = parseCsvToAoA(text, sep);
    applyImportFromAoA(aoa);
  });

  xlsxInput.addEventListener('change', async () => {
    const file = xlsxInput.files?.[0];
    if (!file) return;

    if (typeof XLSX === 'undefined') {
      alert('Brak biblioteki XLSX (SheetJS). Dodaj xlsx.full.min.js w index.html.');
      return;
    }

    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });

    const sheetName = wb.SheetNames[0];
    const ws = wb.Sheets[sheetName];
    const aoa = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
    applyImportFromAoA(aoa);
  });
}

/* =========================
   State (localStorage)
   ========================= */
const STATE_KEY = 'bank_balances_state_v1';

function getState() {
  const state = { lang: currentLang, values: {} };
  for (const letter of COMPANIES) {
    for (const acc of ACCOUNTS) {
      state.values[`${letter}_${acc.key}_amt`] = document.getElementById(`${letter}_${acc.key}_amt`)?.value ?? formatNum(0);
      state.values[`${letter}_${acc.key}_cur`] =
      document.getElementById(`${letter}_${acc.key}_cur`)?.value ?? defaultCurrencyForAcc(acc.key);
    }
  }
  return state;
}

function applyState(state) {
  if (!state || typeof state !== 'object') return;

  if (state.lang && SUPPORTED_LANGS.includes(state.lang)) {
    currentLang = state.lang;
    localStorage.setItem(LANG_KEY, currentLang);
    setNumberLocale(currentLang);
  }

  if (state.values && typeof state.values === 'object') {
    for (const [k, v] of Object.entries(state.values)) {
      const el = document.getElementById(k);
      if (!el) continue;
      if (el.tagName === 'SELECT') el.value = String(v);
      else el.value = String(v);
    }
  }

  applyTranslations();
  recalcAll();
}

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return;
    applyState(JSON.parse(raw));
  } catch (e) {
    console.warn('Nie udało się wczytać stanu:', e);
  }
}

let saveTimer = null;
function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(getState()));
    } catch (e) {
      console.warn('Nie udało się zapisać stanu:', e);
    }
  }, 200);
}

function clearAllData() {
  localStorage.removeItem(STATE_KEY);

  for (const letter of COMPANIES) {
    for (const acc of ACCOUNTS) {
      const amtEl = document.getElementById(`${letter}_${acc.key}_amt`);
      const curEl = document.getElementById(`${letter}_${acc.key}_cur`);
      if (amtEl) amtEl.value = formatNum(0);
      if (curEl) curEl.value = defaultCurrencyForAcc(acc.key);
    }
  }
  recalcAll();
  scheduleSave();
}

/* =========================
   Language dropdown
   ========================= */
function detectBrowserLang() {
  try {
    const list =
      (navigator && Array.isArray(navigator.languages) && navigator.languages.length)
        ? navigator.languages
        : [navigator?.language, navigator?.userLanguage];

    for (const lang of list) {
      if (!lang) continue;
      const base = String(lang).toLowerCase().split(/[-_]/)[0];
      if (SUPPORTED_LANGS.includes(base)) return base;
    }
  } catch (_) {}
  return null;
}

function getInitialLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  return detectBrowserLang() || 'en';
}

function initLanguageUI() {
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  const langOptions = Array.from(document.querySelectorAll('.lang-option'));

  function openLang() {
    langDropdown.classList.add('open');
    langBtn.setAttribute('aria-expanded', 'true');
  }
  function closeLang() {
    langDropdown.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  }
  function toggleLang() {
    if (langDropdown.classList.contains('open')) closeLang();
    else openLang();
  }

  function setLang(lang) {
    currentLang = SUPPORTED_LANGS.includes(lang) ? lang : 'pl';
    localStorage.setItem(LANG_KEY, currentLang);
    setNumberLocale(currentLang);

    langOptions.forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));

    // Update option labels + account labels
    document.querySelectorAll('.js-acc-label').forEach(td => {
      const key = td.getAttribute('data-acc');
      td.textContent = accountLabel(key);
    });
    document.querySelectorAll('.currency-select').forEach(sel => {
      const cur = sel.value;
      sel.innerHTML = CURRENCIES.map(c => `<option value="${c.code}">${currencyLabel(c.code)}</option>`).join('');
      sel.value = cur;
    });

    applyTranslations();
    recalcAll();
    scheduleSave();
  }

  langOptions.forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));

  langBtn?.addEventListener('click', (e) => { e.stopPropagation(); toggleLang(); });
  langOptions.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setLang(btn.dataset.lang);
      closeLang();
    });
  });
  document.addEventListener('click', () => closeLang());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLang(); });
}

/* =========================
   Init
   ========================= */
document.addEventListener('DOMContentLoaded', () => {
  currentLang = getInitialLang();
  setNumberLocale(currentLang);

  renderApp();

  document.getElementById('clearDataBtn')?.addEventListener('click', clearAllData);
  document.getElementById('exportCsvBtn')?.addEventListener('click', exportCSV);
  document.getElementById('exportXlsxBtn')?.addEventListener('click', exportExcel);

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile menu
  document.getElementById('menuBtn')?.addEventListener('click', () => {
    document.getElementById('menu')?.classList.toggle('open');
  });

  // amount input formatting + autosave
  document.addEventListener('focusin', (e) => {
    if (e.target.matches('.cell-input:not([readonly])')) {
      const val = parseNum(e.target.value);
      e.target.value = val === 0 ? '' : String(val);
    }
  });

  document.addEventListener('focusout', (e) => {
    if (e.target.matches('.cell-input:not([readonly])')) {
      e.target.value = formatNum(parseNum(e.target.value));
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('.cell-input')) {
      recalcAll();
      scheduleSave();
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('.currency-select')) {
      recalcAll();
      scheduleSave();
    }
  });

  initImportUI();
  initLanguageUI();
  loadState();
  recalcAll();
});