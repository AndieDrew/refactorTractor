class Pantry {
  constructor(userIngredients) {
    this.contents = userIngredients;
  }

  takeInventory() {
    return this.contents
  }

  checkPantry(recipe, ingredients) {
    const missingIngredients = [];
    recipe.ingredients.forEach(recipeItem => {
      let foundItemIndex = this.contents.findIndex(pantryItem => pantryItem.ingredient === recipeItem.id);
      if (foundItemIndex === -1 || recipeItem.quantity.amount > this.contents[foundItemIndex].amount) {
        let ingredientName = ingredients.find(item => item.id === recipeItem.id).name;
        missingIngredients.push(ingredientName);
      }
    });
    if (!missingIngredients.length) {
      return `You have the ingredients!`
    } else {
      return missingIngredients;
    }
  }

  useIngredients(recipe, ingredients) {
    if (this.checkPantry(recipe, ingredients) === `You have the ingredients!`) {
      recipe.ingredients.forEach(recipeItem => {
        let foundItemIndex = this.contents.findIndex(pantryItem => pantryItem.ingredient === recipeItem.id);
        this.contents[foundItemIndex].amount = this.contents[foundItemIndex].amount - recipeItem.quantity.amount;
      })
      return recipe.ingredients;
    } else {
      let data = this.checkPantry(recipe, ingredients)
      return data
    }
  }

  returnIngredients(recipe) {
    recipe.ingredients.forEach(recipeItem => {
      let foundItemIndex = this.contents.findIndex(pantryItem => pantryItem.ingredient === recipeItem.id);
      this.contents[foundItemIndex].amount = this.contents[foundItemIndex].amount + recipeItem.quantity.amount;
    })
    return recipe.ingredients;
  }

}

export default Pantry;
