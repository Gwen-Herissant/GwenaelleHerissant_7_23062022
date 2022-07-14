async function getRecipes() {

  let response = await fetch('../data/recipes.json');
  let json;

  if(response.ok) {
    json = await response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }

  console.log(json.recipes);
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
    displayRecipes(recipes);
}

init();
