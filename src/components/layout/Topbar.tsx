import React, { useEffect, useState, useRef } from 'react';
import { Plus, Search, Calendar, UserPlus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
export const Topbar = () => {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const today = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  // Filter patients based on search term
  const filteredPatients =
  searchTerm.length > 0 ?
  state.patients.
  filter(
    (p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  ).
  slice(0, 5) :
  [];
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node))
      {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  const handleSelectPatient = (patientId: string) => {
    dispatch({
      type: 'SET_SELECTED_PATIENT',
      payload: patientId
    });
    dispatch({
      type: 'SET_VIEW',
      payload: 'patients'
    });
    setSearchTerm('');
    setIsSearchOpen(false);
  };
  return (
    <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <div className="flex items-center text-gray-500 text-sm capitalize">
        <Calendar className="h-4 w-4 mr-2" />
        {today}
      </div>

      <div className="flex-1 max-w-md mx-6" ref={searchRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-8 py-1.5 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Buscar paciente (⌘K)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)} />

          {searchTerm &&
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center">

              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          }

          {/* Search Results Dropdown */}
          {isSearchOpen && searchTerm.length > 0 &&
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
              {filteredPatients.length > 0 ?
            <ul className="py-1">
                  {filteredPatients.map((patient) => {
                const activeEpisode = state.episodes.find(
                  (e) =>
                  e.patientId === patient.id && e.status === 'active'
                );
                return (
                  <li key={patient.id}>
                        <button
                      onClick={() => handleSelectPatient(patient.id)}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors">

                          <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                            {patient.photoUrl ?
                        <img
                          src={patient.photoUrl}
                          alt=""
                          className="h-full w-full object-cover" /> :


                        <div className="h-full w-full flex items-center justify-center text-gray-500 text-sm font-medium">
                                {patient.name.charAt(0)}
                              </div>
                        }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {patient.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {activeEpisode ?
                          activeEpisode.injury :
                          patient.sport || patient.email}
                            </p>
                          </div>
                          {activeEpisode &&
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                              Activo
                            </span>
                      }
                        </button>
                      </li>);

              })}
                </ul> :

            <div className="px-4 py-6 text-center text-gray-500 text-sm">
                  No se encontraron pacientes
                </div>
            }
            </div>
          }
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
          dispatch({
            type: 'SET_VIEW',
            payload: 'patients'
          })
          }>

          <UserPlus className="h-4 w-4 mr-2" />
          Paciente
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={() =>
          dispatch({
            type: 'SET_VIEW',
            payload: 'agenda'
          })
          }>

          <Plus className="h-4 w-4 mr-2" />
          Nuevo Turno
        </Button>
      </div>
    </div>);

};