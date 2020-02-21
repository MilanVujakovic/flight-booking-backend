import User from '../models/user';

export const get = async (req, res) => {
    console.log('get user info');
    try {
        const user = await User.findById(req.params.userId);
        if(!user) return res.status(404).send({ error: 'User not found' });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const register = async (req, res) => {
    console.log('register user');
    try {
        let user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({token});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const login = async (req, res) => {
    console.log('user login');
    try {
        const {email, password} = req.body;
        const user = await User.findByCredentials(email, password);
        if(!user) {
            return res.status(401).send({ error: 'Check credentials' });
        }
        const token = await user.generateAuthToken();
        res.status(200).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
}

export const me = async (req, res) => {
    // Middleware will check if there is logged user, and will add his info to req.user
    res.send(req.user);
}

export const logout = async (req, res) => {
    // Middleware will check if there is logged user, and will add his info to req.user
    try {
       req.user.tokens = req.user.tokens.filter((token) => {
           return token != req.token;
       }); 
       await req.user.save();
       res.send();
    } catch (error) {
        res.status(500).send(error);
    }
}