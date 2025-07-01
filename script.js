// Smooth scroll for header links
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Generic slider functionality with dynamic slides-per-view
function initSlider(sliderName) {
  const container = document.querySelector(`.${sliderName}-slider`);
  const viewport = container.querySelector('.slider__viewport');
  const slides = Array.from(viewport.children);
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');
  let currentIndex = 0;

  // determine how many slides fit in view
  function slidesPerView() {
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 768)  return 3;
    return 2;
  }

  // reposition and clamp index, disable buttons at edges
  function update() {
    const perView = slidesPerView();
    const maxIndex = slides.length - perView;
    // clamp
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    // translate by percentage of viewport
    const offsetPercent = (currentIndex * 100) / perView;
    viewport.style.transform = `translateX(-${offsetPercent}%)`;

    // toggle disabled states
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === maxIndex);
  }

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    update();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    update();
  });

  // recalc on resize
  window.addEventListener('resize', update);

  // initial position
  update();
}

// initialize all three carousels
initSlider('itinerary');
initSlider('facility');
initSlider('pricing');

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
