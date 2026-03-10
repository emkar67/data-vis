const COMPANIES = ['a', 'b'];

const ACCOUNTS = [
  { key: 'current', pl: 'rachunek bieżący', en: 'current account', de: 'Girokonto' },
  { key: 'vat',     pl: 'rachunek VAT',     en: 'VAT account',     de: 'MwSt.-Konto' },
  { key: 'fx',      pl: 'rachunek walutowy', en: 'FX account',     de: 'Fremdwährungskonto' },
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
    'section.companyNames': 'Nazwy Spółek',
    'summary.company': 'Spółka',
    'summary.balance': 'Suma sald',
    'summary.total': 'Razem',
    'label.total': 'Suma',
    'table.account': 'Rachunek',
    'table.amount': 'Kwota',
    'table.currency': 'Waluta',
    'table.addAccount': 'Dodaj rachunek',
    'account.newPlaceholder': 'Nowy rachunek',
    'account.remove': 'Usuń rachunek',
    'clear.data': 'Wyczyść dane',
    'export.csv': 'Eksportuj CSV',
    'export.excel': 'Eksportuj Excel',
    'import.csv': 'Importuj CSV',
    'import.excel': 'Importuj Excel',
    'card.title': 'Salda Rachunków bankowych',
    'company.nameLabel': 'Nazwa Spółki {L}',
    'company.placeholder': 'Spółka {L}',
    'company.defaultName': 'Spółka {L}',
  },
  en: {
    'nav.calculator': 'Calculator',
    'nav.summary': 'Summary',
    'hero.title': 'Data Visualizer',
    'hero.subtitle': 'Bank account balances for companies A and B.',
    'hero.note1': 'Editable fields are highlighted in yellow.',
    'section.summary': 'Summary',
    'section.companyNames': 'Company Names',
    'summary.company': 'Company',
    'summary.balance': 'Total balances',
    'summary.total': 'Total',
    'label.total': 'Total',
    'table.account': 'Account',
    'table.amount': 'Amount',
    'table.currency': 'Currency',
    'table.addAccount': 'Add account',
    'account.newPlaceholder': 'New account',
    'account.remove': 'Remove account',
    'clear.data': 'Clear data',
    'export.csv': 'Export CSV',
    'export.excel': 'Export Excel',
    'import.csv': 'Import CSV',
    'import.excel': 'Import Excel',
    'card.title': 'Bank account balances',
    'company.nameLabel': 'Company {L} name',
    'company.placeholder': 'Company {L}',
    'company.defaultName': 'Company {L}',
  },
  de: {
    'nav.calculator': 'Rechner',
    'nav.summary': 'Zusammenfassung',
    'hero.title': 'Interaktiver Datenvisualisierer',
    'hero.subtitle': 'Kontostände für die Unternehmen A und B.',
    'hero.note1': 'Editierbare Felder sind gelb hervorgehoben.',
    'section.summary': 'Zusammenfassung',
    'section.companyNames': 'Firmennamen',
    'summary.company': 'Unternehmen',
    'summary.balance': 'Summe der Salden',
    'summary.total': 'Insgesamt',
    'label.total': 'Summe',
    'table.account': 'Konto',
    'table.amount': 'Betrag',
    'table.currency': 'Währung',
    'table.addAccount': 'Konto hinzufügen',
    'account.newPlaceholder': 'Neues Konto',
    'account.remove': 'Konto entfernen',
    'clear.data': 'Daten löschen',
    'export.csv': 'CSV exportieren',
    'export.excel': 'Excel exportieren',
    'import.csv': 'CSV importieren',
    'import.excel': 'Excel importieren',
    'card.title': 'Kontostände',
    'company.nameLabel': 'Name der Firma {L}',
    'company.placeholder': 'Firma {L}',
    'company.defaultName': 'Firma {L}',
  }
};

const LANG_KEY = 'calc_lang';
const SUPPORTED_LANGS = ['pl', 'en', 'de'];
let currentLang = 'pl';

/* =========================
   Number formatting
   ========================= */
