import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim();
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id: data.id, 'tokens.token': token});
        if(!user) {
            throw new Error('Not logged in.');
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send('Not authorized to access this resource.');
    }
}