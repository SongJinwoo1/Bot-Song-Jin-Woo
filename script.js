// 1. تأثير اليافطة المتحركة
const typingText = "أنا أرتقي... لذا عليك أن تطيع أو تموت!";
let charIndex = 0;

function typeEffect() {
    if (charIndex < typingText.length) {
        document.getElementById("typewriter").innerHTML += typingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    }
}

// 2. جلب الأفكار من ملف ideas.json
async function loadIdeas() {
    try {
        const response = await fetch('ideas.json');
        const data = await response.json();
        const container = document.getElementById('ideas-container');
        
        if(container && data.ideas) {
            data.ideas.forEach(idea => {
                const div = document.createElement('div');
                div.style.padding = "15px";
                div.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
                div.innerHTML = `<strong style="color:var(--primary)">${idea.id}. ${idea.title}</strong>: <span style="color:#94a3b8">${idea.description}</span>`;
                container.appendChild(div);
            });
        }
    } catch (err) {
        console.log("في انتظار إضافة ملف ideas.json...");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    loadIdeas();
});
