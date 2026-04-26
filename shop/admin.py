from django.contrib import admin
from .models import Category, Product, ProductGallery, ExecutedWork, SupportContact

@admin.register(SupportContact)
class SupportContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'telegram_id')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}

class ProductGalleryInline(admin.TabularInline):
    model = ProductGallery
    extra = 1

class ExecutedWorkInline(admin.TabularInline):
    model = ExecutedWork
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'discount', 'support_contact')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductGalleryInline, ExecutedWorkInline]
    fieldsets = (
        (None, {'fields': ('category', 'name', 'slug', 'main_image', 'discount')}),
        ('اتصالات و پشتیبانی', {'fields': ('web_url', 'support_contact')}),
    )