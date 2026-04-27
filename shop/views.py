from django.shortcuts import render, get_object_or_404
from .models import Category, Product
from django.http import JsonResponse

def home(request):
    # بهینه‌سازی: ارسال مستقیم به context
    return render(request, 'index.html', {
        'categories': Category.objects.all(),
        'discounted_products': Product.objects.exclude(discount__exact='').exclude(discount__isnull=True),
    })

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    return render(request, 'product.html', {'product': product})

def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug)
    return render(request, 'category_detail.html', {
        'category': category, 
        'products': category.products.all()
    })

def search(request):
    query = request.GET.get('q', '').strip()
    products = Product.objects.filter(name__icontains=query) if query else Product.objects.none()
    return render(request, 'search_results.html', {'query': query, 'products': products})

def live_search(request):
    query = request.GET.get('q', '').strip()
    results = []
    if query:
        products = Product.objects.filter(name__icontains=query)[:6]
        results = [{
            'name': p.name,
            'url': f'/product/{p.slug}/',
            'image': p.main_image.url if p.main_image else '/static/assets/images/no-image.png'
        } for p in products]
    return JsonResponse(results, safe=False)

def special_offers(request):
    products = Product.objects.exclude(discount__exact='').exclude(discount__isnull=True)
    return render(request, 'special_offers.html', {'products': products})