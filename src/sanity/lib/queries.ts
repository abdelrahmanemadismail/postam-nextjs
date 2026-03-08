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