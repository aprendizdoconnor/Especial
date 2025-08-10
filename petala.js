const canvas = document.getElementById('petalas');
const ctx = canvas.getContext('2d');

let width, height;
let petalas = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();

window.addEventListener('resize', resize);

class Petala {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.size = 10 + Math.random() * 15;
    this.speed = 1 + Math.random() * 2;
    this.angle = Math.random() * 2 * Math.PI;
    this.spin = 0.02 + Math.random() * 0.03;
  }

  update() {
    this.y += this.speed;
    this.angle += this.spin;
    if (this.y > height) {
      this.y = -this.size;
      this.x = Math.random() * width;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = 'rgba(230, 57, 70, 0.8)';
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

function initPetalas(count = 50) {
  petalas = [];
  for (let i = 0; i < count; i++) {
    petalas.push(new Petala());
  }
}
initPetalas();

function animate() {
  ctx.clearRect(0, 0, width, height);
  petalas.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();
