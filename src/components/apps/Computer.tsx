import React from 'react';
import { useOS } from '../../hooks/useOS';

interface ComputerItemProps {
  icon: string;
  name: string;
  onClick: () => void;
}

const ComputerItem: React.FC<ComputerItemProps> = ({ icon, name, onClick }) => {
  return (
    <div
      className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg cursor-pointer w-24"
      onClick={onClick}
    >
      <div className="text-5xl mb-2">{icon}</div>
      <div className="text-sm text-center">{name}</div>
    </div>
  );
};

const Computer: React.FC = () => {
  const { openWindow } = useOS();

  const handleItemClick = (isTrash: boolean) => {
    if (isTrash) {
      openWindow('trash', 'Trash');
    } else {
      openWindow('finder', 'Finder');
    }
  };

  return (
    <div className="w-full h-full flex flex-wrap content-start bg-white p-8">
      <ComputerItem
        icon="🗂️"
        name="Documents"
        onClick={() => handleItemClick(false)}
      />
      <ComputerItem
        icon="📥"
        name="Downloads"
        onClick={() => handleItemClick(false)}
      />
      <ComputerItem
        icon="🚀"
        name="Applications"
        onClick={() => handleItemClick(false)}
      />
      <ComputerItem
        icon="🗑️"
        name="Trash"
        onClick={() => handleItemClick(true)}
      />
    </div>
  );
};

export default Computer;
