//selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// function to get back data from localstorage
const getToDos = () => {
  console.log("hello");
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(todo => {
    //todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //check mark todoButton
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash todoButton
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });
}

// function save local Storage with Arrow Function
const saveLocalToDos = todo => {
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

//function  remove data from local Storage

const removeLocalTodos = todo => {
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // console.log(todo.children[0]);
  const todoIndex = todo.children[0].innerText; // to get position object 0 at attribute
  todos.splice(todos.indexOf(todoIndex), 1);
  //                                     | number one its means how many do u want to remove object
  localStorage.setItem("todos", JSON.stringify(todos));
}

//event listeners and functions
  document.addEventListener("DOMContentLoaded", getToDos);
  // add functions
  todoButton.addEventListener("click", event => {
    //prevent formform submiting
    event.preventDefault();
    //todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to localstrorage
    saveLocalToDos(todoInput.value);
    //check mark todoButton
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash todoButton
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";
  });
    // delete functions
    todoList.addEventListener('click', e => {
      const item = e.target;
      // delete
      if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () => todo.remove());
      }
      // check mark
      if(item.classList[0] === "complete-btn"){
        const todo =  item.parentElement;
        todo.classList.toggle('completed')
      }
    });

    // filterOption
    filterOption.addEventListener('click', e => {
      const todos = todoList.childNodes;
      todos.forEach( todo => {
        if(e.target.value){
          if(e.target.value === "all"){
            todo.style.display = "flex";
          }else if(e.target.value === "completed"){
            if(todo.classList.contains("completed")){
              todo.style.display = "flex";
            }else{
              todo.style.display = "none";
            }
          }else{
            if(e.target.value === "uncompleted"){
              if(!todo.classList.contains("completed")){
                todo.style.display = "flex";
              }else{
                todo.style.display = "none";
              }
            }
          }
        }
      })
    });
