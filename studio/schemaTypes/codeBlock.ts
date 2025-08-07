import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'code',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'Python', value: 'python'},
          {title: 'Bash', value: 'bash'},
          {title: 'Shell', value: 'shell'},
          {title: 'JSON', value: 'json'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'SQL', value: 'sql'},
          {title: 'YAML', value: 'yaml'},
          {title: 'Markdown', value: 'markdown'},
          {title: 'PHP', value: 'php'},
          {title: 'Java', value: 'java'},
          {title: 'C#', value: 'csharp'},
          {title: 'C++', value: 'cpp'},
          {title: 'C', value: 'c'},
          {title: 'Go', value: 'go'},
          {title: 'Rust', value: 'rust'},
          {title: 'Ruby', value: 'ruby'},
          {title: 'Swift', value: 'swift'},
          {title: 'Kotlin', value: 'kotlin'},
          {title: 'Scala', value: 'scala'},
          {title: 'R', value: 'r'},
          {title: 'MATLAB', value: 'matlab'},
          {title: 'Docker', value: 'dockerfile'},
          {title: 'Git', value: 'git'},
          {title: 'Plain Text', value: 'text'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: 'Optional filename to display above the code block',
    }),
  ],
  preview: {
    select: {
      title: 'language',
      subtitle: 'filename',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Code Block',
        subtitle: subtitle || 'No filename',
      }
    },
  },
})
