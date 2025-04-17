// Initial data (empty array)
const initialServers = [];

// Current platform (defaults to Windows)
let currentPlatform = 'windows';

// Current language (defaults to English, will automatically adjust based on browser or system language)
let currentLanguage = 'en';

// Language pack definition
const i18n = {
  'zh': {
    'platform_win': 'Win',
    'platform_mac': 'Mac', 
    'btn_copy': '复制',
    'btn_add': '添加',
    'btn_clear': '清空',
    'server_list': '服务器列表',
    'no_command': '无命令',
    'no_args': '无参数',
    'no_env': '无环境变量',
    'args_count': '{0} 参数',
    'env_count': '{0} 环境变量',
    'enabled': '已启用',
    'disabled': '已禁用',
    'add_server': '添加服务器',
    'edit_server': '编辑服务器',
    'server_name': '服务器名称',
    'server_name_placeholder': '输入服务器名称，此栏可留空',
    'server_name_tip': '如果您在JSON配置中已指定服务器名称，此栏可留空',
    'json_config': 'JSON 配置',
    'json_tip': '支持多种格式：完整mcpServers格式、仅服务器对象，或包含多个服务器的配置',
    'json_tip_edit': '支持多种格式：完整mcpServers格式、仅服务器对象，或单个服务器配置',
    'validate_json': '验证 JSON',
    'save_server': '保存服务器',
    'update_server': '更新服务器',
    'copy_success': '已复制到剪贴板',
    'confirm_delete_all': '确定要删除所有服务器吗？此操作不可撤销。',
    'no_servers_to_delete': '没有服务器可删除',
    'no_servers_to_copy': '没有开启的服务器配置可供复制！',
    'confirm_multiple_servers': '配置包含多个服务器，只会更新第一个服务器。是否继续？',
    'no_servers_found': '配置中没有找到服务器',
    'enter_server_name': '请输入服务器名称',
    'invalid_json': 'JSON 配置无效: ',
    'valid_json': '有效的 JSON 配置',
    'example_title': '配置示例',
    'example_template': '参考模板',
    'example_tip': '添加你的第一个服务器配置，开始使用 MCP 管理工具',
    'footer_text': 'MCP 服务器管理工具 • 简单高效的配置解决方案',
    'confirm_delete_server': '确定要删除此服务器吗？',
    'app_title': 'MCP 管理器'
  },
  'en': {
    'platform_win': 'Win',
    'platform_mac': 'Mac',
    'btn_copy': 'Copy',
    'btn_add': 'Add',
    'btn_clear': 'Clear',
    'server_list': 'Server List',
    'no_command': 'No Command',
    'no_args': 'No Args',
    'no_env': 'No Env',
    'args_count': '{0} Args',
    'env_count': '{0} Env Vars',
    'enabled': 'Enabled',
    'disabled': 'Disabled',
    'add_server': 'Add Server',
    'edit_server': 'Edit Server',
    'server_name': 'Server Name',
    'server_name_placeholder': 'Enter server name, can be empty',
    'server_name_tip': 'If server name is specified in JSON, this field can be left empty',
    'json_config': 'JSON Configuration',
    'json_tip': 'Supports multiple formats: full mcpServers format, server object only, or multiple servers',
    'json_tip_edit': 'Supports multiple formats: full mcpServers format, server object only, or single server config',
    'validate_json': 'Validate JSON',
    'save_server': 'Save Server',
    'update_server': 'Update Server',
    'copy_success': 'Copied to clipboard',
    'confirm_delete_all': 'Are you sure you want to delete all servers? This cannot be undone.',
    'no_servers_to_delete': 'No servers to delete',
    'no_servers_to_copy': 'No enabled servers to copy!',
    'confirm_multiple_servers': 'Config contains multiple servers, only the first one will be updated. Continue?',
    'no_servers_found': 'No servers found in config',
    'enter_server_name': 'Please enter a server name',
    'invalid_json': 'Invalid JSON: ',
    'valid_json': 'Valid JSON configuration',
    'example_title': 'Example Configuration',
    'example_template': 'Template',
    'example_tip': 'Add your first server configuration to start using MCP Manager',
    'footer_text': 'MCP Server Manager • Simple and effective configuration solution',
    'confirm_delete_server': 'Are you sure you want to delete this server?',
    'app_title': 'MCP Manager'
  }
};

// Detect system language and set current language
function detectLanguage() {
    try {
        // Try to get the current language from the Chrome internationalization API
        if (chrome && chrome.i18n) {
            // Chrome extensions automatically select the correct localization file based on browser language
            // We can get the base language code from the UI language
            const uiLanguage = chrome.i18n.getUILanguage();
            // Take only the language code part, e.g., "en-US" becomes "en"
            const langCode = uiLanguage.split('-')[0];
            
            // Check if the language is supported, use it if supported, otherwise default to English
            if (i18n[langCode]) {
                currentLanguage = langCode;
            } else {
                currentLanguage = 'en'; // Default to English
            }
            
            console.log('Current language:', currentLanguage);
        } else {
            // Fallback to browser language detection
            const browserLang = navigator.language || navigator.userLanguage;
            const langCode = browserLang.split('-')[0];
            
            if (i18n[langCode]) {
                currentLanguage = langCode;
            } else {
                currentLanguage = 'en';
            }
        }
    } catch (e) {
        console.error('Language detection error:', e);
        currentLanguage = 'en'; // Use English on error
    }
}

