# SMS Korea PWA 📱

A Progressive Web App (PWA) designed to send **REAL SMS messages** to multiple South Korean phone numbers. This app features a modern, responsive design with bilingual support (Korean/English), bulk sending capabilities, and **native SMS functionality on mobile devices**.

## ✨ Features

- **📱 REAL SMS SENDING**: Actually sends SMS messages on mobile devices!
- **🇰🇷 Korean Phone Number Support**: Validates and formats Korean mobile numbers (010-XXXX-XXXX)
- **🔄 Bulk Send Mode**: Send the same message to all numbers at once
- **📝 Individual Send Mode**: Send individual messages to each number
- **🌐 Bilingual Support**: Korean and English interface
- **📱 PWA Ready**: Installable on mobile and desktop devices
- **🔄 Offline Support**: Service worker for offline functionality
- **📝 Character Counter**: Real-time message length tracking (500 character limit)
- **📊 Phone Number Counter**: Real-time count of valid phone numbers
- **🎨 Modern UI**: Beautiful gradient design with smooth animations
- **📱 Responsive Design**: Works perfectly on all device sizes
- **⚡ Fast Performance**: Optimized for speed and user experience
- **📈 Progress Tracking**: Real-time progress updates during bulk sending
- **📱 Native SMS Integration**: Opens default SMS app on mobile devices

## 🚀 **실제 SMS 전송 (Real SMS Sending)**

### **📱 모바일에서 실제 SMS 전송**
- **PWA 설치 후**: 홈 화면에 설치하면 네이티브 앱처럼 작동
- **자동 SMS 앱 열기**: 전화번호와 메시지가 자동으로 입력됨
- **삼성 메시지, 카카오톡 등**: 기본 SMS 앱과 동일하게 작동
- **실제 SMS 전송**: 사용자가 전송 버튼만 누르면 됨

### **💻 데스크톱에서 사용**
- **시뮬레이션 모드**: 실제 SMS 전송을 시뮬레이션
- **SMS API 연동**: Twilio, Nexmo 등 SMS 서비스와 연동 가능

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- **Mobile device recommended** for real SMS functionality
- For actual SMS sending on desktop: An SMS API service (Twilio, Nexmo, etc.)

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
├── app.js             # JavaScript functionality with real SMS
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
├── icons/            # App icons
│   └── icon.svg      # SVG icon source
└── README.md         # This file
```

## 🔧 Configuration

### PWA Settings

The app is configured as a PWA with:
- **Name**: SMS Korea - 실제 SMS 전송
- **Display**: Standalone (app-like experience)
- **Theme Color**: #4F46E5 (Indigo)
- **Background Color**: #667eea (Blue gradient)

### SMS API Integration

To enable actual SMS sending on desktop, you'll need to:

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
- **Mobile**: Add to home screen for app-like experience with real SMS
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
- **Multiple Numbers**: Enter one number per line
- **Maximum**: Up to 10 numbers per batch (for real SMS)

## 🔒 Security Notes

- **Real SMS on Mobile**: PWA 설치 후 모바일에서 실제 SMS 전송 가능
- **Desktop Simulation**: 데스크톱에서는 시뮬레이션 모드
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
5. **For SMS issues**: Ensure PWA is installed on mobile device

## 🔮 Future Enhancements

- [ ] Enhanced SMS API integration
- [ ] Message templates
- [ ] Contact management
- [ ] Message history
- [ ] Delivery confirmations
- [ ] Scheduled messages
- [ ] Multi-language support expansion
- [ ] CSV/Excel import for phone numbers
- [ ] Message personalization per recipient
- [ ] Rate limiting controls
- [ ] Delivery reports
- [ ] SMS delivery status tracking

## 📱 Usage Guide

### **실제 SMS 전송 (Real SMS Sending)**

#### **모바일 PWA 설치 후:**
1. **PWA 설치**: 브라우저에서 "홈 화면에 추가" 선택
2. **홈 화면에서 실행**: 네이티브 앱처럼 작동
3. **전화번호 입력**: 한 줄에 하나씩 번호 입력
4. **메시지 작성**: SMS 메시지 입력 (최대 500자)
5. **SMS 전송**: 버튼 클릭 시 자동으로 SMS 앱 열림
6. **전송 완료**: 사용자가 SMS 앱에서 전송 버튼만 누르면 됨

#### **데스크톱에서:**
1. **시뮬레이션 모드**: 실제 SMS 전송을 시뮬레이션
2. **SMS API 연동**: Twilio 등 SMS 서비스와 연동하여 실제 전송

### Sending to Multiple Numbers

1. **Enter Phone Numbers**: 
   - Type or paste phone numbers, one per line
   - Example:
     ```
     010-1234-5678
     010-8765-4321
     010-5555-1234
     ```

2. **Choose Send Mode**:
   - **Bulk Mode**: Same message to all numbers (faster)
   - **Individual Mode**: Individual messages to each number

3. **Write Message**: 
   - Enter your SMS message (max 500 characters)
   - Character counter shows remaining space

4. **Send**: 
   - Click the send button
   - **Mobile**: SMS app opens automatically
   - **Desktop**: Simulation mode or API integration

### Phone Number Formatting

The app automatically formats phone numbers as you type:
- **Input**: 01012345678
- **Formatted**: 010-1234-5678
- **Validated**: Only Korean mobile numbers accepted

### Progress Tracking

During bulk sending, you'll see:
- Real-time progress updates
- Success/failure counts
- Individual number status
- Completion summary

## 🔧 Technical Implementation

### **Real SMS on Mobile**
- **SMS URL Scheme**: `sms:01012345678?body=message`
- **Web Share API**: Modern browsers support
- **Fallback**: Direct SMS URL navigation
- **PWA Integration**: Seamless native app experience

### **Desktop Fallback**
- **Simulation Mode**: Demo functionality
- **API Integration**: SMS service providers
- **Error Handling**: Graceful degradation

---

**🎉 핵심 기능: 모바일 PWA 설치 후 실제 SMS 전송이 가능합니다!**

**🎉 Key Feature: Real SMS sending is possible after installing PWA on mobile!**