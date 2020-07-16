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

    class: {
        type: String,
        trim: true,
        required: true
    },

    Travellers: {
        adults: {
            type: Number,
            required: true,
        },

        children: Number
    },

    price: {
        type: Number,
        required: true
    }
}, { collection: 'Flights', timestamps: true });

const Flight = mongoose.model('Flight', FlightSchema);

export default Flight;