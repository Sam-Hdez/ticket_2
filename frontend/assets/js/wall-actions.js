window.onload = function() {
    document.getElementById('rate-skills').classList.add('active');
    document.getElementById('content-wall-skills').classList.add('wall-content-block');
};

function show_wall(tab, content) {
    let tab_last = document.getElementById(document.getElementsByClassName('active')[0].id);
    let new_tab = document.getElementById(tab);
    let content_show = document.getElementById(content);
    let in_block = document.getElementById(document.getElementsByClassName('wall-content-block')[0].id);

    tab_last.classList.remove('active');
    tab_last.classList.add('gray');
    new_tab.classList.remove('gray');
    new_tab.classList.add('active');

    in_block.classList.remove('wall-content-block');
    in_block.classList.add('inicial');
    content_show.classList.remove('inicial');
    content_show.classList.add('wall-content-block');

    //if (content.style.display != 'block') {
    //inicio.style.display = 'block';
    //}
}