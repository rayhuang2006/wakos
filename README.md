# WakOS 🚀

A macOS-like Web Operating System built with React, TypeScript, and Tailwind CSS. Experience a fully functional desktop environment in your browser with draggable windows, a dock, menu bar, and built-in applications.

![WakOS Screenshot](https://via.placeholder.com/800x500/667eea/ffffff?text=WakOS+Desktop)

## ✨ Features

### 🖥️ Desktop Environment
- **Beautiful macOS-inspired UI** with smooth animations and blur effects
- **Responsive menu bar** with live clock and system icons
- **Interactive dock** with app icons and hover effects
- **Dynamic wallpaper** with gradient background

### 🪟 Window Management
- **Draggable windows** - Move windows anywhere on the desktop
- **Resizable windows** - Adjust window size with drag handles
- **Window controls** - Close, minimize, and maximize buttons
- **Focus management** - Click to bring windows to front
- **Z-index stacking** - Proper window layering

### 📱 Built-in Applications

#### 📁 Finder
- Browse the virtual file system
- Navigate through folders with breadcrumb navigation
- View files and folders with icons
- Empty folder detection

#### ⌨️ Terminal
Full-featured terminal with these commands:
- `ls` - List directory contents
- `cd <dir>` - Change directory (supports `.` and `..`)
- `pwd` - Print working directory
- `cat <file>` - Display file contents
- `echo <text>` - Display text
- `clear` - Clear terminal screen
- `help` - Show available commands
- Command history with arrow keys (↑/↓)

#### 🗑️ Trash
- View deleted items
- Empty trash functionality
- Item count display

#### 💻 About This Mac
- System information
- Technology stack display
- Version information

### 💾 State Persistence
- **LocalStorage integration** - Your file system and trash persist across sessions
- **Automatic saving** - Changes are saved automatically
- **State restoration** - Returns to your last session on reload

### 🎨 UI/UX Features
- **SF Pro font family** (system fallback)
- **Smooth animations** and transitions
- **macOS-style shadows** and blur effects
- **Responsive design**
- **Hover effects** and visual feedback

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rayhuang2006/wakos.git
cd wakos
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔧 Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **react-rnd** - Draggable and resizable components
- **LocalStorage API** - State persistence

## 📁 Project Structure

```
wakos/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── src/
│   ├── components/
│   │   ├── apps/               # Application components
│   │   │   ├── Finder.tsx
│   │   │   ├── Terminal.tsx
│   │   │   ├── Trash.tsx
│   │   │   └── Computer.tsx
│   │   ├── Desktop.tsx         # Desktop background
│   │   ├── Dock.tsx            # Bottom dock
│   │   ├── MenuBar.tsx         # Top menu bar
│   │   ├── Window.tsx          # Window wrapper
│   │   └── WindowManager.tsx   # Window orchestration
│   ├── contexts/
│   │   └── OSContext.tsx       # Global state management
│   ├── types/
│   │   └── index.ts            # TypeScript definitions
│   ├── utils/
│   │   └── fileSystem.ts       # File system utilities
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── package.json
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Under "Build and deployment", select "GitHub Actions" as the source
4. Push to the `main` branch to trigger automatic deployment

The site will be available at `https://rayhuang2006.github.io/wakos/`

## 🎯 Features in Detail

### Window Management System
Each window maintains its own state including:
- Position (x, y coordinates)
- Size (width, height)
- Z-index for stacking
- Minimized/maximized state
- Associated application

### File System
The virtual file system includes:
- Root directory with Home and Applications folders
- Nested folder structure
- File content storage
- Parent-child relationships

### Terminal Commands
The terminal emulates basic Unix commands with:
- Path navigation
- File reading
- Directory listing
- Command history
- Error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by macOS Big Sur design
- Built with modern web technologies
- Community feedback and contributions

## 📧 Contact

Ray Huang - [@rayhuang2006](https://github.com/rayhuang2006)

Project Link: [https://github.com/rayhuang2006/wakos](https://github.com/rayhuang2006/wakos)

---

Made with ❤️ by Ray Huang
