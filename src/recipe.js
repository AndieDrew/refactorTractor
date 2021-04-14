class Recipe {
  constructor(recipe, ingredientsData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
  }

  // calculateCost() {
  //   let costCounter = 0;
  //   this.ingredients.forEach(ingredient => {
  //     this.ingredientsData.find(specificIngredient => {
  //       if (specificIngredient.id === ingredient.id) {
  //         costCounter += (Number(specificIngredient.estimatedCostInCents) *
  //         Number(ingredient.quantity.amount))
  //       }
  //     })
  //   });
  //   return costCounter;
  // }

  calculateCost() {
    let recipeIngredients = this.ingredientsData.filter(ingredient =>
      this.ingredients.find(ing => ingredient.id === ing.id));

    return recipeIngredients.reduce((acc, next) => {
      return acc += next.estimatedCostInCents
    }, 0) / 100;

  }

}

export default Recipe;
