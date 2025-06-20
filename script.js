// WhatsApp Form Submission (if the element exists)
document.getElementById("whatsappForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  var needs = document.getElementById("needs").value;
  var phoneNumber = "6281584214011"; // WhatsApp number (international format without the +)
  var url =
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodeURIComponent(needs);
  window.open(url, "_blank");
});

// Intersection Observer for Lazy Loading Sections with Animation
const sections = document.querySelectorAll("section");

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, observerOptions);


// Observe each section
sections.forEach(section => {
  observer.observe(section);
});