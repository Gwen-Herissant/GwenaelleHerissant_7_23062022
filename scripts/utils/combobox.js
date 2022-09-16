let tagList = [];

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

  let list = element.querySelector('.list');
  list.innerHTML = '';

  filteredElementList.forEach(element => {
   let option = document.createElement('span');
   option.innerHTML = element;
   list.appendChild(option);
  });

}

function openCombobox(element, filteredRecipes) {

  document.querySelectorAll('.combobox').forEach(combobox => {
    combobox.classList.remove('combobox--open');
  })

  let input = element.querySelector('.form-control');
  let placeholder = input.placeholder;
  input.placeholder = input.dataset.placeholder;
  input.dataset.placeholder = placeholder;
  element.classList.add('combobox--open');

  createDataList(filteredRecipes, element);

  // if (search.value.length === 0) {
  //   createDataList(recipes, element);
  // }

  document.querySelectorAll('.combobox .list span').forEach(span => {
    span.addEventListener('click', (e) => {
      addTag(e.target);
      closeCombobox(element);
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
   let tag = `
    <div class="single-tag d-flex align-items-center rounded mr-2 mb-2" data-type="${element.closest('.combobox').dataset.type}"  data-value="${element.innerHTML}">
      <p class="tag-text lato-700 text-white">${element.innerHTML}</p>
      <button class="btn tag-btn mb-1"><i class="close-icon text-white fa-regular fa-circle-xmark"></i></button>
    </div>
  `;
  
  document.querySelector('.tags').innerHTML += tag;
  tagList.push({type:element.closest('.combobox').dataset.type, value:element.innerHTML});

  filterByTags(filteredRecipes);
  displayRecipes(filteredRecipes);

  document.querySelectorAll('.single-tag .tag-btn').forEach(tagBtn => tagBtn.addEventListener('click', (e) => {
    removeTag(e.target.closest('.single-tag'));
  }));
}

function filterByTags() {

  tagList.forEach(tag => {
    if(tag.type === 'ingrédients') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient == tag.value));
    } else if (tag.type === 'appareils') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.appliance == tag.value);
    } else if (tag.type === 'ustensiles') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.ustensils.some(ustensil => ustensil == tag.value));
    }
  })

}

function removeTag(element) {
  let tagElement = {type: element.dataset.type, value: element.dataset.value};
  tagList = tagList.filter(t => t.type != tagElement.type || t.value != tagElement.value);

  element.remove();
  
  filteredRecipes = mainSearch(recipes);
  filterByTags();
  displayRecipes(filteredRecipes);
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

