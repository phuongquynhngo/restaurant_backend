import db from "../models/index.js";
const  User  = db.user;
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
  
    if (!refreshToken) {
        return res.status(403).json({ message: "Refresh Token is required!" });
      }
    
      try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
          if (err) {
            return res.sendStatus(403); // Forbidden
          }
    
          const userId = decoded.id;
    
          // Create a new access token with user ID in the payload
          const newAccessToken = jwt.sign(
            { id: userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '300s' }
          );
    
        //   res.json({ accessToken });
          return res.status(200).json({
            accessToken: newAccessToken,
          });
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  };
  
  export default { handleRefreshToken };