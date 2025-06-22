/* script.js */

// --- Debounce Utility Function ---
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

// --- WhatsApp Form Submission with Feedback ---
const form = document.getElementById("whatsappForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let needsInput = document.getElementById("needs");
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

    try {
      setTimeout(() => {
        const popup = window.open(url, "_blank");
        if (!popup) {
          alert("Popup blocked! Please allow popups for this website.");
        }
        btn.disabled = false;
        btn.textContent = "Chat on WhatsApp";
      }, 500);
    } catch (error) {
      console.error("Error opening WhatsApp URL:", error);
      btn.disabled = false;
      btn.textContent = "Chat on WhatsApp";
    }
  });
}

// --- Scroll Direction Tracking (Debounced) ---
let lastScrollY = window.scrollY;
let scrollDown = true;

const trackScrollDirection = debounce(() => {
  scrollDown = window.scrollY > lastScrollY;
  lastScrollY = window.scrollY;
}, 50);

window.addEventListener("scroll", trackScrollDirection);

// --- Intersection Observer for Reveal Animations ---
const sections = document.querySelectorAll("section");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.1) {
          entry.target.classList.add("visible");
        } else if (!scrollDown) {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach((section) => observer.observe(section));
} else {
  // Fallback: Show all sections if Intersection Observer is unavailable
  sections.forEach((section) => section.classList.add("visible"));
}

// --- Service Worker Registration for PWA ---
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