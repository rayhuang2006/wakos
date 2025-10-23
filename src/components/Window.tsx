import React from 'react';
import { Rnd } from 'react-rnd';
import type { WindowState } from '../types';
import { useOS } from '../hooks/useOS';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ window, children }) => {
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow, updateWindowPosition, updateWindowSize } = useOS();

  if (window.isMinimized) {
    return null;
  }

  const position = window.isMaximized
    ? { x: 0, y: 28 }
    : window.position;

  const size = window.isMaximized
    ? { width: globalThis.innerWidth || globalThis.screen.availWidth, height: (globalThis.innerHeight || globalThis.screen.availHeight) - 84 }
    : window.size;

  return (
    <Rnd
      position={position}
      size={size}
      onDragStop={(_e, d) => {
        if (!window.isMaximized) {
          updateWindowPosition(window.id, d.x, d.y);
        }
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        if (!window.isMaximized) {
          updateWindowSize(
            window.id,
            parseInt(ref.style.width),
            parseInt(ref.style.height)
          );
          updateWindowPosition(window.id, position.x, position.y);
        }
      }}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      style={{ zIndex: window.zIndex }}
      disableDragging={window.isMaximized}
      enableResizing={!window.isMaximized}
      onMouseDown={() => focusWindow(window.id)}
    >
      <div className="w-full h-full bg-gray-200 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-400">
        {/* Title Bar */}
        <div className="window-drag-handle h-7 bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400 flex items-center px-2 cursor-move">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => closeWindow(window.id)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors border border-red-700"
            />
            <button
              onClick={() => minimizeWindow(window.id)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors border border-yellow-700"
            />
            <button
              onClick={() => maximizeWindow(window.id)}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors border border-green-700"
            />
          </div>
          <div className="flex-1 text-center text-xs font-medium text-gray-700">
            {window.title}
          </div>
          <div className="w-14" /> {/* Spacer for centering */}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;
