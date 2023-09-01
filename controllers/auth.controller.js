import db from "../models/index.js";
const  User  = db.users;
import bcrypt from 'bcrypt';

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({ where: { username } });
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        res.json({ 'success': `User ${username} is logged in!` });
    } else {
        res.sendStatus(401);
    }
}

export default { handleLogin };