import db from "../models/index.js";
const  User  = db.user;
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
  
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden
        // the refresh token is valid, issue a new access token
        const accessToken = jwt.sign(
          { id: foundUser.id, username: foundUser.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '300s' }
        );
        res.json({ accessToken });
      }
    );
  };
export default { handleRefreshToken }