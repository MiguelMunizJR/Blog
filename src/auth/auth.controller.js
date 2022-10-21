//* Email y contraseña del usuario
//? El email es unico en mi base de datos

const { getUserByEmail } = require("../users/users.controller");
const { comparePass } = require("../utils/crypto");

const loginUser = async (email, password) => {
  //TODO: Este controlador tiene 2 posibles respuestas
  //* 1. Las credenciales son validas y retornamos el usuario.
  //* 2. Las credenciales son invalidas y retornamos FALSE.

  try {
    const user = await getUserByEmail(email);
    //? 'user.password' contiene la contraseña encriptada de mi base de datos.
    const verifyPass = comparePass(password, user.password);
    if (verifyPass) {
      return user;
    }
      return false;
  } catch (err) {
    return false;
  }
};

module.exports = {
  loginUser,
};
