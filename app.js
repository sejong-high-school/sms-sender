class SMSApp {
    constructor() {
        this.phoneInput = document.getElementById('phoneNumber');
        this.messageInput = document.getElementById('message');
        this.sendButton = document.getElementById('sendButton');
        this.statusDiv = document.getElementById('status');
        this.charCount = document.getElementById('charCount');
        
        this.initializeEventListeners();
        this.updateCharCount();
    }

    initializeEventListeners() {
        // Phone number formatting
        this.phoneInput.addEventListener('input', (e) => {
            this.formatPhoneNumber(e.target);
        });

        // Character count update
        this.messageInput.addEventListener('input', () => {
            this.updateCharCount();
        });

        // Send button click
        this.sendButton.addEventListener('click', () => {
            this.sendSMS();
        });

        // Enter key support
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.sendSMS();
            }
        });

        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.autoResizeTextarea();
        });
    }

    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length >= 3) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        }
        if (value.length >= 8) {
            value = value.slice(0, 8) + '-' + value.slice(8);
        }
        if (value.length > 13) {
            value = value.slice(0, 13);
        }
        
        input.value = value;
    }

    updateCharCount() {
        const count = this.messageInput.value.length;
        this.charCount.textContent = count;
        
        if (count > 450) {
            this.charCount.style.color = '#dc2626';
        } else if (count > 400) {
            this.charCount.style.color = '#ea580c';
        } else {
            this.charCount.style.color = '#6b7280';
        }
    }

    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = this.messageInput.scrollHeight + 'px';
    }

    validateForm() {
        const phone = this.phoneInput.value.trim();
        const message = this.messageInput.value.trim();

        // Clear previous status
        this.clearStatus();

        // Validate phone number
        if (!phone) {
            this.showStatus('전화번호를 입력해주세요. (Please enter a phone number)', 'error');
            this.phoneInput.focus();
            return false;
        }

        const phonePattern = /^010-\d{4}-\d{4}$/;
        if (!phonePattern.test(phone)) {
            this.showStatus('올바른 한국 전화번호 형식을 입력해주세요. (Please enter a valid Korean phone number format)', 'error');
            this.phoneInput.focus();
            return false;
        }

        // Validate message
        if (!message) {
            this.showStatus('메시지를 입력해주세요. (Please enter a message)', 'error');
            this.messageInput.focus();
            return false;
        }

        if (message.length > 500) {
            this.showStatus('메시지는 500자를 초과할 수 없습니다. (Message cannot exceed 500 characters)', 'error');
            this.messageInput.focus();
            return false;
        }

        return true;
    }

    async sendSMS() {
        if (!this.validateForm()) {
            return;
        }

        const phone = this.phoneInput.value.trim();
        const message = this.messageInput.value.trim();

        // Show loading state
        this.setLoadingState(true);
        this.showStatus('메시지를 전송 중입니다... (Sending message...)', 'loading');

        try {
            // Simulate API call delay
            await this.simulateAPICall(phone, message);
            
            // Show success
            this.showStatus('메시지가 성공적으로 전송되었습니다! (Message sent successfully!)', 'success');
            
            // Clear form
            this.clearForm();
            
            // Reset button state
            this.setLoadingState(false);
            
        } catch (error) {
            this.showStatus(`전송 실패: ${error.message} (Send failed: ${error.message})`, 'error');
            this.setLoadingState(false);
        }
    }

    async simulateAPICall(phone, message) {
        // This is a simulation - in a real app, you would integrate with an SMS API service
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true, messageId: 'demo-' + Date.now() });
                } else {
                    reject(new Error('네트워크 오류 (Network error)'));
                }
            }, 2000);
        });
    }

    setLoadingState(loading) {
        this.sendButton.disabled = loading;
        if (loading) {
            this.sendButton.classList.add('loading');
        } else {
            this.sendButton.classList.remove('loading');
        }
    }

    showStatus(message, type) {
        this.statusDiv.textContent = message;
        this.statusDiv.className = `status ${type}`;
        this.statusDiv.style.display = 'block';
    }

    clearStatus() {
        this.statusDiv.style.display = 'none';
        this.statusDiv.className = 'status';
    }

    clearForm() {
        this.phoneInput.value = '';
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        this.updateCharCount();
        this.phoneInput.focus();
    }

    // PWA installation prompt
    showInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show custom install button or notification
            this.showStatus('이 앱을 홈 화면에 설치할 수 있습니다! (You can install this app on your home screen!)', 'success');
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new SMSApp();
    
    // Show install prompt if available
    app.showInstallPrompt();
    
    // Add offline/online status
    window.addEventListener('online', () => {
        app.showStatus('온라인 상태입니다. (You are online)', 'success');
        setTimeout(() => app.clearStatus(), 3000);
    });
    
    window.addEventListener('offline', () => {
        app.showStatus('오프라인 상태입니다. (You are offline)', 'error');
    });
});

// Add some Korean-specific phone number validation
function validateKoreanPhoneNumber(phone) {
    // Korean mobile numbers start with 010, 011, 016, 017, 018, 019
    const koreanMobilePatterns = [
        /^010-\d{4}-\d{4}$/,  // 010-XXXX-XXXX (most common)
        /^011-\d{3}-\d{4}$/,  // 011-XXX-XXXX
        /^016-\d{3}-\d{4}$/,  // 016-XXX-XXXX
        /^017-\d{3}-\d{4}$/,  // 017-XXX-XXXX
        /^018-\d{3}-\d{4}$/,  // 018-XXX-XXXX
        /^019-\d{3}-\d{4}$/   // 019-XXX-XXXX
    ];
    
    return koreanMobilePatterns.some(pattern => pattern.test(phone));
}