'use strict';
const tabs = document.getElementById('tabs');
const tabsContent = tabs.querySelector('.tabs-content');
const tabsNav = tabs.querySelector('.tabs-nav');
const articles = tabsContent.children;
const tab = tabsNav.firstElementChild;

for (const article of articles) {
  const newTab = tab.cloneNode(true);
  newTab.querySelector('a').textContent = article.dataset.tabTitle;
  newTab.querySelector('a').className = `fa ${article.dataset.tabIcon}`;
  tabsNav.appendChild(newTab);
  article.classList.add('hidden');
}

tabsNav.removeChild(tab);
const tabsList = tabsNav.children;
tabsList[0].classList.add('ui-tabs-active');
articles[0].classList.remove('hidden');

for (const tab of tabsList) {
  tab.addEventListener('click', openArticle);
}

function openArticle() {
  for (const tab of tabsList) {
  	tab.classList.remove('ui-tabs-active');
  }
  for (const article of articles) {
  	article.classList.add('hidden');
  	if (article.dataset.tabTitle === this.textContent) {
  	  article.classList.remove('hidden');
  	}
  }
  this.classList.add('ui-tabs-active');
}
