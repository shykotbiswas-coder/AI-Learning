document.getElementById('currentDate').innerText = new Date().toLocaleDateString('bn-BD', { 
    weekday: 'short', month: 'short', day: 'numeric' 
});

// Database for all modules with Pagination support
const db = {
    vocabulary: [
        { title: "Abundant", desc: "প্রচুর বা পর্যাপ্ত (Meaning: Existing or available in large quantities)", ex: "Water is abundant here." },
        { title: "Benevolent", desc: "দয়ালু বা উপকারী (Meaning: Well meaning and kindly)", ex: "He is a benevolent donor." },
        { title: "Candid", desc: "স্পষ্টবাদী বা অকপট (Meaning: Truthful and straightforward)", ex: "Give your candid opinion." },
        { title: "Diligent", desc: "পরিশ্রমী (Meaning: Having or showing care in work)", ex: "She is a diligent student." },
        { title: "Eloquent", desc: "বাকপটু (Meaning: Fluent or persuasive in speaking)", ex: "An eloquent speech." },
        { title: "Frugal", desc: "মিতব্যয়ী (Meaning: Sparing or economical with regard to money)", ex: "Be frugal in spending." }
    ],
    "bengali-vocab": [
        { title: "অগাধ", desc: "যার গভীরতা মাপা যায় না বা প্রচুর। যেমন: অগাধ জল, অগাধ বিশ্বাস।" },
        { title: "অনিচ্ছুক", desc: "কোনো কিছুতে যার ইচ্ছা বা সম্মতি নেই।" },
        { title: "ঐতিহাসিক", desc: "ইতিহাসে স্থান পাওয়ার যোগ্য বা অতি গুরুত্বপূর্ণ ঘটনা।" },
        { title: "প্রবাদ: উলুবনে মুক্ত ছিটানো", desc: "অমূল্য বস্তুর অপাত্রে দান বা অযোগ্য ব্যক্তির কাছে ভালো জিনিসের কদর না হওয়া।" },
        { title: "প্রবাদ: চোরের দশ দিন গৃহস্থের এক দিন", desc: "পাপের ফল একদিন না একদিন হাতেনাতে ধরা পরেই।" },
        { title: "প্রাবন্ধিক", যিনি প্রবন্ধ রচনা করেন।" }
    ],
    gk: [
        { title: "বাংলাদেশের দীর্ঘতম নদী", desc: "মেঘনা নদী (প্রধান শাখা হিসেবে দীর্ঘতম)।" },
        { title: "বাংলাদেশের জাতীয় ফুল", desc: "শাপলা (White Water Lily)।" },
        { title: "সৌরজগতের সবচেয়ে বড় গ্রহ", desc: "বৃহস্পতি (Jupiter)।" },
        { title: "কম্পিউটারের জনক কে?", desc: "চার্লস ব্যাবেজ (Charles Babbage)।" },
        { title: "বাংলাদেশের সংবিধান কবে কার্যকর হয়?", desc: "১৬ ডিসেম্বর ১৯৭২ সালে।" },
        { title: "গ্রিনল্যান্ডের রাজধানী", desc: "নুক (Nuuk)।" }
    ],
    math: [
        { title: "শতকরা বের করার শর্টকাট", desc: "কোনো সংখ্যার X পার্সেন্ট বের করতে সংখ্যাটিকে X দিয়ে গুণ করে ১০০ দিয়ে ভাগ করতে হয়। যেমন: ৫০ এর ২০% = (৫০ × ২০) ÷ ১০০ = ১০।" },
        { title: "১১ দিয়ে গুণ করার ট্রিক", desc: "যেকোনো দুই অঙ্কের সংখ্যাকে ১১ দিয়ে গুণ করতে হলে মাঝখানে সংখ্যা দুটির যোগফল বসাতে হয়। যেমন: ২৩ × ১১ = ২ (২+৩) ৩ = ২৫৩।" },
        { title: "বর্গ করার সহজ নিয়ম", desc: "যে সংখ্যাগুলোর শেষে ৫ থাকে, তার বর্গ বের করতে শেষের ৫ এর জন্য ২৫ এবং সামনের সংখ্যাটিকে তার পরের সংখ্যা দিয়ে গুণ করে বসাতে হয়। যেমন: ২৫ এর স্কয়ার = (২×৩) ও ২৫ = ৬২৫।" }
    ]
};

let currentModuleKey = '';
let currentPage = 1;
const itemsPerPage = 2; // প্রতি পেজে ২টি করে আইটেম দেখাবে, নিচে Next বাটন থাকবে

function openModule(moduleName) {
    currentModuleKey = moduleName;
    currentPage = 1;
    const modal = document.getElementById('contentModal');
    const content = document.getElementById('modalContent');
    modal.classList.remove('hidden');

    saveToHistory(moduleName);

    if (db[moduleName]) {
        renderPaginatedContent(moduleName, currentPage, content);
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
                <p class="text-xs text-gray-600">এই মডিউলের কনটেন্ট খুব শীঘ্রই যুক্ত করা হবে।</p>
            </div>
        `;
    }
}

function renderPaginatedContent(key, page, containerElement) {
    const dataList = db[key];
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = dataList.slice(start, end);

    let titleName = key === 'vocabulary' ? 'English Vocabulary' : key === 'bengali-vocab' ? 'বাংলা শব্দভান্ডার' : key === 'gk' ? 'General Knowledge' : 'Math Tricks';

    let html = `
        <div class="space-y-4">
            <h2 class="text-lg font-bold text-indigo-700"><i class="fa-solid fa-book-open mr-2"></i> ${titleName}</h2>
            <div class="space-y-2.5">
    `;

    paginatedItems.forEach(item => {
        html += `
            <div class="p-3 bg-gray-50 border rounded-lg">
                <h4 class="font-bold text-sm text-indigo-950">${item.title}</h4>
                <p class="text-xs text-gray-700 mt-1">${item.desc}</p>
                ${item.ex ? `<p class="text-[11px] text-indigo-600 italic mt-1">উদাহরণ: ${item.ex}</p>` : ''}
            </div>
        `;
    });

    html += `</div>
            <div class="flex justify-between items-center pt-3 border-t">
                <button onclick="changePage(-1)" class="px-3 py-1 bg-gray-200 rounded text-xs font-medium ${page === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-300'}">পূর্ববর্তী (Prev)</button>
                <span class="text-xs text-gray-600 font-medium">পেজ ${page} / ${Math.ceil(dataList.length / itemsPerPage)}</span>
                <button onclick="changePage(1)" class="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-medium ${end >= dataList.length ? 'opacity-40 cursor-not-allowed' : 'hover:bg-indigo-700'}">পরবর্তী (Next)</button>
            </div>
        </div>
    `;
    containerElement.innerHTML = html;
}

function changePage(direction) {
    const dataList = db[currentModuleKey];
    const totalPages = Math.ceil(dataList.length / itemsPerPage);
    if (currentPage + direction >= 1 && currentPage + direction <= totalPages) {
        currentPage += direction;
        renderPaginatedContent(currentModuleKey, currentPage, document.getElementById('modalContent'));
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
