import React from 'react';
import { useOS } from '../contexts/OSContext';

interface DockAppProps {
  id: string;
  name: string;
  icon: string;
  onClick: () => void;
}

const DockApp: React.FC<DockAppProps> = ({ name, icon, onClick }) => {
  return (
    <div
      className="group relative flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-110"
      onClick={onClick}
    >
      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl shadow-lg hover:bg-white/20 transition-all">
        {icon}
      </div>
      <div className="absolute -top-10 bg-black/75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {name}
      </div>
    </div>
  );
};

const Dock: React.FC = () => {
  const { openWindow } = useOS();

  const apps = [
    { id: 'finder', name: 'Finder', icon: '📁' },
    { id: 'terminal', name: 'Terminal', icon: '⌨️' },
    { id: 'trash', name: 'Trash', icon: '🗑️' },
    { id: 'computer', name: 'About This Mac', icon: '💻' },
  ];

  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-2 shadow-2xl">
        <div className="flex items-center space-x-2">
          {apps.map((app) => (
            <DockApp
              key={app.id}
              id={app.id}
              name={app.name}
              icon={app.icon}
              onClick={() => openWindow(app.id, app.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dock;
