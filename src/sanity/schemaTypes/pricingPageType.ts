import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const pricingPageType = defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'localizedText',
    }),
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      validation: (rule) => rule.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pricingPlan',
          fields: [
            defineField({
              name: 'name',
              title: 'Plan Name',
              type: 'localizedString',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localizedText',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (rule) => rule.min(0),
            }),
            defineField({
              name: 'currency',
              title: 'Currency Symbol',
              type: 'string',
              initialValue: '$',
            }),
            defineField({
              name: 'billingPeriod',
              title: 'Billing Period',
              type: 'localizedString',
              description: 'Example: per month',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'planFeature',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Feature Text',
                      type: 'localizedString',
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: { title: 'text.en' },
                  },
                }),
              ],
            }),
            defineField({
              name: 'ctaText',
              title: 'Plan Button Text',
              type: 'localizedString',
            }),
            defineField({
              name: 'ctaHref',
              title: 'Plan Button Link',
              type: 'url',
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlighted Plan',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: 'name.en',
              subtitle: 'price',
              highlighted: 'highlighted',
            },
            prepare({ title, subtitle, highlighted }) {
              const priceLabel = typeof subtitle === 'number' ? `$${subtitle}` : 'Custom'
              return {
                title: `${title ?? 'Untitled'}${highlighted ? ' ★' : ''}`,
                subtitle: priceLabel,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'comparisonTable',
      title: 'Feature Comparison Table',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Table Title',
          type: 'localizedString',
        }),
        defineField({
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'comparisonRow',
              fields: [
                defineField({
                  name: 'feature',
                  title: 'Feature Name',
                  type: 'localizedString',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'values',
                  title: 'Plan Values',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      name: 'comparisonValue',
                      fields: [
                        defineField({
                          name: 'planIndex',
                          title: 'Plan Index (0-based)',
                          type: 'number',
                          validation: (rule) => rule.required().min(0),
                        }),
                        defineField({
                          name: 'value',
                          title: 'Display Value',
                          type: 'localizedString',
                        }),
                        defineField({
                          name: 'isIncluded',
                          title: 'Included (check icon)',
                          type: 'boolean',
                          initialValue: false,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
              preview: {
                select: { title: 'feature.en' },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'localizedString',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'localizedText',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'localizedString',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pricing Page' }
    },
  },
})