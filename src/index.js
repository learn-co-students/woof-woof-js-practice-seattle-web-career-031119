document.addEventListener('DOMContentLoaded', () => {
  const dogURL = "http://localhost:3000/pups"
  const dogBarDiv = document.getElementById('dog-bar')
  let DOGS = []

  function getDogs() {
    fetch(dogURL)
    .then(res => res.json())
    .then(json => displayDogs(json))
  }

  function displayDogs(dogs) {
    dogs.forEach(dog => {
      DOGS.push(dog)
      addDog(dog)
    })
  }

  function addDog(dog) {

    const dogSpan = document.createElement('span')
    dogSpan.textContent = dog.name
    dogSpan.addEventListener('click', () => {
      showDog(dog)
    })

    dogBarDiv.appendChild(dogSpan)
  }

  function showDog(dog) {
    const dogInfoDiv = document.getElementById('dog-info')

    const dogImg = document.createElement('img')
    dogImg.src = dog.image

    const dogName = document.createElement('h2')
    dogName.textContent = dog.name

    const dogButton = document.createElement('button')
    dogButton.textContent = isGoodDog(dog.isGoodDog)
    dogButton.addEventListener('click', () => {
      updateStatus(dog)
      .then(dog => {
        dogButton.textContent = isGoodDog(dog.isGoodDog)
      })
    })

    // clear old dog info before adding new
    while(dogInfoDiv.firstChild){
      dogInfoDiv.removeChild(dogInfoDiv.firstChild);
    }

    dogInfoDiv.appendChild(dogImg)
    dogInfoDiv.appendChild(dogName)
    dogInfoDiv.appendChild(dogButton)
  }

  function isGoodDog(status) {
    if (status) {
      return "Good Dog!"
    } else {
      return "Bad Dog!"
    }
  }

  function updateStatus(dog) {
    return fetch(dogURL + '/' + dog.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: !dog.isGoodDog
      })
    })
    .then(ret => ret.json())
  }

  function filterDogs() {
    const filterButton = document.getElementById("good-dog-filter")
    filterButton.addEventListener('click', () => {
      handleFilter(filterButton)
    })
  }

  function handleFilter(filterButton) {

    while(dogBarDiv.firstChild){
      console.log(dogBarDiv.firstChild);
      dogBarDiv.removeChild(dogBarDiv.firstChild);
    }

    if (filterButton.textContent === "Filter good dogs: OFF") {

      DOGS.forEach(dog => {
        if (dog.isGoodDog) {
          addDog(dog)
        }
      })

      filterButton.textContent = "Filter good dogs: ON"
    } else if (filterButton.textContent === "Filter good dogs: ON") {

      DOGS.forEach(dog => {
        addDog(dog)
      })
      
      filterButton.textContent = "Filter good dogs: OFF"
    }
  }

  function main() {
    getDogs()
    filterDogs()
  }

  main()

})
