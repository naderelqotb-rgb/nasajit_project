// ==========================================
// js/app.js - نسخه نهایی و کامل 
// ==========================================

const tg = window.Telegram?.WebApp;

// ۱. سیستم قفل و لودینگ (اجرای ایمن در وب و اپلیکیشن)
if (tg && tg.initData) {
    if (typeof tg.expand === 'function') {
        tg.expand();
        tg.ready();
    }
}

// ۲. توابع کمکی
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function toPersianNum(num) {
  const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return num.toString().replace(/\d/g, x => persianDigits[x]);
}

// ۳. تابع کمکی برای انیمیشن کلیک و انتقال
window.animateAndNavigate = function(element, url) {
    element.classList.add('card-clicked');
    setTimeout(() => {
        window.location.href = url;
    }, 150);
};

// ۴. مدیریت پاپ‌آپ تصاویر (زوم)
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

// ۵. تابع کامل و سالمِ درگ کردن با موس (که حذف شده بود)
function enableMouseDrag(container) {
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
    if (!isHomePage) {
        container.style.scrollSnapType = 'x mandatory';
    }
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

// ۶. رندر صفحه اصلی (Home)
function renderHomePage() {
  const grid = document.getElementById("home-category-grid");
  if (!grid) return;

  if (typeof CATEGORIES === "undefined" || !CATEGORIES.length) {
    grid.innerHTML = '<div class="empty-state"><p>دسته‌بندی‌ای یافت نشد</p></div>';
    return;
  }

  let html = '';
  CATEGORIES.forEach(cat => {
    let imgStyle = cat.image ? ` style="background-image:url('${cat.image}')"` : '';
    html += `
      <div class="category-card" onclick="animateAndNavigate(this, 'category.html?category=${encodeURIComponent(cat.id)}')">
        <div class="category-image" ${imgStyle}></div>
        <div class="category-info">
          <div class="category-label">${cat.title}</div>
          <div class="category-desc">${cat.description || ''}</div>
        </div>
        <div class="category-arrow">
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </div>
      </div>`;
  });
  grid.innerHTML = html;

  const discountScroll = document.getElementById("discounted-products-scroll");
  if (discountScroll && typeof DISCOUNTED_PRODUCTS !== "undefined") {
    discountScroll.innerHTML = "";
    DISCOUNTED_PRODUCTS.forEach(item => {
      const card = document.createElement("div");
      card.className = "h-discount-card";
      card.innerHTML = `
        <span class="h-discount-badge">${item.discount}</span>
        <div class="h-discount-image" style="background-image: url('${item.image}')"></div>
        <div class="h-discount-info"><p class="h-discount-name">${item.name}</p></div>
      `;
      card.onclick = () => { window.location.href = `category.html?category=${item.category}`; };
      discountScroll.appendChild(card);
    });
    enableMouseDrag(discountScroll);
  }
}

// ۷. رندر صفحه دسته‌بندی (Category)
function renderCategoryPage() {
  const grid = document.getElementById("product-grid");
  const titleEl = document.getElementById("category-title");

  if (!grid || !titleEl) return;

  const categoryId = getQueryParam("category") || "damask";
  const categoryObj = CATEGORIES.find(c => c.id === categoryId);

  titleEl.textContent = categoryObj ? categoryObj.title : "دسته‌بندی";
  const items = PRODUCTS[categoryId] || [];

  grid.innerHTML = "";

  items.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "product-card fade-in";

    const imgDiv = document.createElement("div");
    imgDiv.className = "product-image";
    if (item.image) imgDiv.style.backgroundImage = `url('${item.image}')`;

    const label = document.createElement("div");
    label.className = "product-label";
    label.textContent = item.name;

    card.appendChild(imgDiv);
    card.appendChild(label);
    card.onclick = function() { location.href = `product.html?id=${item.id}`; };
    grid.appendChild(card);
  });
}

