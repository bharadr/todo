function showDialog(id) {
    document.getElementById(id).style.display = 'block';
}

function closeDialog(id) {
    document.getElementById(id).style.display = 'none';
}

export {
    showDialog,
    closeDialog,
}