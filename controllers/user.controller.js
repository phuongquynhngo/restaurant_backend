import db from "../models/index.js";
const  User  = db.users;

// Create and Save a new User
export const createUser = (req, res) => {
  const { name, email, username, password } = req.body;

   // Validate request
   if (!name || !email || !username || !password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    name,
    email,
    username,
    password
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
  
};

// Retrieve all users from the database.
export const getAllUsers = (req, res) => {
  
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
  
};

// Retrieve all Users from the database  with server-side pagination
// export const getAllUsers = (req, res) => {
//   const { page = 1, pageSize = 10, name } = req.query;
//   const limit = parseInt(pageSize);
//   const offset = (parseInt(page) - 1) * limit;
  
//   var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

//   User.findAndCountAll({
//     where: condition,
//     limit,
//     offset,
//   })
//     .then(data => {
//       const totalPages = Math.ceil(data.count / limit);
//       const response = {
//         totalItems: data.count,
//         totalPages,
//         currentPage: parseInt(page),
//         users: data.rows,
//       };
//       res.send(response);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       });
//     });
  
// };

// Find a single User with an id
export const getUserByID = (req, res) => {
  
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
  
};

// Update a User by the id in the request
export const updateUser = (req, res) => {
  
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
  
};

// Delete a User with the specified id in the request
export const deleteUser = (req, res) => {
  
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
  
};

// Delete all Users from the database.
export const deleteAllUsers = (req, res) => {
  
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
  
};

