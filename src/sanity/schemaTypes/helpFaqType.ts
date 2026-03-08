import { HelpCircleIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const helpFaqType = defineType({
  name: 'helpFaq',
  title: 'Help FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localizedString',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 5 }),
        defineField({ name: 'ar', title: 'Arabic', type: 'text', rows: 5 }),
        defineField({ name: 'tr', title: 'Turkish', type: 'text', rows: 5 }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category (optional)',
      type: 'reference',
      to: [{ type: 'helpCategory' }],
    }),
    defineField({
      name: 'featured',
      title: 'Show on Help Center Home',
      type: 'boolean',
      description: 'Display this FAQ in the "Top FAQs" section on the main help page.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: 'question.en',
    },
    prepare({ title }) {
      return { title: title ?? 'Untitled FAQ' }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
