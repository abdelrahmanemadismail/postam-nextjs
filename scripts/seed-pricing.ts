/**
 * Seed script for Pricing page data
 * Run with: npx tsx scripts/seed-pricing.ts
 *
 * Requires SANITY_API_TOKEN (write token) in your .env.local
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

const pricingPage = {
  _id: "pricingPage",
  _type: "pricingPage",
  heroHeading: {
    en: "Choose the right plan for your shipping volume",
    ar: "اختر الخطة المناسبة لحجم شحناتك",
    tr: "Gönderi hacminiz için doğru planı seçin",
  },
  heroSubheading: {
    en: "Transparent pricing with no hidden fees. Start small and scale as your orders grow.",
    ar: "أسعار واضحة بدون رسوم خفية. ابدأ بخطة مناسبة ثم طوّرها مع نمو طلباتك.",
    tr: "Gizli ücret olmadan şeffaf fiyatlandırma. Küçük başlayın, siparişleriniz büyüdükçe ölçekleyin.",
  },
  plans: [
    {
      _key: "plan-starter",
      name: { en: "Starter", ar: "المبتدئ", tr: "Başlangıç" },
      description: {
        en: "For occasional shoppers who place a few orders each month.",
        ar: "للمتسوقين العرضيين الذين يجرون عددا قليلا من الطلبات شهريا.",
        tr: "Ayda birkaç sipariş veren kullanıcılar için.",
      },
      price: 0,
      currency: "$",
      billingPeriod: { en: "/ month", ar: "/ شهريا", tr: "/ ay" },
      features: [
        { _key: "starter-f1", text: { en: "1 shipment consolidation / month", ar: "دمج شحنة واحدة شهريا", tr: "Ayda 1 gönderi birleştirme" } },
        { _key: "starter-f2", text: { en: "Email support", ar: "دعم عبر البريد الإلكتروني", tr: "E-posta desteği" } },
        { _key: "starter-f3", text: { en: "Basic tracking", ar: "تتبع أساسي", tr: "Temel takip" } },
      ],
      ctaText: { en: "Start Free", ar: "ابدأ مجانا", tr: "Ücretsiz Başla" },
      ctaHref: "https://postam.com/signup",
      highlighted: false,
      order: 1,
    },
    {
      _key: "plan-growth",
      name: { en: "Growth", ar: "النمو", tr: "Büyüme" },
      description: {
        en: "Best for regular shoppers and small businesses.",
        ar: "الأفضل للمتسوقين المنتظمين والأعمال الصغيرة.",
        tr: "Düzenli alışveriş yapanlar ve küçük işletmeler için ideal.",
      },
      price: 19,
      currency: "$",
      billingPeriod: { en: "/ month", ar: "/ شهريا", tr: "/ ay" },
      features: [
        { _key: "growth-f1", text: { en: "Unlimited consolidations", ar: "دمج غير محدود للشحنات", tr: "Sınırsız birleştirme" } },
        { _key: "growth-f2", text: { en: "Priority support", ar: "دعم ذو أولوية", tr: "Öncelikli destek" } },
        { _key: "growth-f3", text: { en: "Photo inspection", ar: "فحص بالصور", tr: "Fotoğraflı kontrol" } },
      ],
      ctaText: { en: "Choose Growth", ar: "اختر النمو", tr: "Büyüme Planını Seç" },
      ctaHref: "https://postam.com/signup",
      highlighted: true,
      order: 2,
    },
    {
      _key: "plan-enterprise",
      name: { en: "Enterprise", ar: "المؤسسات", tr: "Kurumsal" },
      description: {
        en: "For high-volume sellers and teams needing custom workflows.",
        ar: "للتجار ذوي الحجم الكبير والفرق التي تحتاج سير عمل مخصصا.",
        tr: "Yüksek hacimli satıcılar ve özel iş akışına ihtiyaç duyan ekipler için.",
      },
      price: 99,
      currency: "$",
      billingPeriod: { en: "/ month", ar: "/ شهريا", tr: "/ ay" },
      features: [
        { _key: "enterprise-f1", text: { en: "Dedicated account manager", ar: "مدير حساب مخصص", tr: "Özel hesap yöneticisi" } },
        { _key: "enterprise-f2", text: { en: "API & bulk operations", ar: "واجهة API وعمليات بالجملة", tr: "API ve toplu işlemler" } },
        { _key: "enterprise-f3", text: { en: "Custom SLA", ar: "اتفاقية خدمة مخصصة", tr: "Özel SLA" } },
      ],
      ctaText: { en: "Contact Sales", ar: "تواصل مع المبيعات", tr: "Satış ile İletişim" },
      ctaHref: "https://postam.com/contact",
      highlighted: false,
      order: 3,
    },
  ],
  comparisonTable: {
    title: {
      en: "Compare plan features",
      ar: "قارن مزايا الخطط",
      tr: "Plan özelliklerini karşılaştırın",
    },
    rows: [
      {
        _key: "cmp-r1",
        feature: { en: "Monthly consolidations", ar: "عمليات الدمج الشهرية", tr: "Aylık birleştirme" },
        values: [
          { _key: "cmp-r1-c1", planIndex: 0, value: { en: "1", ar: "1", tr: "1" }, isIncluded: false },
          { _key: "cmp-r1-c2", planIndex: 1, value: { en: "Unlimited", ar: "غير محدود", tr: "Sınırsız" }, isIncluded: false },
          { _key: "cmp-r1-c3", planIndex: 2, value: { en: "Unlimited", ar: "غير محدود", tr: "Sınırsız" }, isIncluded: false },
        ],
      },
      {
        _key: "cmp-r2",
        feature: { en: "Priority support", ar: "دعم ذو أولوية", tr: "Öncelikli destek" },
        values: [
          { _key: "cmp-r2-c1", planIndex: 0, isIncluded: false },
          { _key: "cmp-r2-c2", planIndex: 1, isIncluded: true },
          { _key: "cmp-r2-c3", planIndex: 2, isIncluded: true },
        ],
      },
      {
        _key: "cmp-r3",
        feature: { en: "Dedicated account manager", ar: "مدير حساب مخصص", tr: "Özel hesap yöneticisi" },
        values: [
          { _key: "cmp-r3-c1", planIndex: 0, isIncluded: false },
          { _key: "cmp-r3-c2", planIndex: 1, isIncluded: false },
          { _key: "cmp-r3-c3", planIndex: 2, isIncluded: true },
        ],
      },
    ],
  },
  ctaSection: {
    heading: {
      en: "Need a custom shipping setup?",
      ar: "هل تحتاج إعداد شحن مخصصا؟",
      tr: "Özel bir kargo kurulumu mu gerekiyor?",
    },
    description: {
      en: "Talk to our team to design a plan for your business volume and destinations.",
      ar: "تواصل مع فريقنا لتصميم خطة تناسب حجم أعمالك ووجهاتك.",
      tr: "İş hacminize ve hedef ülkelerinize uygun planı birlikte tasarlayalım.",
    },
    buttonText: {
      en: "Talk to Sales",
      ar: "تحدث مع المبيعات",
      tr: "Satış ile Görüş",
    },
    buttonLink: "https://postam.com/contact",
  },
};

async function seed() {
  try {
    await client.request({ uri: "/users/me", method: "GET" });
  } catch {
    console.error(
      "\n❌ Token check failed. Ensure SANITY_API_TOKEN is set and has Editor role.\n"
    );
    process.exit(1);
  }

  console.log("🌱 Seeding Pricing page...\n");

  try {
    await client.createOrReplace(pricingPage as never);
    console.log("  ✓ pricingPage        Pricing Page");
  } catch (err) {
    console.error("  ✗ pricingPage", err);
    process.exit(1);
  }

  console.log("\n✅ Done! Open Sanity Studio to review/edit Pricing Page content.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
