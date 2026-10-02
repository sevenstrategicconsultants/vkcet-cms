import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) => {
  const defaultItems = S.documentTypeListItems().filter(
    (item) => !['homePage', 'founderProfile', 'governingBodyMember', 'managementProfiles'].includes(item.getId() ?? ''),
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

  const singleMember = (title: string, documentId: string) =>
    S.listItem()
      .title(title)
      .child(
        S.document()
          .schemaType('governingBodyMember')
          .documentId(documentId)
          .title(title),
      )

  return S.list()
    .title('VKCET Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('home-page').title('Home Page')),
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
                          S.document()
                            .schemaType('managementProfiles')
                            .documentId('management-profiles')
                            .title('Management'),
                        ),
                      singleMember('Executive Director', 'executive-director'),
                      singleMember('Assistant Director', 'assistant-director'),
                      singleMember('Principal', 'principal'),
                      singleMember('Vice Principal', 'vice-principal'),
                      singleMember('Dean Student Affairs', 'dean-student-affairs'),
                      singleMember('Administrative Officer', 'administrative-officer'),
                      memberSection('Department Heads', 'department-heads'),
                    ]),
                ),
            ]),
        ),
      ...defaultItems,
    ])
}