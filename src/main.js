const container = document.querySelector('.container');
const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.modal-form');
const presentation = document.querySelector('.presentation');
const presentationContent = document.querySelector('.present-content p');
const relationButtonGroup = document.querySelector('.btn-group');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

let wrappers;

let app;

init();

function init() {
    app = new App();
}

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    modalForm.innerHTML = '';
}

function updateContentValue(i, value) {
    app.nodes[i].content = value;
}

function updateRelationValue(i, j, value) { 
    app.nodes[i].relations[j].text = value;
}

function openPresentation() {
    presentation.style.display = 'flex';

    if (app.display.relations.length >= 1) {
        app.display.relations.forEach(val => {
            relationButtonGroup.innerHTML += `<button type="button" onclick="changeDisplay(${val.node})">${val.text}</button>`;
        });
    }

    presentationContent.innerHTML = app.display.content;
}

function changeDisplay(node) {
    app.display = app.nodes[node];
    presentationContent.innerHTML = '';
    relationButtonGroup.innerHTML = '';
    
    openPresentation();
}

function closePresentation() {
    app.display = app.nodes[0];
    presentation.style.display = 'none';
    
    presentationContent.innerHTML = '';
    relationButtonGroup.innerHTML = '';
}