import Transaction from '../models/transaction.js';
import Portfolio from '../models/portfolio.js';
import MarketData from '../models/marketData.js';
import socketService from '../services/socketService.js';
import mongoose from 'mongoose';

export const createTransaction = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { portfolioId, type, symbol, quantity, price } = req.body;

        const portfolio = await Portfolio.findOne({
            _id: portfolioId, 
            userId: req.user._id
        }).session(session);

        if (!portfolio) {
            await session.abortTransaction();
            return res.status(404).json({ 
                success: false,
                error: 'Portfolio not found'
            });
        }

        const totalAmount = quantity * price;

        if (type === 'buy') {
            if(portfolio.cash < totalAmount){
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    error: 'Insufficient cash in portfolio'
                });
            }
            portfolio.cash -= totalAmount;

            const existingHolding = portfolio.holdings.find(h => h.symbol === symbol);
            if( existingHolding ) {
                const totalShares = parseFloat(existingHolding.quantity) + quantity;
                const totalCost = (existingHolding.quantity * existingHolding.avgPrice) + totalAmount;
                existingHolding.avgPrice = totalCost / totalShares;
                existingHolding.quantity = totalShares
            } else {
                portfolio.holdings.push({
                    symbol,
                    quantity,
                    avgPrice: price
                });
            }
        } else if (type === 'sell') {
            const existingHolding = portfolio.holdings.find(h => h.symbol === symbol);
            if (!existingHolding || existingHolding.quantity < quantity) {
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    error: 'Insufficient shares to sell'
                });
            }
            existingHolding.quantity -= quantity;
            portfolio.cash += totalAmount;

            if (existingHolding.quantity === 0) {
                portfolio.holdings = portfolio.holdings.filter(h => h.symbol !== symbol);
            }
        }

        const transaction = new Transaction({
            userId: req.user._id,
            portfolioId,
            type,
            symbol,
            quantity,
            price,
            executedAt: new Date()
        });

        await transaction.save({ session });
        await portfolio.save({ session });
        await session.commitTransaction();

        socketService.emitToUser(req.user._id, 'transaction_completed', {
            transaction: {
                id: transaction._id, 
                type: transaction.type,
                symbol: transaction.symbol,
                quantity: parseFloat(transaction.quantity),
                price: parseFloat(transaction.price),
                executedAt: transaction.executedAt,
            },
            portfolio: {
                id: portfolio._id,
                cash: parseFloat(portfolio.cash),
                totalValue: parseFloat(portfolio.cash) + portfolio.holdings.reduce((sum, h) => 
                    sum + parseFloat(h.quantity) * h.avgPrice, 0
                )
            }
        });

        socketService.emitToPortfolio(portfolio._id, 'new_transaction', {
            transaction: {
                type: transaction.type, 
                symbol: transaction.symbol,
                quantity: parseFloat(transaction.quantity),
                price: parseFloat(transaction.price)
            }
        });

        res.status(201).json({
            success: true,
            message: 'Transaction completed successfully',
            data: {transaction} 
        });
    } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const getTransactions = async (req, res, next) => {
    try {
        const { portfolioId } = req.query;
        const query = { userId: req.user._id };

        if (portfolioId) {
            query.portfolioId = portfolioId;
        }

        const transactions = await Transaction.find(query)
            .sort({ executedAt: -1})
            .limit(50);
        
        res.json({
            success: true,
            data: { transactions }
        });
    } catch (error) {
        next(error);
    }
};