// Translation function
function t(key, params) {
    // Try to get translation from Chrome internationalization API
    if (chrome && chrome.i18n && chrome.i18n.getMessage(key)) {
        const chromeMessage = chrome.i18n.getMessage(key);
        if (chromeMessage) {
            // If Chrome provides a translation, prioritize using it
            if (params) {
                return chromeMessage.replace(/\$(\d+)\$/g, (match, index) => {
                    return params[parseInt(index) - 1] !== undefined ? params[parseInt(index) - 1] : match;
                });
            }
            return chromeMessage;
        }
    }
    
    // Fallback to built-in translation
    const text = i18n[currentLanguage][key] || key;
    
    // Replace parameters {0}, {1}, ...
    if (params) {
        return text.replace(/\{(\d+)\}/g, (match, index) => {
            return params[parseInt(index)] !== undefined ? params[parseInt(index)] : match;
        });
    }
    
    return text;
}

// Global event handler functions
// Toggle server status
function toggleServer(id) {
    const server = initialServers.find(s => s.id === id);
    if (server) {
        server.enabled = !server.enabled;
        console.log(`${server.name} status changed to: ${server.enabled ? 'enabled' : 'disabled'}`);
        // Save to storage
        saveToStorage();
        renderServerList();
    }
}

// Edit server
function editServer(id) {
    const server = initialServers.find(s => s.id === id);
    if (server) {
        // Fill the edit form
        document.getElementById('editServerName').value = server.name;
        document.getElementById('editJsonConfig').value = JSON.stringify(server.config, null, 2);
        document.getElementById('editServerId').value = server.id;
        editJsonStatus.textContent = '';
        
        // Show the edit modal
        editServerModal.style.display = 'flex';
    }
}

// Delete server
function deleteServer(id) {
    if (chrome && chrome.i18n) {
        // Use Chrome's confirmation dialog
        if (window.confirm(t('confirm_delete_server'))) {
            const index = initialServers.findIndex(s => s.id === id);
            if (index !== -1) {
                initialServers.splice(index, 1);
                renderServerList();
                console.log(`Deleted server ID: ${id}`);
                // Save to storage
                saveToStorage();
            }
        }
    } else {
        // Fallback to standard confirmation dialog
        if (confirm(`${t('confirm_delete_server')}`)) {
            const index = initialServers.findIndex(s => s.id === id);
            if (index !== -1) {
                initialServers.splice(index, 1);
                renderServerList();
                console.log(`Deleted server ID: ${id}`);
                // Save to storage
                saveToStorage();
            }
        }
    }
}

// Copy single server config
function copyConfig(id) {
    const server = initialServers.find(s => s.id === id);
    if (server) {
        // Create the required full mcpServers format
        const fullConfig = {
            mcpServers: {
                [server.name]: server.config
            }
        };
        
        // Remove empty env object
        const displayConfig = JSON.parse(JSON.stringify(fullConfig));
        for (const serverName in displayConfig.mcpServers) {
            if (displayConfig.mcpServers[serverName].env && 
                Object.keys(displayConfig.mcpServers[serverName].env).length === 0) {
                delete displayConfig.mcpServers[serverName].env;
            }
        }
        
        copyToClipboard(JSON.stringify(displayConfig, null, 2));
    }
}

