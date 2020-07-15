import User from '../models/user.js';

export const get = async (req, res) => {
    console.log('get user info');
    try {
        const user = await User.findById(req.params.userId);
        if(!user) return res.status(404).send('User not found');
        res.status(200).send({ user });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const signup = async (req, res) => {
    console.log('signup user');
    try {
        let user = new User(req.body);
        user.url = user.username; // For now url will be same as username!
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if(!user) {
            return res.status(401).send('Check credentials');
        }
    
        const token = await user.generateAuthToken();
        res.status(200).send({ email: user.email, token });
    } catch (error) {
        res.status(400).send({ 
            email: error.message,
            password: error.message
        })
    }
}

export const me = async (req, res) => {
    // Middleware will check if there is logged user, and will add his info to req.user
    res.status(200).send(req.user);
}

export const logout = async (req, res) => {
    // Middleware will check if there is logged user, and will add his info to req.user
    try {
       req.user.tokens = req.user.tokens.filter((token) => {
           return token != req.token;
       }); 
       await req.user.save();
       res.status(200).send('Succesful logout.');
    } catch (error) {
        res.status(500).send(error.message);
    }
}