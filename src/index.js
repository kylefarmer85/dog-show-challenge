
function main() {
  getDogs()
  // createFormListener()
}

const tableBody = document.querySelector('#table-body')
const dogURL = "http://localhost:3000/dogs" 
const dogForm = document.querySelector("#dog-form")

function getDogs() {
  tableBody.innerHTML = ""
  fetch(dogURL)
  .then(resp => resp.json())
  .then(dogs => dogs.forEach(renderDog))
}

function renderDog(dog) {

  const tr = document.createElement('tr')
  // const tdName = document.createElement('td')
  // const tdBreed = document.createElement('td')
  // const tdSex tdName = document.createElement('td')
  const editBtn = document.createElement('button')
  // editBtn.innerText = "Edit Button"

  tr.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td><td><button class="dog-btn" data-name="${dog.name}" data-breed="${dog.breed}" data-sex=${dog.sex} data-id="${dog.id}">Edit Dog</button></td>`

  tableBody.append(tr)
}

tableBody.addEventListener("click", (e) => {
  if (e.target.className === "dog-btn") {
  const dogName = e.target.dataset.name
  const dogBreed = e.target.dataset.breed
  const dogSex = e.target.dataset.sex
  const dogID = e.target.dataset.id
   
  const editName = document.querySelector("#dog-form input[name='name']")
  const editBreed = document.querySelector("#dog-form input[name='breed']")
  const editSex = document.querySelector("#dog-form input[name='sex']")
  const getID = document.querySelector("#dog-form input[name='id']")
  
  editName.value = dogName
  editBreed.value = dogBreed
  editSex.value = dogSex
  getID.value = dogID
  }
})


  dogForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const patchID = e.target['id'].value
    reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
       name: e.target["name"].value,
       breed: e.target["breed"].value,
       sex: e.target["sex"].value
     })
    }

    fetch(dogURL + `/${patchID}`, reqObj)
      .then(resp => resp.json())
      .then(dog => getDogs())
      e.target.reset() 
  })




main()