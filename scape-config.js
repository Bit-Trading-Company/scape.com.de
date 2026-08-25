/* SCAPE intro config.
   Tune the page (press T), then Export -> Copy config file and paste the
   result over this whole file. Anything omitted falls back to SCAPE.defaults. */
window.SCAPE_CONFIG = {
  /* timing */
  style: 'decode', duration: 4.5, lift: 38, reveal: 86, ease: 'ease-in-out',
  /* mark */
  charset: 'ascii', palette: 'spectrum', zoom: 2, density: 4,
  spread: 16, stagger: 42, churn: 22, turns: 1.5, noise: 240,
  /* ignite */
  solidify: true, igniteStyle: 'bloom', igniteLen: 24, afterglow: 55,
  /* trip */
  trails: 18, bloom: 30, split: 34, drift: 40,
  /* background field */
  bg: 'flow', bgAmt: 34, bgSpeed: 100, bgScale: 2,
  bgColor: 'palette', bgHue: 200, bgPersist: false,
  /* pulse */
  pulse: 'rect', pulseEchoes: 3, pulseReach: 55, pulseThick: 1,
  pulseAmt: 80, pulseColor: 'palette', pulseHue: 200,
  /* parts — draw the pieces of the mark at different rates */
  partsOn: false,
  partDelay: { ring: 0, barTop: 14, barBottom: 22, stemLeft: 34,
               stemRight: 44, dotLeft: 62, dotRight: 78 },
  /* buttons */
  btnFx: 'scramble', btnInt: 80, btnSpeed: 1, btnIdle: 22, btnCharPx: 6,
  invert: true, btnMono: true, btnInvertMode: 'snap',
  btnAttack: 0.09, btnRelease: 0.22,
  /* popups — opened by the buttons, drawn on the intro's own grid */
  popupOn: true, popupW: 40, popupX: 28, popupY: 76, popupScale: 1,
  popupDur: 0.95, popupFlash: 0.11, popupStagger: 0.72,
  /* behaviour */
  loop: false, skippable: true, pauseWhenHidden: true,
  reducedMotion: 'skip', once: false
};
