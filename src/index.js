const PUPS_URL = `http://localhost:3001/pups`
CURRENT_DOG = null
FILTER = false

function makeShow() {
  // run this once to create the area dogs are displayed in
  // it's hidden until the first dog is clicked
  let dogInfo = document.getElementById('dog-info')
  let img = document.createElement('img')
  let span = document.createElement('span')
  let btn = document.createElement('button')

  btn.addEventListener('click', () => { toggleGoodDog(CURRENT_DOG) })
  appendChildren(dogInfo, img, span, btn)
  dogInfo.style.display = "none"

  let filterBtn = document.getElementById('good-dog-filter')
  filterBtn.addEventListener('click', () => {
    toggleFilter()
  })
}

function appendChildren(parent, ...args){
  // helper function to append children
  args.forEach( arg => parent.appendChild(arg) )
}

function toggleFilter() {
  // turns goodboye filter on & off, changes global FILTER var,
  // and clears and rerenders pups
  let dogInfo = document.getElementById('dog-info')
  let filterBtn = document.getElementById('good-dog-filter')
  FILTER = !FILTER
  FILTER ? filterBtn.textContent = "Filter good dogs: ON" : filterBtn.textContent = "Filter good dogs: OFF"
  clearPups()
  getPups()
}

function clearPups(){
  // manual clear all pups
  let dogBar = document.getElementById('dog-bar')
  while (dogBar.firstChild) {
    dogBar.firstChild.remove()
  }
}

function getPups() {
  fetch(PUPS_URL)
  .then( res => res.json() )
  .then( makePups )
}

function makePups(pups) {
  // check for filter, if it's on only render pups who are goode
  pups.forEach( pup => {
    if (!FILTER ) {
      makePup(pup)
    } else if (FILTER && pup.isGoodDog) {
      makePup(pup)
  }})
}

function makePup(pup) {
  let dogBar = document.getElementById('dog-bar')
  let span = document.createElement('span')
  span.textContent = pup.name
  span.addEventListener('click', _ => { showPup(pup) })
  dogBar.appendChild(span)
}

function showPup(pup) {
  CURRENT_DOG = pup
  let dogInfo = document.getElementById('dog-info')
  let img = dogInfo.children[0]
  let span = dogInfo.children[1]
  let btn = dogInfo.children[2]

  span.textContent = CURRENT_DOG.name
  pup.isGoodDog ? btn.textContent = "Good Dog!" : btn.textContent = "Bad Dog!"
  img.src = pup.image

  // reveal show area
  dogInfo.style.display = ""
}

function toggleGoodDog(pup) {
  toggledValue = !pup.isGoodDog
  fetch(PUPS_URL + '/' + pup.id, {
    method: "PATCH",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: toggledValue
    })
  })
    .then( res => res.json() )
    .then( _ => renderBtn(toggledValue))
}

function renderBtn(value) {
  let btn = document.getElementById('dog-info').children[2]
  CURRENT_DOG.isGoodDog = value
  value ? value = "Good Dog!" : value = "Bad Dog!"
  btn.textContent = value
  clearPups()
  getPups()
}

function main() {
  makeShow()
  getPups()
}

main()
