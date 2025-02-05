const socket = io();
let gameState = null;
let timer = null;

function startGame() {
    socket.emit('start-game');
}

function updateMetrics(metrics) {
    document.getElementById('performance-bar').style.width = `${metrics.companyPerformance}%`;
    document.getElementById('satisfaction-bar').style.width = `${metrics.employeeSatisfaction}%`;
    document.getElementById('burnout-bar').style.width = `${metrics.burnoutMeter}%`;
}

function makeChoice(choice) {
    socket.emit('make-decision', choice);
}

function updateTimer(timeRemaining) {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer').textContent = 
        `Time Remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

socket.on('game-started', (state) => {
    gameState = state;
    updateMetrics(state.metrics);
});

socket.on('game-update', (result) => {
    updateMetrics(result.metrics);
    if (result.status !== 'ongoing') {
        endGame(result.status);
    }
});

socket.on('new-scenario', (scenario) => {
    document.getElementById('scenario-title').textContent = scenario.title;
    document.getElementById('scenario-description').textContent = scenario.description;
    
    const choiceButtons = document.getElementById('choice-buttons');
    choiceButtons.innerHTML = '';
    
    scenario.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'btn btn-primary choice-button';
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choice);
        choiceButtons.appendChild(button);
    });
});

// Start game when page loads
window.onload = startGame;