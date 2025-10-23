/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { WindowState, FileSystemItem } from '../types';
import { initialFileSystem } from '../utils/fileSystem';

interface OSContextType {
  windows: WindowState[];
  openWindow: (appId: string, title: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  fileSystem: FileSystemItem;
  updateFileSystem: (newFileSystem: FileSystemItem) => void;
  trash: FileSystemItem[];
  moveToTrash: (item: FileSystemItem) => void;
  emptyTrash: () => void;
}

export const OSContext = createContext<OSContextType | undefined>(undefined);

const STORAGE_KEY = 'wakos-state';

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [fileSystem, setFileSystem] = useState<FileSystemItem>(initialFileSystem);
  const [trash, setTrash] = useState<FileSystemItem[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.fileSystem) setFileSystem(state.fileSystem);
        if (state.trash) setTrash(state.trash);
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state = {
      fileSystem,
      trash,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [fileSystem, trash]);

  const openWindow = useCallback((appId: string, title: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    
    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      title,
      appId,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
      zIndex: newZIndex,
    };
    
    setWindows(prev => [...prev, newWindow]);
  }, [windows.length, maxZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: newZIndex, isMinimized: false } : w))
    );
  }, [maxZIndex]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, position: { x, y } } : w))
    );
  }, []);

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, size: { width, height } } : w))
    );
  }, []);

  const updateFileSystem = useCallback((newFileSystem: FileSystemItem) => {
    setFileSystem(newFileSystem);
  }, []);

  const moveToTrash = useCallback((item: FileSystemItem) => {
    // This is now handled by the VFS deleteItem function
    setTrash(prev => [...prev, item]);
  }, []);

  const emptyTrash = useCallback(() => {
    // Clear trash from file system
    const trash = fileSystem.children?.find(c => c.name === '.Trash');
    if (trash && trash.children) {
      trash.children = [];
      setFileSystem({ ...fileSystem });
    }
    setTrash([]);
  }, [fileSystem]);

  const value: OSContextType = {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
    fileSystem,
    updateFileSystem,
    trash,
    moveToTrash,
    emptyTrash,
  };

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
};
