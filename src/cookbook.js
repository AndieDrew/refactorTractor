class Cookbook {
  constructor(data, ingredients) {
    this.recipes = data;
    this.ingredients = ingredients;
  }

  findRecipe(searchText) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(recIngredient => {
        console.log(this.ingredients)
        this.ingredients.forEach(ingredient => {
          if (recIngredient.id === ingredient.id) {
            recIngredient.name = ingredient.name;
          }
        })
        return (recipe.name.toLowerCase().includes(searchText)) ||
          (recIngredient.name.toLowerCase().includes(searchText))
      });
    })
  }
}

export default Cookbook;