// DOM Elements
const serverList = document.getElementById('serverList');
const addServerBtn = document.getElementById('addServerBtn');
const addServerModal = document.getElementById('addServerModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const saveServerBtn = document.getElementById('saveServerBtn');
const validateJsonBtn = document.getElementById('validateJsonBtn');
const jsonStatus = document.getElementById('jsonStatus');
const copyAllBtn = document.getElementById('copyAllBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const copySuccessToast = document.getElementById('copySuccessToast');

// Edit modal elements
const editServerModal = document.getElementById('editServerModal');
const closeEditModalBtn = document.getElementById('closeEditModalBtn');
const updateServerBtn = document.getElementById('updateServerBtn');
const validateEditJsonBtn = document.getElementById('validateEditJsonBtn');
const editJsonStatus = document.getElementById('editJsonStatus');

// Platform switch buttons
const windowsBtn = document.getElementById('windowsBtn');
const macBtn = document.getElementById('macBtn');

// Render server list
function renderServerList() {
    serverList.innerHTML = '';
    
    if (initialServers.length === 0) {
        // Add example list
        const exampleDiv = document.createElement('div');
        exampleDiv.className = 'p-4 rounded-2xl bg-[#1e293b] shadow-lg animate-fadeIn';
        
        // Create example of correct config item format
        const configItemStr = `{` +
`\n  "mcpServers": {` +
`\n    "github": {` +
`\n      "command": "npx",` +
`\n      "args": [` +
`\n        "-y",` +
`\n        "mcprouter"` +
`\n      ],` +
`\n      "env": {` +
`\n        "SERVER_KEY": "yssu48c"` +
`\n      }` +
`\n    }` +
`\n  }` +
`\n}`; // Keep formatting as multiline string
        
        // Use syntax highlighting styles
        exampleDiv.innerHTML = `
            <div>
                <div class="flex items-center justify-between mb-4">
                    <p class="text-lg font-semibold text-blue-400 flex items-center">
                        <i class="fas fa-info-circle mr-2"></i>${t('example_title')}
                    </p>
                    <span class="bg-blue-500 bg-opacity-20 text-blue-400 text-xs px-3 py-1 rounded-full">${t('example_template')}</span>
                </div>
                <pre class="mb-4">${enhancedJsonHighlight(configItemStr)}</pre>
                <p class="text-gray-400 text-xs flex items-center mt-4">
                    <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                    <span>${t('example_tip')}</span>
                </p>
            </div>
        `;
        
        serverList.appendChild(exampleDiv);
        return;
    }
    
    initialServers.forEach(server => {
        const serverItem = document.createElement('div');
        serverItem.className = 'server-item rounded-2xl bg-[#1e293b] shadow-lg animate-fadeIn overflow-hidden transition-all duration-300';
        serverItem.dataset.id = server.id;
        serverItem.dataset.expanded = "false";
        
        // Convert config to readable string, preserving all quotes and special characters, and remove empty env
        const configStr = formatConfigForDisplay(server.config);
        
        // Prepare display text for environment variables and arguments
        const commandText = server.config.command || t('no_command');
        const argsText = Array.isArray(server.config.args) && server.config.args.length > 0 
            ? t('args_count', [server.config.args.length]) 
            : t('no_args');
        const envText = server.config.env && Object.keys(server.config.env).length > 0 
            ? t('env_count', [Object.keys(server.config.env).length]) 
            : t('no_env');
        
        // Server header (always visible)
        const headerHTML = `
            <div class="p-4 cursor-pointer hover:bg-[#1a2234] transition-colors duration-200 server-header">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="status-indicator ${server.enabled ? 'status-enabled' : 'status-disabled'}"></span>
                        <h3 class="text-lg font-medium text-white">${server.name}</h3>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="server-toggle-container" title="${server.enabled ? t('enabled') : t('disabled')}">
                            <label class="flex items-center cursor-pointer">
                                <div class="relative">
                                    <input type="checkbox" class="sr-only toggle-server" ${server.enabled ? 'checked' : ''} data-id="${server.id}">
                                    <div class="toggle-bg transition-all ${server.enabled ? 'bg-blue-500' : ''}"></div>
                                    <div class="toggle-dot absolute transition-all shadow-md ${server.enabled ? 'translate-x-6' : ''}"></div>
                                </div>
                            </label>
                        </div>
                        <button class="toggle-details">
                            <i class="fas fa-chevron-circle-down transition-transform duration-300"></i>
                        </button>
                    </div>
                </div>
                
                <div class="mt-2 text-xs text-gray-400 flex items-center">
                    <i class="fas fa-code-branch mr-2"></i>
                    <span>${commandText}</span>
                    <span class="mx-2">•</span>
                    <i class="fas fa-terminal mr-2"></i>
                    <span>${argsText}</span>
                    <span class="mx-2">•</span>
                    <i class="fas fa-cog mr-2"></i>
                    <span>${envText}</span>
                </div>
            </div>
        `;
        
        // Server details (hidden by default)
        const detailsHTML = `
            <div class="server-details p-4 pt-0 border-t border-gray-700 hidden">
                <div class="bg-[#111827] rounded-lg p-4">
                    <pre class="text-xs">${enhancedJsonHighlight(configStr)}</pre>
                </div>
                <div class="flex justify-end mt-4 gap-2">
                    <button class="copy-btn btn-action bg-[#1a1f35] hover:bg-blue-900 hover:text-blue-400 w-9 h-9 rounded-full flex items-center justify-center transition-all" title="复制配置" data-id="${server.id}">
                        <i class="fas fa-copy text-white"></i>
                    </button>
                    <button class="edit-btn btn-action bg-[#1a1f35] hover:bg-blue-900 hover:text-blue-400 w-9 h-9 rounded-full flex items-center justify-center transition-all" title="编辑服务器" data-id="${server.id}">
                        <i class="fas fa-edit text-white"></i>
                    </button>
                    <button class="delete-btn btn-action bg-[#1a1f35] hover:bg-red-900 hover:text-red-400 w-9 h-9 rounded-full flex items-center justify-center transition-all" title="删除服务器" data-id="${server.id}">
                        <i class="fas fa-trash-alt text-white"></i>
                    </button>
                </div>
            </div>
        `;
        
        serverItem.innerHTML = headerHTML + detailsHTML;
        
        // Add click event to expand/collapse
        serverItem.querySelector('.server-header').addEventListener('click', function() {
            const details = serverItem.querySelector('.server-details');
            const arrow = serverItem.querySelector('.toggle-details i');
            const isExpanded = serverItem.dataset.expanded === "true";
            
            if (isExpanded) {
                // Collapse
                details.classList.add('hidden');
                arrow.classList.remove('rotate-180');
                serverItem.dataset.expanded = "false";
            } else {
                // Expand
                details.classList.remove('hidden');
                arrow.classList.add('rotate-180');
                serverItem.dataset.expanded = "true";
            }
        });
        
        // Add event listeners for action buttons
        serverItem.querySelector('.copy-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            copyConfig(parseInt(this.dataset.id));
        });
        
        serverItem.querySelector('.edit-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            editServer(parseInt(this.dataset.id));
        });
        
        serverItem.querySelector('.delete-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            deleteServer(parseInt(this.dataset.id));
        });
        
        // Add event listener for server status toggle button
        serverItem.querySelector('.toggle-server').addEventListener('change', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            const server = initialServers.find(s => s.id === id);
            
            // Update server status
            toggleServer(id);
            
            // Manually update UI
            const container = this.closest('.server-toggle-container');
            const dot = container.querySelector('.toggle-dot');
            const background = container.querySelector('.toggle-bg');
            
            if (server && server.enabled) {
                dot.classList.add('translate-x-6');
                background.classList.add('bg-blue-500');
                background.classList.remove('bg-[#1E293B]');
                container.setAttribute('title', t('enabled')); // Use translation
            } else {
                dot.classList.remove('translate-x-6');
                background.classList.remove('bg-blue-500');
                container.setAttribute('title', t('disabled')); // Use translation
            }
        });
        
        // Ensure switch click does not trigger server item expand/collapse
        serverItem.querySelector('.server-toggle-container').addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Add event listener for arrow button
        serverItem.querySelector('.toggle-details').addEventListener('click', function(e) {
            e.stopPropagation();
            serverItem.querySelector('.server-header').click();
        });
        
        serverList.appendChild(serverItem);
    });
}

