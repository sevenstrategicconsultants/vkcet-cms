import {defineArrayMember, defineField, defineType} from 'sanity'

export const founderProfile = defineType({
  name: 'founderProfile',
  title: 'Founder Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Portrait',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
    }),
    defineField({
      name: 'biography',
      title: 'Biography paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'image'}},
})