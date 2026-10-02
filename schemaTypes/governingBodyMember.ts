import {defineField, defineType} from 'sanity'

export const governingBodyMember = defineType({
  name: 'governingBodyMember',
  title: 'Governing Body Member',
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
      name: 'category',
      title: 'Governing Body section',
      type: 'string',
      options: {
        list: [
          {title: 'Management', value: 'management'},
          {title: 'Executive Director', value: 'executive-director'},
          {title: 'Assistant Director', value: 'assistant-director'},
          {title: 'Principal', value: 'principal'},
          {title: 'Vice Principal', value: 'vice-principal'},
          {title: 'Dean Student Affairs', value: 'dean-student-affairs'},
          {title: 'Administrative Officer', value: 'administrative-officer'},
          {title: 'Department Heads', value: 'department-heads'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'department', title: 'Department', type: 'string'}),
    defineField({
      name: 'image',
      title: 'Portrait',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'image'}},
})