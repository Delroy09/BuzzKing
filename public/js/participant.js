const socket = io();

function register() {
    const name = document.getElementById('name').value;
    if (name.trim()) {
        socket.emit('register', name);
        document.getElementById('registration').style.display = 'none';
        document.getElementById('buzzer-section').style.display = 'block';
    }
}

function pressBuzzer() {
    const answer = document.getElementById('answer').value;
    socket.emit('buzzer', answer);
    document.getElementById('answer').value = '';
    document.getElementById('answer').disabled = true;
    setTimeout(() => {
        document.getElementById('answer').disabled = false;
    }, 5000); // 5 second cooldown
}