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
    'hero.title': 'Symulator przepływów pieniężnych',
    'hero.subtitle': 'Salda poszczególnych rachunków bankowych, oczekiwane wpływy/wydatki i przepływy pomiędzy spółkami.',
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
    'expected.inflow.add': 'Dodaj oczekiwane wpływy',
    'expected.outflow.add': 'Dodaj oczekiwane wydatki',
    'expected.inflow.title': 'Oczekiwane wpływy',
    'expected.outflow.title': 'Oczekiwane wydatki',
    'expected.inflow.actor': 'Odbiorca',
    'expected.outflow.actor': 'Dostawca',
    'expected.invoice': 'Nr faktury',
    'expected.net': 'Netto',
    'expected.vat': 'VAT',
    'expected.gross': 'Brutto',
    'expected.settled': 'Rozliczono',
    'expected.remaining': 'Pozostało do zapłaty',
    'expected.addRow': 'Dodaj pozycję',
    'expected.removeModule': 'Usuń tabelę',
    'expected.removeRow': 'Usuń pozycję',
    'section.expectedInflows': 'Oczekiwane wpływy',
    'section.expectedOutflows': 'Oczekiwane wydatki',
    'section.internalBilling': 'Fakturowanie wewnętrzne',
    'internal.fromCompany': 'Spółka wystawiająca',
    'internal.toCompany': 'Spółka odbierająca',
    'internal.invoice': 'Nr faktury',
    'internal.net': 'Netto',
    'internal.vat': 'VAT',
    'internal.gross': 'Brutto',
    'internal.settled': 'Rozliczono',
    'internal.remaining': 'Pozostało do zapłaty',
    'internal.addRow': 'Dodaj pozycję',
    'internal.removeRow': 'Usuń pozycję',
    'internal.companyPlaceholder': 'Wybierz spółkę',
  },
  en: {
    'nav.calculator': 'Data',
    'nav.summary': 'Summary',
    'hero.title': 'Cash Management Tool',
    'hero.subtitle': 'Bank account balances for companies, expected inflows/outflows and internal billing.',
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
    'expected.inflow.add': 'Add expected income',
    'expected.outflow.add': 'Add expected expenses',
    'expected.inflow.title': 'Expected income',
    'expected.outflow.title': 'Expected expenses',
    'expected.inflow.actor': 'Recipient',
    'expected.outflow.actor': 'Supplier',
    'expected.invoice': 'Invoice no.',
    'expected.net': 'Net',
    'expected.vat': 'VAT',
    'expected.gross': 'Gross',
    'expected.settled': 'Settled',
    'expected.remaining': 'Amount due',
    'expected.addRow': 'Add row',
    'expected.removeModule': 'Remove table',
    'expected.removeRow': 'Remove row',
    'section.expectedInflows': 'Expected income',
    'section.expectedOutflows': 'Expected expenses',
    'section.internalBilling': 'Internal invoicing',
    'internal.fromCompany': 'Issuing company',
    'internal.toCompany': 'Receiving company',
    'internal.invoice': 'Invoice no.',
    'internal.net': 'Net',
    'internal.vat': 'VAT',
    'internal.gross': 'Gross',
    'internal.settled': 'Settled',
    'internal.remaining': 'Amount due',
    'internal.addRow': 'Add row',
    'internal.removeRow': 'Remove row',
    'internal.companyPlaceholder': 'Choose company',
  },
  de: {
    'nav.calculator': 'Daten',
    'nav.summary': 'Zusammenfassung',
    'hero.title': 'Cash-Management-Tool',
    'hero.subtitle': 'Kontostände der Bankkonten von Unternehmen, erwartete Ein- und Auszahlungen sowie interne Verrechnung.',
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
    'expected.inflow.add': 'Erwartete Eingänge hinzufügen',
    'expected.outflow.add': 'Erwartete Ausgaben hinzufügen',
    'expected.inflow.title': 'Erwartete Eingänge',
    'expected.outflow.title': 'Erwartete Ausgaben',
    'expected.inflow.actor': 'Empfänger',
    'expected.outflow.actor': 'Lieferant',
    'expected.invoice': 'Rechnungsnr.',
    'expected.net': 'Netto',
    'expected.vat': 'MwSt.',
    'expected.gross': 'Brutto',
    'expected.settled': 'Abgerechnet',
    'expected.remaining': 'Noch zu zahlen',
    'expected.addRow': 'Position hinzufügen',
    'expected.removeModule': 'Tabelle entfernen',
    'expected.removeRow': 'Position entfernen',
    'section.expectedInflows': 'Erwartete Eingänge',
    'section.expectedOutflows': 'Erwartete Ausgaben',
    'section.internalBilling': 'Interne Fakturierung',
    'internal.fromCompany': 'Ausstellende Gesellschaft',
    'internal.toCompany': 'Empfangende Gesellschaft',
    'internal.invoice': 'Rechnungsnr.',
    'internal.net': 'Netto',
    'internal.vat': 'MwSt.',
    'internal.gross': 'Brutto',
    'internal.settled': 'Abgerechnet',
    'internal.remaining': 'Noch zu zahlen',
    'internal.addRow': 'Position hinzufügen',
    'internal.removeRow': 'Position entfernen',
    'internal.companyPlaceholder': 'Gesellschaft wählen',
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

function hasManualValue(v) {
  return String(v ?? '').trim() !== '';
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
    expectedInflows: [],
    expectedOutflows: [],
  };
}

