const fs = require('fs');
const out = process.argv[2];

const icons = {
  phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  web: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
};
const row = (i, html, cls = '') => `<li class="${cls}">${icons[i]}<span>${html}</span></li>`;
const phones = row('phone', '<b>+91 79041 53087</b><br>+91 73394 56476', 'ph');
const mail = row('mail', 'niyosofttechnologies@gmail.com', 'ml');
const web = row('web', 'niyosoft.in', 'wb');
const addr = row('pin', '2/281A, Selvaganapathy Nagar, Unjavelampatti,<br>Pollachi, Coimbatore, Tamil Nadu 642003', 'ad addr');
const contacts = (extra = '') => `<ul class="contacts ${extra}">${phones}${mail}${web}${addr}</ul>`;
const lockup = (u, cls = '') =>
  `<div class="lk ${cls}" style="--u:${u}mm"><img src="assets/logo-mark.png" alt=""><div class="t"><div class="n">NIYOSOFT</div><div class="s">TECHNOLOGIES</div></div></div>`;
const person = (cls = '') =>
  `<div class="person ${cls}"><h1>Ashok Thomas</h1><div class="role">Founder</div><div class="co">Niyosoft Technologies</div></div>`;
const qr = (cls = '') => `<div class="qr ${cls}"><img src="assets/qr.svg" alt="QR code for niyosoft.in"><span>SCAN TO VISIT</span></div>`;

const options = [
  {
    id: 'a', title: 'Option A: Classic', note: 'Matches the website: paper background, original lockup, blue base bar.',
    front: `<div class="card a-front" id="a-front">${lockup(15)}<div class="tag">Software, apps &amp; IT services &nbsp;|&nbsp; Pollachi, Coimbatore</div><div class="bar"></div></div>`,
    back: `<div class="card a-back" id="a-back"><div class="stripe"></div><div class="col">${person()}${contacts()}</div>${qr('r')}</div>`,
  },
  {
    id: 'b', title: 'Option B: Split', note: 'White logo side with a blue services panel. Back has a gradient name band.',
    front: `<div class="card b-front" id="b-front"><div class="logoside">${lockup(12)}</div><div class="panel"><i class="f f1"></i><i class="f f2"></i><i class="f f3"></i><div class="ptxt"><div class="k">WHAT WE BUILD</div><ul><li>Mobile Apps</li><li>Websites</li><li>Ordering &amp; Payments</li><li>IT Support &amp; Setup</li></ul></div></div></div>`,
    back: `<div class="card b-back" id="b-back"><div class="band">${person()}<div class="chip"><img src="assets/logo-mark.png" alt=""></div></div><div class="body">${contacts()}</div>${qr('r')}</div>`,
  },
  {
    id: 'c', title: 'Option C: Horizontal', note: 'Horizontal lockup on white, navy back with a white logo chip.',
    front: `<div class="card c-front" id="c-front"><img class="wm" src="assets/logo-mark.png" alt="">${lockup(15, 'h')}<div class="tag">Transforming Enterprises through Digital Innovation</div><div class="bar"></div></div>`,
    back: `<div class="card c-back" id="c-back"><div class="col">${person()}${contacts()}</div><div class="chip"><img src="assets/logo-mark.png" alt=""></div>${qr('r')}</div>`,
  },
  {
    id: 'd', title: 'Option D: Bold panel', note: 'Full blue front with the original lockup on a white panel. Centered back.',
    front: `<div class="card d-front" id="d-front"><i class="f f1"></i><i class="f f2"></i><i class="f f3"></i><div class="plate">${lockup(14)}</div></div>`,
    back: `<div class="card d-back" id="d-back">${person()}${qr('tr')}<div class="rule"></div><ul class="contacts grid">${phones}${web}${mail}${addr}</ul><div class="bar"></div></div>`,
  },
];

