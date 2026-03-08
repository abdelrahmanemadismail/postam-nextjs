/**
 * Seed script for Site Settings and Customer Testimonials
 * Run with: npx tsx scripts/seed-site-settings.ts
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

// ─── Site Settings (singleton) ───────────────────────────────────────────────

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  phone: "+965 0000 0000",
  whatsapp: "https://wa.me/96500000000",
  supportEmail: "support@postam.com",
  offices: [
    {
      _key: "office-istanbul",
      name: "Istanbul, Turkey",
      addressLine1: "Maslak Mah. Buyukdere Cad.",
      addressLine2: "Sariyer, Istanbul",
    },
    {
      _key: "office-kuwait",
      name: "Kuwait City, Kuwait",
      addressLine1: "Al Hamra Tower, 34th Floor",
      addressLine2: "Sharq, Kuwait City",
    },
  ],
  socialLinks: [
    { _key: "sl-ig", platform: "instagram", href: "https://instagram.com/postam" },
    { _key: "sl-tw", platform: "twitter", href: "https://twitter.com/postam" },
    { _key: "sl-fb", platform: "facebook", href: "https://facebook.com/postam" },
  ],
};

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    _id: "testimonial-1",
    _type: "testimonial",
    name: "Ali Al-Sabah",
    city: "Kuwait City",
    quote: {
      en: "I used Postam for my Black Friday shopping from Turkey. The consolidation service saved me so much on shipping to Kuwait City. Arrived in just 3 days!",
      ar: "استخدمت بوستام للتسوق في الجمعة السوداء من تركيا. وفّرت خدمة التوحيد الكثير على شحني إلى الكويت. وصل في 3 أيام فقط!",
      tr: "Türkiye'den Kara Cuma alışverişlerim için Postam'ı kullandım. Konsolidasyon hizmeti, Kuveyt'e kargoda çok tasarruf ettirdi. Sadece 3 günde geldi!",
    },
    rating: 5,
    featured: true,
    order: 1,
  },
  {
    _id: "testimonial-2",
    _type: "testimonial",
    name: "Fatima Hassan",
    city: "Salmiya",
    quote: {
      en: "The Buy For Me service is a lifesaver. I wanted a specific coffee set from a local Turkish artisan who didn't ship internationally. Postam handled everything.",
      ar: "خدمة اشتر لي منقذة. أردت طقم قهوة محددًا من حرفي تركي محلي لا يشحن دوليًا. تولّت بوستام كل شيء.",
      tr: "Benim İçin Satın Al hizmeti hayat kurtarıcı. Uluslararası gönderim yapmayan yerel bir Türk zanaatkardan belirli bir kahve seti istiyordum. Postam her şeyi hallett.",
    },
    rating: 5,
    featured: true,
    order: 2,
  },
  {
    _id: "testimonial-3",
    _type: "testimonial",
    name: "Mohammad K.",
    city: "Jahra",
    quote: {
      en: "Great customer support. I had an issue with a damaged item from the seller, and Postam helped me return it before shipping it to me. Very trustworthy.",
      ar: "دعم عملاء رائع. كان لديّ مشكلة مع منتج تالف من البائع، وساعدتني بوستام في إرجاعه قبل شحنه إليّ. موثوق جدًا.",
      tr: "Harika müşteri desteği. Satıcıdan hasarlı bir ürün aldım, Postam bana göndermeden önce iade etmeme yardım etti. Çok güvenilir.",
    },
    rating: 5,
    featured: true,
    order: 3,
  },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  try {
    await client.request({ uri: "/users/me", method: "GET" });
  } catch {
    console.error(
      "\n❌ Token check failed. Ensure SANITY_API_TOKEN is set and has Editor role.\n"
    );
    process.exit(1);
  }

  console.log("🌱 Seeding Site Settings and Testimonials...\n");

  const docs = [siteSettings, ...testimonials];

  for (const doc of docs) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await client.createOrReplace(doc as any);
      const label =
        doc._type === "siteSettings"
          ? "Site Settings"
          : (doc as typeof testimonials[0]).name;
      console.log(`  ✓ ${doc._type.padEnd(18)} ${label}`);
    } catch (err) {
      console.error(`  ✗ ${doc._id}`, err);
    }
  }

  console.log("\n✅ Done! Open Sanity Studio to edit Site Settings and Testimonials.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
