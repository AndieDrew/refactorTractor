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
      let foundItem = this.contents.find(pantryItem => {
        if ((pantryItem.ingredient === recipeItem.id) && (pantryItem.amount >= recipeItem.quantity.amount)) {
          return pantryItem
        } else if ((pantryItem.ingredient === recipeItem.id) || (pantryItem.amount < recipeItem.quantity.amount)) {
          missingIngredients.push(recipeItem.name)
        }
      })
    });
    console.log(missingIngredients);
    if (missingIngredients.length) {
      return missingIngredients;
    } else {
      return `You have the ingredients!`
    }

  }



  useIngredients() {

  }
}

export default Pantry;
