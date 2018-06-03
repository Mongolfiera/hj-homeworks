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
  document.querySelector('[data-pic]').style = `background-image: url(${recipe.pic})`;
  document.querySelector('[data-title]').textContent = recipe.title;
  document.querySelector('[data-ingredients]').textContent = recipe.ingredients.join(', ');  
  return `https://neto-api.herokuapp.com/food/42/rating`;
}

function showRating(rating) {
  document.querySelector('[data-rating]').textContent = rating.rating.toFixed(2);
  document.querySelector('[data-star]').style = `width: ${rating.rating * 10}%`;
  document.querySelector('[data-votes]').textContent = `(${rating.votes} оценок)`;
  return `https://neto-api.herokuapp.com/food/42/consumers`;  
}

function showConsumers(consumersList) {
  consumersList.consumers.forEach((consumer) => {
  	  const consumerElement = document.createElement('img');
  	  consumerElement.src = consumer.pic;
  	  consumerElement.title = consumer.name;
  	  document.querySelector('[data-consumers]').appendChild(consumerElement)
  })	
  const moreConsumers = document.createElement('span');
  moreConsumers.textContent = `(+${consumersList.total - consumersList.consumers.length})`;
  document.querySelector('[data-consumers]').appendChild(moreConsumers);
}

loadData('https://neto-api.herokuapp.com/food/42')
  .then(showRecipe)
  .then(loadData)
  .then(showRating)
  .then(loadData)
  .then(showConsumers)
  .catch(error => console.log(error));
