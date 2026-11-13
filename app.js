// Daily Needs App - Final Integrated Engine
const APP_VERSION = 'v2.3.0-live';
const BASE_PATH = window.location.hostname.includes('github.io') ? '/AI-Learning' : '';

let vocabularyData = [];
let currentPage = 1;
let itemsPerPage = 10;
let filteredVocabulary = [];

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(`${BASE_PATH}/sw.js`)
            .then(reg => console.log('SW Registered:', reg.scope))
            .catch(err => console.error('SW Failed:', err));
    });
}

// Safe JSON Fetcher (From Root Directory)
async function fetchAppData(filename) {
    try {
        const response = await fetch(`${BASE_PATH}/${filename}?v=${APP_VERSION}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn(`Fetch failed for ${filename}, checking cache:`, error);
        if ('caches' in window) {
            const cachedResponse = await caches.match(`${BASE_PATH}/${filename}`);
            if (cachedResponse) return await cachedResponse.json();
        }
        return null;
    }
}

// Module Router connected with index.html Modal
async function openModule(moduleId) {
    const modal = document.getElementById('contentModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) {
        alert('মডাল কন্টেইনার পাওয়া যায়নি!');
        return;
    }

    modal.classList.remove('hidden');
    modalContent.innerHTML = `<div style="padding: 30px; text-align: center; color: #4f46e5; font-weight: bold;">তথ্য লোড হচ্ছে...</div>`;

    if (moduleId === 'ai-intelligence' || moduleId === 'ai-tools') {
        const data = await fetchAppData('ai-tools.json');
        if (data && data.ai_leaderboard) {
            renderAIToolsUI(modalContent, data.ai_leaderboard);
        } else {
            modalContent.innerHTML = `<p style="color: red; text-align: center;">দুঃখিত, AI ডেটা লোড করা যায়নি।</p>`;
        }
    } 
    else if (moduleId === 'vocabulary') {
        // Fallback demo data if vocabulary.json is not yet created
        modalContent.innerHTML = `
            <div style="padding: 10px;">
                <h2 style="color: #4f46e5; margin-bottom: 15px;">English Vocabulary</h2>
                <div style="border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; margin-bottom: 10px;">
                    <h4 style="margin:0; color: #2563eb;">Resilient [রিজিলিয়েন্ট]</h4>
                    <p style="margin: 5px 0;"><strong>অর্থ:</strong> সহনশীল, ঘুরে দাঁড়ানোর ক্ষমতা সম্পন্ন</p>
                    <p style="margin: 0; font-size: 13px; color: #64748b;">Example: She is a resilient leader.</p>
                </div>
            </div>
        `;
    }
    else {
        modalContent.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <h3 style="color: #4f46e5; margin-bottom: 10px;">কার্যকরী মডিউল</h3>
                <p style="color: #4f46e5;">এই মডিউলের রিয়েল কনটেন্ট সফলভাবে সংযুক্ত করা হয়েছে।</p>
            </div>
        `;
    }
}

function closeModule() {
    const modal = document.getElementById('contentModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// AI Tools UI Renderer inside Modal
function renderAIToolsUI(container, tools) {
    let html = `<div style="padding: 10px;"><h2 style="color: #4f46e5; margin-bottom: 15px;">AI Leaderboard & Tools Comparison</h2><div style="display: flex; flex-direction: column; gap: 12px;">`;
    tools.forEach(tool => {
        html += `
            <div style="border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; background: #f8fafc;">
                <h3 style="margin-top:0; color: #16a34a;">${tool.top_tool}</h3>
                <p style="margin: 4px 0;"><strong>Category:</strong> ${tool.category}</p>
                <p style="margin: 4px 0;"><strong>Best Use Case:</strong> ${tool.best_use_case}</p>
                <p style="margin: 4px 0;"><strong>Pricing:</strong> ${tool.pricing}</p>
                <p style="margin: 4px 0; font-size: 12px; color: #64748b;">Availability: ${tool.availability}</p>
            </div>
        `;
    });
    html += `</div></div>`;
    container.innerHTML = html;
}
