// script.js
document.addEventListener("DOMContentLoaded", () => {
  // 1) Content Reveal Animation
  const sections = document.querySelectorAll(".content-section");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>
      entry.target.classList.toggle("visible", entry.isIntersecting)
    );
  }, { threshold: 0.15 });
  sections.forEach((s) => sectionObserver.observe(s));

  // 2) Chat Popup Utility
  function openChat(url, button, openingText, defaultText) {
    button.disabled = true;
    button.textContent = openingText;
    setTimeout(() => {
      const pop = window.open(url, "_blank");
      if (!pop) alert("Popup blocked! Please allow popups.");
      button.disabled = false;
      button.textContent = defaultText;
    }, 500);
  }

  // 3) WhatsApp Form
  const form = document.getElementById("whatsappForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const needs = document.getElementById("needs").value.trim();
      if (!needs) return alert("Please enter your needs.");
      const btn = form.querySelector("button[type='submit']");
      const url =
        "https://api.whatsapp.com/send?phone=6281584214011&text=" +
        encodeURIComponent(needs);
      openChat(url, btn, "Opening WhatsApp...", "Chat on WhatsApp");
    });
  }

  // 4) Telegram Button
  const telegramBtn = document.getElementById("telegramButton");
  if (telegramBtn) {
    telegramBtn.addEventListener("click", () => {
      const needs = document.getElementById("needs").value.trim();
      if (!needs) return alert("Please enter your needs.");
      const url = "https://t.me/wadetrip?text=" + encodeURIComponent(needs);
      openChat(url, telegramBtn, "Opening Telegram...", "Chat on Telegram");
    });
  }

  // 5) Smooth Scroll + Highlight
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const id = this.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      const headerH =
        document.querySelector("header.site-header")?.offsetHeight || 0;
      const topPos =
        el.getBoundingClientRect().top + window.pageYOffset - headerH;
      window.scrollTo({ top: topPos, behavior: "smooth" });
      el.classList.add("highlight");
      setTimeout(() => el.classList.remove("highlight"), 1000);
    });
  });

  // 6) Parallax
  const parallaxEls = document.querySelectorAll(".hero, .about-hero");
  let lastScroll = 0,
    ticking = false;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (!reduceMotion) {
    window.addEventListener("scroll", () => {
      lastScroll = window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          parallaxEls.forEach((el) => {
            el.style.backgroundPosition = `center ${lastScroll * 0.5}px`;
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // 7) Swiper Init with Breakpoints
  const swiper = new Swiper(".swiper-container", {
    // default desktop
    slidesPerView: 3,
    spaceBetween: 20,

    // responsive
    breakpoints: {
      // mobile up to 639px
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // tablet 640px+
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // desktop 1024px+
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },

    simulateTouch: true,
    grabCursor: true,
    mousewheel: { forceToAxis: true },
    pagination: { el: ".swiper-pagination", clickable: true },
  });

  // 8) Equalize Card Heights
  function equalizeCardHeights() {
    let maxH = 0;
    const cards = document.querySelectorAll(".swiper-slide");
    cards.forEach((c) => (c.style.height = "auto"));
    cards.forEach((c) => (maxH = Math.max(maxH, c.offsetHeight)));
    cards.forEach((c) => (c.style.height = maxH + "px"));
  }

  // 9) Equalize Slide Headings
  function equalizeSlideHeadings() {
    const heads = document.querySelectorAll(".swiper-slide h1");
    let maxH = 0;
    heads.forEach((h) => (h.style.minHeight = ""));
    heads.forEach((h) => (maxH = Math.max(maxH, h.offsetHeight)));
    heads.forEach((h) => (h.style.minHeight = maxH + "px"));
  }

  equalizeCardHeights();
  equalizeSlideHeadings();
  window.addEventListener("resize", () => {
    equalizeCardHeights();
    equalizeSlideHeadings();
  });

  // 10) Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
    // close on link click
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("show"))
    );
    // hide if resized above mobile
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) navLinks.classList.remove("show");
    });
  }

  // 11) Service Worker for PWA
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js")
        .then((reg) => console.log("SW registered:", reg.scope))
        .catch((err) => console.error("SW failed:", err));
    });
  }
});