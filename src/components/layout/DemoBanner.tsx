import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
export const DemoBanner = () => {
  const { actions } = useApp();
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-center gap-4 text-sm text-amber-800 fixed top-0 left-0 right-0 z-20">
      <div className="flex items-center">
        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
        <span className="font-medium">DEMO</span>
        <span className="hidden sm:inline ml-1">
          — Datos guardados en localStorage
        </span>
      </div>
      <button
        onClick={actions.resetDemo}
        className="flex items-center px-2 py-1 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-700 hover:text-amber-900 font-medium transition-colors">

        <RefreshCw className="h-3 w-3 mr-1.5" />
        Reiniciar datos
      </button>
    </div>);

};