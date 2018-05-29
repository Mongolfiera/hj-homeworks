'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector(".comments");
  const commentNodes = list.map(createComment);
  const fragment = commentNodes.reduce((fragment, currentValue) => {
    fragment.appendChild(currentValue);
    return fragment;
  }, document.createDocumentFragment());

  commentsContainer.appendChild(fragment);

}

function createComment(comment) {
  const commentWrap = createElem('div', {class: 'comment-wrap'}, '');

  const photo = createElem('div', {class: 'photo', title: comment.author.name}, [
                  createElem('div', {class: 'avatar', style: `background-image: url(${comment.author.pic})`}, '') 
                ]);

  const commentBlock = createElem('div', {class: 'comment-block'}, [
                        createElem('p', {class: 'comment-text'}, [
                          createElem('pre', '', comment.text)]),  
                        createElem('div', {class: 'bottom-comment'}, [
                          createElem('div', {class: 'comment-date'}, `${new Date(comment.date).toLocaleString('ru-Ru')}`),  
                          createElem('ul', {class: 'comment-actions'}, [ 
                            createElem('li', {class: 'complain'}, 'Пожаловаться'),
                            createElem('li', {class: 'reply'}, 'Ответить')
                          ])
                        ])
                      ]);

  commentWrap.appendChild(photo);
  commentWrap.appendChild(commentBlock);

  return commentWrap;
}

function createElem(tagName, attributes, children) {
  const element = document.createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
  }
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
