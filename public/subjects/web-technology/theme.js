/* Theme switcher: System / Dark / Light. Saved in the browser. Include in <head> of every page. */
(function () {
  var KEY = 'wt-theme', root = document.documentElement, mq = window.matchMedia('(prefers-color-scheme: dark)');
  var pref = 'system'; try { pref = localStorage.getItem(KEY) || 'system'; } catch (e) {}
  function apply() { root.setAttribute('data-theme', pref === 'system' ? (mq.matches ? 'dark' : 'light') : pref); }
  apply(); mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply);
  var v = document.createElement('style');
  v.textContent = 'html[data-theme=light]{--bg:#f1f5f9;--c:#ffffff;--tx:#0f172a;--mu:#475569;--a:#0369a1;--b:#b45309;--g:#15803d;color-scheme:light}html[data-theme=dark]{color-scheme:dark}';
  document.head.appendChild(v);
  document.addEventListener('DOMContentLoaded', function () {
    var s = document.createElement('style');
    s.textContent =
      ':where(html[data-theme=light]) nav{background:#e2e8f0}' +
      ':where(html[data-theme=light]) pre{background:#f8fafc;color:#166534}' +
      ':where(html[data-theme=light]) .log{color:#92400e!important}' +
      ':where(html[data-theme=light]) input,:where(html[data-theme=light]) textarea,:where(html[data-theme=light]) select{background:#fff;color:#0f172a;border-color:#94a3b8}' +
      ':where(html[data-theme=light]) textarea{color:#166534}' +
      ':where(html[data-theme=light]) .n,:where(html[data-theme=light]) .chip,:where(html[data-theme=light]) .step{background:#cbd5e1;color:#0f172a}' +
      'html[data-theme=light] .n.hot,html[data-theme=light] .chip.on,html[data-theme=light] .chip:hover,html[data-theme=light] .step.hot,html[data-theme=light] button{color:#fff}' +
      ':where(html[data-theme=light]) td,:where(html[data-theme=light]) th,:where(html[data-theme=light]) .demo{border-color:#94a3b8}' +
      ':where(html[data-theme=light]) nav a:hover,:where(html[data-theme=light]) nav a.on{color:#0f172a}' +
      'html[data-theme=light] section{box-shadow:0 1px 6px #0002}' +
      'body,section,nav,pre,a{transition:background .3s,color .3s}' +
      '#thm{position:fixed;top:10px;right:12px;z-index:99;padding:6px 10px;border-radius:20px;border:1px solid #94a3b8;background:var(--c);color:var(--tx);cursor:pointer;font:600 13px system-ui}';
    document.head.appendChild(s);
    var sel = document.createElement('select'); sel.id = 'thm'; sel.title = 'Theme';
    sel.innerHTML = '<option value="system">🖥 System</option><option value="dark">🌙 Dark</option><option value="light">☀️ Light</option>';
    sel.value = pref;
    sel.onchange = function () { pref = sel.value; try { localStorage.setItem(KEY, pref); } catch (e) {} apply(); };
    document.body.appendChild(sel);
  });
})();
