
let groceryCategoryTextBox = document.getElementById("groceryCategoryTextBox")
let btnSave = document.getElementById("btnSave")
let groceryCategoriesList = document.getElementById("groceryCategoriesList")

let groceryCategoriesRef = database.ref("grocery-categories")

function setupObservers() {

  groceryCategoriesRef.on('value',function(snapshot){

    let groceryCategories = []

    for(key in snapshot.val()) {

      let groceryCategory = snapshot.val()[key]
      groceryCategories.push(groceryCategory)
    }

    displayGroceryCategories(groceryCategories)

  })

}

function addGroceryItemFor(groceryCategoryName,sender) {

  // cookie, milk, paper, soda
  let groceryItemName = sender.previousSibling.value

  groceryCategoriesRef.child(groceryCategoryName).child("groceryItems").push({
    title : groceryItemName
  })

}

function displayGroceryCategories(groceryCategories) {

    groceryCategoriesList.innerHTML = ""

    groceryCategories.forEach(function(groceryCategory){

      let groceryCategoryItem = `<li>${groceryCategory.title}</li><input type="text" /><button onclick="addGroceryItemFor('${groceryCategory.title}',this)">Add Grocery Item</button>`

      let groceryItemDiv = ``

      if(groceryCategory.groceryItems) {



        for(key in groceryCategory.groceryItems) {

            let groceryItem = groceryCategory.groceryItems[key]
            console.log(groceryItem)

            groceryItemDiv += `<div>${groceryItem.title}</div>`
        }

      }

      groceryCategoriesList.innerHTML += groceryCategoryItem + groceryItemDiv

    })

}



btnSave.addEventListener('click',function(){

  let groceryCategoryName = groceryCategoryTextBox.value

  groceryCategoriesRef.child(groceryCategoryName).set({
    title : groceryCategoryName,
    groceryItems : []
  })

})


setupObservers()
