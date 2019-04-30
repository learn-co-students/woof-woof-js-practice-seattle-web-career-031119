const DOG_URL = "http://localhost:3000/pups"
// let CURRENT_DOG = null
let DOGS = null

document.addEventListener('DOMContentLoaded', () => {

function getDogs(){
  fetch(DOG_URL)
  .then(res => res.json())
  .then(dogs => showAllDogs(dogs))
}

function showAllDogs(dogs){
  DOGS = dogs
  dogs.forEach(dog => {
    // console.log('dog:', dog.name)
    makeDog(dog)
  })
}

function makeDog(dog){
  const bar = document.getElementById('dog-bar')
  const span = document.createElement('span')
  span.textContent = dog.name
  bar.appendChild(span)
  span.addEventListener('click', () => {
    clearDog()
  // CURRENT_DOG = dog
  let box = document.getElementById('dog-info')
  let img = document.createElement('img')
  img.src = dog.image
  let h2 = document.createElement('h2')
  h2.textContent = dog.name
  let button = document.createElement('button')
  button.id = 'good-btn'
  box.appendChild(img)
  box.appendChild(h2)
  box.appendChild(button)
  button.addEventListener('click', () => {
    changeStatus(dog)
  })
  isDogGood(dog)

})
}

function clearDog(){
  let dogInfo = document.getElementById('dog-info')
  while (dogInfo.firstChild){
    dogInfo.firstChild.remove()
  }
}

function isDogGood(dog){
  let button = document.getElementById('good-btn')
  if (dog.isGoodDog === true){
    button.textContent = 'Good dog!'
  }
  else {
    button.textContent = 'Bad dog!'
  }
}

function changeStatus(dog){
  let button = document.getElementById('good-btn')
  if (dog.isGoodDog === true) {
    dog.isGoodDog = false;
    button.textContent = 'Bad dog!'
  }
  else if (dog.isGoodDog === false) {
    dog.isGoodDog = true;
    button.textContent = 'Good dog!'
  }
  console.log('dog status:', dog.isGoodDog)

  updateStatus(dog)
}

function updateStatus(dog) {
  fetch(DOG_URL + '/' + dog.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: dog.isGoodDog
    })
  })
  .then(res => res.json())
}



function filterDogs(){
  let button = document.getElementById('good-dog-filter')
  button.addEventListener('click', () => {
    if (button.innerText === 'Filter good dogs: OFF') {
      button.innerText = 'Filter good dogs: ON';
      showGoodDogs()
    }
    else if (button.innerText === 'Filter good dogs: ON') {
      button.innerText = 'Filter good dogs: OFF';
      clearDogs()
      showAllDogs(DOGS)
    }
  })
}

function showGoodDogs(){
  clearDogs()
  DOGS.forEach(dog => {
  if (dog.isGoodDog === true){
    makeDog(dog)
  }
  })
}

function clearDogs(){
  let dogBar = document.getElementById('dog-bar')
  while (dogBar.firstChild){
    dogBar.firstChild.remove()
  }
}

getDogs()
filterDogs()

})
