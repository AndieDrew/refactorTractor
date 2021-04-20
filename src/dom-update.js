import Recipe from './recipe';
import {
  removePantry,
  returnPantry
} from './scripts'
// import returnPantry from './scripts'

const domUpdates = {

  inputSearch(event, user, cookbook, cardArea, searchInput) {
    cardArea.innerHTML = " ";
    cookbook.findRecipe(searchInput.value.toLowerCase()).forEach(recipe => {
      cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
        class='card'>
        <header id='${recipe.id}' class='card-header'>
        <label for='add-button' class='hidden'>Click to add recipe</label>
        <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
        <img id='${recipe.id}' class='add'
        src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
        recipes to cook'></button>
        <label for='favorite-button' class='hidden'>Click to favorite recipe
        </label>
        <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-button'>
        </button></header>
        <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
        <img id='${recipe.id}' tabindex='0' class='card-picture'
        src='${recipe.image}' alt='Food from recipe'>
        </div>`)
    })
  },

  viewFavorites(event, user, cookbook) {
    let cardArea = document.querySelector('.all-cards');
    let favButton = document.querySelector('.view-favorites');
    document.querySelector('#search-input').value = '';
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    if (!user.favoriteRecipes.length) {
      favButton.innerHTML = 'You have no favorites!';
      domUpdates.populateCards(cookbook.recipes, user);
      return
    } else {
      favButton.innerHTML = 'Refresh Favorites'
      cardArea.innerHTML = '';
      user.favoriteRecipes.forEach(recipe => {
        cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
          class='card'>
          <header id='${recipe.id}' class='card-header'>
          <label for='add-button' class='hidden'>Click to add recipe</label>
          <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
          <img id='${recipe.id}' class='add'
          src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
          recipes to cook'></button>
          <label for='favorite-button' class='hidden'>Click to favorite recipe
          </label>
          <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite-active card-button'>
          </button></header>
          <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
          <img id='${recipe.id}' tabindex='0' class='card-picture'
          src='${recipe.image}' alt='Food from recipe'>
          </div>`)
      })
    }
  },

  greetUser(user) {
    const userName = document.querySelector('.user-name');
    userName.innerHTML =
      user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
  },

  favoriteCard(event, user, cookbook) {
    let favButton = document.querySelector('.view-favorites');
    let specificRecipe = cookbook.recipes.find(recipe => {
      if (recipe.id === Number(event.target.id)) {
        return recipe;
      }
    })
    if (!event.target.classList.contains('favorite-active')) {
      event.target.classList.add('favorite-active');
      favButton.innerHTML = 'View Favorites';
      user.addToFavorites(specificRecipe);
    } else if (event.target.classList.contains('favorite-active')) {
      event.target.classList.remove('favorite-active');
      user.removeFromFavorites(specificRecipe)
    }
  },

  cardButtonConditionals(event, user, cookbook, ingredients) {
    let favButton = document.querySelector('.view-favorites');
    let addRecipeButton = document.querySelector('.add');
    if (event.target.classList.contains('favorite')) {
      domUpdates.favoriteCard(event, user, cookbook);
    } else if (event.target.classList.contains('card-picture')) {
      domUpdates.displayDirections(event, cookbook, ingredients);
    } else if (event.target.classList.contains('home')) {
      favButton.innerHTML = 'View Favorites';
      domUpdates.populateCards(cookbook.recipes, user);
      document.querySelector('#search-input').value = '';
    } else if (event.target.classList.contains('add-button')) {
      domUpdates.cookRecipe(event, user, cookbook, ingredients);
    }
  },

  displayDirections(event, cookbook, ingredients) {
    let cardArea = document.querySelector('.all-cards');
    let newRecipeInfo = cookbook.recipes.find(recipe => {
      if (recipe.id === Number(event.target.id)) {
        return recipe;
      }
    })
    let recipeObject = new Recipe(newRecipeInfo, ingredients);
    let cost = recipeObject.calculateCost()
    let costInDollars = (cost / 100).toFixed(2)
    cardArea.classList.add('all');
    cardArea.innerHTML = `<h3>${recipeObject.name}</h3>
    <p class='all-recipe-info'>
    <strong>It will cost: </strong><span class='cost recipe-info'>
    $${costInDollars}</span><br><br>
    <strong>You will need: </strong><span class='ingredients recipe-info'></span>
    <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
    </span></ol>
    </p>`;
    let ingredientsSpan = document.querySelector('.ingredients');
    let instructionsSpan = document.querySelector('.instructions');
    recipeObject.ingredients.forEach(ingredient => {
      let ingredientName = recipeObject.ingredientsData.find(item => (item.id === ingredient.id));
      ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
      ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
      ${ingredientName.name}</li></ul>
      `)
    })
    recipeObject.instructions.forEach(instruction => {
      instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
      ${instruction.instruction}</li>
      `)
    })
  },

  getFavorites(user) {
    if (user.favoriteRecipes.length) {
      user.favoriteRecipes.forEach(recipe => {
        document.querySelector(`.favorite${recipe.id}`).classList.add('favorite-active')
      })
    } else {
      return
    }
  },

  populateCards(recipes, user) {
    let cardArea = document.querySelector('.all-cards');
    cardArea.innerHTML = '';
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    recipes.forEach(recipe => {
      cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
      class='card'>
          <header id='${recipe.id}' class='card-header'>
            <label for='add-button' class='hidden'>Click to add recipe</label>
            <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
              <img id='${recipe.id} favorite' class='add'
              src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
              recipes to cook'>
            </button>
            <label for='favorite-button' class='hidden'>Click to favorite recipe
            </label>
            <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-button'></button>
          </header>
            <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
            <img id='${recipe.id}' tabindex='0' class='card-picture'
            src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>
      </div>`)
    })
    this.getFavorites(user);
  },

  cookRecipe(event, user, cookbook, ingredients) {
    let cardArea = document.querySelector('.all-cards');
    let addRecipeButton = document.querySelector('.add-button');
    let cookButton = document.querySelector('#view-recipes-to-cook-button');
    let specificRecipe = cookbook.recipes.find(recipe => {
      if (recipe.id === Number(event.target.id)) {
        return recipe;
      }
    })
    if (!event.target.classList.contains('cook-active') && user.pantry.checkPantry(specificRecipe, ingredients) === `You have the ingredients!`) {
      console.log(user.pantry, "pre");
      let data = user.pantry.useIngredients(specificRecipe, ingredients);
      removePantry(data)
      console.log(user.pantry, "post");
      event.target.classList.add('cook-active');
      cookButton.innerHTML = 'View Recipes To Cook';
      user.addRecipeToCook(specificRecipe);
      console.log(specificRecipe);
    } else if (event.target.classList.contains('cook-active')) {
      console.log("REMOVED")
      event.target.classList.remove('cook-active');
      let data = user.pantry.returnIngredients(specificRecipe, ingredients);
      returnPantry(data);
      user.removeFromRecipesToCook(specificRecipe);
    } else {
      console.log("I DIDNT WORK!")
    }
  },

  viewRecipesToCook(event, user, cookbook) {
    let cardArea = document.querySelector('.all-cards');
    let cookButton = document.querySelector('#view-recipes-to-cook-button');
    document.querySelector('#search-input').value = '';
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    if (!user.recipesToCook.length) {
      cookButton.innerHTML = 'You have nothing to cook!';
      domUpdates.populateCards(cookbook.recipes, user);
      return
    } else {
      cookButton.innerHTML = 'Refresh Recipes To Cook'
      cardArea.innerHTML = '';
      user.recipesToCook.forEach(recipe => {
        cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
        class='card'>
        <header id='${recipe.id}' class='card-header'>
        <label for='add-button' class='hidden'>Click to add recipe</label>
        <button id='${recipe.id}' aria-label='add-button' class='add-button cook-active card-button'>
        <img id='${recipe.id}' class='add'
        src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
        recipes to cook'></button>
        <label for='favorite-button' class='hidden'>Click to favorite recipe
        </label>
        <button id='${recipe.id}' aria-label='favorite-button' class='favorite card-button'>
        </button></header>
        <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
        <img id='${recipe.id}' tabindex='0' class='card-picture'
        src='${recipe.image}' alt='Food from recipe'>
        </div>`)
      })
    }
  }

}

export default domUpdates;
