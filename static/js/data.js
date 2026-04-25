// js/data.js

const CATEGORIES = [
  {
    id: "sofa",
    title: "راحتی",
    description: "مبلمان راحتی",
    image: "assets/images/Caver-rahatti-300x300-removebg-preview.png"
  },
  {
    id: "damask",
    title: "پارچه های داماسک",
    description: "کلکسیون داماسک",
    image: "assets/images/Caver-estil-300x299-removebg-preview.png"
  },
  {
    id: "avangard",
    title: "آوانگارد",
    description: "مبلمان آوانگارد",
    image: "assets/images/Cover-Esport-300x300-removebg-preview.png"
  }
];

const PRODUCTS = {

  // ===== راحتی (sofa) — ۱۱ زیردسته =====
  sofa: [
    { 
      id: "komo",           
      name: "مخمل شاینی کومو",    
      image: "assets/images/sofa-komo.jpg",
      gallery: [
        { type: "image", src: "assets/images/sofa-komo.jpg" },
        { type: "image", src: "assets/images/2-58-300x300.jpg" }, // عکس دوم الگو
        { type: "video", src: "assets/videos/sample.mp4", poster: "assets/images/sofa-komo.jpg" } // نمونه ویدیو
      ],
      executedWorks: [
        "assets/images/rahti2.png",
        "assets/images/sofa-elva.jpg"
      ]
    },
    { id: "cadillac",       name: "مخمل افکت دار کادیلاک", image: "assets/images/sofa-cadillac.jpg", gallery: [{ type: "image", src: "assets/images/sofa-cadillac.jpg" }], executedWorks: [] },
    { id: "elva",           name: "الوا",                image: "assets/images/sofa-elva.jpg", gallery: [{ type: "image", src: "assets/images/sofa-elva.jpg" }], executedWorks: [] },
    { id: "lima-luman",     name: "گونی بافت لیما",      image: "assets/images/sofa-lima-luman.jpg", gallery: [{ type: "image", src: "assets/images/sofa-lima-luman.jpg" }], executedWorks: [] },
    { id: "goni-lara",      name: "گونی بافت لارا",      image: "assets/images/sofa-goni-lara.jpg", gallery: [{ type: "image", src: "assets/images/sofa-goni-lara.jpg" }], executedWorks: [] },
    { id: "tedy",           name: "بوکله تدی",           image: "assets/images/sofa-tedy.jpg", gallery: [{ type: "image", src: "assets/images/sofa-tedy.jpg" }], executedWorks: [] },
    { id: "jilard",         name: "گونی بافت جیلارد",    image: "assets/images/sofa-jilard.jpg", gallery: [{ type: "image", src: "assets/images/sofa-jilard.jpg" }], executedWorks: [] },
    { id: "makhmali-index", name: "مخمل دورو ایندکس",   image: "assets/images/sofa-makhmali-index.jpg", gallery: [{ type: "image", src: "assets/images/sofa-makhmali-index.jpg" }], executedWorks: [] },
    { id: "pixel",          name: "پیکسل",               image: "assets/images/sofa-pixel.jpg", gallery: [{ type: "image", src: "assets/images/sofa-pixel.jpg" }], executedWorks: [] },
    { id: "goni-loman",     name: "گونی بافت لومان",     image: "assets/images/sofa-goni-loman.jpg", gallery: [{ type: "image", src: "assets/images/sofa-goni-loman.jpg" }], executedWorks: [] },
    { id: "savalan",        name: "ساوالان",              image: "assets/images/sofa-savalan.jpg", gallery: [{ type: "image", src: "assets/images/sofa-savalan.jpg" }], executedWorks: [] },
  ],

  // ===== پارچه های داماسک (damask) — ۱۲ زیردسته =====
  damask: [
    { 
      id: "julia",       
      name: "جولیا",        
      image: "assets/images/damask-julia.jpg",
      gallery: [
        { type: "image", src: "assets/images/damask-julia.jpg" },
        { type: "image", src: "assets/images/damask-julia-plus.jpg" }
      ],
      executedWorks: [
        "assets/images/damask-romulo.jpg"
      ]
    },
    { id: "larsen",      name: "لارسن",        image: "assets/images/damask-larsen.jpg", gallery: [{ type: "image", src: "assets/images/damask-larsen.jpg" }], executedWorks: [] },
    { id: "floris",      name: "فلوریس",       image: "assets/images/damask-floris.jpg", gallery: [{ type: "image", src: "assets/images/damask-floris.jpg" }], executedWorks: [] },
    { id: "julia-plus",  name: "جولیا پلاس",   image: "assets/images/damask-julia-plus.jpg", gallery: [{ type: "image", src: "assets/images/damask-julia-plus.jpg" }], executedWorks: [] },
    { id: "romulo",      name: "رومولو",       image: "assets/images/damask-romulo.jpg", gallery: [{ type: "image", src: "assets/images/damask-romulo.jpg" }], executedWorks: [] },
    { id: "jessica",     name: "جسیکا",        image: "assets/images/damask-jessica.jpg", gallery: [{ type: "image", src: "assets/images/damask-jessica.jpg" }], executedWorks: [] },
    { id: "alma",        name: "آلما",          image: "assets/images/damask-alma.jpg", gallery: [{ type: "image", src: "assets/images/damask-alma.jpg" }], executedWorks: [] },
    { id: "romulo-plus", name: "رومولو پلاس",  image: "assets/images/damask-romulo-plus.jpg", gallery: [{ type: "image", src: "assets/images/damask-romulo-plus.jpg" }], executedWorks: [] },
    { id: "aylar",       name: "آیلار",         image: "assets/images/damask-aylar.jpg", gallery: [{ type: "image", src: "assets/images/damask-aylar.jpg" }], executedWorks: [] },
    { id: "saya-plus",   name: "سایا پلاس",    image: "assets/images/damask-saya-plus.jpg", gallery: [{ type: "image", src: "assets/images/damask-saya-plus.jpg" }], executedWorks: [] },
    { id: "carlo",       name: "کارلو",        image: "assets/images/damask-carlo.jpg", gallery: [{ type: "image", src: "assets/images/damask-carlo.jpg" }], executedWorks: [] },
    { id: "viana",       name: "ویانا",        image: "assets/images/damask-viana.jpg", gallery: [{ type: "image", src: "assets/images/damask-viana.jpg" }], executedWorks: [] }
  ],

  // ===== آوانگارد (avangard) — ۱۶ زیردسته =====
  avangard: [
    { 
      id: "evan",          
      name: "اوان",            
      image: "assets/images/avangard-evan.jpg",
      gallery: [
        { type: "image", src: "assets/images/avangard-evan.jpg" },
        { type: "image", src: "assets/images/avangard-ladiz.jpg" }
      ],
      executedWorks: [
        "assets/images/avangard-nivan.jpg",
        "assets/images/avangard-selin.jpg"
      ]
    },
    {
      id: "ladiz",
      name: "لادیز",           
      image: "assets/images/avangard-ladiz.jpg",
      gallery: [
        { type: "image", src: "assets/images/avangard-ladiz.jpg" },
        { type: "image", src: "assets/images/avangard-ladiz-2.jpg" },
        { type: "video", src: "assets/images/avangard-ladiz-3.mp4", poster: "assets/images/avangard-ladiz-2.jpg"},
      ], 
      executedWorks: [
        "assets/images/avangard-ladiz-2.jpg",
        "assets/images/avangard-ladiz-2.jpg",
        "assets/images/avangard-ladiz-2.jpg",
        "assets/images/avangard-ladiz-2.jpg"
      ]
     },

    { id: "aliyan",        name: "آلیان",           image: "assets/images/avangard-aliyan.jpg", gallery: [{ type: "image", src: "assets/images/avangard-aliyan.jpg" }], executedWorks: [] },
    { id: "avin",          name: "آوین",            image: "assets/images/avangard-avin.jpg", gallery: [{ type: "image", src: "assets/images/avangard-avin.jpg" }], executedWorks: [] },
    { id: "opert",         name: "اوپرت",           image: "assets/images/avangard-opert.jpg", gallery: [{ type: "image", src: "assets/images/avangard-opert.jpg" }], executedWorks: [] },
    { id: "henza",         name: "هنزا",            image: "assets/images/avangard-henza.jpg", gallery: [{ type: "image", src: "assets/images/avangard-henza.jpg" }], executedWorks: [] },
    { id: "runi",          name: "رونی",            image: "assets/images/avangard-runi.jpg", gallery: [{ type: "image", src: "assets/images/avangard-runi.jpg" }], executedWorks: [] },
    { id: "nivan",         name: "نیوان",           image: "assets/images/avangard-nivan.jpg", gallery: [{ type: "image", src: "assets/images/avangard-nivan.jpg" }], executedWorks: [] },
    { id: "selin",         name: "سلین",            image: "assets/images/avangard-selin.jpg", gallery: [{ type: "image", src: "assets/images/avangard-selin.jpg" }], executedWorks: [] },
    { id: "larsen-sport",  name: "لارسن اسپورت",   image: "assets/images/avangard-larsen-sport.jpg", gallery: [{ type: "image", src: "assets/images/avangard-larsen-sport.jpg" }], executedWorks: [] },
    { id: "alvares",       name: "الوارس",          image: "assets/images/avangard-alvares.jpg", gallery: [{ type: "image", src: "assets/images/avangard-alvares.jpg" }], executedWorks: [] },
    { id: "jordan",        name: "جردن",            image: "assets/images/avangard-jordan.jpg", gallery: [{ type: "image", src: "assets/images/avangard-jordan.jpg" }], executedWorks: [] },
    { id: "beniz",         name: "بنیز",            image: "assets/images/avangard-beniz.jpg", gallery: [{ type: "image", src: "assets/images/avangard-beniz.jpg" }], executedWorks: [] },
    { id: "delvar",        name: "دلوار",           image: "assets/images/avangard-delvar.jpg", gallery: [{ type: "image", src: "assets/images/avangard-delvar.jpg" }], executedWorks: [] },
    { id: "maral",         name: "مارال",           image: "assets/images/avangard-maral.jpg", gallery: [{ type: "image", src: "assets/images/avangard-maral.jpg" }], executedWorks: [] },
    { id: "grouf",         name: "گروف",            image: "assets/images/avangard-grouf.jpg", gallery: [{ type: "image", src: "assets/images/avangard-grouf.jpg" }], executedWorks: [] }
  ]
};

