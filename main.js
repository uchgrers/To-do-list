const addTaskButton = document.getElementById('add-task-button');
const inputTask= document.getElementById('input-task');
const todosContainer = document.querySelector('.todos-container');

let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

let todoItemElements = [];

function TaskConstructor(taskText) {
    this.taskText = taskText;
    this.isChecked = false;
}

function createTemplate(task, index) {
    return `<div class="todo-instance">
                <input onclick="taskIsChecked(${index})" class="checkbox" type="checkbox" ${task.isChecked ? 'checked' : ''}>
                <span class="todo-text">${task.taskText}</span>
                <button onclick="deleteTask(${index})" class="delete-btn">Delete button</button>
            </div>`
}

function addTaskToPage() {
    todosContainer.innerHTML = '';
    if (taskList.length > 0) {
        taskList.forEach((item, index) => {
            todosContainer.innerHTML += createTemplate(item, index);
        });
        todoItemElements = document.querySelectorAll('.todo-instance');
    }
}

addTaskToPage();

function updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function taskIsChecked(index) {
    taskList[index].isChecked = !taskList[index].isChecked;
    if (taskList[index].isChecked) {
        todoItemElements[index].classList.add('checked');
    } else {
        todoItemElements[index].classList.remove('checked');
    }
    updateStorage();
    addTaskToPage();
}

addTaskButton.addEventListener('click', () => {
    taskList.push(new TaskConstructor(inputTask.value));
    updateStorage();
    addTaskToPage();
    inputTask.value = '';
})

function deleteTask(index) {
    taskList.splice(index, 1);
    updateStorage();
    addTaskToPage();
}

