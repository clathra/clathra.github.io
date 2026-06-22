/* Clathra analytics consent — Google Consent Mode v2 (ADVANCED), geo-aware.
   Goal: maximum compliant measurement.

   • Regulated (EU / EEA / UK / CH) or a GPC opt-out signal:
       analytics + ad storage DEFAULT to "denied", but gtag still loads in
       COOKIELESS mode. Google then sends anonymous, aggregated pings that feed
       conversion/behaviour MODELLING — no cookies or identifiers are stored,
       so it is compliant without consent. A banner lets the visitor upgrade to
       full (cookie-based) measurement.
   • Everywhere else: consent granted by default (full cookie measurement).
   • GPC is honoured as an opt-out (kept cookieless + modelled, never nagged).
   • Legacy Do-Not-Track is ignored on purpose: it carries no legal weight and
     only loses data.
   • A stored choice is always respected. The footer "Cookies" link re-opens the
     banner for everyone (incl. non-EU visitors who want to opt out).

   NOTE: "advanced" consent mode loads Google's tag before consent in regulated
   regions (cookieless). This is Google's recommended, widely-used pattern, but a
   minority of strict EU regulators prefer "basic" mode (no tag until consent).
   Flip ADVANCED to false below for the conservative behaviour. */
(function(){
  var GA_ID    = 'G-QQLV2HSWZ1';
  var KEY      = 'clathra_consent';
  var ADVANCED = true; /* true = collect cookieless modelled data before/without consent */
  var REGULATED = {AT:1,BE:1,BG:1,HR:1,CY:1,CZ:1,DK:1,EE:1,FI:1,FR:1,DE:1,GR:1,HU:1,IE:1,IT:1,LV:1,LT:1,LU:1,MT:1,NL:1,PL:1,PT:1,RO:1,SK:1,SI:1,ES:1,SE:1,IS:1,LI:1,NO:1,GB:1,CH:1};

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  function read(){ try { return localStorage.getItem(KEY); } catch(e){ return null; } }
  function store(v){ try { localStorage.setItem(KEY, v); } catch(e){} }

  var gaLoaded = false;
  function loadGA(){
    if (gaLoaded) return;
    gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { url_passthrough: true });
  }

  function grant(){
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }

  /* ---------- banner UI ---------- */
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
      '<p>We use Google Analytics to understand how this site is used. With your consent we’ll store analytics cookies; if you decline, we still only ever see anonymous, aggregated measurement. See our <a href="/privacy.html">Privacy Policy</a>.</p>' +
      '<div class="row"><button class="acc" type="button">Accept</button><button class="dec" type="button">Decline</button></div>';
    document.body.appendChild(d);
    d.querySelector('.acc').onclick = function(){ store('granted'); grant(); if(!gaLoaded) loadGA(); hide(); };
    d.querySelector('.dec').onclick = function(){ store('denied'); if(!gaLoaded && ADVANCED) loadGA(); hide(); };
  }
  function showWhenReady(){ if (document.readyState !== 'loading') show(); else document.addEventListener('DOMContentLoaded', show); }
  window.clathraManageCookies = function(){ show(); };

  /* ---------- decide ---------- */
  var stored = read();
  var gpc = (navigator.globalPrivacyControl === true);

  function begin(regulated){
    var restricted = regulated || gpc;
    var dflt = (stored === 'granted') ? 'granted'
             : (stored === 'denied')  ? 'denied'
             : (restricted ? 'denied' : 'granted');

    gtag('consent', 'default', {
      analytics_storage: dflt,
      ad_storage: dflt,
      ad_user_data: dflt,
      ad_personalization: dflt,
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500
    });
    if (dflt === 'denied') gtag('set', 'ads_data_redaction', true);

    /* Advanced: load the tag even when denied so cookieless modelling pings flow.
       Basic: only load once we actually have (or get) consent. */
    if (dflt === 'granted' || ADVANCED) loadGA();

    /* Ask only when there is no stored choice, the region needs it, and the
       visitor hasn't already opted out via GPC. */
    if (!stored && regulated && !gpc) showWhenReady();
  }

  /* If we already know the answer (stored choice or GPC), no geo lookup needed. */
  if (stored || gpc) { begin(false); return; }

  /* Otherwise resolve region with a cookieless lookup; fail safe = treat as regulated. */
  fetch('https://api.country.is/')
    .then(function(r){ return r.json(); })
    .then(function(d){ begin(!!(d && d.country && REGULATED[d.country])); })
    .catch(function(){ begin(true); });
})();
