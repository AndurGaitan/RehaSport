import React, { useState } from 'react';
import { User, Bell, Shield, Clock } from 'lucide-react';
import { Tabs } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useApp } from '../../context/AppContext';
export const SettingsView = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-gray-900">Configuración</h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6">
          <Tabs
            tabs={[
            {
              id: 'profile',
              label: 'Perfil',
              icon: <User className="h-4 w-4" />
            },
            {
              id: 'preferences',
              label: 'Preferencias',
              icon: <Clock className="h-4 w-4" />
            },
            {
              id: 'admin',
              label: 'Admin',
              icon: <Shield className="h-4 w-4" />
            }]
            }
            activeTab={activeTab}
            onChange={setActiveTab} />

        </div>

        <div className="p-6 max-w-2xl">
          {activeTab === 'profile' &&
          <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                  DV
                </div>
                <div>
                  <h3 className="text-lg font-medium">Klgo. Gaitán Andrés David</h3>
                  <p className="text-gray-500">Kinesiólogo Deportivo</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Nombre" defaultValue="Gaitán Andrés David" />
                <Input label="Email" defaultValue="GaitanAndresDavid@rehasport.com" />
                <Input label="Matrícula" defaultValue="MN 12345" />
                <Input label="Teléfono" defaultValue="+54 911 1234 5678" />
              </div>
              <Button>Guardar Cambios</Button>
            </div>
          }

          {activeTab === 'preferences' &&
          <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Agenda</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                  label="Duración Default (min)"
                  type="number"
                  defaultValue={state.settings.defaultAppointmentDuration} />

                  <Input
                  label="Inicio Jornada"
                  type="time"
                  defaultValue={state.settings.workingHours.start} />

                  <Input
                  label="Fin Jornada"
                  type="time"
                  defaultValue={state.settings.workingHours.end} />

                </div>
              </div>
              <Button>Actualizar Preferencias</Button>
            </div>
          }

          {activeTab === 'admin' &&
          <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-medium text-yellow-800">
                  Zona Administrativa
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Gestión de usuarios, roles y facturación (Demo)
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Gestionar Usuarios
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Configurar Servicios y Precios
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Gestionar Boxes y Recursos
                </Button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

};