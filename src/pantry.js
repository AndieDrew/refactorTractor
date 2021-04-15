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



  useIngredients() {

  }
}

export default Pantry;
