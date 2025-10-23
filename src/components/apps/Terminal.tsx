import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../../hooks/useOS';
import { findItemByPath, createFile, createFolder, deleteItem } from '../../utils/fileSystem';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

const APP_MAP: { [key: string]: { id: string; title: string } } = {
  'finder': { id: 'finder', title: 'Finder' },
  'terminal': { id: 'terminal', title: 'Terminal' },
  'trash': { id: 'trash', title: 'Trash' },
  'computer': { id: 'computer', title: 'About This Mac' },
};

const Terminal: React.FC = () => {
  const { fileSystem, openWindow, updateFileSystem } = useOS();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to macOS Web Terminal!' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentPath, setCurrentPath] = useState('/');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (command: string) => {
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    setLines(prev => [...prev, { type: 'input', content: `${currentPath} $ ${command}` }]);

    let output = '';
    let isError = false;

    switch (cmd) {
      case 'help':
        output = `Available commands:
  ls          - List directory contents
  cd <dir>    - Change directory
  pwd         - Print working directory
  cat <file>  - Display file contents
  echo <text> - Display text
  touch <file>- Create a new file
  mkdir <dir> - Create a new directory
  rm <path>   - Move file or directory to Trash
  clear       - Clear terminal screen
  open <app>  - Open an application (finder, terminal, trash, computer)
  help        - Show this help message`;
        break;

      case 'ls': {
        const currentDir = findItemByPath(fileSystem, currentPath);
        if (currentDir && currentDir.children) {
          output = currentDir.children.map(item => {
            const icon = item.type === 'folder' ? '📁' : '📄';
            return `${icon} ${item.name}`;
          }).join('\n');
        } else {
          output = 'Directory not found';
          isError = true;
        }
        break;
      }

      case 'pwd':
        output = currentPath;
        break;

      case 'cd': {
        if (args.length === 0) {
          setCurrentPath('/');
          output = '';
        } else {
          const targetPath = args[0];
          let newPath = currentPath;
          
          if (targetPath === '/') {
            newPath = '/';
          } else if (targetPath === '..') {
            const parts = currentPath.split('/').filter(p => p);
            parts.pop();
            newPath = '/' + parts.join('/');
            if (newPath === '') newPath = '/';
          } else if (targetPath === '.') {
            newPath = currentPath;
          } else if (targetPath.startsWith('/')) {
            newPath = targetPath;
          } else {
            newPath = currentPath === '/' ? `/${targetPath}` : `${currentPath}/${targetPath}`;
          }

          const targetDir = findItemByPath(fileSystem, newPath);
          if (targetDir && targetDir.type === 'folder') {
            setCurrentPath(newPath);
            output = '';
          } else {
            output = `cd: ${targetPath}: No such directory`;
            isError = true;
          }
        }
        break;
      }

      case 'cat': {
        if (args.length === 0) {
          output = 'cat: missing file operand';
          isError = true;
        } else {
          const filePath = args[0].startsWith('/') ? args[0] : `${currentPath}/${args[0]}`;
          const file = findItemByPath(fileSystem, filePath);
          if (file && file.type === 'file') {
            output = file.content || '';
          } else {
            output = `cat: ${args[0]}: No such file`;
            isError = true;
          }
        }
        break;
      }

      case 'echo':
        output = args.join(' ');
        break;

      case 'touch': {
        if (args.length === 0) {
          output = 'touch: missing file operand';
          isError = true;
        } else {
          const fileName = args[0];
          const newFS = createFile(fileSystem, currentPath, fileName);
          updateFileSystem(newFS);
          output = '';
        }
        break;
      }

      case 'mkdir': {
        if (args.length === 0) {
          output = 'mkdir: missing operand';
          isError = true;
        } else {
          const dirName = args[0];
          const newFS = createFolder(fileSystem, currentPath, dirName);
          updateFileSystem(newFS);
          output = '';
        }
        break;
      }

      case 'rm': {
        if (args.length === 0) {
          output = 'rm: missing operand';
          isError = true;
        } else {
          const targetPath = args[0];
          const fullPath = targetPath.startsWith('/') ? targetPath : 
            (currentPath === '/' ? `/${targetPath}` : `${currentPath}/${targetPath}`);
          const newFS = deleteItem(fileSystem, fullPath);
          updateFileSystem(newFS);
          output = '';
        }
        break;
      }

      case 'open': {
        if (args.length === 0) {
          output = 'open: missing application name';
          isError = true;
        } else {
          const appName = args[0].toLowerCase();

          if (APP_MAP[appName]) {
            openWindow(APP_MAP[appName].id, APP_MAP[appName].title);
            output = `Opening ${APP_MAP[appName].title}...`;
          } else {
            output = `open: unknown application "${appName}"\nAvailable apps: finder, terminal, trash, computer`;
            isError = true;
          }
        }
        break;
      }

      case 'clear':
        setLines([]);
        return;

      case '':
        break;

      default:
        output = `Command not found: ${cmd}. Type "help" for available commands.`;
        isError = true;
    }

    if (output) {
      setLines(prev => [...prev, { type: isError ? 'error' : 'output', content: output }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        setCommandHistory(prev => [...prev, currentInput]);
        executeCommand(currentInput);
      } else {
        setLines(prev => [...prev, { type: 'input', content: `${currentPath} $ ` }]);
      }
      setCurrentInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div
      className="w-full h-full bg-black text-green-400 font-mono text-sm p-4 overflow-hidden flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={contentRef} className="flex-1 overflow-y-auto mb-2">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`${
              line.type === 'error' ? 'text-red-400' : line.type === 'input' ? 'text-green-400' : 'text-gray-300'
            } whitespace-pre-wrap`}
          >
            {line.content}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="text-green-400 mr-2">{currentPath} $</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-green-400"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
