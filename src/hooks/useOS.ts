import { useContext } from 'react';
import { OSContext } from '../contexts/OSContext';

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within OSProvider');
  }
  return context;
};
