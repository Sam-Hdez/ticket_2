
class Profile {
    getUserInfo = async (id) => {
        try {
            const bearer = this.getBearer();
            const apiCall = await getData(`user/profile/${id}`, 'get', null, {
                Authorization: `Bearer ${bearer}`
            });
            if(apiCall?.error) throw new Error(apiCall.error);
            return apiCall.data;
        } catch (e) {
            alert('Error al cargar los datos del usuario. ' + e.message);
        }
    }

    getDegreeInfo = async (id) => {
        try {
            const bearer = this.getBearer();
            const apiCall = await getData(`degree/user/${id}`, 'get', null, {
                Authorization: `Bearer ${bearer}`
            });
            return apiCall;
        } catch (e) {
            alert('Error al cargar los estudios del usuario. ' + e.message);
        }
    }

    getUsers = async () => {
        try {
            const bearer = this.getBearer();
            const apiCall = await getData(`user/list-users`, 'get', null, {
                Authorization: `Bearer ${bearer}`
            });
            return apiCall.data;
        } catch (e) {
            alert('Error los usuarios recomendados. ' + e.message);
        }
    }

    getBearer = () => {
        const bearer = JSON.parse(localStorage.getItem('userInSession'));
        if(bearer) return bearer;
        throw new Error('Error al obtener el bearer. ¿Has iniciado sesión?');
    }

    renderName = (name, label) => {
        const nameLabel = document.getElementById(label);
        if(nameLabel) nameLabel.textContent = name;
    }

    renderPhoto = (url, label) => {
        const photoLabel = document.getElementById(label);
        if(photoLabel && url !== null) {
            photoLabel.src = url;
        }
    }

    renderInstitute = (institute, label) => {
        const degreeLabel = document.getElementById(label);
        if(degreeLabel) {
            degreeLabel.innerHTML = `<i class="fas fa-graduation-cap me-2"></i>${institute || 'No registrado'}`;
        }
    }

    renderAddress = (city, label) => {
        const cityLabel = document.getElementById(label);
        if(cityLabel){
            cityLabel.innerHTML = `<i class="fas fa-map-marker-alt me-2"></i>${city || 'No registrado'}`;
        }
    }

    renderUsers = (users, label) => {
        const usersLabel = document.getElementById(label);
        if(usersLabel){
            users.forEach(user => {
                const cardLabel = document.createElement('div');
                cardLabel.className = 'card mb-3';
                const card = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img
                            class="img-fluid rounded-start"
                            src="${ user.profile_photo || 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80'}"
                            alt="foto de perfil">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h6 class="card-title">${user.full_name}</h6>
                            <a href="user.html?id=${user.user_id}" class="btn btn-primary" >Ver perfil</a>
                        </div>
                    </div>
                </div>
                `;
                cardLabel.innerHTML = card;
                usersLabel.appendChild(cardLabel);
            });
        }
    }

    renderInfo = (userInfo, label) => {
        const userInfoLabel = document.getElementById(label);
        if(userInfoLabel) {
            console.log(userInfo);
            userInfoLabel.innerHTML = `
            <p class="font-italic mb-0">Biografía: ${ userInfo.job_resume || 'Sin asignar'}</p>
            <p class="font-italic mb-0">Email: ${ userInfo.email || 'Sin asignar'}</p>
            <p class="font-italic mb-0">Nombre: ${ userInfo.full_name || 'Sin asignar'}</p>
            <p class="font-italic mb-0">Edad: ${ userInfo.age || 'Sin asignar'}</p>
            <p class="font-italic mb-0"><a href="${userInfo.profile_linkedin || '#'}">Linkedin</a></p>
            `;
        }
    }
}

const updateProfile = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    if(id){
        const profile = new Profile();
        const userData = await profile.getUserInfo(id);
        const degreeData = await profile.getDegreeInfo(id);
        console.log(userData);
        profile.renderName(`${userData.personal_info.first_name} ${userData.personal_info.last_name}`, 'userName');
        profile.renderPhoto(userData.personal_info.profile_photo, 'userPhoto');
        profile.renderInstitute(degreeData.institute, 'userInstitute');
        profile.renderAddress(userData.addresses_info.city, 'userCity');
        profile.renderInfo(userData.personal_info, 'userInfo');
    }
}

updateProfile();