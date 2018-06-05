'use strict';

function loadData(url) {
  const functionName = 'functionName' + parseInt(Math.random() * 1000);
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function showRecipe(recipe) {
  document.querySelector('[data-pic]').style = `background-image: url(${recipe[0].pic})`;
  document.querySelector('[data-title]').textContent = recipe[0].title;
  document.querySelector('[data-ingredients]').textContent = recipe[0].ingredients.join(', ');

  document.querySelector('[data-rating]').textContent = recipe[1].rating.toFixed(2);
  document.querySelector('[data-star]').style = `width: ${recipe[1].rating * 10}%`;
  document.querySelector('[data-votes]').textContent = `(${recipe[1].votes} оценок)`;

  recipe[2].consumers.forEach(consumer => {
  	  const elem = document.createElement('img');
  	  elem.src = consumer.pic;
  	  elem.title = consumer.name;
  	  document.querySelector('[data-consumers]').appendChild(elem)
  });
  const moreConsumers = document.createElement('span');
  moreConsumers.textContent = `(+${recipe[2].total - recipe[2].consumers.length})`;
  document.querySelector('[data-consumers]').appendChild(moreConsumers);
}

Promise.all([loadData('https://neto-api.herokuapp.com/food/42'),
			loadData('https://neto-api.herokuapp.com/food/42/rating'),
			loadData('https://neto-api.herokuapp.com/food/42/consumers')
           ])
  .then(showRecipe)
  .catch(error => console.log(error));
