/* Clathra analytics consent, geo-aware.
   EU / EEA / UK visitors see a minimal banner and analytics loads only on accept.
   Everywhere else, analytics loads directly. A stored choice is always respected.
   Hosted on GitHub Pages (static), so the region check is done client-side via a
   cookieless lookup. If the lookup fails, we default to asking for consent. */
(function(){
  var GA_ID = 'G-QQLV2HSWZ1';
  var KEY = 'clathra_consent';
  var REGULATED = {AT:1,BE:1,BG:1,HR:1,CY:1,CZ:1,DK:1,EE:1,FI:1,FR:1,DE:1,GR:1,HU:1,IE:1,IT:1,LV:1,LT:1,LU:1,MT:1,NL:1,PL:1,PT:1,RO:1,SK:1,SI:1,ES:1,SE:1,IS:1,LI:1,NO:1,GB:1,CH:1};

  function loadGA(){
    if (window.__clathraGA) return;
    window.__clathraGA = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function store(v){ try { localStorage.setItem(KEY, v); } catch(e){} }
  function read(){ try { return localStorage.getItem(KEY); } catch(e){ return null; } }

  function injectStyles(){
    if (document.getElementById('clathra-cc-style')) return;
    var st = document.createElement('style');
    st.id = 'clathra-cc-style';
    st.textContent =
      '#clathra-cc{position:fixed;z-index:9999;left:16px;right:16px;bottom:16px;max-width:520px;margin:0 auto;background:#fff;border:1px solid #e3e9ef;border-radius:16px;box-shadow:0 18px 50px -24px rgba(14,23,38,.4);padding:16px 18px;font-family:"Hanken Grotesk",system-ui,-apple-system,sans-serif;color:#0e1726}' +
      '#clathra-cc p{font-size:13.5px;line-height:1.5;color:#54637a;margin:0 0 12px}' +
      '#clathra-cc a{color:#059976;text-decoration:underline}' +
      '#clathra-cc .row{display:flex;gap:10px;flex-wrap:wrap}' +
      '#clathra-cc button{font-family:inherit;font-weight:600;font-size:13.5px;padding:9px 16px;border-radius:999px;border:1px solid transparent;cursor:pointer}' +
      '#clathra-cc .acc{background:#0e1726;color:#fff}' +
      '#clathra-cc .dec{background:#fff;color:#0e1726;border-color:#d4dbe3}' +
      '@media (prefers-reduced-motion:no-preference){#clathra-cc{animation:ccin .35s cubic-bezier(.2,.7,.2,1)}}' +
      '@keyframes ccin{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}';
    document.head.appendChild(st);
  }

  function hide(){ var b = document.getElementById('clathra-cc'); if (b) b.parentNode.removeChild(b); }

  function show(){
    injectStyles();
    if (document.getElementById('clathra-cc')) return;
    var d = document.createElement('div');
    d.id = 'clathra-cc';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Cookie notice');
    d.innerHTML =
      '<p>We use one cookie (Google Analytics) to see how this site is used. Nothing is set unless you agree. See our <a href="/privacy.html">Privacy Policy</a>.</p>' +
      '<div class="row"><button class="acc" type="button">Accept</button><button class="dec" type="button">Decline</button></div>';
    document.body.appendChild(d);
    d.querySelector('.acc').onclick = function(){ store('granted'); loadGA(); hide(); };
    d.querySelector('.dec').onclick = function(){ store('denied'); hide(); };
  }
  function showWhenReady(){ if (document.readyState !== 'loading') show(); else document.addEventListener('DOMContentLoaded', show); }

  /* Manual control from the footer "Cookies" link, available to everyone. */
  window.clathraManageCookies = function(){ show(); };

  /* Respect Global Privacy Control / Do Not Track as a decline signal. */
  if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;

  var v = read();
  if (v === 'granted') { loadGA(); return; }
  if (v === 'denied') { return; }

  /* No stored choice: decide by region using a cookieless, CORS-friendly lookup.
     If it fails for any reason, we default to asking for consent. */
  fetch('https://api.country.is/')
    .then(function(r){ return r.json(); })
    .then(function(d){
      var cc = (d && d.country) ? d.country : '';
      if (REGULATED[cc]) showWhenReady();
      else loadGA();
    })
    .catch(function(){ showWhenReady(); });
})();