// Enhanced JSON syntax highlighting
function enhancedJsonHighlight(jsonStr) {
    return jsonStr
        .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')  // Key name
        .replace(/: "([^"]*)"/g, ': <span class="json-string">"$1"</span>') // String value
        .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>') // Boolean value
        .replace(/: (null)/g, ': <span class="json-null">$1</span>') // null value
        .replace(/: (-?\d+(\.\d+)?)/g, ': <span class="json-number">$1</span>'); // Number
}

// Format config object, remove empty env object
function formatConfigForDisplay(config) {
    // Deep clone the config object to avoid modifying the original object
    const displayConfig = JSON.parse(JSON.stringify(config));
    
    // If env exists and is an empty object, remove it
    if (displayConfig.env && Object.keys(displayConfig.env).length === 0) {
        delete displayConfig.env;
    }
    
    return JSON.stringify(displayConfig, null, 2);
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Detect system language
    detectLanguage();
    
    // Load settings from storage
    loadFromStorage();
    
    // Update language button states
    updateLanguageButtons();
    
    // Update UI texts using the current language
    updateUITexts();
    
    // Render server list
    renderServerList();
    
    // Set event handlers
    setupEventListeners();

    // Try setting language switch button events (for buttons fixed in HTML)
    try {
        if (document.getElementById('langZhBtn')) {
            document.getElementById('langZhBtn').addEventListener('click', function() {
                // Remove conditional check, ensure Chinese is applied on every click
                currentLanguage = 'zh';
                updateLanguageButtons();
                updateUITexts();
                renderServerList();
                saveToStorage();
            });
        }
        
        if (document.getElementById('langEnBtn')) {
            document.getElementById('langEnBtn').addEventListener('click', function() {
                // Remove conditional check, ensure English is applied on every click
                currentLanguage = 'en';
                updateLanguageButtons();
                updateUITexts();
                renderServerList();
                saveToStorage();
            });
        }
    } catch (e) {
        console.error('Failed to set language switch button events:', e);
    }
});

// Update all text in the UI
function updateUITexts() {
    // Update title
    document.querySelector('.flex.items-center h1').textContent = t('app_title');
    
    // Update platform button text
    document.getElementById('windowsBtn').querySelector('i + span').textContent = t('platform_win');
    document.getElementById('macBtn').querySelector('i + span').textContent = t('platform_mac');
    
    // Update function button text - only update text content, not affecting styles
    document.getElementById('copyAllBtn').querySelector('i + span').textContent = t('btn_copy');
    document.getElementById('addServerBtn').querySelector('i + span').textContent = t('btn_add');
    document.getElementById('deleteAllBtn').querySelector('i + span').textContent = t('btn_clear');
    
    // Titles and descriptive text
    document.querySelector('h2').textContent = t('server_list');
    document.querySelector('footer p').textContent = t('footer_text');
    
    // Add Server Modal
    const addModal = document.getElementById('addServerModal');
    addModal.querySelector('h2').textContent = t('add_server');
    addModal.querySelector('label[for="serverName"]').textContent = t('server_name');
    addModal.querySelector('#serverName').placeholder = t('server_name_placeholder');
    addModal.querySelector('#serverName + p').innerHTML = `<i class="fas fa-info-circle mr-1"></i>${t('server_name_tip')}`;
    addModal.querySelector('label[for="jsonConfig"]').textContent = t('json_config');
    addModal.querySelector('#jsonConfig + p').innerHTML = `<i class="fas fa-lightbulb mr-1"></i>${t('json_tip')}`;
    addModal.querySelector('#validateJsonBtn').innerHTML = `<i class="fas fa-check-circle mr-1"></i>${t('validate_json')}`;
    addModal.querySelector('#saveServerBtn').innerHTML = `<i class="fas fa-save mr-2"></i>${t('save_server')}`;
    
    // Edit Server Modal
    const editModal = document.getElementById('editServerModal');
    editModal.querySelector('h2').textContent = t('edit_server');
    editModal.querySelector('label[for="editServerName"]').textContent = t('server_name');
    editModal.querySelector('#editServerName').placeholder = t('server_name_placeholder');
    editModal.querySelector('#editServerName + input + p').innerHTML = `<i class="fas fa-info-circle mr-1"></i>${t('server_name_tip')}`;
    editModal.querySelector('label[for="editJsonConfig"]').textContent = t('json_config');
    editModal.querySelector('#editJsonConfig + p').innerHTML = `<i class="fas fa-lightbulb mr-1"></i>${t('json_tip_edit')}`;
    editModal.querySelector('#validateEditJsonBtn').innerHTML = `<i class="fas fa-check-circle mr-1"></i>${t('validate_json')}`;
    editModal.querySelector('#updateServerBtn').innerHTML = `<i class="fas fa-save mr-2"></i>${t('update_server')}`;
    
    // Copy success toast
    document.getElementById('copySuccessToast').innerHTML = `<i class="fas fa-check-circle mr-2"></i>${t('copy_success')}`;
    
    // If server list is empty, re-render example content to update translations
    if (initialServers.length === 0) {
        renderServerList();
    }
}

