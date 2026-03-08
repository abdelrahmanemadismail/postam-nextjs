import {defineField, defineType} from 'sanity'

export const localizedSlugType = defineType({
  name: 'localizedSlug',
  title: 'Localized Slug',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English Slug',
      type: 'slug',
      options: {
        source: (doc) => (doc as {title?: {en?: string}})?.title?.en || '',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ar',
      title: 'Arabic Slug',
      type: 'slug',
      options: {
        source: (doc) => (doc as {title?: {ar?: string}})?.title?.ar || '',
      },
    }),
    defineField({
      name: 'tr',
      title: 'Turkish Slug',
      type: 'slug',
      options: {
        source: (doc) => (doc as {title?: {tr?: string}})?.title?.tr || '',
      },
    }),
  ],
})
