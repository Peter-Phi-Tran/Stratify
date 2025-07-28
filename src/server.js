import app from './app.js';
import { connectDB } from './config/db.js';
import { config } from './config/environment.js';

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
            console.log(`Environment: ${config.nodeEnv}`);
        });

        process.on('SIGTERM', () => {
            console.log('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                console.log('Process terminated');
            });
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();