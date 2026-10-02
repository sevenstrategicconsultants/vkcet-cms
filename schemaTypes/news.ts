import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Headline', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'summary', title: 'Short description', type: 'text', rows: 3}),
    defineField({name: 'publishedAt', title: 'Publication date', type: 'datetime'}),
    defineField({name: 'image', title: 'Card image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'link', title: 'Article URL', type: 'url'}),
    defineField({name: 'isActive', title: 'Show on homepage', type: 'boolean', initialValue: true, options: {layout: 'switch'}}),
  ],
  preview: {select: {title: 'title', subtitle: 'publishedAt', media: 'image'}},
})