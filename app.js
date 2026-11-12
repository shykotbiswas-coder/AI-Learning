// Set Current Date in Header
document.getElementById('currentDate').innerText = new Date().toLocaleDateString('bn-BD', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});

// Module Content Data & Render Functions
function openModule(moduleName) {
    const modal = document.getElementById('contentModal');
    const content = document.getElementById('modalContent');
    modal.classList.remove('hidden');

    if (moduleName === 'ai-intelligence') {
        content.innerHTML = `
            <div class="space-y-6">
                <div class="border-b pb-3">
                    <h2 class="text-2xl font-bold text-purple-900 flex items-center">
                        <i class="fa-solid fa-brain mr-2"></i> AI Daily Intelligence
                    </h2>
                    <p class="text-sm text-gray-500">সর্বশেষ এআই হাইলাইটস এবং লিডারবোর্ড আপডেট।</p>
                </div>

                <!-- Tabs -->
                <div class="flex space-x-4 border-b">
                    <button onclick="switchAiTab('highlights')" id="tabHighlights" class="pb-2 font-bold text-purple-700 border-b-2 border-purple-700">Daily AI Highlights</button>
                    <button onclick="switchAiTab('leaderboard')" id="tabLeaderboard" class="pb-2 font-semibold text-gray-500">AI Leaderboard</button>
                </div>

                <!-- Highlights Section -->
                <div id="aiHighlightsSection" class="space-y-4">
                    <h3 class="font-bold text-lg text-gray-800">আজকের প্রধান এআই আপডেটসমূহ</h3>
                    <div class="bg-purple-50 p-4 rounded-xl border border-purple-200">
                        <span class="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded font-semibold">সর্বশেষ যাচাই: ১২ নভেম্বর ২০২৬</span>
                        <h4 class="font-bold text-md mt-2 text-purple-900">নতুন মাল্টিমোডাল মডেল ও রিয়েল-টাইম এজেন্ট রিলিজ</h4>
                        <p class="text-sm text-gray-600 mt-1">বিশ্বের শীর্ষস্থানীয় এআই ল্যাবগুলো তাদের নতুন ওপেনটেলিমেট্রি ও ইনজেশন এপিআই সমৃদ্ধ প্রজেক্ট উন্মোচন করেছে, যা ডেটা প্রসেসিং আরও দ্রুত করবে।</p>
                        <a href="#" target="_blank" class="inline-block mt-2 text-xs text-blue-600 font-semibold hover:underline"><i class="fa-solid fa-link mr-1"></i> মূল সোর্স দেখুন</a>
                    </div>
                </div>

                <!-- Leaderboard Section -->
                <div id="aiLeaderboardSection" class="hidden space-y-4">
                    <h3 class="font-bold text-lg text-gray-800">AI Leaderboard (সেরা টুল ও মডেল তুলনা)</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr class="bg-gray-100 border-b">
                                    <th class="p-3">বিভাগ (Category)</th>
                                    <th class="p-3">সেরা এআই (Best AI)</th>
                                    <th class="p-3">বিকল্প (Alternative)</th>
                                    <th class="p-3">মূল বৈশিষ্ট্য (Key Features)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b">
                                    <td class="p-3 font-semibold">Coding & Programming</td>
                                    <td class="p-3 text-blue-600">Claude 3.5 Sonnet</td>
                                    <td class="p-3">GPT-4o</td>
                                    <td class="p-3 text-gray-500">দ্রুত কোড জেনারেশন ও ডিবাগিং</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="p-3 font-semibold">Website Development</td>
                                    <td class="p-3 text-blue-600">Gemini & Web Canvas</td>
                                    <td class="p-3">v0 by Vercel</td>
                                    <td class="p-3 text-gray-500">ইন্টারঅ্যাক্টিভ ইউআই ও প্রিভিউ</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="p-3 font-semibold">Image Generation</td>
                                    <td class="p-3 text-blue-600">Midjourney v6</td>
                                    <td class="p-3">DALL-E 3</td>
                                    <td class="p-3 text-gray-500">হাই-রেজোলিউশন ও রিয়েলিস্টিক গ্রাফিক্স</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="p-3 font-semibold">Writing & Translation</td>
                                    <td class="p-3 text-blue-600">ChatGPT (GPT-4o)</td>
                                    <td class="p-3">Claude 3</td>
                                    <td class="p-3 text-gray-500">ন্যাচারাল বাংলা ও প্রফেশনাল টোন</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="space-y-4">
                <h2 class="text-2xl font-bold capitalize text-blue-600">${moduleName.replace('-', ' ')}</h2>
                <p class="text-gray-600">এই মডিউলটির কনটেন্ট লোড হচ্ছে। আপনার নির্দেশনা অনুযায়ী এটি সম্পূর্ণ অফলাইন বা অনলাইন মোডে কাজ করবে।</p>
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <p class="text-sm text-blue-800 font-medium"><i class="fa-solid fa-info-circle mr-1"></i> এটি একটি মডুলার ফিচার। ভবিষ্যতে এখানে নতুন উপাত্ত যুক্ত করা যাবে।</p>
                </div>
            </div>
        `;
    }
}

function closeModule() {
    document.getElementById('contentModal').classList.add('hidden');
}

function switchAiTab(tab) {
    const highlightsSec = document.getElementById('aiHighlightsSection');
    const leaderboardSec = document.getElementById('aiLeaderboardSection');
    const tabHigh = document.getElementById('tabHighlights');
    const tabLead = document.getElementById('tabLeaderboard');

    if (tab === 'highlights') {
        highlightsSec.classList.remove('hidden');
        leaderboardSec.classList.add('hidden');
        tabHigh.className = "pb-2 font-bold text-purple-700 border-b-2 border-purple-700";
        tabLead.className = "pb-2 font-semibold text-gray-500";
    } else {
        highlightsSec.classList.add('hidden');
        leaderboardSec.classList.remove('hidden');
        tabLead.className = "pb-2 font-bold text-purple-700 border-b-2 border-purple-700";
        tabHigh.className = "pb-2 font-semibold text-gray-500";
    }
}

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed: ', err));
    });
}
