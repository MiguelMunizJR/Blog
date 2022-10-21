//* Middleware para proteger rutas
//? 1.- Revisar si existe un token.
//? 2.- Verificar si el token pertenece a un usuario valido.
//? 3.- Modificar el req y agregar el req.user con la informacion desencriptada del token.

//TODO Estrategia: Diferentes maneras de hacer el login (google, facebook, github, etc).

const { jwtSecret } = require("../config");
const { getUserById } = require("../users/users.controller");
//? Passport maneja estrategias para las diferentes autenticaciones.
const JwtStrategy = require("passport-jwt").Strategy;
//? Extrae los headers de la peticion.
const ExtractJwt = require("passport-jwt").ExtractJwt;

//? Exportando funcion anonima:
module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: jwtSecret,
  };

  passport.use(
    new JwtStrategy(options, async (decoded, done) => {
      //? done(error, decoded)
      //* done() Acepta 2 params. 1params = error, 2params = decoded
      try {
        const response = await getUserById(decoded.id);
        if (!response) {
          return done(null, false);
        }
        console.log("decoded JWT", decoded);
        return done(null, decoded);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
