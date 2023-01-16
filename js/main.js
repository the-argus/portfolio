const addEntries = async () => {
  // fetch entries
  const entries = await fetch('./content/entries.json')

  // convert to html elements
  for (const entry of entries) {
    // create all the elements needed
    const entryElement = document.createElement('div')
    const titleElement = document.createElement('h3')
    const imageElement = document.createElement('img')
    const descriptionElement = document.createElement('p')

    // modify their contents and classes
    entryElement.className = 'entry'
    titleElement.innerText = entry.name
    imageElement.src = entry.preview.src
    imageElement.alt = entry.preview.alt
    descriptionElement.innerText = entry.description

    // add sub-elements to the parent div
    entryElement.addChild(titleElement)
  }
}

document.onload = () => {
}
