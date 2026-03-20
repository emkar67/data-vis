const MIN_COMPANIES = 1;
const DEFAULT_COMPANY_COUNT = 2;
const LEGACY_COMPANIES = ['a', 'b'];

const ACCOUNTS = [
  { key: 'current', pl: 'rachunek bieżący', en: 'current account', de: 'Girokonto' },
  { key: 'vat', pl: 'rachunek VAT', en: 'VAT account', de: 'MwSt.-Konto' },
  { key: 'fx', pl: 'rachunek walutowy', en: 'FX account', de: 'Fremdwährungskonto' },
];

const CURRENCIES = [
  { code: 'PLN', label_pl: 'zł', label_en: 'PLN', label_de: 'zł' },
  { code: 'EUR', label_pl: '€', label_en: 'EUR', label_de: '€' },
  { code: 'USD', label_pl: '$', label_en: 'USD', label_de: '$' },
  { code: 'GBP', label_pl: '£', label_en: 'GBP', label_de: '£' },
];

const I18N = {
  pl: {
    'nav.calculator': 'Dane',
    'nav.summary': 'Podsumowanie',
    'hero.title': 'Wizualizator Danych',
    'hero.subtitle': 'Salda rachunków bankowych dla spółek.',
    'hero.note1': 'Edytowalne pola podświetlane są na żółto.',
    'section.summary': 'Podsumowanie',
    'summary.company': 'Spółka',
    'summary.balance': 'Suma sald',
    'summary.total': 'Razem',
    'label.total': 'Suma',
    'label.grandTotal': 'Suma ogółem',
    'table.amount': 'Kwota',
    'table.addAccount': 'Dodaj rachunek',
    'company.addBank': 'Dodaj bank',
    'company.addCompany': 'Dodaj spółkę',
    'company.remove': 'Usuń spółkę',
    'bank.label': 'Bank {N}',
    'bank.remove': 'Usuń bank',
    'account.newPlaceholder': 'nowy rachunek',
    'account.remove': 'Usuń rachunek',
    'clear.data': 'Resetuj dane',
    'export.csv': 'Eksportuj CSV',
    'export.excel': 'Eksportuj Excel',
    'import.csv': 'Importuj CSV',
    'import.excel': 'Importuj Excel',
    'card.title': 'Salda rachunków bankowych',
    'company.nameLabel': 'Nazwa spółki {L}',
    'company.placeholder': 'Spółka {L}',
    'company.defaultName': 'Spółka {L}',
  },
  en: {
    'nav.calculator': 'Data',
    'nav.summary': 'Summary',
    'hero.title': 'Data Visualizer',
    'hero.subtitle': 'Bank account balances for companies.',
    'hero.note1': 'Editable fields are highlighted in yellow.',
    'section.summary': 'Summary',
    'summary.company': 'Company',
    'summary.balance': 'Total balances',
    'summary.total': 'Total',
    'label.total': 'Subtotal',
    'label.grandTotal': 'Grand total',
    'table.amount': 'Amount',
    'table.addAccount': 'Add account',
    'company.addBank': 'Add bank',
    'company.addCompany': 'Add company',
    'company.remove': 'Remove company',
    'bank.label': 'Bank {N}',
    'bank.remove': 'Remove bank',
    'account.newPlaceholder': 'new account',
    'account.remove': 'Remove account',
    'clear.data': 'Reset data',
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
    'nav.calculator': 'Daten',
    'nav.summary': 'Zusammenfassung',
    'hero.title': 'Interaktiver Datenvisualisierer',
    'hero.subtitle': 'Kontostände für Unternehmen.',
    'hero.note1': 'Editierbare Felder sind gelb hervorgehoben.',
    'section.summary': 'Zusammenfassung',
    'summary.company': 'Unternehmen',
    'summary.balance': 'Summe der Salden',
    'summary.total': 'Insgesamt',
    'label.total': 'Summe',
    'label.grandTotal': 'Gesamtsumme',
    'table.amount': 'Betrag',
    'table.addAccount': 'Konto hinzufügen',
    'company.addBank': 'Bank hinzufügen',
    'company.addCompany': 'Unternehmen hinzufügen',
    'company.remove': 'Unternehmen entfernen',
    'bank.label': 'Bank {N}',
    'bank.remove': 'Bank entfernen',
    'account.newPlaceholder': 'neues Konto',
    'account.remove': 'Konto entfernen',
    'clear.data': 'Daten zurücksetzen',
    'export.csv': 'CSV exportieren',
    'export.excel': 'Excel exportieren',
    'import.csv': 'CSV importieren',
    'import.excel': 'Excel importieren',
    'card.title': 'Kontostände',
    'company.nameLabel': 'Name des Unternehmens {L}',
    'company.placeholder': 'Unternehmen {L}',
    'company.defaultName': 'Unternehmen {L}',
  }
};

