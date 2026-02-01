import React, { useCallback, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X, Info } from 'lucide-react';
type ToastType = 'success' | 'error' | 'warning' | 'info';
interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}
interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
export const ToastProvider = ({ children }: {children: React.ReactNode;}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback(
    (message: string, type: ToastType = 'success', duration = 4000) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        type,
        duration
      }]
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    []
  );
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  };
  const bgColors = {
    success: 'bg-emerald-50 border-emerald-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-amber-50 border-amber-200',
    info: 'bg-blue-50 border-blue-200'
  };
  return (
    <ToastContext.Provider
      value={{
        showToast
      }}>

      {children}

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) =>
          <motion.div
            key={toast.id}
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              x: 100,
              scale: 0.95
            }}
            transition={{
              duration: 0.2,
              ease: 'easeOut'
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[300px] ${bgColors[toast.type]}`}>

              {icons[toast.type]}
              <span className="flex-1 text-sm font-medium text-gray-800">
                {toast.message}
              </span>
              <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black/5 rounded transition-colors">

                <X className="h-4 w-4 text-gray-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>);

};