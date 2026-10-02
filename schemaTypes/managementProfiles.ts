import {defineArrayMember, defineField, defineType} from 'sanity'

export const managementProfiles = defineType({
  name: 'managementProfiles',
  title: 'Management',
  type: 'document',
  fields: [
    defineField({
      name: 'members',
      title: 'Management members',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'managementMember',
          title: 'Management member',
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'role', title: 'Role', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({
              name: 'image',
              title: 'Portrait',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'role', media: 'image'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Management'}),
  },
})