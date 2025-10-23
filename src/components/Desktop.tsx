import React from 'react';

const Desktop: React.FC = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background: 'linear-gradient(to top right, #6d76cb, #2d2f45, #f5b078, #ea5553)',
        backgroundSize: '400% 400%',
        animation: 'wallpaper-gradient 30s ease infinite',
      }}
    />
  );
};

export default Desktop;
