import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const helpCategoryType = defineType({
  name: 'helpCategory',
  title: 'Help Category',
  type: 'document',
  icon: TagIcon,
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
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
        defineField({ name: 'ar', title: 'Arabic', type: 'text', rows: 3 }),
        defineField({ name: 'tr', title: 'Turkish', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon identifier (e.g. rocket, truck, cart, payments, block, headset)',
      options: {
        list: [
          { title: 'Rocket (Getting Started)', value: 'rocket' },
          { title: 'Truck (Shipping & Tracking)', value: 'truck' },
          { title: 'Cart (Buy For Me)', value: 'cart' },
          { title: 'Payments (Billing)', value: 'payments' },
          { title: 'Block (Prohibited Items)', value: 'block' },
          { title: 'Headset (Corporate)', value: 'headset' },
          { title: 'Info', value: 'info' },
          { title: 'Shield', value: 'shield' },
        ],
      },
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
      title: 'title.en',
      subtitle: 'slug.current',
    },
    prepare({ title, subtitle }) {
      return { title: title ?? 'Untitled', subtitle }
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
