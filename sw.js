const CACHE_NAME = 'gmail-sender-v1';
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

// Background sync for offline email sending
self.addEventListener('sync', event => {
    if (event.tag === 'send-email') {
        event.waitUntil(sendOfflineEmails());
    }
});

// Handle push notifications (for future email delivery confirmations)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New email sent successfully!',
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
                title: 'View',
                icon: '/icons/icon-72x72.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icons/icon-72x72.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Gmail Sender', options)
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

// Function to handle offline email sending
async function sendOfflineEmails() {
    try {
        // Get offline email data from IndexedDB
        const offlineEmails = await getOfflineEmails();
        
        if (offlineEmails.length > 0) {
            // Try to send each offline email
            for (const email of offlineEmails) {
                try {
                    await sendEmail(email);
                    await removeOfflineEmail(email.id);
                } catch (error) {
                    console.error('Failed to send offline email:', error);
                }
            }
        }
    } catch (error) {
        console.error('Error in offline email sync:', error);
    }
}

// Helper functions for offline email handling
async function getOfflineEmails() {
    // This would typically use IndexedDB
    // For now, return empty array
    return [];
}

async function sendEmail(emailData) {
    // This would make the actual Gmail API call
    // For now, just simulate
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

async function removeOfflineEmail(id) {
    // This would remove the email from IndexedDB
    // For now, just log
    console.log('Removing offline email:', id);
}