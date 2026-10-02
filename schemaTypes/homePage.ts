import {defineField, defineType, defineArrayMember} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document title',
      type: 'string',
      initialValue: 'Home Page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Call-to-action label',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call-to-action link',
      description: 'Can be an internal path or an external URL.',
      type: 'string',
    }),
    defineField({
      name: 'featuredPrograms',
      title: 'Featured programs',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'program',
          title: 'Program',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
            defineField({
              name: 'href',
              title: 'Link',
              description: 'Can be an internal path or an external URL.',
              type: 'string',
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title'}},
})