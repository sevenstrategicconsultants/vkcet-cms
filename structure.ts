import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) => {
  const defaultItems = S.documentTypeListItems().filter(
    (item) => !['founderProfile', 'governingBodyMember'].includes(item.getId() ?? ''),
  )

  const memberSection = (title: string, category: string, role?: string) =>
    S.listItem()
      .title(title)
      .child(
        S.documentTypeList('governingBodyMember')
          .title(title)
          .filter(
            role
              ? '_type == "governingBodyMember" && category == $category && role == $role'
              : '_type == "governingBodyMember" && category == $category',
          )
          .params({category, ...(role ? {role} : {})}),
      )

  return S.list()
    .title('VKCET Content')
    .items([
      S.listItem()
        .title('Site Header Menu')
        .child(
          S.list()
            .title('Site Header Menu')
            .items([
              S.listItem()
                .title('Governing Body')
                .child(
                  S.list()
                    .title('Governing Body')
                    .items([
                      S.listItem()
                        .title('Founder Chairman')
                        .child(
                          S.document()
                            .schemaType('founderProfile')
                            .documentId('founder-profile')
                            .title('Founder Chairman'),
                        ),
                      S.listItem()
                        .title('Management')
                        .child(
                          S.list()
                            .title('Management')
                            .items([
                              memberSection('President', 'management', 'President'),
                              memberSection('Vice President', 'management', 'Vice President'),
                              memberSection('Secretary', 'management', 'Secretary'),
                              memberSection('Joint Secretary', 'management', 'Joint Secretary'),
                              memberSection('Treasurer', 'management', 'Treasurer'),
                            ]),
                        ),
                      memberSection('Executive Director', 'executive-director'),
                      memberSection('Assistant Director', 'assistant-director'),
                      memberSection('Principal', 'principal'),
                      memberSection('Vice Principal', 'vice-principal'),
                      memberSection('Dean Student Affairs', 'dean-student-affairs'),
                      memberSection('Administrative Officer', 'administrative-officer'),
                      memberSection('Department Heads', 'department-heads'),
                    ]),
                ),
            ]),
        ),
      ...defaultItems,
    ])
}