// Load data from storage
function loadFromStorage() {
    chrome.storage.sync.get(['servers', 'platform', 'language'], (result) => {
        if (result.servers) {
            initialServers.length = 0;
            result.servers.forEach(server => initialServers.push(server));
        }
        
        if (result.platform) {
            currentPlatform = result.platform;
            updatePlatformButtons();
        }
        
        if (result.language) {
            currentLanguage = result.language;
        }
        
        renderServerList();
    });
}

// Save data to storage
function saveToStorage() {
    chrome.storage.sync.set({
        servers: initialServers,
        platform: currentPlatform,
        language: currentLanguage
    }, function() {
        console.log('Settings saved');
    });
}

// Set up all event listeners
function setupEventListeners() {
    // Add button
    addServerBtn.addEventListener('click', function() {
        document.getElementById('serverName').value = '';
        document.getElementById('jsonConfig').value = '';
        jsonStatus.textContent = '';
        
        addServerModal.style.display = 'flex';
    });
    
    // Close add modal
    closeModalBtn.addEventListener('click', function() {
        addServerModal.style.display = 'none';
    });
    
    // Close edit modal
    closeEditModalBtn.addEventListener('click', function() {
        editServerModal.style.display = 'none';
    });
    
    // Validate JSON in add modal
    validateJsonBtn.addEventListener('click', function() {
        const jsonText = document.getElementById('jsonConfig').value;
        const result = validateJSON(jsonText);
        
        if (result.valid) {
            jsonStatus.textContent = t('valid_json');
            jsonStatus.className = 'text-sm text-valid';
            jsonStatus.parentNode.setAttribute('data-tooltip', t('valid_json'));
        } else {
            jsonStatus.textContent = result.error;
            jsonStatus.className = 'text-sm text-invalid';
            jsonStatus.parentNode.setAttribute('data-tooltip', result.error);
        }
    });
    
    // Validate JSON in edit modal
    validateEditJsonBtn.addEventListener('click', function() {
        const jsonText = document.getElementById('editJsonConfig').value;
        const result = validateJSON(jsonText);
        
        if (result.valid) {
            editJsonStatus.textContent = t('valid_json');
            editJsonStatus.className = 'text-sm text-valid';
            editJsonStatus.parentNode.setAttribute('data-tooltip', t('valid_json'));
        } else {
            editJsonStatus.textContent = result.error;
            editJsonStatus.className = 'text-sm text-invalid';
            editJsonStatus.parentNode.setAttribute('data-tooltip', result.error);
        }
    });
    
    // Save new server
    saveServerBtn.addEventListener('click', function() {
        const name = document.getElementById('serverName').value.trim();
        const jsonText = document.getElementById('jsonConfig').value;
        
        const result = validateJSON(jsonText);
        if (!result.valid) {
            alert(t('invalid_json') + result.error);
            return;
        }
        
        // Parse JSON config
        let config = JSON.parse(jsonText);
        
        // Handle different config formats
        if (config.mcpServers) {
            // Case 1 and 3: Full mcpServers config
            const serverNames = Object.keys(config.mcpServers);
            
            if (serverNames.length === 0) {
                alert(t('no_servers_found'));
                return;
            }
            
            // Create config for each server, no platform conversion
            serverNames.forEach(serverName => {
                const serverConfig = config.mcpServers[serverName];
                // If user entered a name, prioritize it (only for the first server)
                if (name && serverNames.indexOf(serverName) === 0) {
                    addNewServer(name, serverConfig, false); // No conversion
                } else {
                    addNewServer(serverName, serverConfig, false); // No conversion
                }
            });
            
            // Close modal
            addServerModal.style.display = 'none';
            return;
        } else if (Object.keys(config).length === 1 && typeof config[Object.keys(config)[0]] === 'object') {
            // Case 2: Single server config without mcpServers wrapper
            const serverName = Object.keys(config)[0];
            const serverConfig = config[serverName];
            
            // If user entered a name, prioritize it
            if (name) {
                addNewServer(name, serverConfig, false); // No conversion
            } else {
                addNewServer(serverName, serverConfig, false); // No conversion
            }
            
            // Close modal
            addServerModal.style.display = 'none';
            return;
        } else {
            // Case 4: Detailed info of a single server config, requires manual name input
            if (name === '') {
                alert(t('enter_server_name'));
                return;
            }
            
            // Add server, no conversion
            addNewServer(name, config, false);
            
            // Close modal
            addServerModal.style.display = 'none';
        }
    });
    
    // Helper function: Add a new server
    function addNewServer(name, config, shouldConvert = true) {
        // Convert config to adapt to the current platform (if needed)
        const convertedConfig = shouldConvert ? convertConfig(config, currentPlatform) : config;
        
        // If env is an empty object, remove it from the stored config
        const finalConfig = JSON.parse(JSON.stringify(convertedConfig));
        if (finalConfig.env && Object.keys(finalConfig.env).length === 0) {
            delete finalConfig.env;
        }
        
        // Add new server
        const newServer = {
            id: Date.now() + Math.floor(Math.random() * 1000), // Ensure unique ID
            name: name,
            enabled: true,
            config: finalConfig
        };
        
        initialServers.push(newServer);
        
        // Save to storage
        saveToStorage();
        renderServerList();
    }
    
    // Update server
    updateServerBtn.addEventListener('click', function() {
        const id = parseInt(document.getElementById('editServerId').value);
        const name = document.getElementById('editServerName').value.trim();
        const jsonText = document.getElementById('editJsonConfig').value;
        
        const result = validateJSON(jsonText);
        if (!result.valid) {
            alert(t('invalid_json') + result.error);
            return;
        }
        
        // Parse config
        let config = JSON.parse(jsonText);
        
        // Handle different config formats
        if (config.mcpServers) {
            // Case 1 and 3: Full mcpServers config
            const serverNames = Object.keys(config.mcpServers);
            
            if (serverNames.length === 0) {
                alert(t('no_servers_found'));
                return;
            }
            
            if (serverNames.length > 1) {
                // Use Chrome or standard confirmation dialog
                let confirmed = false;
                if (chrome && chrome.i18n) {
                    confirmed = window.confirm(t('confirm_multiple_servers'));
                } else {
                    confirmed = confirm(t('confirm_multiple_servers'));
                }
                
                if (confirmed) {
                    const serverName = serverNames[0];
                    const serverConfig = config.mcpServers[serverName];
                    // If user entered a name, prioritize it
                    const finalName = name ? name : serverName;
                    updateServerData(id, finalName, serverConfig, false); // No conversion
                } else { 
                    return; // User cancelled 
                }
            } else {
                const serverName = serverNames[0];
                const serverConfig = config.mcpServers[serverName];
                // If user entered a name, prioritize it
                const finalName = name ? name : serverName;
                updateServerData(id, finalName, serverConfig, false); // No conversion
            }
        } else if (Object.keys(config).length === 1 && typeof config[Object.keys(config)[0]] === 'object') {
            // Case 2: Single server config without mcpServers wrapper
            const serverName = Object.keys(config)[0];
            const serverConfig = config[serverName];
            
            // If user entered a name, prioritize it
            const finalName = name ? name : serverName;
            updateServerData(id, finalName, serverConfig, false); // No conversion
        } else {
            // Case 4: Detailed info of a single server config, requires using the name from the form
            if (name === '') {
                alert(t('enter_server_name'));
                return;
            }
            
            // Update server, no conversion
            updateServerData(id, name, config, false);
        }
    });
    
    // Helper function: Update server data
    function updateServerData(id, name, config, shouldConvert = true) {
        // Convert config to adapt to the current platform (if needed)
        const convertedConfig = shouldConvert ? convertConfig(config, currentPlatform) : config;
        
        // If env is an empty object, remove it from the stored config
        const finalConfig = JSON.parse(JSON.stringify(convertedConfig));
        if (finalConfig.env && Object.keys(finalConfig.env).length === 0) {
            delete finalConfig.env;
        }
        
        // Update server
        const serverIndex = initialServers.findIndex(s => s.id === id);
        if (serverIndex !== -1) {
            initialServers[serverIndex].name = name;
            initialServers[serverIndex].config = finalConfig;
            
            renderServerList();
            saveToStorage();
            
            // Close modal
            editServerModal.style.display = 'none';
        }
    }
    
    // Platform switch
    windowsBtn.addEventListener('click', function() {
        if (currentPlatform !== 'windows') { // Only convert if platform changes
            currentPlatform = 'windows';
            updatePlatformButtons();
            convertAllConfigs();
        }
    });
    
    macBtn.addEventListener('click', function() {
        if (currentPlatform !== 'mac') { // Only convert if platform changes
            currentPlatform = 'mac';
            updatePlatformButtons();
            convertAllConfigs();
        }
    });
    
    // Copy All
    copyAllBtn.addEventListener('click', function() {
        copyAllConfigs();
    });
    
    // Delete All
    deleteAllBtn.addEventListener('click', function() {
        deleteAllServers();
    });
    
    // Handle window click events to close modals
    window.addEventListener('click', function(e) {
        if (e.target === addServerModal) {
            addServerModal.style.display = 'none';
        }
        if (e.target === editServerModal) {
            editServerModal.style.display = 'none';
        }
    });
}

