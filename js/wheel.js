
const wheel = document.getElementById('wheelSvg');
const spinBtn = document.getElementById('spinBtn');

const colors = ['#ef4444','#3b82f6','#22c55e','#f59e0b','#a855f7','#ec4899'];

let rotation = 0;
let spinning = false;

function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}

function describeArc(x, y, r, startAngle, endAngle) {
  const start = polarToCartesian(x, y, r, endAngle);
  const end = polarToCartesian(x, y, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', x, y,
    'L', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y,
    'Z'
  ].join(' ');
}

function renderWheel() {
  wheel.innerHTML = '';

  const slice = 360 / tasks.length;

  tasks.forEach((task, index) => {
    const startAngle = index * slice;
    const endAngle = startAngle + slice;
    const midAngle = startAngle + slice / 2;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', describeArc(300,300,300,startAngle,endAngle));
    path.setAttribute('fill', colors[index % colors.length]);
    path.setAttribute('stroke', '#0f172a');
    path.setAttribute('stroke-width', '4');
    wheel.appendChild(path);

    const pos = polarToCartesian(300,300,190,midAngle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', pos.x);
    text.setAttribute('y', pos.y);
    text.setAttribute('fill', 'white');
    text.setAttribute('font-size', '18');
    text.setAttribute('font-weight', '900');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('transform', `rotate(${midAngle + 90}, ${pos.x}, ${pos.y})`);
    text.textContent = task.text;
    wheel.appendChild(text);
  });
}

function spinWheel() {
  if (spinning) return;

  spinning = true;

  const randomIndex = Math.floor(Math.random() * tasks.length);
  const slice = 360 / tasks.length;

  const targetAngle = randomIndex * slice + slice / 2;
  const normalizedTarget = 360 - targetAngle;

  rotation += 360 * 7 + normalizedTarget;

  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    showAnimationModal(tasks[randomIndex]);
    window.currentTask = tasks[randomIndex];
    spinning = false;
  }, 5000);
}

spinBtn.addEventListener('click', spinWheel);
