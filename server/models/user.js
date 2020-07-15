import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const Schema = mongoose.Schema;

export const UserSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
            required: true,
            validate: value => {
                if(!validator.isEmail(value)) {
                    throw new Error({error: 'Invalid email adress'});
                }
            }
        },

        password: {
            type: String,
            required: true,
            minlength: 8 
        },

        passwordUpdated: {
            type: Date,
            default: Date.now
        },

        tokens: [{
            token: {
                type: String
            }
        }],

        username: {
            type: String,
            trim: true,
            index: true,
            unique: true,
            required: true
        },

        fullName: {
            type: String,
            trim: true,
            required: true
        },

        dateOfBirth: {
            day: {
                type: Number,
                trim: true,
                required: true
            },
            month: {
                type: String,
                trim: true,
                required: true
            },
            year: {
                type: Number,
                trim: true,
                required: true
            }
        },

        url: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },

        contact: {
            streetAddress: {
                type: String,
                trim: true,
                required: true
            },

            city: {
                type: String,
                trim: true,
                required: true
            },

            postalCode: {
                type: String,
                trim: true,
                required: true
            },

            country: {
                type: String,
                trim: true,
                required: true
            },

            phone: {
                type: String,
                trim: true,
                required: true
            }
        }
    },
    { collection: 'users', timestamps: true }
);

UserSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }
    next();
});

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({id: user._id}, process.env.JWT_KEY, {expiresIn: '2 days'});
    user.tokens.push({ token });
    await user.save();
    return token;
}

UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  }
  

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    
    if(!user) {
        throw new Error('Incorrect email or password.');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
        throw new Error('Incorrect email or password.');
    }
    
    return user;
}

const User = mongoose.model('User', UserSchema)

export default User;