(<HTMLButtonElement>document.querySelector('#Add')).addEventListener('click', () => {
    addTask();
});

function DeleteSelector() {
    (document.querySelectorAll('.deleteButton')).forEach((element) => {
        element.addEventListener('click', () => {
            deleteTask(<HTMLDivElement>element);
        });
    });
}

function addTask() {
    let input = (<HTMLInputElement>document.querySelector('#taskInput'));
    if (input.value === undefined || input.value === null || isEmptyOrSpaces(input.value) || input.value.length <= 0) {
        return;
    }

    let taskList = <HTMLDivElement>document.querySelector('#taskList');
    taskList.appendChild(createTask(input.value));

    input.value = '';
    DeleteSelector();
}

function createTask(str: string): HTMLDivElement {
    let p = document.createElement('p');
    p.textContent = str;
    let d = createDiv();
    d.prepend(p);
    return d;
}

function createDiv(): HTMLDivElement {
    let div = document.createElement('div');
    div.setAttribute('class', 'task');
    div.appendChild(deleteButton());
    return div;
}

function deleteButton(): HTMLDivElement {
    let but = document.createElement('div');
    but.setAttribute('class', 'deleteButton');
    return but;
}

function isEmptyOrSpaces(str: string): boolean {
    if (str.match(/^ *$/) !== null) {
        return true;
    }
    return false;
}

function deleteTask(div: HTMLDivElement) {
    div.parentElement?.remove();
}
