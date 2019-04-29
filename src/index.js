const DOG_URL = "http://localhost:3000/pups"
let CURRENT_DOG = null


document.addEventListener('DOMContentLoaded', () => {

function getDogs(){
  fetch(DOG_URL)
  .then(res => res.json())
  .then(dogs => showAllDogs(dogs))
}

function showAllDogs(dogs){
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
    showDogInfo(dog)
  })
}

// What to put in dog box
// <img src=dog_image_url>
// <h2>Mr. Bonkers</h2>
// <button>Good Dog!</button>
function showDogInfo(dog){
  img.src = dog.image
  h2.textContent = dog.name
  button.id = dog.id
  if (dog.isGoodDog === true){
    button.textContent = 'Good dog!'
  }
  else {
    button.textContent = 'Bad dog!'
  }
  button.addEventListener('click', () => {
    changeStatus(dog)
    // console.log(dog)
  })
}
// --status--
// isGoodDog: true


function makeDogContainer(){
  box = document.getElementById('dog-info')
  img = document.createElement('img')
  h2 = document.createElement('h2')
  button = document.createElement('button')

  box.appendChild(img)
  box.appendChild(h2)
  box.appendChild(button)
}

function changeStatus(dog){
  button = document.getElementById(dog.id)
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


getDogs()
makeDogContainer()

})
