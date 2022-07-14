class RecipeCard {

  constructor(recipe) {
    this.element = this.buildCard(recipe);
    this.name = recipe.name;
    this.time = recipe.time;
    this.description = recipe.descrition;
  }

  buildCard(recipe) {
    const resultSection = document.querySelector('#results-section');
    const recipeCard = document.createElement('div');
    recipeCard.setAttribute('class', 'card mb-3');
    resultSection.appendChild(recipeCard);
    recipeCard.innerHTML = `
      <div class="card-img"></div>
        <div class="card-body">
          <div class="card-header d-flex justify-content-between mb-3">
            <h5 class="lato-400">${recipe.name}</h5>
            <div class="duration-wrapper d-flex align-items-center">
              <i class="duration-icon fa-regular fa-clock mr-2"></i>
              <p class="card-duration lato-700">${recipe.time} min</p>
            </div>
          </div>
          <div class="card-text d-flex justify-content-between">
            <p class="roboto-400" style="width: 171px;">${recipe.description}</p>
          </div>
      </div>
    `

    return recipeCard;
  }

}

