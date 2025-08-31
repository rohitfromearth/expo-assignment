# Expo Video Player & Web Browser App

A React Native app built with Expo that combines video streaming and web browsing functionality. This project demonstrates mobile app development using modern React Native practices.

## What This App Does

This app lets you:
- Browse websites in a built-in web browser
- Watch videos with full playback controls
- Test push notifications
- Switch between different video streams

## Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation Steps

1. **Install Expo CLI globally** (if you haven't already):
   ```bash
   npm install -g @expo/cli
   ```

2. **Clone or download this project** to your local machine

3. **Navigate to the project directory**:
   ```bash
   cd expo-assignment
   ```

4. **Install project dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npx expo start
   ```

### Running the App

After starting the development server, you'll see a QR code in your terminal. You can:

- **On Android**: Scan the QR code with the Expo Go app
- **On iOS**: Scan the QR code with your camera app
- **On Web**: Press `w` in the terminal to open in browser
- **On Simulator**: Press `a` for Android emulator or `i` for iOS simulator

### Alternative Commands

If you prefer using npm scripts:
```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
```

## Project Structure

```
expo-assignment/
├── App.js                 # Main app entry point
├── components/
│   └── CustomButton.js    # Reusable button component
├── screens/
│   ├── VideoHomeScreen.js # Video selection interface
│   ├── VideoPlayerScreen.js # Video player with controls
│   └── WebViewScreen.js   # Web browser screen
├── assets/                # App icons and images
├── package.json           # Dependencies and scripts
└── app.json              # Expo configuration
```

## Key Features

### Video Player
- Choose from multiple video streams
- Full playback controls (play/pause, seek, volume, fullscreen)
- Responsive design that works on different screen sizes

### Web Browser
- Built-in web browser using WebView
- Test notification functionality
- Navigate between app sections

### Notifications
- Schedule test notifications
- Navigate to different screens via notifications
- Permission handling for notifications

## Dependencies

The main packages used in this project:
- `expo` - React Native development platform
- `expo-av` - Video and audio playback
- `react-native-webview` - Web browser functionality
- `expo-notifications` - Push notifications
- `@react-navigation/native` - Navigation framework
- `@react-native-community/slider` - Video seek slider

## Troubleshooting

### Common Issues

**"Expo Go not found"**: Make sure you have the Expo Go app installed on your device.

**"Metro bundler error"**: Try clearing the cache:
```bash
npx expo start --clear
```

**"Dependencies not found"**: Delete node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

**Notifications not working**: Notifications require a development build for full functionality. In Expo Go, they may be limited.

### Development Notes

- The app is configured for portrait orientation
- Video streams are from public test sources
- WebView loads a sample educational website
- Color scheme uses a custom palette for consistent branding

## Next Steps

To extend this project, you could:
- Add more video sources
- Implement user authentication
- Add video favorites functionality
- Create a custom video player skin
- Integrate with a backend API

---

*Built with React Native and Expo*