// ۸. رندر صفحه محصول با قابلیت زوم
function renderSingleProductPage() {
  const productId = getQueryParam("id");
  if (!productId) return;

  let product = null;
  let category = null;

  if (typeof PRODUCTS !== "undefined") {
      for (const catId in PRODUCTS) {
        const found = PRODUCTS[catId].find(p => p.id === productId);
        if (found) { 
          product = found; 
          category = CATEGORIES.find(c => c.id === catId); 
          break; 
        }
      }
  }

  if (!product) return;

  const nameEl = document.getElementById("p-name");
  if(nameEl) nameEl.textContent = product.name;
  
  const catEl = document.getElementById("p-category");
  if(catEl && category) catEl.textContent = category.title;

  const subCatEl = document.querySelector('.cat-sub-value');
  if (subCatEl) {
    if (product.subcategory) {
        subCatEl.textContent = product.subcategory;
        subCatEl.style.display = 'inline-block';
    } else {
        subCatEl.style.display = 'none';
    }
  }

  const backBtn = document.querySelector('.product-header .back-button');
  if (backBtn && category) {
      backBtn.onclick = (e) => { 
          e.preventDefault();
          window.location.href = `category.html?category=${category.id}`; 
      };
  }

  const container = document.getElementById("galleryContainer");
  const dotsContainer = document.getElementById("galleryDots");
  const currentImgIndex = document.getElementById("currentImgIndex");
  const totalImgCount = document.getElementById("totalImgCount");
  
  const items = product.gallery && product.gallery.length > 0 ? product.gallery : [{type: "image", src: product.image}];

  if (container) {
    container.innerHTML = "";
    if (dotsContainer) dotsContainer.innerHTML = "";
    if (totalImgCount) totalImgCount.textContent = toPersianNum(items.length);
    if (currentImgIndex) currentImgIndex.textContent = toPersianNum(1);

    items.forEach((item, index) => {
      const slide = document.createElement("div");
      slide.className = "gallery-slide";
      
      if (item.type === "video") {
        slide.innerHTML = `<video class="gallery-media" controls playsinline preload="metadata" poster="${item.poster || ''}"><source src="${item.src}" type="video/mp4"></video>`;
      } else {
        const img = document.createElement("img");
        img.src = item.src;
        img.className = "gallery-media";
        img.onclick = () => openImageModal(item.src); 
        slide.appendChild(img);
      }
      container.appendChild(slide);

      if (dotsContainer) {
        const dot = document.createElement("div");
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => {
          const slideWidth = container.clientWidth;
          container.scrollTo({ left: -(index * slideWidth), behavior: 'smooth' });
        };
        dotsContainer.appendChild(dot);
      }
    });
    
    container.addEventListener('scroll', () => {
      const slideWidth = container.clientWidth;
      const index = Math.round(Math.abs(container.scrollLeft) / slideWidth);
      if (currentImgIndex) currentImgIndex.textContent = toPersianNum(index + 1);
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
      }
    });

    enableMouseDrag(container);
  }

  const worksContainer = document.getElementById("executedWorksContainer");
  if (worksContainer) {
      if (product.executedWorks && product.executedWorks.length > 0) {
          worksContainer.innerHTML = "";
          product.executedWorks.forEach(src => {
              const div = document.createElement("div");
              div.className = "executed-work-item";
              div.style.backgroundImage = `url('${src}')`;
              div.onclick = () => openImageModal(src); 
              worksContainer.appendChild(div);
          });
          enableMouseDrag(worksContainer);
      } else {
          worksContainer.innerHTML = `<div class="empty-state-text">تصویری برای این محصول ثبت نشده است.</div>`;
      }
  }
}

// ۹. مدیریت جستجو
function toggleSearch(show) {
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

const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();
    const resultsGrid = document.getElementById('search-results-grid');
    if (term.length < 2) {
      resultsGrid.innerHTML = "";
      return;
    }
    let html = "";
    if (typeof PRODUCTS !== "undefined") {
      Object.keys(PRODUCTS).forEach(catId => {
        PRODUCTS[catId].forEach(product => {
          if (product.name.toLowerCase().includes(term)) {
            html += `
              <div class="product-card fade-in" onclick="location.href='product.html?id=${product.id}'">
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="product-label">${product.name}</div>
              </div>`;
          }
        });
      });
    }
    resultsGrid.innerHTML = html !== "" ? html : `<div class="empty-state" style="grid-column: 1 / -1;"><p>محصولی یافت نشد!</p></div>`;
  });
}

// ۱۰. اجرای صحیح توابع (بدون تکرار)
// ۱۰. اجرای صحیح توابع هنگام لود شدن صفحه
document.addEventListener('DOMContentLoaded', () => {
  
  // الف) فعال‌سازی اسکرول با درگ موس برای محصولات تخفیف‌دار در صفحه اصلی
  const discountScroll = document.getElementById('discounted-products-scroll');
  if (discountScroll) {
      enableMouseDrag(discountScroll);
  }

  // ب) فارسی کردن اعداد تخفیف و اضافه کردن علامت درصد (٪)
  const discountBadges = document.querySelectorAll('.h-discount-badge');
  discountBadges.forEach(badge => {
      let text = badge.innerText.trim();
      // استفاده از تابع موجود در بالا برای تبدیل اعداد انگلیسی به فارسی
      text = toPersianNum(text);
      // بررسی وجود علامت درصد و اضافه کردن آن در صورت نیاز
      if (!text.includes('٪') && !text.includes('%')) {
          text += '٪';
      } else if (text.includes('%')) {
          text = text.replace('%', '٪');
      }
      badge.innerText = text;
  });

  // ج) رندرهای کلاینت‌ساید (برای بخش‌های غیر جنگویی در صورت وجود)
  if (document.getElementById('home-category-grid')) {
      renderHomePage();
  } else if (document.getElementById('product-grid')) {
      renderCategoryPage();
  } else if (document.getElementById('p-name')) {
      renderSingleProductPage();
  }
});

// ۱۱. سیستم بازگشت هوشمند
document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = window.location.pathname.split('/').pop() + window.location.search;
    if (currentUrl && !currentUrl.includes('special.html')) {
        localStorage.setItem('nassajit_last_page', currentUrl);
    }
});