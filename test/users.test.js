const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/user';

describe("Rutas de usuario test usando EXPECT interface desde CHAI module ", function() {
    it("Devuelve un usuario creado con mensaje status", (done) => {
        chai.request(url)
            .post("/register")
            .send({
                email: "usuario@test.mx",
                nombre: "Usuario",
                apellidos: "Test",
                password: "12345678"
            })
            .end(function(err, res) {
                expect(res.body).to.have.property('status');
                expect(res).to.have.status(200);
                done();
            });
    });
    it("Devuelve un token que indica el inicio de sesion. El token permite realizar solicitudes", (done) => {
        chai.request(url)
            .post("/login")
            .send({
                email: "usuario@test.mx",
                password: "12345678"
            })
            .end(function(err, res) {
                expect(res.body).to.have.property('token');
                expect(res).to.have.status(200);
                done();
            });
    });
});