from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=100, verbose_name="عنوان دسته‌بندی")
    slug = models.SlugField(unique=True, verbose_name="شناسه (انگلیسی)")
    description = models.TextField(blank=True, null=True, verbose_name="توضیحات")
    # قابلیت آپلود تصویر دسته‌بندی
    image = models.ImageField(upload_to='categories/', verbose_name="تصویر دسته‌بندی", blank=True, null=True)
    
    class Meta:
        verbose_name = "دسته‌بندی"
        verbose_name_plural = "دسته‌بندی‌ها"

    def __str__(self):
        return self.title

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE, verbose_name="دسته‌بندی")
    name = models.CharField(max_length=200, verbose_name="نام محصول")
    slug = models.SlugField(unique=True, verbose_name="شناسه (انگلیسی)")
    # تصویر اصلی محصول با قابلیت آپلود
    main_image = models.ImageField(upload_to='products/main/', verbose_name="تصویر اصلی", blank=True, null=True)
    # فقط درصد تخفیف باقی مانده است
    discount = models.CharField(max_length=10, blank=True, null=True, verbose_name="درصد تخفیف (مثلاً ۲۸٪)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "محصول"
        verbose_name_plural = "محصولات"

    def __str__(self):
        return self.name

class ProductGallery(models.Model):
    product = models.ForeignKey(Product, related_name='gallery', on_delete=models.CASCADE, verbose_name="محصول")
    # اجازه خالی بودن عکس اضافه شد
    image = models.ImageField(upload_to='products/gallery/', verbose_name="آپلود تصویر", null=True, blank=True)
    is_video = models.BooleanField(default=False, verbose_name="آیا ویدیو است؟")

    class Meta:
        verbose_name = "گالری محصول"
        verbose_name_plural = "گالری محصولات"

class ExecutedWork(models.Model):
    product = models.ForeignKey(Product, related_name='executed_works', on_delete=models.CASCADE, verbose_name="محصول")
    # اجازه خالی بودن عکس اضافه شد
    image = models.ImageField(upload_to='products/executed/', verbose_name="آپلود تصویر نمونه کار", null=True, blank=True)

    class Meta:
        verbose_name = "نمونه کار"
        verbose_name_plural = "نمونه کارها"