// Update language switch button states
function updateLanguageButtons() {
    const zhBtn = document.getElementById('langZhBtn');
    const enBtn = document.getElementById('langEnBtn');
    
    // Add null check for safety, although buttons should exist
    if (!zhBtn || !enBtn) return;
    
    if (currentLanguage === 'zh') {
        zhBtn.className = 'bg-primary text-white px-2 py-1 text-xs font-medium rounded-full transition-all flex items-center';
        enBtn.className = 'text-gray-400 text-opacity-70 px-2 py-1 text-xs font-medium rounded-full hover:bg-[#334155] hover:text-white transition-all flex items-center';
        document.body.lang = 'zh'; // Update body lang attribute
    } else {
        zhBtn.className = 'text-gray-400 text-opacity-70 px-2 py-1 text-xs font-medium rounded-full hover:bg-[#334155] hover:text-white transition-all flex items-center';
        enBtn.className = 'bg-primary text-white px-2 py-1 text-xs font-medium rounded-full transition-all flex items-center';
        document.body.lang = 'en'; // Update body lang attribute
    }
}

// Copy all enabled server configs
function copyAllConfigs() {
    const enabledServers = initialServers.filter(s => s.enabled);
    if (enabledServers.length === 0) {
        alert(t('no_servers_to_copy'));
        return;
    }

    // Create mcpServers object
    const mcpServers = {};
    enabledServers.forEach(server => {
        mcpServers[server.name] = JSON.parse(JSON.stringify(server.config));
        
        // Remove empty env object
        if (mcpServers[server.name].env && 
            Object.keys(mcpServers[server.name].env).length === 0) {
            delete mcpServers[server.name].env;
        }
    });

    // Create the full MCP config
    const fullConfig = {
        mcpServers: mcpServers
    };

    copyToClipboard(JSON.stringify(fullConfig, null, 2));
};

