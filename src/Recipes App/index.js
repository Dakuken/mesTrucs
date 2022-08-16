"use strict";
document.querySelector('#Add').addEventListener('click', () => {
    addTask();
});
function DeleteSelector() {
    (document.querySelectorAll('.deleteButton')).forEach((element) => {
        element.addEventListener('click', () => {
            deleteTask(element);
        });
    });
}
function addTask() {
    let input = document.querySelector('#taskInput');
    if (input.value === undefined || input.value === null || isEmptyOrSpaces(input.value) || input.value.length <= 0) {
        return;
    }
    let taskList = document.querySelector('#taskList');
    taskList.appendChild(createTask(input.value));
    input.value = '';
    DeleteSelector();
}
function createTask(str) {
    let p = document.createElement('p');
    p.textContent = str;
    let d = createDiv();
    d.prepend(p);
    return d;
}
function createDiv() {
    let div = document.createElement('div');
    div.setAttribute('class', 'task');
    div.appendChild(deleteButton());
    return div;
}
function deleteButton() {
    let but = document.createElement('div');
    but.setAttribute('class', 'deleteButton');
    return but;
}
function isEmptyOrSpaces(str) {
    if (str.match(/^ *$/) !== null) {
        return true;
    }
    return false;
}
function deleteTask(div) {
    div.parentElement?.remove();
}
