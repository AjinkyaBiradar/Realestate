// GA4 (тот же поток, что на aistlab.online; разрез по hostname).
// Внешним файлом — CSP страницы запрещает инлайн-скрипты.
// Подключается ПОСЛЕ lang.js: авторедирект нерусских с корня уходит раньше,
// чем успевает отправиться page_view — корень не считается дважды (схема aist).
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-FV081ZWKNX');
(function () {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-FV081ZWKNX';
  document.head.appendChild(s);
})();
