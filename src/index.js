const DOGS_URL = "http://localhost:3000/pups"
const filter = document.getElementById('good-dog-filter')
const barDiv = document.getElementById('dog-bar')
const infoDiv = document.getElementById('dog-info')

fetch(DOGS_URL)
  .then(res => res.json())
  .then(json => populateDogBar(json))

function populateDogBar(json) {
  clearInfoDiv()
  clearBarDiv()
  json.forEach( (pup) => {
    const span = document.createElement('span')
    span.textContent = pup.name
    barDiv.appendChild(span)
    span.addEventListener('click', () => displayDog(pup))
  })
}

function clearInfoDiv() {
  while(infoDiv.firstChild) {
    infoDiv.firstChild.remove()
  }
}

function clearBarDiv() {
  while(barDiv.firstChild) {
    barDiv.firstChild.remove()
  }
}

function displayDog(pup) {
  clearInfoDiv()

  const img = document.createElement('img')
  img.src = pup.image
  infoDiv.appendChild(img)

  const h2 = document.createElement('h2')
  h2.textContent = pup.name
  infoDiv.appendChild(h2)

  const button = document.createElement('button')
  if (pup.isGoodDog){
    button.textContent = "Good Dog!"
  } else {
    button.textContent = "Bad Dog!"
  }
  infoDiv.appendChild(button)
  button.addEventListener('click', (ev) => patchDog(ev, pup))
}

function patchDog(ev, pup) {
  const newStatus = !pup.isGoodDog
  fetch(DOGS_URL + "/" + pup.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: newStatus
    })
  })
  .then(resp => resp.json())
  .then(json => changeButton(ev, json, pup))
}

function changeButton(ev, json, pup) {
  if (json.isGoodDog) {
    ev.target.textContent = "Good Dog!"
    pup.isGoodDog = true
  } else {
    ev.target.textContent = "Bad Dog!"
    pup.isGoodDog = false
    getDogs().then(json => filterGoodDogs(json))
  }
}

filter.addEventListener('click', (ev) => handleFilter(ev))

function handleFilter(ev) {
  changeFilter(ev)
  clearBarDiv()
  if (ev.target.textContent === "Filter good dogs: ON") {
    getDogs().then(json => filterGoodDogs(json))
  } else {
    getDogs().then(json => populateDogBar(json))
  }
}

function changeFilter(ev) {
  if (ev.target.textContent === "Filter good dogs: OFF") {
    ev.target.textContent = "Filter good dogs: ON"
  } else if (ev.target.textContent === "Filter good dogs: ON") {
    ev.target.textContent = "Filter good dogs: OFF"
  }
}

function getDogs() {
  return fetch(DOGS_URL)
    .then(resp => resp.json())
}

function filterGoodDogs(json) {
  const goodDogs = json.filter( (pup) => pup.isGoodDog === true)
  populateDogBar(goodDogs)
}
