import {defineField, defineType} from 'sanity'

export const localizedStringType = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'string',
    }),
    defineField({
      name: 'tr',
      title: 'Turkish',
      type: 'string',
    }),
  ],
})
