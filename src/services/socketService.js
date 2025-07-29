import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { config } from '../config/environment.js';

class SocketService {
    constructor() {
        this.io = null;
        this.connectedUsers = new Map();
    }

    initialize(server) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:3000',
                methods: ['GET', 'POST'],
                credentials: true
            },
            transports: ['websocket', 'polling']
        });

        this.io.use(async (socket, next) => {
            try {
                const token = socket.handshake.auth.token;

                if(!token){
                    return next(new Error('Authentication error: no token provided'));
                }

                const decoded = jwt.verify(token, config.jwt.accessSecret);
                const user = await User.findById(decoded.userId).select('-passwordHash');

                if(!user) {
                    return next(new Error('Authentication error: user not found'));
                }

                socket.userId = user._id.toString();
                socket.user = user;
                next();
            }  catch (err) {
                next(new Error('Authentication error: Invalid Token'));
            }
        });

        this.setupEventHandlers();
        console.log('Socket.IO server initialized');
    }

    setupEventHandlers() {
        this.io.on('connection', (socket) => {
            console.log(`User connected: ${socket.user.username}`);

            this.connectedUsers.set(socket.userId, {
                socketId: socket.id,
                user: socket.user
            });

            socket.join(`user:${socket.userId}`);

            socket.join('market_data'); 

            this.handlePortfolioSubscription(socket);
            this.handleMarketDataSubscription(socket);
            this.handleDisconnection(socket);

            socket.emit('connected', {
                message: 'You are connected to the socket server',
                userId: socket.userId
            });
        });
    }

    handlePortfolioSubscription(socket) {
        socket.on('subscribe_portfolio', (portfolioId) => {
            socket.join(`portfolio:${portfolioId}`);
            console.log(`User ${socket.user.username} subscribed to portfolio ${portfolioId}`);
        });

        socket.on('unsubscribe_portfolio', (portfolioId) => {
            socket.leave(`portfolio:${portfolioId}`);
            console.log(`User ${socket.user.username} unsubscribed from portfolio ${portfolioId}`);
        });
    }

    handleMarketDataSubscription(socket) {
        socket.on('subscribe_symbol', (symbol) => {
            socket.join(`symbol:${symbol.toUpperCase()}`);
            console.log(`User ${socket.user.username} subscribed to symbol ${symbol}`);
        });

        socket.on('unsubscribe_symbol', (symbol) => {
        socket.leave(`symbol:${symbol.toUpperCase()}`);
        console.log(`User ${socket.user.username} unsubscribed from ${symbol}`);
        });
    }

    handleDisconnection(socket) {
        socket.on('disconnect', (reason) => {
            console.log(`User disconnected: ${socket.user.username}, reason: ${reason}`);
            this.connectedUsers.delete(socket.userId);
        });
    }

    emitToUser(userId, event, data) {
        this.io.to(`user:${userId}`).emit(event, data);
    }

    emitToPortfolio(portfolioId, event, data) {
        this.io.to(`portfolio:${portfolioId}`).emit(event, data);
    }

    emitToSymbol(symbol, event, data) {
        this.io.to(`symbol:${symbol.toUpperCase()}`).emit(event, data);
    }

    emitToAll(event, data) {
        this.io.emit(event, data);
    }

    emitMarketData(marketData) {
        this.io.to('market_data').emit('market_update', marketData);
        this.emitToSymbol(marketData.symbol, 'price_update', {
            symbol: marketData.symbol,
            price: parseFloat(marketData.close.toString()),
            timestamp: marketData.timestamp
        });
    }

    getConnectedUsers() {
        return Array.from(this.connectedUsers.values());
    }
}

export default new SocketService();