const search = document.querySelector('.search-bar');

function mainSearch(recipes) {
  let results = [];

  recipes.forEach(recipe => {
    if (recipe.name.toLowerCase().includes(search.value.toLowerCase())) {
      results.push(recipe);
    } else if (recipe.description.toLowerCase().includes(search.value.toLowerCase())) {
      results.push(recipe);
    } else if (recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(search.value.toLowerCase()))) {
      results.push(recipe);
    }
  })

  return results;

}