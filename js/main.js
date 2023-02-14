import { buildEntryHTML } from './html-builder.js'

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
    const entryElement = buildEntryHTML(entry)

    // add to the list of entries
    entriesElement.appendChild(entryElement)
  }
}

window.onload = () => {
  addEntries()
}
