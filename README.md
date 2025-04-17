# MCP Config Manager

A browser extension for managing MCP server configurations with an intuitive interface - designed to solve the common frustrations you face every day.

## 💡 Why MCP Config Manager?

Ever found yourself saying:

- "How do I add this MCP? The JSON is driving me crazy!"
- "I have so many MCPs in my system, I can't tell which is which!"
- "Why is it so complicated to delete an MCP?"
- "Why do my commands always fail on Windows? I need Mac-to-Windows format conversion!"

MCP Config Manager was built specifically to solve these pain points. No more struggling with complex JSON formats, disorganized configurations, or cross-platform compatibility issues.

## ✨ Features

- 🚀 Easy server configuration management without JSON headaches
- 💻 One-click cross-platform support for Windows & Mac
- 🔄 Automatic JSON validation and formatting
- 🌐 Multi-language support (English & Chinese)
- 📋 One-click configuration copying
- 🔄 Enable/disable servers with simple toggles
- 🎨 Modern and intuitive UI that even non-technical users can understand
- 💾 Browser storage for persistent configurations
- 🔒 All data stays local - complete privacy protection

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
        "@sinco-lab/mcp-youtube-transcript"
      ]
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