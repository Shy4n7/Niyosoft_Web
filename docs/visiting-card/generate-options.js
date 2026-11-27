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

const mosaicColors = ['#0b1a5c','#0a2a8f','#0a2a8f','#0a3aa6','#0a3aa6','#0a4fd6','#0a2a8f','#0a3aa6','#0a4fd6','#0b3fb8','#0a4fd6','#0779a6','#0a3aa6','#0a4fd6','#0a86ad','#0779a6','#18c8e6','#0a86ad'];
const V = {A:[0,0],B:[30,0],C:[60,0],D:[90,0],E:[0,18],F:[30,14],G:[60,20],H:[90,16],I:[0,36],J:[32,32],K:[62,38],L:[90,34],M:[0,50],N:[34,50],O:[64,50],P:[90,50]};
const tris = ['ABE','BFE','BCF','CGF','CDG','DHG','EFI','FJI','FGJ','GKJ','GHK','HLK','IJM','JNM','JKN','KON','KLO','LPO'];
const mosaic = `<svg class="mosaic" viewBox="0 0 90 50" preserveAspectRatio="none" aria-hidden="true">${tris.map((t, i) => `<polygon points="${[...t].map(c => V[c].join(',')).join(' ')}" fill="${mosaicColors[i]}" stroke="${mosaicColors[i]}" stroke-width=".15"/>`).join('')}</svg>`;
const corner = `<svg class="corner" viewBox="0 0 30 22" aria-hidden="true"><polygon points="30,0 30,22 8,0" fill="#0a4fd6"/><polygon points="30,0 30,12 18,0" fill="#18c8e6"/><polygon points="14,0 30,0 22,0" fill="#0b1a5c"/><polygon points="30,22 30,8 12,22" fill="#0b1a5c" opacity=".9"/></svg>`;
const wave = `<svg class="wave" viewBox="0 0 90 50" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="wg" x1="0" x2="1"><stop offset="0" stop-color="#0a4fd6"/><stop offset="1" stop-color="#18c8e6"/></linearGradient></defs><path d="M0 43 C 20 36, 40 50, 60 43 S 84 38, 90 41 V50 H0 Z" fill="#0b1a5c" opacity=".22"/><path d="M0 38 C 18 30, 36 46, 56 38 S 82 30, 90 34 V50 H0 Z" fill="url(#wg)"/></svg>`;
const waveSmall = `<svg class="wave" viewBox="0 0 90 12" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="wg2" x1="0" x2="1"><stop offset="0" stop-color="#0a4fd6"/><stop offset="1" stop-color="#18c8e6"/></linearGradient></defs><path d="M0 4 C 18 0, 34 9, 56 4 S 82 0, 90 3 V12 H0 Z" fill="url(#wg2)"/></svg>`;
const dots = '<span class="dots"><i></i><i></i><i></i></span>';
const codeLines = `<span class="k">const</span> <span class="p">founder</span> <span class="c">=</span> <span class="c">{</span>
  <span class="p">name</span><span class="c">:</span>  <span class="s">"Ashok Thomas"</span><span class="c">,</span>
  <span class="p">role</span><span class="c">:</span>  <span class="s">"Founder"</span><span class="c">,</span>
  <span class="p">phone</span><span class="c">:</span> <span class="s">"+91 79041 53087"</span><span class="c">,</span>
  <span class="p">alt</span><span class="c">:</span>   <span class="s">"+91 73394 56476"</span><span class="c">,</span>
  <span class="p">email</span><span class="c">:</span> <span class="s">"niyosofttechnologies@gmail.com"</span><span class="c">,</span>
  <span class="p">web</span><span class="c">:</span>   <span class="s">"niyosoft.in"</span><span class="c">,</span>
  <span class="p">city</span><span class="c">:</span>  <span class="s">"Pollachi, Coimbatore, TN 642003"</span><span class="c">,</span>
<span class="c">}</span><span class="c">;</span>`;
const bgCode = `<span>const growth = await build(apps, websites);</span>
<span>deploy({ payments: true, support: "24x7" });</span>
<span>if (business.ready) digitalise(business);</span>
<span>export default innovation;</span>`;

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
  {
    id: 'e', title: 'Option E: First design, original logo', note: 'The first dark blue front with grid and glow, now carrying the original lockup on a white plate. Back is the first paper design.',
    front: `<div class="card e-front" id="e-front"><div class="plate">${lockup(13)}</div><div class="tag">Transforming Enterprises through Digital Innovation</div><div class="bar"></div></div>`,
    back: `<div class="card a-back e-back" id="e-back"><div class="stripe"></div><div class="col">${person()}${contacts()}</div>${qr('r')}</div>`,
  },
  {
    id: 'f', title: 'Option F: Mosaic', note: 'A faceted blue mosaic, echoing the N, with a white ribbon carrying the horizontal lockup.',
    front: `<div class="card f-front" id="f-front">${mosaic}<svg class="ribbon" viewBox="0 0 90 50" preserveAspectRatio="none" aria-hidden="true"><polygon points="0,14 90,9 90,36 0,41" fill="#fff"/></svg><div class="lkwrap">${lockup(12, 'h')}</div></div>`,
    back: `<div class="card f-back" id="f-back">${corner}<div class="col">${person()}${contacts()}</div>${qr('r')}</div>`,
  },
  {
    id: 'g', title: 'Option G: Giant N', note: 'The original N mark at large scale, bleeding off the card. Gradient back.',
    front: `<div class="card g-front" id="g-front"><img class="giant" src="assets/logo-mark.png" alt=""><div class="gl">${lockup(10)}<div class="tag">Software, apps &amp; IT services</div></div></div>`,
    back: `<div class="card c-back g-back" id="g-back"><div class="col">${person()}${contacts()}</div><div class="chip"><img src="assets/logo-mark.png" alt=""></div>${qr('r')}</div>`,
  },
  {
    id: 'h', title: 'Option H: Developer', note: 'For a software company: a terminal window holding the lockup, and a back written as code.',
    front: `<div class="card h-front" id="h-front"><pre class="bgcode">${bgCode}</pre><div class="win"><div class="bar">${dots}<span class="ttl">niyosoft.in</span></div><div class="wb">${lockup(11.5)}</div></div><div class="prompt">&gt; Transforming Enterprises through Digital Innovation<b>_</b></div></div>`,
    back: `<div class="card h-back" id="h-back"><div class="panel"><div class="bar">${dots}<span class="ttl">founder.ts</span></div><pre class="code">${codeLines}</pre>${qr('r')}</div></div>`,
  },
  {
    id: 'i', title: 'Option I: Waves', note: 'Soft gradient waves, with the services listed along the bottom of the back.',
    front: `<div class="card i-front" id="i-front">${wave}<div class="lkwrap">${lockup(13)}</div><div class="tag">Transforming Enterprises through Digital Innovation</div></div>`,
    back: `<div class="card i-back" id="i-back">${person()}${qr('tr')}<ul class="contacts grid">${phones}${web}${mail}${addr}</ul>${waveSmall}<div class="svc">Mobile Apps &nbsp;|&nbsp; Websites &nbsp;|&nbsp; Ordering &amp; Payments &nbsp;|&nbsp; IT Support</div></div>`,
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

  /* E */
  .e-front { background: radial-gradient(60mm 40mm at 85% 105%, rgb(24 200 230 / .35), transparent 70%), linear-gradient(135deg, #0b1a5c 0%, #0a2a8f 55%, #0a4fd6 100%); display: flex; align-items: center; justify-content: center; padding-bottom: 6mm; }
  .e-front::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(to right, rgb(255 255 255 / .05) .2mm, transparent .2mm), linear-gradient(to bottom, rgb(255 255 255 / .05) .2mm, transparent .2mm); background-size: 5mm 5mm; }
  .e-front .plate { position: relative; width: 62mm; height: 31mm; background: #fff; border-radius: 2.2mm; display: flex; align-items: center; justify-content: center; box-shadow: 0 1mm 3mm rgb(10 18 64 / .35); }
  .e-front .tag { position: absolute; bottom: 4.4mm; left: 0; right: 0; text-align: center; font-size: 2.1mm; letter-spacing: .06em; color: rgb(255 255 255 / .8); }
  .e-front .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 1.2mm; background: linear-gradient(90deg, var(--brand), var(--sky)); }
  .e-back { background: var(--paper); }

  /* F */
  .f-front { background: #0b1a5c; }
  .f-front .mosaic, .f-front .ribbon { position: absolute; inset: 0; width: 100%; height: 100%; }
  .f-front .ribbon { filter: drop-shadow(0 .6mm .9mm rgb(10 18 64 / .4)); }
  .f-front .lkwrap { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
  .f-back { background: #fff; }
  .f-back .corner { position: absolute; right: 0; top: 0; width: 28mm; height: 20mm; }
  .f-back .col { position: absolute; left: 6mm; top: 5.5mm; }
  .f-back .contacts { margin-top: 3.4mm; }

  /* G */
  .g-front { background: var(--paper); }
  .g-front .giant { position: absolute; right: -3mm; top: -4mm; height: 58mm; width: auto; }
  .g-front .gl { position: absolute; left: 5mm; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; width: 32mm; }
  .g-front .gl .tag { margin-top: 4mm; font-size: 2mm; color: var(--slate); width: 100%; text-align: center; }
  .g-back { background: linear-gradient(135deg, #0a4fd6 0%, #0779a6 100%); }
  .g-back .person .role { color: #b6f4ff; }
  .g-back .person .co, .g-back .contacts .addr { color: rgb(255 255 255 / .85); }
  .g-back .contacts svg { stroke: #fff; }

  /* H */
  .h-front { background: var(--ink); font-family: "DejaVu Sans Mono", ui-monospace, monospace; }
  .h-front .bgcode { position: absolute; left: 4mm; top: 3mm; font: 1.9mm/3mm "DejaVu Sans Mono", monospace; color: var(--sky); opacity: .22; white-space: pre; }
  .h-front .bgcode span { display: block; }
  .win { position: absolute; left: 11mm; right: 11mm; top: 6mm; height: 33mm; background: #fff; border-radius: 2mm; overflow: hidden; box-shadow: 0 1mm 3mm rgb(0 0 0 / .4); }
  .win .bar, .h-back .bar { height: 5mm; display: flex; align-items: center; padding: 0 2.4mm; background: #e6ecfb; }
  .dots { display: inline-flex; gap: 1mm; }
  .dots i { width: 1.5mm; height: 1.5mm; border-radius: 50%; background: var(--brand); display: block; }
  .dots i:nth-child(2) { background: var(--sky); }
  .dots i:nth-child(3) { background: var(--navy); }
  .win .ttl { margin-left: 3mm; font: 1.8mm "DejaVu Sans Mono", monospace; color: var(--slate); }
  .win .wb { height: 28mm; display: flex; align-items: center; justify-content: center; }
  .h-front .prompt { position: absolute; left: 0; right: 0; bottom: 3.6mm; text-align: center; font: 2.05mm "DejaVu Sans Mono", monospace; color: var(--sky); }
  .h-front .prompt b { font-weight: 400; color: #fff; }
  .h-back { background: var(--ink); }
  .h-back .panel { position: absolute; inset: 4mm; border-radius: 2mm; background: #0d1850; border: .25mm solid rgb(255 255 255 / .14); overflow: hidden; }
  .h-back .bar { background: rgb(255 255 255 / .07); }
  .h-back .ttl { margin-left: 3mm; font: 1.8mm "DejaVu Sans Mono", monospace; color: rgb(255 255 255 / .6); }
  .h-back .code { position: absolute; left: 4.5mm; top: 7.2mm; font: 2.02mm/2.95mm "DejaVu Sans Mono", monospace; color: #fff; white-space: pre; }
  .h-back .code .k { color: #7aa7ff; } .h-back .code .p { color: var(--sky); } .h-back .code .c { color: #8b95c9; } .h-back .code .s { color: #fff; }
  .h-back .qr { right: 3.5mm; bottom: 3mm; background: #fff; padding: 1.1mm 1.1mm .5mm; border-radius: 1.4mm; }
  .h-back .qr img { width: 13mm; height: 13mm; }
  .h-back .qr span { color: var(--slate); font-size: 1.5mm; margin-top: .5mm; }

  /* I */
  .i-front { background: #fff; }
  .i-front .wave { position: absolute; inset: 0; width: 100%; height: 100%; }
  .i-front .lkwrap { position: absolute; left: 0; right: 0; top: 3.5mm; height: 27mm; display: flex; align-items: center; justify-content: center; }
  .i-front .tag { position: absolute; left: 0; right: 0; bottom: 3.2mm; text-align: center; font-size: 2.2mm; letter-spacing: .05em; color: #fff; }
  .i-back { background: #fff; padding: 5mm 6mm 0; }
  .i-back .person .co { display: none; }
  .i-back .qr.tr { right: 5.5mm; top: 4.2mm; }
  .i-back .qr.tr img { width: 13mm; height: 13mm; }
  .i-back .qr.tr span { display: none; }
  .i-back .grid { margin-top: 3.6mm; grid-template-columns: 1fr 1fr; column-gap: 3mm; row-gap: 1.5mm; position: relative; z-index: 1; }
  .i-back .grid .ml, .i-back .grid .ad { grid-column: 1 / -1; }
  .i-back .wave { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 8.5mm; }
  .i-back .svc { position: absolute; left: 0; right: 0; bottom: 1.6mm; text-align: center; font-size: 1.95mm; letter-spacing: .04em; color: #fff; }
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
