class GmailSenderApp {
    constructor() {
        this.CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your Google OAuth client ID
        this.API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google API key
        this.SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
        this.DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'];
        
        this.toEmailsInput = document.getElementById('toEmails');
        this.subjectInput = document.getElementById('subject');
        this.messageInput = document.getElementById('message');
        this.sendButton = document.getElementById('sendButton');
        this.statusDiv = document.getElementById('status');
        this.charCount = document.getElementById('charCount');
        this.emailCount = document.getElementById('emailCount');
        this.bulkMode = document.getElementById('bulkMode');
        this.authSection = document.getElementById('authSection');
        this.emailSection = document.getElementById('emailSection');
        this.authButton = document.getElementById('authButton');
        this.signOutButton = document.getElementById('signOutButton');
        this.userEmailSpan = document.getElementById('userEmail');
        
        this.isAuthenticated = false;
        this.gapi = null;
        this.gapiLoaded = false;
        this.gisLoaded = false;
        
        this.initializeEventListeners();
        this.initializeGoogleAPIs();
        this.updateCharCount();
        this.updateEmailCount();
    }

    initializeEventListeners() {
        // Email count update
        this.toEmailsInput.addEventListener('input', () => {
            this.updateEmailCount();
        });

        // Character count update
        this.messageInput.addEventListener('input', () => {
            this.updateCharCount();
        });

        // Send button click
        this.sendButton.addEventListener('click', () => {
            this.sendEmails();
        });

        // Enter key support
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.sendEmails();
            }
        });

        // Auth button click
        this.authButton.addEventListener('click', () => {
            this.handleAuthClick();
        });

        // Sign out button click
        this.signOutButton.addEventListener('click', () => {
            this.handleSignOut();
        });

        // Bulk mode toggle
        this.bulkMode.addEventListener('change', () => {
            this.updateSendButtonText();
        });
    }

    async initializeGoogleAPIs() {
        try {
            // Load Google API
            await this.loadGapi();
            
            // Load Google Identity Services
            await this.loadGis();
            
            // Initialize the app
            this.initializeApp();
        } catch (error) {
            console.error('Failed to initialize Google APIs:', error);
            this.showStatus('Failed to load Google APIs. Please refresh the page.', 'error');
        }
    }

    async loadGapi() {
        return new Promise((resolve, reject) => {
            if (window.gapi) {
                this.gapi = window.gapi;
                resolve();
            } else {
                // Wait for gapi to load
                const checkGapi = setInterval(() => {
                    if (window.gapi) {
                        this.gapi = window.gapi;
                        clearInterval(checkGapi);
                        resolve();
                    }
                }, 100);
                
                // Timeout after 10 seconds
                setTimeout(() => {
                    clearInterval(checkGapi);
                    reject(new Error('GAPI failed to load'));
                }, 10000);
            }
        });
    }

    async loadGis() {
        return new Promise((resolve, reject) => {
            if (window.google) {
                resolve();
            } else {
                // Wait for Google Identity Services to load
                const checkGis = setInterval(() => {
                    if (window.google) {
                        clearInterval(checkGis);
                        resolve();
                    }
                }, 100);
                
                // Timeout after 10 seconds
                setTimeout(() => {
                    clearInterval(checkGis);
                    reject(new Error('Google Identity Services failed to load'));
                }, 10000);
            }
        });
    }

    async initializeApp() {
        try {
            // Initialize GAPI
            await this.gapi.load('client:auth2', async () => {
                await this.gapi.client.init({
                    apiKey: this.API_KEY,
                    clientId: this.CLIENT_ID,
                    scope: this.SCOPES.join(' '),
                    discoveryDocs: this.DISCOVERY_DOCS
                });

                // Check if user is already signed in
                if (this.gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    this.handleAuthSuccess();
                }
            });
        } catch (error) {
            console.error('Failed to initialize GAPI client:', error);
            this.showStatus('Failed to initialize Gmail API. Please check your configuration.', 'error');
        }
    }

    async handleAuthClick() {
        try {
            const authInstance = this.gapi.auth2.getAuthInstance();
            const user = await authInstance.signIn();
            
            if (user) {
                this.handleAuthSuccess();
            }
        } catch (error) {
            console.error('Authentication failed:', error);
            this.showStatus('Authentication failed. Please try again.', 'error');
        }
    }

    handleAuthSuccess() {
        this.isAuthenticated = true;
        const user = this.gapi.auth2.getAuthInstance().currentUser.get();
        const profile = user.getBasicProfile();
        
        // Update UI
        this.authSection.style.display = 'none';
        this.emailSection.style.display = 'block';
        this.userEmailSpan.textContent = profile.getEmail();
        
        this.showStatus('Successfully authenticated with Gmail! You can now send emails.', 'success');
        setTimeout(() => this.clearStatus(), 3000);
    }

    handleSignOut() {
        this.gapi.auth2.getAuthInstance().signOut().then(() => {
            this.isAuthenticated = false;
            this.authSection.style.display = 'block';
            this.emailSection.style.display = 'none';
            this.userEmailSpan.textContent = '';
            this.clearForm();
            this.showStatus('Signed out successfully.', 'info');
            setTimeout(() => this.clearStatus(), 3000);
        });
    }

    updateEmailCount() {
        const emails = this.getEmailAddresses();
        const count = emails.length;
        this.emailCount.textContent = count;
        this.updateSendButtonText();
    }

    updateSendButtonText() {
        const emails = this.getEmailAddresses();
        const count = emails.length;
        const isBulkMode = this.bulkMode.checked;
        
        if (count === 0) {
            this.sendButton.querySelector('.button-text').textContent = 'Enter Recipients';
        } else if (count === 1) {
            this.sendButton.querySelector('.button-text').textContent = 'Send Email';
        } else if (isBulkMode) {
            this.sendButton.querySelector('.button-text').textContent = `Send to ${count} Recipients`;
        } else {
            this.sendButton.querySelector('.button-text').textContent = `Send ${count} Individual Emails`;
        }
    }

    getEmailAddresses() {
        const input = this.toEmailsInput.value.trim();
        if (!input) return [];
        
        return input
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .filter(email => this.isValidEmail(email));
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateCharCount() {
        const count = this.messageInput.value.length;
        this.charCount.textContent = count;
        
        if (count > 1000) {
            this.charCount.style.color = '#dc2626';
        } else if (count > 800) {
            this.charCount.style.color = '#ea580c';
        } else {
            this.charCount.style.color = '#6b7280';
        }
    }

    validateForm() {
        const emails = this.getEmailAddresses();
        const subject = this.subjectInput.value.trim();
        const message = this.messageInput.value.trim();

        // Clear previous status
        this.clearStatus();

        // Validate emails
        if (emails.length === 0) {
            this.showStatus('Please enter at least one valid email address.', 'error');
            this.toEmailsInput.focus();
            return false;
        }

        if (emails.length > 20) {
            this.showStatus('Maximum 20 recipients allowed per batch.', 'error');
            this.toEmailsInput.focus();
            return false;
        }

        // Validate subject
        if (!subject) {
            this.showStatus('Please enter an email subject.', 'error');
            this.subjectInput.focus();
            return false;
        }

        if (subject.length > 100) {
            this.showStatus('Subject cannot exceed 100 characters.', 'error');
            this.subjectInput.focus();
            return false;
        }

        // Validate message
        if (!message) {
            this.showStatus('Please enter an email message.', 'error');
            this.messageInput.focus();
            return false;
        }

        if (message.length > 10000) {
            this.showStatus('Message cannot exceed 10,000 characters.', 'error');
            this.messageInput.focus();
            return false;
        }

        return true;
    }

    async sendEmails() {
        if (!this.validateForm()) {
            return;
        }

        if (!this.isAuthenticated) {
            this.showStatus('Please authenticate with Google first.', 'error');
            return;
        }

        const emails = this.getEmailAddresses();
        const subject = this.subjectInput.value.trim();
        const message = this.messageInput.value.trim();
        const isBulkMode = this.bulkMode.checked;

        // Show loading state
        this.setLoadingState(true);
        
        if (isBulkMode) {
            this.showStatus(`Sending email to ${emails.length} recipients...`, 'loading');
        } else {
            this.showStatus(`Sending ${emails.length} individual emails...`, 'loading');
        }

        try {
            let results;
            
            if (isBulkMode) {
                results = await this.sendBulkEmails(emails, subject, message);
            } else {
                results = await this.sendIndividualEmails(emails, subject, message);
            }
            
            // Show results
            this.showResults(results);
            
            // Clear form on success
            if (results.failed === 0) {
                this.clearForm();
            }
            
            // Reset button state
            this.setLoadingState(false);
            
        } catch (error) {
            this.showStatus(`Failed to send emails: ${error.message}`, 'error');
            this.setLoadingState(false);
        }
    }

    async sendBulkEmails(emails, subject, message) {
        const results = {
            total: emails.length,
            successful: 0,
            failed: 0,
            details: []
        };

        for (let i = 0; i < emails.length; i++) {
            const email = emails[i];
            try {
                await this.sendSingleEmail(email, subject, message);
                results.successful++;
                results.details.push({ email, status: 'success' });
            } catch (error) {
                results.failed++;
                results.details.push({ email, status: 'failed', error: error.message });
            }
            
            // Update progress
            if (i % 5 === 0 || i === emails.length - 1) {
                this.showStatus(`Progress: ${i + 1}/${emails.length} (${Math.round((i + 1) / emails.length * 100)}%)`, 'info');
            }
            
            // Small delay between sends to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        return results;
    }

    async sendIndividualEmails(emails, subject, message) {
        const results = {
            total: emails.length,
            successful: 0,
            failed: 0,
            details: []
        };

        for (let i = 0; i < emails.length; i++) {
            const email = emails[i];
            try {
                await this.sendSingleEmail(email, subject, message);
                results.successful++;
                results.details.push({ email, status: 'success' });
            } catch (error) {
                results.failed++;
                results.details.push({ email, status: 'failed', error: error.message });
            }
            
            // Update progress
            if (i % 5 === 0 || i === emails.length - 1) {
                this.showStatus(`Progress: ${i + 1}/${emails.length} (${Math.round((i + 1) / emails.length * 100)}%)`, 'info');
            }
            
            // Small delay between sends
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        return results;
    }

    async sendSingleEmail(to, subject, message) {
        try {
            // Create email in base64 format
            const email = this.createEmail(to, subject, message);
            
            // Send email using Gmail API
            const response = await this.gapi.client.gmail.users.messages.send({
                userId: 'me',
                resource: {
                    raw: email
                }
            });

            if (response.status === 200) {
                return response.result;
            } else {
                throw new Error(`Gmail API error: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to send email:', error);
            throw new Error(`Failed to send to ${to}: ${error.message}`);
        }
    }

    createEmail(to, subject, message) {
        const email = [
            `To: ${to}`,
            `Subject: ${subject}`,
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=utf-8',
            '',
            message
        ].join('\r\n');

        // Convert to base64
        return btoa(unescape(encodeURIComponent(email))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    showResults(results) {
        const { total, successful, failed } = results;
        
        if (failed === 0) {
            this.showStatus(`Success! Email sent to all ${total} recipients!`, 'success');
        } else if (successful === 0) {
            this.showStatus(`Failed! Could not send to any recipients.`, 'error');
        } else {
            this.showStatus(`Partial success: ${successful} successful, ${failed} failed`, 'info');
        }
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
        
        // Auto-scroll to status
        this.statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    clearStatus() {
        this.statusDiv.style.display = 'none';
        this.statusDiv.className = 'status';
    }

    clearForm() {
        this.toEmailsInput.value = '';
        this.subjectInput.value = '';
        this.messageInput.value = '';
        this.updateCharCount();
        this.updateEmailCount();
        this.toEmailsInput.focus();
    }

    // PWA installation prompt
    showInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show custom install button or notification
            this.showStatus('You can install this app on your home screen!', 'success');
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new GmailSenderApp();
    
    // Show install prompt if available
    app.showInstallPrompt();
    
    // Add offline/online status
    window.addEventListener('online', () => {
        app.showStatus('You are online', 'success');
        setTimeout(() => app.clearStatus(), 3000);
    });
    
    window.addEventListener('offline', () => {
        app.showStatus('You are offline', 'error');
    });
});