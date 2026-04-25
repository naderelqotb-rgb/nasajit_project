# کلمه get_object_or_404 را به خط اول اضافه کردیم
from django.shortcuts import render, get_object_or_404
from .models import Category, Product
from django.http import JsonResponse

def home(request):
    # گرفتن تمام دسته‌بندی‌ها و ارسال آن‌ها (برای حل مشکل محو شدن دسته‌بندی‌ها)
    categories = Category.objects.all()
    discounted_products = Product.objects.all() # یا هر شرطی که خودت داشتی
    
    context = {
        'categories': categories,
        'discounted_products': discounted_products,
    }
    return render(request, 'index.html', context)

# این تابع جدید برای صفحه اختصاصی هر محصول است
def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    return render(request, 'product.html', {'product': product})

def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug)
    products = category.products.all() # تمام محصولات این دسته‌بندی
    return render(request, 'category_detail.html', {'category': category, 'products': products})

def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug)
    products = category.products.all()
    return render(request, 'category_detail.html', {'category': category, 'products': products})

def search(request):
    query = request.GET.get('q', '') 
    if query:
        products = Product.objects.filter(name__icontains=query)
    else:
        products = Product.objects.none()
    return render(request, 'search_results.html', {'query': query, 'products': products})

def live_search(request):
    query = request.GET.get('q', '')
    if query:
        # پیدا کردن ۵ محصول اول که نامشان شبیه کلمه تایپ شده است
        products = Product.objects.filter(name__icontains=query)[:5]
        # تبدیل اطلاعات به فرمتی که جاوااسکریپت بفهمد (JSON)
        results = [{'name': p.name, 'url': f'/product/{p.slug}/'} for p in products]
    else:
        results = []
    return JsonResponse(results, safe=False)