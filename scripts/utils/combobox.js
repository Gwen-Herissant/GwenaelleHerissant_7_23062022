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
  list.innerHTML = '';

  filteredElementList.forEach(element => {
   let option = document.createElement('span');
   option.innerHTML = element;
   list.appendChild(option);
  });

}

function openCombobox(element, filteredRecipes) {
  let list = element.querySelector('.list');

  let input = element.querySelector('.form-control');
  let placeholder = input.placeholder;
  input.placeholder = input.dataset.placeholder;
  input.dataset.placeholder = placeholder;
  element.classList.add('combobox--open');

  createDataList(filteredRecipes, element);
}

function closeCombobox(element) {
  let input = element.querySelector('.form-control');
  let placeholder = input.placeholder;
  input.placeholder = input.dataset.placeholder;
  input.dataset.placeholder = placeholder;
  element.classList.remove('combobox--open');
}


function initCombobox() {

  document.querySelectorAll('.combobox input, .combobox .fa-chevron-down').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      let combo = e.target.closest('.combobox');
      if (combo.classList.contains('combobox--open')) {
        if (e.target.classList.contains('fa-chevron-down')) {
          closeCombobox(combo);
        }
      } else {
        openCombobox(combo, filteredRecipes); 
      }
      
    })
  });

  document.querySelectorAll('.combobox input').forEach(input => {
    input.addEventListener('keyup', (e) => {
      let currentList = e.target.closest('.combobox').querySelectorAll('.list span');
      for (let element of currentList) {
        if (element.innerHTML.toLowerCase().includes(e.target.value.toLowerCase())) {
          element.classList.remove('hide');
        } else {
          element.classList.add('hide');
        }
      }
    })
  })

}

initCombobox();

//Combobox Search

const input = document.querySelectorAll('.form-control');

function comboboxSearch(element, filteredElementList) {
  let comboboxResults = [];
  for (let element of filteredElementList) {
    if (element.toLowerCase().includes(input.value.toLowerCase())) {
      comboboxResults.push(element);
    }
  }
}

