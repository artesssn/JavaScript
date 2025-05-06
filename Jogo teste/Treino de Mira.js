const circle = document.getElementById('circle');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
let score = 0;

function moveCircle() {
    const maxX = gameArea.clientWidth - circle.clientWidth;
    const maxY = gameArea.clientHeight - circle.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    circle.style.left = `${randomX}px`;
    circle.style.top = `${randomY}px`;
}

circle.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    moveCircle();
});

setInterval(moveCircle, 2000);