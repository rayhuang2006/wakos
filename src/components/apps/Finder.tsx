import React, { useState, useEffect } from 'react';
import { useOS } from '../../hooks/useOS';
import type { FileSystemItem } from '../../types';
import { findItemByPath, createFolder, deleteItem, renameItem } from '../../utils/fileSystem';

const Finder: React.FC = () => {
  const { fileSystem, updateFileSystem } = useOS();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [currentFolder, setCurrentFolder] = useState<FileSystemItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [renamingItem, setRenamingItem] = useState<string | null>(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const folder = findItemByPath(fileSystem, currentPath);
    setCurrentFolder(folder);
  }, [fileSystem, currentPath]);

  const goBack = () => {
    if (currentPath === '/') return;
    const parts = currentPath.split('/').filter(p => p);
    parts.pop();
    setCurrentPath('/' + parts.join('/'));
    setSelectedItem(null);
  };

  const handleItemClick = (item: FileSystemItem, e: React.MouseEvent) => {
    if (e.detail === 1) {
      // Single click - select
      setSelectedItem(item.id);
    }
  };

  const handleItemDoubleClick = (item: FileSystemItem) => {
    if (item.type === 'folder') {
      const newPath = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`;
      setCurrentPath(newPath);
      setSelectedItem(null);
    }
  };

  const handleNewFolder = () => {
    let folderName = 'New Folder';
    let counter = 1;
    while (currentFolder?.children?.find(c => c.name === folderName)) {
      folderName = `New Folder ${counter++}`;
    }
    const newFS = createFolder(fileSystem, currentPath, folderName);
    updateFileSystem(newFS);
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    const item = currentFolder?.children?.find(c => c.id === selectedItem);
    if (!item) return;
    
    if (confirm(`Move "${item.name}" to Trash?`)) {
      const itemPath = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`;
      const newFS = deleteItem(fileSystem, itemPath);
      updateFileSystem(newFS);
      setSelectedItem(null);
    }
  };

  const handleRename = () => {
    if (!selectedItem) return;
    const item = currentFolder?.children?.find(c => c.id === selectedItem);
    if (!item) return;
    
    setRenamingItem(item.id);
    setNewName(item.name);
  };

  const finishRename = () => {
    if (!renamingItem || !newName.trim()) {
      setRenamingItem(null);
      return;
    }
    
    const item = currentFolder?.children?.find(c => c.id === renamingItem);
    if (!item) return;
    
    const itemPath = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`;
    const newFS = renameItem(fileSystem, itemPath, newName.trim());
    updateFileSystem(newFS);
    setRenamingItem(null);
    setNewName('');
  };

  const getPathDisplay = () => {
    return currentPath === '/' ? '/' : currentPath;
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-10 border-b border-gray-200 flex items-center px-3 space-x-2 bg-gray-50">
        <button
          onClick={handleNewFolder}
          className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          New Folder
        </button>
        <button
          onClick={handleRename}
          disabled={!selectedItem}
          className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Rename
        </button>
        <button
          onClick={handleDelete}
          disabled={!selectedItem}
          className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Delete
        </button>
        <div className="flex-1 text-xs text-gray-600 px-2 border border-gray-300 rounded bg-white py-1">
          {getPathDisplay()}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {currentPath !== '/' && (
          <div
            onClick={goBack}
            className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer mb-2"
          >
            <span className="text-2xl mr-2">⤴️</span>
            <span className="text-sm">..</span>
          </div>
        )}
        
        {currentFolder?.children?.map((item) => (
          <div
            key={item.id}
            onClick={(e) => handleItemClick(item, e)}
            onDoubleClick={() => handleItemDoubleClick(item)}
            className={`flex items-center p-2 rounded cursor-pointer ${
              selectedItem === item.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <span className="text-xl mr-2">
              {item.type === 'folder' ? '📁' : '📄'}
            </span>
            {renamingItem === item.id ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={finishRename}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') finishRename();
                  if (e.key === 'Escape') setRenamingItem(null);
                }}
                className="text-sm px-1 border border-blue-500 rounded text-black"
                autoFocus
              />
            ) : (
              <span className="text-sm">{item.name}</span>
            )}
          </div>
        ))}
        
        {(!currentFolder?.children || currentFolder.children.length === 0) && currentPath === '/' && (
          <div className="text-center text-gray-400 mt-8">
            This folder is empty
          </div>
        )}
      </div>
    </div>
  );
};

export default Finder;
