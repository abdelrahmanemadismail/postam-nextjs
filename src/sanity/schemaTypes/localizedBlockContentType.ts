import {defineField, defineType} from 'sanity'

export const localizedBlockContentType = defineType({
  name: 'localizedBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'blockContent',
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'blockContent',
    }),
    defineField({
      name: 'tr',
      title: 'Turkish',
      type: 'blockContent',
    }),
  ],
})
