
class User {

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

    renderUsers = async (users, label) => {
        const usersLabel = document.getElementById(label);
        console.log(users.user_id);
        if(usersLabel) {
            for (const user of users) {
                const degreeData = await this.getDegreeInfo(user.user_id);
                console.log(degreeData);
                const cardLabel = document.createElement('div');
                cardLabel.className = 'col-lg-4';
                const card = `
                <div class="text-center card-box">
                  <div class="member-card pt-2 pb-2">
                    <div class="thumb-lg member-thumb mx-auto"><img src="${user.profile_photo || 'https://bootdey.com/img/Content/avatar/avatar2.png'}" class="rounded-circle img-thumbnail" alt="profile-image"></div>
                    <div class="">
                      <h4>${user.full_name}</h4>
                      <p class="text-muted">${degreeData.degree_name || ''} <span> </span><span>${degreeData.institute || ''}</span></p>
                    </div>
                    <ul class="social-links list-inline">
                      <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="${user.profile_linkedin || '#'}" data-original-title="Linkedin"><i class="fab fa-linkedin"></i></a></li>
                    </ul>
                    <a type="button" href="user.html?id=${user.user_id}" class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">Ver perfil</a>
                    <div class="mt-4">
                      <div class="row">
                        <div class="col-4">
                          <div class="mt-3">
                            <h4>2563</h4>
                            <p class="mb-0 text-muted">Wallets Balance</p>
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="mt-3">
                            <h4>6952</h4>
                            <p class="mb-0 text-muted">Income amounts</p>
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="mt-3">
                            <h4>1125</h4>
                            <p class="mb-0 text-muted">Total Transactions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `;
                cardLabel.innerHTML = card;
                usersLabel.appendChild(cardLabel);
            }
        }
    }

}

const updateUsers = async () => {
    const user = new User();
    const users = await user.getUsers();
    await user.renderUsers(users, 'usersCards');
    console.log(users);
}

updateUsers();