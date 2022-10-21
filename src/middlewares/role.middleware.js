const adminValidate = (req, res, next) => {
  const role = req.user.role;

  //? Si el rol es "admin" nos da paso a la siguiente funcion.
  if (role === "admin") {
    return next();
  } else {
    res.status(401).json({
      message: "Access Denied!",
    });
  }
};

const TeacherValidate = (req, res, next) => {
  const role = req.user.role;

  //? Si el rol es "admin" o "teaacher" nos da paso a la siguiente funcion.
  if (role === "admin" || role === "teacher") {
    return next();
  } else {
    res.status(401).json({
      message: "Access Denied!",
    });
  }
};

module.exports = adminValidate;
