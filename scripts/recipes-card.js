class RecipeCard {

  constructor(recipe) {
    this.recipe = recipe;
  }

  buildCard() {
    return `
    <div class="card mb-3">
      <div class="card-img"></div>
        <div class="card-body">
          <div class="card-header d-flex justify-content-between mb-3">
            <h5 class="lato-400">${this.recipe.name}</h5>
            <div class="duration-wrapper d-flex align-items-center">
              <i class="duration-icon fa-regular fa-clock mr-2"></i>
              <p class="card-duration lato-700">${this.recipe.time} min</p>
            </div>
          </div>
          <div class="card-text d-flex justify-content-between">
              <ul class="list-unstyled">
              ${this.recipe.ingredients.map(ingredient => `
                <li class="d-flex">
                  <p class="lato-400">
                    <span class="lato-700">${ingredient.ingredient} ${ingredient.quantity?":&nbsp":""}</span>
                    ${ingredient.quantity??""} ${ingredient.unit??""}
                  </p>
                </li>
              `).join("")}
              </ul>
            <p class="card-description roboto-400">${this.recipe.description}</p>
          </div>
      </div>
    </div>
    `
  }

}