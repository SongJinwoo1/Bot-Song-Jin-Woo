// 1. محرك جزيئات المانا (أزرق وبنفسجي)
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let particles = [];
class ManaParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.color = Math.random() > 0.5 ? '#00d2ff' : '#9d50bb'; 
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.7 + 0.2;
    }
    update() { this.y -= this.speedY; if (this.y < 0) this.y = canvas.height; }
    draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill(); }
}

function initMana() { for(let i=0; i<150; i++) particles.push(new ManaParticle()); }
function animateMana() { ctx.clearRect(0,0,canvas.width, canvas.height); particles.forEach(p=>{p.update(); p.draw();}); requestAnimationFrame(animateMana); }

// 2. إدارة فتح وإغلاق الأقسام
function openSection(id) { document.getElementById(id).classList.add('active'); }
function closeSection() { document.querySelectorAll('.system-modal').forEach(m=>m.classList.remove('active')); }

// 3. جلب الـ 100 فكرة من ملف ideas.json
async function loadQuests() {
    try {
        const response = await fetch('ideas.json');
        const data = await response.json();
        const container = document.getElementById('quest-list');
        container.innerHTML = data.map(q => `
            <div class="quest-item">
                <strong>[RANK ${q.id}]</strong> ${q.task}
            </div>
        `).join('');
    } catch (err) { console.error("Error loading system tasks"); }
}

window.onload = () => { initMana(); animateMana(); loadQuests(); };
