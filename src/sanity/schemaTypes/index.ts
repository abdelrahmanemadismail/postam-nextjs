import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {localizedBlockContentType} from './localizedBlockContentType'
import {localizedStringType} from './localizedStringType'
import {localizedTextType} from './localizedTextType'
import {postType} from './postType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    localizedStringType,
    localizedTextType,
    localizedBlockContentType,
    categoryType,
    postType,
  ],
}