const css = `
  @font-face { font-family: "Montserrat"; src: url("assets/montserrat-latin-wght-normal.woff2") format("woff2"); font-weight: 100 900; }
  @font-face { font-family: "Inter"; src: url("assets/inter-latin-wght-normal.woff2") format("woff2"); font-weight: 100 900; }
  :root { --ink:#0a1240; --navy:#0b1a5c; --brand:#0a4fd6; --sky:#18c8e6; --teal:#0a86ad; --teal-deep:#0779a6; --slate:#4a5378; --paper:#f3f1ec; }
  @page { size: 90mm 50mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #d9d6cf; }
  body { font-family: "Inter", sans-serif; -webkit-font-smoothing: antialiased; color: var(--ink); }
  .sheet { padding: 10mm 8mm; display: flex; flex-direction: column; gap: 12mm; align-items: center; }
  .opt h2 { font-family: "Montserrat", sans-serif; font-size: 15px; color: var(--navy); }
  .opt p { font-size: 12px; color: var(--slate); margin: 2px 0 10px; }
  .pair { display: flex; gap: 8mm; flex-wrap: wrap; }
  .card { width: 90mm; height: 50mm; position: relative; overflow: hidden; box-shadow: 0 1mm 4mm rgb(10 18 64 / .25); break-after: page; }
  @media print {
    html, body { background: none; }
    .sheet { display: block; padding: 0; }
    .opt h2, .opt p { display: none; }
    .pair { display: block; }
    .card { box-shadow: none; }
  }

  /* original lockup: same proportions as the site Logo component */
  .lk { display: flex; flex-direction: column; align-items: center; line-height: 1; }
  .lk img { height: var(--u); width: auto; display: block; }
  .lk .t { display: flex; flex-direction: column; align-items: center; margin-top: calc(var(--u) * .14); }
  .lk .n { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: calc(var(--u) * .486); letter-spacing: -0.025em; line-height: 1.05;
    background-image: linear-gradient(90deg, #0a4fd6, #18c8e6); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .lk .s { font-family: "Montserrat", sans-serif; font-weight: 600; font-size: calc(var(--u) * .19); letter-spacing: .38em; padding-left: .38em; margin-top: calc(var(--u) * .107); color: rgb(11 26 92 / .8); }
  .lk.h { flex-direction: row; gap: calc(var(--u) * .3); }
  .lk.h .t { margin-top: 0; align-items: flex-start; }
  .lk.h .s { padding-left: .05em; }

  /* shared contact + person blocks */
  .person h1 { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 4.6mm; line-height: 1.1; color: var(--navy); }
  .person .role { font-family: "Montserrat", sans-serif; font-weight: 600; font-size: 2.3mm; letter-spacing: .16em; text-transform: uppercase; color: var(--teal); margin-top: 1mm; }
  .person .co { font-size: 2.3mm; color: var(--slate); margin-top: .6mm; }
  .contacts { list-style: none; display: grid; row-gap: 1.35mm; font-size: 2.55mm; line-height: 1.25; }
  .contacts li { display: grid; grid-template-columns: 3.4mm 1fr; align-items: start; }
  .contacts svg { width: 2.5mm; height: 2.5mm; margin-top: .15mm; stroke: var(--brand); fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .contacts b { font-weight: 600; }
  .contacts .addr { font-size: 2.3mm; color: var(--slate); }
  .qr { position: absolute; display: flex; flex-direction: column; align-items: center; }
  .qr img { width: 17mm; height: 17mm; display: block; }
  .qr span { font-size: 1.9mm; letter-spacing: .08em; color: var(--slate); margin-top: 1mm; }
  .qr.r { right: 6mm; bottom: 4.5mm; }

  /* A */
  .a-front { background: var(--paper); display: flex; align-items: center; justify-content: center; padding-bottom: 7mm; }
  .a-front .tag { position: absolute; bottom: 5mm; left: 0; right: 0; text-align: center; font-size: 2.3mm; color: var(--slate); }
  .a-front .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 1.8mm; background: var(--brand); }
  .a-back { background: #fff; }
  .a-back .stripe { position: absolute; left: 0; top: 0; bottom: 0; width: 1.4mm; background: linear-gradient(180deg, var(--brand), var(--sky)); }
  .a-back .col { position: absolute; left: 6.5mm; top: 5.5mm; }
  .a-back .contacts { margin-top: 3.4mm; }

  /* B */
  .b-front { background: #fff; }
  .b-front .logoside { position: absolute; left: 0; top: 0; bottom: 0; width: 46mm; display: flex; align-items: center; justify-content: center; }
  .b-front .panel { position: absolute; left: 44mm; top: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #0a4fd6, #0779a6); clip-path: polygon(8mm 0, 100% 0, 100% 100%, 0 100%); overflow: hidden; }
  .f { position: absolute; display: block; }
  .b-front .f1 { left: 4mm; top: 0; width: 22mm; height: 30mm; background: rgb(255 255 255 / .06); clip-path: polygon(0 0, 100% 0, 40% 100%); }
  .b-front .f2 { right: 0; top: 0; width: 20mm; height: 22mm; background: rgb(24 200 230 / .28); clip-path: polygon(100% 0, 100% 100%, 0 0); }
  .b-front .f3 { right: 0; bottom: 0; width: 28mm; height: 24mm; background: rgb(10 18 64 / .18); clip-path: polygon(100% 0, 100% 100%, 0 100%); }
  .b-front .ptxt { position: absolute; left: 14mm; right: 5mm; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; color: #fff; }
  .b-front .k { font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 1.9mm; letter-spacing: .22em; color: rgb(255 255 255 / .75); margin-bottom: 2mm; }
  .b-front ul { list-style: none; font-size: 2.6mm; font-weight: 500; }
  .b-front li { padding: 1.1mm 0; border-top: .2mm solid rgb(255 255 255 / .28); }
  .b-back { background: #fff; }
  .b-back .band { position: absolute; left: 0; right: 0; top: 0; height: 16mm; background: linear-gradient(100deg, #0a4fd6, #0779a6); padding: 3.6mm 6mm; }
  .b-back .band .person h1 { color: #fff; font-size: 4.4mm; }
  .b-back .band .person .role { color: #9ff0ff; }
  .b-back .band .person .co { display: none; }
  .b-back .chip { position: absolute; right: 5mm; top: 3mm; width: 10mm; height: 10mm; border-radius: 2mm; background: #fff; display: flex; align-items: center; justify-content: center; }
  .b-back .chip img { height: 7mm; width: auto; }
  .b-back .body { position: absolute; left: 6mm; top: 19.5mm; }

  /* C */
  .c-front { background: #fff; display: flex; align-items: center; justify-content: center; padding-bottom: 6mm; }
  .c-front .wm { position: absolute; right: -9mm; bottom: -11mm; height: 44mm; width: auto; opacity: .07; }
  .c-front .tag { position: absolute; bottom: 5mm; left: 0; right: 0; text-align: center; font-size: 2.3mm; color: var(--slate); }
  .c-front .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 1.5mm; background: linear-gradient(90deg, var(--brand), var(--sky)); }
  .c-back { background: var(--ink); color: #fff; }
  .c-back .col { position: absolute; left: 6.5mm; top: 5.5mm; }
  .c-back .person h1 { color: #fff; }
  .c-back .person .role { color: var(--sky); }
  .c-back .person .co { color: rgb(255 255 255 / .7); }
  .c-back .contacts { margin-top: 3.4mm; }
  .c-back .contacts svg { stroke: var(--sky); }
  .c-back .contacts .addr { color: rgb(255 255 255 / .7); }
  .c-back .chip { position: absolute; right: 5mm; top: 4.5mm; width: 11mm; height: 11mm; border-radius: 2.2mm; background: #fff; display: flex; align-items: center; justify-content: center; }
  .c-back .chip img { height: 7.6mm; width: auto; }
  .c-back .qr.r { background: #fff; padding: 1.2mm 1.2mm .6mm; border-radius: 1.6mm; right: 5mm; bottom: 4mm; }
  .c-back .qr img { width: 15mm; height: 15mm; }
  .c-back .qr span { color: var(--slate); font-size: 1.6mm; }

  /* D */
  .d-front { background: linear-gradient(135deg, #0b1a5c 0%, #0a4fd6 60%, #0779a6 100%); display: flex; align-items: center; justify-content: center; }
  .d-front .f1 { left: 0; top: 0; width: 34mm; height: 30mm; background: rgb(255 255 255 / .07); clip-path: polygon(0 0, 100% 0, 0 100%); }
  .d-front .f2 { right: 0; top: 0; width: 30mm; height: 26mm; background: rgb(24 200 230 / .35); clip-path: polygon(100% 0, 100% 100%, 0 0); }
  .d-front .f3 { right: 0; bottom: 0; width: 40mm; height: 28mm; background: rgb(10 18 64 / .3); clip-path: polygon(100% 0, 100% 100%, 0 100%); }
  .d-front .plate { position: relative; width: 66mm; height: 33mm; background: #fff; border-radius: 2.4mm; display: flex; align-items: center; justify-content: center; box-shadow: 0 1mm 3mm rgb(10 18 64 / .35); }
  .d-back { background: var(--paper); padding: 5mm 6mm 0; }
  .d-back .qr.tr { right: 5.5mm; top: 4mm; }
  .d-back .qr.tr img { width: 13mm; height: 13mm; }
  .d-back .qr.tr span { display: none; }
  .d-back .rule { height: .35mm; background: linear-gradient(90deg, var(--brand), var(--sky)); margin: 3.2mm 0 2.8mm; width: 100%; }
  .d-back .rule { margin-top: 4.6mm; }
  .d-back .grid { grid-template-columns: 1fr 1fr; column-gap: 3mm; row-gap: 1.7mm; }
  .d-back .grid .ml, .d-back .grid .ad { grid-column: 1 / -1; }
  .d-back .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 1.5mm; background: linear-gradient(90deg, var(--brand), var(--sky)); }
`;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Niyosoft Technologies visiting card options</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>${css}</style></head>
<body><main class="sheet">
${options.map(o => `<section class="opt" id="opt-${o.id}"><h2>${o.title}</h2><p>${o.note}</p><div class="pair">${o.front}${o.back}</div></section>`).join('\n')}
</main></body></html>
`;
fs.writeFileSync(out, html);
// Usage: node generate-options.js options.html
