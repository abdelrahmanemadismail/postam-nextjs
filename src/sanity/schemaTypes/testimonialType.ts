import { StarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
        defineField({ name: 'ar', title: 'Arabic', type: 'text', rows: 3 }),
        defineField({ name: 'tr', title: 'Turkish', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Portrait Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on the homepage stories section',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'city', media: 'image' },
  },
})
