/* Trotec Solutions tracking: consent defaults denied, cookie bar, GA4 (gtag.js) and Microsoft Clarity after Accept.
   Tags load only on the production host, so staging and previews never send data. */
(function () {
  var GA_ID = 'G-ELQ7RKJM9X', CLARITY_ID = 'z5jbn94knm';
  var LIVE = /^(www\.)?trotecsolutions\.com$/.test(location.hostname);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
  function load(src) { var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }
  if (LIVE) {
    load('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);
    gtag('js', new Date());
    gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false, content_group: document.documentElement.lang || 'en-US' });
  }
  function getChoice() { try { return localStorage.getItem('ts_consent'); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem('ts_consent', v); } catch (e) {} }
  function loadClarity() {
    if (!LIVE || window.clarity) return;
    (function (c, l, a, r, i) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); }; var t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i; l.head.appendChild(t); })(window, document, 'clarity', 'script', CLARITY_ID);
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
  }
  var bar = document.getElementById('cookie');
  function hide() { if (bar) bar.hidden = true; }
  function accept() { setChoice('accept'); gtag('consent', 'update', { analytics_storage: 'granted' }); loadClarity(); hide(); }
  function reject() { setChoice('reject'); gtag('consent', 'update', { analytics_storage: 'denied' }); if (window.clarity) window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' }); hide(); }
  var choice = getChoice();
  if (navigator.globalPrivacyControl === true && !choice) { setChoice('reject'); choice = 'reject'; }
  if (choice === 'accept') { gtag('consent', 'update', { analytics_storage: 'granted' }); loadClarity(); }
  else if (!choice && bar) { bar.hidden = false; }
  var a = document.getElementById('cookie-accept'), r = document.getElementById('cookie-reject'), o = document.getElementById('cookie-reopen');
  if (a) a.addEventListener('click', accept);
  if (r) r.addEventListener('click', reject);
  if (o) o.addEventListener('click', function () { if (bar) bar.hidden = false; });

  function base() { return { page_language: document.documentElement.lang || 'en-US', intent_stage: document.body.dataset.intent || '' }; }
  function send(name, params) {
    var p = base(); params = params || {};
    for (var k in params) { if (params[k] != null && params[k] !== '') p[k] = params[k]; }
    gtag('event', name, p);
    if (window.clarity) { window.clarity('event', name); window.clarity('set', 'hva', name); }
  }
  window.tsTrack = send;
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-hva]:not(details):not(form), a[href^="tel:"], a[href^="sms:"]');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var name = el.dataset.hva || (href.indexOf('tel:') === 0 ? 'phone_click' : 'text_click');
    send(name, { cta: el.dataset.hvaCta, cta_location: el.dataset.hvaLocation });
  });
  document.querySelectorAll('details[data-hva]').forEach(function (d) {
    d.addEventListener('toggle', function () { if (d.open) send(d.dataset.hva, { question: d.dataset.hvaQuestion }); });
  });
  document.querySelectorAll('form[data-form]').forEach(function (f) {
    var started = false;
    f.addEventListener('focusin', function () { if (!started) { started = true; send('form_start', { form: f.dataset.form }); } });
  });
  if (document.body.dataset.hvaLoad) send(document.body.dataset.hvaLoad, { form: document.body.dataset.hvaForm });
})();
