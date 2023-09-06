import jwt from 'jsonwebtoken';
import db from "../models/index.js";
const User = db.user;
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  // let token = req.session.token; //token from session of HTTP request object

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              // Set the user ID in req for later use
              req.userId = decoded.id;
              next();
            });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(403).send({
        message: "User not found!",
      });
    }

    const roles = await user.getRoles();
    const isAdmin = roles.some((role) => role.name === "admin");

    if (isAdmin) {
      next(); // User has admin role
    } else {
      res.status(403).send({
        message: "Require Admin Role!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(403).send({
        message: "User not found!",
      });
    }

    const roles = await user.getRoles();
    const isModerator = roles.some((role) => role.name === "moderator");

    if (isModerator) {
      next(); // User has moderator role
    } else {
      res.status(403).send({
        message: "Require Moderator Role!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(403).send({
        message: "User not found!",
      });
    }

    const roles = await user.getRoles();
    const isModerator = roles.some((role) => role.name === "moderator");
    const isAdmin = roles.some((role) => role.name === "admin");

    if (isModerator || isAdmin) {
      next(); // User has moderator or admin role
    } else {
      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
export default authJwt;