import React from 'react';
import { useApp } from '../../context/AppContext';

export const TopBar: React.FC = () => {
  const { profile } = useApp();

  return (
    <div className="hidden lg:block bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div className="ml-64 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-neutral-500 text-sm">Bienvenido</h2>
          <p className="text-lg font-semibold text-neutral-900">{profile.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
            {profile.avatar}
          </div>
        </div>
      </div>
    </div>
  );
};
