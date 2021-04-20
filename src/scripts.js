import './css/base.scss';
import './css/styles.scss';

import domUpdates from './dom-update.js'
// import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import {
  getData,
  postData
} from './APICalls';

let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let cardArea = document.querySelector('.all-cards');
let searchInput = document.querySelector('#search-input');
let cookButton = document.querySelector('#view-recipes-to-cook-button');
let user, pantry, cookbook, ingredients;

window.onload = onStartup();

homeButton.addEventListener('click', () => domUpdates.cardButtonConditionals(event, user, cookbook));
favButton.addEventListener('click', () => domUpdates.viewFavorites(event, user, cookbook));
cardArea.addEventListener('click', () => domUpdates.cardButtonConditionals(event, user, cookbook, ingredients));
searchInput.addEventListener('keyup', () => domUpdates.inputSearch(event, user, cookbook, cardArea, searchInput));
cookButton.addEventListener('click', () => domUpdates.viewRecipesToCook(event, user, cookbook));

function onStartup() {
  fetchCurrentData()
}

function fetchCurrentData() {
  getData()
    .then(allData => {
      let userId = 10 // (Math.floor(Math.random() * allData.userData.length) + 1)
      let newUser = allData.userData.find(user => {
        return user.id === Number(userId);
      });
      if (!user) {
        user = new User(allData.recipeData, userId, newUser.name, newUser.pantry)
        ingredients = allData.ingredientsData
        cookbook = new Cookbook(allData.recipeData, ingredients);
      }
      domUpdates.greetUser(user);
      domUpdates.populateCards(cookbook.recipes, user);
    })
}

export function removePantry(arr) {
  if (typeof(arr[0]) === "string") {
    return
  }
  arr.forEach(ingredient => {
    let data = {
      "userID": user.id,
      "ingredientID": ingredient.id,
      "ingredientModification": Number(`-${ingredient.quantity.amount}`)
    };
    postData(data)
  })
}

export function returnPantry(arr) {
  console.log(arr, '<<array')
  arr.forEach(ingredient => {
    let data = {
      "userID": user.id,
      "ingredientID": ingredient.id,
      "ingredientModification": Number(`+${ingredient.quantity.amount}`)
    };
    postData(data)
  })
}
