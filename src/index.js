document.addEventListener('DOMContentLoaded', doAll)

let currentDog

function doAll(){
    getDogs()
    document.getElementById('dog-form').addEventListener('submit',e => submitChange(e))
}

function submitChange(e){
    e.preventDefault()
    form = e.target
    const formData = {
        name: form.name.value,
        breed: form.breed.value,
        sex: form.sex.value
    }


    fetch(`http://localhost:3000/dogs/${currentDog.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then((data) => {
        console.log(data)
        body = document.getElementById('table-body')
        while (body.firstChild){
            body.firstChild.remove()
        }
        getDogs()
    })
}

function getDogs(){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => postDogs(data))
}

function postDogs(dogs){
    body = document.getElementById('table-body')
    dogs.forEach(dog => {
        const dogTable = document.createElement('tr')
        const name = document.createElement('td')
        const breed = document.createElement('td')
        const sex = document.createElement('td')

        const button = document.createElement('button')
        button.addEventListener('click', () => {
            editDog(dog)
            currentDog = dog
        })

        name.innerText = dog.name
        breed.innerText = dog.breed
        sex.innerText = dog.sex
        button.innerText = 'Edit'

        dogTable.append(name)
        dogTable.append(breed)
        dogTable.append(sex)
        dogTable.append(button)

        body.append(dogTable)
    })
}

function editDog(dog){
    const form = document.getElementById('dog-form')

    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
}
