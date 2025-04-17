# MCP Config Manager

A browser extension for managing MCP server configurations with an intuitive interface.

## ✨ Features

- 🚀 Easy server configuration management
- 💻 Cross-platform support for Windows & Mac
- 🔄 JSON validation and formatting
- 🌐 Multi-language support (English & Chinese)
- 📋 One-click configuration copying
- 🎨 Modern and intuitive UI
- 💾 Browser storage for persistent configurations

## 📥 Installation

### Chrome / Edge / Chromium-based browsers

1. Download the latest release from the [Releases](../../releases) page
2. Go to `chrome://extensions/` or `edge://extensions/`
3. Enable "Developer mode" (top-right corner)
4. Click "Load unpacked"
5. Select the extracted extension folder

### Firefox

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select the `manifest.json` file in the extension folder

## 🚀 Usage

1. Click the MCP icon in your browser toolbar to open the extension
2. Click "Add" to add a new server configuration
3. Fill in the server name and JSON configuration
4. Use the toggle switch to enable/disable servers
5. Click "Copy" to copy all enabled server configurations
6. Use the platform toggle at the top to switch between Windows and Mac configurations

## 📝 Configuration Format

The MCP server configuration should follow this format:

```json
{
  "mcpServers": {
    "serverName": {
      "command": "npx",
      "args": [
        "-y",
        "mcprouter"
      ],
      "env": {
        "SERVER_KEY": "your_key_here"
      }
    }
  }
}
```

## 🔒 Privacy

This extension runs entirely locally and does not send your data to any servers. All configuration information is stored in your browser's local storage.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[MIT](LICENSE) 