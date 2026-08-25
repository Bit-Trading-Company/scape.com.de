/* ═══════════════════════════════════════════════════════════════════════
   SCAPE tune panel — press T.
   Vanilla: no framework, no build step of its own, and nothing here is
   imported by the runtime. Ship it alongside scape-intro.js while you are
   still tuning, then drop the one <script> tag when you are done.
   ═══════════════════════════════════════════════════════════════════════ */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SCAPE_TUNE = factory();
})(typeof self !== 'undefined' ? self : this, function () {
'use strict';

var STORE = 'scape-tune-config';

var CLASSIC = [
  ['draw','Draw','Box, bars, then squares.'],
  ['snap','Snap','Parts cut in with no growth.'],
  ['fade','Fade','Whole mark dissolves in, staggered.'],
  ['iris','Iris','Finished mark scales up, slight overshoot.'],
  ['sweep','Sweep','All strokes draw at once, quick.'],
  ['sequence','Sequence','One part per beat, even spacing.']
];
var ASCII = [
  ['converge','Converge','Chars pop up everywhere and fly straight to their cell.'],
  ['vortex','Vortex','Everything spirals inward around the mark.'],
  ['warp','Warp','A giant twisted mark rushes in from hyperspace.'],
  ['rain','Rain','Code rain falls and freezes into the mark.'],
  ['decode','Decode','Mark is there from frame one, shaking itself legible.'],
  ['storm','Storm','Chars curve in on wide magnetic arcs.'],
  ['glitch','Glitch','Torn bands teleport in, seven hard steps.'],
  ['quantum','Quantum','Chars jitter between cells until they collapse.']
];
var BGS = [
  ['none','None','Empty black behind the mark.'],
  ['rain','Rain','Columns of code falling past the mark.'],
  ['plasma','Plasma','Crossed sine sheets, breathing.'],
  ['tunnel','Tunnel','Rushing down a twisting shaft.'],
  ['ripple','Ripple','Three drifting sources interfering.'],
  ['flow','Flow','Motes swept along a curling field.'],
  ['life','Life','Conway, seeded so it never settles.'],
  ['static','Static','Dead channel — torn bands and roll.'],
  ['shaft','Shaft','Tunnel, but the rings are the mark’s rectangle — and it rotates.'],
  ['nest','Nest','The logo inside the logo inside the logo, forever outward.'],
  ['moire','Moiré','Two rectangular lattices beating against each other.'],
  ['circuit','Circuit','Orthogonal buses with packets running the board.'],
  ['maze','Labyrinth','The mark is a maze glyph; so is the ground behind it.']
];
var PULSES = [
  ['none','None','Nothing leaves the mark.'],
  ['rect','Rect','The logo rectangle, expanding at 11:9.'],
  ['echo','Echo','The logo silhouette itself, ghosting outward.'],
  ['corners','Corners','Four brackets leaving the corners.'],
  ['cross','Cross','Beams down the mark’s own axes.'],
  ['scan','Scan','Bars sliding off the top and bottom.'],
  ['circle','Circle','The old circular shockwave.']
];
var BTNFX = [
  ['none','None','Plain buttons.'],
  ['scramble','Scramble','Label decodes character by character.'],
  ['rain','Rain','Code rain runs down inside the button.'],
  ['plasma','Plasma','Ascii plasma field, ripples from the cursor.'],
  ['glitch','Glitch','RGB split, jitter and torn character bands.'],
  ['dissolve','Dissolve','The white burns away from the edges.'],
  ['sweep','Sweep','Characters stream sideways like a ticker.'],
  ['orbit','Orbit','A comet of characters laps the border.'],
  ['ember','Ember','Burns outward from the pointer.']
];
var PART_ROWS = [
  ['ring','Outer ring'], ['barTop','Top bar'], ['barBottom','Bottom bar'],
  ['stemLeft','Left stem'], ['stemRight','Right stem'],
  ['dotLeft','Left dot'], ['dotRight','Right dot']
];
var PRESETS = [
  ['Signature', {}],
  ['Quiet', { style:'decode', duration:3.5, zoom:1.4, density:3, noise:60, trails:8,
    bloom:16, split:0, drift:0, palette:'mono', bg:'none', pulse:'rect',
    pulseEchoes:1, pulseAmt:45, btnFx:'scramble', btnIdle:0 }],
  ['Overdrive', { style:'quantum', duration:6, zoom:2.4, density:5, noise:620, trails:62,
    bloom:78, split:80, drift:140, palette:'acid', charset:'blocks', bg:'tunnel',
    bgAmt:70, bgColor:'sweep', pulse:'echo', pulseEchoes:5, pulseReach:110,
    pulseThick:2, btnFx:'glitch', btnIdle:45 }],
  ['Terminal', { style:'rain', duration:5, charset:'matrix', palette:'acid', density:4,
    noise:180, trails:46, bloom:24, split:0, drift:0, bg:'rain', bgAmt:60,
    bgColor:'fixed', bgHue:130, pulse:'scan', pulseEchoes:2, pulseColor:'fixed',
    pulseHue:130, btnFx:'rain', btnIdle:30 }],
  ['Dots last', { partsOn:true, style:'converge', duration:5,
    partDelay:{ ring:0, barTop:16, barBottom:30, stemLeft:44, stemRight:56,
                dotLeft:72, dotRight:88 } }]
];

var CSS = ''
+ '.st{position:fixed;right:16px;bottom:16px;z-index:2147483000;width:312px;'
+ 'max-width:calc(100vw - 20px);max-height:calc(100dvh - 20px);'
+ 'display:flex;flex-direction:column;'
+ 'background:rgba(10,10,10,.94);border:1px solid rgba(255,255,255,.22);'
+ 'color:rgba(255,255,255,.82);font:400 11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;'
+ 'letter-spacing:.06em;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);'
+ 'box-shadow:0 10px 40px rgba(0,0,0,.6)}'
+ '.st[hidden]{display:none}'
+ '.st *{box-sizing:border-box}'
+ '.st-hd{display:flex;align-items:center;gap:6px;padding:9px 10px;'
+ 'border-bottom:1px solid rgba(255,255,255,.14);text-transform:uppercase}'
+ '.st-hd b{color:#fff;font-weight:400;flex:1;letter-spacing:.14em}'
+ '.st-x{cursor:pointer;padding:2px 6px;color:rgba(255,255,255,.55)}'
+ '.st-x:hover{color:#fff}'
+ '.st-exp{position:relative}'
+ '.st-pop{position:absolute;right:0;top:22px;width:210px;padding:6px;'
+ 'background:#0b0b0b;border:1px solid rgba(255,255,255,.28);z-index:5;'
+ 'box-shadow:0 8px 28px rgba(0,0,0,.7)}'
+ '.st-pop[hidden]{display:none}'
+ '.st-pop .st-b{margin-bottom:4px}'
+ '.st-b{display:block;width:100%;padding:7px 8px;text-align:center;cursor:pointer;'
+ 'text-transform:uppercase;border:1px solid rgba(255,255,255,.2);background:transparent;'
+ 'color:rgba(255,255,255,.78);font:inherit;letter-spacing:.1em}'
+ '.st-b:hover{border-color:rgba(255,255,255,.6);color:#fff}'
+ '.st-b.on{background:#fff;color:#000;border-color:#fff}'
+ '.st-tabs{display:grid;grid-template-columns:repeat(6,1fr);gap:2px;padding:10px 10px 0}'
+ '.st-tabs .st-b{padding:6px 0;letter-spacing:.04em}'
+ '.st-body{flex:1;min-height:0;overflow:auto;padding:12px 10px;overscroll-behavior:contain}'
+ '.st-sec{text-transform:uppercase;color:rgba(255,255,255,.42);'
+ 'letter-spacing:.14em;margin:14px 0 8px}'
+ '.st-sec:first-child{margin-top:0}'
+ '.st-row{display:grid;gap:6px;margin-bottom:13px}'
+ '.st-row>span{display:flex;justify-content:space-between;text-transform:uppercase;'
+ 'color:rgba(255,255,255,.45)}'
+ '.st-row>span b{color:#fff;font-weight:400}'
+ '.st-row input[type=range]{width:100%;accent-color:#fff;margin:0}'
+ '.st-sel{width:100%;padding:6px;background:rgba(255,255,255,.1);color:#fff;'
+ 'border:1px solid rgba(255,255,255,.2);font:inherit}'
+ '.st-chip{display:grid;grid-template-columns:8px 1fr;gap:9px;align-items:start;'
+ 'padding:8px 9px;cursor:pointer;border:1px solid rgba(255,255,255,.14);margin-bottom:4px}'
+ '.st-chip i{width:8px;height:8px;margin-top:2px;border:1px solid rgba(255,255,255,.5);'
+ 'background:transparent}'
+ '.st-chip.on{border-color:rgba(255,255,255,.55);background:rgba(255,255,255,.12)}'
+ '.st-chip.on i{background:#fff}'
+ '.st-chip u{text-decoration:none;text-transform:uppercase;letter-spacing:.1em;'
+ 'color:rgba(255,255,255,.7);display:block}'
+ '.st-chip.on u{color:#fff}'
+ '.st-chip s{text-decoration:none;color:rgba(255,255,255,.42);letter-spacing:.02em;'
+ 'display:block;margin-top:3px}'
+ '.st-grid2{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:10px}'
+ '.st-note{padding:6px 8px;margin-bottom:10px;border:1px solid rgba(120,255,170,.4);'
+ 'background:rgba(120,255,170,.08);color:rgba(150,255,190,.95);text-transform:uppercase}'
+ '.st-warn{border-color:rgba(255,190,0,.4);background:rgba(255,190,0,.08);'
+ 'color:rgba(255,205,90,.9);text-transform:none}'
+ '';

function el(tag, cls, txt) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (txt != null) n.textContent = txt;
  return n;
}
function get(o, path) {
  var p = path.split('.'), v = o;
  for (var i = 0; i < p.length; i++) v = v == null ? v : v[p[i]];
  return v;
}
function patchFor(path, val) {
  var p = path.split('.');
  if (p.length === 1) { var a = {}; a[p[0]] = val; return a; }
  var inner = {}; inner[p[1]] = val;
  var outer = {}; outer[p[0]] = inner;
  return outer;
}

function ScapeTune(ctrl, opts) {
  this.ctrl = ctrl;
  this.opts = opts || {};
  this.syncs = [];
  this.tab = 'intro';
  this.build();
  this.restore();
}

ScapeTune.prototype.restore = function () {
  try {
    var raw = localStorage.getItem(STORE);
    if (!raw) return;
    this.ctrl.set(JSON.parse(raw));
    this.sync();
  } catch (e) { /* private mode, or stale shape — ignore */ }
};
ScapeTune.prototype.persist = function () {
  try { localStorage.setItem(STORE, JSON.stringify(this.ctrl.cfg)); } catch (e) {}
};

ScapeTune.prototype.apply = function (path, val, replay) {
  this.ctrl.set(patchFor(path, val), replay !== false);
  this.persist();
  this.sync();
};
ScapeTune.prototype.sync = function () {
  for (var i = 0; i < this.syncs.length; i++) this.syncs[i]();
};

/* ── control factories ─────────────────────────────────────────────────── */
ScapeTune.prototype.range = function (path, label, min, max, step, fmt, live) {
  var self = this, row = el('label', 'st-row');
  var head = el('span'); var name = el('i', null, label); name.style.fontStyle = 'normal';
  var val = el('b');
  head.appendChild(name); head.appendChild(val);
  var inp = document.createElement('input');
  inp.type = 'range'; inp.min = min; inp.max = max; inp.step = step;
  inp.addEventListener('input', function () {
    self.apply(path, parseFloat(inp.value), live !== false);
  });
  row.appendChild(head); row.appendChild(inp);
  this.syncs.push(function () {
    var v = get(self.ctrl.cfg, path);
    if (document.activeElement !== inp) inp.value = v;
    val.textContent = fmt ? fmt(v, self.ctrl) : String(v);
  });
  return row;
};
ScapeTune.prototype.select = function (path, label, options) {
  var self = this, row = el('label', 'st-row');
  var head = el('span'); head.appendChild(el('i', null, label));
  head.firstChild.style.fontStyle = 'normal';
  var sel = el('select', 'st-sel');
  options.forEach(function (o) {
    var op = document.createElement('option');
    op.value = o[0]; op.textContent = o[1];
    sel.appendChild(op);
  });
  sel.addEventListener('change', function () { self.apply(path, sel.value); });
  row.appendChild(head); row.appendChild(sel);
  this.syncs.push(function () { sel.value = get(self.ctrl.cfg, path); });
  return row;
};
ScapeTune.prototype.toggle = function (path, label, live) {
  var self = this, b = el('button', 'st-b', label);
  b.addEventListener('click', function () {
    self.apply(path, !get(self.ctrl.cfg, path), live !== false);
  });
  this.syncs.push(function () { b.classList.toggle('on', !!get(self.ctrl.cfg, path)); });
  return b;
};
ScapeTune.prototype.chips = function (path, list) {
  var self = this, wrap = el('div');
  list.forEach(function (o) {
    var c = el('div', 'st-chip');
    c.appendChild(el('i'));
    var body = el('div');
    body.appendChild(el('u', null, o[1]));
    body.appendChild(el('s', null, o[2]));
    c.appendChild(body);
    c.addEventListener('click', function () { self.apply(path, o[0]); });
    self.syncs.push(function () { c.classList.toggle('on', get(self.ctrl.cfg, path) === o[0]); });
    wrap.appendChild(c);
  });
  return wrap;
};
ScapeTune.prototype.button = function (label, fn) {
  var b = el('button', 'st-b', label);
  b.addEventListener('click', fn);
  return b;
};
ScapeTune.prototype.sec = function (t) { return el('div', 'st-sec', t); };

/* ── clipboard, with a fallback for insecure contexts ──────────────────── */
ScapeTune.prototype.copy = function (text, label) {
  var self = this;
  function fallback() {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta); ta.select();
      var ok = document.execCommand('copy'); ta.remove();
      return ok;
    } catch (e) { return false; }
  }
  function done(ok) { self.flash(ok ? label : 'copy blocked — use download'); }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(function () { done(true); },
      function () { done(fallback()); });
  } else done(fallback());
};
ScapeTune.prototype.flash = function (msg) {
  var n = this.noteEl;
  n.textContent = msg; n.hidden = false;
  clearTimeout(this._noteT);
  var self = this;
  this._noteT = setTimeout(function () { n.hidden = true; }, 2200);
};

