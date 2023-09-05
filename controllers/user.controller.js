import db from "../models/index.js";
const  User  = db.user;
const Role = db.role;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// // Create and Save a new User
// export const createUser = (req, res) => {
//   const { name, email, username, password } = req.body;

//    // Validate request
//    if (!name || !email || !username || !password) {
//     res.status(400).send({
//       message: "Infos are required!"
//     });
//     return;

//   // Create a User
//   const user = {
//     name,
//     email,
//     username,
//     password
//   };

//   // Save User in the database
//   User.create(user)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the User."
//       });
//     });
  
// };

export const createUser = async (req, res) => {
  const { name, email, username, password, roles } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: 'Name, email, username, and password are required.' });
  }

  try {
    // Check for duplicate username and email in the database
    const isDuplicateUsername = await checkForDuplicateUsername(username);
    const isDuplicateEmail = await checkForDuplicateEmail(email);

    if (isDuplicateUsername) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    if (isDuplicateEmail) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    // Encrypt the password: hash and salt passwords with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a User object
    const user = {
      name,
      email,
      username,
      password: hashedPassword,
    };

    // logic to save the user
    const newUser = await saveUserToDatabase(user);

    // Check if roles are provided, otherwise assign the default role with ID 1
    if (!roles || roles.length === 0) {
      const defaultRole = await Role.findOne({ where: { id: 1 } });
      if (defaultRole) {
        console.log('Before addRoles default');
        await newUser.addRoles([defaultRole]);
        console.log('After addRoles default'); // Use addRoles to associate with multiple roles
      } else {
        console.error('Default role with ID 1 not found in the database.');
        // Handle this error as needed, such as sending an error response.
      }
    } else {
      const foundRoles = await Role.findAll({
        where: {
          name: roles,
        },
      });
    
      if (foundRoles.length > 0) {
        console.log('Before addRoles foundRoles');
        await newUser.addRoles(foundRoles); // Use addRoles to associate with multiple roles
        console.log('After addRoles foundRoles');
      } else {
        console.error('Roles not found in the database.');
        // Handle this error as needed, such as sending an error response.
      }
    }
    // Respond with a success message
    res.status(201).json({ message: `New user ${username} created!` });
  } catch (err) {
    console.error(err);
    // Handle the database query error here.
    res.status(500).json({ message: 'Internal Server Error' });
  };
};

async function checkForDuplicateUsername(username) {
    const user = await User.findOne({ where: { username } });
    return !!user; // Returns true if a duplicate is found, false otherwise
  };

async function checkForDuplicateEmail(email) {
    const user = await User.findOne({ where: { email } });
    return !!user; // Returns true if a duplicate is found, false otherwise
  };
  
async function saveUserToDatabase(user) {
  try {
    const newUser = await User.create(user);
    console.log('User created successfully:', newUser.toJSON());
    debugger; // Add a debugger statement
    return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };
  

// Retrieve all users from the database.
// export const getAllUsers = (req, res) => {
  
//   const name = req.query.name;
//   var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

//   User.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       });
//     });
  
// };

//Retrieve all Users from the database  with server-side pagination
export const getAllUsers = (req, res) => {
  const { page = 1, pageSize = 10, name } = req.query;
  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;
  
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAndCountAll({
    where: condition,
    limit,
    offset,
  })
    .then(data => {
      const totalPages = Math.ceil(data.count / limit);
      const response = {
        totalItems: data.count,
        totalPages,
        currentPage: parseInt(page),
        users: data.rows,
      };
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
  
};

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

