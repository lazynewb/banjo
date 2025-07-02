// Smooth scroll for header links
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const section  = document.getElementById(targetId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });
});

// Generic slider functionality with dynamic slides-per-view + gap-aware swipe/drag
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
  let slideWidth    = 0;
  let gap           = 0;
  let baseOffsetPx  = 0;

  // Measure one slide’s full width (including gap)
  function measure() {
    const style = getComputedStyle(viewport);
    slideWidth = slides[0].getBoundingClientRect().width;
    gap = parseFloat(style.columnGap || style.gap) || 0;
  }

  // Determine how many slides fit in view
  function slidesPerView() {
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 768)  return 3;
    return 2;
  }

  // Reposition and clamp index, disable buttons
  function update() {
    const perView  = slidesPerView();
    const maxIndex = slides.length - perView;
    currentIndex   = Math.max(0, Math.min(currentIndex, maxIndex));

    measure();
    baseOffsetPx = currentIndex * (slideWidth + gap);
    viewport.style.transition = 'transform 0.5s ease';
    viewport.style.transform  = `translateX(-${baseOffsetPx}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
  }

  // Button click handlers
  prevBtn.addEventListener('click', () => {
    currentIndex--;
    update();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex++;
    update();
  });

  // Recalc on resize
  window.addEventListener('resize', update);

  // Pointer down (mouse or touch)
  viewport.addEventListener('pointerdown', e => {
    dragging       = true;
    startX         = e.clientX;
    measure();
    baseOffsetPx   = currentIndex * (slideWidth + gap);
    viewport.style.transition = 'none';
    viewport.setPointerCapture(e.pointerId);
  });

  // Pointer move (drag)
  viewport.addEventListener('pointermove', e => {
    if (!dragging) return;
    deltaX = e.clientX - startX;
    viewport.style.transform = `translateX(${ -baseOffsetPx + deltaX }px)`;
  });

  // End drag: snap to nearest slide
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    const threshold = slideWidth / 3;
    if (deltaX < -threshold) currentIndex++;
    if (deltaX >  threshold) currentIndex--;
    deltaX = 0;
    update();
  }

  viewport.addEventListener('pointerup',    endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave',  endDrag);

  // Initial position
  update();
}

// Initialize all carousels
initSlider('itinerary');
initSlider('facility');
initSlider('pricing');

// Contact buttons
const whatsappBtn  = document.getElementById('whatsappBtn');
const telegramBtn  = document.getElementById('telegramBtn');
const messengerBtn = document.getElementById('messengerBtn');
const messageInput = document.getElementById('messageInput');

whatsappBtn.addEventListener('click', () => {
  const text = encodeURIComponent(messageInput.value || 'Hello!');
  window.open(`https://wa.me/6281584214011?text=${text}`, '_blank');
});

telegramBtn.addEventListener('click', () => {
  const text = encodeURIComponent(messageInput.value || 'Hello!');
  window.open(`https://t.me/wadetrip?text=${text}`, '_blank');
});

messengerBtn.addEventListener('click', () => {
  const text = encodeURIComponent(messageInput.value || 'Hello!');
  // replace YOUR_PAGE_USERNAME with your Facebook Page's username or ID
  window.open(`https://m.me/646691665202136{text}`, '_blank');
});
