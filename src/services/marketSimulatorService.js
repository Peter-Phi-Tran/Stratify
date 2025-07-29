import MarketData from '../models/marketData.js';
import Instrument from '../models/instrument.js';
import socketService from './socketService.js';

class MarketSimulationService {
  constructor() {
    this.isRunning = false;
    this.intervals = new Map();
  }

  async startSimulation() {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log('Starting market data simulation...');
    const instruments = await Instrument.find({ isActive: true });
    instruments.forEach(instrument => {
      this.simulateInstrument(instrument.symbol);
    });
  }

  simulateInstrument(symbol) {
    const interval = setInterval(async () => {
      try {
        const lastData = await MarketData.findOne({ symbol })
          .sort({ timestamp: -1 })
          .limit(1);
        let basePrice = 100;
        if (lastData) {
          basePrice = parseFloat(lastData.close.toString());
        }
        const changePercent = (Math.random() - 0.5) * 4;
        const newPrice = basePrice * (1 + changePercent / 100);
        const marketData = new MarketData({
          symbol,
          timestamp: new Date(),
          open: basePrice,
          high: Math.max(basePrice, newPrice),
          low: Math.min(basePrice, newPrice),
          close: newPrice,
          volume: Math.floor(Math.random() * 1000000),
          timeframe: '1m'
        });
        await marketData.save();
        socketService.emitMarketData({
          symbol: marketData.symbol,
          close: marketData.close,
          timestamp: marketData.timestamp
        });
      } catch (error) {
        console.error(`Error simulating ${symbol}:`, error);
      }
    }, 5000);
    this.intervals.set(symbol, interval);
  }

  stopSimulation() {
    this.isRunning = false;
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    console.log('Market data simulation stopped');
  }
}

export default new MarketSimulationService();
