import React from 'react';
import { useOS } from '../contexts/OSContext';
import Window from './Window';
import Finder from './apps/Finder';
import Terminal from './apps/Terminal';
import Trash from './apps/Trash';
import Computer from './apps/Computer';

const WindowManager: React.FC = () => {
  const { windows } = useOS();

  const getAppComponent = (appId: string) => {
    switch (appId) {
      case 'finder':
        return <Finder />;
      case 'terminal':
        return <Terminal />;
      case 'trash':
        return <Trash />;
      case 'computer':
        return <Computer />;
      default:
        return <div className="p-4">Unknown application</div>;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full pointer-events-auto">
        {windows.map((window) => (
          <Window key={window.id} window={window}>
            {getAppComponent(window.appId)}
          </Window>
        ))}
      </div>
    </div>
  );
};

export default WindowManager;
