# Video Player & Web Browser App

A React Native app with video player and web browser functionality.

## Features

### Video Player
- Video selection screen with dropdown menu
- Full video player with controls
- Responsive design for different screen sizes
- Video controls: play/pause, mute, seek, skip, fullscreen
- Multiple video streams available

### Web Browser
- WebView for browsing websites
- Notification testing buttons
- Responsive layout

### Navigation
- Bottom tab navigation
- Stack navigation between screens
- Notification navigation support

### Notifications
- Quick and delayed notifications
- Navigation via notifications
- Permission handling

## Technical Features

### Responsive Design
- Components adapt to different screen sizes
- Portrait and landscape orientation support
- Dynamic sizing based on screen dimensions
- Safe area handling

### Video Player Features
- Native video playback with Expo AV
- Custom video controls
- Multiple video stream support
- Fullscreen playback
- Video seeking with slider

### Web Browser Features
- WebView for web browsing
- Notification integration
- Responsive button layout

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Run on your preferred platform:
   ```bash
   npm run android
   npm run ios
   npm run web
   ```

## Note on Notifications

Notifications may not work in Expo Go. For full functionality, consider using a development build.

## Dependencies

- `@react-navigation/native` - Navigation framework
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/stack` - Stack navigation
- `expo-av` - Video and audio playback
- `react-native-webview` - Web browser functionality
- `expo-notifications` - Push notifications
- `@react-native-community/slider` - Video seek slider
- `@expo/vector-icons` - Icon library

## Project Structure

```
expo-assignment/
├── App.js                 # Main app with navigation setup
├── components/
│   └── CustomButton.js    # Reusable button component
├── screens/
│   ├── VideoHomeScreen.js # Video selection screen
│   ├── VideoPlayerScreen.js # Video player screen
│   └── WebViewScreen.js   # Web browser screen
└── assets/                # App icons and images
```

## Usage

1. Use the Web Browser tab to browse websites
2. Use the Video Player tab to select and watch videos
3. Test notifications using the buttons
4. Use video controls to manage playback

## Responsive Design

The app works across different device sizes:

- Small screens: Components scale appropriately
- Large screens: Efficient space utilization
- Tablets: Optimized layouts
- Orientation changes: Automatic adjustments
- Safe areas: Proper device handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
