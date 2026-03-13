import {defineQuery} from "next-sanity";

export const getAllPostsQuery = defineQuery(`*[_type == "post"
  && (
    !defined($category) || $category == "" ||
    $category in categories[]->slug.current
  )
  && (
    !defined($searchPattern) || $searchPattern == "" ||
    lower(coalesce(title[$locale], title[$defaultLocale], title.en, "")) match lower($searchPattern) ||
    lower(coalesce(excerpt[$locale], excerpt[$defaultLocale], excerpt.en, "")) match lower($searchPattern) ||
    lower(coalesce(body[$locale], body[$defaultLocale], body.en, "")) match lower($searchPattern) ||
    count(categories[]->[lower(coalesce(title[$locale], title[$defaultLocale], title.en, "")) match lower($searchPattern)]) > 0
  )
]{
  _id,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "slug": slug.current,
  "excerpt": coalesce(excerpt[$locale], excerpt[$defaultLocale], excerpt.en),
  mainImage,
  categories[]->{
    _id,
    "title": coalesce(title[$locale], title[$defaultLocale], title.en),
    "slug": slug.current,
  },
  publishedAt,
  "bodyText": coalesce(body[$locale], body[$defaultLocale], body.en, ""),
} | order(publishedAt desc)`);

export const getPostBySlugQuery = defineQuery(`
*[_type == "post" && slug.current == $slug][0]{
  _id,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "slug": slug.current,
  "excerpt": coalesce(excerpt[$locale], excerpt[$defaultLocale], excerpt.en),
  mainImage,
  categories[]->{
    _id,
    "title": coalesce(title[$locale], title[$defaultLocale], title.en),
    "slug": slug.current,
  },
  publishedAt,
  "body": coalesce(body[$locale], body[$defaultLocale], body.en, ""),
  "bodyText": coalesce(body[$locale], body[$defaultLocale], body.en, ""),
}`);

export const getBlogCategoriesQuery = defineQuery(`*[_type == "category"] | order(coalesce(title[$locale], title[$defaultLocale], title.en) asc){
  _id,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "slug": slug.current,
}`);

export const getActiveLegalDocQuery = defineQuery(`
*[_type == "legalDocVersion" && docType == $docType && isActive == true] | order(effectiveDate desc)[0]{
  _id,
  docType,
  version,
  effectiveDate,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "content": coalesce(content[$locale], content[$defaultLocale], content.en),
  "changelog": coalesce(changelog[$locale], changelog[$defaultLocale], changelog.en),
}`);

export const getLegalDocVersionsQuery = defineQuery(`
*[_type == "legalDocVersion" && docType == $docType] | order(effectiveDate desc){
  _id,
  version,
  effectiveDate,
  isActive,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "changelog": coalesce(changelog[$locale], changelog[$defaultLocale], changelog.en),
}`);

// ─── Help Center ────────────────────────────────────────────────────────────

export const getHelpCategoriesQuery = defineQuery(`
*[_type == "helpCategory"] | order(order asc){
  _id,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "slug": slug.current,
  "description": coalesce(description[$locale], description[$defaultLocale], description.en),
  icon,
  order,
}`);

export const getHelpCategoryBySlugQuery = defineQuery(`
*[_type == "helpCategory" && slug.current == $slug][0]{
  _id,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "slug": slug.current,
  "description": coalesce(description[$locale], description[$defaultLocale], description.en),
  icon,
}`);

export const getHelpArticlesByCategoryQuery = defineQuery(`
*[_type == "helpArticle" && category->slug.current == $categorySlug] | order(publishedAt desc){
  _id,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "slug": slug.current,
  "excerpt": coalesce(excerpt[$locale], excerpt[$defaultLocale], excerpt.en),
  featured,
  publishedAt,
}`);

export const getHelpArticleBySlugQuery = defineQuery(`
*[_type == "helpArticle" && slug.current == $slug][0]{
  _id,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "slug": slug.current,
  "excerpt": coalesce(excerpt[$locale], excerpt[$defaultLocale], excerpt.en),
  "content": coalesce(content[$locale], content[$defaultLocale], content.en),
  helpfulCount,
  publishedAt,
  category->{
    _id,
    "title": coalesce(title[$locale], title[$defaultLocale], title.en),
    "slug": slug.current,
  },
  "relatedArticles": relatedArticles[]->{
    _id,
    "title": coalesce(title[$locale], title[$defaultLocale], title.en),
    "slug": slug.current,
    "excerpt": coalesce(excerpt[$locale], excerpt[$defaultLocale], excerpt.en),
  },
}`);

export const getFeaturedFaqsQuery = defineQuery(`
*[_type == "helpFaq" && featured == true] | order(order asc){
  _id,
  "question": coalesce(question[$locale], question[$defaultLocale], question.en),
  "answer": coalesce(answer[$locale], answer[$defaultLocale], answer.en),
}`);

