import './styles.css';
import {createProject, findProjectByName, defaultProject, renderProjectOptions, renderProjectList} from './project';
import {createTodo, displayTodos} from './todo';
import {showDialog, closeDialog, getDataLocally, storeDataLocally} from './utils';


let PROJECT_LIST = []

getDataLocally(PROJECT_LIST, defaultProject);
storeDataLocally(PROJECT_LIST);



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
    let project = findProjectByName(this.elements['todo-project'].value, PROJECT_LIST)
    if (project === undefined) {
        project = defaultProject;
    }
    let todo = createTodo(this.elements['todoTitle'].value,
        this.elements['todoDescription'].value,
        this.elements['date'].value,
        this.elements['priority'].value,
        this.elements['status'].value,
        project.title,
    )
    project.taskList.push(todo);
    storeDataLocally(PROJECT_LIST);
    closeDialog("todo-dialog");
    displayTodos(project);
    this.reset();
});

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
    const projectName = document.getElementById('projectName').value;
    let proj = createProject(projectName);
    PROJECT_LIST.push(proj);
    renderProjectList(PROJECT_LIST);
    renderProjectOptions(PROJECT_LIST);
    closeDialog("project-dialog");
    storeDataLocally(PROJECT_LIST);
    this.reset();
});

renderProjectList(PROJECT_LIST);
renderProjectOptions(PROJECT_LIST);
displayTodos(defaultProject);
