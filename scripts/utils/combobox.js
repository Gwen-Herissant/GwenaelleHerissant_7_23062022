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

  document.querySelectorAll('.combobox').forEach(combobox => {
    combobox.classList.remove('combobox--open');
  })

  let input = element.querySelector('.form-control');
  let placeholder = input.placeholder;
  input.placeholder = input.dataset.placeholder;
  input.dataset.placeholder = placeholder;
  element.classList.add('combobox--open');

  createDataList(filteredRecipes, element);

  document.querySelectorAll('.combobox .list span').forEach(span => {
  span.addEventListener('click', (e) => {
    addTag(e.target);
  });
  })
}

function closeCombobox(element) {
  let input = element.querySelector('.form-control');
  let placeholder = input.placeholder;
  input.placeholder = input.dataset.placeholder;
  input.dataset.placeholder = placeholder;
  element.classList.remove('combobox--open');
}

function addTag(element) {
  document.querySelector('.tags').innerHTML += `
    <div class="single-tag d-flex align-items-center rounded mr-2 mb-2" data-type="${element.closest('.combobox').dataset.type}">
      <p class="tag-text lato-700 text-white">${element.innerHTML}</p>
      <button class="btn tag-btn mb-1"><i class="close-icon text-white fa-regular fa-circle-xmark"></i></button>
    </div>
  `;
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

  document.addEventListener('click', (e) => {
    if(!e.target.classList.contains('.combobox') && e.target.closest('.combobox') == null) {
      document.querySelectorAll('.combobox').forEach(combobox => {
        combobox.classList.remove('combobox--open');
      })
    }
  })

}

initCombobox();

