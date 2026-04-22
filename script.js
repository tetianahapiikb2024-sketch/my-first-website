// 1. ЗБЕРЕЖЕННЯ ДАНИХ У LOCALSTORAGE
function saveSystemInfo() {
    const info = {
        os: navigator.platform,
        browser: navigator.userAgent.includes("Chrome") ? "Google Chrome" : "Браузер користувача",
        language: navigator.language,
        screen: `${window.screen.width}x${window.screen.height}`,
        lastVisit: new Date().toLocaleString('uk-UA')
    };

    localStorage.setItem('myResumeAppData', JSON.stringify(info));
    displaySystemInfo();
}

function displaySystemInfo() {
    const rawData = localStorage.getItem('myResumeAppData');
    const footerBox = document.getElementById('storage-info');
    
    if (rawData && footerBox) {
        const data = JSON.parse(rawData);
        footerBox.innerHTML = `
            <div style="margin-top: 15px; padding: 10px; border: 1px dashed #0056b3; font-size: 0.8em; text-align: left;">
                <strong>Інформація про систему (LocalStorage):</strong><br>
                ОС: ${data.os} | Браузер: ${data.browser}<br>
                Екран: ${data.screen} | Мова: ${data.language}<br>
                Останній вхід: ${data.lastVisit}
            </div>
        `;
    }
}

// 2. ВІДОБРАЖЕННЯ ВМІСТУ (FETCH API - ВАРІАНТ 3)
async function loadComments() {
    const container = document.getElementById('comments-container');
    if (!container) return;

    try {
        // Використовуємо твій варіант №3: posts/3/comments
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/3/comments');
        const comments = await response.json();

        // Виводимо перші 3 коментарі, які повернув сервер
        container.innerHTML = comments.slice(0, 3).map(c => `
            <div style="border-left: 4px solid #0056b3; margin: 10px 0; padding: 10px; background: rgba(0,0,0,0.03); text-align: left;">
                <p><strong>${c.name}</strong> <small>(${c.email})</small></p>
                <p style="font-style: italic;">"${c.body}"</p>
            </div>
        `).join('');
        
    } catch (e) {
        container.innerHTML = "Помилка при завантаженні відгуків з сервера.";
        console.error("Fetch error:", e);
    }
}

// 3. ПЕРЕМИКАННЯ ТЕМИ
const themeBtn = document.getElementById('toggle-theme');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('saved-theme', isDark ? 'dark' : 'light');
    });
}

if (localStorage.getItem('saved-theme') === 'dark') {
    document.body.classList.add('dark');
}

// 4. МОДАЛЬНЕ ВІКНО
const modal = document.getElementById('modal');
const openBtn = document.getElementById('open-modal');
const closeBtn = document.querySelector('.close');

if (openBtn) {
    openBtn.onclick = () => modal.style.display = "block";
}
if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ЗАПУСК ВСЬОГО ПРИ ВІДКРИТТІ СТОРІНКИ
window.onload = () => {
    saveSystemInfo();
    loadComments(); // Запускаємо завантаження коментарів для 3-го варіанту
};