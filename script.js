const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
const toggleBtn = document.getElementById("toggle");

const letters = [
  "日",
  "ﾊ",
  "ﾐ",
  "ﾋ",
  "ｰ",
  "ｳ",
  "ｼ",
  "ﾅ",
  "ﾓ",
  "ﾆ",
  "ｻ",
  "ﾜ",
  "ﾂ",
  "ｵ",
  "ﾘ",
  "ﾗ",
  "ﾎ",
  "ﾃ",
  "ﾏ",
  "ｹ",
  "ﾒ",
  "ｴ",
  "ｶ",
  "ｷ",
  "ﾑ",
  "ﾕ",
  "ｱ",
  "ｾ",
  "ﾈ",
  "ｽ",
  "ﾀ",
  "ﾇ",
  "ﾍ",
  ":",
  "・",
  ".",
  "=",
  "*",
  "+",
  "-",
  "<",
  ">",
  "¦",
  "｜",
  "ﾘ",
];

const easterEgg = "CLAUDIO É O ESCOLHIDO";
let eggIndex = 0;

let fontSize;
let columns;
let drops = [];
let paused = false;
let mouseX = 0;
let animationId = null;

function calculateFontSize() {
  const base = 18;
  return Math.max(base, Math.floor(window.innerWidth / 100));
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fontSize = calculateFontSize();
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}

function debounce(func, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}

function draw() {
  if (paused) return;

  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px 'Share Tech Mono'`;

  for (let i = 0; i < drops.length; i++) {
    const text =
      Math.random() < 0.005 && eggIndex < easterEgg.length
        ? easterEgg[eggIndex++]
        : letters[Math.floor(Math.random() * letters.length)];

    const x = i * fontSize;
    const y = drops[i] * fontSize;

    const distance = Math.abs(mouseX - x);
    const glow = Math.max(0, 20 - distance / 10);

    ctx.shadowColor = "#0F0";
    ctx.shadowBlur = glow;
    ctx.fillStyle = "#0F0";
    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  animationId = requestAnimationFrame(draw);
}

function toggleAnimation() {
  paused = !paused;
  toggleBtn.textContent = paused ? "▶" : "⏸";

  if (paused && animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  } else if (!paused) {
    draw();
  }
}

// function handleMouseMove(e) {
//   mouseX = e.clientX;
// }

window.addEventListener("resize", debounce(resizeCanvas, 200));
toggleBtn.addEventListener("click", toggleAnimation);

resizeCanvas();
draw();

document.getElementById("start-transition").addEventListener("click", () => {
  const circle = document.getElementById("circle-transition");
  const text = document.getElementById("circle-text");
  const matrix = document.getElementById("matrix");
  const button = document.getElementById("start-transition");

  // // Fade-out da Matrix Rain
  // matrix.style.transition = "opacity 2.5s ease-in-out";
  // matrix.style.opacity = "0";

  // Crescimento do círculo
  circle.style.opacity = "1";
  circle.style.width = "300vw";
  circle.style.height = "300vw";

  // Mostrar texto dentro do círculo
  setTimeout(() => {
    text.style.opacity = "1";
  }, 1000);

  // Ocultar botão
  button.style.display = "none";

  // Revelar nova interface após transição
setTimeout(() => {
  document.getElementById("cyber-interface").style.display = "block";
}, 2700);

// Redirecionamento após 4 segundos
setTimeout(() => {
  window.location.href = "https://claudiogardusi.github.io/";
}, 3000);
});

