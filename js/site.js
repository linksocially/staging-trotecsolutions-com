/* Trotec Solutions site behavior: quick quote hand-off, quote form prefill, staging form notice. */
(function () {
  var STAGING = document.body.dataset.staging === '1';

  // Home repair tag: send manufacturer, component and model on to the full quote form.
  var qq = document.getElementById('quick-quote');
  if (qq) {
    var msg = document.getElementById('qq-msg');
    qq.addEventListener('submit', function (e) {
      var maker = qq.manufacturer.value, type = qq.component.value;
      if (!maker || !type) {
        e.preventDefault();
        msg.textContent = 'Choose a manufacturer and a component to continue.';
        msg.hidden = false;
        (maker ? qq.component : qq.manufacturer).focus();
      }
    });
  }

  // Quote form: prefill from the repair tag (manufacturer, component and model only).
  var qf = document.getElementById('quote-form');
  if (qf) {
    var params = new URLSearchParams(location.search);
    ['manufacturer', 'component', 'model'].forEach(function (k) {
      var v = params.get(k); if (!v || !qf.elements[k]) return;
      var el = qf.elements[k];
      if (el.tagName === 'SELECT') { for (var i = 0; i < el.options.length; i++) { if (el.options[i].text === v || el.options[i].value === v) el.selectedIndex = i; } }
      else { el.value = v.slice(0, 80); }
    });
    if (params.get('exchange') === '1' && qf.elements.exchange) qf.elements.exchange.checked = true;
  }

  // Minimum fill time for the honeypot check on the server.
  document.querySelectorAll('form[data-form]').forEach(function (f) {
    var t = f.querySelector('input[name="ts"]'); if (t) t.value = String(Date.now());
    if (!STAGING || f.id === 'quick-quote') return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var m = f.querySelector('.form-msg');
      if (m) { m.textContent = 'Preview only: on the live site this sends your request to Trotec Solutions and opens a confirmation page.'; m.hidden = false; m.focus(); }
    });
  });
})();
