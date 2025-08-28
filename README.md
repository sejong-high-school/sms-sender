# Gmail Sender PWA 📧

A Progressive Web App (PWA) designed to send emails using the **Google Gmail API**. This app features a modern, responsive design with Google OAuth authentication and real email sending capabilities.

## ✨ Features

- **📧 REAL EMAIL SENDING**: Actually sends emails using Gmail API!
- **🔐 Google OAuth**: Secure authentication with your Google account
- **📱 PWA Ready**: Installable on mobile and desktop devices
- **🔄 Bulk Send Mode**: Send the same email to multiple recipients
- **📝 Individual Send Mode**: Send individual emails to each recipient
- **📊 Email Validation**: Real-time email address validation
- **🎨 Modern UI**: Beautiful Gmail-inspired design with smooth animations
- **📱 Responsive Design**: Works perfectly on all device sizes
- **⚡ Fast Performance**: Optimized for speed and user experience
- **📈 Progress Tracking**: Real-time progress updates during sending
- **🔄 Offline Support**: Service worker for offline functionality

## 🚀 **Real Email Sending with Gmail API**

### **🔐 Google Authentication Required**
- **OAuth 2.0**: Secure authentication with your Google account
- **Gmail API Access**: Only sends emails, never reads your emails
- **Scoped Permissions**: Minimal access required for sending

### **📧 Actual Email Functionality**
- **Real Gmail API**: Uses official Google Gmail API
- **Base64 Encoding**: Properly formatted emails for Gmail
- **Rate Limiting**: Built-in delays to respect Gmail limits
- **Error Handling**: Comprehensive error reporting

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- **Google account with Gmail enabled**
- **Google Cloud Project with Gmail API enabled**
- **OAuth 2.0 credentials configured**

### Setup Instructions

#### 1. **Google Cloud Project Setup**

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Gmail API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Gmail API" and enable it

3. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized JavaScript origins (your domain)
   - Add authorized redirect URIs

4. **Get Your Credentials**:
   - Copy the **Client ID** and **API Key**
   - Update them in `app.js`

#### 2. **Update Configuration**

In `app.js`, replace the placeholder values:

```javascript
this.CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID'; // From Google Cloud Console
this.API_KEY = 'YOUR_ACTUAL_API_KEY';     // From Google Cloud Console
```

#### 3. **Installation**

1. **Clone or download** the project files
2. **Update credentials** in `app.js`
3. **Open** `index.html` in your web browser
4. **Install as PWA**: 
   - On mobile: Add to home screen when prompted
   - On desktop: Look for the install button in the address bar

### Local Development

1. **Set up a local server** (required for PWA features):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Open** `http://localhost:8000` in your browser

## 📁 Project Structure

```
gmail-sender-pwa/
├── index.html          # Main HTML file
├── styles.css          # CSS styling (Gmail-inspired)
├── app.js             # JavaScript with Gmail API integration
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
├── icons/            # App icons
│   └── icon.svg      # SVG icon source
└── README.md         # This file
```

## 🔧 Configuration

### PWA Settings

The app is configured as a PWA with:
- **Name**: Gmail Sender - Email PWA
- **Display**: Standalone (app-like experience)
- **Theme Color**: #EA4335 (Gmail Red)
- **Background Color**: #EA4335 (Gmail Red)

### Gmail API Integration

The app integrates with Gmail API using:
- **OAuth 2.0**: Secure authentication
- **Gmail API v1**: Official Google API
- **Send-only scope**: `https://www.googleapis.com/auth/gmail.send`
- **Base64 encoding**: Proper email formatting

## 📱 PWA Features

### Installation
- **Mobile**: Add to home screen for app-like experience
- **Desktop**: Install from browser for desktop app

### Offline Support
- App works offline after first visit
- Service worker caches essential resources
- Background sync for offline emails (when implemented)

### Notifications
- Push notification support for email delivery confirmations
- Custom notification actions

## 🎨 Customization

