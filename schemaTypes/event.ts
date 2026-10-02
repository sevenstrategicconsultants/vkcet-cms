import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Event title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'summary', title: 'Short description', type: 'text', rows: 3}),
    defineField({name: 'publishedAt', title: 'Event date', type: 'datetime'}),
    defineField({name: 'image', title: 'Card image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'link', title: 'Event details URL', type: 'url'}),
    defineField({name: 'isActive', title: 'Show on homepage', type: 'boolean', initialValue: true, options: {layout: 'switch'}}),
  ],
  preview: {select: {title: 'title', subtitle: 'publishedAt', media: 'image'}},
})