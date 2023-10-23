function store(source) {
    localStorage.setItem("tetris.username", source.value);
}

function read(source) {
    source.value = localStorage.getItem("tetris.username");
}

window.onload = ()=> {
    read(document.querySelector('input[name="username"]'));
};