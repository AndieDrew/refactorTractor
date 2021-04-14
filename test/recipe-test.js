import { expect } from 'chai';

import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';

let recipe, recipe1;

describe('Recipe', () => {
  beforeEach(() => {

    recipe = new Recipe(recipeData[0], ingredientsData);
    recipe1 = new Recipe(recipeData[1], ingredientsData);
  });

  describe('Recipe Data', () => {

    it('Should hold recipe name', () => {
      expect(recipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
      expect(recipe1.name).to.equal("Maple Dijon Apple Cider Grilled Pork Chops");
    })

    it('Should hold its own ingredient data', () => {
      expect(recipe.ingredients).to.equal(recipeData[0].ingredients);
    })

    it('Should hold its own instruction data', () => {
      expect(recipe.instructions).to.equal(recipeData[0].instructions);
    })

    it('Should hold tags for its own recipe', () => {
      expect(recipe.tags).to.deep.equal(["antipasti", "starter", "snack", "appetizer", "antipasto", "hor d'oeuvre"]);
      expect(recipe1.tags).to.deep.equal(["lunch", "main course", "main dish", "dinner"]);
    })

    it('Should be able to calculate the cost of its ingredients', () => {
      expect(recipe.calculateCost()).to.equal(59.21);
      expect(recipe1.calculateCost()).to.equal(63.64);

    });


  })
});
