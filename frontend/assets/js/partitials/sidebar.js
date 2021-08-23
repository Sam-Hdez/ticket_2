
const sidebarTemplate = document.createElement('aside');
sidebarTemplate.className = 'sidebar';
sidebarTemplate.innerHTML = `
<div class="toggle">
  <a href="#" class="burger js-menu-toggle" data-toggle="collapse" data-target="#main-navbar">
    <span></span>
  </a>
</div>
<div class="side-inner">
  <div class="profile">
    <img id="userImageSidebar" src="assets/img/user.jpg" alt="Imagen de Perfil" class="img-fluid">
    <h3 id="userNameSidebar" class="name">Debby Williams</h3>
    <span id="userEmailSidebar" class="country">New York, USA</span>
  </div>

  <div class="counter d-flex justify-content-center">
    <!-- <div class="row justify-content-center"> -->
    <div class="col">
      <strong class="number">892</strong>
      <span class="number-label">Posts</span>
    </div>
    <div class="col">
      <strong class="number">22.5k</strong>
      <span class="number-label">Followers</span>
    </div>
    <div class="col">
      <strong class="number">150</strong>
      <span class="number-label">Following</span>
    </div>
    <!-- </div> -->
  </div>

  <div class="nav-menu">
    <ul>
      <li class="activeItem"><a href="wall.html"><span class="icon-home me-3"></span>Wall</a></li>
      <li><a href="personal-profile.html"><span class="fa fa-user me-3"></span>Profile</a></li>
      <li><a href="users.html"><span class="icon-search2 me-3"></span>Search Users</a></li>
      <li><a href="enterprises.html"><span class="icon-search2 me-3"></span>Search Enterprises</a></li>
      <li><a href="javascript:CerrarSession()"><span class="icon-sign-out me-3"></span>Cerrar Sesión</a></li>
    </ul>
  </div>
</div>
`;

export {
    sidebarTemplate
}