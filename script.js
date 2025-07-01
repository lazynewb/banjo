// Smooth scroll for header links
document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href').slice(1);
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Generic slider functionality
function initSlider(sliderName) {
  const slider = document.querySelector(`.${sliderName}-slider .slider__viewport`);
  const slides = slider.querySelectorAll('.slide');
  let index = 0;

  function show(n) {
    if (n < 0) index = slides.length - 1;
    else if (n >= slides.length) index = 0;
    else index = n;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  document.querySelector(`.${sliderName}-slider .prev`)
    .addEventListener('click', () => show(index - 1));

  document.querySelector(`.${sliderName}-slider .next`)
    .addEventListener('click', () => show(index + 1));
}

// Initialize both sliders
initSlider('itinerary');
initSlider('facility');

// Contact buttons
const whatsappBtn = document.getElementById('whatsappBtn');
const telegramBtn = document.getElementById('telegramBtn');
const messageInput = document.getElementById('messageInput');

whatsappBtn.addEventListener('click', () => {
  const text = encodeURIComponent(messageInput.value || 'Hello!');
  const url = `https://wa.me/6281584214011?text=${text}`;
  window.open(url, '_blank');
});

telegramBtn.addEventListener('click', () => {
  const text = encodeURIComponent(messageInput.value || 'Hello!');
  const url = `https://t.me/wadetrip?text=${text}`;
  window.open(url, '_blank');
});