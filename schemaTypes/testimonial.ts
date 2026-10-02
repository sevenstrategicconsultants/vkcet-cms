import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Person name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'designation', title: 'Designation', type: 'string'}),
    defineField({name: 'image', title: 'Portrait', type: 'image', options: {hotspot: true}}),
    defineField({name: 'testimonial', title: 'Quote', type: 'text', rows: 5, validation: (Rule) => Rule.required()}),
    defineField({name: 'youtube', title: 'YouTube video URL', type: 'url'}),
    defineField({name: 'order', title: 'Display order', type: 'number'}),
    defineField({name: 'isActive', title: 'Active', type: 'boolean', initialValue: true, options: {layout: 'switch'}}),
  ],
  preview: {select: {title: 'name', subtitle: 'designation', media: 'image'}},
})