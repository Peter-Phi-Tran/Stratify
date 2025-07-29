import express from 'express';
import { authenticate } from '../middleware/auth.js';
import socketService from '../services/socketService.js';
import marketSimulation from '../services/marketSimulatorService.js';

const router = express.Router();

router.get('/connected-users', authenticate, (req, res) => {
    const users = socketService.getConnectedUsers();
    res.json({
        success: true,
        data: {
            count: users.length,
            users: users.map(u => ({
                id: u.user._id,
                username: u.user.username
            }))
        }
    });
});

// Start market simulation (admin only)
router.post('/start-simulation', authenticate, async (req, res) => {
  try {
    await marketSimulation.startSimulation();
    res.json({
      success: true,
      message: 'Market simulation started'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Stop market simulation (admin only)
router.post('/stop-simulation', authenticate, (req, res) => {
  marketSimulation.stopSimulation();
  res.json({
    success: true,
    message: 'Market simulation stopped'
  });
});

export default router;