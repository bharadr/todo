function showDialog(id) {
    document.getElementById(id).style.display = 'block';
}

function closeDialog(id) {
    document.getElementById(id).style.display = 'none';
}

function storeDataLocally(list) {
    let obj = JSON.stringify(list);
    localStorage.setItem("data", obj);
}

function getDataLocally(list, backupElem) {
    console.log(localStorage.getItem("data"));
    if (!localStorage.getItem("data") || localStorage.getItem("data") === undefined || localStorage.getItem("data") === "undefined") {
        list.push(backupElem)
    } else {
        let retrievedObject = JSON.parse(localStorage.getItem("data"));
        if (retrievedObject.length <= 1 || retrievedObject === undefined) {
            list.push(backupElem)
        } else {
            list.splice(0, list.length, ...retrievedObject);
        }
    }
}


export {
    showDialog,
    closeDialog,
    getDataLocally,
    storeDataLocally,
}