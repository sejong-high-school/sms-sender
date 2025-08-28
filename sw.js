const CACHE_NAME = 'sms-korea-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for offline SMS sending
self.addEventListener('sync', event => {
    if (event.tag === 'send-sms') {
        event.waitUntil(sendOfflineSMS());
    }
});

// Handle push notifications (for future SMS delivery confirmations)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : '새로운 메시지가 도착했습니다!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: '확인하기',
                icon: '/icons/icon-72x72.png'
            },
            {
                action: 'close',
                title: '닫기',
                icon: '/icons/icon-72x72.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('SMS Korea', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Function to handle offline SMS sending
async function sendOfflineSMS() {
    try {
        // Get offline SMS data from IndexedDB
        const offlineSMS = await getOfflineSMS();
        
        if (offlineSMS.length > 0) {
            // Try to send each offline SMS
            for (const sms of offlineSMS) {
                try {
                    await sendSMS(sms);
                    await removeOfflineSMS(sms.id);
                } catch (error) {
                    console.error('Failed to send offline SMS:', error);
                }
            }
        }
    } catch (error) {
        console.error('Error in offline SMS sync:', error);
    }
}

// Helper functions for offline SMS handling
async function getOfflineSMS() {
    // This would typically use IndexedDB
    // For now, return empty array
    return [];
}

async function sendSMS(smsData) {
    // This would make the actual API call
    // For now, just simulate
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

async function removeOfflineSMS(id) {
    // This would remove the SMS from IndexedDB
    // For now, just log
    console.log('Removing offline SMS:', id);
}