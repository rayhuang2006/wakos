import React from 'react';

const Computer: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col bg-white p-8">
      <div className="flex items-center space-x-6 mb-8">
        <div className="text-6xl">💻</div>
        <div>
          <h1 className="text-3xl font-bold mb-2">WakOS</h1>
          <p className="text-gray-600">Version 1.0.0</p>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-semibold text-gray-600">Processor</div>
              <div>Web-based Virtual CPU</div>
            </div>
            <div>
              <div className="font-semibold text-gray-600">Memory</div>
              <div>Browser LocalStorage</div>
            </div>
            <div>
              <div className="font-semibold text-gray-600">Graphics</div>
              <div>Canvas & WebGL Renderer</div>
            </div>
            <div>
              <div className="font-semibold text-gray-600">Display</div>
              <div>{window.screen.width} x {window.screen.height}</div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="font-semibold text-gray-600 mb-2">About</h2>
          <p className="text-gray-700">
            WakOS is a macOS-like web operating system built with React and Tailwind CSS.
            It features a desktop environment with draggable windows, a dock, menu bar,
            and built-in applications including Finder, Terminal, and more.
          </p>
        </div>

        <div className="border-t pt-4">
          <h2 className="font-semibold text-gray-600 mb-2">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">React</span>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs">TypeScript</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Tailwind CSS</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Vite</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">LocalStorage API</span>
          </div>
        </div>

        <div className="border-t pt-4 text-gray-500 text-xs">
          © 2024 WakOS. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Computer;
