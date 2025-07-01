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

// Generic slider functionality with dynamic slides-per-view + swipe/drag support
function initSlider(sliderName) {
  const container   = document.querySelector(`.${sliderName}-slider`);
  const viewport    = container.querySelector('.slider__viewport');
  const slides      = Array.from(viewport.children);
  const prevBtn     = container.querySelector('.prev');
  const nextBtn     = container.querySelector('.next');
  let currentIndex  = 0;
  let startX        = 0;
  let deltaX        = 0;
  let dragging      = false;
  let perView       = 0;
  let baseOffsetPct = 0;

  // how many slides to show
  function slidesPerView() {
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 768)  return 3;
    return 2;
  }

  // reposition and clamp index, disable buttons
  function update() {
    perView = slidesPerView();
    const maxIndex = slides.length - perView;
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

    const offsetPct = (currentIndex * 100) / perView;
    viewport.style.transform = `translateX(-${offsetPct}%)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
  }

  // click handlers
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

  // pointer (mouse/touch) dragging
  viewport.addEventListener('pointerdown', e => {
    dragging = true;
    startX   = e.clientX;
    perView  = slidesPerView();
    baseOffsetPct = (currentIndex * 100) / perView;
    viewport.style.transition = 'none';
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener('pointermove', e => {
    if (!dragging) return;
    deltaX = e.clientX - startX;
    const pctDrag = (deltaX / viewport.clientWidth) * 100;
    viewport.style.transform = `translateX(${-baseOffsetPct + pctDrag}%)`;
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    viewport.style.transition = 'transform 0.5s ease';

    const threshold = viewport.clientWidth / 4;
    if (deltaX < -threshold) currentIndex++;
    if (deltaX >  threshold) currentIndex--;
    deltaX = 0;
    update();
  }

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave', endDrag);

  // initial position
  update();
}

// initialize all three carousels
initSlider('itinerary');
initSlider('facility');
initSlider('pricing');


// Contact buttons
const whatsappBtn = document.getElementById('whatsappBtn');
const telegramBtn  = document.getElementById('telegramBtn');
const messageInput = document.getElementById('messageInput');

whatsappBtn.addEventListener('click', () => {
  const text = encodeURIComponent(messageInput.value || 'Hello!');
  window.open(`https://wa.me/6281584214011?text=${text}`, '_blank');
});

telegramBtn.addEventListener('click', () => {
  const text = encodeURIComponent(messageInput.value || 'Hello!');
  window.open(`https://t.me/wadetrip?text=${text}`, '_blank');
});
