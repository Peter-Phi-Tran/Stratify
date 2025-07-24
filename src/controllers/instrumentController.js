import Instrument from '../models/instrument.js';

export const getInstruments = async (req, res, next) => {
  try {
    const { search, type, limit = 50 } = req.query;

    const query = { isActive: true };
    
    if (search) {
      query.$or = [
        { symbol: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    if (type) {
      query.type = type;
    }

    const instruments = await Instrument.find(query)
      .limit(parseInt(limit))
      .sort({ symbol: 1 });

    res.json({
      success: true,
      data: { instruments }
    });
  } catch (error) {
    next(error);
  }
};

export const getInstrument = async (req, res, next) => {
  try {
    const { symbol } = req.params;

    const instrument = await Instrument.findOne({ 
      symbol: symbol.toUpperCase(),
      isActive: true 
    });

    if (!instrument) {
      return res.status(404).json({
        success: false,
        error: 'Instrument not found'
      });
    }

    res.json({
      success: true,
      data: { instrument }
    });
  } catch (error) {
    next(error);
  }
};

export const createInstrument = async (req, res, next) => {
  try {
    const { symbol, name, type, exchange, currency } = req.body;

    const instrument = new Instrument({
      symbol: symbol.toUpperCase(),
      name,
      type,
      exchange: exchange.toUpperCase(),
      currency: currency || 'USD'
    });

    await instrument.save();

    res.status(201).json({
      success: true,
      message: 'Instrument created successfully',
      data: { instrument }
    });
  } catch (error) {
    next(error);
  }
};
