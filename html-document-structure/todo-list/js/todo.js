'use strict';
const todo = document.querySelector('.todo-list');
const done = todo.querySelector('.done');
const undone = todo.querySelector('.undone');
const todoList = todo.querySelectorAll('label');

for (const todoItem of todoList) {
  todoItem.addEventListener('click', moveTodoItem);
}

function moveTodoItem() {
  const input = this.querySelector('input');
  if (input.checked) {
  	done.appendChild(this);
  } else {
  	undone.appendChild(this);
  }
}
