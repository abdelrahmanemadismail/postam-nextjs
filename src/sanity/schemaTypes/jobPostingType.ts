import { EarthGlobeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const jobPostingType = defineType({
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
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
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'Engineering' },
          { title: 'Operations', value: 'Operations' },
          { title: 'Customer Support', value: 'Customer Support' },
          { title: 'Marketing', value: 'Marketing' },
          { title: 'Finance', value: 'Finance' },
          { title: 'Design', value: 'Design' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Remote', value: 'remote' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'object',
      description: 'A one or two sentence overview shown on the listing card.',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
        defineField({ name: 'ar', title: 'Arabic', type: 'text', rows: 3 }),
        defineField({ name: 'tr', title: 'Turkish', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Full Description (Markdown)',
      type: 'object',
      description: 'Detailed role description. Supports full Markdown.',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 20 }),
        defineField({ name: 'ar', title: 'Arabic', type: 'text', rows: 20 }),
        defineField({ name: 'tr', title: 'Turkish', type: 'text', rows: 20 }),
      ],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements (Markdown)',
      type: 'object',
      description: 'A list of qualifications and requirements. Supports full Markdown.',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 15 }),
        defineField({ name: 'ar', title: 'Arabic', type: 'text', rows: 15 }),
        defineField({ name: 'tr', title: 'Turkish', type: 'text', rows: 15 }),
      ],
    }),
    defineField({
      name: 'applyUrl',
      title: 'Apply URL',
      type: 'url',
      description: 'External link or email (mailto:) where candidates should apply.',
    }),
    defineField({
      name: 'isOpen',
      title: 'Position Open',
      type: 'boolean',
      description: 'Uncheck to hide this posting from the careers page.',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the same department.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'department',
      isOpen: 'isOpen',
    },
    prepare({ title, subtitle, isOpen }) {
      return {
        title: title ?? 'Untitled',
        subtitle: `${subtitle ?? ''}${isOpen === false ? ' · Closed' : ''}`,
      }
    },
  },
})
