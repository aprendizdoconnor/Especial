const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const dotsContainer = document.querySelector('.carousel-indicators');

let currentIndex = 0;

// Cria os indicadores (bolinhas)
items.forEach((_, idx) => {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  if (idx === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(idx));
  dotsContainer.appendChild(dot);
});

function updateDots() {
  const dots = dotsContainer.querySelectorAll('button');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });
}

function goToSlide(index) {
  if (index < 0) index = items.length - 1;
  if (index >= items.length) index = 0;

  items.forEach((item, idx) => {
    if (idx === index) {
      item.classList.add('active');
    } else {
      if (item.classList.contains('active')) item.classList.remove('active');
      const video = item.querySelector('video');
      if (video) {
        video.pause();
      }
    }
  });

  currentIndex = index;
  updateDots();
}

nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

// Inicializa no primeiro slide
goToSlide(0);

// Corações caindo
const canvas = document.getElementById('coracoes');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: -20,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1
  };
}

let hearts = Array.from({ length: 20 }, createHeart);

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, idx) => {
    ctx.fillStyle = '#ff4d6d';
    ctx.beginPath();
    const topCurveHeight = heart.size * 0.3;
    ctx.moveTo(heart.x, heart.y + topCurveHeight);
    ctx.bezierCurveTo(
      heart.x - heart.size / 2, heart.y,
      heart.x - heart.size, heart.y + heart.size / 2,
      heart.x, heart.y + heart.size
    );
    ctx.bezierCurveTo(
      heart.x + heart.size, heart.y + heart.size / 2,
      heart.x + heart.size / 2, heart.y,
      heart.x, heart.y + topCurveHeight
    );
    ctx.closePath();
    ctx.fill();

    heart.y += heart.speed;
    if (heart.y > canvas.height + 20) hearts[idx] = createHeart();
  });
  requestAnimationFrame(drawHearts);
}

drawHearts();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
