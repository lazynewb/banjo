// Debounce Utility Function
function debounce(func, wait = 20, immediate = false) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Reveal Animation using IntersectionObserver
const sections = document.querySelectorAll(".content-section");

const observerOptions = {
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// WhatsApp Form Submission
const form = document.getElementById("whatsappForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const needsInput = document.getElementById("needs");
    const needs = needsInput.value.trim();
    if (needs === "") {
      alert("Please enter your needs.");
      return;
    }
    const phoneNumber = "6281584214011";
    const url =
      "https://api.whatsapp.com/send?phone=" +
      phoneNumber +
      "&text=" +
      encodeURIComponent(needs);

    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Opening WhatsApp...";

    setTimeout(() => {
      const popup = window.open(url, "_blank");
      if (!popup) {
        alert("Popup blocked! Please allow popups for this website.");
      }
      btn.disabled = false;
      btn.textContent = "Chat on WhatsApp";
    }, 500);
  });
}

// Smooth Scroll for internal links (e.g., CTA buttons)
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Parallax Scrolling Effect for hero sections
function parallaxEffect() {
  const parallaxEls = document.querySelectorAll('.hero, .about-hero');
  parallaxEls.forEach(el => {
    let scrolled = window.pageYOffset;
    // Adjust the factor (0.5) to make the effect more or less accentuated
    let offset = scrolled * 0.5;
    el.style.backgroundPosition = `center ${offset}px`;
  });
}
window.addEventListener('scroll', debounce(parallaxEffect, 10));

// Register Service Worker for PWA support
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