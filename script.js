const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let particles = [];
const colors = ['#00f2ff', '#7000ff']; 

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0; if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = this.color; ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

function init() { for (let i = 0; i < 90; i++) particles.push(new Particle()); }
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init(); animate();

async function openModal(type, imgSrc = null) {
    const modal = document.getElementById('systemModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    const img = document.getElementById('modalImage');

    img.style.display = imgSrc ? "block" : "none";
    if(imgSrc) img.src = imgSrc;

    if (type === 'commands') {
        title.innerText = "⚔️ بوابة الأوامر";
        const res = await fetch('ideas.json');
        const data = await res.json();
        content.innerHTML = data.map(i => `<div class="idea-item"><b>[${i.cat}]</b> ${i.idea}</div>`).join('');
    } else if (type === 'guilds') {
        title.innerText = "🛡️ اتحاد النقابات";
        content.innerHTML = `<div class="idea-item" style="border-right-color:red; color:#ff4d4d; font-weight:bold;">⚠️ أمر الإخلاص: يمنع الانضمام لنقابتين معاً. الولاء لنقابة واحدة أو الطرد النهائي.</div>`;
    } else if (type === 'king') {
        title.innerText = "👑 الديوان الملكي";
        content.innerHTML = `<div class="idea-item">للتواصل مع الملك: +965XXXXXXX</div>`;
    } else {
        title.innerText = "🔒 النظام";
        content.innerHTML = `<div class="idea-item">قيد التحديث الملكي.</div>`;
    }
    modal.classList.add('active');
}

function closeModal() { document.getElementById('systemModal').classList.remove('active'); }