// Copy content to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Copy successful');
            showCopySuccessToast();
        })
        .catch(err => {
            console.error('Copy failed:', err);
            alert('Copy failed, please copy manually');
        });
}

// Show copy success toast
function showCopySuccessToast() {
    copySuccessToast.style.transform = 'translateY(0) translateX(-50%)';
    copySuccessToast.style.opacity = '1';
    
    setTimeout(() => {
        copySuccessToast.style.transform = 'translateY(10px) translateX(-50%)';
        copySuccessToast.style.opacity = '0';
    }, 2000);
}

// Validate JSON syntax
function validateJSON(str) {
    try {
        const parsed = JSON.parse(str);
        return {
            valid: true,
            parsed: parsed
        };
    } catch (e) {
        return {
            valid: false,
            error: e.message
        };
    }
}

// Update platform switch button states
function updatePlatformButtons() {
    if (currentPlatform === 'windows') {
        windowsBtn.className = 'bg-primary text-white px-2 py-1 text-xs font-medium rounded-full transition-all flex items-center';
        macBtn.className = 'text-gray-400 text-opacity-70 px-2 py-1 text-xs font-medium rounded-full hover:bg-[#334155] hover:text-white transition-all flex items-center';
    } else {
        windowsBtn.className = 'text-gray-400 text-opacity-70 px-2 py-1 text-xs font-medium rounded-full hover:bg-[#334155] hover:text-white transition-all flex items-center';
        macBtn.className = 'bg-primary text-white px-2 py-1 text-xs font-medium rounded-full transition-all flex items-center';
    }
}

// Convert all configurations
function convertAllConfigs() {
    console.log('Converting all configs to', currentPlatform, 'platform');
    console.log('Configs before conversion:', JSON.stringify(initialServers));
    
    initialServers.forEach(server => {
        // Avoid converting already converted config if platform didn't actually change (redundant check, but safe)
        // The main check is now in the event listener
        server.config = convertConfig(server.config, currentPlatform);
    });
    
    console.log('Configs after conversion:', JSON.stringify(initialServers));
    renderServerList();
    saveToStorage();
}

// Check if a string is a URL or special format string
function isUrl(str) {
    if (typeof str !== 'string') return false;
    
    // Normalize URL, replace Windows-style backslashes with forward slashes for detection
    const normalizedStr = str.replace(/\\/g, '/');
    
    // Check if it's an npm package name (starts with @ or contains / but doesn't start with /)
    const isNpmPackage = 
        (str.startsWith('@') && str.includes('/')) || // Scoped package @scope/package
        (/^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/.test(str) && !str.startsWith('/')); // Non-scoped package with / e.g. some-tool/bin
    
    // If it's an npm package name, do not convert
    if (isNpmPackage) {
        return true;
    }
    
    // Check for common URL protocol prefixes
    const hasProtocol = 
        normalizedStr.startsWith('http://') || 
        normalizedStr.startsWith('https://') || 
        normalizedStr.startsWith('ftp://') || 
        normalizedStr.startsWith('file://') ||
        normalizedStr.startsWith('postgresql://') ||
        /^[a-zA-Z]+:\/\//.test(normalizedStr);
    
    // Check for common connection string patterns (e.g., database connection strings)
    const isConnectionString = 
        /^postgresql:/.test(normalizedStr) ||
        /^mysql:/.test(normalizedStr) ||
        /^mongodb:/.test(normalizedStr) ||
        /^jdbc:/.test(normalizedStr) ||
        (normalizedStr.includes(':') && 
         (normalizedStr.includes('@') || 
          normalizedStr.includes('/') || 
          normalizedStr.includes('\\')) // Check for backslashes too in connection strings
        );
    
    return hasProtocol || isConnectionString;
}

