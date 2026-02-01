import React from 'react';
import { AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { useApp } from '../../context/AppContext';
export const ClinicalAlerts = () => {
  const { state } = useApp();
  // Mock logic for alerts based on seed data
  const alerts = [
  {
    id: 1,
    type: 'pain_load',
    patient: 'Carlos Mendez',
    message: 'Dolor alto (6/10) con carga elevada en última sesión',
    severity: 'high',
    icon: AlertTriangle
  },
  {
    id: 2,
    type: 'plateau',
    patient: 'Laura Gomez',
    message: 'Sin mejora en ROM por 3 sesiones consecutivas',
    severity: 'medium',
    icon: TrendingUp
  },
  {
    id: 3,
    type: 'asymmetry',
    patient: 'Martin Rodriguez',
    message: 'Asimetría > 15% en fuerza de cuádriceps',
    severity: 'medium',
    icon: Activity
  }];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Alertas Clínicas</h3>
      </div>
      <div className="p-4 space-y-3">
        {alerts.map((alert) =>
        <div
          key={alert.id}
          className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100">

            <div
            className={`p-2 rounded-full mr-3 ${alert.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>

              <alert.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {alert.patient}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">{alert.message}</p>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
              Ver
            </button>
          </div>
        )}
      </div>
    </div>);

};