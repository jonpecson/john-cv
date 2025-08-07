import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          fields: [
            {
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'cell',
                  fields: [
                    {
                      name: 'text',
                      title: 'Text',
                      type: 'text',
                    },
                    {
                      name: 'isHeader',
                      title: 'Is Header',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      text: 'text',
                      isHeader: 'isHeader',
                    },
                    prepare({text, isHeader}) {
                      return {
                        title: text || 'Empty cell',
                        subtitle: isHeader ? 'Header' : 'Cell',
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({cells}) {
              const cellTexts = cells?.map((cell: any) => cell.text).join(' | ') || 'Empty row'
              return {
                title: cellTexts,
                subtitle: `${cells?.length || 0} cells`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      rows: 'rows',
    },
    prepare({rows}) {
      return {
        title: 'Table',
        subtitle: `${rows?.length || 0} rows`,
      }
    },
  },
})
