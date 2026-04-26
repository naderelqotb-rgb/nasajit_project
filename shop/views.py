from django.shortcuts import render, get_object_or_404
from .models import Category, Product
from django.http import JsonResponse

def home(request):
    categories = Category.objects.all()
    # تغییر مهم: فقط محصولاتی که فیلد تخفیف آن‌ها خالی نیست!
    discounted_products = Product.objects.exclude(discount__exact='').exclude(discount__isnull=True) 
    context = {
        'categories': categories,
        'discounted_products': discounted_products,
    }
    return render(request, 'index.html', context)

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    return render(request, 'product.html', {'product': product})

def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug)
    products = category.products.all() # تمام محصولات این دسته‌بندی
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
        products = Product.objects.filter(name__icontains=query)[:6]
        results = [{
            'name': p.name,
            'url': f'/product/{p.slug}/',
            'image': p.main_image.url if p.main_image else '/static/assets/images/no-image.png'
        } for p in products]
    else:
        results = []
    return JsonResponse(results, safe=False)

def special_offers(request):
    # فیلتر کردن محصولاتی که فیلد تخفیف آن‌ها خالی نیست
    products = Product.objects.exclude(discount__exact='')
    return render(request, 'special_offers.html', {'products': products})