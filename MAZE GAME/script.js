let playCount = 0;
let timer = 0;
let timerInterval;
let username = '';
let player = { x: 1, y: 1 };
let steps = 0;
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    
];

document.getElementById('start-btn').addEventListener('click', startGame);
document.addEventListener('keydown', movePlayer);
document.getElementById('light-mode').addEventListener('click', setLightMode);
document.getElementById('dark-mode').addEventListener('click', setDarkMode);

const modal = document.getElementById("result-modal");
const closeModal = document.getElementsByClassName("close")[0];

function startGame() {
    username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter your name!');
        return;
    }

    document.getElementById('user-name').textContent = `Player: ${username}`;
    
    playCount++;
    document.getElementById('play-count').textContent = playCount;

    steps = 0;
    document.getElementById('step-count').textContent = steps;

    resetTimer();
    timerInterval = setInterval(updateTimer, 1000);

    player = { x: 1, y: 1 };
    drawMaze();
}

function updateTimer() {
    timer++;
    document.getElementById('timer').textContent = timer;
}

function resetTimer() {
    timer = 0;
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = timer;
}

function gameOver() {
    clearInterval(timerInterval);
    showResultModal(`Congrats ${username}, you finished in ${timer} seconds and ${steps} steps!`);
}

function drawMaze() {
    const canvas = document.getElementById('maze-canvas');
    const ctx = canvas.getContext('2d');
    const tileSize = 40;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            ctx.fillStyle = maze[y][x] === 1 ? 'black' : 'white';
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    // Draw start point
    ctx.fillStyle = 'green';
    ctx.fillRect(1 * tileSize, 1 * tileSize, tileSize, tileSize);

    // Draw end point
    ctx.fillStyle = 'blue';
    ctx.fillRect(8 * tileSize, 8 * tileSize, tileSize, tileSize);

    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

function movePlayer(event) {
    let newX = player.x;
    let newY = player.y;

    switch (event.key) {
        case 'ArrowUp':
            newY--;
            break;
        case 'ArrowDown':
            newY++;
            break;
        case 'ArrowLeft':
            newX--;
            break;
        case 'ArrowRight':
            newX++;
            break;
        default:
            return;
    }

    if (maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        steps++;
        document.getElementById('step-count').textContent = steps;
        drawMaze();

        // Check if player reached the goal
        if (newX === 8 && newY === 8) {
            gameOver();
        }
    }
}

function showResultModal(message) {
    document.getElementById("result-text").textContent = message;
    modal.style.display = "block";
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function setLightMode() {
    document.body.classList.remove("dark-mode");
    document.getElementById('game-container').classList.remove("dark-mode");
}

function setDarkMode() {
    document.body.classList.add("dark-mode");
    document.getElementById('game-container').classList.add("dark-mode");
}
