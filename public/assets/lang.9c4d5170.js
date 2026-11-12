/* Автовыбор языка. Редиректит ТОЛЬКО русская (корневая) страница:
   /en/ и /es/ — уже явные адреса, их не трогаем.
   Приоритет: явный выбор из переключателя (localStorage.lang) → языки браузера
   ПО ПОРЯДКУ предпочтения (первый поддерживаемый побеждает) → английский по
   умолчанию. Боты исключены — JS-редирект корня по языку рендерера утащил бы
   индексацию корня; поисковикам языки объясняет hreflang.
   Новый язык = новый ключ в TARGETS + своя страница /xx/.
   CSP страницы запрещает инлайн-скрипты, поэтому файл внешний; грузится в <head>
   синхронно, чтобы location.replace() успел до первой отрисовки. */
(function () {
  'use strict';
  var TARGETS = { ru: '', en: 'en/', es: 'es/', pt: 'pt/', th: 'th/' };
  var DEFAULT = 'en';
  var page = (document.documentElement.lang || 'ru').slice(0, 2).toLowerCase();

  // Переключатели языка запоминают явный выбор — на всех страницах.
  addEventListener('DOMContentLoaded', function () {
    var as = document.querySelectorAll('a[hreflang]');
    for (var i = 0; i < as.length; i++) {
      (function (a) {
        var l = (a.getAttribute('hreflang') || '').slice(0, 2).toLowerCase();
        if (!(l in TARGETS)) return;
        a.addEventListener('click', function () {
          try { localStorage.setItem('lang', l); } catch (e) {}
        });
      })(as[i]);
    }
  });

  if (page !== 'ru') return;                       // редиректит только корень
  if (/bot|crawl|spider|preview/i.test(navigator.userAgent)) return;

  function go(lang) {
    if (lang === 'ru') return true;
    location.replace(TARGETS[lang] + location.search + location.hash);
    return true;
  }

  var pref = null;
  try { pref = localStorage.getItem('lang'); } catch (e) {}
  if (pref in TARGETS) { go(pref); return; }

  var langs = (navigator.languages && navigator.languages.length)
    ? navigator.languages : [navigator.language || ''];
  for (var k = 0; k < langs.length; k++) {
    var c = String(langs[k]).slice(0, 2).toLowerCase();
    if (c in TARGETS) { go(c); return; }           // первый поддерживаемый побеждает
  }
  go(DEFAULT);
})();
