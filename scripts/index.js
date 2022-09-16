let recipes = null;
let filteredRecipes = null;

async function getRecipes() {

  let response = await fetch('../data/recipes.json');
  let json;

  if(response.ok) {
    json = await response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }

  return json.recipes

}


async function displayRecipes(recipes) {
  let DOMcard = '';
  recipes.forEach(recipe => {
    let card = new RecipeCard(recipe);
    DOMcard += card.buildCard();
  });
  document.querySelector('#results-section').innerHTML = DOMcard;
};

async function init() {
    recipes = await getRecipes();

    filteredRecipes = JSON.parse(JSON.stringify(recipes));

    document.querySelector('.search-btn').addEventListener('click', () => {
      searchDisplay(recipes);
    });
    document.querySelector('.search-bar').addEventListener('keyup', () => {
      searchDisplay(recipes);
    });
    

    displayRecipes(recipes);
}

init();


function searchDisplay(recipes) {
  if (search.value.length >= 3) {
    filteredRecipes = mainSearch(recipes);
    filterByTags();
    displayRecipes(filteredRecipes);
    if(filteredRecipes.length === 0) {
      document.querySelector('#results-section').innerHTML = "<p class='no-results dmsans-700'>Aucun résultat ne correspond à vôtre recherche.<p/>";
    }
  } else if (search.value.length == 0) {
    filteredRecipes = recipes;
    filterByTags();
    displayRecipes(filteredRecipes);
  }
}