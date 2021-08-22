const protocol = 'http';
const domain = '127.0.0.1';
const host = `${protocol}://${domain}`;
const port = 3000;
const baseURL = `${host}:${port}/`;

class mainServices {
    async makeFech(uri, method_service = 'get', body_service, headers_service = {}) {
        try {
            console.log(body_service);
            let data;
            switch (method_service) {
                case 'get':
                    data = await fetch(`${baseURL}${uri}`, { method: method_service, headers: headers_service });
                    break;
                case 'post':
                    data = await fetch(`${baseURL}${uri}`, { method: method_service, headers: headers_service, body: JSON.stringify(body_service) });
                    break;
                case 'put':
                    data = await fetch(`${baseURL}${uri}`, { method: method_service, headers: headers_service, body: JSON.stringify(body_service) });
                    break;
                case 'delete':
                    data = await fetch(`${baseURL}${uri}`, { method: method_service, headers: headers_service, body: JSON.stringify(body_service) });
                    break;
                default:
                    data = await fetch(`${baseURL}${uri}`, { method: method_service, headers: headers_service });
                    break;
            }
            return data.json();
        } catch (e) {
            throw new Error(`Error al hacer fetch a ${baseURL}${uri}. \nERROR: ${e.message}`);
        }
    }
}

async function getData(uri, method, body, headers) {
    try {
        const service = new mainServices();
        return service.makeFech(uri, method, body, headers);
    } catch (e) {
        throw new Error(e.message);
    }
}

/* CERRAR SESIÓN */
function CerrarSession() {
    if (localStorage.getItem('userInSession')) {
        console.log('Cerrando sesion')
        localStorage.removeItem('userInSession')
        location.href = "index.html";
    } else {
        alert('No ha iniciado sesión');
    }
}
/* CERRAR SESIÓN */