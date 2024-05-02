

function createTodo(title, desc, date, priority, status, project="None") {
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
};