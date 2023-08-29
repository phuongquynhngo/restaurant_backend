import db from "../models/index.js";
const  Category  = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Category
export const createCategory = (req, res) => {
   // Validate request
   if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Category
  const category = {
    name: req.body.name,
    image: req.body.image
  };

  // Save Category in the database
  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
  
};

// Retrieve all Categories from the database.
export const getAllCategories = (req, res) => {
  
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Category.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categories."
      });
    });
  
};

// Retrieve all Categories from the database  with server-side pagination
// export const getAllCategories = (req, res) => {
//   const { page = 1, pageSize = 10, name } = req.query;
//   const limit = parseInt(pageSize);
//   const offset = (parseInt(page) - 1) * limit;
  
//   var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

//   Category.findAndCountAll({
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
//         categories: data.rows,
//       };
//       res.send(response);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Categories."
//       });
//     });
  
// };

// Find a single Category with an id
export const getCategoryByID = (req, res) => {
  
  const id = req.params.id;

  Category.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Category with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + id
      });
    });
  
};

// Update a Category by the id in the request
export const updateCategory = (req, res) => {
  
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + id
      });
    });
  
};

// Delete a Category with the specified id in the request
export const deleteCategory = (req, res) => {
  
  const id = req.params.id;

  Category.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
  
};

// Delete all Categories from the database.
export const deleteAllCategories = (req, res) => {
  
  Category.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Categories were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Categories."
      });
    });
  
};

