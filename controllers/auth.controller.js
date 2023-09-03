import db from "../models/index.js";
const  User  = db.users;
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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

const handleLogin = async (req, res) => {
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
        // Create JWTs
        const accessToken = jwt.sign(
          { username: foundUser.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '120s' }
        );
        const refreshToken = jwt.sign(
          { username: foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );
  
        // Update the user's refreshToken in the database (invalidate when user logouts)
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
  
        // Set the refreshToken as an HTTP-only cookie
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
  
        res.json({ accessToken });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

export default { handleLogin };