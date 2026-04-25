from django.contrib import admin
from .models import Category, Product, ProductGallery, ExecutedWork

# این دو کلاس باعث می‌شوند گالری و نمونه‌کارها را مستقیماً داخل صفحه خود محصول اضافه کنید
class ProductGalleryInline(admin.TabularInline):
    model = ProductGallery
    extra = 1

class ExecutedWorkInline(admin.TabularInline):
    model = ExecutedWork
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')
    prepopulated_fields = {'slug': ('title',)} # شناسه را خودکار از روی اسم می‌سازد

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'discount')
    list_filter = ('category',)
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductGalleryInline, ExecutedWorkInline] # اضافه کردن گالری در پایین صفحه محصول