export const getHelpArticlesInCategoryQuery = defineQuery(`
*[_type == "helpArticle" && category._ref == $categoryId] | order(publishedAt desc){
  _id,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "slug": slug.current,
  featured,
}`);

export const getAllFaqsQuery = defineQuery(`
*[_type == "helpFaq"] | order(order asc){
  _id,
  "question": coalesce(question[$locale], question[$defaultLocale], question.en),
  "answer": coalesce(answer[$locale], answer[$defaultLocale], answer.en),
  featured,
  order,
  category->{
    _id,
    "title": coalesce(title[$locale], title[$defaultLocale], title.en),
    "slug": slug.current,
  },
}`);

// ─── Site Settings ───────────────────────────────────────────────────────────

export const getSiteSettingsQuery = defineQuery(`
*[_type == "siteSettings" && _id == "siteSettings"][0]{
  phone,
  whatsapp,
  supportEmail,
  offices[]{
    name,
    addressLine1,
    addressLine2,
    image,
  },
  socialLinks[]{
    platform,
    href,
  },
}`);

// ─── Testimonials ────────────────────────────────────────────────────────────

export const getFeaturedTestimonialsQuery = defineQuery(`
*[_type == "testimonial" && featured == true] | order(order asc){
  _id,
  name,
  city,
  "quote": coalesce(quote[$locale], quote[$defaultLocale], quote.en),
  image,
  rating,
}`);

export const getAllTestimonialsQuery = defineQuery(`
*[_type == "testimonial"] | order(order asc){
  _id,
  name,
  city,
  "quote": coalesce(quote[$locale], quote[$defaultLocale], quote.en),
  image,
  rating,
  featured,
  order,
}`);

// ─── Careers ─────────────────────────────────────────────────────────────────

export const getOpenJobPostingsQuery = defineQuery(`
*[_type == "jobPosting" && isOpen == true] | order(order asc, publishedAt desc){
  _id,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "slug": slug.current,
  department,
  "location": coalesce(location[$locale], location[$defaultLocale], location.en),
  type,
  "summary": coalesce(summary[$locale], summary[$defaultLocale], summary.en),
  publishedAt,
}`);

export const getJobPostingBySlugQuery = defineQuery(`
*[_type == "jobPosting" && slug.current == $slug][0]{
  _id,
  "title": coalesce(title[$locale], title[$defaultLocale], title.en),
  "slug": slug.current,
  department,
  "location": coalesce(location[$locale], location[$defaultLocale], location.en),
  type,
  "summary": coalesce(summary[$locale], summary[$defaultLocale], summary.en),
  "description": coalesce(description[$locale], description[$defaultLocale], description.en),
  "requirements": coalesce(requirements[$locale], requirements[$defaultLocale], requirements.en),
  applyUrl,
  publishedAt,
}`);

// ─── Pricing ─────────────────────────────────────────────────────────────────

export const getPricingPageQuery = defineQuery(`
*[_type == "pricingPage"][0]{
  _id,
  "heroHeading": coalesce(heroHeading[$locale], heroHeading[$defaultLocale], heroHeading.en),
  "heroSubheading": coalesce(heroSubheading[$locale], heroSubheading[$defaultLocale], heroSubheading.en),
  "plans": plans[]{
    "name": coalesce(name[$locale], name[$defaultLocale], name.en),
    "description": coalesce(description[$locale], description[$defaultLocale], description.en),
    price,
    currency,
    "billingPeriod": coalesce(billingPeriod[$locale], billingPeriod[$defaultLocale], billingPeriod.en),
    "features": features[]{
      "text": coalesce(text[$locale], text[$defaultLocale], text.en),
    },
    "ctaText": coalesce(ctaText[$locale], ctaText[$defaultLocale], ctaText.en),
    ctaHref,
    highlighted,
    order,
  } | order(order asc),
  "comparisonTable": {
    "title": coalesce(comparisonTable.title[$locale], comparisonTable.title[$defaultLocale], comparisonTable.title.en),
    "rows": comparisonTable.rows[]{
      "feature": coalesce(feature[$locale], feature[$defaultLocale], feature.en),
      "values": values[]{
        planIndex,
        "value": coalesce(value[$locale], value[$defaultLocale], value.en),
        isIncluded,
      },
    },
  },
  "ctaSection": {
    "heading": coalesce(ctaSection.heading[$locale], ctaSection.heading[$defaultLocale], ctaSection.heading.en),
    "description": coalesce(ctaSection.description[$locale], ctaSection.description[$defaultLocale], ctaSection.description.en),
    "buttonText": coalesce(ctaSection.buttonText[$locale], ctaSection.buttonText[$defaultLocale], ctaSection.buttonText.en),
    "buttonLink": ctaSection.buttonLink,
  },
}`);