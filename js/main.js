const addEntries = async () => {
  const entriesElement = document.querySelector('#entries')
  // fetch entries
  const entriesResponse = await fetch('js/content/entries.json')

  if (!entriesResponse.ok) {
    throw new Error('Error fetching content JSON: ' + entriesResponse.status)
  }

  const entries = await entriesResponse.json()

  // convert to html elements
  for (const entry of entries) {
    // create all the elements needed
    const entryElement = document.createElement('div')
    const titleElement = document.createElement('h3')
    const imageElement = document.createElement('img')
    const descriptionElement = document.createElement('p')
    const linkElement = document.createElement('a')
    const linkTextElement = document.createElement('div')

    // modify their contents and classes
    entryElement.className = 'entry'
    titleElement.innerText = entry.name
    imageElement.src = entry.preview.src
    imageElement.alt = entry.preview.alt
    linkTextElement.innerHTML = entry.link.text
    linkElement.href = entry.link.url
    linkElement.appendChild(linkTextElement)
    linkElement.className = 'button'

    // bold the first word of the description
    const getFirstWord = /\b\w*\b/di
    const firstWordContainerElement = document.createElement('strong')
    const firstWord = entry.description.match(getFirstWord)[0]
    firstWordContainerElement.appendChild(document.createTextNode(firstWord))
    const descriptionPastFirstWord = document.createTextNode(entry.description.replace(firstWord, ''))
    descriptionElement.appendChild(firstWordContainerElement)
    descriptionElement.appendChild(descriptionPastFirstWord)

    // add sub-elements to the parent div
    entryElement.appendChild(titleElement)
    entryElement.appendChild(imageElement)
    entryElement.appendChild(descriptionElement)
    entryElement.appendChild(linkElement)

    // add to the list of entries
    entriesElement.appendChild(entryElement)
  }
}

function makeTextNodeFromText (text) {
  const getLinks = /<a href="([^"]*)">([^<]*)<\/a>/g
  const links = text.match(getLinks)
  let modifiedText = text
  // remove all links
  for (let i = 0; i < links.length; i += 3) {
    modifiedText = modifiedText.replace(links[i], '__REPLACEME__')
  }
  // split between links
  const textSections = modifiedText.split('__REPLACEME__')

  // construct the final text by applying each link as a node
}

window.onload = () => {
  addEntries()
}
