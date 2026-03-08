import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {helpArticleType} from './helpArticleType'
import {helpCategoryType} from './helpCategoryType'
import {helpFaqType} from './helpFaqType'
import {legalDocVersionType} from './legalDocVersionType'
import {localizedBlockContentType} from './localizedBlockContentType'
import {localizedStringType} from './localizedStringType'
import {localizedTextType} from './localizedTextType'
import {postType} from './postType'
import {siteSettingsType} from './siteSettingsType'
import {testimonialType} from './testimonialType'
import {jobPostingType} from './jobPostingType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    localizedStringType,
    localizedTextType,
    localizedBlockContentType,
    categoryType,
    postType,
    legalDocVersionType,
    helpCategoryType,
    helpArticleType,
    helpFaqType,
    siteSettingsType,
    testimonialType,
    jobPostingType,
  ],
}
