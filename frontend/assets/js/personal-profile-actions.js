window.onload = function() {
    document.getElementById('personal-info').classList.add('active');
    document.getElementById('content-personal-info').classList.add('personal-content-block');
};

function show_content(tab, content) {
    let tab_last = document.getElementById(document.getElementsByClassName('active')[0].id);
    let new_tab = document.getElementById(tab);
    let content_show = document.getElementById(content);
    let in_block = document.getElementById(document.getElementsByClassName('personal-content-block')[0].id);

    tab_last.classList.remove('active');
    tab_last.classList.add('gray');
    new_tab.classList.remove('gray');
    new_tab.classList.add('active');

    in_block.classList.remove('personal-content-block');
    in_block.classList.add('inicial');
    content_show.classList.remove('inicial');
    content_show.classList.add('personal-content-block');

    //if (content.style.display != 'block') {
    //inicio.style.display = 'block';
    //}
}