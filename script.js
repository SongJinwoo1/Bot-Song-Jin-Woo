const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let particles = [];
class Mana {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.color = Math.random() > 0.5 ? '#00d2ff' : '#9d50bb'; 
        this.size = Math.random() * 2;
        this.speedY = Math.random() * 0.5 + 0.1;
    }
    update() { this.y -= this.speedY; if (this.y < 0) this.y = canvas.height; }
    draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill(); }
}

function init() { for(let i=0; i<100; i++) particles.push(new Mana()); }
function animate() { ctx.clearRect(0,0,canvas.width, canvas.height); particles.forEach(p=>{p.update(); p.draw();}); requestAnimationFrame(animate); }

function openSection(id) { document.getElementById(id).classList.add('active'); }
function closeSection() { document.querySelectorAll('.system-modal').forEach(m=>m.classList.remove('active')); }

// توليد الـ 100 فكرة برمجياً لضمان العرض
const questList = document.getElementById('quest-list');
const ideas = [
    "نظام الرتب البرمجي من E إلى S", "بوت الترحيب الذكي AI", "حماية النقابة التلقائية", 
    "متجر الأدوات الرقمية", "لوحة تحكم الواتساب للمشرفين"
];

for(let i=1; i<=100; i++) {
    let task = ideas[i-1] || `تطوير البروتوكول السري رقم ${i}`;
    questList.innerHTML += `<div class="quest-item"><strong>[RANK ${i}]</strong> ${task}</div>`;
}

init(); animate();
