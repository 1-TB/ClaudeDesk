# ClaudeDesk

ClaudeDesk is a lightweight desktop application that provides quick access to Claude.ai through a global shortcut. Built with Electron, it runs in the system tray and offers a seamless way to interact with Claude.ai without keeping a browser tab open.

![ClaudeDesk Screenshot](https://i.imgur.com/pc1VyRn.png)

## Features

- 🚀 Quick access to Claude.ai through a global shortcut
- 🔄 Runs in system tray for minimal interference
- ⌨️ Customizable global shortcut
- 💻 Cross-platform support (macOS, Windows)
- 🎯 Focus mode - automatically hides when clicking outside
- 🔒 Persists your preferences between sessions

## Installation

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Setup

1. Clone the repository:
```bash
git clone https://github.com/1-TB/claudedesk.git
cd claudedesk
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

### Build

To create a distributable package:

```bash
npm run make
```

This will create platform-specific installers in the `out` directory.

## Usage

1. After starting the app, it will appear in your system tray
2. Press `Cmd/Ctrl+Shift+L` (default) to show/hide the window
3. Click the tray icon to toggle the window
4. Right-click the tray icon for additional options:
   - Show/Hide Window
   - Settings
   - Quit

### Customizing Shortcuts

1. Click the tray icon and select "Settings"
2. Click "Record Shortcut"
3. Press your desired key combination
4. The new shortcut will be saved automatically

## Development

### Project Structure

```
claudedesk/
├── package.json
├── src/
│   ├── main.js          # Main electron process
│   ├── preload.js       # Preload script for IPC
│   ├── settings.html    # Settings window
│   ├── styles.css       # Global styles
│   └── assets/
│       └── icons/       # Application icons
```

### Running in Development Mode

```bash
npm start
```

### Building for Distribution

1. For all platforms:
```bash
npm run make
```

2. For specific platforms:
```bash
# Windows
npm run make -- --platform win32

# macOS
npm run make -- --platform darwin

# Linux
npm run make -- --platform linux
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- Icon design inspired by Claude.ai
- Uses [electron-store](https://github.com/sindresorhus/electron-store) for settings persistence

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/1-TB/claudedesk/issues) page
2. Create a new issue if your problem isn't already listed
3. Join the [Discussions](https://github.com/1-TB/claudedesk/discussions) for general questions

## Security

ClaudeDesk does not store any user credentials or Claude.ai session data. All authentication is handled directly through the Claude.ai website.