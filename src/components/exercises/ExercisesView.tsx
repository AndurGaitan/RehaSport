import React, { useState } from 'react';
import { Search, Plus, Filter, Dumbbell, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { ProgramBuilder } from './ProgramBuilder';
export const ExercisesView = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('library');
  const [searchTerm, setSearchTerm] = useState('');
  const [showProgramBuilder, setShowProgramBuilder] = useState(false);
  if (showProgramBuilder) {
    return <ProgramBuilder onBack={() => setShowProgramBuilder(false)} />;
  }
  const filteredExercises = state.exercises.filter(
    (ex) =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Ejercicios y Planes
        </h2>
        {activeTab === 'programs' &&
        <Button onClick={() => setShowProgramBuilder(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Programa
          </Button>
        }
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6">
          <Tabs
            tabs={[
            {
              id: 'library',
              label: 'Biblioteca de Ejercicios',
              icon: <Dumbbell className="h-4 w-4" />
            },
            {
              id: 'programs',
              label: 'Plantillas de Programas',
              icon: <BookOpen className="h-4 w-4" />
            }]
            }
            activeTab={activeTab}
            onChange={setActiveTab} />

        </div>

        <div className="p-6">
          {activeTab === 'library' &&
          <div className="space-y-6">
              <div className="flex gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                  type="text"
                  placeholder="Buscar ejercicios..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} />

                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map((ex) =>
              <div
                key={ex.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white">

                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="info">{ex.category}</Badge>
                      {ex.videoUrl &&
                  <span className="text-xs text-blue-500">Video</span>
                  }
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{ex.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {ex.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {ex.tags.map((tag) =>
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">

                          #{tag}
                        </span>
                  )}
                    </div>
                  </div>
              )}
              </div>
            </div>
          }

          {activeTab === 'programs' &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.programs.map((prog) =>
            <div
              key={prog.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">

                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-900">
                      {prog.name}
                    </h3>
                    <Badge variant="neutral">{prog.phase}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {prog.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Frecuencia:</span>
                      <span className="font-medium">
                        {prog.weeklyFrequency} días/sem
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ejercicios:</span>
                      <span className="font-medium">
                        {prog.exercises.length}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3">
                    <Button variant="outline" className="w-full">
                      Editar
                    </Button>
                    <Button variant="secondary" className="w-full">
                      Duplicar
                    </Button>
                  </div>
                </div>
            )}
            </div>
          }
        </div>
      </div>
    </div>);

};