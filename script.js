document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesWrapper = document.getElementById('messagesWrapper');
    const quickActions = document.getElementById('quickActions');
    const fileList = document.getElementById('fileList');
    const editorTabs = document.getElementById('editorTabs');
    const codeContent = document.getElementById('codeContent');
    const terminalBody = document.getElementById('terminalBody');
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    const questionModal = document.getElementById('questionModal');
    const closeModal = document.getElementById('closeModal');
    const questionInput = document.getElementById('questionInput');
    const submitQuestion = document.getElementById('submitQuestion');
    const runCodeBtn = document.getElementById('runCodeBtn');

    // State
    let isTyping = false;
    let currentFile = 'index.html';

    // Sample file contents for demonstration
    const fileContents = {
        'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My Project</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>`,
        'style.css': `:root {\n    --bg-primary: #0f172a;\n    --text-primary: #f1f5f9;\n}\n\nbody {\n    background-color: var(--bg-primary);\n    color: var(--text-primary);\n}`,
        'script.js': `console.log("Hello World");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    console.log("Script loaded");\n});`
    };

    // --- Chat Functionality ---

    // Set prompt from quick action buttons
    window.setPrompt = function(text) {
        userInput.value = text;
        userInput.focus();
        // Automatically trigger send after a short delay for better UX
        setTimeout(() => {
            sendMessage();
        }, 300);
    };

    function sendMessage() {
        const text = userInput.value.trim();
        if (!text || isTyping) return;

        // Add user message
        addMessage(text, 'user');
        userInput.value = '';
        userInput.style.height = 'auto'; // Reset height

        // Simulate AI thinking and responding
        simulateAIResponse(text);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        // Simple formatting for AI responses
        if (sender === 'ai') {
            content.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        } else {
            content.textContent = text;
        }

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        messagesWrapper.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }

    function simulateAIResponse(userText) {
        isTyping = true;
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message ai-message';
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        messagesWrapper.appendChild(typingIndicator);
        messagesWrapper.scrollTop = messagesWrapper.scrollHeight;

        // Simulate processing time
        setTimeout(() => {
            // Remove typing indicator
            const indicator = document.getElementById('typing-indicator');
            if (indicator) indicator.remove();

            let responseText = "";
            let commandOutput = "";

            // Simple rule-based responses for demo purposes
            const lowerText = userText.toLowerCase();
            
            if (lowerText.includes('read')) {
                responseText = `I've read the current files. Here's a summary:\n\n**index.html**: Contains the main structure.\n**style.css**: Defines the dark theme and layout.\n**script.js**: Handles user interactions.\n\nWould you like me to show the content of a specific file?`;
                commandOutput = `[Tool] readFile('index.html')\n[Tool] readFile('style.css')\n[Tool] readFile('script.js')\n[Success] Files read successfully.`;
                updateCodeDisplay(fileContents[currentFile]);
            } else if (lowerText.includes('explain')) {
                responseText = `This project is a modern AI-powered coding agent interface. \n\n**Key Features:**\n- **Sidebar**: For file navigation.\n- **Main Chat**: For interacting with the AI.\n- **Code Editor**: To view and edit files.\n- **Terminal**: For command output and logs.\n\nIt uses a dark theme with indigo accents and glassmorphism effects for a sleek look.`;
                commandOutput = `[Info] Project structure analyzed.`;
            } else if (lowerText.includes('bug')) {
                responseText = `I've scanned the code for common issues. \n\n**Findings:**\n- No critical bugs found.\n- Minor suggestion: Consider adding error handling for network requests in `script.js`.`;
                commandOutput = `[Scan] Checking for bugs...\n[Result] 1 minor suggestion found.`;
                addTerminalLine(commandOutput);
            } else if (lowerText.includes('design') || lowerText.includes('improve')) {
                responseText = `I can suggest some design improvements:\n\n1. **Contrast**: Ensure text contrast meets WCAG standards.\n2. **Animations**: Add subtle transitions for better UX.\n3. **Layout**: Consider using CSS Grid for more complex layouts.`;
                commandOutput = `[Design] Analyzing current design patterns...`;
            } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
                responseText = `Hello! How can I help you with your project today?`;
                commandOutput = `[Init] Greeting acknowledged.`;
            } else {
                responseText = `I understand you want me to "${userText}". \n\nAs a demo agent, I can perform simulated actions like reading files, explaining code, and suggesting fixes. Try asking me to "read files" or "explain the code".`;
                commandOutput = `[Action] Processing request: "${userText}"`;
            }

            addMessage(responseText, 'ai');
            if (commandOutput) {
                addTerminalLine(commandOutput);
            }
            
            isTyping = false;
        }, 1500);
    }

    // --- Event Listeners ---

    // Send button click
    sendBtn.addEventListener('click', sendMessage);

    // Enter key to send (Shift+Enter for newline)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 150) + 'px';
    });

    // File Explorer Click
    fileList.addEventListener('click', (e) => {
        const fileItem = e.target.closest('.file-item');
        if (fileItem) {
            // Update active state
            document.querySelectorAll('.file-item').forEach(item => item.classList.remove('active'));
            fileItem.classList.add('active');
            
            // Update current file and display content
            currentFile = fileItem.dataset.file;
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            const correspondingTab = document.querySelector(`.tab[data-tab="${currentFile}"]`);
            if (correspondingTab) correspondingTab.classList.add('active');
            
            updateCodeDisplay(fileContents[currentFile]);
            addTerminalLine(`[File] Switched to ${currentFile}`);
        }
    });

    // Editor Tabs Click
    editorTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.tab');
        if (tab) {
            // Update active state
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update current file and display content
            currentFile = tab.dataset.tab;
            document.querySelectorAll('.file-item').forEach(item => item.classList.remove('active'));
            const correspondingFile = document.querySelector(`.file-item[data-file="${currentFile}"]`);
            if (correspondingFile) correspondingFile.classList.add('active');
            
            updateCodeDisplay(fileContents[currentFile]);
            addTerminalLine(`[Editor] Opened ${currentFile}`);
        }
    });

    // Modal Functionality
    askQuestionBtn.addEventListener('click', () => {
        questionModal.classList.add('active');
        questionInput.focus();
    });

    closeModal.addEventListener('click', () => {
        questionModal.classList.remove('active');
    });

    questionModal.addEventListener('click', (e) => {
        if (e.target === questionModal) {
            questionModal.classList.remove('active');
        }
    });

    submitQuestion.addEventListener('click', () => {
        const question = questionInput.value.trim();
        if (question) {
            questionModal.classList.remove('active');
            questionInput.value = '';
            // Treat the question as a regular message
            userInput.value = question;
            sendMessage();
        }
    });

    // Run Code Button
    runCodeBtn.addEventListener('click', () => {
        addTerminalLine(`[Run] Executing ${currentFile}...`);
        setTimeout(() => {
            addTerminalLine(`<span class="success">✓ Execution successful. Output displayed below.</span>`);
            if (currentFile === 'script.js') {
                addTerminalLine(`Hello World`);
                addTerminalLine(`Script loaded`);
            } else if (currentFile === 'index.html') {
                addTerminalLine(`<span class="info">ℹ HTML file rendered in preview pane.</span>`);
            } else if (currentFile === 'style.css') {
                addTerminalLine(`<span class="info">ℹ Styles applied to project.</span>`);
            }
        }, 1000);
    });

    // --- Helper Functions ---

    function updateCodeDisplay(content) {
        // Escape HTML for display
        const escapedContent = content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        codeContent.innerHTML = escapedContent;
    }

    function addTerminalLine(htmlContent) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="terminal-prompt">$</span> <span class="terminal-command">${htmlContent}</span>`;
        
        // Insert before the last line (which contains the cursor)
        terminalBody.insertBefore(line, terminalBody.lastElementChild);
        
        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Initialize display
    updateCodeDisplay(fileContents[currentFile]);
});