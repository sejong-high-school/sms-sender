# SMS Korea PWA 📱

A Progressive Web App (PWA) designed to send SMS messages to South Korean phone numbers. This app features a modern, responsive design with bilingual support (Korean/English) and PWA capabilities.

## ✨ Features

- **📱 SMS Sending Interface**: Clean, intuitive form for entering phone numbers and messages
- **🇰🇷 Korean Phone Number Support**: Validates and formats Korean mobile numbers (010-XXXX-XXXX)
- **🌐 Bilingual Support**: Korean and English interface
- **📱 PWA Ready**: Installable on mobile and desktop devices
- **🔄 Offline Support**: Service worker for offline functionality
- **📝 Character Counter**: Real-time message length tracking (500 character limit)
- **🎨 Modern UI**: Beautiful gradient design with smooth animations
- **📱 Responsive Design**: Works perfectly on all device sizes
- **⚡ Fast Performance**: Optimized for speed and user experience

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- For actual SMS sending: An SMS API service (Twilio, Nexmo, etc.)

### Installation

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Install as PWA**: 
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
sms-korea-pwa/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── app.js             # JavaScript functionality
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
├── icons/            # App icons
│   └── icon.svg      # SVG icon source
└── README.md         # This file
```

## 🔧 Configuration

### PWA Settings

The app is configured as a PWA with:
- **Name**: SMS Korea - 메시지 전송
- **Display**: Standalone (app-like experience)
- **Theme Color**: #4F46E5 (Indigo)
- **Background Color**: #667eea (Blue gradient)

### SMS API Integration

To enable actual SMS sending, you'll need to:

1. **Choose an SMS API service**:
   - [Twilio](https://www.twilio.com/sms)
   - [Nexmo/Vonage](https://www.vonage.com/communications-apis/sms/)
   - [AWS SNS](https://aws.amazon.com/sns/)
   - Local Korean SMS gateways

2. **Modify the `sendSMS` function** in `app.js`:
   ```javascript
   async function sendSMS(phone, message) {
       // Replace with your actual API call
       const response = await fetch('your-sms-api-endpoint', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer YOUR_API_KEY'
           },
           body: JSON.stringify({
               to: phone,
               message: message
           })
       });
       
       return response.json();
   }
   ```

## 📱 PWA Features

### Installation
- **Mobile**: Add to home screen for app-like experience
- **Desktop**: Install from browser for desktop app

### Offline Support
- App works offline after first visit
- Service worker caches essential resources
- Background sync for offline SMS (when implemented)

### Notifications
- Push notification support for SMS delivery confirmations
- Custom notification actions

## 🎨 Customization

### Colors
The app uses a modern color scheme that can be customized in `styles.css`:
- **Primary**: #4F46E5 (Indigo)
- **Secondary**: #7C3AED (Purple)
- **Background**: Linear gradient from #667eea to #764ba2

### Language
The app supports Korean and English. To add more languages:
1. Add language files
2. Modify the `showStatus` function
3. Update HTML content

## 🌐 Browser Support

- ✅ Chrome 67+
- ✅ Firefox 67+
- ✅ Safari 11.1+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📋 Phone Number Validation

The app validates Korean mobile numbers:
- **Format**: XXX-XXXX-XXXX
- **Prefixes**: 010, 011, 016, 017, 018, 019
- **Example**: 010-1234-5678

## 🔒 Security Notes

- **Demo Mode**: This app currently runs in demo mode
- **No Real SMS**: Messages are simulated for demonstration
- **API Keys**: Never expose API keys in client-side code
- **HTTPS Required**: PWA features require HTTPS in production

## 🚀 Deployment

### Production Requirements
- **HTTPS**: Required for PWA features
- **Valid SSL Certificate**: For security and PWA installation
- **Proper Headers**: Cache and security headers

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

## 🔮 Future Enhancements

- [ ] Real SMS API integration
- [ ] Message templates
- [ ] Contact management
- [ ] Message history
- [ ] Delivery confirmations
- [ ] Bulk messaging
- [ ] Scheduled messages
- [ ] Multi-language support expansion

---

**Note**: This is a demonstration PWA. For production use, integrate with a real SMS service and implement proper security measures.