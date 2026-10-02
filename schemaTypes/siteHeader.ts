import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteHeader = defineType({
  name: 'siteHeader',
  title: 'Site Header Tickers',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document title',
      type: 'string',
      initialValue: 'Site Header Tickers',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updates',
      title: 'Updates ticker',
      description: 'Items displayed in the first scrolling row.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'tickerItem',
          title: 'Ticker item',
          type: 'object',
          fields: [
            defineField({name: 'text', title: 'Text', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'link', title: 'Link', type: 'url'}),
          ],
          preview: {select: {title: 'text'}},
        }),
      ],
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick links ticker',
      description: 'Items displayed in the second scrolling row.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'quickLink',
          title: 'Quick link',
          type: 'object',
          fields: [
            defineField({name: 'text', title: 'Text', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'link', title: 'Link', type: 'url'}),
          ],
          preview: {select: {title: 'text'}},
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title'}},
})