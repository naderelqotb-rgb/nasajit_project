// ==========================================
// js/app.js - نسخه نهایی، یکپارچه و بهینه‌شده
// ==========================================

// ۱. سیستم قفل و لودینگ تلگرام (با بررسی ایمن)
try {
  const tg = window.Telegram?.WebApp;
  if (tg && tg.initData) {
      if (typeof tg.expand === 'function') {
          tg.expand();
      }
      if (typeof tg.ready === 'function') {
          tg.ready();
      }
  }
} catch (e) {
  console.warn("Telegram WebApp is not available or not running in Telegram environment.");
}

// ۲. توابع کمکی (عمومی کردن تابع برای استفاده در صورت نیاز)
window.toPersianNum = function(num) {
  if (num === null || num === undefined) return '';
  const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return num.toString().replace(/\d/g, x => persianDigits[x]);
};

// ۳. مدیریت پاپ‌آپ تصاویر (زوم کاتالوگ)
window.openModal = function(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  if (modal && modalImg) {
      modal.style.display = "flex";
      modalImg.src = src;
      // تاخیر کوتاه برای اجرای انیمیشن CSS
      setTimeout(() => modal.classList.add("show"), 10);
  }
};

window.closeModal = function() {
  const modal = document.getElementById("imageModal");
  if (modal) {
      modal.classList.remove("show");
      // صبر کردن برای پایان انیمیشن قبل از مخفی کردن کامل
      setTimeout(() => modal.style.display = "none", 300);
  }
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

  // جلوگیری از کلیک تصادفی هنگام درگ کردن
  container.addEventListener('click', (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
};

// ۵. مدیریت جستجو (منوی جستجو)
window.toggleSearch = function(show) {
  const overlay = document.getElementById('searchOverlay');
  if (!overlay) return;
  
  if (show) {
    overlay.classList.add('open');
    // فوکوس باید بلافاصله و بدون تاخیر باشد تا کیبورد در موبایل باز شود
    const input = document.getElementById('searchInput');
    if(input) input.focus();
  } else {
    overlay.classList.remove('open');
  }
};

// ۶. اجرای کدهای وابسته به ظاهر هنگام لود شدن کامل صفحه
document.addEventListener('DOMContentLoaded', () => {
  
  // الف) فعال‌سازی اسکرول با درگ موس برای تمام بخش‌های افقی سایت
  const scrollContainers = document.querySelectorAll('.horizontal-scroll, .gallery-scroll-container, .horizontal-scroll-works');
  scrollContainers.forEach(container => window.enableMouseDrag(container));

  // ب) فارسی کردن تمام اعداد (تخفیف‌ها، قیمت‌ها و کلاس‌های اختصاصی)
  const numberElements = document.querySelectorAll('.h-discount-badge, .persian-number');
  numberElements.forEach(el => {
      let text = el.innerText.trim();
      text = window.toPersianNum(text);
      
      // اگر المان مربوط به مدج تخفیف است و درصد ندارد، به آن اضافه کن
      if (el.classList.contains('h-discount-badge')) {
          if (!text.includes('٪') && !text.includes('%')) text += '٪';
          else if (text.includes('%')) text = text.replace('%', '٪');
      }
      
      el.innerText = text;
  });
  
  // ج) مدیریت شماره‌های اسلایدر در صفحه مشخصات محصول
  const galleryContainer = document.getElementById("galleryContainer");
  const dotsContainer = document.getElementById("galleryDots");
  const currentImgIndex = document.getElementById("currentImgIndex");
  
  if (galleryContainer) {
      galleryContainer.addEventListener('scroll', () => {
          const slideWidth = galleryContainer.clientWidth;
          if (slideWidth === 0) return; // جلوگیری از خطای تقسیم بر صفر
          
          const index = Math.round(Math.abs(galleryContainer.scrollLeft) / slideWidth);
          
          if (currentImgIndex) currentImgIndex.textContent = window.toPersianNum(index + 1);
          
          if (dotsContainer) {
              const dots = dotsContainer.querySelectorAll('.dot');
              dots.forEach((d, i) => d.classList.toggle('active', i === index));
          }
      });
  }
});