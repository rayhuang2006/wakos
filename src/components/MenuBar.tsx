import React, { useState, useEffect } from 'react';

const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-xl border-b border-white/10 z-50 flex items-center px-4 text-white text-sm">
      <div className="flex items-center space-x-4">
        <div className="font-semibold">
          <span className="text-base">🍎</span>
        </div>
        <div className="font-semibold">WakOS</div>
        <div>File</div>
        <div>Edit</div>
        <div>View</div>
        <div>Window</div>
        <div>Help</div>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span>🔋</span>
          <span>📶</span>
          <span>🔍</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{formatDate(time)}</span>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
