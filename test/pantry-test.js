import { expect } from 'chai';

import User from '../src/user.js';
import Recipe from '../src/recipe.js';
import Pantry from '../src/pantry.js';

import recipeData from '../src/data/recipes.js'
import users from '../src/data/test-users.js'


let user, pantry, missingIngredients;

describe('Pantry', () => {
  beforeEach(() => {
    let currentUser = users[0]
    user = new User(1, currentUser.name, currentUser.pantry)
    pantry = new Pantry(currentUser.pantry)
  });

  it('Should be able to check all ingredients existing inside pantry', () => {
    expect(pantry.takeInventory()).to.deep.eql(user.pantry);
  });

  it('Should be able to check ingredients in User\'s pantry for a given recipe', () => {
    expect(pantry.checkPantry(recipeData[0])).to.eql('You have the ingredients!');
  });

  it('Should inform User if they lack required ingredients for a given recipe', () => {
    missingIngredients = recipeData[1].ingredients.map(ingredient => ingredient.name)
    expect(pantry.checkPantry(recipeData[1])).to.eql(missingIngredients);
  });

  it('Should remove ingredients from pantry if User is able to use them to cook a recipe', () => {
    pantry.useIngredients(recipeData[0]).to.deep.eql([])
  });

});
