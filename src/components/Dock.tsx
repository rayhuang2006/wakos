import React, { useState } from 'react';
import { useOS } from '../hooks/useOS';

interface DockAppProps {
  id: string;
  name: string;
  icon: string;
  onClick: () => void;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
  isNeighborHovered: boolean;
}

const DockApp: React.FC<DockAppProps> = ({ name, icon, onClick, isOpen, onMouseEnter, onMouseLeave, isHovered, isNeighborHovered }) => {
  const scale = isHovered ? 1.3 : isNeighborHovered ? 1.15 : 1;
  const marginX = isHovered ? 10 : isNeighborHovered ? 6 : 4;
  
  return (
    <div
      className="group relative flex flex-col items-center justify-end cursor-pointer transition-all duration-150 origin-bottom"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `scale(${scale})`,
        margin: `0 ${marginX}px`,
      }}
    >
      <div className="text-5xl">
        {icon}
      </div>
      {isOpen && (
        <div className="absolute -bottom-1 w-1 h-1 bg-gray-600 rounded-full" />
      )}
      <div className="absolute bottom-full mb-2 bg-black/75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {name}
      </div>
    </div>
  );
};

const Dock: React.FC = () => {
  const { openWindow, windows, fileSystem } = useOS();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getTrashIcon = () => {
    const trash = fileSystem.children?.find(c => c.name === '.Trash');
    return trash && trash.children && trash.children.length > 0 ? '🗑️' : '🗑️';
  };

  const apps = [
    { id: 'finder', name: 'Finder', icon: '🗂️' },
    { id: 'terminal', name: 'Terminal', icon: '💻' },
    { id: 'trash', name: 'Trash', icon: getTrashIcon() },
    { id: 'computer', name: 'About This Mac', icon: '🖥️' },
  ];

  const isAppOpen = (appId: string) => {
    return windows.some(w => w.appId === appId);
  };

  return (
    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl px-2 py-1.5 shadow-2xl">
        <div className="flex items-end">
          {apps.map((app, index) => (
            <DockApp
              key={app.id}
              id={app.id}
              name={app.name}
              icon={app.icon}
              onClick={() => openWindow(app.id, app.name)}
              isOpen={isAppOpen(app.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              isHovered={hoveredIndex === index}
              isNeighborHovered={
                hoveredIndex !== null &&
                (Math.abs(hoveredIndex - index) === 1)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dock;
