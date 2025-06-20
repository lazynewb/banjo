// 1) WhatsApp Form Submission with Feedback
const form = document.getElementById("whatsappForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const needs = document.getElementById("needs").value;
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
      window.open(url, "_blank");
      btn.disabled = false;
      btn.textContent = "Chat on WhatsApp";
    }, 500);
  });
}

// 2) Track scroll direction
let lastScrollY = window.scrollY;
let scrollDown = true;
window.addEventListener("scroll", () => {
  scrollDown = window.scrollY > lastScrollY;
  lastScrollY = window.scrollY;
});

// 3) Intersection Observer: reveal on down, hide on up
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // if at least 10% visible, always reveal
      if (entry.intersectionRatio > 0.1) {
        entry.target.classList.add("visible");
      }
      // if less than 10% visible AND we're scrolling up, hide
      else if (!scrollDown) {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.1 }
);

// start observing
sections.forEach((section) => observer.observe(section));