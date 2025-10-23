import React, { useState } from 'react';
import { useOS } from '../../hooks/useOS';
import type { FileSystemItem } from '../../types';

const Finder: React.FC = () => {
  const { fileSystem } = useOS();
  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [currentFolder, setCurrentFolder] = useState<FileSystemItem>(() => {
    return fileSystem.children?.find(c => c.name === 'Home') || fileSystem;
  });

  const goBack = () => {
    if (currentPath.length > 1) {
      const newPath = [...currentPath];
      newPath.pop();
      setCurrentPath(newPath);
      // Navigate to parent folder
      let folder = fileSystem;
      for (const pathPart of newPath) {
        folder = folder.children?.find(c => c.name === pathPart) || folder;
      }
      setCurrentFolder(folder);
    }
  };

  const handleItemClick = (item: FileSystemItem) => {
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, item.name]);
      setCurrentFolder(item);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-200 flex items-center px-4 space-x-2 bg-gray-50">
        <button
          onClick={goBack}
          disabled={currentPath.length <= 1}
          className="p-2 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ◀
        </button>
        <div className="flex-1 flex items-center space-x-2 text-sm text-gray-600">
          {currentPath.map((path, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>›</span>}
              <span className="font-medium">{path}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-4 gap-4">
          {currentFolder.children?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="flex flex-col items-center p-4 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
            >
              <div className="text-5xl mb-2">
                {item.type === 'folder' ? '📁' : '📄'}
              </div>
              <div className="text-sm text-center break-words w-full">
                {item.name}
              </div>
            </div>
          ))}
        </div>
        {(!currentFolder.children || currentFolder.children.length === 0) && (
          <div className="text-center text-gray-400 mt-8">
            This folder is empty
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-8 border-t border-gray-200 flex items-center px-4 text-xs text-gray-500 bg-gray-50">
        {currentFolder.children?.length || 0} items
      </div>
    </div>
  );
};

export default Finder;
