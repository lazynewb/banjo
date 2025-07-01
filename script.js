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

// Generic slider functionality:
// - Prev stops at 0
// - Next wraps around (last → 0)
function initSlider(sliderName) {
  const container = document.querySelector(`.${sliderName}-slider`);
  const viewport = container.querySelector('.slider__viewport');
  const slides = viewport.querySelectorAll('.slide');
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');
  let index = 0;
  
  function update() {
    viewport.style.transform = `translateX(-${index * 100}%)`;
    // optional: visually disable prev when at 0
    if (index === 0) prevBtn.classList.add('disabled');
    else prevBtn.classList.remove('disabled');
  }
  
  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      update();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });
  
  update();
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
  window.open(`https://wa.me/6281584214011?text=${text}`, '_blank');
});

telegramBtn.addEventListener('click', () => {
  const text = encodeURIComponent(messageInput.value || 'Hello!');
  window.open(`https://t.me/wadetrip?text=${text}`, '_blank');
});