ScapeTune.prototype.configFile = function () {
  return '/* SCAPE intro config — generated by the tune panel (press T).\n'
    + '   Load this before scape-intro.js, then: SCAPE.mount(\'.stage\', SCAPE_CONFIG) */\n'
    + 'window.SCAPE_CONFIG = ' + this.ctrl.serialize() + ';\n';
};
ScapeTune.prototype.download = function () {
  try {
    var blob = new Blob([this.configFile()], { type: 'text/javascript' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'scape-config.js';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    this.flash('scape-config.js downloaded');
  } catch (e) { this.flash('download blocked'); }
};

/* ── panel ─────────────────────────────────────────────────────────────── */
ScapeTune.prototype.build = function () {
  var self = this, C = this.ctrl;
  if (!document.getElementById('scape-tune-css')) {
    var st = el('style'); st.id = 'scape-tune-css'; st.textContent = CSS;
    document.head.appendChild(st);
  }

  var root = this.root = el('div', 'st');
  root.setAttribute('data-scape-ui', '');
  root.hidden = true;

  /* header + export popout, reachable from every tab */
  var hd = el('div', 'st-hd');
  hd.appendChild(el('b', null, 'Tune'));
  var expWrap = el('div', 'st-exp');
  var expBtn = el('button', 'st-b', 'Export ▾');
  expBtn.style.width = 'auto'; expBtn.style.padding = '4px 8px';
  var pop = el('div', 'st-pop'); pop.hidden = true;
  expBtn.addEventListener('click', function (e) { e.stopPropagation(); pop.hidden = !pop.hidden; });
  document.addEventListener('click', function (e) {
    if (!pop.hidden && !expWrap.contains(e.target)) pop.hidden = true;
  });
  pop.appendChild(this.button('⧉ Copy config file', function () {
    self.copy(self.configFile(), 'config file copied'); pop.hidden = true;
  }));
  pop.appendChild(this.button('⧉ Copy mount() call', function () {
    self.copy("SCAPE.mount('.stage', " + C.serialize() + ');\n', 'mount call copied'); pop.hidden = true;
  }));
  pop.appendChild(this.button('⧉ Copy JSON', function () {
    self.copy(JSON.stringify(C.cfg, null, 2), 'json copied'); pop.hidden = true;
  }));
  pop.appendChild(this.button('⬇ Download scape-config.js', function () {
    self.download(); pop.hidden = true;
  }));
  pop.appendChild(this.button('Reset to defaults', function () {
    try { localStorage.removeItem(STORE); } catch (e) {}
    C.set(C.constructor.merge({}));
    self.sync(); self.flash('reset'); pop.hidden = true;
  }));
  expWrap.appendChild(expBtn); expWrap.appendChild(pop);
  hd.appendChild(expWrap);
  var x = el('span', 'st-x', '×');
  x.addEventListener('click', function () { self.hide(); });
  hd.appendChild(x);
  root.appendChild(hd);

  var tabs = el('div', 'st-tabs');
  var body = el('div', 'st-body');
  this.noteEl = el('div', 'st-note'); this.noteEl.hidden = true;

  var panes = {};
  [['intro','Intro'],['ascii','Ascii'],['field','Field'],['parts','Parts'],
   ['buttons','Btns'],['popups','Pop']]
    .forEach(function (t) {
      var b = el('button', 'st-b', t[1]);
      b.addEventListener('click', function () { self.tab = t[0]; self.showTab(); });
      tabs.appendChild(b);
      panes[t[0]] = el('div');
      self.syncs.push(function () { b.classList.toggle('on', self.tab === t[0]); });
    });
  this.panes = panes;
  root.appendChild(tabs);
  body.appendChild(this.noteEl);
  for (var k in panes) body.appendChild(panes[k]);
  root.appendChild(body);
  document.body.appendChild(root);

  this.fillIntro(panes.intro);
  this.fillAscii(panes.ascii);
  this.fillField(panes.field);
  this.fillParts(panes.parts);
  this.fillButtons(panes.buttons);
  this.fillPopups(panes.popups);
  this.showTab();
  this.sync();
};

ScapeTune.prototype.showTab = function () {
  for (var k in this.panes) this.panes[k].hidden = (k !== this.tab);
  this.sync();
};

ScapeTune.prototype.fillIntro = function (p) {
  var self = this, C = this.ctrl;
  var pre = el('div', 'st-grid2');
  PRESETS.forEach(function (o) {
    pre.appendChild(self.button(o[0], function () {
      C.set(C.constructor.merge(o[1]));
      self.persist(); self.sync();
    }));
  });
  p.appendChild(this.sec('Presets')); p.appendChild(pre);
  p.appendChild(this.sec('Classic — geometry'));
  p.appendChild(this.chips('style', CLASSIC));
  p.appendChild(this.sec('Ascii — the mark assembles itself'));
  p.appendChild(this.chips('style', ASCII));
  p.appendChild(this.sec('Timing'));
  p.appendChild(this.range('duration', 'Duration', 1, 10, .25, function (v) { return v + 's'; }));
  p.appendChild(this.range('lift', 'Lift at end', 0, 80, 2, function (v) { return v + 'px'; }));
  p.appendChild(this.range('reveal', 'UI reveal', 40, 95, 1, function (v) { return v + '%'; }));
  p.appendChild(this.select('ease', 'Easing', [
    ['ease-in-out','ease-in-out'], ['linear','linear'], ['ease-out','ease-out'],
    ['cubic-bezier(.16,1,.3,1)','expo out'], ['cubic-bezier(.34,1.56,.64,1)','overshoot'],
    ['steps(6,end)','steps']]));
  var g = el('div', 'st-grid2');
  g.appendChild(this.toggle('loop', 'Loop'));
  g.appendChild(this.toggle('skippable', 'Skippable'));
  p.appendChild(g);
  p.appendChild(this.button('↻ Replay', function () { C.replay(); }));
};

ScapeTune.prototype.fillAscii = function (p) {
  var C = this.ctrl;
  p.appendChild(this.select('charset', 'Character set', [
    ['blocks','blocks — █▓▒░'], ['ascii','ascii — .:-=+*#%@'],
    ['wire','wire — /\\|-_+*<>[]'], ['binary','binary — 01'],
    ['matrix','matrix — katakana'], ['runes','runes — ◈◉◇'],
    ['scape','scape — S C A P E']]));
  p.appendChild(this.select('palette', 'Palette (all fade to logo white)', [
    ['spectrum','spectrum — full hue wheel'], ['acid','acid — green / cyan / magenta'],
    ['ember','ember — red / orange / gold'], ['ice','ice — cyan / blue / violet'],
    ['vapor','vapor — pink / teal'], ['mono','mono — greyscale']]));
  p.appendChild(this.range('zoom', 'Mark size', 1, 3, .1, function (v, c) {
    return c.effZoom().toFixed(1) + '× (' + Math.round(176 * c.effZoom()) + 'px)'; }));
  p.appendChild(this.range('density', 'Grid density', 1, 8, 1, function (v, c) {
    return (11 * v) + '×' + (9 * v) + ' (' + (16 * c.effZoom() / v).toFixed(1) + 'px)'; }));
  p.appendChild(this.range('spread', 'Scatter', 2, 40, 1, function (v) { return v + ' cells'; }));
  p.appendChild(this.range('stagger', 'Stagger', 0, 90, 1, function (v) { return v + '%'; }));
  p.appendChild(this.range('churn', 'Churn', 0, 60, 1, function (v) { return (2 + v) + '/s'; }));
  p.appendChild(this.range('turns', 'Spin / turns', 0, 4, .25, null));
  p.appendChild(this.range('noise', 'Loose chars', 0, 800, 20, null));
  p.appendChild(this.sec('Ignite — ascii becomes the logo'));
  p.appendChild(this.select('igniteStyle', 'Fill pattern', [
    ['bloom','bloom — cells light at random'], ['wave','wave — outward from centre'],
    ['scan','scan — top to bottom'], ['flash','flash — all at once']]));
  p.appendChild(this.range('igniteLen', 'Ignite length', 6, 45, 1, function (v) { return v + '%'; }));
  p.appendChild(this.range('afterglow', 'Afterglow', 0, 140, 2, function (v) { return v + '%'; }));
  p.appendChild(this.toggle('solidify', 'Ignite'));
  p.appendChild(this.sec('Trip'));
  p.appendChild(this.range('trails', 'Trails', 0, 94, 2, function (v) { return v + '%'; }));
  p.appendChild(this.range('bloom', 'Bloom', 0, 100, 2, function (v) { return v + '%'; }));
  p.appendChild(this.range('split', 'RGB split', 0, 100, 2, function (v) { return v + '%'; }));
  p.appendChild(this.range('drift', 'Hue drift', 0, 360, 5, function (v) { return v + '°/s'; }));
};

ScapeTune.prototype.fillField = function (p) {
  p.appendChild(this.sec('Background'));
  p.appendChild(this.chips('bg', BGS));
  p.appendChild(this.range('bgAmt', 'Amount', 0, 100, 2, function (v) { return v + '%'; }));
  p.appendChild(this.range('bgSpeed', 'Speed', 10, 320, 5, function (v) { return (v / 100).toFixed(2) + '×'; }));
  p.appendChild(this.range('bgScale', 'Coarseness', 1, 8, 1, function (v, c) {
    var eff = (c.engine && c.engine.bgStep) || v;
    return eff + (eff > v ? '× auto' : '×'); }));
  p.appendChild(this.select('bgColor', 'Colour', [
    ['palette','palette — follows logo palette'], ['fixed','fixed — one hue'],
    ['sweep','sweep — hue tracks intensity'], ['space','space — hue tracks position'],
    ['noise','noise — a hue per cell'], ['mono','mono — greyscale']]));
  p.appendChild(this.range('bgHue', 'Hue', 0, 359, 1, function (v) { return v + '°'; }));
  p.appendChild(this.toggle('bgPersist', 'Keep running after intro'));
  p.appendChild(this.sec('Pulse — what leaves the mark'));
  p.appendChild(this.chips('pulse', PULSES));
  p.appendChild(this.range('pulseEchoes', 'Echoes', 1, 6, 1, null));
  p.appendChild(this.range('pulseReach', 'Reach', 10, 150, 5, function (v) { return v + '%'; }));
  p.appendChild(this.range('pulseThick', 'Thickness', 1, 5, 1, function (v) { return v + ' cell'; }));
  p.appendChild(this.range('pulseAmt', 'Intensity', 0, 140, 5, function (v) { return v + '%'; }));
  p.appendChild(this.select('pulseColor', 'Colour', [
    ['palette','palette'], ['fixed','fixed — one hue'],
    ['space','space — hue tracks position'], ['mono','mono — white']]));
  p.appendChild(this.range('pulseHue', 'Hue', 0, 359, 1, function (v) { return v + '°'; }));
};

ScapeTune.prototype.fillParts = function (p) {
  var self = this, C = this.ctrl;
  var w = el('div', 'st-note st-warn');
  w.textContent = 'Each piece of the mark starts at its own point in the converge '
    + 'window. Lower = earlier. Only applies to the ascii styles.';
  p.appendChild(w);
  p.appendChild(this.toggle('partsOn', 'Draw parts separately'));
  p.appendChild(this.sec('Start time'));
  PART_ROWS.forEach(function (r) {
    p.appendChild(self.range('partDelay.' + r[0], r[1], 0, 100, 1,
      function (v) { return v + '%'; }));
  });
  p.appendChild(this.button('Dots last, one after the other', function () {
    C.set({ partsOn: true, partDelay: { ring: 0, barTop: 16, barBottom: 30,
      stemLeft: 44, stemRight: 56, dotLeft: 72, dotRight: 88 } });
    self.persist(); self.sync();
  }));
  p.appendChild(this.button('Even spread', function () {
    C.set({ partsOn: true, partDelay: { ring: 0, barTop: 12, barBottom: 24,
      stemLeft: 36, stemRight: 48, dotLeft: 60, dotRight: 72 } });
    self.persist(); self.sync();
  }));
  p.appendChild(this.button('↻ Replay', function () { C.replay(); }));
};

ScapeTune.prototype.fillPopups = function (p) {
  var self = this, C = this.ctrl;
  var w = el('div', 'st-note st-warn');
  w.textContent = 'Clicking CREATE or EXPLORE opens the popup. It is drawn on '
    + 'the same lattice as the mark, and the background field steps around it.';
  p.appendChild(w);
  p.appendChild(this.toggle('popupOn', 'Popups on click', false));
  p.appendChild(this.range('popupW', 'Width', 24, 72, 1, function (v) { return v + ' cols'; }, false));
  p.appendChild(this.range('popupScale', 'Text size', .5, 2.5, .05, function (v) {
    return v.toFixed(2) + '×'; }, false));
  p.appendChild(this.range('popupX', 'From left', 0, 400, 4, function (v) { return v + 'px'; }, false));
  p.appendChild(this.range('popupY', 'From top', 0, 400, 4, function (v) { return v + 'px'; }, false));
  p.appendChild(this.sec('Arrival'));
  p.appendChild(this.range('popupDur', 'Duration', .15, 3, .05, function (v) {
    return v.toFixed(2) + 's'; }, false));
  p.appendChild(this.range('popupFlash', 'Colour flash', .02, .5, .01, function (v) {
    return Math.round(v * 100) + '%'; }, false));
  p.appendChild(this.range('popupStagger', 'Stagger', 0, .98, .02, function (v) {
    return Math.round(v * 100) + '%'; }, false));
  p.appendChild(this.button('Open popup', function () { C.openPopup('access'); }));
  p.appendChild(this.button('Close popup', function () { C.closePopup(); }));
};

ScapeTune.prototype.fillButtons = function (p) {
  p.appendChild(this.sec('Effect'));
  p.appendChild(this.chips('btnFx', BTNFX));
  p.appendChild(this.sec('Feel'));
  p.appendChild(this.range('btnInt', 'Intensity', 0, 100, 2, function (v) { return v + '%'; }, false));
  p.appendChild(this.range('btnSpeed', 'Speed', .2, 4, .1, function (v) { return v.toFixed(1) + '×'; }, false));
  p.appendChild(this.range('btnIdle', 'Idle level', 0, 100, 2, function (v) {
    return v ? v + '%' : 'hover only'; }, false));
  p.appendChild(this.range('btnCharPx', 'Character size', 3, 16, 1, function (v) { return v + 'px'; }, false));
  p.appendChild(this.sec('Response'));
  p.appendChild(this.range('btnAttack', 'Fill in', .02, 1, .01, function (v) {
    return Math.round(v * 1000) + 'ms'; }, false));
  p.appendChild(this.range('btnRelease', 'Fall off', .02, 1.5, .01, function (v) {
    return Math.round(v * 1000) + 'ms'; }, false));
  p.appendChild(this.select('btnInvertMode', 'Invert style', [
    ['snap','snap — flips outright'],
    ['wipe','wipe — hard edge sweeps across'],
    ['none','none — stays white']]));
  var g = el('div', 'st-grid2');
  g.appendChild(this.toggle('invert', 'Invert on hover', false));
  g.appendChild(this.toggle('btnMono', 'Mono label', false));
  p.appendChild(g);
  var self = this;
  p.appendChild(this.button('⚡ Trigger once', function () { self.ctrl.pulseButtons(); }));
};

ScapeTune.prototype.show = function () { this.root.hidden = false; };
ScapeTune.prototype.hide = function () { this.root.hidden = true; };
ScapeTune.prototype.toggleVis = function () {
  if (this.root.hidden) this.show(); else this.hide();
};

/* ── auto-attach: press T anywhere ─────────────────────────────────────── */
var panel = null;
function keyHandler(e) {
  if (e.key !== 't' && e.key !== 'T') return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  var a = document.activeElement;
  if (a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable)) return;
  var ctrl = (window.SCAPE && window.SCAPE._last) || null;
  if (!ctrl) return;
  if (!panel) panel = new ScapeTune(ctrl);
  panel.toggleVis();
  e.preventDefault();
}
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', keyHandler);
}

return {
  attach: function (ctrl) { panel = new ScapeTune(ctrl); return panel; },
  get panel() { return panel; },
  ScapeTune: ScapeTune
};
});
