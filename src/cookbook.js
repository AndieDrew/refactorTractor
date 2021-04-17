class Cookbook {
  constructor(data) {
    this.recipes = data;
  }

  findRecipe(searchText) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        console.log(ingredient);
        return (ingredient.name.toLowerCase().includes(searchText)) ||
          (recipe.name.toLowerCase().includes(searchText))
      });
    })
  }
}

export default Cookbook;
