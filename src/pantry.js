class Pantry {
  constructor(userIngredients) {
    this.contents = userIngredients;
  }

  takeInventory() {
    return this.contents
  }

  checkPantry(recipe) {
    const missingIngredients = [];
    recipe.ingredients.forEach(recipeItem => {
      let foundItemIndex = this.contents.findIndex(pantryItem => pantryItem.ingredient === recipeItem.id);
      if (foundItemIndex === -1 || recipeItem.quantity.amount > this.contents[foundItemIndex].amount) {
        missingIngredients.push(recipeItem.name);
      }
    });
    if (!missingIngredients.length) {
      return `You have the ingredients!`
    } else {
      return missingIngredients;
    }
  }

  useIngredients(recipe) {
    if (this.checkPantry(recipe) === `You have the ingredients!`) {
      recipe.ingredients.forEach(recipeItem => {
        let foundItemIndex = this.contents.findIndex(pantryItem => pantryItem.ingredient === recipeItem.id);
        this.contents[foundItemIndex].amount = this.contents[foundItemIndex].amount - recipeItem.quantity.amount;
        if (!this.contents[foundItemIndex].amount) {
          this.contents.splice(foundItemIndex, 1)
        }
      })
      return this.contents;
    }
  }
}

export default Pantry;
