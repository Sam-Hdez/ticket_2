import { sidebarTemplate } from './partitials/sidebar.js';

function loadPartitials() {
    const sidebarMain = document.getElementById('sidebar-main');
    if(sidebarMain !== null) sidebarMain.appendChild(sidebarTemplate);
}

loadPartitials();