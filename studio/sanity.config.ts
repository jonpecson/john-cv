import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'john-cv',

  projectId: '8wzg7rzi',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schema.types,
  },
})
