
function findProjectByName(name) {
    for (let i = 0; i < PROJECT_LIST.length; i++) {
        let proj = PROJECT_LIST[i];
        if (proj.title === name) {
            return proj;
        }
    }
    return defaultProject;
}


function createProject(title) {
    return {
        title: title,
        taskList: [],
    }
}

export {
    createProject,
};