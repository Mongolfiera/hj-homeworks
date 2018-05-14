const todoList = document.querySelector('.list-block');
const todos = todoList.querySelectorAll('li input');
const output = todoList.querySelector('h3 output');
const todosLen = todos.length;
let counter = 0;

for (const todo of todos) {
  todo.addEventListener('click', updateCounter)
  if (todo.checked) counter++;
}
display();

function updateCounter() {	
  if (this.checked) {
    counter++
  } else {
    counter--;
  }
  display();
}

function display() {
  output.value = `${counter} из ${todosLen}`;
  if (counter === todosLen) {
  	todoList.classList.add('complete');
  } else {
  	todoList.classList.remove('complete');  	
  }
}
