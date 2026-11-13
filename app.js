// Daily Needs App - Full Integration & Controller Engine
const APP_VERSION = 'v2.2.0-live';

// GitHub Pages সঠিক পাথ ডিটেকশন (যাতে লোকাল বা গিটহাব উভয় স্থানেই কাজ করে)
const BASE_PATH = window.location.hostname.includes('github.io') ? '/AI-Learning' : '';

// State Management Variables
let vocabularyData = [];
let currentPage = 1;
let itemsPerPage = 10;
let filteredVocabulary = [];

// 1. Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(`${BASE_PATH}/sw.js`)
            .then(reg => console.log('PWA Service Worker Registered:', reg.scope))
            .catch(err => console.error('SW Registration Failed:', err));
    });
}

// 2. Safe JSON Data Fetcher with Offline Cache Support
async function fetchAppData(filename) {
    try {
        const response = await fetch(`${BASE_PATH}/data/${filename}?v=${APP_VERSION}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn(`Network fetch failed for ${filename}, checking cache:`, error);
        // Fallback to Cache API if offline
        if ('caches' in window) {
            const cachedResponse = await caches.match(`${BASE_PATH}/data/${filename}`);
            if (cachedResponse) {
                return await cachedResponse.json();
            }
        }
        return null;
    }
}

// 3. Dynamic Module Router (Replaces Placeholder)
async function openModule(moduleId) {
    const mainContainer = document.getElementById('app-main-content') || document.getElementById('content');
    if (!mainContainer) {
        console.error('Main content container not found in HTML!');
        return;
    }

    if (moduleId === 'vocabulary' || moduleId === 'vocab-module') {
        mainContainer.innerHTML = `<div class="loading-spinner" style="padding: 20px; text-align: center;">শব্দভাণ্ডার লোড হচ্ছে...</div>`;
        const data = await fetchAppData('vocabulary.json');
        
        if (data && data.english_vocabulary) {
            vocabularyData = data.english_vocabulary;
            filteredVocabulary = [...vocabularyData];
            renderVocabularyUI(mainContainer);
        } else {
            mainContainer.innerHTML = `<p class="error-msg" style="color: red; text-align: center;">দুঃখিত, ভোকাবুলারি ডেটা লোড করা যায়নি। ইন্টারনেটে সংযোগ চেক করুন।</p>`;
        }
    } 
    else if (moduleId === 'ai-tools' || moduleId === 'ai-module') {
        mainContainer.innerHTML = `<div class="loading-spinner" style="padding: 20px; text-align: center;">AI টুলস লোড হচ্ছে...</div>`;
        const data = await fetchAppData('ai-tools.json');
        
        if (data && data.ai_leaderboard) {
            renderAIToolsUI(mainContainer, data.ai_leaderboard);
        } else {
            mainContainer.innerHTML = `<p class="error-msg" style="color: red; text-align: center;">দুঃখিত, AI ডেটা লোড করা যায়নি।</p>`;
        }
    }
    else if (moduleId === 'mechanical' || moduleId === 'tech-module') {
        mainContainer.innerHTML = `<div class="loading-spinner" style="padding: 20px; text-align: center;">মেকানিক্যাল লার্নিং লোড হচ্ছে...</div>`;
        const data = await fetchAppData('mechanical.json');
