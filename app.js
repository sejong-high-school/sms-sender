class SMSApp {
    constructor() {
        this.phoneInput = document.getElementById('phoneNumbers');
        this.messageInput = document.getElementById('message');
        this.sendButton = document.getElementById('sendButton');
        this.statusDiv = document.getElementById('status');
        this.charCount = document.getElementById('charCount');
        this.phoneCount = document.getElementById('phoneCount');
        this.bulkMode = document.getElementById('bulkMode');
        
        this.initializeEventListeners();
        this.updateCharCount();
        this.updatePhoneCount();
    }

    initializeEventListeners() {
        // Phone numbers formatting and counting
        this.phoneInput.addEventListener('input', () => {
            this.updatePhoneCount();
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

        // Bulk mode toggle
        this.bulkMode.addEventListener('change', () => {
            this.updateSendButtonText();
        });
    }

    updatePhoneCount() {
        const phoneNumbers = this.getPhoneNumbers();
        const count = phoneNumbers.length;
        this.phoneCount.textContent = count;
        
        // Update button text based on count
        this.updateSendButtonText();
    }

    updateSendButtonText() {
        const phoneNumbers = this.getPhoneNumbers();
        const count = phoneNumbers.length;
        const isBulkMode = this.bulkMode.checked;
        
        if (count === 0) {
            this.sendButton.querySelector('.button-text').textContent = '전화번호 입력 필요';
        } else if (count === 1) {
            this.sendButton.querySelector('.button-text').textContent = '메시지 전송';
        } else if (isBulkMode) {
            this.sendButton.querySelector('.button-text').textContent = `${count}개 번호에 일괄 전송`;
        } else {
            this.sendButton.querySelector('.button-text').textContent = `${count}개 번호에 개별 전송`;
        }
    }

    getPhoneNumbers() {
        const input = this.phoneInput.value.trim();
        if (!input) return [];
        
        return input
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(phone => this.formatPhoneNumber(phone))
            .filter(phone => this.isValidKoreanPhoneNumber(phone));
    }

    formatPhoneNumber(input) {
        let value = input.replace(/\D/g, '');
        
        if (value.length >= 3) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        }
        if (value.length >= 8) {
            value = value.slice(0, 8) + '-' + value.slice(8);
        }
        if (value.length > 13) {
            value = value.slice(0, 13);
        }
        
        return value;
    }

    isValidKoreanPhoneNumber(phone) {
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
        const phoneNumbers = this.getPhoneNumbers();
        const message = this.messageInput.value.trim();

        // Clear previous status
        this.clearStatus();

        // Validate phone numbers
        if (phoneNumbers.length === 0) {
            this.showStatus('하나 이상의 유효한 전화번호를 입력해주세요. (Please enter at least one valid phone number)', 'error');
            this.phoneInput.focus();
            return false;
        }

        if (phoneNumbers.length > 50) {
            this.showStatus('한 번에 최대 50개 번호까지만 전송 가능합니다. (Maximum 50 numbers can be sent at once)', 'error');
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

        const phoneNumbers = this.getPhoneNumbers();
        const message = this.messageInput.value.trim();
        const isBulkMode = this.bulkMode.checked;

        // Show loading state
        this.setLoadingState(true);
        
        if (isBulkMode) {
            this.showStatus(`${phoneNumbers.length}개 번호에 메시지를 전송 중입니다... (Sending message to ${phoneNumbers.length} numbers...)`, 'loading');
        } else {
            this.showStatus(`${phoneNumbers.length}개 번호에 개별 메시지를 전송 중입니다... (Sending individual messages to ${phoneNumbers.length} numbers...)`, 'loading');
        }

        try {
            let results;
            
            if (isBulkMode) {
                results = await this.sendBulkSMS(phoneNumbers, message);
            } else {
                results = await this.sendIndividualSMS(phoneNumbers, message);
            }
            
            // Show success with results
            this.showResults(results);
            
            // Clear form
            this.clearForm();
            
            // Reset button state
            this.setLoadingState(false);
            
        } catch (error) {
            this.showStatus(`전송 실패: ${error.message} (Send failed: ${error.message})`, 'error');
            this.setLoadingState(false);
        }
    }

    async sendBulkSMS(phoneNumbers, message) {
        // Simulate bulk SMS sending
        const results = {
            total: phoneNumbers.length,
            successful: 0,
            failed: 0,
            details: []
        };

        for (let i = 0; i < phoneNumbers.length; i++) {
            const phone = phoneNumbers[i];
            try {
                await this.simulateAPICall(phone, message);
                results.successful++;
                results.details.push({ phone, status: 'success' });
            } catch (error) {
                results.failed++;
                results.details.push({ phone, status: 'failed', error: error.message });
            }
            
            // Update progress
            if (i % 5 === 0 || i === phoneNumbers.length - 1) {
                this.showStatus(`진행률: ${i + 1}/${phoneNumbers.length} (${Math.round((i + 1) / phoneNumbers.length * 100)}%)`, 'info');
            }
            
            // Small delay between sends to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        return results;
    }

    async sendIndividualSMS(phoneNumbers, message) {
        // Simulate individual SMS sending (could be different messages per number)
        const results = {
            total: phoneNumbers.length,
            successful: 0,
            failed: 0,
            details: []
        };

        for (let i = 0; i < phoneNumbers.length; i++) {
            const phone = phoneNumbers[i];
            try {
                await this.simulateAPICall(phone, message);
                results.successful++;
                results.details.push({ phone, status: 'success' });
            } catch (error) {
                results.failed++;
                results.details.push({ phone, status: 'failed', error: error.message });
            }
            
            // Update progress
            if (i % 5 === 0 || i === phoneNumbers.length - 1) {
                this.showStatus(`진행률: ${i + 1}/${phoneNumbers.length} (${Math.round((i + 1) / phoneNumbers.length * 100)}%)`, 'info');
            }
            
            // Small delay between sends
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        return results;
    }

    showResults(results) {
        const { total, successful, failed } = results;
        
        if (failed === 0) {
            this.showStatus(`성공! ${total}개 번호에 모두 전송되었습니다! (Success! Sent to all ${total} numbers!)`, 'success');
        } else if (successful === 0) {
            this.showStatus(`실패! 모든 번호에 전송 실패했습니다. (Failed! Failed to send to all numbers.)`, 'error');
        } else {
            this.showStatus(`부분 성공: ${successful}개 성공, ${failed}개 실패 (Partial success: ${successful} successful, ${failed} failed)`, 'info');
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
            }, 500); // Faster simulation for multiple numbers
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
        this.updatePhoneCount();
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