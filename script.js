const quotes = [
    "إما أن تكون السيد، أو تكون الأداة.. الخيار كان دائماً لك.",
    "الضعف خطيئة في عالم لا يعترف إلا بالنتائج والمنطق.",
    "الجميع مجرد أدوات، المهم هو كيف تصبح الأداة الأكثر قيمة.",
    "المعرفة هي السلاح الوحيد الذي لا يمكن انتزاعه منك.",
    "لتحمي شيئاً غالياً، كن مستعداً للتخلي عن إنسانيتك.",
    "في هذه الغرفة، الظلال هي الحقيقة الوحيدة."
];

const philQuestions = [
    "هل تعتقد أن الذكاء أهم من الأخلاق في عالم البرمجة؟",
    "هل تفضل أن تكون ملكاً في الظلال أم خادماً في الضياء؟",
    "إذا كان الكود يحل المشكلة، هل يهم إذا كان أخلاقياً؟",
    "هل الغاية دائماً تبرر الوسيلة في سعيك نحو القوة؟",
    "ماذا ستفعل لو امتلكت القدرة على كسر أي نظام في العالم؟"
];

const pathMap = { 
    "1":"الويب المتكامل", "2":"الذكاء الاصطناعي", "3":"الأمن السيبراني", 
    "4":"برمجة التطبيقات", "5":"تحليل البيانات", "6":"الأتمتة",
    "7":"تطوير الأنظمة (C++)", "8":"برمجة جافا (Java)"
};

const currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
const currentQuestion = philQuestions[Math.floor(Math.random() * philQuestions.length)];

// Matrix logic
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const drops = Array(Math.floor(canvas.width / 14)).fill(1);
function drawMatrix() {
    ctx.fillStyle = 'rgba(3, 3, 3, 0.08)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    drops.forEach((y, i) => {
        ctx.fillStyle = (i % 2 === 0) ? '#8a2be2' : '#00ffcc';
        ctx.fillText("ARISE01"[Math.floor(Math.random()*7)], i * 14, y * 14);
        if(y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 50);

const output = document.getElementById('output');
const inputLine = document.getElementById('input-line');
const userInput = document.getElementById('userInput');
const progress = document.getElementById('progress');

let step = 0;
let userData = { name: "", path: "", level: "", q: currentQuestion, a: "" };

async function write(text, type = '') {
    const div = document.createElement('div'); div.className = log ${type};
    output.appendChild(div);
    for (let char of text) { div.innerHTML += char; output.scrollTop = output.scrollHeight; await new Promise(r => setTimeout(r, 18)); }
}

async function init() {
    await write("[SYSTEM]: جاري استدعاء بروتوكول Arise Shadow Room...", "system");
    await write(currentQuote, "quote");
    await write("أدخل اسمك الرمزي للبدء:");
    inputLine.classList.remove('hidden');
    userInput.focus();
}

userInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && userInput.value.trim() !== '') {
        let val = userInput.value.trim();
        userInput.value = '';
        inputLine.classList.add('hidden');
        
        if (step === 0) {
            userData.name = val;
            await write(❱ ${val}, 'system');
            await write(أهلاً بك يا ${val}. حدد مسار سيادتك (ادخل الرقم من 1-8):);
            await write("1. الويب | 2. الذكاء | 3. الأمن | 4. التطبيقات | 5. البيانات | 6. الأتمتة | 7. C++ | 8. Java", "system");
            step++;
        } 
        else if (step === 1) {
            let found = pathMap[val] || Object.values(pathMap).find(p => val.includes(p));
            if (!found) {
                await write([ERROR]: المسار غير موجود. التزم بالخيارات (1-8)., "error");
            } else {
                userData.path = found;
                await write(❱ ${found}, 'system');
                await write("حدد مستواك الحالي (مبتدئ | متوسط | محترف):");
                step++;
            }
        } 
        else if (step === 2) {
            if (!["مبتدئ", "متوسط", "محترف"].includes(val)) {
                await write("[ERROR]: مدخلات غير منطقية. اختر (مبتدئ | متوسط | محترف).", "error");
              } else {
                userData.level = val;
                await write(❱ ${val}, 'system');
                await write([اختبار المنطق]: ${currentQuestion});
                step++;
            }
        } 
        else if (step === 3) {
            userData.a = val;
            await write(❱ ${val}, 'system');
            await startAnalysis();
            return;
        }
        inputLine.classList.remove('hidden');
        userInput.focus();
    }
});

async function startAnalysis() {
    document.getElementById('progressContainer').style.display = 'block';
    await write([ANALYSIS]: جاري تحليل نمط "${userData.name}" وتشفير البيانات..., "system");
    setTimeout(() => progress.style.width = '100%', 100);
    await new Promise(r => setTimeout(r, 4800));
    await write('"الاحتمالات استقرت. القائد بانتظار تقريرك الآن."', "quote");
    setTimeout(() => {
        const leaders = [{ n: "الملك جين وو", p: "96597805334" }, { n: "المدبر أيانوكوجي", p: "201055719273" }];
        const lead = leaders[Math.floor(Math.random() * leaders.length)];
        const msg = encodeURIComponent(*--- تقرير Arise Shadow Room ---*\n👤 العضو: ${userData.name}\n🛤️ المسار: ${userData.path}\n📊 المستوى: ${userData.level}\n❓ السؤال: ${userData.q}\n💡 الإجابة: ${userData.a}\n--------------------------\n*تم التوجيه آلياً إلى: ${lead.n}*);
        window.location.href = https://wa.me/${lead.p}?text=${msg};
    }, 1200);
}

init();
              
