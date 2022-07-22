function createDataList(recipes, element) {

  let elementList = [];
  for(let recipe of recipes) {
    switch(element.dataset.type) {
      case 'ingrédients':
        let ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient);
        elementList = elementList.concat(ingredients);
      break;

      case 'appareils':
        let appliances = recipe.appliance;
        elementList = elementList.concat(appliances);
      break;

      case 'ustensiles':
        let ustensils = recipe.ustensils;
        elementList = elementList.concat(ustensils);
      break;
    }
  } 

  let filteredElementList = [...new Set(elementList)];
  //console.log(filteredElementList);

  let list = element.querySelector('.list');

  filteredElementList.forEach(element => {
   let option = document.createElement('span');
   option.innerHTML = element;
   option.value = element;
   list.appendChild(option);
  });

  list.classList.add('has-list');
}

function openCombobox(element) {
  let list = element.querySelector('.list');

  let input = element.querySelector('.form-control');
  let placeholder = input.placeholder;
  input.placeholder = input.dataset.placeholder;
  input.dataset.placeholder = placeholder;
  element.classList.add('combobox--open');

  if(!list.classList.contains('has-list')) {
    createDataList(recipes, element);
  }
  
}

function closeCombobox(element) {
  let input = element.querySelector('.form-control');
  let placeholder = input.placeholder;
  input.placeholder = input.dataset.placeholder;
  input.dataset.placeholder = placeholder;
  element.classList.remove('combobox--open');
}