import mongoose from 'mongoose';

const holdingSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        uppercase: true,
    },
    quantity: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    avgPrice: { 
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    }
},
{
    _id: false
});

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    name: {
        type: String, 
        required: true, 
        trim: true
    },
    cash: { 
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0
    },
    holdings: [holdingSchema]
},
{
    timestamps: true
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;