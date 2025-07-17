import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ticket: { type: String, required: true },
    type: { type: String, enum: ['buy', 'sell'], required: true},
    quantity: { type: Number, required: true },
    price: { type: Number, required: true},
    timestamp: { type: Date, default: Date.now },
    strategyId: { type: mongoose.Schema.Types.ObjectId, ref: "Strategy" },
    note: String
});

const Trade = mongoose.model('Trade', tradeSchema);

export default Trade;