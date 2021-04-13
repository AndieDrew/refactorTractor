import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js'

let user1

describe('User', () => {
  beforeEach(() => {
    user1 = new User(1, 'Boba', [
      {
        'ingredient': 1077,
        'amount': 1
      },
      {
        'ingredient': 14412,
        'amount': 1
      },
      {
        'ingredient': 1009054,
        'amount': 3
      }]
    );
  });

  it('Should have a property of favoriteRecipes with a default value of an empty array', () => {
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to add recipes to favoriteRecipes', () =>{
    user1.addToFavorites(recipeData[0])
    expect(user1.favoriteRecipes.includes(recipeData[0])).to.eql(true);
  });

  it('Should be able to remove recipes from favoriteRecipes', () =>{
    user1.addToFavorites(recipeData[0])
    user1.addToFavorites(recipeData[1])
    user1.removeFromFavorites(recipeData[0]);
    user1.removeFromFavorites(recipeData[1]);
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to filter through favoriteRecipes by tag', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.filterFavorites('antipasti')).to.eql([recipeData[0]]);
    expect(user1.filterFavorites('snack')).to.eql([recipeData[0]]);
    expect(user1.filterFavorites('lunch')).to.eql([recipeData[1]]);
    expect(user1.filterFavorites('main course')).to.eql([recipeData[1]]);

  });

  it('Should be able to search favoriteRecipes by name or ingredient', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.findFavorites('egg')).to.eql([recipeData[0]]);
    expect(user1.findFavorites('Maple Dijon Apple Cider Grilled Pork Chops')).to.eql([recipeData[1]]);
  });

  it.only('Should be able to check ingredients in User\'s pantry for a given recipe', () => {
    expect(user1.checkPantry(recipeIngredients)).to.eql('You have the ingredients!');
  });

  it('Should inform User if they lack required ingredients for a given recipe', () => {
    expect(user1.checkPantry(recipeIngredients)).to.eql(missingIngredientsWithPrice);
  });
});
