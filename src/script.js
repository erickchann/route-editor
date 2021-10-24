let main, app;

init();

function init() {
    initRouteEditor();
    initMain();
}

function initRouteEditor() {
    app = document.querySelector('#app');
}

function initMain() {
    main = new Main();
    main.init();
}

function id(id) {
    return document.getElementById(id);
}