import os
import sys

# آدرس دقیق پوشه پروژه شما در هاست (طبق چیزی که قبلا فرستاده بودی)
path = '/home/nasajits/nasajit'
if path not in sys.path:
    sys.path.insert(0, path)

# معرفی تنظیمات جنگو به سرور
os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

# اجرای مستقیم اپلیکیشن جنگو
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()