class Pantry {
  constructor(userIngredients) {
    this.contents = userIngredients;
  }

  takeInventory() {
    return this.contents
  }

  // recipeObject.ingredients.forEach(ingredient => {
  //   let ingredientName = recipeObject.ingredientsData.find(item => (item.id === ingredient.id));

  checkPantry(recipe, ingredients) {
    const missingIngredients = [];
    recipe.ingredients.forEach(recipeItem => {
      // let ingredientName = recipe.ingredients.find(item => item.id === this.contents.ingredient)
      let foundItemIndex = this.contents.findIndex(pantryItem => pantryItem.ingredient === recipeItem.id);
      if (foundItemIndex === -1 || recipeItem.quantity.amount > this.contents[foundItemIndex].amount) {
        let ingredientName = ingredients.find(item => item.id === recipeItem.id).name;
        missingIngredients.push(ingredientName);
      }
    });
    if (!missingIngredients.length) {
      console.log('You have the ingredients!');
      return `You have the ingredients!`
    } else {
      console.log('missing ingredients', missingIngredients);

      return missingIngredients;
    }
  }

  useIngredients(recipe, ingredients) {
    if (this.checkPantry(recipe, ingredients) === `You have the ingredients!`) {
      recipe.ingredients.forEach(recipeItem => {
        let foundItemIndex = this.contents.findIndex(pantryItem => pantryItem.ingredient === recipeItem.id);
        this.contents[foundItemIndex].amount = this.contents[foundItemIndex].amount - recipeItem.quantity.amount;
        // if (!this.contents[foundItemIndex].amount) {
        //   this.contents.splice(foundItemIndex, 1)
        // }
      })
      console.log("pantry", recipe.ingredients);
      return recipe.ingredients;
    }
  }

}

export default Pantry;
