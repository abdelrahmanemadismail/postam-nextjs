import {CogIcon, DocumentTextIcon, HelpCircleIcon, LockIcon, StarIcon, TagIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Blog
      S.listItem()
        .title('Blog')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
            ])
        ),

      S.divider(),

      // Help Center
      S.listItem()
        .title('Help Center')
        .icon(HelpCircleIcon)
        .child(
          S.list()
            .title('Help Center')
            .items([
              S.documentTypeListItem('helpCategory')
                .title('Categories')
                .icon(TagIcon),
              S.documentTypeListItem('helpArticle')
                .title('Articles')
                .icon(DocumentTextIcon),
              S.documentTypeListItem('helpFaq')
                .title('FAQs')
                .icon(HelpCircleIcon),
            ])
        ),

      S.divider(),

      // Legal Documents
      S.listItem()
        .title('Legal Documents')
        .icon(LockIcon)
        .child(
          S.list()
            .title('Legal Documents')
            .items([
              S.listItem()
                .title('Privacy Policy Versions')
                .icon(DocumentTextIcon)
                .child(
                  S.documentList()
                    .title('Privacy Policy Versions')
                    .filter('_type == "legalDocVersion" && docType == "privacy-policy"')
                    .defaultOrdering([{field: 'effectiveDate', direction: 'desc'}])
                ),
              S.listItem()
                .title('Terms of Service Versions')
                .icon(DocumentTextIcon)
                .child(
                  S.documentList()
                    .title('Terms of Service Versions')
                    .filter('_type == "legalDocVersion" && docType == "terms-of-service"')
                    .defaultOrdering([{field: 'effectiveDate', direction: 'desc'}])
                ),
            ])
        ),

      S.divider(),

      S.divider(),

      // Site Settings – singleton
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // Customer Stories
      S.listItem()
        .title('Customer Stories')
        .icon(StarIcon)
        .child(S.documentTypeList('testimonial').title('Customer Stories')),

      S.divider(),

      // Remaining auto-generated types (excludes already listed ones)
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['post', 'category', 'legalDocVersion', 'helpCategory', 'helpArticle', 'helpFaq',
            'siteSettings', 'testimonial'].includes(item.getId()!),
      ),
    ])
