import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    // ── Contact Info ────────────────────────────────────────────────
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Displayed in footer and contact page (e.g. +965 0000 0000)',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Link',
      type: 'url',
      description: 'Full WhatsApp URL (e.g. https://wa.me/96500000000)',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
      description: 'Main support email address shown publicly',
    }),

    // ── Offices ─────────────────────────────────────────────────────
    defineField({
      name: 'offices',
      title: 'Office Locations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'office',
          fields: [
            defineField({ name: 'name', title: 'City / Name', type: 'string' }),
            defineField({ name: 'addressLine1', title: 'Address Line 1', type: 'string' }),
            defineField({ name: 'addressLine2', title: 'Address Line 2', type: 'string' }),
            defineField({ name: 'image', title: 'City Image', type: 'image', options: { hotspot: true } }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'addressLine1' },
          },
        }),
      ],
    }),

    // ── Social Links ─────────────────────────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Twitch', value: 'twitch' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Telegram', value: 'telegram' },
                  { title: 'Discord', value: 'discord' },
                  { title: 'Snapchat', value: 'snapchat' },
                ],
                layout: 'dropdown',
              },
            }),
            defineField({ name: 'href', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'href' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
