import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

export const FlightSchema = new Schema({
    airline: {
        type: String,
        trim: true,
        index: true,
        required: true
    },

    returnAirline: {
        type: String,
        trim: true,
    },

    departure: {
        type: Date,
        required: true
    },

    arrival: {
        type: Date,
        required: true
    },

    return: Date,

    returnArrival: Date,

    stops: [{
        location: String,
        arrival: Date,
        departure: Date
    }],

    returnStops: [{
        location: String,
        arrival: Date,
        departure: Date
    }],

    availableSeats: {
        economy: Number,
        premiumEconomy: Number,
        business: Number,
        first: Number,
        required: true
    },
    
    seats: {
        economy: Number,
        premiumEconomy: Number,
        business: Number,
        first: Number,
        required: true
    },

    Travellers: {

        registeredAdults: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        adults: [{
            fullName: {
                type: String,
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
            country: {
                type: String,
                required: true
            },
            passportNumber: {
                type: String,
                required: true
            }
        }],

        children: [{
            fullName: {
                type: String,
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
            country: {
                type: String,
                required: true
            },
            passportNumber: {
                type: String,
                required: true
            }
        }],

        numberOfAdults: {
            type: Number,
            required: true,
        },

        numberOfChildren: Number
    },

    price: {
        type: Number,
        required: true
    }
}, { collection: 'Flights', timestamps: true });



const Flight = mongoose.model('Flight', FlightSchema);

export default Flight;