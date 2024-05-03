import {showDialog, closeDialog, getDataLocally, storeDataLocally} from './utils';
import {defaultProject} from './project';


function displayTodos(project) {
    let boxElem = document.getElementById("todo-box");
    boxElem.innerHTML = '';
    for (let i = 0; i < project.taskList.length; i++) {
        let elem = createTodoElem(project, i);
        boxElem.appendChild(elem);
    }
}


function modifyDataObject(project) {
    let projectList = [];
    getDataLocally(projectList, defaultProject);
    for (let i = 0; i < projectList.length; i++) {
        if (projectList[i].title === project.title) {
            projectList[i] = project;
        }
    }
    storeDataLocally(projectList);
}

function createEditTodo(todo, project) {
    document.getElementById("editTodo").innerHTML = '';
    let editForm = document.createElement("form")
    editForm.id = 'editTodoForm';
    const h1 = document.createElement('h1');
    h1.textContent = 'Edit Todo:' + todo.title;

    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'edit-todoDescription');
    descriptionLabel.textContent = 'Description:';
    
    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.id = 'edit-todoDescription';
    descriptionTextarea.name = 'edit-todoDescription';
    descriptionTextarea.cols = 40;
    descriptionTextarea.rows = 5;
    descriptionTextarea.value = todo.description;

    const statusLabel = document.createElement('label');
    statusLabel.setAttribute('for', 'edit-status');
    statusLabel.textContent = 'Status:';
    
    const statusSelect = document.createElement('select');
    statusSelect.id = 'edit-status';
    ['Unassigned', 'In Progress', 'Completed'].forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      if (value === todo.status) option.selected = true;
      statusSelect.appendChild(option);
    });

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'edit-priority');
    priorityLabel.textContent = 'Priority:';
    
    const prioritySelect = document.createElement('select');
    prioritySelect.id = 'edit-priority';
    ['Low', 'Medium', 'High'].forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      if (value === todo.priority) option.selected = true;
      prioritySelect.appendChild(option);
    });
    

    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'edit-date');
    dateLabel.textContent = 'Date:';

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'edit-date';
    dateInput.name = 'date';
    dateInput.required = true;
    dateInput.value = todo.date;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();  // Prevent the form from submitting normally
        // Modify Todo
        let form = document.getElementById('editTodoForm');
        todo.description = form.elements['edit-todoDescription'].value
        todo.priority = form.elements['edit-priority'].value
        todo.status = form.elements['edit-status'].value
        todo.date = form.elements['edit-date'].value
        modifyDataObject(project);        
        closeDialog("editTodo");
        displayTodos(project);
        form.reset();
    })


    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.id = 'edit-todo-cancel-btn';
    cancelButton.textContent = 'Cancel';

    // Append elements to form
    editForm.appendChild(h1);
    editForm.appendChild(descriptionLabel);
    editForm.appendChild(descriptionTextarea);
    editForm.appendChild(statusLabel);
    editForm.appendChild(statusSelect);
    editForm.appendChild(priorityLabel);
    editForm.appendChild(prioritySelect);
    editForm.appendChild(dateLabel);
    editForm.appendChild(dateInput);
    editForm.appendChild(submitButton);
    editForm.appendChild(cancelButton);

    cancelButton.addEventListener("click", function() {
        closeDialog("editTodo");
    })
    document.getElementById("editTodo").appendChild(editForm);
}



function createFullTodoElem(todo) {
    document.getElementById("fullTodo").innerHTML = '';
    let todoElem = document.createElement("div")
    let title = document.createElement("p");
    title.innerText = "Task: " + todo.title;
    let date = document.createElement("p");
    date.innerText = "Date: " + todo.date.toString();
    todoElem.appendChild(title);
    todoElem.appendChild(date);
    let priority = document.createElement("p");
    priority.innerText = "Priority: " + todo.priority;
    let status = document.createElement("p");
    status.innerText = "Status: " + todo.status;
    let description = document.createElement("p");
    description.innerText = "Description: " + todo.description;
    let project = document.createElement("p");
    project.innerText = "Project: " + todo.project;
    let cancelBtn = document.createElement("button")
    cancelBtn.innerText = "Exit"
    todoElem.appendChild(priority);
    todoElem.appendChild(status);
    todoElem.appendChild(description);
    todoElem.appendChild(project);
    todoElem.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", function() {
        closeDialog("fullTodo");
    })
    document.getElementById("fullTodo").appendChild(todoElem);
}

function createTodoElem(project, index) {
    let todo = project.taskList[index];
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
    editBtn.addEventListener("click", function() {
        createEditTodo(todo, project);
        showDialog("editTodo");
    })
    viewBtn.addEventListener("click", function() {
        createFullTodoElem(todo);
        showDialog("fullTodo");
    })
    cancelBtn.addEventListener("click", function() {
        project.taskList.splice(index, 1);
        displayTodos(project);
    })
    todoElem.appendChild(viewBtn);
    todoElem.appendChild(editBtn);
    todoElem.appendChild(cancelBtn);
    return todoElem;
}

function createTodo(title, desc, date, priority, status, project="Unassigned") {
    return {
        title: title,
        description: desc,
        date: date,
        priority: priority,
        status: status,
        project: project,
    }
}

export {
    createTodo,
    createTodoElem,
    createFullTodoElem,
    displayTodos,
};