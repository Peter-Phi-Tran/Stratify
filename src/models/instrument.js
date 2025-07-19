import mongoose from 'mongoose';

const instrumentSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['stock', 'crypto'],
        required: true
    },
    exchange: { 
        type: String,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    isActive: {
        type: Boolean, 
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true // Automatically add createdAt and updatedAt fields
})

const Instrument = mongoose.model('Instrument', instrumentSchema);

export default Instrument;