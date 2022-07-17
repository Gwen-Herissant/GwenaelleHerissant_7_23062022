async function getRecipes() {

  let response = await fetch('../data/recipes.json');
  let json;

  if(response.ok) {
    json = await response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }

  return {
    recipes: json.recipes
  }

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
    const { recipes } = await getRecipes();

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
    let results = mainSearch(recipes);
    console.log(results);
    displayRecipes(results);
  } else if (search.value.length == 0) {
    displayRecipes(recipes);
  }
}