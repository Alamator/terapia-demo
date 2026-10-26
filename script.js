/* =====================================================================
   [NAZWA GABINETU] — demo. Czysty JS, bez zależności.
   Nic nie wysyła na serwer. Jedyne, co zapisuje w przeglądarce
   (localStorage), to dwie preferencje wyglądu: motyw i ograniczony ruch.
   Quiz, checklisty i formularz działają wyłącznie w pamięci strony.
   ===================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  /* ---------- Bezpieczny dostęp do localStorage ---------- */
  function readPref(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
  function writePref(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* tryb prywatny / zablokowane — ignorujemy */
    }
  }

  /* ---------- Motyw jasny / ciemny ---------- */
  var themeBtn = document.querySelector("[data-theme-toggle]");
  var savedTheme = readPref("demo-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    root.setAttribute("data-theme", savedTheme);
  }
  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function syncThemeBtn() {
    if (!themeBtn) return;
    var dark = currentTheme() === "dark";
    themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
    var label = themeBtn.querySelector(".label");
    if (label) label.textContent = dark ? "Tryb jasny" : "Tryb ciemny";
    themeBtn.setAttribute(
      "aria-label",
      dark ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"
    );
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      writePref("demo-theme", next);
      syncThemeBtn();
    });
    syncThemeBtn();
  }

  /* ---------- Ograniczony ruch ---------- */
  var motionBtn = document.querySelector("[data-motion-toggle]");
  var savedMotion = readPref("demo-motion");
  if (savedMotion === "reduced" || savedMotion === "full") {
    root.setAttribute("data-motion", savedMotion);
  }
  function motionReduced() {
    var attr = root.getAttribute("data-motion");
    if (attr) return attr === "reduced";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function syncMotionBtn() {
    if (!motionBtn) return;
    var reduced = motionReduced();
    motionBtn.setAttribute("aria-pressed", reduced ? "true" : "false");
    motionBtn.setAttribute(
      "aria-label",
      reduced ? "Włącz animacje" : "Ogranicz ruch i animacje"
    );
  }
  if (motionBtn) {
    motionBtn.addEventListener("click", function () {
      var next = motionReduced() ? "full" : "reduced";
      root.setAttribute("data-motion", next);
      writePref("demo-motion", next);
      syncMotionBtn();
      revealAllIfReduced();
    });
    syncMotionBtn();
  }

  /* ---------- Nawigacja mobilna ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", open ? "false" : "true");
      navToggle.setAttribute("aria-expanded", open ? "false" : "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
        nav.setAttribute("data-open", "false");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ---------- Szacowany czas czytania (200 słów/min) ---------- */
  var sections = document.querySelectorAll("[data-reading]");
  Array.prototype.forEach.call(sections, function (section) {
    var target = section.querySelector("[data-reading-time]");
    if (!target) return;
    var text = section.textContent || "";
    var words = text.trim().split(/\s+/).filter(Boolean).length;
    var minutes = Math.max(1, Math.round(words / 200));
    target.textContent = "≈ " + minutes + " min czytania";
  });

  /* ---------- Checklisty (stan tylko w pamięci strony) ---------- */
  var checklists = document.querySelectorAll("[data-checklist]");
  Array.prototype.forEach.call(checklists, function (list) {
    var boxes = list.querySelectorAll('input[type="checkbox"]');
    var progress = list.querySelector("[data-checklist-progress]");
    var bar = list.querySelector("[data-checklist-bar]");
    function update() {
      var done = 0;
      Array.prototype.forEach.call(boxes, function (b) {
        if (b.checked) done += 1;
      });
      if (progress) progress.textContent = done + " / " + boxes.length;
      if (bar) bar.style.width = Math.round((done / boxes.length) * 100) + "%";
    }
    Array.prototype.forEach.call(boxes, function (b) {
      b.checked = false;
      b.addEventListener("change", update);
    });
    update();
  });

  /* ---------- Quiz „Czy to dla mnie?" ---------- */
  var quiz = document.querySelector("[data-quiz]");
  if (quiz) {
    var questions = quiz.querySelectorAll(".quiz-q");
    var results = quiz.querySelectorAll(".quiz-result");
    var dots = quiz.querySelectorAll(".quiz-dots span");
    var counter = quiz.querySelector("[data-quiz-counter]");
    var backBtn = quiz.querySelector("[data-quiz-back]");
    var restartBtns = quiz.querySelectorAll("[data-quiz-restart]");
    var progressWrap = quiz.querySelector(".quiz-progress");
    var navWrap = quiz.querySelector(".quiz-nav");
    var liveRegion = quiz.querySelector("[data-quiz-live]");

    var answers = []; // lista obiektów {k: "..", a: ".."} — tylko w pamięci
    var index = 0;

    function show(i) {
      index = i;
      Array.prototype.forEach.call(questions, function (q, qi) {
        q.setAttribute("data-active", qi === i ? "true" : "false");
      });
      Array.prototype.forEach.call(results, function (r) {
        r.setAttribute("data-active", "false");
      });
      Array.prototype.forEach.call(dots, function (d, di) {
        d.classList.toggle("done", di < i);
      });
      if (counter) counter.textContent = "Pytanie " + (i + 1) + " z " + questions.length;
      if (backBtn) backBtn.hidden = i === 0;
      if (progressWrap) progressWrap.hidden = false;
      if (navWrap) navWrap.hidden = false;
      var heading = questions[i].querySelector("h3");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }

    function score() {
      var totals = { konsultacja: 0, adhd: 0, terapia: 0, rodzic: 0 };
      answers.forEach(function (ans) {
        ans.points.split(",").forEach(function (pair) {
          var parts = pair.split(":");
          var key = parts[0].trim();
          var val = parseInt(parts[1], 10) || 0;
          if (totals.hasOwnProperty(key)) totals[key] += val;
        });
      });
      var best = "konsultacja";
      var bestVal = -1;
      var tie = false;
      Object.keys(totals).forEach(function (k) {
        if (totals[k] > bestVal) {
          bestVal = totals[k];
          best = k;
          tie = false;
        } else if (totals[k] === bestVal) {
          tie = true;
        }
      });
      // Remis = najbezpieczniejsza rekomendacja: jedna rozmowa, żeby się zorientować.
      if (tie) best = "konsultacja";
      return best;
    }

    function finish() {
      var key = score();
      Array.prototype.forEach.call(questions, function (q) {
        q.setAttribute("data-active", "false");
      });
      Array.prototype.forEach.call(dots, function (d) {
        d.classList.add("done");
      });
      if (counter) counter.textContent = "Gotowe";
      if (progressWrap) progressWrap.hidden = true;
      if (navWrap) navWrap.hidden = true;
      Array.prototype.forEach.call(results, function (r) {
        var active = r.getAttribute("data-result") === key;
        r.setAttribute("data-active", active ? "true" : "false");
        if (active) {
          var h = r.querySelector("h3");
          if (h) {
            h.setAttribute("tabindex", "-1");
            h.focus({ preventScroll: true });
          }
          if (liveRegion) liveRegion.textContent = "Wynik: " + (h ? h.textContent : key);
        }
      });
    }

    Array.prototype.forEach.call(quiz.querySelectorAll(".quiz-answer"), function (btn) {
      btn.addEventListener("click", function () {
        answers[index] = { points: btn.getAttribute("data-points") || "" };
        answers.length = index + 1;
        if (index + 1 < questions.length) {
          show(index + 1);
        } else {
          finish();
        }
      });
    });

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        if (index > 0) show(index - 1);
      });
    }
    Array.prototype.forEach.call(restartBtns, function (b) {
      b.addEventListener("click", function () {
        answers = [];
        if (liveRegion) liveRegion.textContent = "";
        show(0);
      });
    });

    show(0);
  }

  /* ---------- Formularz rezerwacji — makieta ---------- */
  var form = document.querySelector("[data-booking-form]");
  if (form) {
    var status = document.querySelector("[data-form-status]");

    // Wstępny wybór usługi z adresu, np. rezerwacja.html?usluga=adhd
    try {
      var params = new URLSearchParams(window.location.search);
      var pre = params.get("usluga");
      var select = form.querySelector('select[name="usluga"]');
      if (pre && select) {
        Array.prototype.forEach.call(select.options, function (o) {
          if (o.value === pre) select.value = pre;
        });
      }
    } catch (e) {
      /* starsze przeglądarki — pomijamy */
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var formaInput = form.querySelector('input[name="forma"]:checked');
      var forma = formaInput ? formaInput.value : "";
      var uslugaSel = form.querySelector('select[name="usluga"]');
      var usluga =
        uslugaSel && uslugaSel.selectedIndex >= 0
          ? uslugaSel.options[uslugaSel.selectedIndex].text
          : "";
      if (status) {
        var summary = status.querySelector("[data-form-summary]");
        if (summary) {
          summary.textContent =
            "Wybrano: " + usluga + (forma ? " · " + forma : "") + ".";
        }
        status.setAttribute("data-show", "true");
        status.setAttribute("tabindex", "-1");
        status.focus({ preventScroll: true });
        status.scrollIntoView({ behavior: motionReduced() ? "auto" : "smooth", block: "center" });
      }
    });
  }

  /* ---------- Pojawianie się sekcji przy przewijaniu ---------- */
  var reveals = document.querySelectorAll(".reveal");
  function revealAllIfReduced() {
    if (motionReduced()) {
      Array.prototype.forEach.call(reveals, function (el) {
        el.classList.add("in");
      });
    }
  }
  if (reveals.length) {
    if (motionReduced() || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(reveals, function (el) {
        el.classList.add("in");
      });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
      );
      Array.prototype.forEach.call(reveals, function (el) {
        io.observe(el);
      });
      // Zabezpieczenie: gdyby obserwator nie zadziałał, treść i tak się pokaże.
      window.setTimeout(function () {
        Array.prototype.forEach.call(reveals, function (el) {
          el.classList.add("in");
        });
      }, 1500);
    }
  }
})();
