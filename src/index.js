const DOG_URL = 'http://localhost:3000/pups'


function loadDogs() {
  fetch(DOG_URL)
    .then(res => res.json())
    .then(dogs => {
      getDog(dogs)
    })
}

function getDog(dogs) {
  dogs.forEach((dog) => {
    displayDog(dog)
  })
}

function isGoodDog(dog) {
  if (dog.isGoodDog === true) {
    demeanor = "Good Dog!";
  } else {
    demeanor = "Bad Dog!";
  }
  return demeanor;
}

function displayDog(dog) {
  const dogBar = document.getElementById('dog-bar')
  const span = document.createElement('span')

  span.textContent = dog.name
  span.addEventListener('click', () => {
    showDogInfo()
  })

  dogBar.appendChild(span)

  function showDogInfo() {
    const div = document.getElementById('dog-info')

    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }

    const dogImg = document.createElement('img')
    const dogH2 = document.createElement('h2')
    const dogButton = document.createElement('button')

    dogH2.textContent = dog.name
    dogImg.src = dog.image
    dogButton.textContent = isGoodDog(dog)
    dogButton.classList.add('good-bad-btn')

    dogButton.addEventListener('click', (ev) => {
      changeGoodBad(ev, dog)
    })

    div.appendChild(dogImg)
    div.appendChild(dogH2)
    div.appendChild(dogButton)
  }
}

function changeGoodBad(ev, dog) {
  console.log('dog:', dog)
  const div = document.getElementById('dog-info')
  const button = div.getElementsByClassName('good-bad-btn')
  let demeanor = null

  if (ev.target.textContent === "Good Dog!") {
    demeanor = false;
    ev.target.textContent = "Bad Dog!"
  } else {
    demeanor = true;
    ev.target.textContent = "Good Dog!"
  }
  console.log('outside', demeanor)
  fetch (DOG_URL + '/' + dog.id, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'isGoodDog': demeanor
    })
  })
}

function clickFilter() {
  const filter = document.getElementById('good-dog-filter')
  console.log('filter:', filter)

  filter.addEventListener('click', (ev) => {
    filterDogs(ev)
  })

}

function filterDogs(ev) {
  if (ev.target.textContent === "Filter good dogs: OFF") {
    ev.target.textContent = "Filter good dogs: ON"
  } else {
    ev.target.textContent = "Filter good dogs: OFF"
  }
}

loadDogs()
clickFilter()
