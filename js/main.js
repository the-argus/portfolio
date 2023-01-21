const addEntries = async () => {
  const entriesElement = document.querySelector('#entries')
  // fetch entries
  const entriesResponse = await fetch('js/content/entries.json')

  if (!entriesResponse.ok) {
    throw new Error('Error fetching content JSON: ' + entriesResponse.status)
  }

  const entriesInfo = await entriesResponse.json()

  // convert to html elements
  for (const entryName in entriesInfo.entries) {
    const entry = entriesInfo.entries[entryName]
    // create all the elements needed
    const topContainer = document.createElement('div')
    const bottomContainer = document.createElement('div')
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

    const markdownParser = new commonmark.Parser()
    const markdownRenderer = new commonmark.HtmlRenderer({ safe: true })
    descriptionElement.innerHTML = markdownRenderer.render(
      markdownParser.parse(
        entry.description.replace(firstWord, `**${firstWord}**`)
      )
    )

    // add sub-elements to the parent div
    topContainer.appendChild(titleElement)
    topContainer.appendChild(imageElement)
    bottomContainer.appendChild(descriptionElement)
    bottomContainer.appendChild(linkElement)
    entryElement.appendChild(topContainer)
    entryElement.appendChild(bottomContainer)

    // add to the list of entries
    entriesElement.appendChild(entryElement)
  }
}

window.onload = () => {
  addEntries()
}