// محصولات جدید
const NEW_PRODUCTS = [
  { id: "komo", name: "مخمل شاینی کومو", image: "assets/images/sofa-komo.jpg", category: "sofa" },
  { id: "damask-flora", name: "فلوریس", image: "assets/images/damask-floris.jpg", category: "damask" },
  { id: "avangard-liona", name: "بنیز", image: "assets/images/avangard-beniz.jpg", category: "avangard" },
  { id: "damask-rojin", name: "روژین", image: "assets/images/damask-rojin.jpg", category: "damask" },
  { id: "avangard-nika", name: "دلوار", image: "assets/images/avangard-delvar.jpg", category: "avangard" },
  { id: "savalan", name: "ساوالان", image: "assets/images/sofa-savalan.jpg", category: "sofa" },
];

// محصولات تخفیف‌دار
const DISCOUNTED_PRODUCTS = [
  { id: "avangard-sorena", name: "سورنا", image: "assets/images/avangard-grouf.jpg", category: "avangard", oldPrice: "۲,۵۰۰,۰۰۰", newPrice: "۱,۸۰۰,۰۰۰", discount: "۲۸٪" },
  { id: "sofa-baran", name: "باران", image: "assets/images/avangard-grouf.jpg", category: "sofa", oldPrice: "۱,۹۰۰,۰۰۰", newPrice: "۱,۴۰۰,۰۰۰", discount: "۲۶٪" },
  { id: "damask-bahar", name: "بهار", image: "assets/images/avangard-grouf.jpg", category: "damask", oldPrice: "۲,۲۰۰,۰۰۰", newPrice: "۱,۶۰۰,۰۰۰", discount: "۲۷٪" },
  { id: "avangard-darya", name: "دریا", image: "assets/images/avangard-grouf.jpg", category: "avangard", oldPrice: "۳,۰۰۰,۰۰۰", newPrice: "۲,۱۰۰,۰۰۰", discount: "۳۰٪" },
  { id: "sofa-mahan", name: "ماهان", image: "assets/images/avangard-grouf.jpg", category: "sofa", oldPrice: "۱,۷۰۰,۰۰۰", newPrice: "۱,۲۰۰,۰۰۰", discount: "۲۹٪" },
  { id: "damask-diana", name: "دیانا", image: "assets/images/avangard-grouf.jpg", category: "damask", oldPrice: "۲,۸۰۰,۰۰۰", newPrice: "۲,۰۰۰,۰۰۰", discount: "۲۹٪" },
];