# Make Yo make a coding ai agent that l...

- [ ] Create README.md

```markdown
# AI Coding Agent

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

**An intelligent, interactive web-based coding assistant inspired by Lovable.**

Real-time file analysis, code generation, and project management in a sleek, dark-themed interface.

</div>

## 🚀 About

The **AI Coding Agent** is a sophisticated web application designed to streamline the development workflow. It combines a modern chat interface with a built-in code editor and terminal, allowing users to interact with an AI assistant to read, write, and analyze code in real-time.

Built with vanilla HTML, CSS, and JavaScript, it offers a high-performance, dependency-free experience with a stunning "glassmorphism" UI.

## ✨ Features

- **🤖 Intelligent Assistant**: Interact with an AI agent that understands code structure and can answer project-specific questions.
- **📂 Real-Time File Explorer**: Browse and select project files (`index.html`, `style.css`, `script.js`) directly from the sidebar.
- **💻 Live Code Editor**: View syntax-highlighted code in a dedicated panel. Switch between tabs seamlessly.
- **🖥️ Integrated Terminal**: Watch AI actions and command outputs in a simulated terminal window.
- **⚡ Instant Execution**: Run code snippets and see immediate feedback in the terminal.
- **🎨 Modern Dark UI**: A beautiful, responsive design featuring:
  - Dark mode aesthetic (`#0f172a` base)
  - Indigo/Violet gradient accents
  - Glassmorphism effects (`backdrop-filter: blur`)
  - Smooth animations and transitions
- **📱 Fully Responsive**: Adapts to desktop, tablet, and mobile viewports.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure
- **CSS3**: Custom properties (variables), Flexbox, Grid, Animations, Glassmorphism
- **JavaScript (ES6+)**: DOM manipulation, Event handling, Asynchronous simulation
- **Google Fonts**: Inter (UI) & JetBrains Mono (Code)

## 🏃‍♂️ How to Run

Since this is a static web application, you can run it locally without any build tools or servers.

### Option 1: Direct Opening
1. Clone the repository or download the files.
2. Locate the `index.html` file.
3. Double-click `index.html` to open it in your default web browser.

### Option 2: Using VS Code (Recommended)
1. Open the project folder in Visual Studio Code.
2. Install the "Live Server" extension if you haven't already.
3. Right-click on `index.html` and select **"Open with Live Server"**.

### Option 3: Python HTTP Server
1. Navigate to the project directory in your terminal.
2. Run the following command:
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and go to `http://localhost:8000`.

## 📁 Project Structure

```
├── index.html      # Main application structure
├── style.css       # Styling, variables, and animations
├── script.js       # Application logic, AI simulation, and event handlers
├── design.md       # Design system documentation
└── README.md       # Project overview (this file)
```

## 🎯 Usage Guide

1. **Start a Conversation**: Type a prompt in the input area (e.g., "Read the current files" or "Explain the code structure").
2. **Explore Files**: Click on files in the left sidebar or editor tabs to view their content.
3. **Ask Questions**: Use the "Ask Question" button for a dedicated query modal.
4. **Run Code**: Click the "Run" button in the header to execute the currently selected file and view output in the terminal.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

<div align="center">
  <sub>Built with ❤️ by AI Coding Agent Team</sub>
</div>
```