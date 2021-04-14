class Recipe {
  constructor(recipe, ingredientsData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
  }

  calculateCost() {
    let recipeIngredients = this.ingredientsData.filter(ingredient =>
      this.ingredients.find(ing => ingredient.id === ing.id));
    return recipeIngredients.reduce((acc, next) => {
      return acc += next.estimatedCostInCents
    }, 0) / 100;
  }

}

export default Recipe;
