import {defineField, defineType} from 'sanity'

export const localizedTextType = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'tr',
      title: 'Turkish',
      type: 'text',
      rows: 4,
    }),
  ],
})
