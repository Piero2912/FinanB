import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

interface NotificationProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  type = 'info',
  title,
  message,
  onClose,
}) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const styles = {
    success: 'bg-green-50 border-green-200 text-success',
    error: 'bg-red-50 border-red-200 text-danger',
    warning: 'bg-amber-50 border-amber-200 text-warning',
    info: 'bg-primary-50 border-primary-200 text-primary-700',
  };

  return (
    <div className={`border rounded-lg p-4 flex gap-3 ${styles[type]}`}>
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        <p className={`${title ? 'text-sm' : ''}`}>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="flex-shrink-0 hover:opacity-70">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
