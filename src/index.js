document.addEventListener("DOMContentLoaded", () => {
	const DOG_URL = "http://localhost:3000/pups"
	const DOGS = []

	const DOG_BAR_DIV = document.getElementById('dog-bar')

	function getDogs(){
		fetch(DOG_URL)
			.then(res => res.json())
			.then(json => createDogs(json))
	}

	function createDogs(dogs){
		dogs.forEach(addDog)
	}

	function addDog(dog){
		dogSpan = document.createElement('span')
		dogSpan.textContent = dog.name
		dogSpan.addEventListener("click", () => {
			showDog(dog)
		})
		 DOG_BAR_DIV.appendChild(dogSpan)
	}

	function showDog(dog) {
		let dogDiv = document.getElementById('dog-info')

		let dogImage = document.createElement('img')
		dogImage.src = dog.image

		let dogName = document.createElement('h2')
		dogName.textContent = dog.name

		let dogButton = document.createElement('button')
		dogButton.textContent = isGoodDog(dog.isGoodDog)
		dogButton.addEventListener('click', () => {
			updateDogStatus(dog)
			//chain .then and dogBUtton to dynamically update page
			//it is dependant on your return on the fetch PATCH
			.then(json => {
				dogButton.textContent = isGoodDog(json.isGoodDog)
			})
		})

		while(dogDiv.firstChild){
		 dogDiv.removeChild(dogDiv.firstChild);
	 }
		dogDiv.appendChild(dogImage)
		dogDiv.appendChild(dogName)
		dogDiv.appendChild(dogButton)

	}

	function isGoodDog(value){
		if (value){
			return "Good Dog!"
		}else {
			return "Bad Dog!"
		}
	}

	function updateDogStatus(dog){
		return fetch(DOG_URL + '/' + dog.id, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				 isGoodDog: !dog.isGoodDog
			})
		})
		.then(res => res.json())
	}


	function main(){
		getDogs()

	}

	main()

})
