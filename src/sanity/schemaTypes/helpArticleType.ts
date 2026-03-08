import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const helpArticleType = defineType({
  name: 'helpArticle',
  title: 'Help Article',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'helpCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
        defineField({ name: 'ar', title: 'Arabic', type: 'text', rows: 3 }),
        defineField({ name: 'tr', title: 'Turkish', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content (Markdown)',
      type: 'object',
      description: 'Supports full Markdown: **bold**, # headings, - lists, [links](url), etc.',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 30 }),
        defineField({ name: 'ar', title: 'Arabic', type: 'text', rows: 30 }),
        defineField({ name: 'tr', title: 'Turkish', type: 'text', rows: 30 }),
      ],
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'helpArticle' }] })],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show as a featured article in the help center.',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'helpfulCount',
      title: 'Helpful Count',
      type: 'number',
      description: 'How many users found this article helpful.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      category: 'category.title.en',
      subtitle: 'slug.current',
    },
    prepare({ title, category, subtitle }) {
      return {
        title: title ?? 'Untitled',
        subtitle: category ? `${category} · ${subtitle}` : subtitle,
      }
    },
  },
})