function createInitialState() {
  return {
    companies: Array.from({ length: DEFAULT_COMPANY_COUNT }, () => createCompany()),
    internalInvoices: [],
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

function createExpectedEntry(entryId = makeId('expected')) {
  return {
    entryId: String(entryId),
    counterparty: '',
    invoiceNo: '',
    net: formatNum(0),
    vat: formatNum(0),
    gross: formatNum(0),
    remaining: '',
  };
}

function normalizeExpectedEntry(raw) {
  const hasRemaining = hasManualValue(raw?.remaining);
  const remaining = hasRemaining
    ? formatNum(parseNum(raw?.remaining))
    : (raw?.settled !== undefined && raw?.settled !== null
        ? formatNum(parseNum(raw?.gross) - parseNum(raw?.settled))
        : '');

  return {
    entryId: String(raw?.entryId ?? makeId('expected')),
    counterparty: String(raw?.counterparty ?? ''),
    invoiceNo: String(raw?.invoiceNo ?? ''),
    net: formatNum(parseNum(raw?.net)),
    vat: formatNum(parseNum(raw?.vat)),
    gross: formatNum(parseNum(raw?.gross)),
    remaining,
  };
}

function createInternalInvoiceEntry(companyId = '') {
  const companies = getCompanies();
  const fromCompanyId = companyId || companies[0]?.companyId || '';
  const toCompanyId =
    companies.find(company => company.companyId !== fromCompanyId)?.companyId
    || fromCompanyId
    || '';

  return {
    entryId: String(makeId('internal')),
    fromCompanyId,
    toCompanyId,
    invoiceNo: '',
    net: formatNum(0),
    vat: formatNum(0),
    gross: formatNum(0),
    remaining: '',
  };
}

function normalizeInternalInvoiceEntry(raw) {
  const hasRemaining = hasManualValue(raw?.remaining);
  const remaining = hasRemaining
    ? formatNum(parseNum(raw?.remaining))
    : (raw?.settled !== undefined && raw?.settled !== null
        ? formatNum(parseNum(raw?.gross) - parseNum(raw?.settled))
        : '');

  return {
    entryId: String(raw?.entryId ?? makeId('internal')),
    fromCompanyId: String(raw?.fromCompanyId ?? raw?.sellerCompanyId ?? ''),
    toCompanyId: String(raw?.toCompanyId ?? raw?.buyerCompanyId ?? ''),
    invoiceNo: String(raw?.invoiceNo ?? ''),
    net: formatNum(parseNum(raw?.net)),
    vat: formatNum(parseNum(raw?.vat)),
    gross: formatNum(parseNum(raw?.gross)),
    remaining,
  };
}

function getInternalInvoices(state = appState) {
  if (!state || typeof state !== 'object') return [];
  if (!Array.isArray(state.internalInvoices)) state.internalInvoices = [];
  return state.internalInvoices;
}

function findInternalInvoiceEntry(entryId) {
  return getInternalInvoices().find(entry => entry.entryId === entryId) || null;
}

function getInternalInvoicesForCompany(companyId) {
  return getInternalInvoices().filter(entry => entry.fromCompanyId === companyId);
}

function calcInternalRemaining(entry) {
  return hasManualValue(entry?.remaining)
    ? parseNum(entry?.remaining)
    : parseNum(entry?.gross);
}

function calcInternalTotals(entries = []) {
  return entries.reduce((totals, entry) => {
    totals.net += parseNum(entry?.net);
    totals.vat += parseNum(entry?.vat);
    totals.gross += parseNum(entry?.gross);
    totals.remaining += calcInternalRemaining(entry);
    return totals;
  }, createExpectedTotals());
}

function sanitizeInternalInvoices() {
  const companies = getCompanies();
  const ids = companies.map(company => company.companyId);
  const validIds = new Set(ids);
  const primary = ids[0] || '';

  getInternalInvoices().forEach(entry => {
    if (!validIds.has(entry.fromCompanyId)) {
      entry.fromCompanyId = primary;
    }

    const fallbackTo =
      ids.find(id => id !== entry.fromCompanyId)
      || entry.fromCompanyId
      || '';

    if (!validIds.has(entry.toCompanyId) || entry.toCompanyId === entry.fromCompanyId) {
      entry.toCompanyId = fallbackTo;
    }
  });
}

function getCompanySelectOptions(selectedValue = '', excludeCompanyId = '') {
  const companies = getCompanies();
  const filtered = companies.filter(company => company.companyId !== excludeCompanyId);
  const source = filtered.length ? filtered : companies;

  return source.map(company => `
    <option value="${company.companyId}" ${company.companyId === selectedValue ? 'selected' : ''}>${escapeHtmlAttr(getCompanyDisplayName(company, findCompanyIndex(company.companyId)))}</option>
  `).join('');
}

function renderSectionAddRowButton(attrs, labelKey = 'expected.addRow') {
  return `
    <button class="table-add-btn inline-section-add-btn" type="button" ${attrs}>
      <span class="table-add-btn-ico" aria-hidden="true">${renderAddIcon()}</span>
      <span>${t(labelKey)}</span>
    </button>
  `;
}

function getExpectedKeyByType(type) {
  return type === 'outflow' ? 'expectedOutflows' : 'expectedInflows';
}

function getExpectedEntries(companyOrId, type) {
  const company = typeof companyOrId === 'string' ? findCompany(companyOrId) : companyOrId;
  if (!company) return [];
  const key = getExpectedKeyByType(type);
  if (!Array.isArray(company[key])) company[key] = [];
  return company[key];
}

function createExpectedTotals() {
  return {
    net: 0,
    vat: 0,
    gross: 0,
    remaining: 0,
  };
}

function calcExpectedRemaining(entry) {
  return hasManualValue(entry?.remaining)
    ? parseNum(entry?.remaining)
    : parseNum(entry?.gross);
}

function calcExpectedTotals(entries = []) {
  return entries.reduce((totals, entry) => {
    totals.net += parseNum(entry?.net);
    totals.vat += parseNum(entry?.vat);
    totals.gross += parseNum(entry?.gross);
    totals.remaining += calcExpectedRemaining(entry);
    return totals;
  }, createExpectedTotals());
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
    expectedInflows: Array.isArray(raw?.expectedInflows) ? raw.expectedInflows.map(normalizeExpectedEntry) : [],
    expectedOutflows: Array.isArray(raw?.expectedOutflows) ? raw.expectedOutflows.map(normalizeExpectedEntry) : [],
  };
}

function normalizeState(raw) {
  const usedCompanyIds = new Set();

  if (Array.isArray(raw?.companies)) {
    const companies = raw.companies.length
      ? raw.companies.map(company => normalizeCompany(company, usedCompanyIds))
      : [createCompany()];

    const state = {
      companies: companies.length >= MIN_COMPANIES ? companies : [createCompany()],
      internalInvoices: Array.isArray(raw?.internalInvoices) ? raw.internalInvoices.map(normalizeInternalInvoiceEntry) : [],
    };

    const validIds = new Set(state.companies.map(company => company.companyId));
    const primary = state.companies[0]?.companyId || '';

    state.internalInvoices.forEach(entry => {
      if (!validIds.has(entry.fromCompanyId)) entry.fromCompanyId = primary;

      const fallbackTo =
        state.companies.find(company => company.companyId !== entry.fromCompanyId)?.companyId
        || entry.fromCompanyId
        || '';

      if (!validIds.has(entry.toCompanyId) || entry.toCompanyId === entry.fromCompanyId) {
        entry.toCompanyId = fallbackTo;
      }
    });

    return state;
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
      companies: companies.length ? companies : [createCompany()],
      internalInvoices: [],
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

    ['inflow', 'outflow'].forEach(type => {
      getExpectedEntries(company, type).forEach(entry => {
        entry.net = formatNum(parseNum(entry.net));
        entry.vat = formatNum(parseNum(entry.vat));
        entry.gross = formatNum(parseNum(entry.gross));
        entry.remaining = hasManualValue(entry.remaining)
          ? formatNum(parseNum(entry.remaining))
          : '';
      });
    });
  });

  getInternalInvoices().forEach(entry => {
    entry.net = formatNum(parseNum(entry.net));
    entry.vat = formatNum(parseNum(entry.vat));
    entry.gross = formatNum(parseNum(entry.gross));
    entry.remaining = hasManualValue(entry.remaining)
      ? formatNum(parseNum(entry.remaining))
      : '';
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

function findExpectedEntry(companyId, type, entryId) {
  const entries = getExpectedEntries(companyId, type);
  return entries.find(entry => entry.entryId === entryId) || null;
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

function renderExpectedTableRow(companyId, type, entry) {
  const actorKey = type === 'outflow' ? 'expected.outflow.actor' : 'expected.inflow.actor';
  const idBase = `expected_${companyId}_${type}_${entry.entryId}`;

  return `
    <tr>
      <td>
        <input
          class="cell-input expected-text-input"
          id="${idBase}_counterparty"
          data-company-id="${companyId}"
          data-expected-type="${type}"
          data-entry-id="${entry.entryId}"
          data-expected-field="counterparty"
          type="text"
          value="${escapeHtmlAttr(entry.counterparty)}"
          placeholder="${escapeHtmlAttr(t(actorKey))}"
          aria-label="${escapeHtmlAttr(t(actorKey))}"
        >
      </td>
      <td>
        <input
          class="cell-input expected-text-input"
          id="${idBase}_invoice"
          data-company-id="${companyId}"
          data-expected-type="${type}"
          data-entry-id="${entry.entryId}"
          data-expected-field="invoiceNo"
          type="text"
          value="${escapeHtmlAttr(entry.invoiceNo)}"
          placeholder="${escapeHtmlAttr(t('expected.invoice'))}"
          aria-label="${escapeHtmlAttr(t('expected.invoice'))}"
        >
      </td>
      <td class="num">
        <input class="cell-input expected-num-input" data-company-id="${companyId}" data-expected-type="${type}" data-entry-id="${entry.entryId}" data-expected-field="net" value="${escapeHtmlAttr(entry.net)}" aria-label="${escapeHtmlAttr(t('expected.net'))}">
      </td>
      <td class="num">
        <input class="cell-input expected-num-input" data-company-id="${companyId}" data-expected-type="${type}" data-entry-id="${entry.entryId}" data-expected-field="vat" value="${escapeHtmlAttr(entry.vat)}" aria-label="${escapeHtmlAttr(t('expected.vat'))}">
      </td>
      <td class="num">
        <input class="cell-input expected-num-input" data-company-id="${companyId}" data-expected-type="${type}" data-entry-id="${entry.entryId}" data-expected-field="gross" value="${escapeHtmlAttr(entry.gross)}" aria-label="${escapeHtmlAttr(t('expected.gross'))}">
      </td>
      <td class="num">
        <input class="cell-input expected-num-input js-expected-remaining" data-company-id="${companyId}" data-expected-type="${type}" data-entry-id="${entry.entryId}" data-expected-field="remaining" value="${escapeHtmlAttr(formatNum(calcExpectedRemaining(entry)))}" aria-label="${escapeHtmlAttr(t('expected.remaining'))}">
      </td>
      <td class="expected-remove-col">
        <button class="expected-remove-btn" type="button" data-company-id="${companyId}" data-expected-type="${type}" data-entry-id="${entry.entryId}" aria-label="${escapeHtmlAttr(t('expected.removeRow'))}">
          ${renderRemoveIcon()}
        </button>
      </td>
    </tr>
  `;
}

function renderExpectedModule(companyId, type) {
  return '';
}

function renderExpectedCompanyBlock(company, index, type) {
  const actorKey = type === 'outflow' ? 'expected.outflow.actor' : 'expected.inflow.actor';
  const entries = getExpectedEntries(company, type);
  const totals = calcExpectedTotals(entries);
  const hasEntries = entries.length > 0;
  const addButton = renderSectionAddRowButton(
    `data-company-id="${company.companyId}" data-add-expected-row="${type}"`
  );

  return `
    <div class="block section-company-block ${hasEntries ? '' : 'section-company-block--compact'}" data-company-id="${company.companyId}" data-section-type="${type}">
      <div class="block-head">
        <div class="expected-company-head-wrap">
          <span class="expected-company-title js-company-label" data-company-id="${company.companyId}">
            ${getCompanyDisplayName(company, index)}
          </span>
          ${addButton}
        </div>
      </div>

      ${hasEntries ? `
        <div class="table-scroll">
          <table class="data-table expected-table">
            <thead>
              <tr>
                <th>${t(actorKey)}</th>
                <th>${t('expected.invoice')}</th>
                <th class="num">${t('expected.net')}</th>
                <th class="num">${t('expected.vat')}</th>
                <th class="num">${t('expected.gross')}</th>
                <th class="num">${t('expected.remaining')}</th>
                <th class="expected-remove-col"></th>
              </tr>
            </thead>
            <tbody>
              ${entries.map(entry => renderExpectedTableRow(company.companyId, type, entry)).join('')}
            </tbody>
            <tfoot>
              <tr>
                <th colspan="2">${t('summary.total')}</th>
                <th class="num js-expected-total" data-company-id="${company.companyId}" data-expected-type="${type}" data-total-field="net">${formatNum(totals.net)}</th>
                <th class="num js-expected-total" data-company-id="${company.companyId}" data-expected-type="${type}" data-total-field="vat">${formatNum(totals.vat)}</th>
                <th class="num js-expected-total" data-company-id="${company.companyId}" data-expected-type="${type}" data-total-field="gross">${formatNum(totals.gross)}</th>
                <th class="num js-expected-total" data-company-id="${company.companyId}" data-expected-type="${type}" data-total-field="remaining">${formatNum(totals.remaining)}</th>
                <th class="expected-remove-col"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      ` : ''}
    </div>
  `;
}

function renderExpectedSection(type) {
  return getCompanies().map((company, index) => renderExpectedCompanyBlock(company, index, type)).join('');
}

function renderInternalBillingRow(companyId, entry) {
  const idBase = `internal_${companyId}_${entry.entryId}`;

  return `
    <tr>
      <td>
        <select class="cell-input internal-company-select" id="${idBase}_to" data-entry-id="${entry.entryId}" data-internal-field="toCompanyId" aria-label="${escapeHtmlAttr(t('internal.toCompany'))}">
          ${getCompanySelectOptions(entry.toCompanyId, companyId)}
        </select>
      </td>
      <td>
        <input class="cell-input internal-text-input" id="${idBase}_invoice" data-entry-id="${entry.entryId}" data-internal-field="invoiceNo" type="text" value="${escapeHtmlAttr(entry.invoiceNo)}" placeholder="${escapeHtmlAttr(t('internal.invoice'))}" aria-label="${escapeHtmlAttr(t('internal.invoice'))}">
      </td>
      <td class="num"><input class="cell-input internal-num-input" data-entry-id="${entry.entryId}" data-internal-field="net" value="${escapeHtmlAttr(entry.net)}" aria-label="${escapeHtmlAttr(t('internal.net'))}"></td>
      <td class="num"><input class="cell-input internal-num-input" data-entry-id="${entry.entryId}" data-internal-field="vat" value="${escapeHtmlAttr(entry.vat)}" aria-label="${escapeHtmlAttr(t('internal.vat'))}"></td>
      <td class="num"><input class="cell-input internal-num-input" data-entry-id="${entry.entryId}" data-internal-field="gross" value="${escapeHtmlAttr(entry.gross)}" aria-label="${escapeHtmlAttr(t('internal.gross'))}"></td>
      <td class="num"><input class="cell-input internal-num-input js-internal-remaining" data-entry-id="${entry.entryId}" data-internal-field="remaining" value="${escapeHtmlAttr(formatNum(calcInternalRemaining(entry)))}" aria-label="${escapeHtmlAttr(t('internal.remaining'))}"></td>
      <td class="expected-remove-col">
        <button class="internal-remove-btn expected-remove-btn" type="button" data-entry-id="${entry.entryId}" aria-label="${escapeHtmlAttr(t('internal.removeRow'))}">
          ${renderRemoveIcon()}
        </button>
      </td>
    </tr>
  `;
}

function renderInternalBillingCompanyBlock(company, index) {
  const entries = getInternalInvoicesForCompany(company.companyId);
  const totals = calcInternalTotals(entries);
  const hasEntries = entries.length > 0;
  const addButton = renderSectionAddRowButton(
    `data-company-id="${company.companyId}" data-add-internal-row="1"`,
    'internal.addRow'
  );

  return `
    <div class="block section-company-block ${hasEntries ? '' : 'section-company-block--compact'}" data-company-id="${company.companyId}" data-section-type="internal">
      <div class="block-head">
        <div class="expected-company-head-wrap">
          <span class="expected-company-title js-company-label" data-company-id="${company.companyId}">
            ${getCompanyDisplayName(company, index)}
          </span>
          ${addButton}
        </div>
      </div>

      ${hasEntries ? `
        <div class="table-scroll">
          <table class="data-table expected-table internal-billing-table">
            <thead>
              <tr>
                <th>${t('internal.toCompany')}</th>
                <th>${t('internal.invoice')}</th>
                <th class="num">${t('internal.net')}</th>
                <th class="num">${t('internal.vat')}</th>
                <th class="num">${t('internal.gross')}</th>
                <th class="num">${t('internal.remaining')}</th>
                <th class="expected-remove-col"></th>
              </tr>
            </thead>
            <tbody>
              ${entries.map(entry => renderInternalBillingRow(company.companyId, entry)).join('')}
            </tbody>
            <tfoot>
              <tr>
                <th colspan="2">${t('summary.total')}</th>
                <th class="num js-internal-total" data-company-id="${company.companyId}" data-total-field="net">${formatNum(totals.net)}</th>
                <th class="num js-internal-total" data-company-id="${company.companyId}" data-total-field="vat">${formatNum(totals.vat)}</th>
                <th class="num js-internal-total" data-company-id="${company.companyId}" data-total-field="gross">${formatNum(totals.gross)}</th>
                <th class="num js-internal-total" data-company-id="${company.companyId}" data-total-field="remaining">${formatNum(totals.remaining)}</th>
                <th class="expected-remove-col"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      ` : ''}
    </div>
  `;
}

function renderInternalBillingSection() {
  return `
    <div class="expected-section-grid internal-billing-grid">
      ${getCompanies().map((company, index) => renderInternalBillingCompanyBlock(company, index)).join('')}
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

    document.querySelectorAll(`.js-company-label[data-company-id="${company.companyId}"]`).forEach(el => {
      el.textContent = name;
    });

    document.querySelectorAll(`.internal-company-select option[value="${company.companyId}"]`).forEach(el => {
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
  const inflowsWrapper = document.getElementById('expected-inflows-wrapper');
  const outflowsWrapper = document.getElementById('expected-outflows-wrapper');
  const internalWrapper = document.getElementById('internal-billing-wrapper');

  if (!wrapper || !template || !summaryBody || !inflowsWrapper || !outflowsWrapper || !internalWrapper) return;

  wrapper.innerHTML = '';
  summaryBody.innerHTML = '';
  inflowsWrapper.innerHTML = '';
  outflowsWrapper.innerHTML = '';
  internalWrapper.innerHTML = '';
  wrapper.appendChild(template.content.cloneNode(true));

  const addCompanyBtn = wrapper.querySelector('.add-company-btn');
  const addCompanyIcon = addCompanyBtn?.querySelector('.table-add-btn-ico');
  if (addCompanyIcon) addCompanyIcon.innerHTML = renderAddIcon();

  const companiesList = wrapper.querySelector('.js-companies-list');
  if (!companiesList) return;

  sanitizeInternalInvoices();

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

  inflowsWrapper.innerHTML = renderExpectedSection('inflow');
  outflowsWrapper.innerHTML = renderExpectedSection('outflow');
  internalWrapper.innerHTML = renderInternalBillingSection();

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

function syncCalculatedInputValue(input, value) {
  if (!input) return;
  if (document.activeElement === input) return;
  input.value = value;
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

    applyPipeRule(document.querySelector(`.js-company-total[data-company-id="${company.companyId}"]`), companyText);
    applyPipeRule(document.querySelector(`.js-summary-company[data-company-id="${company.companyId}"]`), companyText);
  });

  const grandVisibleCodes = getVisibleCurrencyCodesForAllCompanies();
  applyPipeRule(document.querySelector('.js-summary-total'), formatPair(grandTotal, grandVisibleCodes));

  getCompanies().forEach(company => {
    ['inflow', 'outflow'].forEach(type => {
      const entries = getExpectedEntries(company, type);

      entries.forEach(entry => {
        const remainingEl = document.querySelector(`.js-expected-remaining[data-company-id="${company.companyId}"][data-expected-type="${type}"][data-entry-id="${entry.entryId}"]`);
        syncCalculatedInputValue(remainingEl, formatNum(calcExpectedRemaining(entry)));
      });

      const totals = calcExpectedTotals(entries);
      Object.entries(totals).forEach(([field, value]) => {
        const totalEl = document.querySelector(`.js-expected-total[data-company-id="${company.companyId}"][data-expected-type="${type}"][data-total-field="${field}"]`);
        if (totalEl) totalEl.textContent = formatNum(value);
      });
    });
  });

  getCompanies().forEach(company => {
    const entries = getInternalInvoicesForCompany(company.companyId);
    const totals = calcInternalTotals(entries);

    entries.forEach(entry => {
      const remainingEl = document.querySelector(`.js-internal-remaining[data-entry-id="${entry.entryId}"]`);
      syncCalculatedInputValue(remainingEl, formatNum(calcInternalRemaining(entry)));
    });

    Object.entries(totals).forEach(([field, value]) => {
      document.querySelectorAll(`.js-internal-total[data-company-id="${company.companyId}"][data-total-field="${field}"]`).forEach(el => {
        el.textContent = formatNum(value);
      });
    });
  });

  updateNeedsFill();
}

function updateNeedsFill() {
  document.querySelectorAll('.amt-input:not([readonly]), .expected-num-input:not([readonly]), .internal-num-input:not([readonly])').forEach(inp => {
    const isZero = parseNum(inp.value) === 0;
    inp.classList.toggle('needs-fill', isZero);
  });

  document.querySelectorAll('.acc-name-input:not([readonly]), .company-inline-input:not([readonly]), .bank-name-input:not([readonly]), .expected-text-input:not([readonly]), .internal-text-input:not([readonly])').forEach(inp => {
    const isEmpty = !inp.value.trim();
    inp.classList.toggle('needs-fill', isEmpty);
  });

  document.querySelectorAll('.internal-company-select').forEach(select => {
    select.classList.toggle('needs-fill', !select.value);
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
  sanitizeInternalInvoices();
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

function addExpectedEntry(companyId, type) {
  const company = findCompany(companyId);
  if (!company) return;

  const entries = getExpectedEntries(company, type);
  const entry = createExpectedEntry();
  entries.push(entry);

  pendingFocusId = `expected_${companyId}_${type}_${entry.entryId}_counterparty`;
  renderApp();
  scheduleSave();
}

function removeExpectedEntry(companyId, type, entryId) {
  const company = findCompany(companyId);
  if (!company) return;

  const key = getExpectedKeyByType(type);
  company[key] = getExpectedEntries(company, type).filter(entry => entry.entryId !== entryId);

  renderApp();
  scheduleSave();
}

function removeExpectedModule(companyId, type) {
  const company = findCompany(companyId);
  if (!company) return;

  company[getExpectedKeyByType(type)] = [];
  renderApp();
  scheduleSave();
}

function addInternalInvoiceEntry(companyId) {
  const entry = createInternalInvoiceEntry(companyId);
  getInternalInvoices().push(entry);
  pendingFocusId = `internal_${entry.fromCompanyId}_${entry.entryId}_invoice`;
  renderApp();
  scheduleSave();
}

function removeInternalInvoiceEntry(entryId) {
  appState.internalInvoices = getInternalInvoices().filter(entry => entry.entryId !== entryId);
  renderApp();
  scheduleSave();
}

function getState() {
  return {
    lang: currentLang,
    companies: appState.companies,
    internalInvoices: getInternalInvoices(),
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

  aoa.push([]);
  aoa.push(['Section', 'Company', 'Type', 'EntryId', 'Counterparty', 'InvoiceNo', 'Net', 'Vat', 'Gross', 'Remaining']);

  getCompanies().forEach(company => {
    ['inflow', 'outflow'].forEach(type => {
      getExpectedEntries(company, type).forEach(entry => {
        aoa.push([
          'expectedRow',
          company.companyId,
          type,
          entry.entryId,
          entry.counterparty,
          entry.invoiceNo,
          formatNum(parseNum(entry.net)),
          formatNum(parseNum(entry.vat)),
          formatNum(parseNum(entry.gross)),
          formatNum(calcExpectedRemaining(entry))
        ]);
      });
    });
  });

  aoa.push([]);
  aoa.push(['Section', 'EntryId', 'FromCompany', 'ToCompany', 'InvoiceNo', 'Net', 'Vat', 'Gross', 'Remaining']);

  getInternalInvoices().forEach(entry => {
    aoa.push([
      'internalInvoiceRow',
      entry.entryId,
      entry.fromCompanyId,
      entry.toCompanyId,
      entry.invoiceNo,
      formatNum(parseNum(entry.net)),
      formatNum(parseNum(entry.vat)),
      formatNum(parseNum(entry.gross)),
      formatNum(calcInternalRemaining(entry))
    ]);
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

  const nextState = { companies: [], internalInvoices: [] };
  const companyMap = new Map();
  const bankMaps = new Map();

  function ensureCompany(rawCompanyId) {
    const companyId = String(rawCompanyId ?? '').trim() || makeId('company');

    if (!companyMap.has(companyId)) {
      const company = {
        companyId,
        name: '',
        banks: [],
        expectedInflows: [],
        expectedOutflows: []
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

    if (
      (first === 'Company' && String(r[1] ?? '').trim() === 'BankId')
      || (first === 'Section' && String(r[1] ?? '').trim() === 'Company')
      || (first === 'Section' && String(r[1] ?? '').trim() === 'EntryId')
    ) {
      return;
    }

    if (first === 'bankName' && r.length >= 4) {
      ensureBank(r[1], r[2]).name = String(r[3] ?? '');
      return;
    }

    if (first === 'expectedRow' && r.length >= 10) {
      const company = ensureCompany(r[1]);
      getExpectedEntries(company, r[2]).push(normalizeExpectedEntry({
        entryId: r[3],
        counterparty: r[4],
        invoiceNo: r[5],
        net: r[6],
        vat: r[7],
        gross: r[8],
        remaining: r[9],
      }));
      return;
    }

    if (first === 'internalInvoiceRow' && r.length >= 9) {
      nextState.internalInvoices.push(normalizeInternalInvoiceEntry({
        entryId: r[1],
        fromCompanyId: r[2],
        toCompanyId: r[3],
        invoiceNo: r[4],
        net: r[5],
        vat: r[6],
        gross: r[7],
        remaining: r[8],
      }));
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
  sanitizeInternalInvoices();
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

    const addExpectedBtn = e.target.closest('[data-add-expected], [data-add-expected-row]');
    if (addExpectedBtn) {
      addExpectedEntry(
        addExpectedBtn.dataset.companyId,
        addExpectedBtn.dataset.addExpected || addExpectedBtn.dataset.addExpectedRow
      );
      return;
    }

    const addInternalBtn = e.target.closest('[data-add-internal-row]');
    if (addInternalBtn) {
      addInternalInvoiceEntry(addInternalBtn.dataset.companyId);
      return;
    }

    const removeBankBtn = e.target.closest('.bank-remove-btn:not(.company-remove-btn)');
    if (removeBankBtn) {
      removeBank(removeBankBtn.dataset.companyId, removeBankBtn.dataset.bankId);
      return;
    }

    const removeExpectedModuleBtn = e.target.closest('[data-remove-expected-module]');
    if (removeExpectedModuleBtn) {
      removeExpectedModule(removeExpectedModuleBtn.dataset.companyId, removeExpectedModuleBtn.dataset.removeExpectedModule);
      return;
    }

    const removeExpectedBtn = e.target.closest('.expected-remove-btn[data-expected-type]');
    if (removeExpectedBtn) {
      removeExpectedEntry(
        removeExpectedBtn.dataset.companyId,
        removeExpectedBtn.dataset.expectedType,
        removeExpectedBtn.dataset.entryId
      );
      return;
    }

    const removeInternalBtn = e.target.closest('.internal-remove-btn');
    if (removeInternalBtn) {
      removeInternalInvoiceEntry(removeInternalBtn.dataset.entryId);
      return;
    }

    const removeBtn = e.target.closest('.acc-remove-btn');
    if (removeBtn) {
      removeAccount(removeBtn.dataset.companyId, removeBtn.dataset.bankId, removeBtn.dataset.rowId);
    }
  });

  document.addEventListener('focusin', e => {
    if (e.target.matches('.amt-input:not([readonly]), .expected-num-input:not([readonly]), .internal-num-input:not([readonly])')) {
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
      return;
    }

    if (e.target.matches('.expected-num-input:not([readonly])')) {
      const field = e.target.dataset.expectedField;
      const entry = findExpectedEntry(
        e.target.dataset.companyId,
        e.target.dataset.expectedType,
        e.target.dataset.entryId
      );

      if (!entry) return;

      if (field === 'remaining') {
        const raw = e.target.value.trim();
        entry.remaining = raw ? formatNum(parseNum(raw)) : '';
        e.target.value = formatNum(calcExpectedRemaining(entry));
      } else {
        const amount = formatNum(parseNum(e.target.value));
        e.target.value = amount;
        entry[field] = amount;
      }

      recalcAll();
      scheduleSave();
      return;
    }

    if (e.target.matches('.internal-num-input:not([readonly])')) {
      const field = e.target.dataset.internalField;
      const entry = findInternalInvoiceEntry(e.target.dataset.entryId);
      if (!entry) return;

      if (field === 'remaining') {
        const raw = e.target.value.trim();
        entry.remaining = raw ? formatNum(parseNum(raw)) : '';
        e.target.value = formatNum(calcInternalRemaining(entry));
      } else {
        const amount = formatNum(parseNum(e.target.value));
        e.target.value = amount;
        entry[field] = amount;
      }

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
      return;
    }

    if (e.target.matches('.expected-text-input')) {
      const entry = findExpectedEntry(
        e.target.dataset.companyId,
        e.target.dataset.expectedType,
        e.target.dataset.entryId
      );
      if (entry) entry[e.target.dataset.expectedField] = e.target.value;
      updateNeedsFill();
      scheduleSave();
      return;
    }

    if (e.target.matches('.expected-num-input')) {
      const entry = findExpectedEntry(
        e.target.dataset.companyId,
        e.target.dataset.expectedType,
        e.target.dataset.entryId
      );
      if (entry) entry[e.target.dataset.expectedField] = e.target.value;
      recalcAll();
      scheduleSave();
      return;
    }

    if (e.target.matches('.internal-text-input')) {
      const entry = findInternalInvoiceEntry(e.target.dataset.entryId);
      if (entry) entry[e.target.dataset.internalField] = e.target.value;
      updateNeedsFill();
      scheduleSave();
      return;
    }

    if (e.target.matches('.internal-num-input')) {
      const entry = findInternalInvoiceEntry(e.target.dataset.entryId);
      if (entry) entry[e.target.dataset.internalField] = e.target.value;
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
      return;
    }

    if (e.target.matches('.internal-company-select')) {
      const entry = findInternalInvoiceEntry(e.target.dataset.entryId);
      if (entry) entry[e.target.dataset.internalField] = e.target.value;
      updateNeedsFill();
      scheduleSave();
    }
  });

  initImportUI();
  initLanguageUI();

  window.addEventListener('resize', () => {
    requestAnimationFrame(syncHeaderActionButtonWidths);
  });
});