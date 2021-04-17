class Cookbook {
  constructor(data) {
    this.recipes = data;
  }

  filterByTags(tags) {
    console.log("BEFORE")
    //take array of tags
    //for each tag iterate through recipes
    //if the recipe includes the tag
    //store the recipe in a new array
    let filtered = []
    tags.forEach(tag => {
      filtered.push(this.recipes.filter(recipe => recipe.tags.includes(tag)))
      console.log("MIDDLE")
    });
    console.log("AFTER", filtered);
  }

  // filterByTags(tags) {
  //   console.log("START");
  //   //input: Array of tags
  //   //output: only recipie ID's that include ALL the tags (NO REPEATS)
  //   let filtered = [];
  //   tags.forEach(tag => {
  //     let included = this.recipes.filter(element => element.tags.includes(tag));
  //     // included.forEach(element => {
  //     //   if (!filtered.includes(element)) {
  //     //     filtered.push(element)
  //     //   }
  //     // })
  //   })
  //
  //   console.log("DONE", included)
  //
  // }

  findRecipe(searchText) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        return (ingredient.name.toLowerCase().includes(searchText))
        || (recipe.name.toLowerCase().includes(searchText))
      });
    })
  }
}

export default Cookbook;
