/* Shared engine for the Web Technology learning pages. Keep next to the unit .html files. */
function build(title, T, extra) {
  document.title = title;
  document.head.insertAdjacentHTML('beforeend', '<meta name="viewport" content="width=device-width,initial-scale=1"><style>' +
':root{--bg:#0f172a;--c:#1e293b;--tx:#e2e8f0;--mu:#94a3b8;--a:#38bdf8;--b:#f59e0b;--g:#4ade80}*{box-sizing:border-box}' +
'body{margin:0;font-family:system-ui,Segoe UI,Arial,sans-serif;background:var(--bg);color:var(--tx);display:flex}' +
'nav{position:sticky;top:0;height:100vh;width:270px;overflow:auto;background:#0b1220;padding:16px;flex:none}nav h1{font-size:16px;color:var(--a);margin:0 0 6px}' +
'nav h4{margin:14px 0 4px;color:var(--b);font-size:12px;letter-spacing:1px}nav a{display:block;color:var(--mu);text-decoration:none;font-size:13px;padding:5px 8px;border-radius:6px}nav a:hover,nav a.on{background:var(--c);color:#fff}' +
'main{flex:1;padding:24px;max-width:920px;min-width:0}section{background:var(--c);border-radius:14px;padding:20px;margin-bottom:22px;opacity:0;transform:translateY(24px);transition:.6s}section.in{opacity:1;transform:none}' +
'h2{margin:0 0 8px;color:var(--a);font-size:21px}h2 small{color:var(--b);font-size:12px;display:block}li{margin:5px 0;line-height:1.5}' +
'pre{background:#020617;border-left:3px solid var(--g);padding:12px;border-radius:8px;overflow:auto;font-size:13px;color:#bbf7d0}.log{color:#fde68a;white-space:pre-wrap;font:13px monospace}' +
'.demo{border:1px dashed #475569;border-radius:10px;padding:12px;margin-top:10px}button{background:var(--a);color:#001;border:0;padding:7px 13px;border-radius:7px;cursor:pointer;font-weight:600;margin:4px 4px 4px 0}button:hover{filter:brightness(1.15)}' +
'input,textarea{background:#020617;color:var(--tx);border:1px solid #475569;padding:6px;border-radius:6px}.row{display:flex;justify-content:space-between;position:relative;margin:34px 0 14px}' +
'.n{background:#334155;padding:10px 6px;border-radius:8px;width:22%;text-align:center;font-size:13px;transition:.3s}.n.hot{background:var(--a);color:#001;transform:scale(1.08)}' +
'.dot{position:absolute;top:-22px;left:0;width:16px;height:16px;border-radius:50%;background:var(--b);transition:left .9s ease;box-shadow:0 0 12px var(--b)}' +
'.cap{min-height:22px;color:var(--g);font-size:14px}.chip{display:inline-block;background:#334155;padding:5px 10px;border-radius:20px;margin:3px;cursor:pointer;font-size:13px}.chip:hover,.chip.on{background:var(--b);color:#001}' +
'@media(max-width:800px){body{display:block}nav{position:static;height:auto;width:auto}}</style>');
  document.body.innerHTML = '<nav><h1>' + title + '</h1><div id="nav"></div></nav><main><p style="color:var(--mu)">Theory → code → press the buttons in each <b style="color:#f59e0b">Live Demo</b>. In "edit and run" boxes, change the code and click Run. by Mr. Vikas Maurya</p><div id="app"></div></main>';
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;'), sl = ms => new Promise(r => setTimeout(r, ms));
  const D = {
    flow(el, t) {
      const [nodes, steps] = [t.d[1], t.d[2]];
      el.innerHTML = '<div class="row"><div class="dot"></div>' + nodes.map(n => '<div class="n">' + n + '</div>').join('') + '</div><div class="cap"></div><button>▶ Play</button>';
      const ns = [...el.querySelectorAll('.n')], dot = el.querySelector('.dot'), cap = el.querySelector('.cap');
      const cx = i => ns[i].offsetLeft + ns[i].offsetWidth / 2 - 8; dot.style.left = cx(0) + 'px';
      el.querySelector('button').onclick = async () => {
        for (const [a, b, l] of steps) {
          ns.forEach(n => n.classList.remove('hot')); ns[a].classList.add('hot'); dot.style.left = cx(a) + 'px'; cap.textContent = l; await sl(500);
          dot.style.left = cx(b) + 'px'; await sl(1100); ns.forEach(n => n.classList.remove('hot')); ns[b].classList.add('hot');
        }
      };
    },
    chips(el, t) {
      const o = t.d[1];
      el.innerHTML = Object.keys(o).map(k => '<span class="chip">' + esc(k) + '</span>').join('') + '<div class="cap" style="margin-top:8px"></div>';
      el.querySelectorAll('.chip').forEach(c => c.onclick = () => { el.querySelectorAll('.chip').forEach(x => x.classList.remove('on')); c.classList.add('on'); el.querySelector('.cap').textContent = o[c.textContent]; });
    },
    cmd(el, t) {
      const o = t.d[1];
      el.innerHTML = Object.keys(o).map(k => '<span class="chip">' + esc(k) + '</span>').join('') + '<pre class="log">Click a command to run it.</pre>';
      el.querySelectorAll('.chip').forEach(c => c.onclick = () => el.querySelector('pre').textContent = '$ ' + c.textContent + '\n' + o[c.textContent]);
    },
    try(el, t) {
      el.innerHTML = '<textarea style="width:100%;height:180px;color:#bbf7d0;font:13px monospace"></textarea><button>▶ Run</button><iframe sandbox="allow-scripts" style="width:100%;height:200px;background:#fff;border:0;border-radius:8px"></iframe>';
      const ta = el.querySelector('textarea'), fr = el.querySelector('iframe'); ta.value = t.code;
      const run = () => fr.srcdoc = ta.value; el.querySelector('button').onclick = run; run();
    }
  };
  Object.assign(D, extra || {});
  const app = document.getElementById('app'), nav = document.getElementById('nav'); let last = '';
  T.forEach((t, i) => {
    if (t.g != last) { nav.innerHTML += '<h4>' + t.g + '</h4>'; last = t.g; }
    nav.innerHTML += '<a href="#t' + i + '">' + (i + 1) + '. ' + t.t + '</a>';
    const s = document.createElement('section'), tr = t.d[0] == 'try'; s.id = 't' + i;
    s.innerHTML = '<h2><small>' + t.g + ' · TOPIC ' + (i + 1) + '</small>' + t.t + '</h2><b style="color:#f59e0b">THEORY</b><ul>' + t.th.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' +
      (tr ? '' : '<b style="color:#4ade80">PRACTICAL CODE</b><pre>' + esc(t.code) + '</pre>') + '<div class="demo"><b style="color:#f59e0b;font-size:12px">▶ LIVE DEMO' + (tr ? ' (edit the code, then Run)' : '') + '</b><div></div></div>';
    app.appendChild(s); D[t.d[0]](s.querySelector('.demo div'), t);
  });
  const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); document.querySelectorAll('nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') == '#' + x.target.id)); } }), { threshold: .15 });
  document.querySelectorAll('section').forEach(s => io.observe(s));
}
