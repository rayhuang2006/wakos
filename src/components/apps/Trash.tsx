import React from 'react';
import { useOS } from '../../hooks/useOS';
import { findItemByPath, emptyTrash as emptyTrashVFS } from '../../utils/fileSystem';

const Trash: React.FC = () => {
  const { fileSystem, updateFileSystem } = useOS();
  
  const trash = findItemByPath(fileSystem, '/.Trash');
  const trashItems = trash?.children || [];

  const handleEmptyTrash = () => {
    if (confirm('Are you sure you want to permanently empty the Trash?')) {
      const newFS = emptyTrashVFS(fileSystem);
      updateFileSystem(newFS);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-10 border-b border-gray-200 flex items-center px-3 space-x-2 bg-gray-50">
        <button
          onClick={handleEmptyTrash}
          disabled={trashItems.length === 0}
          className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Empty Trash
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {trashItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-6xl mb-4">🗑️</div>
            <div className="text-lg">Trash is empty</div>
          </div>
        ) : (
          <div>
            {trashItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-2 hover:bg-gray-100 rounded"
              >
                <span className="text-xl mr-2">
                  {item.type === 'folder' ? '📁' : '📄'}
                </span>
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trash;
