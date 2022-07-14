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
  //const resultSection = document.querySelector('#results-section');
  
  recipes.forEach(recipe => {
    //console.log(recipe)
    new RecipeCard(recipe);
  });
};

async function init() {
    const { recipes } = await getRecipes();
    displayRecipes(recipes);
}

init();
