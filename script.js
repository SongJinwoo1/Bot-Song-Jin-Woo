// 1. إعداد مساحة الجزيئات (Particles Canvas)
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas(); // تشغيل الأبعاد عند التحميل لأول مرة

// 2. تحديث الأبعاد تلقائياً عند تغيير حجم الشاشة (الكود الذي سألت عنه)
window.addEventListener('resize', () => {
    resizeCanvas();
    // إعادة بناء الجزيئات لضمان عدم اختفائها عند التكبير
    particles = [];
    init(); 
});

// 3. منطق الجزيئات (المختصر)
let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#00d2ff' : '#9d50bb';
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}
function init() { for (let i = 0; i < 80; i++) particles.push(new Particle()); }
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init(); animate();

// 4. وظائف فتح وإغلاق النوافذ
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// 5. إغلاق النافذة عند الضغط على الخلفية (الكود الذي سألت عنه)
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// 6. تأثير الـ 3D (Tilt Effect)
const cards = document.querySelectorAll('.portal-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 25}deg) rotateX(${-y * 25}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
    });
});

// 7. منطق المتجر
function openStore() {
    alert("المتجر تحت المزامنة.. تواصل مع ملك الظلال");
    window.location.href = "https://wa.me/96597805334";
}
