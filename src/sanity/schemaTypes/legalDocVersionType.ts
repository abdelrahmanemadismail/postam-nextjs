import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const legalDocVersionType = defineType({
  name: 'legalDocVersion',
  title: 'Legal Document Version',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'docType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'Privacy Policy', value: 'privacy-policy' },
          { title: 'Terms of Service', value: 'terms-of-service' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      description: 'e.g. 1.0, 2.1, 3.0',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active Version',
      type: 'boolean',
      description: 'Mark this as the currently published version shown to users.',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
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
      name: 'changelog',
      title: 'Changelog / What Changed',
      type: 'localizedText',
      description: 'Internal note summarising what changed from the previous version.',
    }),
  ],
  orderings: [
    {
      title: 'Effective Date, Newest First',
      name: 'effectiveDateDesc',
      by: [{ field: 'effectiveDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      docType: 'docType',
      version: 'version',
      effectiveDate: 'effectiveDate',
      isActive: 'isActive',
    },
    prepare({ docType, version, effectiveDate, isActive }) {
      const typeLabel =
        docType === 'privacy-policy' ? 'Privacy Policy' : 'Terms of Service'
      return {
        title: `${typeLabel} — v${version}`,
        subtitle: `${effectiveDate ?? ''}${isActive ? '  ✓ Active' : ''}`,
      }
    },
  },
})
