const DOGGO_URL_WOOF = 'http://localhost:3000/pups'
const DOGS = [];

function attachEventListeners(){
  let goodDogFilter = document.getElementById('good-dog-filter')
  goodDogFilter.addEventListener('click', ev => {
    clearDoggos()
    if (goodDogFilter.textContent === "Filter good dogs: ON"){
      goodDogFilter.textContent = "Filter good dogs: OFF"
      addDoggos(DOGS)
    } else {
      goodDogFilter.textContent = "Filter good dogs: ON"
      addDoggos(DOGS.filter( doggo => doggo.isGoodDog))
    }
  })
}

function loadUpDoggos(goodFilter){
  fetch(DOGGO_URL_WOOF)
  .then( res => res.json())
  .then ( json => {
    json.forEach(dog => {
      DOGS.push(dog)
    })
    addDoggos(DOGS)
  })
}

function addDoggos(doggos){
  doggos.forEach(doggo => addDoggo(doggo))
}

function addDoggo(doggo){
  let doggoDiv = document.getElementById('dog-bar')
  let doggoSpan = document.createElement('span')
  doggoSpan.textContent = doggo.name

  doggoSpan.addEventListener('click', () => {
    let featuredDoggo = document.getElementById('dog-info')
    let doggoImg = document.createElement('img')
    doggoImg.src = doggo.image

    let doggoName = document.createElement('h2')
    doggoName.textContent = doggo.name

    let button = document.createElement('button')
    button.textContent = doggo.isGoodDog ? "Good Dog!" : "Bad Dog!"
    button.addEventListener('click', ev => {
      changeDog(ev, doggo)
    })

    while(featuredDoggo.firstChild){
      featuredDoggo.firstChild.remove()
    }

    featuredDoggo.appendChild(doggoImg)
    featuredDoggo.appendChild(doggoName)
    featuredDoggo.appendChild(button)
  })
  doggoDiv.appendChild(doggoSpan)
}

function changeDog(ev, doggo){
  let isGood = doggo.isGoodDog
  ev.target.textContent = isGood ? "Bad Dog!" : "Good Dog!"
  fetch(DOGGO_URL_WOOF+'/'+doggo.id, {
    method: "PATCH",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: !isGood
    })
  })

}

function clearDoggos() {
  let doggoDiv = document.getElementById('dog-bar')
  while(doggoDiv.firstChild){
    doggoDiv.firstChild.remove();
  }
}

function main() {
  loadUpDoggos(false)
  attachEventListeners()
}


document.addEventListener('DOMContentLoaded', main);
