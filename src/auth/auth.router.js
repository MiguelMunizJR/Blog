//* Auth va a contener las rutas de autenticacion y autorizacion.
//? Login
//? Register
//? Recovery password
//? Verify User

const router = require("express").Router();
const { registerUser } = require("../users/users.services");
const authServices = require("./auth.services");

//* Prefijo
//TODO /api/v1/auth

//? Ruta de register
router.post("/register", registerUser);

//? Ruta de login
router.post("/login", authServices.login);

module.exports = router;
