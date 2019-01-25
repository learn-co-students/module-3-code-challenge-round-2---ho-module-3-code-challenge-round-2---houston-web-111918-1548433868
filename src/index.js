const qs = (arg) => {
  return document.querySelector(arg)
}

const ce = (arg) => {
  return document.createElement(arg)
}

let data;

// let beerID = data.id
let beersURL = 'http://localhost:3000/beers'
// let singleBeerDetails = `http://localhost:3000/beers/${data.id}`





let unorderedList = qs('#list-group')
let detailsDiv = qs('#beer-detail')


document.addEventListener('DOMContentLoaded', () => {

  render()

})

const render = () => {
  fetch(beersURL)
      .then(res => res.json())
      .then(res => {
        data = res
        console.log(data)
        displayBeerNames(data)
        // displayBeerDetails(data)
      })
}

const displayBeerNames = (data) => {
  data.forEach((beer) => {
    let beerListItem = ce('li')
    beerListItem.setAttribute('class', 'list-group-item')
    // beerListItem.dataset.id = beer.id
    beerListItem.innerHTML = beer.name
    unorderedList.append(beerListItem)

    beerListItem.addEventListener('click', () => {
      displayBeerDetails(beer)
    })

  })
}

const displayBeerDetails = (beer) => {
  let beerName = ce('h1')
  beerName.innerHTML = beer.name

  let beerImage = ce('img')
  beerImage.setAttribute('src', beer.image_url)

  let beerTagline = ce('h3')
  beerTagline.innerHTML = beer.tagline

  let beerDescription = ce('textarea')
  beerDescription.innerHTML = beer.description

  let editBeerButton = ce('button')
  editBeerButton.setAttribute('id', 'edit-beer')
  editBeerButton.setAttribute('class', 'btn btn-info')
  editBeerButton.innerHTML = 'Save'

  detailsDiv.append(beerName, beerImage, beerTagline, beerDescription, editBeerButton)

  editBeerButton.addEventListener('click', () => {
    editBeerDetails(beer, beerDescription)
  })

}

const editBeerDetails = (beer, beerDescription) => {
  return fetch(`http://localhost:3000/beers/${beer.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: beerDescription.value
    })
  }).then(res => res.json())
}