const LOCALE_BY_LANG = { pl: 'pl-PL', en: 'en-US', de: 'de-DE' };
let nf = new Intl.NumberFormat(LOCALE_BY_LANG[currentLang], {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function setNumberLocale(lang) {
  const locale = LOCALE_BY_LANG[lang] || 'pl-PL';
  nf = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatNum(n) {
  return nf.format(n || 0);
}

function formatNumEditable(n) {
  const locale = LOCALE_BY_LANG[currentLang] || 'pl-PL';
  return new Intl.NumberFormat(locale, {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 20
  }).format(n || 0);
}

function parseNum(v) {
  if (v === null || v === undefined) return 0;
  let s = String(v).trim();
  if (!s) return 0;

  s = s.replace(/[ \u00A0\u202F]/g, '');
  s = s.replace(/[^\d.,-]/g, '');

  const lastDot = s.lastIndexOf('.');
  const lastComma = s.lastIndexOf(',');

  let decSep = null;
  if (lastDot !== -1 || lastComma !== -1) {
    decSep = (lastDot > lastComma) ? '.' : ',';
  }

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
   helpers
   ========================= */
function t(key, vars = {}) {
  let str = (I18N[currentLang] && I18N[currentLang][key]) || I18N.pl[key] || key;
  return str.replace(/\{(\w+)\}/g, (_, token) => vars[token] ?? `{${token}}`);
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

function isDefaultRowId(rowId) {
  return ACCOUNTS.some(acc => acc.key === rowId);
}

function makeCustomRowId() {
  return `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getDefaultRowsByCompany() {
  return Object.fromEntries(
    COMPANIES.map(letter => [
      letter,
      ACCOUNTS.map(acc => ({
        rowId: acc.key,
        name: accountLabel(acc.key),
        amount: formatNum(0),
        currency: defaultCurrencyForAcc(acc.key),
      }))
    ])
  );
}

function getCompanyRows(letter) {
  return Array.from(document.querySelectorAll(`.js-bank-body[data-company="${letter}"] tr[data-row-id]`));
}

function getCompanyDisplayName(letter) {
  const L = letter.toUpperCase();
  return document.getElementById(`name-${letter}`)?.value.trim() || t('company.defaultName', { L });
}

function isDefaultAccountName(rowId, value) {
  if (!isDefaultRowId(rowId)) return false;
  const trimmed = String(value ?? '').trim();
  if (!trimmed) return false;

  const acc = ACCOUNTS.find(x => x.key === rowId);
  if (!acc) return false;
  return [acc.pl, acc.en, acc.de].includes(trimmed);
}

function renderAddIcon() {
  return `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
    </svg>
  `;
}

function renderRemoveIcon() {
  return `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 12h12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
    </svg>
  `;
}

function renderAccountHeader(company) {
  return `
    <div class="th-account-wrap">
      <span class="js-th-account-text">${t('table.account')}</span>
      <button class="table-add-btn" type="button" data-company="${company}" aria-label="${t('table.addAccount')}">
        <span class="table-add-btn-ico">${renderAddIcon()}</span>
        <span class="js-add-account-text">${t('table.addAccount')}</span>
      </button>
    </div>
  `;
}

function renderAccountRow(letter, row) {
  const rowId = row.rowId;
  const isDefault = isDefaultRowId(rowId);
  const canRemove = rowId !== 'current';
  const defaultName = isDefault ? accountLabel(rowId) : '';
  const nameValue = row.name ?? defaultName;
  const amountValue = row.amount ?? formatNum(0);
  const currencyValue = row.currency ?? (isDefault ? defaultCurrencyForAcc(rowId) : 'PLN');
  const placeholder = isDefault ? defaultName : t('account.newPlaceholder');
  const idBase = `${letter}_${rowId}`;

  return `
    <tr data-row-id="${rowId}">
      <td>
        <div class="acc-name-wrap">
          <input
            class="cell-input acc-name-input"
            id="${idBase}_name"
            data-company="${letter}"
            data-row-id="${rowId}"
            type="text"
            value="${escapeHtmlAttr(nameValue)}"
            placeholder="${escapeHtmlAttr(placeholder)}"
            aria-label="${escapeHtmlAttr(isDefault ? defaultName : t('account.newPlaceholder'))}"
          >
          ${canRemove ? `
            <button
              class="acc-remove-btn"
              type="button"
              data-company="${letter}"
              data-row-id="${rowId}"
              aria-label="${escapeHtmlAttr(t('account.remove'))}"
            >
              ${renderRemoveIcon()}
            </button>
          ` : ''}
        </div>
      </td>
      <td class="num">
        <div class="amt-wrap">
          <input
            class="cell-input amt-input"
            id="${idBase}_amt"
            data-company="${letter}"
            data-row-id="${rowId}"
            value="${escapeHtmlAttr(amountValue)}"
          >
          <select
            class="currency-select amt-cur"
            id="${idBase}_cur"
            data-company="${letter}"
            data-row-id="${rowId}"
          >
            ${CURRENCIES.map(c => `
              <option value="${c.code}" ${c.code === currencyValue ? 'selected' : ''}>${currencyLabel(c.code)}</option>
            `).join('')}
          </select>
        </div>
      </td>
    </tr>
  `;
}

function escapeHtmlAttr(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function applyTranslations() {
  document.documentElement.setAttribute('lang', currentLang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  document.querySelectorAll('.js-th-account-text').forEach(el => el.textContent = t('table.account'));
  document.querySelectorAll('.js-add-account-text').forEach(el => el.textContent = t('table.addAccount'));
  document.querySelectorAll('.table-add-btn').forEach(el => el.setAttribute('aria-label', t('table.addAccount')));
  document.querySelectorAll('.js-th-amount').forEach(el => el.textContent = t('table.amount'));
  document.querySelectorAll('.js-company-title').forEach(el => el.textContent = t('card.title'));
  document.querySelectorAll('.acc-remove-btn').forEach(el => {
  el.setAttribute('aria-label', t('account.remove'));
  }); 
}

/* =========================
   needs-fill (yellow)
   ========================= */
function updateNeedsFill() {
  document.querySelectorAll('.amt-input:not([readonly])').forEach(inp => {
    const isZero = parseNum(inp.value) === 0;
    inp.classList.toggle('needs-fill', isZero);
  });

  document.querySelectorAll('.acc-name-input:not([readonly])').forEach(inp => {
    const isEmpty = !inp.value.trim();
    inp.classList.toggle('needs-fill', isEmpty);
  });
}

function updateNameInputsI18n() {
  COMPANIES.forEach(letter => {
    const L = letter.toUpperCase();

    const label = document.querySelector(`.js-company-name-label[data-letter="${letter}"]`);
    if (label) label.textContent = t('company.nameLabel', { L });

    const input = document.getElementById(`name-${letter}`);
    if (input) input.placeholder = t('company.placeholder', { L });
  });
}

function updateAccountInputsI18n() {
  document.querySelectorAll('.acc-name-input').forEach(input => {
    const rowId = input.dataset.rowId;
    const value = input.value;

    if (isDefaultRowId(rowId)) {
      const defaultName = accountLabel(rowId);
      input.placeholder = defaultName;
      input.setAttribute('aria-label', defaultName);
      if (isDefaultAccountName(rowId, value)) {
        input.value = defaultName;
      }
      return;
    }

    input.placeholder = t('account.newPlaceholder');
    input.setAttribute('aria-label', t('account.newPlaceholder'));
  });
}

function refreshCompanyNamesUI() {
  const blockA = document.querySelector('.js-block-a');
  const blockB = document.querySelector('.js-block-b');
  const summaryA = document.querySelector('.js-summary-name[data-company="a"]');
  const summaryB = document.querySelector('.js-summary-name[data-company="b"]');

  if (blockA) blockA.textContent = getCompanyDisplayName('a');
  if (blockB) blockB.textContent = getCompanyDisplayName('b');
  if (summaryA) summaryA.textContent = getCompanyDisplayName('a');
  if (summaryB) summaryB.textContent = getCompanyDisplayName('b');
}

function reformatEditableAmounts() {
  document.querySelectorAll('.amt-input').forEach(inp => {
    const value = parseNum(inp.value);
    const isActive = document.activeElement === inp;

    if (value === 0) {
      inp.value = isActive ? '' : formatNum(0);
      return;
    }

    inp.value = isActive ? formatNumEditable(value) : formatNum(value);
  });

  updateNeedsFill();
}

/* =========================
   Render
   ========================= */
function renderApp(rowsByCompany = null) {
  const wrapper = document.getElementById('companies-wrapper');
  const template = document.getElementById('company-template');
  const summaryBody = document.getElementById('summary-body');
  const nameWrapper = document.getElementById('name-inputs-wrapper');

  if (!wrapper || !template || !summaryBody) return;

  wrapper.innerHTML = '';
  summaryBody.innerHTML = '';
  if (nameWrapper) nameWrapper.innerHTML = '';

  COMPANIES.forEach(letter => {
    const L = letter.toUpperCase();

    if (nameWrapper) {
      nameWrapper.innerHTML += `
        <label class="name-field">
          <span class="js-company-name-label" data-letter="${letter}">${t('company.nameLabel', { L })}</span>
          <input class="name-input" id="name-${letter}" type="text" placeholder="${t('company.placeholder', { L })}">
        </label>
      `;
    }

    summaryBody.innerHTML += `
      <tr>
        <td><span class="js-summary-name" data-company="${letter}">${t('company.defaultName', { L })}</span></td>
        <td class="num js-summary-${letter}">${formatPair({ PLN: 0, EUR: 0 })}</td>
      </tr>
    `;
  });

  const clone = template.content.cloneNode(true);
  wrapper.appendChild(clone);

  wrapper.querySelectorAll('.block').forEach(block => {
    const body = block.querySelector('.js-bank-body');
    const company = body?.dataset.company;
    const th = block.querySelector('.js-th-account');
    if (company && th) {
      th.innerHTML = renderAccountHeader(company);
    }
  });

  const rowsSource = rowsByCompany || getDefaultRowsByCompany();

  COMPANIES.forEach(letter => {
    const body = wrapper.querySelector(`.js-bank-body[data-company="${letter}"]`);
    if (!body) return;

    body.innerHTML = '';
    const rows = Array.isArray(rowsSource[letter]) && rowsSource[letter].length
      ? rowsSource[letter]
      : getDefaultRowsByCompany()[letter];

    rows.forEach(row => {
      body.insertAdjacentHTML('beforeend', renderAccountRow(letter, row));
    });
  });

  applyTranslations();
  updateNameInputsI18n();
  updateAccountInputsI18n();
  refreshCompanyNamesUI();
  updateNeedsFill();
  recalcAll();
}

function addAccountRow(letter) {
  const body = document.querySelector(`.js-bank-body[data-company="${letter}"]`);
  if (!body) return;

  const row = {
    rowId: makeCustomRowId(),
    name: '',
    amount: formatNum(0),
    currency: 'PLN',
  };

  body.insertAdjacentHTML('beforeend', renderAccountRow(letter, row));
  updateAccountInputsI18n();
  reformatEditableAmounts();
  recalcAll();
  scheduleSave();

  const newInput = document.getElementById(`${letter}_${row.rowId}_name`);
  newInput?.focus();
}

function removeAccountRow(letter, rowId) {
  const body = document.querySelector(`.js-bank-body[data-company="${letter}"]`);
  if (!body) return;

  const row = Array.from(body.querySelectorAll('tr[data-row-id]'))
    .find(el => el.dataset.rowId === rowId);

  if (!row) return;
  if (rowId === 'current') return;

  row.remove();
  recalcAll();
  scheduleSave();
}

/* =========================
   Calculations
   ========================= */
function formatPair(obj) {
  const nbsp = '\u00A0';
  const plnPart = `${currencyLabel('PLN')}${nbsp}${formatNum(obj.PLN || 0)}`;
  const eurPart = `${currencyLabel('EUR')}${nbsp}${formatNum(obj.EUR || 0)}`;
  return `${plnPart}${nbsp}|${nbsp}${eurPart}`;
}

function applyPipeRule(el, baseText) {
  if (!el) return;

  const oneLineText = baseText;
  const twoLineText = baseText.replace(/\s*\|\s*/g, '\n');

  el.textContent = oneLineText;

  const cs = getComputedStyle(el);
  const lh = parseFloat(cs.lineHeight) || 16;
  const wrapped = el.clientHeight > lh * 1.5;

  if (wrapped) {
    el.innerHTML = twoLineText.replace('\n', '<br>');
  }
}

function recalcAll() {
  refreshCompanyNamesUI();

  const totals = {
    a: { PLN: 0, EUR: 0 },
    b: { PLN: 0, EUR: 0 },
  };

  COMPANIES.forEach(letter => {
    getCompanyRows(letter).forEach(row => {
      const rowId = row.dataset.rowId;
      const amtEl = document.getElementById(`${letter}_${rowId}_amt`);
      const curEl = document.getElementById(`${letter}_${rowId}_cur`);
      if (!amtEl || !curEl) return;

      const amount = parseNum(amtEl.value);
      const currency = curEl.value || 'PLN';
      totals[letter][currency] += amount;
    });
  });

  const aText = formatPair(totals.a);
  const bText = formatPair(totals.b);
  const totalText = formatPair({
    PLN: totals.a.PLN + totals.b.PLN,
    EUR: totals.a.EUR + totals.b.EUR,
  });

  applyPipeRule(document.querySelector('.js-total-a'), aText);
  applyPipeRule(document.querySelector('.js-total-b'), bText);
  applyPipeRule(document.querySelector('.js-summary-a'), aText);
  applyPipeRule(document.querySelector('.js-summary-b'), bText);
  applyPipeRule(document.querySelector('.js-summary-total'), totalText);

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
  aoa.push(['Company', 'RowId', 'AccountName', 'Amount', 'Currency']);

  for (const letter of COMPANIES) {
    getCompanyRows(letter).forEach(row => {
      const rowId = row.dataset.rowId;
      const accName = document.getElementById(`${letter}_${rowId}_name`)?.value ?? '';
      const amt = document.getElementById(`${letter}_${rowId}_amt`)?.value ?? '';
      const cur = document.getElementById(`${letter}_${rowId}_cur`)?.value ?? 'PLN';
      aoa.push([letter.toUpperCase(), rowId, accName, amt, cur]);
    });
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
  const sep = currentLang === 'en' ? ',' : ';';
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
      if (inQuotes && next === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && ch === sep) {
      row.push(cell);
      cell = '';
      continue;
    }

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

  while (rows.length && rows[rows.length - 1].every(c => String(c ?? '').trim() === '')) {
    rows.pop();
  }

  return rows;
}

function buildRowsByCompanyFromAoA(aoa) {
  const rowsByCompany = { a: [], b: [] };

  for (const r of aoa) {
    if (!r || r.length < 4) continue;

    const comp = String(r[0] ?? '').trim().toLowerCase();
    if (!COMPANIES.includes(comp)) continue;

    if (r.length >= 5) {
      const rowId = String(r[1] ?? '').trim() || makeCustomRowId();
      const name = String(r[2] ?? '');
      const amount = formatNum(parseNum(r[3]));
      const currency = String(r[4] ?? 'PLN').trim().toUpperCase();
      rowsByCompany[comp].push({
        rowId,
        name,
        amount,
        currency: currency === 'EUR' ? 'EUR' : 'PLN',
      });
      continue;
    }

    const accKey = String(r[1] ?? '').trim();
    const amount = formatNum(parseNum(r[2]));
    const currency = String(r[3] ?? 'PLN').trim().toUpperCase();
    if (!isDefaultRowId(accKey)) continue;

    rowsByCompany[comp].push({
      rowId: accKey,
      name: accountLabel(accKey),
      amount,
      currency: currency === 'EUR' ? 'EUR' : 'PLN',
    });
  }

  COMPANIES.forEach(letter => {
    if (!rowsByCompany[letter].length) {
      rowsByCompany[letter] = getDefaultRowsByCompany()[letter];
      return;
    }

    ACCOUNTS.forEach(acc => {
      const exists = rowsByCompany[letter].some(row => row.rowId === acc.key);
      if (!exists) {
        rowsByCompany[letter].unshift({
          rowId: acc.key,
          name: accountLabel(acc.key),
          amount: formatNum(0),
          currency: defaultCurrencyForAcc(acc.key),
        });
      }
    });
  });

  return rowsByCompany;
}

function applyImportFromAoA(aoa) {
  if (!Array.isArray(aoa) || !aoa.length) return;

  const namesState = Object.fromEntries(COMPANIES.map(letter => [letter, document.getElementById(`name-${letter}`)?.value ?? '']));
  const rowsByCompany = buildRowsByCompanyFromAoA(aoa);

  renderApp(rowsByCompany);

  COMPANIES.forEach(letter => {
    const nameEl = document.getElementById(`name-${letter}`);
    if (nameEl) nameEl.value = namesState[letter] ?? '';
  });

  updateAccountInputsI18n();
  reformatEditableAmounts();
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
  xlsxInput.accept = '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xls,application/vnd.ms-excel';
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
const STATE_KEY = 'bank_balances_state_v2';
const LEGACY_STATE_KEYS = ['bank_balances_state_v1'];

function getState() {
  const state = { lang: currentLang, names: {}, rows: {} };

  for (const letter of COMPANIES) {
    state.names[letter] = document.getElementById(`name-${letter}`)?.value ?? '';
    state.rows[letter] = getCompanyRows(letter).map(row => {
      const rowId = row.dataset.rowId;
      return {
        rowId,
        name: document.getElementById(`${letter}_${rowId}_name`)?.value ?? '',
        amount: document.getElementById(`${letter}_${rowId}_amt`)?.value ?? formatNum(0),
        currency: document.getElementById(`${letter}_${rowId}_cur`)?.value ?? (isDefaultRowId(rowId) ? defaultCurrencyForAcc(rowId) : 'PLN'),
      };
    });
  }

  return state;
}

function applyLegacyState(state) {
  if (!state || typeof state !== 'object') return;

  if (state.lang && SUPPORTED_LANGS.includes(state.lang)) {
    currentLang = state.lang;
    localStorage.setItem(LANG_KEY, currentLang);
    setNumberLocale(currentLang);
  }

  renderApp();

  if (state.names && typeof state.names === 'object') {
    for (const [letter, name] of Object.entries(state.names)) {
      const el = document.getElementById(`name-${letter}`);
      if (el) el.value = String(name ?? '');
    }
  }

  if (state.accountNames && typeof state.accountNames === 'object') {
    for (const [k, v] of Object.entries(state.accountNames)) {
      const el = document.getElementById(k);
      if (el) el.value = String(v ?? '');
    }
  }

  if (state.values && typeof state.values === 'object') {
    for (const [k, v] of Object.entries(state.values)) {
      const el = document.getElementById(k);
      if (el) el.value = String(v);
    }
  }

  applyTranslations();
  updateNameInputsI18n();
  updateAccountInputsI18n();
  refreshCompanyNamesUI();
  reformatEditableAmounts();
  recalcAll();
}

function applyState(state) {
  if (!state || typeof state !== 'object') return;

  if (state.lang && SUPPORTED_LANGS.includes(state.lang)) {
    currentLang = state.lang;
    localStorage.setItem(LANG_KEY, currentLang);
    setNumberLocale(currentLang);
  }

  if (!state.rows || typeof state.rows !== 'object') {
    applyLegacyState(state);
    return;
  }

  const rowsByCompany = { a: [], b: [] };

  COMPANIES.forEach(letter => {
    const sourceRows = Array.isArray(state.rows[letter]) ? state.rows[letter] : [];
    rowsByCompany[letter] = sourceRows.length
      ? sourceRows.map(row => ({
          rowId: String(row.rowId ?? makeCustomRowId()),
          name: String(row.name ?? ''),
          amount: String(row.amount ?? formatNum(0)),
          currency: String(row.currency ?? 'PLN').toUpperCase() === 'EUR' ? 'EUR' : 'PLN',
        }))
      : getDefaultRowsByCompany()[letter];
  });

  renderApp(rowsByCompany);

  if (state.names && typeof state.names === 'object') {
    for (const [letter, name] of Object.entries(state.names)) {
      const el = document.getElementById(`name-${letter}`);
      if (el) el.value = String(name ?? '');
    }
  }

  applyTranslations();
  updateNameInputsI18n();
  updateAccountInputsI18n();
  refreshCompanyNamesUI();
  reformatEditableAmounts();
  recalcAll();
}

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      applyState(JSON.parse(raw));
      return;
    }

    for (const key of LEGACY_STATE_KEYS) {
      const legacyRaw = localStorage.getItem(key);
      if (!legacyRaw) continue;
      applyLegacyState(JSON.parse(legacyRaw));
      scheduleSave();
      return;
    }
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
  LEGACY_STATE_KEYS.forEach(key => localStorage.removeItem(key));

  renderApp();

  for (const letter of COMPANIES) {
    const nameEl = document.getElementById(`name-${letter}`);
    if (nameEl) nameEl.value = '';
  }

  updateAccountInputsI18n();
  reformatEditableAmounts();
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
    langBtn?.setAttribute('aria-expanded', 'true');
  }

  function closeLang() {
    langDropdown.classList.remove('open');
    langBtn?.setAttribute('aria-expanded', 'false');
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

    updateAccountInputsI18n();

    document.querySelectorAll('.currency-select').forEach(sel => {
      const cur = sel.value;
      sel.innerHTML = CURRENCIES.map(c => `<option value="${c.code}">${currencyLabel(c.code)}</option>`).join('');
      sel.value = cur;
    });

    applyTranslations();
    updateNameInputsI18n();
    updateAccountInputsI18n();
    refreshCompanyNamesUI();
    reformatEditableAmounts();
    recalcAll();
    scheduleSave();
  }

  langOptions.forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));

  langBtn?.addEventListener('click', e => {
    e.stopPropagation();
    toggleLang();
  });

  langOptions.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      setLang(btn.dataset.lang);
      closeLang();
    });
  });

  document.addEventListener('click', () => closeLang());
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLang();
  });
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

  document.getElementById('menuBtn')?.addEventListener('click', () => {
    document.getElementById('menu')?.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    const removeBtn = e.target.closest('.acc-remove-btn');
    if (removeBtn) {
      removeAccountRow(removeBtn.dataset.company, removeBtn.dataset.rowId);
      return;
    }

    const addBtn = e.target.closest('.table-add-btn');
    if (addBtn) {
      addAccountRow(addBtn.dataset.company);
    }
  });

  document.addEventListener('focusin', e => {
    if (e.target.matches('.amt-input:not([readonly])')) {
      const val = parseNum(e.target.value);
      e.target.value = val === 0 ? '' : formatNumEditable(val);
    }
  });

  document.addEventListener('focusout', e => {
    if (e.target.matches('.amt-input:not([readonly])')) {
      e.target.value = formatNum(parseNum(e.target.value));
    }
  });

  document.addEventListener('input', e => {
    if (e.target.matches('.cell-input, .name-input')) {
      recalcAll();
      scheduleSave();
    }
  });

  document.addEventListener('change', e => {
    if (e.target.matches('.currency-select')) {
      recalcAll();
      scheduleSave();
    }
  });

  initImportUI();
  initLanguageUI();
  loadState();
  reformatEditableAmounts();
  recalcAll();
});