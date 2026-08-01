# Team Salon — فرع النخيل

موقع ثابت سريع ومحسّن لمحركات البحث، مع إدارة محتوى عبر **Pages CMS** وGitHub ونشر تلقائي على Netlify.

## ما يمكن إدارته

- بيانات الفرع: الاسم، الهاتف، واتساب، العنوان، الخريطة والدومين.
- الخدمات الظاهرة في الرئيسية وصفحة الخدمات.
- العروض والأسعار واختيار العروض المميزة في الرئيسية.
- المقالات: إنشاء وتعديل وحذف، تصنيف، تاريخ، مسودة/منشور، SEO Title وMeta Description.
- خريطة الموقع `sitemap.xml` وملف `robots.txt` يُنشآن تلقائيًا مع كل بناء.

## التشغيل محليًا

```bash
npm run build
python3 -m http.server 8080 -d dist
```

ثم افتح `http://localhost:8080`.

## استخدام Pages CMS

1. ارفع المشروع إلى GitHub وتأكد من وجود `.pages.yml` في جذر المستودع.
2. امنح موظف السيو صلاحية على المستودع بحساب GitHub المرتبط بالبريد `ahmedusof0@gmail.com`.
3. افتح `https://app.pagescms.org` وسجّل الدخول عبر GitHub.
4. اختر المستودع والفرع `main`.
5. عدّل المحتوى واضغط حفظ؛ Pages CMS ينشئ Commit في GitHub.
6. Netlify يشغّل `npm run build` وينشر مجلد `dist` تلقائيًا.

يمكن فتح صفحة مختصرة من `/admin` للوصول إلى لوحة المحتوى.

## النشر على Netlify

إعدادات `netlify.toml` جاهزة:

- Build command: `npm run build`
- Publish directory: `dist`

قبل ربط الدومين النهائي، يمكن استخدام رابط Netlify المؤقت. بعد شراء `teamsalon-alnakheel.sa`، حدّث الدومين من `content/site.json` أو Pages CMS ثم اضبط DNS في Netlify.

## هيكل المشروع

```text
content/                 المحتوى القابل للإدارة
  site.json              بيانات الفرع
  services.json          الخدمات
  offers.json            العروض
  articles/*.md          المقالات
src/templates/           قوالب التصميم الأصلية
assets/                  CSS وJavaScript والصور
admin/                   صفحة الوصول إلى CMS
build.js                 مولّد الصفحات الثابتة
.pages.yml               إعداد Pages CMS
netlify.toml             إعداد النشر
```

## ملاحظات

- لا تعدّل ملفات `dist` يدويًا؛ فهي تُولّد من جديد عند البناء.
- أضف الصور من Pages CMS داخل `assets/images/uploads`.
- بيانات الموقع الحالية مأخوذة من النسخة المستلمة وتحتاج اعتماد العميل النهائي.
