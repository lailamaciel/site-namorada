const messages = [
  "Você é a resposta da oração mais bonita que já fiz! ❤️",
  "Eu ainda te olho da mesma forma que te olhei desde a primeria vez que te vi! ✨",
  "O lugar mais confortável do mundo é dentro do teu abraço! 💖",
  "Ganhei na mega-sena quando te conheci! 💘",
  "Com você, tudo é melhor! 💑",
  "Prometo te amar e te honrar todos os dias da minha vida! 💍"
];

let index = 0;

function showMessage() {
  const msgElement = document.getElementById('message');
  msgElement.textContent = messages[index];
  index = (index + 1) % messages.length;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawHeart(x, y, size, color) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(
    x - size / 2,
    y + (size + topCurveHeight) / 2,
    x,
    y + (size + topCurveHeight) / 1.5,
    x,
    y + size
  );
  ctx.bezierCurveTo(
    x,
    y + (size + topCurveHeight) / 1.5,
    x + size / 2,
    y + (size + topCurveHeight) / 2,
    x + size / 2,
    y + topCurveHeight
  );
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

let hearts = [];

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 10 + Math.random() * 20,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    color: `hsl(${Math.random() * 360}, 100%, 75%)`,
  };
}

for (let i = 0; i < 50; i++) {
  hearts.push(createHeart());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let heart of hearts) {
    drawHeart(heart.x, heart.y, heart.size, heart.color);
    heart.x += heart.speedX;
    heart.y += heart.speedY;

    // rebote nas bordas
    if (heart.x < 0 || heart.x > canvas.width) heart.speedX *= -1;
    if (heart.y < 0 || heart.y > canvas.height) heart.speedY *= -1;
  }
  requestAnimationFrame(animate);
}

animate();
