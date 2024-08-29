const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let snake = [{ x: 160, y: 200 }];
let snakeDirection = 'RIGHT';
let food = { x: 300, y: 200 };
let score = 0;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    updateSnakePosition();
    if (isGameOver()) return;
    if (isFoodEaten()) {
        score++;
        createFood();
    } else {
        snake.pop();
    }
    drawGame();
    setTimeout(gameLoop, 100);
}

function updateSnakePosition() {
    const head = { ...snake[0] };

    if (snakeDirection === 'LEFT') head.x -= grid;
    if (snakeDirection === 'RIGHT') head.x += grid;
    if (snakeDirection === 'UP') head.y -= grid;
    if (snakeDirection === 'DOWN') head.y += grid;

    snake.unshift(head);
}

function drawGame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'green';
    snake.forEach(part => ctx.fillRect(part.x, part.y, grid, grid));
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, grid, grid);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 20);
}

function isGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) return true;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

function isFoodEaten() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvasWidth / grid)) * grid,
        y: Math.floor(Math.random() * (canvasHeight / grid)) * grid
    };
}

function changeDirection(event) {
    const newDirection = event.key.replace('Arrow', '').toUpperCase();
    if (newDirection === 'LEFT' && snakeDirection !== 'RIGHT') snakeDirection = 'LEFT';
    if (newDirection === 'RIGHT' && snakeDirection !== 'LEFT') snakeDirection = 'RIGHT';
    if (newDirection === 'UP' && snakeDirection !== 'DOWN') snakeDirection = 'UP';
    if (newDirection === 'DOWN' && snakeDirection !== 'UP') snakeDirection = 'DOWN';
}

createFood();
gameLoop();