let recipes = null;

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

    document.querySelector('.search-btn').addEventListener('click', () => {
      searchDisplay(recipes);
    });
    document.querySelector('.search-bar').addEventListener('keyup', () => {
      searchDisplay(recipes);
    });
    document.querySelectorAll('.combobox input, .combobox .fa-chevron-down').forEach(dropdown => {
      dropdown.addEventListener('click', (e) => {
        let combo = e.target.closest('.combobox');
        if (combo.classList.contains('combobox--open')) {
          closeCombobox(combo);
        } else {
          openCombobox(combo); 
        }
        
      })
    })

    displayRecipes(recipes);
}

init();


function searchDisplay(recipes) {
  if (search.value.length >= 3) {
    let results = mainSearch(recipes);
    //console.log(results);
    displayRecipes(results);
  } else if (search.value.length == 0) {
    displayRecipes(recipes);
  }
}