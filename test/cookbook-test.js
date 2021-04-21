import {
  expect
} from 'chai';

import ingredientsData from '../src/data/ingredients';
import recipeData from '../src/data/recipes';
import Cookbook from '../src/cookbook';

let cookbook;

describe('Cookbook', () => {
  beforeEach(() => {
    cookbook = new Cookbook(recipeData, ingredientsData);
  });

  it('Should have an array of all recipes', () => {
    expect(cookbook.recipes).to.be.an('array');
  });

  it('Should be able to filter through its array by ingredients', () => {
    expect(cookbook.findRecipe('yolk').length).to.equal(2);
  });

  it('Should be able to filter through its array by name', () => {
    expect(cookbook.findRecipe('Rolo Cookie Bars').length).to.equal(1);
  });

  it.only('Should be able to filter by multiple tags', () => {
    expect(cookbook.filterByTags(['side dish', 'antipasti'])).to.deep.equal(['Baked Stuffed Artichokes'])
    expect(cookbook.filterByTags(['morning meal', 'brunch', 'breakfast'])).to.deep.equal(['Pumpkin Cheesecake Breakfast Smoothie'])
    expect(cookbook.filterByTags(['lunch', 'main course', 'main dish', 'dinner']).length).to.deep.equal(12)
  })
})
