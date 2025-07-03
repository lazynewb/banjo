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

  function measure() {
    const style = getComputedStyle(viewport);
    slideWidth = slides[0].getBoundingClientRect().width;
    gap = parseFloat(style.columnGap || style.gap) || 0;
  }

  function slidesPerView() {
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 768)  return 3;
    return 2;
  }

  function update() {
    const perView  = slidesPerView();
    const maxIndex = slides.length - perView;
    currentIndex   = Math.max(0, Math.min(currentIndex, maxIndex));

    measure();
    baseOffsetPx = currentIndex * (slideWidth + gap);
    viewport.style.transition = 'transform 0.5s ease';
    viewport.style.transform  = `translateX(-${baseOffsetPx}px)`;

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

  window.addEventListener('resize', update);

  viewport.addEventListener('pointerdown', e => {
    dragging       = true;
    startX         = e.clientX;
    measure();
    baseOffsetPx   = currentIndex * (slideWidth + gap);
    viewport.style.transition = 'none';
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener('pointermove', e => {
    if (!dragging) return;
    deltaX = e.clientX - startX;
    viewport.style.transform = `translateX(${ -baseOffsetPx + deltaX }px)`;
  });

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

// reuse sendMessage helper from before
function sendMessage(urlBase) {
  const text = encodeURIComponent(
    messageInput.value ||
    'Hi. I just found your website and want to know more about this trip.'
  );
  window.open(`${urlBase}${text}`, '_blank');
}

// map platforms → base URLs
const chatMap = {
  whatsapp: 'https://wa.me/6285183054478?text=',
  telegram:  'https://t.me/wadetrip?text=',
  messenger: 'https://m.me/646691665202136?text='
};

// hook all .chat-icon buttons
document.querySelectorAll('.chat-icon').forEach(btn => {
  btn.addEventListener('click', () => {
    const platform = btn.dataset.platform;
    const baseUrl  = chatMap[platform];
    if (baseUrl) sendMessage(baseUrl);
  });
});

// Chat Toggle: show/hide the contact panel
const chatToggle    = document.querySelector('.chat-toggle');
const contactPanel  = document.getElementById('contact');

chatToggle.addEventListener('click', () => {
  contactPanel.classList.toggle('hidden');
  if (!contactPanel.classList.contains('hidden')) {
    messageInput.focus();
  }
});
