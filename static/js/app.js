// ==========================================
// js/app.js - نسخه کاملاً بهینه‌شده برای جنگو
// ==========================================

// ۱. سیستم قفل و لودینگ تلگرام/بله
const tg = window.Telegram?.WebApp;
if (tg && tg.initData) {
    if (typeof tg.expand === 'function') {
        tg.expand();
        tg.ready();
    }
}

// ۲. توابع کمکی
function toPersianNum(num) {
  const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return num.toString().replace(/\d/g, x => persianDigits[x]);
}

// ۳. مدیریت پاپ‌آپ تصاویر (زوم کاتالوگ)
window.openImageModal = function(src) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    if (modal && modalImg) {
        modalImg.src = src;
        modal.classList.add("show");
    }
};

window.closeImageModal = function() {
    const modal = document.getElementById("image-modal");
    if (modal) modal.classList.remove("show");
};

// ۴. درگ کردن با موس برای تمام اسلایدرها
window.enableMouseDrag = function(container) {
  if (!container) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragging = false;
  let startPos = { x: 0, y: 0 };

  const isHomePage = !!document.getElementById('home-category-grid');

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    startPos = { x: e.pageX, y: e.pageY };
    container.classList.add('grabbing');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.scrollBehavior = 'auto';
    if (isHomePage) container.style.scrollSnapType = 'none';
  });

  const stopDrag = () => {
    if (!isDown) return;
    isDown = false;
    container.classList.remove('grabbing');
    container.style.scrollBehavior = 'smooth';
    if (!isHomePage) container.style.scrollSnapType = 'x mandatory';
  };

  container.addEventListener('mouseleave', stopDrag);
  container.addEventListener('mouseup', stopDrag);

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; 
    const distance = Math.abs(e.pageX - startPos.x);
    if (distance > 5) {
      isDragging = true;
      e.preventDefault(); 
      container.scrollLeft = scrollLeft - walk;
    }
  });

  container.addEventListener('click', (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
}

// ۵. مدیریت جستجو (منوی جستجو)
window.toggleSearch = function(show) {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  if (show) {
    overlay.classList.add('open');
    setTimeout(() => {
      const input = document.getElementById('search-input');
      if(input) input.focus();
    }, 300);
  } else {
    overlay.classList.remove('open');
  }
}

// ۶. اجرای کدهای وابسته به ظاهر هنگام لود شدن صفحه
document.addEventListener('DOMContentLoaded', () => {
  
  // فعال‌سازی اسکرول با درگ موس برای تمام بخش‌های افقی سایت
  const scrollContainers = document.querySelectorAll('.horizontal-scroll, .gallery-scroll-container, .horizontal-scroll-works');
  scrollContainers.forEach(container => enableMouseDrag(container));

  // فارسی کردن اعداد تخفیف
  const discountBadges = document.querySelectorAll('.h-discount-badge');
  discountBadges.forEach(badge => {
      let text = badge.innerText.trim();
      text = toPersianNum(text);
      if (!text.includes('٪') && !text.includes('%')) text += '٪';
      else if (text.includes('%')) text = text.replace('%', '٪');
      badge.innerText = text;
  });
  
  // مدیریت شماره‌های اسلایدر در صفحه مشخصات محصول
  const container = document.getElementById("galleryContainer");
  const dotsContainer = document.getElementById("galleryDots");
  const currentImgIndex = document.getElementById("currentImgIndex");
  
  if (container) {
      container.addEventListener('scroll', () => {
          const slideWidth = container.clientWidth;
          const index = Math.round(Math.abs(container.scrollLeft) / slideWidth);
          if (currentImgIndex) currentImgIndex.textContent = toPersianNum(index + 1);
          if (dotsContainer) {
              const dots = dotsContainer.querySelectorAll('.dot');
              dots.forEach((d, i) => d.classList.toggle('active', i === index));
          }
      });
  }
});