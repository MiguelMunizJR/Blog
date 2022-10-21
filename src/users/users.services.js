//? Dependencies
const usersController = require("./users.controller");

const getAllUsers = (req, res) => {
  usersController
    .getAllUsers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;

  usersController
    .getUserById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({
        message: err.message,
      });
    });
};

const registerUser = (req, res) => {
  const { firstName, lastName, email, password, phone, birthday } = req.body;

  if (firstName && lastName && email && password && phone && birthday) {
    usersController
      .createUser({
        firstName,
        lastName,
        email,
        password,
        phone,
        birthday,
      })
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  } else {
    res.status(400).json({
      message: "All fields must be completed",
      fields: {
        firstName: "string",
        lastName: "string",
        email: "string",
        password: "string",
        phone: +521212121212,
        birthday: "YYYY/MM/DD",
      },
    });
  }
};

const patchUser = (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, phone, gender, country } = req.body;

  usersController
    .updateUser(id, {
      firstName,
      lastName,
      phone,
      gender,
      country,
    })
    .then((response) => {
      if (response[0]) {
        res.status(200).json({
          message: `User with ID: ${id}, edited succesfully!`,
        });
      } else {
        res.status(404).json({
          message: "Invalid ID",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  usersController
    .deleteUser(id)
    .then((response) => {
      if (response) {
        res.status(204).json();
      } else {
        res.status(404).json({
          message: "Invalid ID",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

//TODO Mi user services:

const getMyUser = (req, res) => {
  //? req.user contiene la informacion del token desencriptado
  const id = req.user.id;

  usersController
    .getUserById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const patchMyUser = (req, res) => {
  const id = req.user.id;
  const { firstName, lastName, phone, gender, country } = req.body;

  usersController
    .updateUser(id, {
      firstName,
      lastName,
      phone,
      gender,
      country,
    })
    .then(() => {
      res.status(200).json({
        message: `User edited succesfully!`,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const deleteMyUser = (req, res) => {
  const id = req.user.id;

  usersController
    .updateUser(id, { status: "inactive" })
    .then(() => {
      res.status(200).json({
        message: `Your user was deleted succesfully!`,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  patchUser,
  deleteUser,
  getMyUser,
  patchMyUser,
  deleteMyUser,
};
