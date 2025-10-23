import React, { useState, useEffect } from 'react';
import { useOS } from '../hooks/useOS';

const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { windows } = useOS();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Get the active app name (the window with highest z-index)
  const getActiveAppName = () => {
    if (windows.length === 0) return 'Finder';
    const activeWindow = windows.reduce((max, w) => w.zIndex > max.zIndex ? w : max, windows[0]);
    return activeWindow.title;
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-6 bg-white/20 backdrop-blur-xl border-b border-white/10 z-50 flex items-center px-3 text-white text-sm select-none">
      <div className="flex items-center space-x-2">
        <div className="font-semibold text-base"></div>
        <div className="font-semibold">{getActiveAppName()}</div>
      </div>
      <div className="ml-auto flex items-center space-x-3">
        <span>📶</span>
        <span>🔋</span>
        <span>{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default MenuBar;
