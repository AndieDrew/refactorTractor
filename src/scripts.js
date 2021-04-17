import './css/base.scss';
import './css/styles.scss';

import domUpdates from './dom-update.js'
import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import {
  fetchData
} from './APICalls';

let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let cardArea = document.querySelector('.all-cards');
let searchInput = document.querySelector("#search-input");


let user, pantry, cookbook;

window.onload = onStartup();

homeButton.addEventListener('click', () => domUpdates.cardButtonConditionals(event, user, cookbook));

favButton.addEventListener('click', () => {
  console.log(cookbook, "clicked favorite");
  domUpdates.viewFavorites(event, user, cookbook)
});

cardArea.addEventListener('click', () => domUpdates.cardButtonConditionals(event, user, cookbook));
searchInput.addEventListener('keyup', domUpdates.inputSearch);

function onStartup() {
  fetchCurrentData()
  console.log(cookbook, "on startup");
}

function fetchCurrentData() {
  fetchData()
    .then(allData => {
      let userId = (Math.floor(Math.random() * allData.userData.length) + 1)
      let newUser = allData.userData.find(user => {
        return user.id === Number(userId);
      });
      if (!user) {
        user = new User(allData.recipeData, userId, newUser.name, newUser.pantry)
        pantry = new Pantry(newUser.pantry)
        cookbook = new Cookbook(allData.recipeData);
        console.log(cookbook, "post fetch");
      }
      domUpdates.greetUser(user);
      console.log(user, "post fetch user");
      domUpdates.populateCards(cookbook.recipes, user);
    })
}
