const API_URL = process.env.GQL_API_PATH
async function fetchAPI(query = '', { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' }
  
    if (process.env.GQL_JWT_TOKEN) {
      headers[
        'Authorization'
      ] = `Bearer ${process.env.GQL_JWT_TOKEN}`
    }
  
    // WPGraphQL Plugin must be enabled
    const res = await fetch(`${API_URL}`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
      }),
    })
  
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }
    return json.data
  }
  export async function getMenuItems() {
    const data = await fetchAPI(`
    query getMenuItems{
        menuItems(where: {location: HCMS_MENU_HEADER, parentId: "0"}) {
            edges {
              node {
                label
                path
                uri
                route {
                  code
                  link
                  name
                  iscomplete
                }
                childItems {
                  edges {
                    node {
                      label
                      uri
                      route {
                        code
                        link
                        name
                        iscomplete
                        
                      }
                    }
                  }
                }
                
              }
            }
          }
      }
    `)
    return data?.menuItems?.edges
  }
export async function getFootMenuItems() {
  const data = await fetchAPI(`
    query getFootMenuItems{
      menuItems(where: {location: HCMS_MENU_FOOTER, parentId: "0"}) {
        edges {
          node {
            label
            url
            childItems {
              edges {
                node {
                  label
                  url
                  
                }
              }
            }
          }
        }
      }
      }
    `)
  return data?.menuItems?.edges
}
export async function getCertificateData(tabKey) {
  //console.log('tabKey-applo',tabKey)
  const data = await fetchAPI(`
    query getCertificateData{
      pageBy(uri: "${tabKey}") {
        certificates {
          applicationTab {
            desc
            fieldGroupName
            cardMenuBox {
              fieldGroupName
              manuName
              menuDesc
              menuButton {
                btnLink
                btnName
                fieldGroupName
              }
            }
          }
          faqTab {
            desc
            fieldGroupName
            ttitle
          }
          otherTabs {
            desc
            fieldGroupName
            tabName
          }
        }
        slug
        title
      }
      }
    `)
  return data?.pageBy?.certificates
}
export async function getRtiPageData(tabKey) {
  //console.log('tabKey-applo',tabKey)
  const data = await fetchAPI(`
    query getRtiPageData{
      pageBy(uri: "${tabKey}") {
        
    slug
    title
    rti {
      description
      button {
        link
        name
      }
      imageBlock {
        desc
        images {
          link
          sizes
          title
          uri
        }
      }
    }
      }
      }
    `)
  return data?.pageBy?.rti
}
export async function getAllSchemeData(tabKey) {
  //console.log('tabKey-applo',tabKey)
  const data = await fetchAPI(`
    query getAllSchemeData{
      allSchemes {
        nodes {
          title
          slug
          uri
        }
      }
    }
  `)
  return data?.allSchemes?.nodes
}
export async function getNewsLetterData(tabKey) {
  //console.log('tabKey-applo',tabKey)
  const data = await fetchAPI(`
    query getNewsLetterData{
      newsLetters {
        nodes {
          slug
          title
          date
          newsLetter {
            date
            downloadUrl
            title
          }
          
        }
      }
    }
  `)
  return data?.newsLetters?.nodes
}

export async function getPublicNoticeData(tabKey) {
  //console.log('tabKey-applo',tabKey)
  const data = await fetchAPI(`
    query getPublicNoticeData{
      allNotices {
        nodes {
          uri
          title
          slug
          notices {
            date
            desc
            title
            downloadUrl
          }
        }
      }
    }
  `)
  return data?.allNotices?.nodes
}