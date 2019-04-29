const PUPS_URL = 'http://localhost:3000/pups'
let filter_dogs = false

document.addEventListener('DOMContentLoaded', () => {
  fetchPups().then(json => displayPups(json))

  let dogFilter = document.getElementById('good-dog-filter')
  dogFilter.addEventListener('click', () => {
    filterDogs(dogFilter)
  })

})

function fetchPups() {
  return fetch(PUPS_URL)
    .then(res => res.json())
}

function displayPups(pups) {
  pups.forEach(pup =>
    addPupToPage(pup))
}

// {
// id: 1,
// name: "Mr. Bonkers",
// isGoodDog: true,
// image: "https://weloveanimals.me/wp-content/uploads/2017/10/gettyimages-590486672-e1508512743796.jpg"
// },

function addPupToPage(pup) {

  let div = document.getElementById('dog-bar')

  let span = document.createElement('span')
  span.textContent = pup.name
  span.setAttribute('id', `pup-id: ${pup.id}`)
  span.addEventListener('click', () => {
    showDogInfo(pup)
  })

  div.appendChild(span)

}

function showDogInfo(pup) {

  let dogInfoDiv = document.getElementById('dog-info')

  while (dogInfoDiv.firstChild) {
    dogInfoDiv.firstChild.remove()
  }

  const img = document.createElement('img')
  img.src = pup.image
  let h2 = document.createElement('h2')
  h2.textContent = pup.name

  let button = document.createElement('button')
  if (pup.isGoodDog === true) {
    button.textContent = "Bad Dog"
  } else {
    button.textContent = "Good Dog"
  }

  button.addEventListener('click', () => {
    changePupStatus(pup, button)
  })

  dogInfoDiv.appendChild(img)
  dogInfoDiv.appendChild(h2)
  dogInfoDiv.appendChild(button)
}

function changePupStatus(pup, button) {
  pup.isGoodDog = !pup.isGoodDog

  fetch(PUPS_URL + '/' + pup.id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: pup.isGoodDog
      })
    })
    .then(res => res.json())



  if (pup.isGoodDog === true) {
    button.textContent = "Bad Dog"
    if (filter_dogs === true) {
      addPupToPage(pup)
    }
  } else {
    button.textContent = "Good Dog"
    if (filter_dogs === true) {
      let span = document.getElementById(`pup-id: ${pup.id}`)
      span.remove()
    }
  }

}


function filterDogs(dogFilter) {
  filter_dogs = !filter_dogs
  if (filter_dogs === true) {
    removeDogBarElements()
    dogFilter.textContent = 'Filter good dogs: ON'
    updateDogBar()
  } else {
    removeDogBarElements()
    dogFilter.textContent = 'Filter good dogs: OFF'
    fetchPups().then(json => displayPups(json))
  }
}

function removeDogBarElements() {
  let div = document.getElementById('dog-bar')
  while (div.firstChild) {
    div.firstChild.remove()
  }
}

function updateDogBar() {
  fetchPups().then(json => {
    json.forEach(pup => {
      if (pup.isGoodDog) {
        addPupToPage(pup)
      }
    })
  })
}
