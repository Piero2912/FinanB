import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Wallet,
  Target,
  Tag,
  User,
  Menu,
  X,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { label: 'Movimientos', icon: CreditCard, href: '/transactions' },
    { label: 'Estadísticas', icon: BarChart3, href: '/analytics' },
    { label: 'Presupuestos', icon: Wallet, href: '/budgets' },
    { label: 'Metas', icon: Target, href: '/goals' },
    { label: 'Categorías', icon: Tag, href: '/categories' },
    { label: 'Perfil', icon: User, href: '/profile' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const MenuContent = () => (
    <nav className="space-y-1 flex-1">
      {menuItems.map(item => (
        <Link
          key={item.href}
          to={item.href}
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive(item.href)
              ? 'bg-primary-100 text-primary-700 font-medium'
              : 'text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-200 h-screen fixed left-0 top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600">FinanBlue</h1>
        </div>
        <MenuContent />
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 hover:bg-neutral-100 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 w-64 bg-white h-screen overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pb-4">
          <h1 className="text-2xl font-bold text-primary-600">FinanBlue</h1>
        </div>
        <MenuContent />
      </aside>
    </>
  );
};
