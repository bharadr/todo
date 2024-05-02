import './styles.css';
import {createProject} from './project';
import {createTodo} from './todo';

import Trash from './trash.png';


const DEFAULT_PROJECT = 'Unassigned'
let defaultProject = createProject(DEFAULT_PROJECT);
let PROJECT_LIST = [defaultProject]

let todoBtn = document.getElementById('todo-btn');
todoBtn.addEventListener('click', function(){
    showDialog("todo-dialog");
})

let todoCancelBtn = document.getElementById('todo-cancel-btn');
todoCancelBtn.addEventListener('click', function(){
    closeDialog("todo-dialog");
})

document.getElementById('todoForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting normally
    let project = findProjectByName(this.elements['todo-project'].value)
    let todo = createTodo(this.elements['todoTitle'].value,
        this.elements['todoDescription'].value,
        this.elements['date'].value,
        this.elements['priority'].value,
        this.elements['status'].value,
        project,
    )
    project.taskList.push(todo);
    console.log(project);
    closeDialog("todo-dialog");
    displayTodos(project);
    this.reset();
});

function findProjectByName(name) {
    for (let i = 0; i < PROJECT_LIST.length; i++) {
        let proj = PROJECT_LIST[i];
        if (proj.title === name) {
            return proj;
        }
    }
    return defaultProject;
}

let projectBtn = document.getElementById('project-btn');
projectBtn.addEventListener('click', function(){
    showDialog("project-dialog");
})

let projectCancelBtn = document.getElementById('project-cancel-btn');
projectCancelBtn.addEventListener('click', function(){
    closeDialog("project-dialog");
})

document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting normally
    submitProject();
    closeDialog("project-dialog");
    this.reset();
});


function showDialog(id) {
    document.getElementById(id).style.display = 'block';
}

function closeDialog(id) {
    document.getElementById(id).style.display = 'none';
}

function deleteProject(index) {
    return function() {
        PROJECT_LIST.splice(index, 1);
        renderProjectList();
        renderProjectOptions();
    };
}

function enterProject(index) {
    return function() {
        console.log("HEY");
        let project = PROJECT_LIST[index];
        console.log(project);
        displayTodos(project);
    };
}


function renderProjectBox(index) {

    let projectBox = document.createElement("div")
    projectBox.className = "project-entry"
    let projectButton = document.createElement("button");
    let title = PROJECT_LIST[index].title;
    projectButton.innerText = title;
    projectBox.appendChild(projectButton);
    projectButton.addEventListener("click", enterProject(index));
    if (title !== DEFAULT_PROJECT) {
        let deleteButton = document.createElement("button");
        let img = new Image();
        img.src = Trash;
        deleteButton.appendChild(img);
        projectBox.appendChild(deleteButton);
        deleteButton.addEventListener("click", deleteProject(index));
    }
    return projectBox;
}

function createOptionElem(title) {
    let option = document.createElement("option")
    option.value = title;
    option.innerText = title;
    if (title === DEFAULT_PROJECT) {
        option.selected = true;
    }
    return option;
}


function createTodoElem(todo) {
    let todoElem = document.createElement("div")
    todoElem.className = 'todo'
    let title = document.createElement("p");
    title.innerText = "Task: " + todo.title;
    let date = document.createElement("p");
    date.innerText = "Date: " + todo.date.toString();
    todoElem.appendChild(title);
    todoElem.appendChild(date);
    let viewBtn = document.createElement("button")
    let editBtn = document.createElement("button")
    let cancelBtn = document.createElement("button")
    viewBtn.innerText = "View"
    editBtn.innerText = "Edit"
    cancelBtn.innerText = "Delete"
    todoElem.appendChild(viewBtn);
    todoElem.appendChild(editBtn);
    todoElem.appendChild(cancelBtn);
    return todoElem;
}


function renderProjectList() {
    let section = document.getElementById("project-list");
    section.innerHTML = "";
    for (let i = 0; i < PROJECT_LIST.length; i++) {
        let projectBox = renderProjectBox(i);
        section.appendChild(projectBox);
    }
}

function renderProjectOptions() {
    let select = document.getElementById("todo-project");
    select.innerHTML = "";
    for (let i = 0; i < PROJECT_LIST.length; i++) {
        let title = PROJECT_LIST[i].title;
        let option = createOptionElem(title);
        select.appendChild(option);
    }
}


function submitProject() {
    const projectName = document.getElementById('projectName').value;
    let proj = createProject(projectName);
    PROJECT_LIST.push(proj);
    renderProjectList();
    renderProjectOptions();
}

function displayTodos(project) {
    let boxElem = document.getElementById("todo-box");
    boxElem.innerHTML = '';
    for (let i = 0; i < project.taskList.length; i++) {
        console.log("HEYA");
        let todo = project.taskList[i];
        let elem = createTodoElem(todo);
        boxElem.appendChild(elem);
    }
}

renderProjectList();
renderProjectOptions();
displayTodos(defaultProject);
