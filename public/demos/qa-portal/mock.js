/*
 * QA Data Portal — interactive demo backend (runs in the browser, nothing is saved).
 * Every company, person and number here is fictional. Reload the page to reset.
 */
(function () {
  'use strict';
  const YEAR = new Date().getFullYear();
  const pad = n => String(n).padStart(2, '0');
  const now = new Date();
  const TODAY = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const dayNum = s => Math.round(Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)) / 86400000);
  const dayStr = d => new Date(d * 86400000).toISOString().slice(0, 10);
  const ts = () => { const d = new Date(); return `${TODAY} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const later = (value, ms) => new Promise(res => setTimeout(() => res(value), ms || 700));
  const fail = msg => { throw new Error(msg); };
  let seed = 11;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const pick = list => list[Math.floor(rnd() * list.length)];
  const lc = s => String(s || '').toLowerCase();

  /* ------------------------------------------------------------ people */
  const ME = 'jordan.lee@example.com';
  const users = [
    { email: ME, name: 'Jordan Lee', role: 'Admin', all: true, accounts: [], alerts: true },
    { email: 'sam.rivera@example.com', name: 'Sam Rivera', role: 'Admin', all: true, accounts: [], alerts: true },
    { email: 'maya.chen@example.com', name: 'Maya Chen', role: 'User', all: false, accounts: ['Northwind Telecom'], alerts: false },
    { email: 'luis.ortega@example.com', name: 'Luis Ortega', role: 'User', all: false, accounts: ['Contoso Bank'], alerts: false },
    { email: 'nora.patel@example.com', name: 'Nora Patel', role: 'User', all: false, accounts: ['Fabrikam Health', 'Tailspin Travel'], alerts: false },
  ];
  let viewAs = null;                       // demo "View as": { role: 'User', accounts: [...] }

  /* ------------------------------------------------------------ sources and data */
  const rule = (o) => Object.assign({ dateHeader: 'Eval Date', wdidHeader: 'Agent WDID', nameHeader: 'Agent Name', filter: '[Calibration] != Yes',
    numerator: '[QA Score] / 100', denominator: '1', keyFields: '[Ticket ID], [Agent WDID]', headerRow: 2, dateFormat: '' }, o || {});
  const sources = [
    { id: 'NW-VOICE', account: 'Northwind Telecom', lobs: ['Voice'], countries: ['Philippines'], n: 2400, base: 0.89, from: `${YEAR}-01-02`, tabs: `* ${YEAR}`, lob: 'Voice', country: 'Philippines', rules: rule() },
    { id: 'NW-CHAT', account: 'Northwind Telecom', lobs: ['Chat', 'Email'], countries: ['Philippines'], n: 1500, base: 0.92, from: `${YEAR}-02-01`, tabs: 'Chat QA', lob: '[Channel]', country: 'Philippines', rules: rule({ numerator: '[QA Score]', keyFields: '[Interaction ID], [Agent WDID]' }) },
    { id: 'CONTOSO', account: 'Contoso Bank', lobs: ['Claims', 'Customer Service'], countries: ['Guatemala', 'El Salvador'], n: 3200, base: 0.86, from: `${YEAR}-01-05`, tabs: 'Call Evaluations', lob: '[LOB]', country: '[Site]', rules: rule({ filter: '', numerator: '[Points Earned]', denominator: '[Points Possible]', keyFields: '[Evaluation ID]' }) },
    { id: 'FABRIKAM', account: 'Fabrikam Health', lobs: ['Voice', 'Chat'], countries: ['Mexico'], n: 1800, base: 0.9, from: `${YEAR}-03-10`, tabs: 'QA Evaluations', lob: '[Channel]', country: 'Mexico', rules: rule({ numerator: '[Score] / 5', filter: '[Empathy] not empty' }) },
    { id: 'TAILSPIN', account: 'Tailspin Travel', lobs: ['Voice'], countries: ['Colombia'], n: 900, base: 0.84, from: `${YEAR}-01-08`, tabs: `* ${YEAR}`, lob: 'Voice', country: 'Colombia', rules: rule({ filter: '' }),
      mapping: { at: TODAY, count: 1, tabs: [{ tab: `Oct ${YEAR}`, specs: ['QA Score'], headers: ['Eval Date', 'Agent WDID', 'Agent Name', 'Ticket ID', 'QA Score %', 'Evaluator', 'Comments'] }] } },
    { id: 'WWR', account: 'Wide World Retail', lobs: ['Voice'], countries: ['Bulgaria'], n: 700, base: 0.88, from: `${YEAR}-04-01`, tabs: 'Audits', lob: 'Voice', country: 'Bulgaria', rules: rule({ keyFields: '[Audit ID]' }), empty: true },
  ];
  sources.forEach(s => { s.active = true; s.ruleVersion = Math.floor(rnd() * 1e8).toString(16); s.notes = ''; });
  let rows = [];                           // { s, a, l, c, w, d, n, m }
  let dataVersion = 1;
  const lastDay = dayNum(TODAY) - 2;

  function generate(src, count, fromDay, toDay) {
    const out = [];
    const d0 = fromDay !== undefined ? fromDay : dayNum(src.from), d1 = toDay !== undefined ? toDay : lastDay;
    for (let i = 0; i < count; i++) {
      const k = Math.max(0, Math.min(1, src.base + (rnd() - 0.5) * 0.32));
      out.push({ s: src.id, a: src.account, l: pick(src.lobs), c: pick(src.countries), w: String(40100000 + Math.floor(rnd() * (60 + src.n / 25))),
        d: d0 + Math.floor(rnd() * Math.max(1, d1 - d0 + 1)), n: Math.round(k * 1e4) / 1e4, m: 1 });
    }
    return out;
  }
  sources.filter(s => !s.empty).forEach(s => { rows = rows.concat(generate(s, s.n)); });

  /* ------------------------------------------------------------ activity log, requests, deletions */
  const log = [];
  function logRun(src, status, extra, context, by) {
    const mine = rows.filter(r => r.s === src.id);
    const days = mine.map(r => r.d).sort((a, b) => a - b);
    const read = extra && extra.read !== undefined ? extra.read : Math.round(mine.length * 1.06);
    const tabsRead = src.tabs.includes('*') ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map(m => `${m} ${YEAR} (${Math.round(mine.length / 9)})`).join(', ') : `${src.tabs} (${mine.length})`;
    const e = Object.assign({ runAt: ts(), source: src.id, status: status, read: read, loaded: status === 'OK' ? mine.length : 0,
      noWdid: Math.round(read * 0.02), filtered: Math.round(read * 0.03), outOfRange: 0, badDate: Math.round(read * 0.002), badValue: 0,
      dupes: Math.round(read * 0.004), conflicts: 0, min: days.length ? dayStr(days[0]) : '', max: days.length ? dayStr(days[days.length - 1]) : '',
      version: src.ruleVersion, message: '', runBy: by || ME, context: context || 'Refresh from the portal', account: src.account,
      file: '', tabsRule: src.tabs, tabsRead: status === 'OK' ? tabsRead : '' }, extra || {});
    if (status === 'OK' && e.dupes) e.message = `${e.dupes} duplicated evaluation(s): only the most recent of each was counted`;
    log.push(e);
    return e;
  }
  sources.filter(s => !s.empty).forEach(s => logRun(s, 'OK', { runAt: `${dayStr(lastDay)} 07:0${sources.indexOf(s)}` }, 'Scheduled run', 'automatic run'));
  logRun(sources.find(s => s.id === 'TAILSPIN'), 'NEEDS MAPPING', { runAt: `${dayStr(lastDay + 1)} 07:04`, read: 0, message: `Column(s) not found: tab "Oct ${YEAR}": "QA Score". Nothing was loaded; the data loaded before is kept.` }, 'Scheduled run', 'automatic run');

  let reqSeq = 0;
  const requests = [];
  function addRequest(r) {
    const id = 'REQ-' + String(++reqSeq).padStart(4, '0');
    requests.push(Object.assign({ id: id, status: 'Requested', account: '', sourceId: '', from: '', to: '', rows: '', reason: '', by: ME, at: ts(),
      reviewedBy: '', reviewedAt: '', decidedBy: '', decidedAt: '', result: '', details: {} }, r));
    return id;
  }
  const testExample = (evals) => ({ evals: evals, months: [7, 8, 9].map(m => ({ month: `${YEAR}-${pad(m)}`, evals: Math.round(evals / 3), kpi: 0.88 + m / 500 })) });
  addRequest({ type: 'New source', status: 'Done', account: 'Fabrikam Health', sourceId: 'FABRIKAM', rows: 1800, by: 'nora.patel@example.com', at: `${YEAR}-03-12 10:20`,
    decidedBy: ME, decidedAt: `${YEAR}-03-12 11:02`, result: 'Source FABRIKAM created: OK · 1,800 evaluations' });
  addRequest({ type: 'Remap', status: 'Done', account: 'Northwind Telecom', sourceId: 'NW-CHAT', rows: 1500, reason: '"Score" → "QA Score"', by: 'maya.chen@example.com',
    at: `${dayStr(lastDay - 20)} 09:15`, decidedBy: 'maya.chen@example.com', decidedAt: `${dayStr(lastDay - 20)} 09:15`, result: 'OK · 1,500 evaluations' });
  addRequest({ type: 'Delete', account: 'Contoso Bank', sourceId: 'CONTOSO', from: `${YEAR}-08-01`, to: `${YEAR}-08-07`, reason: 'Test evaluations were added to the file by mistake in the first week of August',
    by: 'luis.ortega@example.com', at: `${dayStr(lastDay)} 16:40` });
  addRequest({ type: 'New tab', account: 'Northwind Telecom', sourceId: 'NW-VOICE', rows: 214, reason: `New tab(s) read for the first time: "Oct ${YEAR}" (214 evaluations)`,
    by: 'portal (automatic)', at: `${dayStr(lastDay + 1)} 07:00`, details: { tabs: [`Oct ${YEAR}`] } });
  addRequest({ type: 'New source', account: 'Northwind Telecom', rows: 640, by: 'maya.chen@example.com', at: `${dayStr(lastDay + 1)} 11:30`,
    details: { fileName: 'Northwind Email QA', confirmed: true, comment: '', test: testExample(640),
      rule: { tabs: `* ${YEAR}`, date: 'Eval Date', wdid: 'Agent WDID', numerator: '[QA Score] / 100', denominator: '1', filter: '[Calibration] != Yes', keys: '[Ticket ID], [Agent WDID]', lob: 'Email', country: 'Philippines' } } });
  addRequest({ type: 'Quick add', account: 'Wide World Retail', reason: 'The score is the last column; one tab per month', by: 'nora.patel@example.com', at: `${dayStr(lastDay + 1)} 14:05`,
    details: { fileName: 'WWR Audits ' + YEAR, url: '', country: 'Bulgaria', note: 'The score is the last column; one tab per month' } });

  const deletions = [];

  /* ------------------------------------------------------------ helpers */
  const realMe = () => users.find(u => u.email === ME);
  const role = () => (viewAs ? 'User' : 'Admin');
  const visible = () => (viewAs ? viewAs.accounts.map(lc) : null);
  const canSee = acc => !visible() || visible().includes(lc(acc));
  const requireAdmin = () => { if (role() !== 'Admin') fail('Your role (User) cannot do this. Ask the BA team.'); };
  const src = id => sources.find(s => s.id === id) || fail(`Source ${id} not found.`);
  const mySource = id => { const s = src(id); if (!canSee(s.account)) fail('You are not assigned to this account.'); return s; };
  const bump = () => { dataVersion++; };
  function summary(id) {
    const mine = rows.filter(r => r.s === id);
    if (!mine.length) return { rows: 0, min: '', max: '', countries: [], lobs: [] };
    let mn = Infinity, mx = -Infinity;
    const cs = new Set(), ls = new Set();
    mine.forEach(r => { if (r.d < mn) mn = r.d; if (r.d > mx) mx = r.d; cs.add(r.c); ls.add(r.l); });
    return { rows: mine.length, min: dayStr(mn), max: dayStr(mx), countries: Array.from(cs).sort(), lobs: Array.from(ls).sort() };
  }
  function actionsFor(r) {
    if (role() !== 'Admin' || !['Requested', 'Waiting for approver'].includes(r.status)) return [];
    return { Delete: ['run', 'reject'], Replace: ['run', 'reject'], 'Quick add': ['map', 'reject'], 'New source': ['load', 'reject'], Modify: ['done', 'reject'], 'New tab': ['keep', 'exclude'] }[r.type] || [];
  }
  const pending = () => (role() === 'Admin' ? requests.filter(r => actionsFor(r).some(a => a !== 'reject')).length : 0);
  function matchRows(q) {
    const set = new Set(q.sources || []);
    const f = q.from ? dayNum(q.from) : -Infinity, t = q.to ? dayNum(q.to) : Infinity;
    return rows.filter(r => (!set.size || set.has(r.s)) && r.d >= f && r.d <= t);
  }
  function deleteRows(q, reason) {
    const del = matchRows(q);
    if (!del.length) return { batchId: '', rows: 0 };
    const gone = new Set(del);
    rows = rows.filter(r => !gone.has(r));
    const batchId = `DEL-${TODAY.replace(/-/g, '')}-${String(Date.now()).slice(-5)}`;
    deletions.push({ batchId: batchId, deletedAt: ts(), by: ME, sources: (q.sources || []).length ? q.sources.join(', ') : 'All sources', from: q.from || 'all dates',
      to: q.to || 'all dates', rows: del.length, reason: reason || '', status: 'Deleted', restoredAt: '', restoredBy: '', items: del });
    bump();
    return { batchId: batchId, rows: del.length };
  }
  function newSource(account, lob, country, evals, context, by) {
    const base = account.toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 14) || 'SOURCE';
    let id = base, k = 2;
    while (sources.some(s => s.id === id)) id = `${base}-${k++}`;
    const s = { id: id, account: account, lobs: [lob || 'Voice'], countries: [country || 'Philippines'], n: evals, base: 0.88, from: `${YEAR}-07-01`, tabs: `* ${YEAR}`,
      lob: lob || 'Voice', country: country || 'Philippines', rules: rule(), active: true, ruleVersion: Math.floor(rnd() * 1e8).toString(16), notes: `Added in the portal by ${by || ME}` };
    sources.push(s);
    rows = rows.concat(generate(s, evals));
    bump();
    logRun(s, 'OK', {}, context, by);
    return s;
  }

  /* ------------------------------------------------------------ the API the page calls */
  const insp = tab => ({
    tab: tab, headerRow: 2, rows: 700,
    headers: ['Eval Date', 'Agent WDID', 'Agent Name', 'Channel', 'Ticket ID', 'QA Score', 'Calibration', 'Evaluator'],
    sample: [[`9/1/${YEAR}`, '40120331', 'A. Moreno', 'Voice', 'T-55120', '92', 'No', 'K. Diaz'], [`9/1/${YEAR}`, '40120874', 'J. Park', 'Chat', 'T-55134', '88', 'No', 'K. Diaz'],
      [`9/2/${YEAR}`, '', 'R. Silva', 'Voice', 'T-55201', '95', 'Yes', 'P. Grant'], [`9/2/${YEAR}`, '40121102', 'L. Novak', 'Voice', 'T-55207', '79', 'No', 'P. Grant']],
    cols: [{ header: 'Eval Date', examples: [`9/1/${YEAR}`, `9/2/${YEAR}`], isDate: true, textDate: false }, { header: 'Agent WDID', examples: ['40120331', '40120874'] },
      { header: 'Agent Name', examples: ['A. Moreno', 'J. Park'] }, { header: 'Channel', examples: ['Voice', 'Chat'] }, { header: 'Ticket ID', examples: ['T-55120', 'T-55134'] },
      { header: 'QA Score', examples: ['92', '88', '95'], min: 40, max: 100 }, { header: 'Calibration', examples: ['No', 'Yes'] }, { header: 'Evaluator', examples: ['K. Diaz', 'P. Grant'] }],
    guess: { date: 'Eval Date', wdid: 'Agent WDID', name: 'Agent Name', score: 'QA Score', scale: '0-100', id: 'Ticket ID', lob: 'Channel', country: '' },
    similar: [`Jul ${YEAR}`, `Aug ${YEAR}`, `Sep ${YEAR}`, `Oct ${YEAR}`].filter(t => t !== tab),
  });
  function testResult(draft) {
    const sc = draft.score || {};
    const keys = draft.keys || [];
    const calib = (draft.filters || []).some(f => /calibration/i.test(f.col));
    const scaleOk = sc.mode !== 'one' || ['0-100', 'range'].includes(sc.scale);
    const dupes = keys.includes('Ticket ID') ? 6 : 148;
    const read = 2341, noWdid = 41, filtered = calib ? 87 : 0, badDate = 12, loaded = read - noWdid - filtered - badDate - dupes;
    const factor = scaleOk ? 1 : 0.05;
    const months = [7, 8, 9, 10].map((m, i) => ({ month: `${YEAR}-${pad(m)}`, evals: [702, 688, 715, loaded - 2105][i], kpi: [0.908, 0.912, 0.896, 0.901][i] * factor }));
    const warnings = [];
    if (!scaleOk) warnings.push(`The QA score looks very low (${(0.9 * factor * 100).toFixed(1)}%). Check the scale: for example a 1–5 score read as 0–100.`);
    if (draft.autoTabs) warnings.push('Tabs ignored because they do not have the evaluation columns: Summary.');
    return { ok: true, error: '', needs: null, warnings: warnings, samples: [],
      stats: { read: read, loaded: loaded, noWdid: noWdid, filtered: filtered, badDate: badDate, outOfRange: 0, badValue: 0, dupes: dupes, already: 0, min: `${YEAR}-07-01`, max: dayStr(lastDay) },
      examples: {
        noWdid: [{ where: `"Sep ${YEAR}" row 4`, what: 'WDID empty' }, { where: `"Aug ${YEAR}" row 77`, what: 'WDID "N/A"' }],
        filtered: calib ? [{ where: `"Jul ${YEAR}" row 5`, what: 'Calibration = "Yes"' }] : [],
        badDate: [{ where: `"Aug ${YEAR}" row 301`, what: 'date "TBD"' }],
        dupes: [{ where: `"Sep ${YEAR}" row 40`, what: `duplicate of "Sep ${YEAR}" row 212; "Sep ${YEAR}" row 212 was counted (${YEAR}-09-18)` }],
      },
      months: months,
      rule: { tabs: draft.autoTabs ? (draft.tabPattern || '*') + (draft.excludeTabs || []).filter(t => t === 'Summary').map(t => ', -' + t).join('') : (draft.tabs || []).join(', '),
        numerator: sc.mode === 'two' ? `[${sc.earned}]` : `[${sc.col}] / 100`, denominator: sc.mode === 'two' ? `[${sc.possible}]` : '1',
        filter: calib ? '[Calibration] != Yes' : '', keys: keys.map(k => `[${k}]`).join(', '), lob: draft.lob && draft.lob.mode === 'column' ? `[${draft.lob.value}]` : (draft.lob || {}).value,
        country: draft.country && draft.country.mode === 'column' ? `[${draft.country.value}]` : (draft.country || {}).value } };
  }

  window.MOCK = {
    apiStatus() {
      const me = realMe();
      const vis = sources.filter(s => canSee(s.account));
      const list = vis.map(s => {
        const mine = log.filter(l => l.source === s.id);
        const last = mine.length ? mine[mine.length - 1] : null;
        const lastLoad = mine.slice().reverse().find(l => l.status !== 'SKIPPED') || null;
        return { id: s.id, active: s.active, account: s.account, kpi: 'QA', lob: s.lob, country: s.country, tabs: s.tabs, fileUrl: '',
          lastRun: last ? last.runAt : '', lastResult: last ? last.status : '', ruleVersion: s.ruleVersion, notes: s.notes, rules: s.rules,
          last: last, lastLoad: lastLoad, data: summary(s.id), mapping: s.mapping || null, canRun: true, canFix: true };
      });
      const total = list.reduce((t, s) => t + (s.active ? s.data.rows : 0), 0);
      return later({
        user: ME, now: ts(), today: TODAY, dataVersion: 'v' + dataVersion, dateFrom: `${YEAR}-01-01`, dateTo: `${YEAR}-12-31`,
        me: { email: ME, name: me.name, role: role(), open: false, unlisted: false, accounts: viewAs ? viewAs.accounts : null, realRole: 'Admin', viewAs: viewAs,
          demoAccounts: Array.from(new Set(sources.map(s => s.account))).sort() },
        pending: pending(),
        known: { accounts: Array.from(new Set(sources.filter(s => canSee(s.account)).map(s => s.account))).sort(), countries: ['Bulgaria', 'Colombia', 'El Salvador', 'Guatemala', 'Mexico', 'Philippines'] },
        destination: { today: 'Google Sheet (pilot)', name: 'QA Data — Control', url: '', tab: 'Data', rows: total, cells: total * 15, cellLimit: 10000000, future: 'A cloud data warehouse (BigQuery)' },
        sources: list,
      }, 450);
    },
    apiDataset() {
      const dict = { src: [], acc: [], lob: [], cty: [], wdid: [] }, cols = { s: [], a: [], l: [], c: [], w: [], d: [], n: [], m: [] };
      const idx = {};
      const code = (k, v) => { const key = k + '|' + v; if (!(key in idx)) { idx[key] = dict[k].length; dict[k].push(v); } return idx[key]; };
      const active = new Set(sources.filter(s => s.active).map(s => s.id));
      rows.forEach(r => {
        if (!active.has(r.s) || !canSee(r.a)) return;
        cols.s.push(code('src', r.s)); cols.a.push(code('acc', r.a)); cols.l.push(code('lob', r.l)); cols.c.push(code('cty', r.c)); cols.w.push(code('wdid', r.w));
        cols.d.push(r.d); cols.n.push(r.n); cols.m.push(r.m);
      });
      return later({ version: 'v' + dataVersion, dict: dict, cols: cols }, 900);
    },
    apiRun(id) {
      const s = mySource(id);
      if (s.mapping) {
        const e = logRun(s, 'NEEDS MAPPING', { read: 0, message: `Column(s) not found: tab "Oct ${YEAR}": "QA Score". Nothing was loaded; the data loaded before is kept.` });
        return later({ id: id, status: 'NEEDS MAPPING', message: e.message, stats: {} }, 2200);
      }
      if (!rows.some(r => r.s === id)) { rows = rows.concat(generate(s, s.n)); s.empty = false; }
      else rows = rows.concat(generate(s, 5 + Math.floor(rnd() * 20), lastDay - 2, lastDay));       // a few new evaluations
      bump();
      const e = logRun(s, 'OK', {}, rows.filter(r => r.s === id).length === s.n ? 'Load data from the portal' : 'Refresh from the portal');
      return later({ id: id, status: 'OK', message: '', stats: { read: e.read, loaded: e.loaded, min: e.min, max: e.max } }, 2600);
    },
    apiLog() { requireAdmin(); return later(log.slice().reverse().slice(0, 80)); },
    apiDeletePreview(q) {
      requireAdmin();
      const del = matchRows(q), by = {};
      del.forEach(r => { by[r.s] = (by[r.s] || 0) + 1; });
      return later({ total: del.length, bySource: by, remaining: rows.length - del.length }, 800);
    },
    apiDelete(q) { requireAdmin(); if (q.confirm !== 'DELETE') fail('Type DELETE to confirm.'); return later(deleteRows(q, q.reason), 1500); },
    apiDeletions() {
      requireAdmin();
      return later(deletions.slice().reverse().map(d => Object.assign({}, d, { items: undefined, canRestore: d.status === 'Deleted' })));
    },
    apiRestore(batchId) {
      requireAdmin();
      const d = deletions.find(x => x.batchId === batchId) || fail('This deletion is no longer in the backup.');
      rows = rows.concat(d.items); d.status = 'Restored'; d.restoredAt = ts(); d.restoredBy = ME; bump();
      return later({ restored: d.items.length, skipped: 0 }, 1200);
    },
    apiRemoveSource(q) {
      requireAdmin();
      if (q.confirm !== 'REMOVE') fail('Type REMOVE to confirm.');
      const s = src(q.sourceId);
      const d = deleteRows({ sources: [s.id] }, `Remove source ${s.id}: ${q.reason || ''}`);
      s.active = false;
      addRequest({ type: 'Remove source', status: 'Done', account: s.account, sourceId: s.id, rows: d.rows, reason: q.reason || 'Source removed', decidedBy: ME, decidedAt: ts(),
        result: d.rows ? `Deleted ${d.rows} evaluations (backup ${d.batchId}, 7 days); rule deactivated` : 'Rule deactivated' });
      return later({ sourceId: s.id, rows: d.rows, batchId: d.batchId }, 1500);
    },

    /* add a file */
    apiInspectFile(url) {
      if (/noaccess/i.test(url)) return later({ ok: false, reason: 'access', shareWith: 'qa-portal@example.com', message: 'The portal cannot open this file yet. Share it as Viewer and check again.' }, 900);
      if (!String(url || '').trim()) return later({ ok: false, reason: 'link', message: 'This is not a Google Sheets link. Copy it from the browser address bar of the file.' }, 300);
      return later({ ok: true, fileId: 'DEMOFILE', name: `Demo QA Tracker ${YEAR}`, url: '', known: [],
        tabs: [{ name: `Jul ${YEAR}`, rows: 704 }, { name: `Aug ${YEAR}`, rows: 690 }, { name: `Sep ${YEAR}`, rows: 717 }, { name: `Oct ${YEAR}`, rows: 230 }, { name: 'Summary', rows: 14 }] }, 1100);
    },
    apiInspectTab(fileId, tab) { return later(insp(tab), 900); },
    apiTestDraft(draft) { if (!canSee(draft.account) && draft.account) fail('You are not assigned to this account.'); return later(testResult(draft), 2200); },
    apiSubmitDraft(p) {
      const d = p.draft;
      if (!canSee(d.account)) fail('You are not assigned to this account.');
      const lob = d.lob && d.lob.mode === 'fixed' ? d.lob.value : 'Voice', cty = d.country && d.country.mode === 'fixed' ? d.country.value : 'Philippines';
      if (role() === 'Admin') {
        const s = newSource(d.account, lob, cty, (p.test && p.test.evals) || 2000, p.fromRequest ? `New source mapped by the BA team (${p.fromRequest})` : 'New source added in the portal (Map it myself)');
        if (p.fromRequest) { const r = requests.find(x => x.id === p.fromRequest); if (r) Object.assign(r, { status: 'Done', sourceId: s.id, decidedBy: ME, decidedAt: ts(), result: `Source ${s.id} created` }); }
        return later({ sourceId: s.id, status: 'OK', message: '', loaded: rows.filter(r => r.s === s.id).length }, 2600);
      }
      const id = addRequest({ type: 'New source', account: d.account, rows: p.test && p.test.evals, reason: p.comment || '', by: ME,
        details: { fileName: p.fileName, confirmed: p.confirmed === true, comment: p.comment || '', test: p.test, rule: testResult(d).rule,
          lob: lob, country: cty } });
      return later({ requestId: id }, 1200);
    },
    apiQuickAdd(q) {
      if (!canSee(q.account)) fail('You are not assigned to this account.');
      const id = addRequest({ type: 'Quick add', account: q.account, reason: q.note || '', details: { fileName: `Demo QA Tracker ${YEAR}`, url: '', country: q.country, note: q.note } });
      return later({ requestId: id }, 1000);
    },
    apiRemapTest(id, ch) {
      mySource(id);
      const okRename = (ch.renames || []).some(x => x.header === 'QA Score %');
      if (!okRename) return later({ ok: false, error: '', needs: [{ tab: `Oct ${YEAR}`, specs: ['QA Score'] }], warnings: [], stats: {}, months: [] }, 1500);
      return later({ ok: true, error: '', needs: null, warnings: [], examples: {}, stats: { read: 930, loaded: 902, noWdid: 18, filtered: 0, badDate: 0, outOfRange: 0, badValue: 0, dupes: 10, already: 0, min: `${YEAR}-01-08`, max: dayStr(lastDay) },
        months: [8, 9, 10].map((m, i) => ({ month: `${YEAR}-${pad(m)}`, evals: [98, 104, 61][i], kpi: [0.842, 0.851, 0.838][i] })) }, 1800);
    },
    apiRemapSave(id, ch) {
      const s = mySource(id);
      delete s.mapping;
      s.rules.numerator = '[QA Score||QA Score %] / 100';
      s.ruleVersion = Math.floor(rnd() * 1e8).toString(16);
      rows = rows.concat(generate(s, 30, lastDay - 10, lastDay)); bump();
      const what = (ch.renames || []).map(x => `"${x.spec}" → "${x.header}"`).join(', ');
      const e = logRun(s, 'OK', {}, `Fix mapping: ${what}`);
      addRequest({ type: 'Remap', status: 'Done', account: s.account, sourceId: s.id, rows: e.loaded, reason: what, decidedBy: ME, decidedAt: ts(), result: `OK · ${e.loaded} evaluations` });
      return later({ status: 'OK', message: '', loaded: e.loaded }, 2400);
    },

    /* requests */
    apiRequestPreview(q) { mySource(q.sourceId); return later({ rows: q.type === 'Modify' ? 0 : matchRows({ sources: [q.sourceId], from: q.from, to: q.to }).length }, 800); },
    apiCreateRequest(q) {
      const s = mySource(q.sourceId);
      if (!String(q.reason || '').trim()) fail('Please add a reason.');
      const n = q.type === 'Modify' ? '' : matchRows({ sources: [s.id], from: q.from, to: q.to }).length;
      const id = addRequest({ type: q.type, account: s.account, sourceId: s.id, from: q.from || '', to: q.to || '', rows: n, reason: q.reason });
      return later({ requestId: id, rows: n }, 1000);
    },
    apiRequests() {
      const list = requests.filter(r => role() === 'Admin' || (r.type !== 'Access change' && canSee(r.account)))
        .slice().reverse().map(r => Object.assign({}, r, { actions: actionsFor(r) }));
      return later({ me: role(), list: list });
    },
    apiDecide(id, decision, note) {
      requireAdmin();
      const r = requests.find(x => x.id === id) || fail(`Request ${id} not found.`);
      if (!actionsFor(r).includes(decision)) fail(`This request is "${r.status}" and you cannot "${decision}" it.`);
      let result = '';
      if (decision === 'reject') {
        if (!String(note || '').trim()) fail('Add a reason for the requester.');
        Object.assign(r, { status: 'Rejected', decidedBy: ME, decidedAt: ts(), result: note });
        return later({ status: 'Rejected' }, 800);
      }
      if (decision === 'run' && r.type === 'Delete') {
        const d = deleteRows({ sources: [r.sourceId], from: r.from, to: r.to }, `${id}: ${r.reason}`);
        result = d.rows ? `Deleted ${d.rows} evaluations (backup ${d.batchId}, 7 days)` : 'Nothing to delete: no evaluations in that period';
      } else if (decision === 'run' && r.type === 'Replace') {
        const s = src(r.sourceId); bump(); const e = logRun(s, 'OK', {}, `Reload request ${id} by ${r.by}, approved`);
        result = `Reloaded from the file: ${e.loaded} evaluations`;
      } else if (decision === 'load') {
        const dd = r.details || {};
        const s = newSource(r.account, (dd.rule && !/^\[/.test(dd.rule.lob) && dd.rule.lob) || dd.lob || 'Voice', (dd.rule && dd.rule.country) || dd.country || 'Philippines',
          (dd.test && dd.test.evals) || 600, `New source ${id} by ${r.by}, approved`, ME);
        r.sourceId = s.id;
        result = `Source ${s.id} created: OK · ${rows.filter(x => x.s === s.id).length} evaluations`;
      } else if (decision === 'done') result = note || 'Changed by the BA team';
      else if (decision === 'keep') result = 'Confirmed: the tab has evaluations';
      else if (decision === 'exclude') {
        const s = src(r.sourceId);
        s.tabs = `${s.tabs}, -${(r.details.tabs || [])[0]}`;
        rows = rows.filter(x => !(x.s === s.id && x.d > lastDay - 9)); bump();
        const e = logRun(s, 'OK', {}, `New tab excluded (${id}): ${(r.details.tabs || []).join(', ')}`);
        result = `Excluded "${(r.details.tabs || [])[0]}" and reloaded: OK · ${e.loaded} evaluations`;
      }
      Object.assign(r, { status: 'Done', decidedBy: ME, decidedAt: ts(), result: result });
      return later({ status: 'Done', result: result }, decision === 'load' || decision === 'exclude' ? 2600 : 1400);
    },

    /* access */
    apiAccess() {
      requireAdmin();
      return later({ open: false, url: '', unlistedRole: 'No access', me: ME, allAccounts: Array.from(new Set(sources.map(s => s.account))).sort(),
        users: users.map(u => Object.assign({}, u, { accounts: u.accounts.slice() })) });
    },
    apiSaveUser(u) {
      requireAdmin();
      const email = lc(String(u.email || '').trim());
      if (!/^[^@\s,;]+@[^@\s,;]+\.[^@\s,;]+$/.test(email)) fail('Write a valid email address.');
      if (email === ME && u.role !== 'Admin') fail('You cannot remove your own Admin role. Ask another Admin.');
      if (u.role === 'User' && !u.all && !(u.accounts || []).length) fail('Choose at least one account, or All accounts.');
      const row = { email: email, name: String(u.name || '').trim(), role: u.role, all: u.role === 'Admin' || !!u.all, accounts: u.role === 'Admin' || u.all ? [] : u.accounts.slice(), alerts: !!u.alerts };
      const i = users.findIndex(x => x.email === email);
      const before = i >= 0 ? users[i] : null;
      if (i >= 0) users[i] = row; else users.push(row);
      addRequest({ type: 'Access change', status: 'Done', decidedBy: ME, decidedAt: ts(), result: 'Applied',
        reason: `${before ? 'Changed' : 'Added'} ${email}: ${row.role}, accounts ${row.all ? 'All' : row.accounts.join(', ')}` });
      return this.apiAccess();
    },
    apiRemoveUser(email) {
      requireAdmin();
      if (email === ME) fail('You cannot remove yourself. Ask another Admin.');
      const i = users.findIndex(x => x.email === email);
      if (i < 0) fail(`${email} is not in the list.`);
      const old = users.splice(i, 1)[0];
      addRequest({ type: 'Access change', status: 'Done', decidedBy: ME, decidedAt: ts(), result: 'Applied', reason: `Removed ${email} (was ${old.role})` });
      return this.apiAccess();
    },
    apiSetViewAs(v) {
      viewAs = !v || v.role === 'Admin' ? null : { role: 'User', accounts: (v.accounts || []).slice() };
      if (viewAs && !viewAs.accounts.length) { viewAs = null; fail('Choose the account(s) of the user.'); }
      return later({ role: viewAs ? 'User' : 'Admin' }, 500);
    },
  };
})();
