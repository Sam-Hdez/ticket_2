class Login {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.token = "";
    }

    static async guardarUsuario(usuario) {
        localStorage.setItem("userInSession", JSON.stringify(usuario));
    }

    static async recuperarUsuario() {
        let user = await JSON.parse(localStorage.getItem("userInSession"));
        return user;
    }
}

async function login(email, password) {
    let usuario = { email: email, password: password };
    console.log(usuario)
    const apiCall = await getData(`user/login`, 'post', usuario, {
        "Accept": "*/*",
        "Content-type": 'application/json',
    });

    const response = await apiCall;

    if (response.token == undefined) {
        console.log('error');
        console.log(await response)
        throw new Error(response.message);
    }

    return response.token;
}

const ConfirmLogin = async() => {
    const token = await Login.recuperarUsuario();

    const apiCall = await getData(`user/checkSession`, 'get', {}, {
        "Accept": "*/*",
        "Content-type": 'application/json',
        "Authorization": `Bearer ${token}`
    });

    const response = await apiCall;

    return response;
}

async function validateForm(event) {
    try {
        event.preventDefault();
        document.getElementById('message-login').innerHTML = ''
        const email = document.getElementById('inputEmail').value;
        const pass = document.getElementById('inputPassword').value;

        console.log(email + pass);

        Login.guardarUsuario(new Login(email, pass));
        const resultado = await login(email, pass);

        console.log('Token generado en el login: ', resultado);
        Login.guardarUsuario(resultado);
        if (resultado) {
            location.href = "personal-profile.html";
        }
    } catch (error) {
        document.getElementById('message-login').innerHTML = `<div class="alert alert-warning alert-dismissible fade show text-sm-start" role="alert">` +
            `${error.message}` +
            `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>` +
            `</div>`;
    }
}

async function load() {
    //Durante el tiempo que el JWT este activo login redireccionará a index.
    console.log('Entrando durante ONLOAD');
    let status_session = await ConfirmLogin();
    if (status_session.status != undefined) {
        location.href = "personal-profile.html";
    }
}
window.onload = load;