const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const scenarios = require('./public/js/scenarios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

class GameState {
    constructor() {
        this.metrics = {
            companyPerformance: 50,
            employeeSatisfaction: 50,
            burnoutMeter: 50
        };
        this.timeRemaining = 3600; // 1 hour in seconds
        this.currentScenario = null;
        this.gameOver = false;
    }

    updateMetrics(impacts) {
        for (const [metric, value] of Object.entries(impacts)) {
            this.metrics[metric] = Math.max(0, Math.min(100, this.metrics[metric] + value));
        }
        return this.checkGameStatus();
    }

    checkGameStatus() {
        const failed = Object.values(this.metrics).some(value => value < 20);
        const excellent = Object.values(this.metrics).every(value => value >= 70);
        
        if (failed) {
            this.gameOver = true;
            return { status: 'failed', metrics: this.metrics };
        }
        if (excellent) {
            this.gameOver = true;
            return { status: 'excellent', metrics: this.metrics };
        }
        return { status: 'ongoing', metrics: this.metrics };
    }
}

const games = new Map();

io.on('connection', (socket) => {
    socket.on('start-game', () => {
        const game = new GameState();
        games.set(socket.id, game);
        socket.emit('game-started', game);
        sendNewScenario(socket, game);
    });

    socket.on('make-decision', (decision) => {
        const game = games.get(socket.id);
        if (game && !game.gameOver) {
            const result = game.updateMetrics(decision.impacts);
            socket.emit('game-update', result);
            if (result.status === 'ongoing') {
                sendNewScenario(socket, game);
            }
        }
    });

    socket.on('disconnect', () => {
        games.delete(socket.id);
    });
});

function sendNewScenario(socket, game) {
    const scenarioTypes = ['operational', 'crisis', 'personal'];
    const randomType = scenarioTypes[Math.floor(Math.random() * scenarioTypes.length)];
    const randomScenario = scenarios[randomType][Math.floor(Math.random() * scenarios[randomType].length)];
    game.currentScenario = randomScenario;
    socket.emit('new-scenario', randomScenario);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));