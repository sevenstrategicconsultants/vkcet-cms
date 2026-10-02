import {defineArrayMember, defineField, defineType} from 'sanity'

export const headerUpdates = defineType({
  name: 'headerUpdates',
  title: 'Header Updates',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document title',
      type: 'string',
      initialValue: 'Header Updates',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'headerUpdate',
          title: 'Update',
          type: 'object',
          fields: [
            defineField({name: 'text', title: 'Text', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'link', title: 'Link', type: 'url'}),
            defineField({
              name: 'isActive',
              title: 'Active',
              description: 'Turn off to hide this update from the live ticker.',
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