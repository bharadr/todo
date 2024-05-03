import Trash from './trash.png';
import {displayTodos} from './todo';

const DEFAULT_PROJECT_NAME = 'Unassigned'
let defaultProject = createProject(DEFAULT_PROJECT_NAME);

function renderProjectBox(list, index) {
    let projectBox = document.createElement("div")
    projectBox.className = "project-entry"
    let projectButton = document.createElement("button");
    let title = list[index].title;
    projectButton.innerText = title;
    projectBox.appendChild(projectButton);
    projectButton.addEventListener("click", enterProject(list, index));
    if (title !== DEFAULT_PROJECT_NAME) {
        let deleteButton = document.createElement("button");
        let img = new Image();
        img.src = Trash;
        deleteButton.appendChild(img);
        projectBox.appendChild(deleteButton);
        deleteButton.addEventListener("click", deleteProject(list, index));
    }
    return projectBox;
}

function renderProjectList(list) {
    let section = document.getElementById("project-list");
    section.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        let projectBox = renderProjectBox(list, i);
        section.appendChild(projectBox);
    }
}

function renderProjectOptions(list) {
    let select = document.getElementById("todo-project");
    select.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        let title = list[i].title;
        let option = createOptionElem(title);
        select.appendChild(option);
    }
}

function createOptionElem(title) {
    let option = document.createElement("option")
    option.value = title;
    option.innerText = title;
    if (title === DEFAULT_PROJECT_NAME) {
        option.selected = true;
    }
    return option;
}

function deleteProject(list, index) {
    return function() {
        list.splice(index, 1);
        renderProjectList(list);
        renderProjectOptions(list);
    };
}

function enterProject(list, index) {
    return function() {
        let project = list[index];
        displayTodos(project);
    };
}

function findProjectByName(name, list) {
    for (let i = 0; i < list.length; i++) {
        let proj = list[i];
        if (proj.title === name) {
            return proj;
        }
    }
    return undefined;
}

function createProject(title) {
    return {
        title: title,
        taskList: [],
    }
}

export {
    createProject,
    findProjectByName,
    enterProject,
    deleteProject,
    DEFAULT_PROJECT_NAME,
    renderProjectOptions,
    renderProjectList,
    defaultProject,
};