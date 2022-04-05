// Controller Object
const todoManager = {
    todos: [],
    addTodo(todo) {
        this.todos.push(todo);
        this.populateUI();
    },
    deleteTodo(id) {
        for (let x in this.todos) {
            if (this.todos[x].getId() == id) {
                this.todos.splice(x, 1);
            }
        }
        this.populateUI();
    },
    getTodo(id) {
        for (let x in this.todos) {
            if (this.todos[x].getId() == id) {
                return this.todos[x];
            }
        }
    },
    getTodoIndex(id) {
        this.getAllTodos.indexOf(this.getTodo(id));
    },
    getAllTodos() {
        return this.todos;
    },
    toggleComplete(todo) {
        console.log('Im here');
        todo.toggleComplete();
        this.populateUI();
    },
    clearUI() {
        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
        }
    },
    populateUI() {
        this.clearUI();
        this.todos.forEach((todo) => {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');

            const newTodo = document.createElement('li');
            newTodo.classList.add('todo-item');
            todoDiv.id = todo.getId();
            newTodo.innerText = todo.getText();
            todoDiv.appendChild(newTodo);

            const completeButton = document.createElement('button');
            completeButton.innerHTML = '<i class="fas fa-check"></i>';
            completeButton.classList.add('complete-btn');
            completeButton.addEventListener('click', handleComplete);
            todoDiv.appendChild(completeButton);

            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add('trash-btn');
            trashButton.addEventListener('click', handleDelete);
            todoDiv.appendChild(trashButton);
            todoList.appendChild(todoDiv);

            if (todo.isComplete()) {
                todoDiv.classList.toggle('completed');
            }

            filterOption.value =
                filterOption.value == 'incompleted' ? 'incompleted' : 'all';
            filterOption.dispatchEvent(new Event('change'));
        });
    },
};

// Todo Object Constructor
const Todo = (function () {
    let initialId = 0;
    return function Todo(todoText) {
        this.id = initialId++;
        this.text = todoText;
        this.complete = false;
    };
})();

// Prototype Methods
Todo.prototype.getText = function () {
    return this.text;
};
Todo.prototype.getId = function () {
    return this.id;
};
Todo.prototype.isComplete = function () {
    return this.complete;
};
Todo.prototype.toggleComplete = function () {
    this.complete = !this.complete;
};

// Selectors
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const submitButton = document.querySelector('.submit-button');
const filterOption = document.querySelector('.filter-todos');

// Event Handlers
const handleSubmit = (e) => {
    e.preventDefault();
    todoManager.addTodo(new Todo(todoInput.value));
    todoInput.value = '';
};

const handleDelete = (e) => {
    e.target.parentElement.classList.add('fall');
    e.target.parentElement.addEventListener('transitionend', () => {
        const id = e.target.parentElement.id;
        todoManager.deleteTodo(id);
    });
};

const handleComplete = (e) => {
    const id = e.target.parentElement.id;
    todoManager.toggleComplete(todoManager.getTodo(id));
};

const handleFilter = (e) => {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'incompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
};

// Local Storage Functions
// const saveLocal = (todo) => {
//     let todos;
//     if (localStorage.getItem('todos') === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem('todos'));
//     }
//     todos.push(todo);
//     localStorage.setItem('todos', JSON.stringify(todos));
// };

// const removeLocal = (id) => {
//     let todos;
//     if (localStorage.getItem('todos') === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem('todos'));
//     }
//     todoIndex = todoManager.getTodoIndex(id);
//     todos.splice(todoIndex, 1);
//     localStorage.setItem('todos', JSON.stringify(todos));
// };

// const fetchTodos = () => {
//     let todos;
//     if (localStorage.getItem('todos') === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem('todos'));
//     }
// };

// Event Listeners
// document.addEventListener('DOMContentLoaded', fetchTodos);
submitButton.addEventListener('click', handleSubmit);
filterOption.addEventListener('change', handleFilter);
