from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=100, verbose_name="عنوان دسته")
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

# --- مدل جدید برای پشتیبان‌ها ---
class SupportContact(models.Model):
    name = models.CharField(max_length=100, verbose_name="نام پشتیبان")
    telegram_id = models.CharField(max_length=100, verbose_name="آی‌دی بله یا شماره تماس", help_text="مثلاً: admin_support")

    class Meta:
        verbose_name = "پشتیبان"
        verbose_name_plural = "پشتیبان‌ها"

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200, verbose_name="نام محصول")
    slug = models.SlugField(unique=True)
    main_image = models.ImageField(upload_to='products/')
    discount = models.CharField(max_length=50, blank=True, null=True, verbose_name="تخفیف (مثلاً ۱۰٪)")
    
    # --- فیلدهای درخواستی جدید ---
    web_url = models.URLField(blank=True, null=True, verbose_name="لینک محصول در وب‌اپ (سایت)")
    # مشکل on_submit در این خط برطرف و به on_delete تبدیل شد
    support_contact = models.ForeignKey(SupportContact, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="پشتیبان اختصاصی")

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