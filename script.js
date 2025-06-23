document.addEventListener("DOMContentLoaded", () => {
  // Dynamic Itinerary Filtering
  const itineraryFilter = document.getElementById("itineraryFilter");
  itineraryFilter.addEventListener("change", (e) => {
    const filterValue = e.target.value;
    const items = document.querySelectorAll(".itinerary-item");
    items.forEach((item) => {
      if (filterValue === "all" || item.dataset.category === filterValue) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Reveal Animation using IntersectionObserver
  const sections = document.querySelectorAll(".content-section");
  const observerOptions = { threshold: 0.15 };
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach((section) => sectionObserver.observe(section));

  // WhatsApp Form Submission
  const form = document.getElementById("whatsappForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const needsInput = document.getElementById("needs");
      const needs = needsInput.value.trim();
      if (!needs) {
        alert("Please enter your needs.");
        return;
      }
      const phoneNumber = "6281584214011";
      const url =
        "https://api.whatsapp.com/send?phone=" +
        phoneNumber +
        "&text=" +
        encodeURIComponent(needs);
      const whatsappButton = form.querySelector("button[type='submit']");
      whatsappButton.disabled = true;
      whatsappButton.textContent = "Opening WhatsApp...";
      setTimeout(() => {
        const popup = window.open(url, "_blank");
        if (!popup) {
          alert("Popup blocked! Please allow popups for this website.");
        }
        whatsappButton.disabled = false;
        whatsappButton.textContent = "Chat on WhatsApp";
      }, 500);
    });
  }

  // Telegram Button Handler
  const telegramButton = document.getElementById("telegramButton");
  if (telegramButton) {
    telegramButton.addEventListener("click", () => {
      const needsInput = document.getElementById("needs");
      const needs = needsInput.value.trim();
      if (!needs) {
        alert("Please enter your needs.");
        return;
      }
      const telegramUrl = "https://t.me/wadetrip?text=" + encodeURIComponent(needs);
      telegramButton.disabled = true;
      telegramButton.textContent = "Opening Telegram...";
      setTimeout(() => {
        const popup = window.open(telegramUrl, "_blank");
        if (!popup) {
          alert("Popup blocked! Please allow popups for this website.");
        }
        telegramButton.disabled = false;
        telegramButton.textContent = "Chat on Telegram";
      }, 500);
    });
  }

  // Smooth Scroll for Internal Links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Parallax Scrolling using requestAnimationFrame
  const parallaxEls = document.querySelectorAll(".hero, .about-hero");
  let lastKnownScrollPosition = 0;
  let ticking = false;
  function parallaxEffect(scrollPos) {
    parallaxEls.forEach((el) => {
      const offset = scrollPos * 0.5;
      el.style.backgroundPosition = `center ${offset}px`;
    });
  }
  window.addEventListener("scroll", () => {
    lastKnownScrollPosition = window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        parallaxEffect(lastKnownScrollPosition);
        ticking = false;
      });
      ticking = true;
    }
  });

  // Service Worker Registration for PWA
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
});