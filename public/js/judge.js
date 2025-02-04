const socket = io();

socket.on('buzzer-press', (data) => {
    const answersDiv = document.getElementById('answers');
    const time = new Date(data.timestamp).toLocaleTimeString();
    
    const answerHtml = `
        <div class="alert alert-info">
            <strong>${data.name}</strong> buzzed at ${time}<br>
            Answer: ${data.answer}
        </div>
    `;
    
    answersDiv.innerHTML = answerHtml + answersDiv.innerHTML;
});