### Colors
The app uses Gmail-inspired colors that can be customized in `styles.css`:
- **Primary**: #EA4335 (Gmail Red)
- **Secondary**: #C62828 (Dark Red)
- **Background**: Linear gradient from #EA4335 to #C62828

### Language
The app is currently in English. To add more languages:
1. Add language files
2. Modify the `showStatus` function
3. Update HTML content

## 🌐 Browser Support

- ✅ Chrome 67+
- ✅ Firefox 67+
- ✅ Safari 11.1+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📋 Email Validation

The app validates email addresses:
- **Format**: Standard email format validation
- **Multiple Recipients**: Enter one email per line
- **Maximum**: Up to 20 recipients per batch
- **Real-time**: Instant validation feedback

## 🔒 Security Notes

- **OAuth 2.0**: Secure Google authentication
- **Gmail API**: Official Google API integration
- **Send-only**: Never reads your emails
- **HTTPS Required**: PWA features require HTTPS in production
- **API Keys**: Store securely, never expose in client-side code

## 🚀 Deployment

### Production Requirements
- **HTTPS**: Required for PWA features and Gmail API
- **Valid SSL Certificate**: For security and PWA installation
- **Proper Headers**: Cache and security headers
- **Google Cloud**: Configured OAuth credentials

### Hosting Options
- **Netlify**: Easy deployment with HTTPS
- **Vercel**: Great for PWAs
- **GitHub Pages**: Free hosting with HTTPS
- **AWS S3 + CloudFront**: Scalable solution

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter issues:
1. Check browser console for errors
2. Ensure you're using HTTPS in production
3. Verify service worker registration
4. Check PWA manifest validity
5. **For Gmail API issues**: Verify OAuth credentials and API enablement
6. **For authentication issues**: Check Google Cloud Console settings

## 🔮 Future Enhancements

- [ ] Enhanced Gmail API integration
- [ ] Email templates
- [ ] Contact management
- [ ] Email history
- [ ] Delivery confirmations
- [ ] Scheduled emails
- [ ] Multi-language support expansion
- [ ] CSV/Excel import for recipients
- [ ] Email personalization per recipient
- [ ] Rate limiting controls
- [ ] Delivery reports
- [ ] Email delivery status tracking
- [ ] Draft saving
- [ ] Rich text editor
- [ ] File attachments

## 📱 Usage Guide

### **Sending Emails with Gmail API**

#### **First Time Setup:**
1. **Google Authentication**: Click "Sign in with Google"
2. **Grant Permissions**: Allow Gmail API access
3. **Verify Account**: Confirm your email address

#### **Sending Emails:**
1. **Enter Recipients**: Type email addresses (one per line)
2. **Write Subject**: Enter email subject (max 100 characters)
3. **Compose Message**: Write your email (max 10,000 characters)
4. **Choose Mode**: Bulk or individual sending
5. **Send**: Click send button and monitor progress

### Email Formatting

The app automatically formats emails for Gmail:
- **Headers**: Proper To, Subject, MIME headers
- **Encoding**: Base64 encoding for Gmail API
- **Formatting**: Clean, readable email structure

### Progress Tracking

During email sending, you'll see:
- Real-time progress updates
- Success/failure counts
- Individual recipient status
- Completion summary

## 🔧 Technical Implementation

### **Gmail API Integration**
- **OAuth 2.0 Flow**: Secure authentication
- **Gmail API v1**: Official Google REST API
- **Base64 Encoding**: RFC 2822 compliant emails
- **Rate Limiting**: Built-in delays (1 second between sends)

### **PWA Features**
- **Service Worker**: Offline caching and sync
- **Manifest**: App-like installation
- **Responsive Design**: Mobile-first approach
- **Modern APIs**: ES6+, async/await, fetch

### **Security Features**
- **OAuth 2.0**: Google's secure authentication
- **Scoped Access**: Minimal permissions required
- **HTTPS Only**: Secure communication
- **No Data Storage**: Emails not stored locally

---

**🎉 Key Feature: Real email sending using Gmail API with secure OAuth authentication!**

**🎉 핵심 기능: Gmail API를 사용한 실제 이메일 전송과 안전한 OAuth 인증!**