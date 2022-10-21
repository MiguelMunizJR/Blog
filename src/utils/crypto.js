const bcrypt = require("bcrypt");

const hashPass = (plainPass) => bcrypt.hashSync(plainPass, 10);

//* Comparar si la contraseña plana es igual a la encriptada.
const comparePass = (plainPass, hashedPass) => {
  //! Esta utilidad se usa cuando hacemos un login y recibimos la contraseña para posteriormente compararla.
  return bcrypt.compareSync(plainPass, hashedPass);
};

module.exports = {
  hashPass,
  comparePass,
};
