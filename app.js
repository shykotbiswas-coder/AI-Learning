// Daily Needs App - Core Engine & PWA Optimizer (Phase 1)
const APP_VERSION = 'v1.1.0-live';
const CACHE_NAME = `daily-needs-${APP_VERSION}`;

// 1. Service Worker Registration & Cache Management
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log('Service Worker Registered Successfully:', reg.scope);
                // Check for updates
                reg.onupdatefound = () => {
                    const installingWorker = reg.installing;
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                console.log('New content is available; please refresh.');
                            }
                        }
                    };
                };
            })
            .catch(err => console.error('Service Worker Registration Failed:', err));
    });
}

// 2. Safe Dynamic JSON Loader (Lazy Loading Architecture for Performance)
async function loadModuleData(filename) {
    try {
        const response = await fetch(`./data/${filename}?v=${APP_VERSION}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        return await response.json();
    } catch (error) {
        console.warn(`Local fetch failed, checking cache for ${filename}:`, error);
        // Fallback to cache if offline
        const cachedResponse = await caches.match(filename);
        if (cachedResponse) {
            return await cachedResponse.json();
        }
        throw error;
    }
}

// 3. LocalStorage Persistence Wrapper with Backup Support
const StorageManager = {
    save(key, data) {
        try {
            localStorage.setItem(`dn_${key}`, JSON.stringify(data));
        } catch (e) {
            console.error('Storage save error:', e);
        }
    },
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`dn_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage read error:', e);
            return defaultValue;
        }
    },
    exportData() {
        const allData = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('dn_')) {
                allData[key] = localStorage.getItem(key);
            }
        }
        const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `daily-needs-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    },
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            Object.keys(data).forEach(key => {
                if (key.startsWith('dn_')) {
                    localStorage.setItem(key, data[key]);
                }
            });
            alert('Backup restored successfully!');
            window.location.reload();
        } catch (e) {
            alert('Invalid backup file format.');
        }
    }
};
