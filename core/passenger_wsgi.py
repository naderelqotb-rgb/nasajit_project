import os
import sys

# اضافه کردن مسیر پوشه جاری به لیست مسیرهای پایتون
sys.path.insert(0, os.path.dirname(__file__))

# تنظیم متغیر محیطی تنظیمات جنگو (نام پوشه تنظیمات شما core است)
os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

# وارد کردن متغیر اپلیکیشن از فایل wsgi اصلی پروژه
from core.wsgi import application