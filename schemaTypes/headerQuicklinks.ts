import {defineArrayMember, defineField, defineType} from 'sanity'

export const headerQuicklinks = defineType({
  name: 'headerQuicklinks',
  title: 'Header Quick Links',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document title',
      type: 'string',
      initialValue: 'Header Quick Links',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'headerQuicklink',
          title: 'Quick link',
          type: 'object',
          fields: [
            defineField({name: 'text', title: 'Text', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'link', title: 'Link', type: 'url'}),
            defineField({
              name: 'isActive',
              title: 'Active',
              description: 'Turn off to hide this quick link from the live ticker.',
              type: 'boolean',
              initialValue: true,
              options: {layout: 'switch'},
            }),
          ],
          preview: {select: {title: 'text', subtitle: 'link'}},
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title'}},
})