// Convert config to adapt to different platforms
function convertConfig(config, targetPlatform) {
    // If config is null or undefined, return default value
    if (!config) {
        return { command: null, args: [] };
    }
    
    // Deep clone the config object to avoid modifying the original object
    const clonedConfig = JSON.parse(JSON.stringify(config));
    
    // If a full structure containing mcpServers is passed, recursively process sub-configs
    if (clonedConfig.mcpServers) {
        for (const serverName in clonedConfig.mcpServers) {
            clonedConfig.mcpServers[serverName] = convertConfig(clonedConfig.mcpServers[serverName], targetPlatform);
        }
        return clonedConfig;
    }
    
    // If the config contains a url field, return directly without platform conversion
    if (clonedConfig.url) {
        return clonedConfig;
    }
    
    // Ensure config contains basic fields
    if (!clonedConfig.command) clonedConfig.command = null;
    if (!clonedConfig.args) clonedConfig.args = [];
    // Only initialize env as an empty object if it doesn't exist, avoiding unnecessary empty env
    if (clonedConfig.env === undefined) clonedConfig.env = {};
    
    console.log('Converting config', clonedConfig, 'Target platform:', targetPlatform);
    
    try {
        // Platform-specific conversion logic
        if (targetPlatform === 'windows') {
            // Mac to Windows format conversion
            
            // 1. Handle special commands
            if (clonedConfig.command === 'open') {
                clonedConfig.command = 'start';
            }
            
            // 2. Handle path separators (exclude URLs)
            if (clonedConfig.command && typeof clonedConfig.command === 'string' && clonedConfig.command.includes('/') && !isUrl(clonedConfig.command)) {
                clonedConfig.command = clonedConfig.command.replace(/\//g, '\\');
            }
            
            // Convert paths in arguments (exclude URLs)
            if (Array.isArray(clonedConfig.args)) {
                clonedConfig.args = clonedConfig.args.map(arg => {
                    if (typeof arg === 'string' && arg.includes('/') && !isUrl(arg)) {
                        return arg.replace(/\//g, '\\');
                    }
                    return arg;
                });
            }
            
            // Convert paths in environment variables (exclude URLs)
            if (clonedConfig.env) {
                for (const key in clonedConfig.env) {
                    if (typeof clonedConfig.env[key] === 'string' && clonedConfig.env[key].includes('/') && !isUrl(clonedConfig.env[key])) {
                        clonedConfig.env[key] = clonedConfig.env[key].replace(/\//g, '\\');
                    }
                }
            }
            
            // 3. Command format conversion (convert regular commands to cmd /c format, unless already cmd or start)
            if (clonedConfig.command && clonedConfig.command !== 'cmd' && clonedConfig.command !== 'start') {
                const command = clonedConfig.command;
                // Ensure args is always an array, even if originally empty
                const args = Array.isArray(clonedConfig.args) ? [...clonedConfig.args] : []; 
                
                // Check if already wrapped in cmd /c
                if (!(clonedConfig.command === 'cmd' && args[0] === '/c')) {
                    return {
                        command: 'cmd',
                        args: ['/c', command, ...args],
                        env: clonedConfig.env
                    };
                }
            }
            
        } else if (targetPlatform === 'mac') {
            // Windows to Mac format conversion
            
            // 1. Handle Windows cmd /c format
            if (clonedConfig.command === 'cmd' && 
                Array.isArray(clonedConfig.args) && // Check if args is an array
                clonedConfig.args.length >= 2 && 
                clonedConfig.args[0] === '/c') {
                
                // Extract the actual command from Windows format
                const actualCommand = clonedConfig.args[1];
                const restArgs = clonedConfig.args.slice(2);
                
                clonedConfig.command = actualCommand;
                clonedConfig.args = restArgs;
            }
            
            // 2. Handle special commands
            if (clonedConfig.command === 'start') {
                clonedConfig.command = 'open';
            }
            
            // 3. Handle path separators (exclude URLs)
            if (clonedConfig.command && typeof clonedConfig.command === 'string' && clonedConfig.command.includes('\\') && !isUrl(clonedConfig.command)) {
                clonedConfig.command = clonedConfig.command.replace(/\\/g, '/');
            }
            
            // Convert paths in arguments (exclude URLs)
            if (Array.isArray(clonedConfig.args)) {
                clonedConfig.args = clonedConfig.args.map(arg => {
                    if (typeof arg === 'string' && arg.includes('\\') && !isUrl(arg)) {
                        return arg.replace(/\\/g, '/');
                    }
                    return arg;
                });
            }
            
            // Convert paths in environment variables (exclude URLs)
            if (clonedConfig.env) {
                for (const key in clonedConfig.env) {
                    if (typeof clonedConfig.env[key] === 'string' && clonedConfig.env[key].includes('\\') && !isUrl(clonedConfig.env[key])) {
                        clonedConfig.env[key] = clonedConfig.env[key].replace(/\\/g, '/');
                    }
                }
            }
        }
    } catch (e) {
        console.error('Config conversion error:', e);
    }
    
    console.log('Config after conversion', clonedConfig);
    return clonedConfig;
}

// Delete all servers
function deleteAllServers() {
    if (initialServers.length === 0) {
        alert(t('no_servers_to_delete'));
        return;
    }
    
    if (chrome && chrome.i18n) {
        // Use Chrome's confirmation dialog
        if (window.confirm(t('confirm_delete_all'))) {
            initialServers.length = 0;
            renderServerList();
            saveToStorage();
            console.log('Deleted all servers');
        }
    } else {
        // Fallback to standard confirmation dialog
        if (confirm(t('confirm_delete_all'))) {
            initialServers.length = 0;
            renderServerList();
            saveToStorage();
            console.log('Deleted all servers');
        }
    }
} 