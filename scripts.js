//Local storage with a get item from an empty list, and if items do exist, store them in item value
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
console.log(itemsArray)
// Event listener so when the user clicks, we can add a value to our empty list
document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item")
  // Passing to the create item function
  createItem(item)
})
// Display items on screen
function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `
        <div class="item">
            <div class="input-controller">
                <textarea disabled>${itemsArray[i]}</textarea>
                <div class="edit-controller">
                    <i class="fa-solid fa-check deleteBtn"></i>
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                </div>
            </div>
            <div class="update-controller">
                <button class="saveBtn">Save</button>
                <button class="cancelBtn">Cancel</button>
            </div>
        </div>`
  }
  document.querySelector('.to-do-list').innerHTML = items
  activateDeleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}

//save changes after you update items on list
function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn")
  const inputs = document.querySelectorAll(".input-controller textarea")
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i)
    })
  })
}



function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn")
  const updateController = document.querySelectorAll('.update-controller  textarea')
  const inputs = document.querySelectorAll('.input-controller  textarea')
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateController[i] = 'none'
      inputs[i].disabled = true
    })
  })
}
// update item on list 
function updateItem(text, i) {
  itemsArray[i] = text
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}
function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll('.deleteBtn')
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => { deleteItem(i) })
  })
}

// delete item from to do list
function deleteItem(i) {
  itemsArray.splice(i, 1)
  localStorage.setItem("items", JSON.stringify(itemsArray))
  location.reload()
}
//edit item from to do list 
function activateEditListeners() {
  let editBtn = document.querySelectorAll('.editBtn')
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = 'block'
      inputs[i].disabled = false
    })
  })
}
//edit item from to do list 
function editItem(i) {
  itemsArray.splice(i + 1)
  localStorage.setItem("items", JSON.stringify(itemsArray))
  location.reload()
}


// This is where you create the item for your to-do list; it is also stored in this function in local storage
function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  // Reload the page
  location.reload()
}
function displayDate() {
  let date = new Date();
  // Split wherever there is a space after it converts to string
  date = date.toString().split(" ");
  document.querySelector('#date').innerHTML = date[1] + " " + date[2] + " " + date[3];
}
window.onload = function () {
  displayDate()
  displayItems()
}

























