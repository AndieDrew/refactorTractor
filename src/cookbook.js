class Cookbook {
  constructor(data, ingredients) {
    this.recipes = data;
    this.ingredients = ingredients;
  }

  filterByTags(tags) {
    let matches = []
    this.recipes.forEach(recipe => {
      if (tags.every(tag => recipe.tags.includes(tag))) {
        matches.push(recipe)
      }
    })
    return matches.map(match => match.name);
  }

  findRecipe(searchText) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(recIngredient => {
        this.ingredients.forEach(ingredient => {
          if (recIngredient.id === ingredient.id) {
            recIngredient.name = ingredient.name;
          }
        })
        return (recipe.name.toLowerCase().includes(searchText.toLowerCase())) ||
          (recIngredient.name.toLowerCase().includes(searchText.toLowerCase()))
      });
    })
  }
}

export default Cookbook;
