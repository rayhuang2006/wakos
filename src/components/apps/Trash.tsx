import React from 'react';
import { useOS } from '../../hooks/useOS';

const Trash: React.FC = () => {
  const { trash, emptyTrash } = useOS();

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-200 flex items-center px-4 space-x-2 bg-gray-50">
        <button
          onClick={emptyTrash}
          disabled={trash.length === 0}
          className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Empty Trash
        </button>
        <div className="flex-1 text-sm text-gray-600">
          {trash.length} {trash.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {trash.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-6xl mb-4">🗑️</div>
            <div className="text-lg">Trash is empty</div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {trash.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
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
        )}
      </div>
    </div>
  );
};

export default Trash;
