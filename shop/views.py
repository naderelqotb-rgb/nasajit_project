# کلمه get_object_or_404 را به خط اول اضافه کردیم
from django.shortcuts import render, get_object_or_404
from .models import Category, Product

def home(request):
    categories = Category.objects.all()
    discounted_products = Product.objects.exclude(discount__isnull=True).exclude(discount__exact='')
    
    context = {
        'categories': categories,
        'discounted_products': discounted_products,
    }
    return render(request, 'index.html', context)

# این تابع جدید برای صفحه اختصاصی هر محصول است
def product_detail(request, slug):
    # محصول را بر اساس شناسه (slug) پیدا می‌کند
    product = get_object_or_404(Product, slug=slug)
    
    context = {
        'product': product,
    }
    return render(request, 'product.html', context)