const LANG_KEY = 'calc_lang';
const STATE_KEY = 'bank_balances_state_v7';
const SUPPORTED_LANGS = ['pl', 'en', 'de'];
const LOCALE_BY_LANG = { pl: 'pl-PL', en: 'en-US', de: 'de-DE' };

let currentLang = 'pl';
let nf = new Intl.NumberFormat('pl-PL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

let appState = null;
let saveTimer = null;
let pendingFocusId = null;

function t(key, vars = {}) {
  let str = (I18N[currentLang] && I18N[currentLang][key]) || I18N.pl[key] || key;
  return str.replace(/\{(\w+)\}/g, (_, token) => vars[token] ?? `{${token}}`);
}

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
    decSep = lastDot > lastComma ? '.' : ',';
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

function normalizeCurrency(rawCurrency, fallback = 'PLN') {
  const code = String(rawCurrency ?? fallback).trim().toUpperCase();
  return CURRENCIES.some(c => c.code === code) ? code : fallback;
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
  const defaultsByLang = {
    pl: { current: 'PLN', vat: 'PLN', fx: 'EUR' },
    en: { current: 'USD', vat: 'USD', fx: 'GBP' },
    de: { current: 'EUR', vat: 'EUR', fx: 'USD' },
  };

  return defaultsByLang[currentLang]?.[accKey] || defaultsByLang.pl[accKey] || 'PLN';
}

function isDefaultRowId(rowId) {
  return ACCOUNTS.some(acc => acc.key === rowId);
}

function isDefaultAccountName(rowId, value) {
  if (!isDefaultRowId(rowId)) return false;
  const trimmed = String(value ?? '').trim();
  if (!trimmed) return false;

  const acc = ACCOUNTS.find(x => x.key === rowId);
  if (!acc) return false;

  return [acc.pl, acc.en, acc.de].includes(trimmed);
}

function makeId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtmlAttr(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function companyTokenFromIndex(index) {
  let n = index;
  let token = '';

  do {
    token = String.fromCharCode(65 + (n % 26)) + token;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);

  return token;
}

function createEmptyTotals() {
  return Object.fromEntries(CURRENCIES.map(c => [c.code, 0]));
}

function orderCurrencyCodes(codes) {
  const set = codes instanceof Set ? codes : new Set(codes);
  return CURRENCIES.map(c => c.code).filter(code => set.has(code));
}

function getVisibleCurrencyCodesFromAccounts(accounts = []) {
  const seen = new Set();

  accounts.forEach(acc => {
    const code = normalizeCurrency(acc?.currency, '');
    if (code) seen.add(code);
  });

  return orderCurrencyCodes(seen);
}

function getVisibleCurrencyCodesForBank(bank) {
  return getVisibleCurrencyCodesFromAccounts(bank?.accounts || []);
}

function getVisibleCurrencyCodesForCompany(company) {
  const accounts = (company?.banks || []).flatMap(bank => bank.accounts || []);
  return getVisibleCurrencyCodesFromAccounts(accounts);
}

function getVisibleCurrencyCodesForAllCompanies() {
  const accounts = getCompanies().flatMap(company =>
    (company.banks || []).flatMap(bank => bank.accounts || [])
  );
  return getVisibleCurrencyCodesFromAccounts(accounts);
}

function createDefaultAccount(rowId) {
  return {
    rowId,
    name: accountLabel(rowId),
    amount: formatNum(0),
    currency: defaultCurrencyForAcc(rowId),
  };
}

function createBank(bankId = makeId('bank')) {
  return {
    bankId: String(bankId),
    name: '',
    accounts: ACCOUNTS.map(acc => createDefaultAccount(acc.key)),
  };
}

function createCompany(companyId = makeId('company')) {
  return {
    companyId: String(companyId),
    name: '',
    banks: [createBank()],
  };
}

function createInitialState() {
  return {
    companies: Array.from({ length: DEFAULT_COMPANY_COUNT }, () => createCompany())
  };
}

function normalizeAccount(raw) {
  const rowId = String(raw?.rowId ?? makeId('acc'));
  const isDefault = isDefaultRowId(rowId);

  return {
    rowId,
    name: String(raw?.name ?? (isDefault ? accountLabel(rowId) : '')),
    amount: formatNum(parseNum(raw?.amount)),
    currency: normalizeCurrency(
      raw?.currency,
      isDefault ? defaultCurrencyForAcc(rowId) : 'PLN'
    ),
  };
}

function normalizeBank(raw) {
  const accounts = Array.isArray(raw?.accounts) && raw.accounts.length
    ? raw.accounts.map(normalizeAccount)
    : ACCOUNTS.map(acc => createDefaultAccount(acc.key));

  return {
    bankId: String(raw?.bankId ?? makeId('bank')),
    name: String(raw?.name ?? ''),
    accounts,
  };
}

function normalizeCompany(raw, usedCompanyIds = new Set()) {
  let companyId = String(raw?.companyId ?? makeId('company')).trim() || makeId('company');

  while (usedCompanyIds.has(companyId)) {
    companyId = makeId('company');
  }
  usedCompanyIds.add(companyId);

  const banks = Array.isArray(raw?.banks) && raw.banks.length
    ? raw.banks.map(normalizeBank)
    : [createBank()];

  return {
    companyId,
    name: String(raw?.name ?? raw?.companyName ?? ''),
    banks,
  };
}

function normalizeState(raw) {
  const usedCompanyIds = new Set();

  if (Array.isArray(raw?.companies)) {
    const companies = raw.companies.length
      ? raw.companies.map(company => normalizeCompany(company, usedCompanyIds))
      : [createCompany()];

    return {
      companies: companies.length >= MIN_COMPANIES ? companies : [createCompany()]
    };
  }

  if (raw?.companies && typeof raw.companies === 'object') {
    const companies = LEGACY_COMPANIES.map(letter => {
      const banks = Array.isArray(raw.companies?.[letter]?.banks) ? raw.companies[letter].banks : [];
      return normalizeCompany({
        companyId: letter,
        name: String(raw?.companyNames?.[letter] ?? ''),
        banks: banks.length ? banks : [createBank()]
      }, usedCompanyIds);
    });

    return {
      companies: companies.length ? companies : [createCompany()]
    };
  }

  return createInitialState();
}

function getCompanies() {
  return Array.isArray(appState?.companies) ? appState.companies : [];
}

function findCompanyIndex(companyId) {
  return getCompanies().findIndex(company => company.companyId === companyId);
}

function findCompany(companyId) {
  return getCompanies().find(company => company.companyId === companyId) || null;
}

function relabelDefaultAccountNames() {
  getCompanies().forEach(company => {
    company.banks.forEach(bank => {
      bank.accounts.forEach(acc => {
        if (isDefaultAccountName(acc.rowId, acc.name)) {
          acc.name = accountLabel(acc.rowId);
        }
      });
    });
  });
}

function applyDefaultCurrenciesForCurrentLanguage() {
  getCompanies().forEach(company => {
    company.banks.forEach(bank => {
      bank.accounts.forEach(acc => {
        if (isDefaultRowId(acc.rowId)) {
          acc.currency = defaultCurrencyForAcc(acc.rowId);
        }
      });
    });
  });
}

function reformatStoredAmounts() {
  getCompanies().forEach(company => {
    company.banks.forEach(bank => {
      bank.accounts.forEach(acc => {
        acc.amount = formatNum(parseNum(acc.amount));
      });
    });
  });
}

function getCompanyDisplayName(companyOrId, index = null) {
  const company = typeof companyOrId === 'string' ? findCompany(companyOrId) : companyOrId;
  const resolvedIndex = index ?? findCompanyIndex(company?.companyId);
  const token = companyTokenFromIndex(Math.max(resolvedIndex, 0));
  const raw = company?.name ?? '';
  return raw.trim() || t('company.defaultName', { L: token });
}

function getBankDisplayName(bank, index) {
  const raw = bank?.name ?? '';
  return raw.trim() || t('bank.label', { N: index + 1 });
}

function findBank(companyId, bankId) {
  return findCompany(companyId)?.banks.find(bank => bank.bankId === bankId) || null;
}

function findAccount(companyId, bankId, rowId) {
  const bank = findBank(companyId, bankId);
  if (!bank) return null;
  return bank.accounts.find(acc => acc.rowId === rowId) || null;
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

function renderCompanyHead(company, index) {
  const token = companyTokenFromIndex(index);
  const canRemoveCompany = index > 0;

  return `
    <div class="company-head-row-wrap">
      <div class="company-head-wrap">
        <input
          class="cell-input inline-name-input company-inline-input"
          id="company_${company.companyId}_name"
          data-company-id="${company.companyId}"
          type="text"
          value="${escapeHtmlAttr(company.name)}"
          placeholder="${escapeHtmlAttr(t('company.placeholder', { L: token }))}"
          aria-label="${escapeHtmlAttr(t('company.nameLabel', { L: token }))}"
        >
        <button class="table-add-btn add-bank-btn" type="button" data-company-id="${company.companyId}">
          <span class="table-add-btn-ico">${renderAddIcon()}</span>
          <span>${t('company.addBank')}</span>
        </button>
      </div>
      <span class="company-head-spacer" aria-hidden="true"></span>
      ${canRemoveCompany ? `
        <button
          class="bank-remove-btn company-remove-btn"
          type="button"
          data-company-id="${company.companyId}"
          aria-label="${escapeHtmlAttr(t('company.remove'))}"
        >
          ${renderRemoveIcon()}
        </button>
      ` : '<span class="bank-remove-spacer" aria-hidden="true"></span>'}
    </div>
  `;
}

function renderBankHeadRow(companyId, bank, index) {
  const label = getBankDisplayName(bank, index);
  const canRemoveBank = index > 0;

  return `
    <tr class="bank-head-row">
      <td colspan="2">
        <div class="bank-head-row-wrap">
          <div class="bank-head-left">
            <input
              class="cell-input inline-name-input bank-name-input"
              id="${companyId}_${bank.bankId}_bank_name"
              data-company-id="${companyId}"
              data-bank-id="${bank.bankId}"
              type="text"
              value="${escapeHtmlAttr(bank.name)}"
              placeholder="${escapeHtmlAttr(label)}"
              aria-label="${escapeHtmlAttr(label)}"
            >
            <button class="table-add-btn" type="button" data-company-id="${companyId}" data-bank-id="${bank.bankId}" data-add-account="1">
              <span class="table-add-btn-ico">${renderAddIcon()}</span>
              <span>${t('table.addAccount')}</span>
            </button>
          </div>
          <span class="bank-amount-label">${t('table.amount')}</span>
          ${canRemoveBank ? `
            <button
              class="bank-remove-btn"
              type="button"
              data-company-id="${companyId}"
              data-bank-id="${bank.bankId}"
              aria-label="${escapeHtmlAttr(t('bank.remove'))}"
            >
              ${renderRemoveIcon()}
            </button>
          ` : '<span class="bank-remove-spacer" aria-hidden="true"></span>'}
        </div>
      </td>
    </tr>
  `;
}

function renderAccountRow(companyId, bankId, acc) {
  const isDefault = isDefaultRowId(acc.rowId);
  const canRemove = acc.rowId !== 'current';
  const defaultName = isDefault ? accountLabel(acc.rowId) : '';
  const placeholder = isDefault ? defaultName : t('account.newPlaceholder');
  const idBase = `${companyId}_${bankId}_${acc.rowId}`;

  return `
    <tr data-bank-id="${bankId}" data-row-id="${acc.rowId}">
      <td>
        <div class="acc-name-wrap">
          <input
            class="cell-input acc-name-input"
            id="${idBase}_name"
            data-company-id="${companyId}"
            data-bank-id="${bankId}"
            data-row-id="${acc.rowId}"
            type="text"
            value="${escapeHtmlAttr(acc.name)}"
            placeholder="${escapeHtmlAttr(placeholder)}"
            aria-label="${escapeHtmlAttr(placeholder)}"
          >
          ${canRemove ? `
            <button
              class="acc-remove-btn"
              type="button"
              data-company-id="${companyId}"
              data-bank-id="${bankId}"
              data-row-id="${acc.rowId}"
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
            data-company-id="${companyId}"
            data-bank-id="${bankId}"
            data-row-id="${acc.rowId}"
            value="${escapeHtmlAttr(acc.amount)}"
          >
          <select
            class="currency-select amt-cur"
            id="${idBase}_cur"
            data-company-id="${companyId}"
            data-bank-id="${bankId}"
            data-row-id="${acc.rowId}"
          >
            ${CURRENCIES.map(c => `
              <option value="${c.code}" ${c.code === acc.currency ? 'selected' : ''}>${currencyLabel(c.code)}</option>
            `).join('')}
          </select>
        </div>
      </td>
    </tr>
  `;
}

function renderBankSubtotalRow(companyId, bankId) {
  const bank = findBank(companyId, bankId);
  const visibleCodes = getVisibleCurrencyCodesForBank(bank);

  return `
    <tr class="bank-subtotal-row">
      <td>${t('label.total')}</td>
      <td class="num">
        <div class="total-box js-bank-total" data-company-id="${companyId}" data-bank-id="${bankId}">
          ${formatPair(createEmptyTotals(), visibleCodes)}
        </div>
      </td>
    </tr>
  `;
}

function renderCompanyBankRows(companyId) {
  const company = findCompany(companyId);
  if (!company) return '';

  return company.banks.map((bank, index) => {
    return [
      renderBankHeadRow(companyId, bank, index),
      ...bank.accounts.map(acc => renderAccountRow(companyId, bank.bankId, acc)),
      renderBankSubtotalRow(companyId, bank.bankId)
    ].join('');
  }).join('');
}

function renderCompanySection(company, index) {
  const companyVisibleCodes = getVisibleCurrencyCodesForCompany(company);

  return `
    <div class="block company-section" data-company-id="${company.companyId}">
      <div class="block-head">
        ${renderCompanyHead(company, index)}
      </div>

      <div class="table-scroll">
        <table class="data-table company-bank-table">
          <thead>
            <tr>
              <th>${t('summary.company')}</th>
              <th class="num">${t('table.amount')}</th>
            </tr>
          </thead>
          <tbody>
            ${renderCompanyBankRows(company.companyId)}
          </tbody>
        </table>

        <div class="total-row grand-total-row">
          <span class="total-label">${t('label.grandTotal')}</span>
          <div class="total-box js-company-total" data-company-id="${company.companyId}">${formatPair(createEmptyTotals(), companyVisibleCodes)}</div>
        </div>
      </div>
    </div>
  `;
}

function applyStaticTranslations() {
  document.documentElement.setAttribute('lang', currentLang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });

  document.querySelectorAll('.js-company-title').forEach(el => {
    el.textContent = t('card.title');
  });

  document.querySelectorAll('.js-add-company-label').forEach(el => {
    el.textContent = t('company.addCompany');
  });
}

function syncCompanyDisplayNames() {
  getCompanies().forEach((company, index) => {
    const name = getCompanyDisplayName(company, index);

    document.querySelectorAll(`.js-summary-name[data-company-id="${company.companyId}"]`).forEach(el => {
      el.textContent = name;
    });
  });
}

async function resetCache() {
  try {
    if (saveTimer) {
      clearTimeout(saveTimer);
      saveTimer = null;
    }

    localStorage.clear();
    sessionStorage.clear();

    if ('caches' in window) {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map(key => caches.delete(key)));
    }

    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(reg => reg.unregister()));
    }
  } catch (e) {
    console.warn('Nie udało się zresetować cache:', e);
  } finally {
    window.location.reload();
  }
}

function syncHeaderActionButtonWidths() {
  const buttons = Array.from(document.querySelectorAll(
    '.company-head-wrap > .table-add-btn, .bank-head-left > .table-add-btn'
  ));

  document.documentElement.style.removeProperty('--table-head-btn-width');

  if (!buttons.length) return;

  const maxWidth = Math.ceil(
    Math.max(...buttons.map(btn => btn.getBoundingClientRect().width))
  );

  document.documentElement.style.setProperty('--table-head-btn-width', `${maxWidth}px`);
}

function renderApp() {
  const wrapper = document.getElementById('companies-wrapper');
  const template = document.getElementById('company-template');
  const summaryBody = document.getElementById('summary-body');

  if (!wrapper || !template || !summaryBody) return;

  wrapper.innerHTML = '';
  summaryBody.innerHTML = '';
  wrapper.appendChild(template.content.cloneNode(true));

  const addCompanyBtn = wrapper.querySelector('.add-company-btn');
  const addCompanyIcon = addCompanyBtn?.querySelector('.table-add-btn-ico');
  if (addCompanyIcon) addCompanyIcon.innerHTML = renderAddIcon();

  const companiesList = wrapper.querySelector('.js-companies-list');
  if (!companiesList) return;

  getCompanies().forEach((company, index) => {
    const companyVisibleCodes = getVisibleCurrencyCodesForCompany(company);

    summaryBody.insertAdjacentHTML('beforeend', `
      <tr>
        <td><span class="js-summary-name" data-company-id="${company.companyId}">${getCompanyDisplayName(company, index)}</span></td>
        <td class="num js-summary-company" data-company-id="${company.companyId}">${formatPair(createEmptyTotals(), companyVisibleCodes)}</td>
      </tr>
    `);

    companiesList.insertAdjacentHTML('beforeend', renderCompanySection(company, index));
  });

  applyStaticTranslations();
  syncCompanyDisplayNames();
  updateNeedsFill();
  recalcAll();

  requestAnimationFrame(() => {
    syncHeaderActionButtonWidths();

    if (pendingFocusId) {
      const el = document.getElementById(pendingFocusId);
      el?.focus();
      pendingFocusId = null;
    }
  });
}

function formatPair(obj, visibleCodes = CURRENCIES.map(c => c.code)) {
  const nbsp = '\u00A0';
  const codes = visibleCodes?.length ? visibleCodes : ['PLN'];

  return codes
    .map(code => `${currencyLabel(code)}${nbsp}${formatNum(obj[code] || 0)}`)
    .join(`${nbsp}|${nbsp}`);
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
  syncCompanyDisplayNames();

  const grandTotal = createEmptyTotals();

  getCompanies().forEach(company => {
    const companyTotal = createEmptyTotals();

    company.banks.forEach(bank => {
      const bankTotal = createEmptyTotals();

      bank.accounts.forEach(acc => {
        const amount = parseNum(acc.amount);
        const currency = normalizeCurrency(acc.currency, 'PLN');
        bankTotal[currency] += amount;
        companyTotal[currency] += amount;
        grandTotal[currency] += amount;
      });

      const bankVisibleCodes = getVisibleCurrencyCodesForBank(bank);
      const bankTotalEl = document.querySelector(`.js-bank-total[data-company-id="${company.companyId}"][data-bank-id="${bank.bankId}"]`);
      if (bankTotalEl) {
        bankTotalEl.textContent = formatPair(bankTotal, bankVisibleCodes);
      }
    });

    const companyVisibleCodes = getVisibleCurrencyCodesForCompany(company);
    const companyText = formatPair(companyTotal, companyVisibleCodes);

    applyPipeRule(
      document.querySelector(`.js-company-total[data-company-id="${company.companyId}"]`),
      companyText
    );

    applyPipeRule(
      document.querySelector(`.js-summary-company[data-company-id="${company.companyId}"]`),
      companyText
    );
  });

  const grandVisibleCodes = getVisibleCurrencyCodesForAllCompanies();
  applyPipeRule(document.querySelector('.js-summary-total'), formatPair(grandTotal, grandVisibleCodes));
  updateNeedsFill();
}

function updateNeedsFill() {
  document.querySelectorAll('.amt-input:not([readonly])').forEach(inp => {
    const isZero = parseNum(inp.value) === 0;
    inp.classList.toggle('needs-fill', isZero);
  });

  document.querySelectorAll('.acc-name-input:not([readonly]), .company-inline-input:not([readonly]), .bank-name-input:not([readonly])').forEach(inp => {
    const isEmpty = !inp.value.trim();
    inp.classList.toggle('needs-fill', isEmpty);
  });
}

function addCompany() {
  const company = createCompany();
  appState.companies.push(company);
  pendingFocusId = `company_${company.companyId}_name`;
  renderApp();
  scheduleSave();
}

function removeCompany(companyId) {
  const companies = getCompanies();
  const index = companies.findIndex(company => company.companyId === companyId);

  if (index <= 0 || companies.length <= MIN_COMPANIES) return;

  companies.splice(index, 1);
  renderApp();
  scheduleSave();
}

function addBank(companyId) {
  const company = findCompany(companyId);
  if (!company) return;

  const bank = createBank();
  company.banks.push(bank);
  pendingFocusId = `${companyId}_${bank.bankId}_bank_name`;
  renderApp();
  scheduleSave();
}

function removeBank(companyId, bankId) {
  const company = findCompany(companyId);
  if (!company) return;

  const index = company.banks.findIndex(bank => bank.bankId === bankId);
  if (index <= 0) return;

  company.banks.splice(index, 1);
  renderApp();
  scheduleSave();
}

function addAccount(companyId, bankId) {
  const bank = findBank(companyId, bankId);
  if (!bank) return;

  const rowId = makeId('acc');
  bank.accounts.push({
    rowId,
    name: '',
    amount: formatNum(0),
    currency: defaultCurrencyForAcc('current'),
  });

  pendingFocusId = `${companyId}_${bankId}_${rowId}_name`;
  renderApp();
  scheduleSave();
}

function removeAccount(companyId, bankId, rowId) {
  if (rowId === 'current') return;

  const bank = findBank(companyId, bankId);
  if (!bank) return;

  bank.accounts = bank.accounts.filter(acc => acc.rowId !== rowId);
  renderApp();
  scheduleSave();
}

function getState() {
  return {
    lang: currentLang,
    companies: appState.companies,
  };
}

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

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) {
      appState = createInitialState();
      return;
    }

    const parsed = JSON.parse(raw);

    if (parsed?.lang && SUPPORTED_LANGS.includes(parsed.lang)) {
      currentLang = parsed.lang;
      localStorage.setItem(LANG_KEY, currentLang);
      setNumberLocale(currentLang);
    }

    appState = normalizeState(parsed);
  } catch (e) {
    console.warn('Nie udało się wczytać stanu:', e);
    appState = createInitialState();
  }
}

function clearAllData() {
  localStorage.removeItem(STATE_KEY);
  appState = createInitialState();
  renderApp();
  scheduleSave();
}

function collectDataAoA() {
  const aoa = [];
  aoa.push(['lang', currentLang]);

  getCompanies().forEach(company => {
    aoa.push(['companyName', company.companyId, company.name]);
  });

  getCompanies().forEach(company => {
    company.banks.forEach(bank => {
      aoa.push(['bankName', company.companyId, bank.bankId, bank.name]);
    });
  });

  aoa.push([]);
  aoa.push(['Company', 'BankId', 'RowId', 'AccountName', 'Amount', 'Currency']);

  getCompanies().forEach(company => {
    company.banks.forEach(bank => {
      bank.accounts.forEach(acc => {
        aoa.push([
          company.companyId,
          bank.bankId,
          acc.rowId,
          acc.name,
          formatNum(parseNum(acc.amount)),
          acc.currency
        ]);
      });
    });
  });

  return aoa;
}

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

function applyImportFromAoA(aoa) {
  if (!Array.isArray(aoa) || !aoa.length) return;

  const nextState = { companies: [] };
  const companyMap = new Map();
  const bankMaps = new Map();

  function ensureCompany(rawCompanyId) {
    const companyId = String(rawCompanyId ?? '').trim() || makeId('company');

    if (!companyMap.has(companyId)) {
      const company = {
        companyId,
        name: '',
        banks: []
      };
      companyMap.set(companyId, company);
      bankMaps.set(companyId, new Map());
      nextState.companies.push(company);
    }

    return companyMap.get(companyId);
  }

  function ensureBank(rawCompanyId, rawBankId) {
    const company = ensureCompany(rawCompanyId);
    const bankId = String(rawBankId ?? '').trim() || makeId('bank');
    const companyBankMap = bankMaps.get(company.companyId);

    if (!companyBankMap.has(bankId)) {
      const bank = { bankId, name: '', accounts: [] };
      companyBankMap.set(bankId, bank);
      company.banks.push(bank);
    }

    return companyBankMap.get(bankId);
  }

  aoa.forEach(r => {
    if (!Array.isArray(r) || !r.length) return;

    const first = String(r[0] ?? '').trim();
    if (!first) return;

    if (first === 'companyName' && r.length >= 3) {
      ensureCompany(r[1]).name = String(r[2] ?? '');
      return;
    }

    if (first === 'bankName' && r.length >= 4) {
      ensureBank(r[1], r[2]).name = String(r[3] ?? '');
      return;
    }

    const companyId = first;

    if (r.length >= 6) {
      const bankId = String(r[1] ?? '').trim() || makeId('bank');
      const rowId = String(r[2] ?? '').trim() || makeId('acc');
      const name = String(r[3] ?? '');
      const amount = formatNum(parseNum(r[4]));
      const currency = normalizeCurrency(r[5], 'PLN');

      ensureBank(companyId, bankId).accounts.push({ rowId, name, amount, currency });
      return;
    }

    if (r.length === 5) {
      const bankId = 'imported_bank_1';
      const rowId = String(r[1] ?? '').trim() || makeId('acc');
      const name = String(r[2] ?? '');
      const amount = formatNum(parseNum(r[3]));
      const currency = normalizeCurrency(r[4], 'PLN');

      ensureBank(companyId, bankId).accounts.push({ rowId, name, amount, currency });
      return;
    }

    if (r.length === 4) {
      const bankId = 'imported_bank_1';
      const rowId = String(r[1] ?? '').trim();
      if (!isDefaultRowId(rowId)) return;

      const amount = formatNum(parseNum(r[2]));
      const currency = normalizeCurrency(r[3], defaultCurrencyForAcc(rowId));

      ensureBank(companyId, bankId).accounts.push({
        rowId,
        name: accountLabel(rowId),
        amount,
        currency,
      });
    }
  });

  if (!nextState.companies.length) {
    appState = createInitialState();
    renderApp();
    scheduleSave();
    return;
  }

  nextState.companies = nextState.companies.map(company => {
    if (!company.banks.length) {
      company.banks = [createBank()];
    }

    company.banks = company.banks.map(bank => {
      if (!bank.accounts.length) {
        bank.accounts = ACCOUNTS.map(acc => createDefaultAccount(acc.key));
      }
      return normalizeBank(bank);
    });

    return company;
  });

  appState = normalizeState(nextState);
  relabelDefaultAccountNames();
  reformatStoredAmounts();
  renderApp();
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

function setLang(lang) {
  currentLang = SUPPORTED_LANGS.includes(lang) ? lang : 'pl';
  localStorage.setItem(LANG_KEY, currentLang);
  setNumberLocale(currentLang);

  applyDefaultCurrenciesForCurrentLanguage();
  reformatStoredAmounts();
  relabelDefaultAccountNames();
  renderApp();
  scheduleSave();

  document.querySelectorAll('.lang-option').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
  });
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

document.addEventListener('DOMContentLoaded', () => {
  currentLang = getInitialLang();
  setNumberLocale(currentLang);

  loadState();
  reformatStoredAmounts();
  relabelDefaultAccountNames();
  renderApp();

  document.getElementById('clearDataBtn')?.addEventListener('click', clearAllData);
  document.getElementById('clearCacheBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    resetCache();
  });
  document.getElementById('exportCsvBtn')?.addEventListener('click', exportCSV);
  document.getElementById('exportXlsxBtn')?.addEventListener('click', exportExcel);

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.getElementById('menuBtn')?.addEventListener('click', () => {
    document.getElementById('menu')?.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    const addCompanyBtn = e.target.closest('.add-company-btn');
    if (addCompanyBtn) {
      addCompany();
      return;
    }

    const removeCompanyBtn = e.target.closest('.company-remove-btn');
    if (removeCompanyBtn) {
      removeCompany(removeCompanyBtn.dataset.companyId);
      return;
    }

    const addBankBtn = e.target.closest('.add-bank-btn');
    if (addBankBtn) {
      addBank(addBankBtn.dataset.companyId);
      return;
    }

    const addAccountBtn = e.target.closest('[data-add-account="1"]');
    if (addAccountBtn) {
      addAccount(addAccountBtn.dataset.companyId, addAccountBtn.dataset.bankId);
      return;
    }

    const removeBankBtn = e.target.closest('.bank-remove-btn:not(.company-remove-btn)');
    if (removeBankBtn) {
      removeBank(removeBankBtn.dataset.companyId, removeBankBtn.dataset.bankId);
      return;
    }

    const removeBtn = e.target.closest('.acc-remove-btn');
    if (removeBtn) {
      removeAccount(removeBtn.dataset.companyId, removeBtn.dataset.bankId, removeBtn.dataset.rowId);
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
      const amount = formatNum(parseNum(e.target.value));
      e.target.value = amount;

      const acc = findAccount(
        e.target.dataset.companyId,
        e.target.dataset.bankId,
        e.target.dataset.rowId
      );
      if (acc) acc.amount = amount;

      recalcAll();
      scheduleSave();
    }
  });

  document.addEventListener('input', e => {
    if (e.target.matches('.company-inline-input')) {
      const company = findCompany(e.target.dataset.companyId);
      if (company) {
        company.name = e.target.value;
        syncCompanyDisplayNames();
        updateNeedsFill();
        scheduleSave();
      }
      return;
    }

    if (e.target.matches('.bank-name-input')) {
      const bank = findBank(e.target.dataset.companyId, e.target.dataset.bankId);
      if (bank) bank.name = e.target.value;
      updateNeedsFill();
      scheduleSave();
      return;
    }

    if (e.target.matches('.acc-name-input')) {
      const acc = findAccount(
        e.target.dataset.companyId,
        e.target.dataset.bankId,
        e.target.dataset.rowId
      );
      if (acc) acc.name = e.target.value;
      updateNeedsFill();
      scheduleSave();
      return;
    }

    if (e.target.matches('.amt-input')) {
      const acc = findAccount(
        e.target.dataset.companyId,
        e.target.dataset.bankId,
        e.target.dataset.rowId
      );
      if (acc) acc.amount = e.target.value;
      recalcAll();
      scheduleSave();
    }
  });

  document.addEventListener('change', e => {
    if (e.target.matches('.currency-select')) {
      const acc = findAccount(
        e.target.dataset.companyId,
        e.target.dataset.bankId,
        e.target.dataset.rowId
      );
      if (acc) acc.currency = e.target.value;
      recalcAll();
      scheduleSave();
    }
  });

  initImportUI();
  initLanguageUI();

  window.addEventListener('resize', () => {
    requestAnimationFrame(syncHeaderActionButtonWidths);
  });
});