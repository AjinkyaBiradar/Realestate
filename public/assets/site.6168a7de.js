/* LAKE HOUSE — логика страницы. Внешний классический скрипт (не модуль):
   CSP держит script-src 'self' без unsafe-inline, и страница одинаково открывается
   и с сервера, и двойным кликом с диска. */
(function () {
  'use strict';
  var REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  // Один скрипт на ВСЕ языковые версии: язык берём у страницы, а не дублируем файл —
  // иначе логика неизбежно расходится между копиями. Новый язык = новый ключ в
  // словарях ниже (WORDS/HS_TEXT/MSG/PRICES) + своя страница /xx/index.html.
  var LANG = (function () {
    var l = (document.documentElement.lang || 'ru').slice(0, 2).toLowerCase();
    return (l === 'en' || l === 'es' || l === 'pt' || l === 'th') ? l : 'ru';
  })();
  var EN = LANG === 'en';
  // База ассетов — от src самого скрипта. Страница /en/ лежит уровнем ниже корня,
  // и относительные 'assets/...' от ЕЁ URL вели бы в несуществующий /en/assets/.
  var ASSETS = (function () {
    var s = document.querySelector('script[src*="site."]');
    return s ? s.src.replace(/[^\/]*$/, '') : 'assets/';
  })();

  /* ══════════════ 1. SCROLL-SCRUB ГЕРОЯ ══════════════ */
  var HERO = {
    FLY_END: 0.88,   // fraction of pin for fly-around
    TAU: 0.16,       // snappy time constant, eliminates input lag
    EAGER: 24,       // preload frames immediately
  };

  function initHero() {
    var canvas = $('#heroCanvas'), poster = $('#heroPoster'), hero = $('#hero');
    if (!canvas || !hero) return;
    var ctx = canvas.getContext('2d', { alpha: false });
    // Always load crisp full-resolution 2560x1440 frames on desktop and tablets
    var light = innerWidth < 640;

    // Литерал пути НЕ инлайнить в fetch: build_assets.py подставляет в него
    // хэш-имя манифеста побайтовой заменой. slice(7) снимает префикс 'assets/'.
    var MAN = 'assets/hero/manifest.33b7384c.json';
    fetch(ASSETS + MAN.slice(7), { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (man) { if (man && man.count > 0) run(man); })
      .catch(function () { /* кадров ещё нет — постер остаётся, и это валидное состояние */ });

    function run(man) {
      var dir = ASSETS + 'hero/' + (light ? 'm/' : '');
      var n = man.count, pos = man.pos || [];
      var imgs = new Array(n), ready = new Array(n), loading = new Array(n);
      var current = 0, target = 0, shown = -1, last = 0, paused = false, handed = false;

      function load(i) {
        if (i < 0 || i >= n || loading[i]) return;
        loading[i] = 1;
        var im = new Image();
        im.decoding = 'async';
        // кадр считается готовым после decode(), а не после загрузки байтов
        im.onload = function () { im.decode().then(ok, ok); };
        function ok() { imgs[i] = im; ready[i] = 1; if (shown < 0) draw(0); }
        im.src = dir + String(i).padStart(4, '0') + '.webp' + (man.v ? '?v=' + man.v : '');
      }
      for (var i = 0; i < Math.min(HERO.EAGER, n); i++) load(i);

      var next = HERO.EAGER;
      function pump() {
        if (paused) return;
        var budget = 3;
        while (budget-- > 0 && next < n) load(next++);
        if (next < n) setTimeout(pump, 90);
      }
      setTimeout(pump, 320);

      // прогресс скролла 0..1 → индекс кадра ПО ВРЕМЕНИ ролика.
      // Кадры отобраны по движению (это убирает рывки), а раскладываются по настоящему
      // времени (это сохраняет темп: медленный подлёт не проскакивает).
      function posToIndex(p) {
        if (!pos.length) return p * (n - 1);
        var lo = 0, hi = pos.length - 1;
        while (lo < hi - 1) { var m = (lo + hi) >> 1; if (pos[m] <= p) lo = m; else hi = m; }
        var span = pos[hi] - pos[lo];
        return span > 0 ? lo + (p - pos[lo]) / span : lo;
      }

      function fit() {
        var r = canvas.getBoundingClientRect();
        var dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2.5);
        var w = Math.round(r.width * dpr);
        var h = Math.round(r.height * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
      }

      function draw(idx) {
        var i = Math.max(0, Math.min(n - 1, Math.round(idx)));
        var im = ready[i] ? imgs[i] : null;
        if (!im) { for (var k = i; k >= 0; k--) if (ready[k]) { im = imgs[k]; break; } }
        if (!im) return;
        if (!canvas.width || !canvas.height) fit();
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        var cw = canvas.width, ch = canvas.height;
        var s = Math.max(cw / im.width, ch / im.height);   // cover
        var dw = im.width * s, dh = im.height * s;
        ctx.drawImage(im, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
        shown = i;
        if (canvas.style.opacity !== '1') {
          canvas.style.opacity = '1';
          canvas.style.transition = 'opacity .5s ease';
          if (poster) poster.style.opacity = '0';
        }
      }

      // до первого скролла — бесшовный yoyo-луп; первый скролл забирает управление так,
      // что последний кадр автоплея = первый кадр скраба, стыка не видно
      var yoyoI = 0, yoyoDir = 1, yoyoT = 0;
      function tick(now) {
        var dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
        last = now;
        if (!handed) {
          yoyoT += dt;
          if (yoyoT > 0.075) {
            yoyoT = 0;
            yoyoI += yoyoDir;
            var lim = Math.min(n - 1, HERO.EAGER - 1);
            if (yoyoI >= lim) { yoyoI = lim; yoyoDir = -1; }
            if (yoyoI <= 0) { yoyoI = 0; yoyoDir = 1; }
            if (!REDUCED) draw(yoyoI);
          }
        } else {
          // демпфирование по ВРЕМЕНИ: одинаково на 60, 90 и 120 Гц.
          // Коэффициент «раз в кадр» на ProMotion даёт половину задуманной плавности.
          // На prefers-reduced-motion — БЕЗ инерции: кадр встаёт ровно туда, куда
          // прокрутил человек. Сглаживание и есть то «движение», которого он просил
          // не делать; сам облёт при этом остаётся доступен.
          if (REDUCED) current = target;
          else current += (target - current) * (1 - Math.exp(-dt / HERO.TAU));
          if (Math.abs(current - shown) > 0.0006) draw(current);
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);

      function onScroll() {
        var r = hero.getBoundingClientRect();
        var total = hero.offsetHeight - innerHeight;
        var p = Math.max(0, Math.min(1, (-r.top) / total / HERO.FLY_END));
        if (!handed && -r.top > 2) {
          handed = true; current = yoyoI;
          var hint = $('#heroHint'); if (hint) hint.style.opacity = '0';
        }
        target = posToIndex(p);
        // докачку — на паузу, когда герой ушёл с экрана
        var off = r.bottom < -200;
        if (off !== paused) { paused = off; if (!paused) pump(); }
      }
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', function () { fit(); draw(current); }, { passive: true });
      onScroll();

      // позиция скраба наружу — харнесс ждёт схода инерции, а не «N кадров»
      window.__heroScrub = function () { return { current: current, target: target, shown: shown }; };
    }
  }

  /* ══════════════ 2. КОНФИГУРАТОР ══════════════ */
  var PRICE = {
    base: 68, area: 420,
    finish: { warm: 0, graphite: 2, natural: 1 },
    bedrooms: { 2: -6, 4: 0, 5: 5 },
    hamam: { none: 0, snow: 4, warm: 4 },
    terrace: { std: 0, pool: 6 },
    glazing: { panoramic: 0, sliding: 3 },
  };
  // Валюты по языкам: en — доллары (≈85 ₽/$), es — евро (≈100 ₽/€); линейка одна,
  // пересчитана и округлена до маркетинговых чисел (цены по дисклеймеру иллюстративные).
  // en — в ТЫСЯЧАХ долларов, es — в ТЫСЯЧАХ евро (все значения кратны тысяче:
  // priceStr этим пользуется, форматируя «680.000 €»).
  var PRICE_EN = {
    base: 800,
    finish: { warm: 0, graphite: 25, natural: 12 },
    bedrooms: { 2: -70, 4: 0, 5: 60 },
    hamam: { none: 0, snow: 50, warm: 50 },
    terrace: { std: 0, pool: 70 },
    glazing: { panoramic: 0, sliding: 35 },
  };
  var PRICE_ES = {
    base: 680,
    finish: { warm: 0, graphite: 20, natural: 10 },
    bedrooms: { 2: -60, 4: 0, 5: 50 },
    hamam: { none: 0, snow: 40, warm: 40 },
    terrace: { std: 0, pool: 60 },
    glazing: { panoramic: 0, sliding: 30 },
  };
  // pt делит евро-таблицу с es: одна валюта — одни цифры.
  // th — миллионы батов (68 млн ₽ ≈ ฿28M); дельты дробные, priceStr округляет до 0.1.
  var PRICE_TH = {
    base: 28,
    finish: { warm: 0, graphite: 0.8, natural: 0.4 },
    bedrooms: { 2: -2.5, 4: 0, 5: 2 },
    hamam: { none: 0, snow: 1.6, warm: 1.6 },
    terrace: { std: 0, pool: 2.5 },
    glazing: { panoramic: 0, sliding: 1.2 },
  };
  var PRICES = { ru: PRICE, en: PRICE_EN, es: PRICE_ES, pt: PRICE_ES, th: PRICE_TH };
  var AREA = { bedrooms: { 2: -34, 4: 0, 5: 28 }, hamam: { none: 0, snow: 34, warm: 34 } };
  var WORDS = ({
    ru: {
      finish: { warm: 'тёплый белый', graphite: 'графит', natural: 'натуральный дуб' },
      hamam: { none: 'без спа', snow: 'белоснежный хамам', warm: 'хамам тёплый камень' },
      terrace: { std: 'стандартная терраса', pool: 'терраса с бассейном' },
      glazing: { panoramic: 'панорамное остекление', sliding: 'раздвижная стена' },
    },
    en: {
      finish: { warm: 'warm white', graphite: 'graphite', natural: 'natural oak' },
      hamam: { none: 'no spa', snow: 'snow-white spa', warm: 'warm-stone spa' },
      terrace: { std: 'standard terrace', pool: 'terrace with a pool' },
      glazing: { panoramic: 'panoramic glazing', sliding: 'sliding glass wall' },
    },
    es: {
      finish: { warm: 'blanco cálido', graphite: 'grafito', natural: 'roble natural' },
      hamam: { none: 'sin spa', snow: 'spa blanco nieve', warm: 'spa de piedra cálida' },
      terrace: { std: 'terraza estándar', pool: 'terraza con piscina' },
      glazing: { panoramic: 'acristalamiento panorámico', sliding: 'pared de cristal corredera' },
    },
    pt: {
      finish: { warm: 'branco quente', graphite: 'grafite', natural: 'carvalho natural' },
      hamam: { none: 'sem spa', snow: 'spa branco neve', warm: 'spa de pedra quente' },
      terrace: { std: 'terraço padrão', pool: 'terraço com piscina' },
      glazing: { panoramic: 'envidraçado panorâmico', sliding: 'parede de vidro deslizante' },
    },
    th: {
      finish: { warm: 'ขาวอบอุ่น', graphite: 'กราไฟต์', natural: 'ไม้โอ๊กธรรมชาติ' },
      hamam: { none: 'ไม่มีสปา', snow: 'สปาขาวหิมะ', warm: 'สปาหินโทนอุ่น' },
      terrace: { std: 'ระเบียงมาตรฐาน', pool: 'ระเบียงพร้อมสระว่ายน้ำ' },
      glazing: { panoramic: 'กระจกพาโนรามา', sliding: 'ผนังกระจกบานเลื่อน' },
    },
  })[LANG];
  // Подписи обвязки сцены. ⛔ 20.08: до этой правки на сцене не было НИ ОДНОГО
  // слова о том, что можно сделать и что поменялось, — оператор жал кнопки справа
  // и не понимал, меняется ли хоть что-нибудь.
  var UI = ({
    ru: { viewT: 'Ракурс', roomT: 'Где стоим',
          hintExt: 'Тяните — дом поворачивается в любую сторону · колесо — ближе и дальше · точки на доме открывают детали',
          hintInt: 'Тяните — оглядеться вокруг себя · колесо — шире или уже кадр · кнопки внизу переставляют вас по дому',
          hintExtS: 'Тяните — дом поворачивается', hintIntS: 'Тяните — оглядеться вокруг себя',
          sum: 'Ваш дом', show: 'Смотрите: ', free: 'Свободный обзор',
          plan3d: 'открыть в 3D' },
    en: { viewT: 'View', roomT: 'You stand',
          hintExt: 'Drag — the house turns any way you like · wheel — closer and farther · dots on the house open details',
          hintInt: 'Drag — look around you · wheel — wider or tighter frame · buttons below move you through the house',
          hintExtS: 'Drag to turn the house', hintIntS: 'Drag to look around',
          sum: 'Your home', show: 'Look: ', free: 'Free look',
          plan3d: 'open in 3D' },
    es: { viewT: 'Ángulo', roomT: 'Usted está',
          hintExt: 'Arrastre — la casa gira en cualquier dirección · rueda — más cerca y más lejos · los puntos abren detalles',
          hintInt: 'Arrastre — mire a su alrededor · rueda — encuadre más amplio o cerrado · los botones le mueven por la casa',
          hintExtS: 'Arrastre para girar la casa', hintIntS: 'Arrastre para mirar alrededor',
          sum: 'Su casa', show: 'Mire: ', free: 'Vista libre',
          plan3d: 'ver en 3D' },
    pt: { viewT: 'Ângulo', roomT: 'Está aqui',
          hintExt: 'Arraste — a casa gira em qualquer direção · roda — mais perto e mais longe · os pontos abrem detalhes',
          hintInt: 'Arraste — olhe à sua volta · roda — enquadramento mais amplo ou fechado · os botões movem-no pela casa',
          hintExtS: 'Arraste para girar a casa', hintIntS: 'Arraste para olhar à volta',
          sum: 'A sua casa', show: 'Veja: ', free: 'Vista livre',
          plan3d: 'ver em 3D' },
    th: { viewT: 'มุมมอง', roomT: 'จุดที่ยืน',
          hintExt: 'ลากเพื่อหมุนบ้านได้ทุกทิศ · เลื่อนล้อเพื่อเข้าใกล้หรือถอยห่าง · จุดบนบ้านเปิดรายละเอียด',
          hintInt: 'ลากเพื่อมองไปรอบตัว · เลื่อนล้อเพื่อปรับมุมกล้อง · ปุ่มด้านล่างพาคุณย้ายจุดยืน',
          hintExtS: 'ลากเพื่อหมุนบ้าน', hintIntS: 'ลากเพื่อมองรอบตัว',
          sum: 'บ้านของคุณ', show: 'ดูตรงนี้: ', free: 'มองอิสระ',
          plan3d: 'เปิดใน 3D' },
  })[LANG];
  var cfg = { finish: 'warm', bedrooms: 4, hamam: 'none', terrace: 'std', glazing: 'panoramic' };

  /** «4 спальни» на языке страницы — нужно и в сводке, и в подсказке об изменении. */
  function bedsWord(n) {
    if (LANG === 'ru') return n + ' ' + (n === 5 ? 'спален' : 'спальни');
    return n + ({ es: ' dormitorios', pt: ' quartos', th: ' ห้องนอน', en: ' bedrooms' })[LANG];
  }

  function money() {
    var P = PRICES[LANG];
    return P.base + P.finish[cfg.finish] + P.bedrooms[cfg.bedrooms] + P.hamam[cfg.hamam]
         + P.terrace[cfg.terrace] + P.glazing[cfg.glazing];
  }
  function area() { return PRICE.area + AREA.bedrooms[cfg.bedrooms] + AREA.hamam[cfg.hamam]; }
  function phrase() {
    var beds = bedsWord(cfg.bedrooms);
    return [WORDS.finish[cfg.finish], beds, WORDS.hamam[cfg.hamam],
      cfg.terrace === 'pool' ? WORDS.terrace.pool : null,
      cfg.glazing === 'sliding' ? WORDS.glazing.sliding : null].filter(Boolean).join(' · ');
  }
  function priceStr() {
    var v = money();
    if (LANG === 'ru') return 'от ' + v + ' млн ₽';
    if (LANG === 'es') return 'desde ' + v + '.000 €';   // v — целые тысячи евро (< 1000)
    if (LANG === 'pt') return 'desde ' + v + '.000 €';
    if (LANG === 'th') return 'เริ่มต้น ' + (Math.round(v * 10) / 10) + ' ล้านบาท';
    if (v < 1000) return 'from $' + v + 'K';             // en: тысячи долларов
    return 'from $' + (v / 1000).toFixed(2).replace(/0$/, '').replace(/\.0$/, '') + 'M';
  }

  var MSG = ({
    ru: {
      sqm: ' м²', yourHome: 'Ваш дом: ', seeLive: 'посмотреть вживую →', close: 'Закрыть',
      menu: 'Меню',
      nameErr: 'Напишите, как к вам обращаться',
      phoneErr: 'Нужен номер телефона — перезвоним на него',
      ok: ', записали. Перезвоним в рабочее время и подтвердим день показа. ',
      sending: 'Отправляем…',
      sendErr: 'Заявка не ушла. Позвоните или напишите нам напрямую — телефон ниже.',
    },
    en: {
      sqm: ' m²', yourHome: 'Your home: ', seeLive: 'see it in person →', close: 'Close',
      menu: 'Menu',
      nameErr: 'Please tell us your name',
      phoneErr: 'We need a phone number so we can call you back',
      ok: ', you are booked. We will call back during business hours to confirm the day. ',
      sending: 'Sending…',
      sendErr: 'The request did not go through. Please call or write to us directly.',
    },
    es: {
      sqm: ' m²', yourHome: 'Su casa: ', seeLive: 'verlo en persona →', close: 'Cerrar',
      menu: 'Menú',
      nameErr: 'Díganos su nombre, por favor',
      phoneErr: 'Necesitamos un teléfono para devolverle la llamada',
      ok: ', reservado. Le llamaremos en horario laboral para confirmar el día. ',
      sending: 'Enviando…',
      sendErr: 'La solicitud no se envió. Llámenos o escríbanos directamente.',
    },
    pt: {
      sqm: ' m²', yourHome: 'A sua casa: ', seeLive: 'ver ao vivo →', close: 'Fechar',
      menu: 'Menu',
      nameErr: 'Diga-nos o seu nome, por favor',
      phoneErr: 'Precisamos de um telefone para lhe ligar de volta',
      ok: ', reservado. Ligamos-lhe em horário de expediente para confirmar o dia. ',
      sending: 'A enviar…',
      sendErr: 'O pedido não foi enviado. Ligue ou escreva-nos diretamente.',
    },
    th: {
      sqm: ' ตร.ม.', yourHome: 'บ้านของคุณ: ', seeLive: 'มาดูของจริง →', close: 'ปิด',
      menu: 'เมนู',
      nameErr: 'กรุณาบอกชื่อของคุณ',
      phoneErr: 'กรุณากรอกเบอร์โทร เพื่อให้เราติดต่อกลับ',
      ok: ' — จองเรียบร้อยแล้ว เราจะโทรกลับในเวลาทำการเพื่อยืนยันวันนัด ',
      sending: 'กำลังส่ง…',
      sendErr: 'ส่งคำขอไม่สำเร็จ กรุณาโทรหรือติดต่อเราโดยตรง',
    },
  })[LANG];

  function paint() {
    var t = phrase();
    var p = priceStr();
    var po = $('#priceOut'), co = $('#configOut'), fs = $('#formSummary');
    if (po) po.textContent = p;
    if (co) co.textContent = t + ' · ' + area() + MSG.sqm;
    // Конфигурация уезжает в форму и держится там до конца, а не сбрасывается на входе
    if (fs) fs.textContent = MSG.yourHome + t + ' — ' + p;
  }

  /* ══════════════ 3. ЖИВОЙ 3D ══════════════ */
  var EXT = null, INT = null, mode = 'ext';
  var HS_TEXT = ({
    ru: {
      water: ['Своя вода', 'Частный выход к озеру и пирс. Купаться и на sup — с порога, без соседей на берегу.'],
      security: ['40 минут + охрана', '40 минут до делового центра, закрытый периметр и охрана 24/7. Город близко, суета — нет.'],
      smart: ['Ноль пультов', 'Свет и музыка подстраиваются под сценарий дня сами. Динамики и датчики зашиты в стены — их не видно.'],
      glass: ['Стекло-хамелеон', 'Затемняется по кнопке от солнца и чужих глаз, держит тепло — панорама без штор и без перегрева.'],
    },
    en: {
      water: ['Your own water', 'A private waterfront and pier. Swim or paddle out right from your doorstep — no neighbours on the shore.'],
      security: ['40 minutes + security', 'The business district is 40 minutes away; the perimeter is closed and guarded 24/7. The city is close — the noise is not.'],
      smart: ['Zero remotes', 'Light and music follow the rhythm of your day on their own. Speakers and sensors are built into the walls — you never see them.'],
      glass: ['Chameleon glass', 'Tints at the touch of a button against sun and prying eyes, and keeps the heat in — a panorama without curtains or overheating.'],
    },
    es: {
      water: ['Agua propia', 'Salida privada al lago y muelle propio. Bañarse o salir en sup desde la puerta — sin vecinos en la orilla.'],
      security: ['40 minutos + seguridad', 'El distrito financiero queda a 40 minutos; el perímetro es cerrado y está vigilado 24/7. La ciudad está cerca — el ruido, no.'],
      smart: ['Cero mandos', 'La luz y la música siguen solas el guion del día. Los altavoces y sensores van empotrados en las paredes — no se ven.'],
      glass: ['Cristal camaleón', 'Se oscurece con un botón frente al sol y las miradas, y conserva el calor — panorámica sin cortinas y sin sobrecalentarse.'],
    },
    pt: {
      water: ['Água própria', 'Acesso privado ao lago e cais próprio. Nadar ou sair de sup a partir da porta — sem vizinhos na margem.'],
      security: ['40 minutos + segurança', 'O centro de negócios fica a 40 minutos; o perímetro é fechado e vigiado 24/7. A cidade está perto — o ruído, não.'],
      smart: ['Zero comandos', 'A luz e a música seguem sozinhas o guião do dia. As colunas e os sensores estão embutidos nas paredes — não se veem.'],
      glass: ['Vidro camaleão', 'Escurece com um botão contra o sol e os olhares, e retém o calor — panorâmica sem cortinas e sem sobreaquecer.'],
    },
    th: {
      water: ['น้ำเป็นของคุณ', 'ทางลงทะเลสาบส่วนตัวพร้อมท่าเรือ ว่ายน้ำหรือพายซัพได้จากหน้าบ้าน — ไม่มีเพื่อนบ้านริมฝั่ง'],
      security: ['40 นาที + รปภ.', 'ย่านธุรกิจอยู่ห่าง 40 นาที รั้วรอบขอบชิดพร้อม รปภ. 24/7 เมืองอยู่ใกล้ แต่ความวุ่นวายไม่ตามมา'],
      smart: ['ไม่ต้องใช้รีโมต', 'แสงและเสียงเพลงปรับตามจังหวะของวันเอง ลำโพงและเซนเซอร์ฝังอยู่ในผนัง — มองไม่เห็นเลย'],
      glass: ['กระจกคาเมเลี่ยน', 'กดปุ่มเดียวเพื่อกันแดดและสายตา พร้อมเก็บความอบอุ่น — วิวพาโนรามาไร้ม่าน ไม่ร้อนเกิน'],
    },
  })[LANG];

  function initStudio() {
    var studio = $('#studio3d'), canvas = $('#stageCanvas'), stage = $('#stage');
    if (!studio || !canvas) return;
    // Ветку отказа надо ЗАПУСКАТЬ, а не читать: фолбэк-стили живут в CSS секции,
    // а не за классом из функции, которую можно удалить рефакторингом.
    if (!window.AV3D || !window.AV3D.webglOK()) { studio.classList.add('is-fallback'); return; }

    var marks = {};
    Object.keys(HS_TEXT).forEach(function (id) {
      var b = document.createElement('button');
      b.className = 'hs'; b.type = 'button';
      b.setAttribute('aria-expanded', 'false');
      b.setAttribute('aria-label', HS_TEXT[id][0]);
      b.style.position = 'absolute'; b.style.display = 'none';
      b.addEventListener('click', function () { openCard(id, b); });
      stage.appendChild(b); marks[id] = b;
    });

    var card = null;
    function openCard(id, btn) {
      closeCard();
      var t = HS_TEXT[id];
      card = document.createElement('div');
      card.className = 'hs-card';
      // Заголовок карточки — h3 внутри секции с h2: пропуска уровня нет.
      // Строится в JS, поэтому в слепок структуры не попадает — закрыто axe и smoke.
      var h = document.createElement('h3'); h.textContent = t[0];
      var p = document.createElement('p'); p.textContent = t[1];
      var a = document.createElement('a'); a.href = '#zayavka';
      a.textContent = MSG.seeLive;
      var x = document.createElement('button');
      x.type = 'button'; x.className = 'hs-x'; x.setAttribute('aria-label', MSG.close);
      x.textContent = '×';
      x.addEventListener('click', function (e) { e.stopPropagation(); closeCard(); });
      card.appendChild(x); card.appendChild(h); card.appendChild(p); card.appendChild(a);
      var x = parseFloat(btn.style.left) || 0, y = parseFloat(btn.style.top) || 0;
      card.style.left = Math.max(12, Math.min(stage.clientWidth - 340, x - 160)) + 'px';
      card.style.top = Math.max(12, y + 26) + 'px';
      stage.appendChild(card);
      btn.setAttribute('aria-expanded', 'true');
      a.focus();
    }
    function closeCard() {
      if (card) { card.remove(); card = null; }
      Object.keys(marks).forEach(function (k) { marks[k].setAttribute('aria-expanded', 'false'); });
    }
    stage.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCard(); });
    canvas.addEventListener('click', closeCard);

    // Плашка «что сейчас изменилось». Без неё половина опций конфигуратора двигает
    // деталь на дальнем краю дома, и нажатие выглядит как «ничего не произошло».
    var toastEl = document.createElement('div');
    toastEl.className = 'toast3d';
    toastEl.setAttribute('role', 'status');
    stage.appendChild(toastEl);
    var toastT = 0;
    function toast(text) {
      toastEl.textContent = text;
      toastEl.classList.add('on');
      if (toastT) clearTimeout(toastT);
      toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2800);
    }
    // wireSwatches() живёт вне initStudio (кнопки работают и без WebGL) — отдаём
    // ему тост ссылкой, а не тащим весь конфигуратор внутрь сцены.
    window.__cfgToast = toast;

    function mkExt() {
      var e = window.AV3D.createExterior(canvas, { onHotspots: function (list) {
        if (mode !== 'ext') return;
        list.forEach(function (h) {
          var b = marks[h.id]; if (!b) return;
          b.style.display = h.visible ? 'block' : 'none';
          b.style.left = h.x + 'px'; b.style.top = h.y + 'px';
        });
      } });
      e.applyConfig(cfg, { instant: true });
      // Ручное вращение снимает отметку с кнопки ракурса: подсвеченная кнопка
      // при уже уведённой камере врёт сильнее, чем отсутствие подсветки.
      e.controls.addEventListener('start', function () {
        $$('#viewBar .sw').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      });
      return e;
    }

    EXT = mkExt();

    var tabE = $('#tab-ext'), tabI = $('#tab-int'), hint = $('#roomHint');
    var stageHint = $('#stageHint');

    /* ── ГДЕ ЖИВЁТ ПАНЕЛЬ РАКУРСОВ ──
       ⛔ УРОК 21.08. Оператор с телефона: «кнопки съедают часть окна, где можно
       вертеть дом; само окно тоже маленькое, и из-за кнопок вообще ничего не видно».
       Так и было: на 390 × 844 сцена 359 × 244, а пилюли лежали поверх неё и
       закрывали нижние 36 px — седьмую часть кадра, ровно ту, где палуба и вода.
       На широком экране кадр большой, и пилюли поверх него — нормальный приём.
       Поэтому панель НЕ переехала совсем, а переезжает по ширине окна: до 760 px
       она отдельная строка ПОД сценой (#viewHost), шире — накладка внутри сцены. */
    var mqPhone = matchMedia('(max-width:760px)');
    var viewHost = $('#viewHost');
    function barHome() { return (mqPhone.matches && viewHost) ? viewHost : stage; }
    function reHome() {
      var bar = $('#viewBar');
      if (bar && bar.parentNode !== barHome()) barHome().appendChild(bar);
      if (stageHint) {
        stageHint.textContent = hintText(mode === 'int' ? 'hintInt' : 'hintExt');
      }
    }
    if (mqPhone.addEventListener) mqPhone.addEventListener('change', reHome);
    else if (mqPhone.addListener) mqPhone.addListener(reHome);

    /** Панель точек съёмки внизу сцены. Одна и та же и для дома, и для комнат:
        «покрутить мышью» даёт соседние ракурсы, а продают дом заранее выбранные. */
    function buildBar(title, items, pick, activeIdx) {
      var old = $('#viewBar'); if (old) old.remove();
      var bar = document.createElement('div');
      bar.id = 'viewBar';
      bar.className = 'stage-bar';
      var cap = document.createElement('span');
      cap.className = 'stage-bar__t';
      cap.textContent = title;
      bar.appendChild(cap);
      items.forEach(function (v, i) {
        var b = document.createElement('button');
        b.className = 'sw'; b.type = 'button';
        b.textContent = v.label;
        b.setAttribute('aria-pressed', String(i === activeIdx));
        b.addEventListener('click', function () {
          pick(v);
          $$('#viewBar .sw').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          // На телефоне панель ракурсов — одна прокручиваемая строка: нажатую пилюлю
          // подводим в кадр, иначе после выбора она уезжает за край и не видно, где ты.
          if (b.scrollIntoView) b.scrollIntoView({ inline: 'center', block: 'nearest' });
          toast(v.label);
        });
        bar.appendChild(b);
      });
      barHome().appendChild(bar);
      return bar;
    }
    /* Активной остаётся ТА ЖЕ точка, если она пережила смену конфигурации:
       список ракурсов меняется на лету (бассейн включили — кнопка появилась),
       и терять при этом текущий ракурс невежливо. */
    var activeView = null;
    /* На телефоне подсказка — ОДНА строка: длинная в две строки съедала 50 px кадра,
       а колеса мыши на телефоне нет вовсе. Текст берётся из тех же словарей. */
    function hintText(k) {
      return (mqPhone.matches && UI[k + 'S']) ? UI[k + 'S'] : UI[k];
    }
    function extBar() {
      var items = EXT.viewList();
      var i = items.map(function (v) { return v.id; }).indexOf(activeView);
      buildBar(UI.viewT, items, function (v) { activeView = v.id; EXT.goTo(v.id); },
               i < 0 ? 0 : i);
      if (stageHint) stageHint.textContent = hintText('hintExt');
    }
    function intBar() {
      var items = INT.viewList();
      var i = items.map(function (v) { return v.id; }).indexOf(activeView);
      buildBar(UI.roomT, items, function (v) {
        activeView = v.id;
        INT.goTo(v.id);
        hint.textContent = v.label;
      }, i < 0 ? 0 : i);
      if (stageHint) stageHint.textContent = hintText('hintInt');
    }
    /* Панель пересобирается на каждое нажатие конфигуратора: у «Бассейна» и «Спа»
       кнопки нет, пока опция выключена — она вела бы в пустое место на палубе. */
    function rebuildBar() { if (mode === 'int' && INT) intBar(); else if (EXT) extBar(); }
    document.addEventListener('cfg:change', function (e) {
      var k = e.detail && e.detail.k;
      if (k === 'terrace' || k === 'hamam') rebuildBar();
    });

    function setMode(m) {
      if (m === mode) return;
      closeCard();
      mode = m;
      tabE.setAttribute('aria-selected', String(m === 'ext'));
      tabI.setAttribute('aria-selected', String(m === 'int'));
      Object.keys(marks).forEach(function (k) { marks[k].style.display = 'none'; });
      if (m === 'int') {
        if (EXT) EXT.stop();
        EXT = null;
        INT = window.AV3D.createInterior(canvas, {});
        INT.applyConfig(cfg);
        hint.textContent = INT.views[0].label;
        intBar();
      } else {
        if (INT) INT.stop();
        INT = null;
        hint.textContent = '';
        EXT = mkExt();
        extBar();
      }
    }
    tabE.addEventListener('click', function () { setMode('ext'); });
    tabI.addEventListener('click', function () { setMode('int'); });
    extBar();

    goInside = function (id) {
      setMode('int');
      if (!INT) return;
      var v = INT.goTo(id);
      activeView = v.id;
      hint.textContent = v.label;
      var i = INT.viewList().map(function (x) { return x.id; }).indexOf(id);
      $$('#viewBar .sw').forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
      toast(v.label);
    };

    // Детерминированная остановка автодрейфа для скрин-харнесса: без неё два прогона
    // одного и того же билда дают 19% изменённых пикселей и вы чините несуществующий баг.
    window.__freeze3d = function () { if (EXT) EXT.freeze(); };
    window.__pause3d = function () { if (EXT) EXT.pause(); if (INT) INT.pause(); };
    // Обратный ход к __pause3d: снимок серии ракурсов иначе требует перезагрузки
    // страницы на каждый кадр (page.screenshot ждёт стабильной картинки).
    window.__resume3d = function () { if (EXT) EXT.resume(); if (INT) INT.resume(); };
    window.__scene3d = function () { return { mode: mode, ready: !!(EXT || INT) }; };
  }

  /* Мост «план → сцена»: клик по комнате на чертеже переводит сцену внутрь и ставит
     зрителя в эту комнату. Ссылку выставляет initStudio, когда сцена реально поднята;
     до этого клик по плану просто доводит до раздела 3D. */
  var goInside = null;

  function wireSwatches() {
    $$('.sw[data-k]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.k, v = b.dataset.v;
        cfg[k] = (k === 'bedrooms') ? parseInt(v, 10) : v;
        $$('.sw[data-k="' + k + '"]').forEach(function (x) {
          x.setAttribute('aria-pressed', String(x === b));
        });
        paint();
        if (EXT) EXT.applyConfig(cfg);
        if (INT) INT.applyConfig(cfg);
        // Сказать словами, что поменялось, и показать ГДЕ: focus() подводит камеру
        // только если изменённая часть сейчас за кадром, и в любом случае даёт
        // вспышку-кольцо на месте изменения.
        var word = (k === 'bedrooms') ? bedsWord(cfg.bedrooms)
                                      : (WORDS[k] && WORDS[k][cfg[k]]);
        if (window.__cfgToast && word) window.__cfgToast(UI.show + word);
        if (EXT && EXT.focus) EXT.focus(k);
        // раздел «Планировка» пересобирает лист под новое состояние
        document.dispatchEvent(new CustomEvent('cfg:change', { detail: { k: k } }));
      });
    });
  }

  /* ══════════════ 5. ПЛАНИРОВКА ══════════════ */
  /* Раздел показывает НАШ поэтажный чертёж и слушает конфигуратор.
     Двенадцать состояний (спальни 2/4/5 × спа × бассейн) нарисованы заранее кодом —
     bin/gen_plans_web.py. Метраж уровня на листе и число в панели цены считаются из
     одной таблицы, и bin/check_plans.py валит сборку, если они разойдутся.
     ⚠️ Лист приходит БЕЗ экспликации и без шапки: имя комнаты, впечатанное в SVG,
     на ширине колонки даёт 8–9 px и читается текстурой. Экспликация строится здесь
     из plans.json — теми же номерами, что стоят на чертеже, потому что и номера,
     и строки отдаёт один и тот же проход генератора. */
  var PLAN_V = '5516d28b';   // хэш набора листов; подставляет bin/build_assets.py
  // Комнаты, в которые действительно можно ВСТАТЬ в живом 3D. Остальные только
  // подсвечиваются: кнопка, обещающая вид и никуда не ведущая, хуже отсутствующей.
  // ⚠️ 21.08: палуба сюда входила и раньше, но её группы не было в SVG — клик по ней
  // не работал вовсе (см. open_gid в bin/gen_plans.py). Бассейн и купель добавлены
  // вместе с точками обзора в сцене: обе живут только при включённой опции, и на
  // плане их тоже нет, когда опция выключена, — список и чертёж не расходятся.
  var PLAN_3D = { kitchen: 'kitchen', dining: 'dining', living: 'living',
                  deck: 'deck', gallery: 'gallery', pool: 'pool', tub: 'tub' };
  var PLAN_ZOOM = [1, 1.6, 2.4, 3.6];

  function initPlan() {
    var fig = $('#planFig'); if (!fig) return;
    var sheet = $('#planSheet'), rowsEl = $('#planRows'), tip = $('#planTip');
    var subEl = $('#planSub'), areaEl = $('#planArea'), zoomBtn = $('#planZoom');
    var tabs = $$('.ptab', fig);
    var data = null, level = 1, zi = 0, keepY = 0, seq = 0, cache = {};

    /* Ключ состояния конфигуратора → имя файла. Отделка и остекление на план не
       влияют, и мы не делаем вид, что влияют. */
    function key() {
      return 'b' + cfg.bedrooms + (cfg.hamam !== 'none' ? '-spa' : '')
                 + (cfg.terrace === 'pool' ? '-pool' : '');
    }
    function url(lvl) {
      return ASSETS + 'plans/' + LANG + '/level' + lvl + '-' + key() + '-d.svg?v=' + PLAN_V;
    }
    function fetchSheet(u) {
      if (!cache[u]) {
        cache[u] = fetch(u).then(function (r) {
          if (!r.ok) throw new Error('нет листа');
          return r.text();
        });
      }
      return cache[u];
    }
    function rowFor(k) {
      return $$('li', rowsEl).filter(function (li) {
        return (li.dataset.keys || '').split(' ').indexOf(k) >= 0;
      })[0];
    }

    function paintRows(s) {
      rowsEl.textContent = '';
      (s.rows || []).forEach(function (r) {
        var li = document.createElement('li');
        var live = r.keys.some(function (k) { return !!PLAN_3D[k]; });
        li.dataset.keys = r.keys.join(' ');
        li.className = (r.out ? 'is-out' : '') + (live ? ' is-live' : '');
        if (live) { li.tabIndex = 0; li.setAttribute('role', 'button'); }
        var b = document.createElement('b'); b.textContent = r.n;
        var sp = document.createElement('span'); sp.textContent = r.name;
        var i = document.createElement('i'); i.textContent = r.out ? '(' + r.t + ')' : r.t;
        li.appendChild(b); li.appendChild(sp); li.appendChild(i);
        rowsEl.appendChild(li);
      });
    }

    function render(lvl) {
      level = lvl;
      tabs.forEach(function (t) {
        var on = parseInt(t.dataset.level, 10) === lvl;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      if (data) {
        var L = data.levels[String(lvl)], s = data.sheets[lvl + '-' + key()];
        if (L) {
          subEl.textContent = L.sub;
          sheet.setAttribute('aria-label', L.title + ' · LAKE HOUSE');
        }
        // s.area — уже целое, раздано так, чтобы два уровня складывались
        // в число панели цены (bin/gen_plans_web.py, level_ints)
        if (s) { areaEl.textContent = s.area; paintRows(s); }
      }
      // Ссылка на ПЕЧАТНЫЙ лист: тот же чертёж, но со своей шапкой, экспликацией
      // колонкой и масштабной линейкой — это и есть артефакт альбома.
      var fs = $('#planFullSheet');
      if (fs) fs.href = ASSETS + 'plans/' + LANG + '/level' + lvl + '-' + key()
                      + '.svg?v=' + PLAN_V;
      var my = ++seq, u = url(lvl);
      fig.classList.add('is-swap');
      fetchSheet(u).then(function (txt) {
        if (my !== seq) return;                  // пока грузили — переключили ещё раз
        sheet.innerHTML = txt;
        fig.classList.remove('is-swap');
      }).catch(function () {
        if (my !== seq) return;
        // Чертёж важнее эффектов: не смогли вставить инлайном — показываем картинкой,
        // подсветка и подсказка при этом просто не работают.
        sheet.innerHTML = '';
        var im = new Image(); im.src = u; im.alt = '';
        sheet.appendChild(im);
        fig.classList.remove('is-swap');
      });
    }

    /** Подсветить комнату на чертеже и её строку в экспликации. */
    function lit(keys) {
      $$('.pl-room', sheet).forEach(function (g) {
        g.classList.toggle('is-on', keys.indexOf(g.getAttribute('data-room')) >= 0);
      });
      $$('li', rowsEl).forEach(function (li) {
        var ks = (li.dataset.keys || '').split(' ');
        li.classList.toggle('is-on', keys.some(function (k) { return ks.indexOf(k) >= 0; }));
      });
    }
    function clearLit() { lit([]); tip.hidden = true; tip.dataset.room = ''; }

    function enter3d(k) {
      var id = PLAN_3D[k];
      if (!id) return;
      var st = document.getElementById('studio');
      if (st) st.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
      if (fig.classList.contains('is-full')) full(false);
      setTimeout(function () { if (goInside) goInside(id); }, REDUCED ? 0 : 420);
    }

    /* ── наведение по чертежу (мышь): подсветка + плашка с именем и площадью ── */
    sheet.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var g = e.target.closest ? e.target.closest('.pl-room') : null;
      if (!g) { clearLit(); return; }
      var k = g.getAttribute('data-room'), li = rowFor(k);
      lit([k]);
      if (!li) { tip.hidden = true; return; }
      if (tip.dataset.room !== k) {
        tip.dataset.room = k;
        tip.textContent = li.querySelector('span').textContent;
        var em = document.createElement('i');
        em.textContent = li.querySelector('i').textContent + ' ' + (data ? data.sqm : '')
                       + (PLAN_3D[k] ? ' · ' + UI.plan3d : '');
        tip.appendChild(em);
        // ⚠️ Плашка прибита к САМОЙ КОМНАТЕ, а не летает за курсором: пока курсор
        // ходит внутри одной комнаты, она стоит неподвижно. Плашка, дрожащая за
        // мышью, — второй канал обратной связи поверх подсветки строки, и вместе
        // они дают мельтешение при проводке по плану.
        // Живёт в .plan (он position:relative, а в развороте fixed), а не в
        // прокручиваемом кадре — иначе уезжает вместе с содержимым.
        var r = fig.getBoundingClientRect(), gr = g.getBoundingClientRect();
        tip.style.left = ((gr.left + gr.right) / 2 - r.left) + 'px';
        tip.style.top = (gr.top - r.top + 4) + 'px';
        tip.hidden = false;
      }
      g.style.cursor = PLAN_3D[k] ? 'pointer' : 'default';
    });
    sheet.addEventListener('pointerleave', clearLit);
    sheet.addEventListener('click', function (e) {
      // Пальцем чертёж не прочитать: тап по нему открывает разворот, а не 3D.
      if (matchMedia('(hover:none)').matches) {
        if (!fig.classList.contains('is-full')) full(true);
        return;
      }
      var g = e.target.closest ? e.target.closest('.pl-room') : null;
      if (g) enter3d(g.getAttribute('data-room'));
    });

    /* ── экспликация: наведение подсвечивает комнату, клик уводит в 3D ── */
    rowsEl.addEventListener('pointerover', function (e) {
      var li = e.target.closest('li'); if (!li) return;
      lit((li.dataset.keys || '').split(' '));
    });
    rowsEl.addEventListener('pointerleave', function () { lit([]); });
    rowsEl.addEventListener('click', function (e) {
      var li = e.target.closest('li'); if (!li) return;
      (li.dataset.keys || '').split(' ').forEach(function (k) { if (PLAN_3D[k]) enter3d(k); });
    });
    rowsEl.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var li = e.target.closest('li'); if (!li || !li.classList.contains('is-live')) return;
      e.preventDefault();
      (li.dataset.keys || '').split(' ').forEach(function (k) { if (PLAN_3D[k]) enter3d(k); });
    });
    rowsEl.addEventListener('focusin', function (e) {
      var li = e.target.closest('li'); if (li) lit((li.dataset.keys || '').split(' '));
    });

    /* ── уровни ── */
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { render(parseInt(t.dataset.level, 10)); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : (e.key === 'ArrowLeft' ? -1 : 0);
        if (!d) return;
        e.preventDefault();
        var n = tabs[(i + d + tabs.length) % tabs.length];
        n.focus();
        render(parseInt(n.dataset.level, 10));
      });
    });

    /* ── конфигуратор → план. Связь односторонняя и без единой новой кнопки. ── */
    document.addEventListener('cfg:change', function (e) {
      var k = e.detail && e.detail.k;
      if (k !== 'bedrooms' && k !== 'hamam' && k !== 'terrace') return;
      render(level);
    });

    /* ── лист во весь экран: единственный способ прочитать чертёж на телефоне ── */
    /* Довести прокрутку кадра так, чтобы ДОМ оказался посередине. Лист заметно
       больше дома (он вмещает и спа-крыло, и консоль пятой спальни), и без этого
       разворот открывается на пустой бумаге. */
    function centerSheet() {
      var rooms = $$('.pl-room', sheet);
      if (!rooms.length) return;
      var sr = sheet.getBoundingClientRect();
      var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      rooms.forEach(function (g) {
        var r = g.getBoundingClientRect();
        if (!r.width && !r.height) return;
        x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top);
        x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom);
      });
      if (x0 === Infinity) return;
      sheet.scrollLeft += (x0 + x1) / 2 - (sr.left + sr.right) / 2;
      sheet.scrollTop += (y0 + y1) / 2 - (sr.top + sr.bottom) / 2;
    }
    /* ── УВЕЛИЧЕНИЕ ЧЕРТЕЖА ──
       Масштаб непрерывный (`zoom`), ступени −/+ просто перескакивают по PLAN_ZOOM.
       Так надо потому, что браузерный пинч внутри разворота ОТКЛЮЧЁН (touch-action
       в CSS): он ломал position:fixed и после него не нажималась «Свернуть».
       Пинч теперь свой и двигает тот же `zoom`, поэтому увеличивать пальцами
       по-прежнему можно — и страница при этом остаётся на месте. */
    var zoom = 1;
    function setZoom(z, anchor) {
      z = Math.max(1, Math.min(PLAN_ZOOM[PLAN_ZOOM.length - 1], z));
      var prev = zoom;
      zoom = z;
      fig.style.setProperty('--pz', z);
      var lbl = $('#planZoomVal'); if (lbl) lbl.textContent = Math.round(z * 100) + '%';
      // Точка щипка обязана остаться под пальцами: пересчитываем прокрутку кадра
      // в долях содержимого, иначе чертёж уезжает из-под руки на каждом шаге.
      if (anchor && sheet.clientWidth) {
        var W0 = sheet.clientWidth * prev, H0 = sheet.scrollHeight;
        var ux = (sheet.scrollLeft + anchor.x) / Math.max(1, W0);
        var uy = (sheet.scrollTop + anchor.y) / Math.max(1, H0);
        requestAnimationFrame(function () {
          sheet.scrollLeft = ux * sheet.clientWidth * zoom - anchor.x;
          sheet.scrollTop = uy * sheet.scrollHeight - anchor.y;
        });
      } else if (fig.classList.contains('is-full')) {
        requestAnimationFrame(centerSheet);
      }
    }
    function zoomTo(i) {
      zi = Math.max(0, Math.min(PLAN_ZOOM.length - 1, i));
      setZoom(PLAN_ZOOM[zi]);
    }
    /** Ступень вверх/вниз ОТ ТЕКУЩЕГО масштаба: после пинча он уже не совпадает
        ни с одной ступенью, и шаг по индексу прыгал бы через два деления. */
    function step(dir) {
      var i;
      if (dir > 0) {
        for (i = 0; i < PLAN_ZOOM.length; i++) if (PLAN_ZOOM[i] > zoom + 0.01) break;
        zoomTo(Math.min(i, PLAN_ZOOM.length - 1));
      } else {
        for (i = PLAN_ZOOM.length - 1; i >= 0; i--) if (PLAN_ZOOM[i] < zoom - 0.01) break;
        zoomTo(Math.max(i, 0));
      }
    }
    function full(on) {
      if (on === fig.classList.contains('is-full')) return;
      if (on) {
        keepY = window.scrollY;
        fig.classList.add('is-full');
        document.documentElement.style.overflow = 'hidden';
        // на узком экране сразу ставим ступень, на которой чертёж читается
        var i = 0;
        while (i < PLAN_ZOOM.length - 1 && innerWidth * PLAN_ZOOM[i] < 1100) i++;
        zoomTo(i);
        requestAnimationFrame(function () { requestAnimationFrame(centerSheet); });
        if (window.__pause3d) window.__pause3d();
      } else {
        fig.classList.remove('is-full');
        document.documentElement.style.overflow = '';
        window.scrollTo(0, keepY);
        zoomTo(0);
        // Свёрнутый лист обязан вернуться в исходное положение: остаточная
        // прокрутка кадра после разворота показывала бы кусок чертежа.
        sheet.scrollLeft = 0; sheet.scrollTop = 0;
        pinch = null; pts = {};
        if (window.__resume3d) window.__resume3d();
      }
      zoomBtn.setAttribute('aria-expanded', String(on));
      clearLit();
    }
    /* ⚠️ Кнопка слушает И click, И pointerup. Один тап приносит оба события, и
       второе гасится окном в 400 мс; зато если какое-то из них до кнопки не дойдёт
       (ровно это и случилось у оператора после браузерного пинча), останется второе. */
    var lastToggle = 0;
    function toggleFull(e) {
      var t = Date.now();
      if (t - lastToggle < 400) return;
      lastToggle = t;
      if (e && e.type === 'pointerup') e.preventDefault();
      full(!fig.classList.contains('is-full'));
    }
    zoomBtn.addEventListener('click', toggleFull);
    zoomBtn.addEventListener('pointerup', toggleFull);
    $('#planZoomIn').addEventListener('click', function () { step(1); });
    $('#planZoomOut').addEventListener('click', function () { step(-1); });
    addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && fig.classList.contains('is-full')) full(false);
    });

    /* ── СВОЙ ПИНЧ ПО ЧЕРТЕЖУ ──
       Взамен браузерного, который отключён touch-action. Считаем расстояние между
       двумя пальцами и ведём им `zoom`; середина щипка остаётся под руками.
       Одним пальцем кадр по-прежнему таскается нативной прокруткой — её не трогаем. */
    var pts = {}, pinch = null;
    function pt(e) { return { x: e.clientX, y: e.clientY }; }
    sheet.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch' || !fig.classList.contains('is-full')) return;
      pts[e.pointerId] = pt(e);
      var ids = Object.keys(pts);
      if (ids.length !== 2) return;
      var a = pts[ids[0]], b = pts[ids[1]];
      pinch = { d0: Math.hypot(a.x - b.x, a.y - b.y), z0: zoom };
    });
    sheet.addEventListener('pointermove', function (e) {
      if (!pts[e.pointerId]) return;
      pts[e.pointerId] = pt(e);
      if (!pinch || !pinch.d0) return;
      var ids = Object.keys(pts);
      if (ids.length < 2) return;
      var a = pts[ids[0]], b = pts[ids[1]];
      var d = Math.hypot(a.x - b.x, a.y - b.y);
      if (!d) return;
      var r = sheet.getBoundingClientRect();
      setZoom(pinch.z0 * (d / pinch.d0),
              { x: (a.x + b.x) / 2 - r.left, y: (a.y + b.y) / 2 - r.top });
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) {
      sheet.addEventListener(t, function (e) {
        delete pts[e.pointerId];
        if (Object.keys(pts).length < 2) pinch = null;
      });
    });

    /* Секцию собираем, когда она подходит к экрану: два фетча и вставка SVG
       на загрузке страницы уехали бы прямо в TBT. */
    function mount() {
      fetch(ASSETS + 'plans/' + LANG + '/plans.json?v=' + PLAN_V)
        .then(function (r) { if (!r.ok) throw new Error('нет данных'); return r.json(); })
        .then(function (d) {
          data = d;
          $('#planExpl').textContent = d.expl;
          $('#planNote').textContent = d.note;
          $('#planSqm').textContent = d.sqm;
          render(1);
          fetchSheet(url(2));                    // второй уровень — фоном, заранее
        })
        .catch(function () { render(1); });      // без данных лист всё равно покажем
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es, o) {
        if (es.some(function (x) { return x.isIntersecting; })) { o.disconnect(); mount(); }
      }, { rootMargin: '200% 0px' }).observe(fig);
    } else {
      mount();
    }
  }

  /* ══════════════ 4. ФОРМА ══════════════ */
  function initForm() {
    var f = $('#leadForm'); if (!f) return;
    var submit = $('#formSubmit');
    var rules = {
      name: function (v) { return v.trim().length >= 2 ? '' : MSG.nameErr; },
      phone: function (v) {
        var d = v.replace(/\D/g, '');
        return d.length >= 10 ? '' : MSG.phoneErr;
      },
    };
    function check(show) {
      var ok = true;
      Object.keys(rules).forEach(function (name) {
        var input = f.elements[name];
        var msg = rules[name](input.value);
        var field = input.closest('.field');
        var err = $('#err-' + name);
        if (msg) ok = false;
        if (show) {
          if (err) err.textContent = msg;
          field.classList.toggle('bad', !!msg);
          input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        }
      });
      submit.disabled = !ok;
      return ok;
    }
    f.addEventListener('input', function () { check(false); });
    f.addEventListener('blur', function () { check(true); }, true);
    /* ⚠️ ЗАЯВКА ДОЛЖНА КУДА-ТО УХОДИТЬ. До 20.08 обработчик просто прятал форму и
       показывал «записали» — номер не доходил ни до кого, а посетителю обещали
       «перезвоним в рабочее время». Теперь POST на свой же домен (/api/contact),
       дальше сервис на VPS кладёт заявку в лог и шлёт уведомление в Telegram.
       Если отправка не удалась — честно говорим об этом, а не показываем успех. */
    var busy = false;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!check(true)) return;
      if (f.elements.hp_website.value) return;     // honeypot: молча не отправляем
      if (busy) return;
      var name = f.elements.name.value.trim();
      var phone = f.elements.phone.value.trim();
      var when = (f.elements.when && f.elements.when.value || '').trim();
      var err = $('#err-phone');
      busy = true;
      submit.disabled = true;
      if (err) err.textContent = MSG.sending;
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: 'lake',
          name: name,
          contact: phone,
          message: (when ? 'Когда удобно: ' + when + '\n' : '')
            + 'Конфигурация: ' + phrase() + ' · ' + area() + MSG.sqm + ' — ' + priceStr(),
          hp_website: f.elements.hp_website.value,
        }),
      }).then(function (r) {
        return r.json().catch(function () { return { ok: r.ok }; });
      }).then(function (out) {
        if (!out || !out.ok) throw new Error('failed');
        if (err) err.textContent = '';
        $('#okText').textContent = name + MSG.ok + MSG.yourHome + phrase() + ' — ' + priceStr() + '.';
        f.hidden = true;
        $('#formOk').hidden = false;
        $('#formOk').scrollIntoView({ block: 'center', behavior: REDUCED ? 'auto' : 'smooth' });
      }).catch(function () {
        if (err) err.textContent = MSG.sendErr;
        var field = f.elements.phone.closest('.field');
        if (field) field.classList.add('bad');
      }).then(function () { busy = false; submit.disabled = false; });
    });
    check(false);
  }

  /* ══════════════ 6. МЕНЮ НА ТЕЛЕФОНЕ ══════════════ */
  /* ⛔ До 21.08 разделов на телефоне не было ВООБЩЕ: `.nav__links{display:none}` ниже
     860 px, и человек мог попасть в «Планировку» или «Цену» только прокруткой всей
     страницы. Кнопки-бургера не было тоже.
     ⚠️ Меню строится КЛОНИРОВАНИЕМ уже существующих ссылок навбара, а не вторым
     набором разметки: страниц пять, языков пять, и любая ручная копия разъедется с
     оригиналом на первой же правке. Заодно подписи приезжают уже переведёнными.
     ⚠️ Переключатель языков переезжает в панель, а не живёт в баре: замер показал,
     что бар и без бургера переполнен — на 320 px не хватало 11 px, а языки занимают
     92 из 294. Освободив их, бургер (36) встаёт с запасом на любом телефоне. */
  function initNav() {
    var nav = $('.nav'), bar = $('.nav__in'), links = $('.nav__links');
    if (!nav || !bar || !links) return;

    var burger = document.createElement('button');
    burger.type = 'button';
    burger.className = 'nav__burger';
    burger.id = 'navBurger';
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'navMenu');
    burger.setAttribute('aria-label', MSG.menu);
    for (var i = 0; i < 3; i++) burger.appendChild(document.createElement('i'));
    bar.insertBefore(burger, $('.nav__cta', bar));

    var menu = document.createElement('div');
    menu.className = 'nav__menu';
    menu.id = 'navMenu';
    menu.hidden = true;
    var rows = document.createElement('div');
    rows.className = 'nav__menu-links';
    $$('a', links).forEach(function (a) { rows.appendChild(a.cloneNode(true)); });
    menu.appendChild(rows);
    var langs = $('.nav__langs');
    if (langs) {
      var lr = document.createElement('div');
      lr.className = 'nav__menu-langs';
      $$('a', langs).forEach(function (a) { lr.appendChild(a.cloneNode(true)); });
      menu.appendChild(lr);
    }
    nav.appendChild(menu);

    function setOpen(on) {
      menu.hidden = !on;
      burger.setAttribute('aria-expanded', String(on));
      if (on) { var f = $('a', menu); if (f) f.focus(); }
    }
    burger.addEventListener('click', function () { setOpen(menu.hidden); });
    // Клик по пункту закрывает меню сам: якорь уводит к разделу, и панель, оставшаяся
    // висеть поверх него, — первое, на что жалуются.
    menu.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (menu.hidden || menu.contains(e.target) || burger.contains(e.target)) return;
      setOpen(false);
    });
    addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); burger.focus(); }
    });
    // Развернули телефон в ландшафт или растянули окно — панель обязана закрыться:
    // выше 860 px разделы снова живут в самом баре, и открытая панель их дублирует.
    var mqNav = matchMedia('(min-width:901px)');   // порог тот же, что в CSS
    var onWide = function () { if (mqNav.matches) setOpen(false); };
    if (mqNav.addEventListener) mqNav.addEventListener('change', onWide);
    else if (mqNav.addListener) mqNav.addListener(onWide);
  }

  /* ══════════════ старт ══════════════ */
  function boot() {
    initNav();
    initHero();
    wireSwatches();
    paint();
    initPlan();
    initForm();
    // Сцену поднимаем не на загрузке страницы, а когда секция подходит к экрану:
    // PMREM и первый рендер стоят десятки миллисекунд главного потока, и на загрузке
    // они целиком уезжают в TBT — при том что до 3D человек ещё не доскроллил.
    var started = false;
    function start3d() {
      if (started) return;
      started = true;
      if (window.AV3D) initStudio();
      else addEventListener('av3d:ready', initStudio, { once: true });
    }
    var sec = document.getElementById('studio');
    if (sec && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es, o) {
        if (es.some(function (e) { return e.isIntersecting; })) { o.disconnect(); start3d(); }
      }, { rootMargin: '150% 0px' }).observe(sec);
    } else {
      start3d();
    }

    // Движок мог не догрузиться — офлайн, блокировщик, обрыв. Ловим ошибку загрузки
    // самого файла, а не ждём таймаута: иначе на месте 3D минуту висит пустая сцена.
    function fallback() {
      var s = $('#studio3d');
      if (s && !window.AV3D) { s.classList.add('is-fallback'); started = true; }
    }
    var tag = document.querySelector('script[src*="av3d"]');
    if (tag) tag.addEventListener('error', fallback);
    setTimeout(fallback, 4000);   // подстраховка на случай тихого зависания
  }
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
  else boot();
})();

// build 20260809-4 · языки ru/en/es/pt/th: словари по <html lang>, база ассетов от src скрипта
