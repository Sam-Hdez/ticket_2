
class Registro {
    constructor(nombres, apellidos, email, password){
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
    }

    static async guardarUsuario(usuario) {
        localStorage.setItem("userInSession", JSON.stringify(usuario));
    }
}

const registerUser = async (event) => {
    console.log("Registrando usuario");
    event.preventDefault();
    const nombres = document.getElementById('inputName').value;
    const apellidos = document.getElementById('inputLastName').value;
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPass').value;
    console.log(nombres, apellidos, email, password);
    await Registro.guardarUsuario(new Registro(nombres, apellidos, email, password));
    const resultado = await register(nombres, apellidos, email, password);
    console.log('Token generado en el registro: ', resultado);

}

async function register(nombres, apellidos, email, password) {
    let usuario = {nombre: nombres, apellidos: apellidos, email: email, password: password};
    console.log(usuario)
    const apiCall = await getData(`user/register`, 'post', usuario, {
        "Accept": "*/*",
        "Content-type": 'application/json',
    });
    console.log(apiCall);

    if (apiCall.token == undefined) {
        console.log('error');
        console.log(await apiCall)
        throw new Error(apiCall.message);
    }

    return apiCall.token;
}