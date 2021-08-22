/* PETICION AJAX */
var xhr = new XMLHttpRequest();
xhr.open('GET', 'nav-main.html');
xhr.setRequestHeader('Content-Type', 'text/plain');
xhr.send();
xhr.onload = function(data) {
    document.querySelector("#main-nav").innerHTML = data.currentTarget.response;
};
/* PETICION AJAX */