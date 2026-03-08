/**
 * Seed script for Help Center data
 * Run with: npx tsx scripts/seed-help-center.ts
 *
 * Requires SANITY_API_TOKEN (write token) in your .env.local
 * Get it from: https://www.sanity.io/manage → project → API → Tokens
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-03-05",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ─── Categories ─────────────────────────────────────────────────────────────

const categories = [
  {
    _id: "help-cat-getting-started",
    _type: "helpCategory",
    title: { en: "Getting Started", ar: "البداية", tr: "Başlangıç" },
    slug: { _type: "slug", current: "getting-started" },
    description: {
      en: "New to Postam? Learn how to create your account and start shipping today.",
      ar: "جديد على بوستام؟ تعرف على كيفية إنشاء حسابك والبدء في الشحن اليوم.",
      tr: "Postam'a yeni misiniz? Hesabınızı nasıl oluşturacağınızı ve bugün gönderime nasıl başlayacağınızı öğrenin.",
    },
    icon: "rocket",
    order: 1,
  },
  {
    _id: "help-cat-shipping-tracking",
    _type: "helpCategory",
    title: { en: "Shipping & Tracking", ar: "الشحن والتتبع", tr: "Kargo & Takip" },
    slug: { _type: "slug", current: "shipping-tracking" },
    description: {
      en: "Everything about parcel routes, delivery times, and real-time GPS tracking.",
      ar: "كل شيء عن مسارات الطرود وأوقات التسليم وتتبع GPS في الوقت الفعلي.",
      tr: "Paket güzergahları, teslimat süreleri ve gerçek zamanlı GPS takibi hakkında her şey.",
    },
    icon: "truck",
    order: 2,
  },
  {
    _id: "help-cat-buy-for-me",
    _type: "helpCategory",
    title: { en: "Buy For Me Service", ar: "خدمة اشتر لي", tr: "Benim İçin Satın Al" },
    slug: { _type: "slug", current: "buy-for-me" },
    description: {
      en: "Let us handle the shopping. Learn about our concierge purchasing service.",
      ar: "دعنا نتولى التسوق. تعرف على خدمة الشراء الموثوق بنا.",
      tr: "Alışverişi biz halledelim. Konsiyerj satın alma hizmetimiz hakkında bilgi edinin.",
    },
    icon: "cart",
    order: 3,
  },
  {
    _id: "help-cat-payments",
    _type: "helpCategory",
    title: { en: "Payments & Billing", ar: "المدفوعات والفواتير", tr: "Ödemeler & Faturalama" },
    slug: { _type: "slug", current: "payments-billing" },
    description: {
      en: "Guide to shipping rates, custom duties, and managing your invoices.",
      ar: "دليل لأسعار الشحن والرسوم الجمركية وإدارة فواتيرك.",
      tr: "Kargo ücretleri, gümrük vergileri ve faturalarınızı yönetme rehberi.",
    },
    icon: "payments",
    order: 4,
  },
  {
    _id: "help-cat-prohibited",
    _type: "helpCategory",
    title: { en: "Prohibited Items", ar: "البنود الممنوعة", tr: "Yasaklı Ürünler" },
    slug: { _type: "slug", current: "prohibited-items" },
    description: {
      en: "Check our safety guidelines to see what we can and cannot ship internationally.",
      ar: "راجع إرشادات الأمان لمعرفة ما يمكننا شحنه دوليا وما لا يمكن.",
      tr: "Uluslararası olarak ne gönderebileceğimizi ve ne gönderemeyeceğimizi öğrenmek için güvenlik yönergelerimize bakın.",
    },
    icon: "block",
    order: 5,
  },
  {
    _id: "help-cat-corporate",
    _type: "helpCategory",
    title: { en: "Corporate Solutions", ar: "الحلول المؤسسية", tr: "Kurumsal Çözümler" },
    slug: { _type: "slug", current: "corporate-solutions" },
    description: {
      en: "Bulk shipping and logistics management for businesses and stores.",
      ar: "الشحن بالجملة وإدارة اللوجستيات للشركات والمتاجر.",
      tr: "İşletmeler ve mağazalar için toplu kargo ve lojistik yönetimi.",
    },
    icon: "headset",
    order: 6,
  },
];

// ─── Articles ────────────────────────────────────────────────────────────────

const articles = [
  // ── Getting Started
  {
    _id: "help-art-create-account",
    _type: "helpArticle",
    title: { en: "How to create your Postam account", ar: "كيفية إنشاء حساب بوستام", tr: "Postam hesabınızı nasıl oluşturursunuz" },
    slug: { _type: "slug", current: "create-account" },
    category: { _type: "reference", _ref: "help-cat-getting-started" },
    excerpt: {
      en: "Create your free Postam account in under 60 seconds and get your personal Turkish shipping address instantly.",
      ar: "أنشئ حساب بوستام المجاني في أقل من 60 ثانية واحصل على عنوان الشحن التركي الخاص بك فورا.",
      tr: "Ücretsiz Postam hesabınızı 60 saniyeden kısa sürede oluşturun ve kişisel Türk kargo adresinizi anında alın.",
    },
    content: {
      en: `## Creating Your Postam Account

Getting started with Postam takes less than a minute. Follow these simple steps:

### Step 1 – Visit the Sign-Up Page
Go to **postam.com** and click **Sign Up** in the top navigation bar.

### Step 2 – Enter Your Details
Fill in:
- Your full name
- Your email address
- A secure password (minimum 8 characters)

### Step 3 – Verify Your Email
We'll send a verification code to your inbox. Enter it on the verification screen to activate your account.

### Step 4 – Get Your Address
Once verified, your personal **Postam Istanbul warehouse address** will be available instantly under **My Account → My Address**. Use this address when checking out from any Turkish online store.

---

**Tip:** You can also sign up using your Google or Apple account for a faster experience.`,
      ar: `## إنشاء حساب بوستام

البدء مع بوستام يستغرق أقل من دقيقة. اتبع الخطوات البسيطة التالية:

### الخطوة 1 – زيارة صفحة التسجيل
انتقل إلى **postam.com** وانقر على **تسجيل** في شريط التنقل العلوي.

### الخطوة 2 – أدخل بياناتك
أدخل:
- اسمك الكامل
- عنوان بريدك الإلكتروني
- كلمة مرور آمنة (8 أحرف على الأقل)

### الخطوة 3 – تحقق من بريدك الإلكتروني
سنرسل رمز التحقق إلى بريدك الوارد. أدخله في شاشة التحقق لتفعيل حسابك.

### الخطوة 4 – احصل على عنوانك
بعد التحقق، سيكون عنوان **مستودع بوستام في إسطنبول** الخاص بك متاحا فورا تحت **حسابي ← عنواني**.`,
      tr: `## Postam Hesabınızı Oluşturma

Postam'a başlamak bir dakikadan az sürer. Bu basit adımları izleyin:

### Adım 1 – Kayıt Sayfasını Ziyaret Edin
**postam.com** adresine gidin ve üst gezinme çubuğundaki **Kayıt Ol** butonuna tıklayın.

### Adım 2 – Bilgilerinizi Girin
- Tam adınız
- E-posta adresiniz
- Güvenli bir şifre (minimum 8 karakter)

### Adım 3 – E-postanızı Doğrulayın
Gelen kutunuza bir doğrulama kodu göndereceğiz. Hesabınızı etkinleştirmek için doğrulama ekranına girin.

### Adım 4 – Adresinizi Alın
Doğrulandıktan sonra kişisel **Postam İstanbul depo adresiniz** anında **Hesabım → Adresim** altında kullanılabilir olacak.`,
    },
    featured: true,
    helpfulCount: 1842,
    publishedAt: "2026-01-10T10:00:00Z",
  },
  {
    _id: "help-art-first-shipment",
    _type: "helpArticle",
    title: { en: "Sending your first shipment", ar: "إرسال شحنتك الأولى", tr: "İlk gönderinizi göndermek" },
    slug: { _type: "slug", current: "first-shipment" },
    category: { _type: "reference", _ref: "help-cat-getting-started" },
    excerpt: {
      en: "A complete walkthrough for new users: shop from a Turkish store, register your package, and get it delivered.",
      ar: "دليل كامل للمستخدمين الجدد: تسوق من متجر تركي، سجّل طردك، واستلمه.",
      tr: "Yeni kullanıcılar için eksiksiz rehber: Türk bir mağazadan alışveriş yapın, paketinizi kaydedin ve teslim alın.",
    },
    content: {
      en: `## Your First Shipment with Postam

### 1. Shop From a Turkish Store
Use your Postam Istanbul address at checkout. Popular stores include Trendyol, Hepsiburada, and Zara Turkey.

### 2. Declare Your Package
Log in to your Postam dashboard and click **Declare Package**. Enter:
- Store name
- Order number
- Estimated value
- Item description

Declaring your package speeds up processing at our warehouse.

### 3. We Receive It
Once your package arrives at our Istanbul warehouse, you'll receive an email notification. You can then review the package details and request consolidation if you have multiple parcels.

### 4. Choose a Shipping Plan
Select a shipping plan based on speed and budget:
- **Express** – 2–4 business days
- **Standard** – 5–8 business days

### 5. Pay & Track
After payment, your parcel is dispatched. Track it live from your dashboard.`,
      ar: `## شحنتك الأولى مع بوستام\n\n### 1. تسوق من متجر تركي\nاستخدم عنوان بوستام في إسطنبول عند الدفع. تشمل المتاجر الشهيرة Trendyol وHepsiburada وZara Turkey.\n\n### 2. سجّل طردك\nسجّل الدخول إلى لوحة تحكم بوستام وانقر على **سجّل طردًا**.\n\n### 3. استلمنا له\nبمجرد وصول طردك إلى مستودعنا في إسطنبول، ستتلقى إشعارًا بالبريد الإلكتروني.\n\n### 4. اختر خطة شحن\n- **سريع** – 2–4 أيام عمل\n- **عادي** – 5–8 أيام عمل\n\n### 5. ادفع وتابع\nبعد الدفع، يُرسل طردك. تابعه مباشرةً من لوحة التحكم.`,
      tr: `## Postam ile İlk Gönderiniz\n\n### 1. Türk Bir Mağazadan Alışveriş Yapın\nÖdeme sırasında Postam İstanbul adresinizi kullanın.\n\n### 2. Paketinizi Beyan Edin\nPostam panonuza giriş yapın ve **Paket Beyan Et**'e tıklayın.\n\n### 3. Biz Aldık\nPaketiniz İstanbul depomuza ulaştığında e-posta bildirimi alacaksınız.\n\n### 4. Bir Kargo Planı Seçin\n- **Ekspres** – 2–4 iş günü\n- **Standart** – 5–8 iş günü\n\n### 5. Öde ve Takip Et\nÖdeme sonrası paketiniz gönderilir. Panodan canlı takip edin.`,
    },
    featured: false,
    helpfulCount: 934,
    publishedAt: "2026-01-12T10:00:00Z",
  },

  // ── Buy For Me
  {
    _id: "help-art-bfm-how-it-works",
    _type: "helpArticle",
    title: { en: "How does the Buy For Me service work?", ar: "كيف تعمل خدمة اشتر لي؟", tr: "Benim İçin Satın Al hizmeti nasıl çalışır?" },
    slug: { _type: "slug", current: "how-it-works" },
    category: { _type: "reference", _ref: "help-cat-buy-for-me" },
    excerpt: {
      en: "If you can't pay with your local card or the store doesn't ship to you, Postam will purchase items on your behalf in 4 easy steps.",
      ar: "إذا لم تستطع الدفع ببطاقتك المحلية أو كان المتجر لا يشحن إليك، ستشتري بوستام العناصر نيابةً عنك في 4 خطوات بسيطة.",
      tr: "Yerel kartınızla ödeme yapamıyorsanız veya mağaza size gönderim yapmıyorsa, Postam 4 kolay adımda sizin adınıza ürün satın alır.",
    },
    content: {
      en: `## How the Buy For Me Service Works

If you want to purchase an item from an international store but don't have a supported payment method or the store doesn't ship to your location, Postam can help.

### Step 1 – Submit Your Request
- Paste the product link from the online store
- Tell us the quantity, size, color, and any other specific details
- You can submit multiple items in a single request

### Step 2 – Get a Quotation
Our procurement team will review your request within **24 hours**. The quote includes:
- Item price
- Local shipping to our warehouse
- International shipping to your address
- A small service fee (starting at 5%)

### Step 3 – Make Payment
Once you approve the quote, pay using:
- Bank transfer
- Credit/debit card
- Mobile money (available in select regions)

We immediately purchase the item once payment is confirmed.

### Step 4 – Delivery
We receive the item, perform a quality check, and ship it directly to your door. Track every step via your dashboard.

---

> **Service Fee:** Our fee starts at **5%** of the item value (minimum $3 USD). There are no hidden charges.`,
      ar: `## كيف تعمل خدمة اشتر لي\n\n### الخطوة 1 – أرسل طلبك\nالصق رابط المنتج وأخبرنا بالكمية والمقاس واللون.\n\n### الخطوة 2 – احصل على عرض سعر\nسيراجع فريقنا طلبك في غضون **24 ساعة** ويرسل لك عرضًا يشمل سعر المنتج + الشحن + رسوم الخدمة.\n\n### الخطوة 3 – ادفع\nبعد الموافقة على العرض، ادفع بالطريقة التي تفضلها.\n\n### الخطوة 4 – التسليم\nنستلم المنتج ونتحقق من جودته ونشحنه مباشرة إلى بابك.`,
      tr: `## Benim İçin Satın Al Hizmeti Nasıl Çalışır\n\n### Adım 1 – Talebinizi Gönderin\nÜrün linkini yapıştırın, miktar/beden/renk belirtin.\n\n### Adım 2 – Teklif Alın\nEkibimiz **24 saat** içinde; ürün fiyatı + kargo + hizmet bedeli dahil teklif gönderir.\n\n### Adım 3 – Ödeme Yapın\nTeklifi onaylar onaylamaz tercih ettiğiniz yöntemle ödeyin.\n\n### Adım 4 – Teslimat\nÜrünü teslim alır, kalite kontrolü yapar ve doğrudan kapınıza göndeririz.`,
    },
    featured: true,
    helpfulCount: 2482,
    publishedAt: "2026-01-15T10:00:00Z",
    relatedArticles: [
      { _type: "reference", _ref: "help-art-bfm-fees" },
    ],
  },
  {
    _id: "help-art-bfm-fees",
    _type: "helpArticle",
    title: { en: "Buy For Me – Pricing & Fees", ar: "اشتر لي – الأسعار والرسوم", tr: "Benim İçin Satın Al – Fiyatlandırma" },
    slug: { _type: "slug", current: "pricing-fees" },
    category: { _type: "reference", _ref: "help-cat-buy-for-me" },
    excerpt: {
      en: "Understand our transparent fee structure for the Buy For Me concierge service.",
      ar: "افهم هيكل الرسوم الشفاف لخدمة الشراء لصالحك.",
      tr: "Benim İçin Satın Al hizmetinin şeffaf ücret yapısını anlayın.",
    },
    content: {
      en: `## Buy For Me – Pricing & Fees

### Service Fee
Our service fee is calculated as a percentage of the **item price**:

| Item Value | Service Fee |
|---|---|
| Up to $50 | 8% (min $3) |
| $51 – $200 | 6% |
| $201 – $500 | 5% |
| $501 and above | 4% |

### What's Included
- Professional procurement from local Turkish store
- Quality inspection before shipping
- Product photos on request
- Packaging and labelling

### What's Not Included
- International shipping (charged separately based on weight & dimensions)
- Customs duties (if applicable in your destination country)

---

**Example:** You want a pair of shoes priced at $120.
- Item: $120
- Service fee (6%): $7.20
- Shipping: calculated by weight
- **Total estimate:** ~$127.20 + shipping`,
      ar: `## اشتر لي – الأسعار والرسوم\n\n### رسوم الخدمة\n\n| قيمة المنتج | رسوم الخدمة |\n|---|---|\n| حتى $50 | 8% (حد أدنى $3) |\n| $51 – $200 | 6% |\n| $201 – $500 | 5% |\n| $501 وما فوق | 4% |\n\n### ما هو مشمول\n- الشراء المهني من المتجر التركي المحلي\n- فحص الجودة قبل الشحن\n- صور المنتج عند الطلب`,
      tr: `## Benim İçin Satın Al – Fiyatlandırma\n\n### Hizmet Ücreti\n\n| Ürün Değeri | Hizmet Ücreti |\n|---|---|\n| 50$'a kadar | 8% (min $3) |\n| $51 – $200 | 6% |\n| $201 – $500 | 5% |\n| $501 ve üzeri | 4% |\n\n### Dahil Olanlar\n- Yerel Türk mağazasından profesyonel satın alma\n- Kargo öncesi kalite kontrolü\n- İstek üzerine ürün fotoğrafları`,
    },
    featured: false,
    helpfulCount: 1105,
    publishedAt: "2026-01-16T10:00:00Z",
    relatedArticles: [
      { _type: "reference", _ref: "help-art-bfm-how-it-works" },
    ],
  },

  // ── Shipping & Tracking
  {
    _id: "help-art-track-parcel",
    _type: "helpArticle",
    title: { en: "How to track your parcel", ar: "كيفية تتبع طردك", tr: "Paketinizi nasıl takip edersiniz" },
    slug: { _type: "slug", current: "track-parcel" },
    category: { _type: "reference", _ref: "help-cat-shipping-tracking" },
    excerpt: {
      en: "Use your dashboard or tracking number to follow your parcel every step of the way.",
      ar: "استخدم لوحة التحكم أو رقم التتبع لمتابعة طردك في كل خطوة.",
      tr: "Her adımda paketinizi takip etmek için panonuzu veya takip numaranızı kullanın.",
    },
    content: {
      en: `## Tracking Your Parcel

### Option 1 – Dashboard Tracking
Log in to your Postam account and go to **My Orders**. Each shipment shows a live status bar:
1. **Received at Warehouse**
2. **In Transit to Hub**
3. **Customs Clearance**
4. **Out for Delivery**
5. **Delivered**

### Option 2 – Tracking Number
Every shipment has a unique tracking number (format: \`PTM-XXXXXXXX\`). Enter it at:
- postam.com/track
- Or directly on the carrier's website

### Notifications
Enable push or email notifications in **Settings → Notifications** to receive real-time updates at every status change.

---

**Note:** Tracking updates may take up to 2 hours to refresh after a status change.`,
      ar: `## تتبع طردك\n\n### الخيار 1 – تتبع لوحة التحكم\nسجّل الدخول إلى حساب بوستام وانتقل إلى **طلباتي**. يعرض كل شحنة شريط الحالة المباشر.\n\n### الخيار 2 – رقم التتبع\nلكل شحنة رقم تتبع فريد (التنسيق: PTM-XXXXXXXX). أدخله على postam.com/track.`,
      tr: `## Paketinizi Takip Etme\n\n### Seçenek 1 – Pano Takibi\nPostam hesabınıza giriş yapın ve **Siparişlerim**'e gidin. Her gönderi canlı durum çubuğu gösterir.\n\n### Seçenek 2 – Takip Numarası\nHer gönderi benzersiz bir takip numarasına sahiptir (PTM-XXXXXXXX). postam.com/track adresine girin.`,
    },
    featured: true,
    helpfulCount: 3210,
    publishedAt: "2026-01-20T10:00:00Z",
  },
  {
    _id: "help-art-shipping-times",
    _type: "helpArticle",
    title: { en: "Shipping times & delivery estimates", ar: "أوقات الشحن وتقديرات التسليم", tr: "Kargo süreleri ve teslimat tahminleri" },
    slug: { _type: "slug", current: "shipping-times" },
    category: { _type: "reference", _ref: "help-cat-shipping-tracking" },
    excerpt: {
      en: "Find out how long international shipping takes and what factors can affect your delivery date.",
      ar: "تعرف على مدة الشحن الدولي والعوامل التي يمكن أن تؤثر على تاريخ تسليمك.",
      tr: "Uluslararası kargonun ne kadar sürdüğünü ve teslimat tarihinizi etkileyebilecek faktörleri öğrenin.",
    },
    content: {
      en: `## Shipping Times & Delivery Estimates

### Standard Shipping
- **Turkey → Kuwait:** 5–8 business days
- **Turkey → UAE:** 4–7 business days
- **Turkey → Saudi Arabia:** 5–9 business days

### Express Shipping
- **Turkey → Kuwait:** 2–4 business days
- **Turkey → UAE:** 2–3 business days
- **Turkey → Saudi Arabia:** 3–5 business days

### Factors That Can Delay Delivery
- **Customs inspection** – Random checks by destination country customs
- **Peak seasons** – Ramadan, Black Friday, and National holidays
- **Incomplete address** – Always double-check your delivery address
- **Weather disruptions** – Rare but possible

### What Day Does the Clock Start?
The delivery estimate starts from the day we **dispatch** your parcel from our Istanbul hub, not from the day you placed the order.`,
      ar: `## أوقات الشحن وتقديرات التسليم\n\n### الشحن العادي\n- **تركيا ← الكويت:** 5–8 أيام عمل\n- **تركيا ← الإمارات:** 4–7 أيام عمل\n\n### الشحن السريع\n- **تركيا ← الكويت:** 2–4 أيام عمل\n- **تركيا ← الإمارات:** 2–3 أيام عمل`,
      tr: `## Kargo Süreleri ve Teslimat Tahminleri\n\n### Standart Kargo\n- **Türkiye → Kuveyt:** 5–8 iş günü\n- **Türkiye → BAE:** 4–7 iş günü\n\n### Ekspres Kargo\n- **Türkiye → Kuveyt:** 2–4 iş günü\n- **Türkiye → BAE:** 2–3 iş günü`,
    },
    featured: false,
    helpfulCount: 2780,
    publishedAt: "2026-01-22T10:00:00Z",
  },

  // ── Prohibited Items
  {
    _id: "help-art-prohibited-list",
    _type: "helpArticle",
    title: { en: "Complete list of prohibited items", ar: "القائمة الكاملة للبنود الممنوعة", tr: "Yasaklı ürünlerin tam listesi" },
    slug: { _type: "slug", current: "prohibited-list" },
    category: { _type: "reference", _ref: "help-cat-prohibited" },
    excerpt: {
      en: "Review the complete list of items we are unable to ship internationally for safety and legal compliance reasons.",
      ar: "راجع القائمة الكاملة للعناصر التي لا يمكننا شحنها دوليًا لأسباب السلامة والامتثال القانوني.",
      tr: "Güvenlik ve yasal uyum nedeniyle uluslararası gönderemeyeceğimiz ürünlerin tam listesine bakın.",
    },
    content: {
      en: `## Prohibited Items

To comply with international shipping regulations and ensure the safety of all shipments, the following items **cannot be shipped** through Postam:

### Absolutely Prohibited
- **Weapons & Ammunition** – Firearms, knives, explosives
- **Narcotics & Controlled Substances** – Drugs, psychoactive substances
- **Flammable & Hazardous Materials** – Aerosols, petrol, paint
- **Live Animals & Plants**
- **Counterfeit Goods** – Fake branded products

### Restricted Items (require prior approval)
- Lithium batteries (standalone, not in devices)
- Prescription medication (must have valid prescription)
- Alcohol (only allowed in select corridors)
- Perfume over 100ml (air freight restrictions)

### Electronics
Most consumer electronics are fine. However, items containing **large lithium-ion batteries** (laptops, e-scooters) require pre-approval.

---

> If you are unsure whether your item is allowed, contact our support team **before placing your order**.`,
      ar: `## البنود الممنوعة\n\n### ممنوع تمامًا\n- الأسلحة والذخيرة\n- المخدرات والمواد الخاضعة للرقابة\n- المواد القابلة للاشتعال والخطرة\n- الحيوانات والنباتات الحية\n- البضائع المقلدة\n\n### عناصر مقيدة (تتطلب موافقة مسبقة)\n- بطاريات الليثيوم المستقلة\n- الأدوية الموصوفة\n- الكحول (في ممرات محددة فقط)`,
      tr: `## Yasaklı Ürünler\n\n### Kesinlikle Yasak\n- Silahlar ve mühimmat\n- Uyuşturucular ve kontrollü maddeler\n- Yanıcı ve tehlikeli maddeler\n- Canlı hayvanlar ve bitkiler\n- Sahte ürünler\n\n### Kısıtlı Ürünler (ön onay gerektirir)\n- Bağımsız lityum piller\n- Reçeteli ilaç\n- Alkol (belirli koridorlarda)`,
    },
    featured: true,
    helpfulCount: 4102,
    publishedAt: "2026-01-18T10:00:00Z",
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    _id: "help-faq-1",
    _type: "helpFaq",
    question: {
      en: "How long does international shipping typically take?",
      ar: "كم من الوقت يستغرق الشحن الدولي عادةً؟",
      tr: "Uluslararası kargo genellikle ne kadar sürer?",
    },
    answer: {
      en: "Standard shipping from Turkey to Kuwait takes 5–8 business days. Express shipping takes 2–4 business days. Actual delivery may vary depending on customs clearance and local carrier schedules.",
      ar: "يستغرق الشحن العادي من تركيا إلى الكويت 5-8 أيام عمل. أما الشحن السريع فيستغرق 2-4 أيام عمل. قد يتفاوت الوقت الفعلي حسب التخليص الجمركي وجداول الناقل المحلي.",
      tr: "Türkiye'den Kuveyt'e standart kargo 5–8 iş günü sürer. Ekspres kargo 2–4 iş günü sürer. Gerçek teslimat, gümrük tasviyesine ve yerel taşıyıcı programlarına göre değişebilir.",
    },
    featured: true,
    order: 1,
  },
  {
    _id: "help-faq-2",
    _type: "helpFaq",
    question: {
      en: "How do I track my parcel in real-time?",
      ar: "كيف أتتبع طردي في الوقت الفعلي؟",
      tr: "Paketimi gerçek zamanlı nasıl takip ederim?",
    },
    answer: {
      en: "Log in to your Postam dashboard and go to My Orders. Each shipment has a live status bar and a unique tracking number (PTM-XXXXXXXX). You can also enter your tracking number at postam.com/track.",
      ar: "سجّل الدخول إلى لوحة تحكم بوستام وانتقل إلى طلباتي. لكل شحنة شريط حالة مباشر ورقم تتبع فريد (PTM-XXXXXXXX). يمكنك أيضًا إدخال رقم التتبع على postam.com/track.",
      tr: "Postam panonuza giriş yapın ve Siparişlerim'e gidin. Her gönderi canlı durum çubuğuna ve benzersiz takip numarasına (PTM-XXXXXXXX) sahiptir. postam.com/track adresine de girebilirsiniz.",
    },
    featured: true,
    order: 2,
  },
  {
    _id: "help-faq-3",
    _type: "helpFaq",
    question: {
      en: "What are the additional service fees for the Buy For Me service?",
      ar: "ما هي رسوم الخدمة الإضافية لخدمة اشتر لي؟",
      tr: "Benim İçin Satın Al hizmeti için ek hizmet ücretleri nelerdir?",
    },
    answer: {
      en: "Our service fee starts at 5% of the item value (minimum $3 USD) and decreases for higher-value orders. This fee covers procurement, quality inspection, and coordination. International shipping is charged separately by weight.",
      ar: "تبدأ رسوم خدمتنا بنسبة 5٪ من قيمة المنتج (بحد أدنى 3 دولار أمريكي) وتنخفض للطلبات ذات القيمة الأعلى. تغطي هذه الرسوم الشراء وفحص الجودة والتنسيق. يُحتسب الشحن الدولي بشكل منفصل حسب الوزن.",
      tr: "Hizmet ücretimiz ürün değerinin %5'inden başlar (minimum 3 USD) ve yüksek değerli siparişler için azalır. Bu ücret tedariki, kalite kontrolünü ve koordinasyonu kapsar. Uluslararası kargo ağırlığa göre ayrıca hesaplanır.",
    },
    featured: true,
    order: 3,
  },
  {
    _id: "help-faq-4",
    _type: "helpFaq",
    question: {
      en: "Can I change my delivery address after the parcel has shipped?",
      ar: "هل يمكنني تغيير عنوان التسليم بعد شحن الطرد؟",
      tr: "Paket gönderildikten sonra teslimat adresimi değiştirebilir miyim?",
    },
    answer: {
      en: "Address changes after dispatch are not guaranteed. Contact our support team immediately via WhatsApp or email. We will do our best to update the address with the carrier, but this may incur a redirection fee and cause a delay of 1–2 business days.",
      ar: "لا يمكن ضمان تغييرات العنوان بعد الإرسال. تواصل مع فريق دعمنا فورًا عبر واتساب أو البريد الإلكتروني. سنبذل قصارى جهدنا لتحديث العنوان مع الناقل، ولكن قد يترتب على ذلك رسوم إعادة توجيه وتأخير يوم إلى يومين.",
      tr: "Gönderi sonrası adres değişiklikleri garanti edilmez. WhatsApp veya e-posta ile derhal destek ekibimizle iletişime geçin. Taşıyıcı ile adresi güncellemeye çalışacağız, ancak bu yönlendirme ücreti ve 1–2 iş günü gecikmeye neden olabilir.",
    },
    featured: true,
    order: 4,
  },
  {
    _id: "help-faq-5",
    _type: "helpFaq",
    question: {
      en: "What payment methods are accepted?",
      ar: "ما طرق الدفع المقبولة؟",
      tr: "Hangi ödeme yöntemleri kabul edilmektedir?",
    },
    answer: {
      en: "We accept Visa, Mastercard, KNET (Kuwait), bank transfers, and select mobile payment apps. Payment options vary slightly by country. All transactions are secured with 256-bit SSL encryption.",
      ar: "نقبل فيزا وماستركارد وكي-نت (الكويت) والتحويلات البنكية وبعض تطبيقات الدفع المحمول. تتفاوت خيارات الدفع قليلاً حسب الدولة. جميع المعاملات مؤمّنة بتشفير SSL 256 بت.",
      tr: "Visa, Mastercard, banka transferleri ve bazı mobil ödeme uygulamalarını kabul ediyoruz. Ödeme seçenekleri ülkeye göre farklılık gösterebilir. Tüm işlemler 256-bit SSL şifrelemesiyle güvence altındadır.",
    },
    featured: false,
    order: 5,
  },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  // Verify token has write access before proceeding
  try {
    await client.request({ uri: "/users/me", method: "GET" });
  } catch {
    console.error(
      "\n❌ Token check failed. Ensure SANITY_API_TOKEN is set and has Editor role.\n" +
      "   Get one at: https://sanity.io/manage → API → Tokens → Add API token (Editor role)\n"
    );
    process.exit(1);
  }

  console.log("🌱 Seeding Help Center data...\n");

  // Upsert all documents using createOrReplace so it's idempotent
  const docs = [...categories, ...articles, ...faqs];

  for (const doc of docs) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await client.createOrReplace(doc as any);
      console.log(`  ✓ ${doc._type.padEnd(16)} ${(doc as { title?: { en?: string }; question?: { en?: string } }).title?.en ?? (doc as { question?: { en?: string } }).question?.en ?? doc._id}`);
    } catch (err) {
      console.error(`  ✗ ${doc._id}`, err);
    }
  }

  console.log("\n✅ Done! Open Sanity Studio to review the content.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
