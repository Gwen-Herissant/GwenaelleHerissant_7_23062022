const search = document.querySelector('.search-bar');

function mainSearch(recipes) {
  let results = [];

  results = recipes.filter(recipe => recipe.name.toLowerCase().includes(search.value.toLowerCase()) || recipe.description.toLowerCase().includes(search.value.toLowerCase()) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(search.value.toLowerCase())));

  return results;

}