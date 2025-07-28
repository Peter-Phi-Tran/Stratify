import Portfolio from '../models/portfolio.js';
import MarketData from '../models/marketData.js';

export const createPortfolio = async (req, res, next) => {
    try {
        const { name, initialCash } = req.body;

        const portfolio = new Portfolio({
            userId: req.user._id,
            name,
            cash: initialCash || 10000 // Default to 10000 if not provided
        });

        await portfolio.save();

        res.status(201).json({
            success: true,
            message: 'Portfolio create successfully',
            data: { portfolio}
        });
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
};

export const getPortfolios = async (req, res, next) => {
    try {
        const portfolios = await Portfolio.find({ userId: req.user._id });

        res.json({
            success: true,
            data: { portfolios }
        });
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
};

export const getPortfolio = async (req, res, next) => {
    try { 
        const portfolio = await Portfolio.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                error: 'Portfolio not found'
            });
        }

        res.json({
            success: true,
            data: { portfolio }
        });
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
};

export const updatePortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                error: 'Portfolio not found'
            });
        }

        for (let holding of portfolio.holdings){
            const lastPrice = await MarketData.findOne({ symbol: holding.symbol })
                .sort({ timestamp: -1 })
                .limit(1);

            if(lastPrice){
                holding.currentPrice = lastPrice.close;
                holding.marketValue = holding.quantity * lastPrice.close;
                holding.unrealizedPnL = holding.marketValue - (holding.quantity * holding.avgPrice);
                holding.unrealizedPnLPercent = (holding.unrealizedPnL / (holding.quantity * holding.avgPrice)) * 100;
            }
        }

        const totalHoldingsValue = portfolio.holdings.reduce((sum, holding) => {
            return sum + parseFloat(holding.marketValue || 0);
        }, 0);  

        portfolio.totalValue = parseFloat(portfolio.cash) + totalHoldingsValue;

        await portfolio.save();

        res.json({
            success: true,
            data: { portfolio }
        });
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
};