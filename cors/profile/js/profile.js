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

function showProfile(profile) {
  document.querySelector('[data-pic]').src = profile.pic;
  document.querySelector('[data-name]').textContent = profile.name;
  document.querySelector('[data-description]').textContent = profile.description;  
  document.querySelector('[data-position]').textContent = profile.position;
  document.querySelector('.content').style = 'displey: initial';
  return `https://neto-api.herokuapp.com/profile/${profile.id}/technologies`;
}

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(showProfile)
  .then(loadData)
  .then((result) => result.forEach((tech) => {
  	const elem = document.createElement('span');
    elem.className = `devicons devicons-${tech}`;
    document.querySelector('.badgescard').appendChild(elem);
  }))
  .catch(error => console.log(error));
