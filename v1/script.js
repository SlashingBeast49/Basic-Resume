(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var STORAGE_KEY = "portfolio-theme";

  function systemPref() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  }

  // Init: manual override in storage wins, otherwise follow system.
  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  applyTheme(stored || systemPref());

  // Keep following system changes until the user manually picks a theme.
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function (e) {
      var manual = null;
      try { manual = localStorage.getItem(STORAGE_KEY); } catch (err) {}
      if (!manual) applyTheme(e.matches ? "light" : "dark");
    });
  }

  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
  });

  // Nav shadow on scroll
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  // Mobile menu
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");
  burger.addEventListener("click", function () {
    var open = mobileMenu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll reveal for sections
  var revealTargets = document.querySelectorAll(
    ".about__grid, .skills__grid, .work__grid, .contact__grid, .section-head"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  }

  // Contact form (front-end only demo)
  var form = document.getElementById("contactForm");
  var note = document.getElementById("contactNote");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    note.textContent = "Message received — I'll reply soon.";
    form.reset();
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
})();
