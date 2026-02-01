import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, Clock } from 'lucide-react';
import { Tabs } from '../ui/Tabs';
import { useApp } from '../../context/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
const mockOccupancyData = [
{
  day: 'Lun',
  ocupacion: 85
},
{
  day: 'Mar',
  ocupacion: 92
},
{
  day: 'Mie',
  ocupacion: 78
},
{
  day: 'Jue',
  ocupacion: 88
},
{
  day: 'Vie',
  ocupacion: 75
}];

export const ReportsView = () => {
  const [activeTab, setActiveTab] = useState('operativos');
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-gray-900">Reportes y Métricas</h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6">
          <Tabs
            tabs={[
            {
              id: 'operativos',
              label: 'Operativos',
              icon: <BarChart2 className="h-4 w-4" />
            },
            {
              id: 'clinicos',
              label: 'Clínicos',
              icon: <TrendingUp className="h-4 w-4" />
            }]
            }
            activeTab={activeTab}
            onChange={setActiveTab} />

        </div>

        <div className="p-6">
          {activeTab === 'operativos' &&
          <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">
                      Ocupación Semanal
                    </span>
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">84%</p>
                  <p className="text-xs text-green-600 mt-1">
                    ↑ 5% vs semana anterior
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Tasa No-Show</span>
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">4.2%</p>
                  <p className="text-xs text-green-600 mt-1">
                    ↓ 1.5% vs semana anterior
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">
                      Duración Promedio
                    </span>
                    <Clock className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">52m</p>
                  <p className="text-xs text-gray-500 mt-1">Target: 60m</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Ocupación por Día
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockOccupancyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar
                      dataKey="ocupacion"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]} />

                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          }

          {activeTab === 'clinicos' &&
          <div className="text-center py-20 text-gray-400">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Reportes de evolución clínica en desarrollo (Demo)</p>
            </div>
          }
        </div>
      </div>
    </div>);

};