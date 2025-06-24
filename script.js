document.addEventListener("DOMContentLoaded", () => {
  // Content Reveal Animation using IntersectionObserver
  const sections = document.querySelectorAll(".content-section");
  const observerOptions = { threshold: 0.15 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        // Remove visible to allow re-animation when scrolling back into view
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);
  sections.forEach((section) => sectionObserver.observe(section));

  // Utility function for opening chat popups
  function openChat(url, button, openingText, defaultText) {
    button.disabled = true;
    button.textContent = openingText;
    setTimeout(() => {
      const popup = window.open(url, "_blank");
      if (!popup) {
        alert("Popup blocked! Please allow popups for this website.");
      }
      button.disabled = false;
      button.textContent = defaultText;
    }, 500);
  }

  // WhatsApp Form Submission
  const form = document.getElementById("whatsappForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const needs = document.getElementById("needs").value.trim();
      if (!needs) {
        alert("Please enter your needs.");
        return;
      }
      const url =
        "https://api.whatsapp.com/send?phone=6281584214011&text=" +
        encodeURIComponent(needs);
      const whatsappButton = form.querySelector("button[type='submit']");
      openChat(url, whatsappButton, "Opening WhatsApp...", "Chat on WhatsApp");
    });
  }

  // Telegram Button Handler
  const telegramButton = document.getElementById("telegramButton");
  if (telegramButton) {
    telegramButton.addEventListener("click", () => {
      const needs = document.getElementById("needs").value.trim();
      if (!needs) {
        alert("Please enter your needs.");
        return;
      }
      const telegramUrl =
        "https://t.me/wadetrip?text=" + encodeURIComponent(needs);
      openChat(
        telegramUrl,
        telegramButton,
        "Opening Telegram...",
        "Chat on Telegram"
      );
    });
  }

  // Smooth Scroll for Internal Links with offset and highlight animation
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight =
          document.querySelector("header.site-header")?.offsetHeight || 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        targetElement.classList.add("highlight");
        setTimeout(() => targetElement.classList.remove("highlight"), 1000);
      }
    });
  });

  // Parallax Scrolling using requestAnimationFrame with prefers-reduced-motion check
  const parallaxEls = document.querySelectorAll(".hero, .about-hero");
  let lastKnownScrollPosition = 0;
  let ticking = false;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (!prefersReducedMotion) {
    window.addEventListener("scroll", () => {
      lastKnownScrollPosition = window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          parallaxEls.forEach((el) => {
            const offset = lastKnownScrollPosition * 0.5;
            el.style.backgroundPosition = `center ${offset}px`;
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Swiper Initialization with Touch and Mousewheel Gestures & Dot Pagination
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    loop: false,
    simulateTouch: true,
    grabCursor: true,
    // Enable mousewheel scrolling for two-finger touchpad gestures
    mousewheel: { forceToAxis: true },
    // Dot pagination configuration
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  // Service Worker Registration for PWA
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
});