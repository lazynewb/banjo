// WhatsApp Form Submission with Feedback
const form = document.getElementById("whatsappForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const needs = document.getElementById("needs").value;
    const phoneNumber = "6281584214011";
    const url =
      "https://api.whatsapp.com/send?phone=" +
      phoneNumber +
      "&text=" +
      encodeURIComponent(needs);

    // provide user feedback
    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Opening WhatsApp...";

    setTimeout(() => {
      window.open(url, "_blank");
      btn.disabled = false;
      btn.textContent = "Chat on WhatsApp";
    }, 500);
  });
}

// Intersection Observer for Section Animations
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  },
  { threshold: 0.1 }
);

// ← This line was missing:
sections.forEach(section => observer.observe(section));