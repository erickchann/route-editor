const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const container = document.querySelector('.container');

canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

let wrappers;

let app;

init();

function init() {
    app = new App();
}