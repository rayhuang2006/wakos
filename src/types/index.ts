export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  title: string;
  appId: string;
  position: Position;
  size: Size;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<Record<string, never>>;
}

export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileSystemItem[];
  parentId?: string;
}

export interface TerminalState {
  history: string[];
  currentPath: string;
}
