import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CreditCard,
  Plus,
  BarChart3,
  User,
} from 'lucide-react';

interface BottomNavProps {
  onNewTransaction?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onNewTransaction }) => {
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  const items = [
    { label: 'Inicio', icon: LayoutDashboard, href: '/' },
    { label: 'Movimientos', icon: CreditCard, href: '/transactions' },
    { label: 'Nuevo', icon: Plus, href: '#', onClick: onNewTransaction },
    { label: 'Estadísticas', icon: BarChart3, href: '/analytics' },
    { label: 'Perfil', icon: User, href: '/profile' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map(item => {
          const Component = item.onClick ? 'button' : Link;
          const props = item.onClick
            ? {
                onClick: item.onClick,
                className: 'flex flex-col items-center justify-center gap-1 p-3 rounded-lg hover:bg-neutral-50 transition-colors',
              }
            : {
                to: item.href,
                className: `flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`,
              };

          return (
            <Component key={item.label} {...props}>
              <item.icon className={`w-6 h-6 ${item.label === 'Nuevo' ? 'text-primary-600' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Component>
          );
        })}
      </div>
    </nav>
  );
};
