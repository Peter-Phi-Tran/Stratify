import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Portfolio",
        required: true
    },
    type: {
        type: String,
        enum: ['buy', 'sell'],
        required: true
    },
    symbol: {
        type: String, 
        required: true, 
        uppercase: true
    },
    quantity: {
        type: mongoose.Schema.Types.Decimal128, 
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128, 
        required: true
    },
    executedAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;