document.getElementById('currentDate').innerText = new Date().toLocaleDateString('bn-BD', { 
    weekday: 'short', month: 'short', day: 'numeric' 
});

const vocabData = [
    { word: "Abundant", meaning: "প্রচুর বা পর্যাপ্ত", example: "Water is abundant here." },
    { word: "Benevolent", meaning: "দয়ালু বা উপকারী", example: "He is a benevolent man." },
    { word: "Candid", meaning: "স্পষ্টবাদী বা অকপট", example: "Give a candid opinion." },
    { word: "Diligent", meaning: "পরিশ্রমী", example: "She is a diligent student." },
    { word: "Eloquent", meaning: "বাকপটু", example: "An eloquent speech." },
    { word: "Frugal", meaning: "মিতব্যয়ী", example: "Be frugal in spending." }
];

let currentVocabPage = 1;
const itemsPerPage = 3;

function openModule(moduleName) {
    const modal = document.getElementById('contentModal');
    const content = document.getElementById('modalContent');
    modal.classList.remove('hidden');

    saveToHistory(moduleName);

    if (moduleName === 'vocabulary') {
        renderVocabPage(currentVocabPage, content);
    } 
    else if (moduleName === 'history') {
        renderHistory(content);
    }
    else if (moduleName === 'ai-intelligence') {
        content.innerHTML = `
            <div class="space-y-4">
                <h2 class="text-xl font-bold text-indigo-900"><i class="fa-solid fa-brain mr-2"></i> AI Intelligence & Leaderboard</h2>
                <p class="text-xs text-gray-500">স্বাধীন বেঞ্চমার্কের ওপর ভিত্তি করে রিয়েল-টাইম এআই র‍্যাংকিং।</p>
                <div class="border rounded-lg overflow-hidden text-xs">
                    <table class="w-full text-left border-collapse">
                        <thead class="bg-gray-50 border-b">
                            <tr>
                                <th class="p-2.5">Category</th>
                                <th class="p-2.5">Best AI</th>
                                <th class="p-2.5">Alternative</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b"><td class="p-2.5 font-medium">Coding</td><td class="p-2.5 text-indigo-600">Claude 3.5 Sonnet</td><td class="p-2.5">GPT-4o</td></tr>
                            <tr class="border-b"><td class="p-2.5 font-medium">Web Dev</td><td class="p-2.5 text-indigo-600">Gemini & Web Canvas</td><td class="p-2.5">v0 Dev</td></tr>
                            <tr><td class="p-2.5 font-medium">Writing</td><td class="p-2.5 text-indigo-600">ChatGPT</td><td class="p-2.5">Claude 3</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="space-y-3">
                <h2 class="text-lg font-bold capitalize text-indigo-700">${moduleName.replace('-', ' ')}</h2>
                <p class="text-xs text-gray-600">এই মডিউলটি সফলভাবে লোড হয়েছে। এখানে প্রয়োজনীয় তথ্য যুক্ত করা যাবে।</p>
            </div>
        `;
    }
}

function renderVocabPage(page, containerElement) {
    currentVocabPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = vocabData.slice(start, end);

    let html = `
        <div class="space-y-4">
            <h2 class="text-lg font-bold text-indigo-700"><i class="fa-solid fa-book mr-2"></i> English Vocabulary (Pagination)</h2>
            <div class="space-y-2">
    `;

    paginatedItems.forEach(item => {
        html += `
            <div class="p-3 bg-gray-50 border rounded-lg">
                <h4 class="font-bold text-sm text-indigo-900">${item.word}</h4>
                <p class="text-xs text-gray-700 mt-0.5">অর্থ: ${item.meaning}</p>
                <p class="text-[11px] text-gray-500 italic mt-1">Example: ${item.example}</p>
            </div>
        `;
    });

    html += `</div>
            <div class="flex justify-between items-center pt-2">
                <button onclick="changeVocabPage(-1)" class="px-3 py-1 bg-gray-200 rounded text-xs font-medium ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}">পূর্ববর্তী (Prev)</button>
                <span class="text-xs text-gray-600">পেজ ${page}</span>
                <button onclick="changeVocabPage(1)" class="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-medium ${end >= vocabData.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}">পরবর্তী (Next)</button>
            </div>
        </div>
    `;
    containerElement.innerHTML = html;
}

function changeVocabPage(direction) {
    const totalPages = Math.ceil(vocabData.length / itemsPerPage);
    if (currentVocabPage + direction >= 1 && currentVocabPage + direction <= totalPages) {
        currentVocabPage += direction;
        openModule('vocabulary');
    }
}

function saveToHistory(moduleName) {
    let history = JSON.parse(localStorage.getItem('learningHistory') || '[]');
    const timestamp = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
    if (history.length === 0 || history[0].name !== moduleName) {
        history.unshift({ name: moduleName, time: timestamp });
        if (history.length > 10) history.pop();
        localStorage.setItem('learningHistory', JSON.stringify(history));
    }
}

function renderHistory(containerElement) {
    let history = JSON.parse(localStorage.getItem('learningHistory') || '[]');
    let html = `
        <div class="space-y-3">
            <h2 class="text-lg font-bold text-indigo-700"><i class="fa-solid fa-clock-rotate-left mr-2"></i> পড়ার ইতিহাস (Learning History)</h2>
    `;
    if (history.length === 0) {
        html += `<p class="text-xs text-gray-500">এখনো কোনো ইতিহাস নেই।</p>`;
    } else {
        html += `<div class="space-y-1.5">`;
        history.forEach(item => {
            html += `<div class="p-2 bg-gray-50 border rounded text-xs flex justify-between items-center">
                <span class="font-medium uppercase text-gray-800">${item.name}</span>
                <span class="text-gray-400 text-[10px]">${item.time}</span>
            </div>`;
        });
        html += `</div>`;
    }
    html += `</div>`;
    containerElement.innerHTML = html;
}

function closeModule() {
    document.getElementById('contentModal').classList.add('hidden');
}

document.getElementById('searchInput').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('#featureGrid > div');
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(term) ? 'flex' : 'none';
    });
});
