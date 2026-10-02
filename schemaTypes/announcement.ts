import {defineField, defineType} from 'sanity'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Announcement text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime',
    }),
    defineField({
      name: 'link',
      title: 'Details link',
      description: 'Can be an internal path or an external URL.',
      type: 'string',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'publishedAt'}},
})