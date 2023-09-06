import db from "../models/index.js";
const  User  = db.user;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// const handleLogin = async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
//     const foundUser = await User.findOne({ where: { username } });
//     if (!foundUser) return res.sendStatus(401); //Unauthorized 
//     // evaluate password 
//     const match = await bcrypt.compare(password, foundUser.password);
//     if (match) {
//         // create JWTs
//         res.json({ 'success': `User ${username} is logged in!` });
//     } else {
//         res.sendStatus(401);
//     }
// }

//controller function for signing in
export const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const foundUser = await User.findOne({ where: { username } });

    if (!foundUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (isPasswordValid) {
      // Retrieve user roles
      const userRoles = await foundUser.getRoles();

      // Construct authorities array
      const authorities = userRoles.map(role => `${role.name}`);

      // Create JWTs with user ID in the payload
      const accessToken = jwt.sign(
        { id: foundUser.id, username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '300s' }
      );
      
      const refreshToken = jwt.sign(
        { id: foundUser.id, username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      // req.session.token = accessToken;

      // Set the refreshToken as an HTTP-only cookie
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        roles: authorities,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//controller function for signing out
export const signOut = (req, res) => {
  res.clearCookie('jwt'); // Clear the access token cookie
  res.status(200).json({ message: 'Sign out successful' });
};
