import React, { useEffect, createContext, useContext, useReducer } from 'react';
import {
  Patient,
  Professional,
  Box,
  Episode,
  Appointment,
  Exercise,
  SessionNote,
  ExercisePrescription,
  Program,
  PRO,
  Settings } from
'../lib/types';
import { db, initializeStorage } from '../lib/storage';
interface AppState {
  patients: Patient[];
  professionals: Professional[];
  boxes: Box[];
  episodes: Episode[];
  appointments: Appointment[];
  exercises: Exercise[];
  sessionNotes: SessionNote[];
  prescriptions: ExercisePrescription[];
  programs: Program[];
  pros: PRO[];
  settings: Settings;
  activeView: string;
  selectedPatientId?: string;
  isLoading: boolean;
}
type Action =
{
  type: 'LOAD_DATA';
  payload: Partial<AppState>;
} |
{
  type: 'SET_VIEW';
  payload: string;
} |
{
  type: 'SET_SELECTED_PATIENT';
  payload: string | undefined;
} |
{
  type: 'ADD_APPOINTMENT';
  payload: Appointment;
} |
{
  type: 'UPDATE_APPOINTMENT';
  payload: Appointment;
} |
{
  type: 'DELETE_APPOINTMENT';
  payload: string;
} |
{
  type: 'ADD_SESSION_NOTE';
  payload: SessionNote;
} |
{
  type: 'UPDATE_SESSION_NOTE';
  payload: SessionNote;
} |
{
  type: 'ADD_PATIENT';
  payload: Patient;
} |
{
  type: 'UPDATE_PATIENT';
  payload: Patient;
} |
{
  type: 'ADD_EPISODE';
  payload: Episode;
} |
{
  type: 'UPDATE_EPISODE';
  payload: Episode;
} |
{
  type: 'ADD_EXERCISE';
  payload: Exercise;
} |
{
  type: 'ADD_PRESCRIPTION';
  payload: ExercisePrescription;
} |
{
  type: 'UPDATE_PRESCRIPTION';
  payload: ExercisePrescription;
} |
{
  type: 'ADD_PROGRAM';
  payload: Program;
} |
{
  type: 'UPDATE_PROGRAM';
  payload: Program;
} |
{
  type: 'DELETE_PROGRAM';
  payload: string;
} |
{
  type: 'ADD_PRO';
  payload: PRO;
} |
{
  type: 'UPDATE_SETTINGS';
  payload: Settings;
};
const initialState: AppState = {
  patients: [],
  professionals: [],
  boxes: [],
  episodes: [],
  appointments: [],
  exercises: [],
  sessionNotes: [],
  prescriptions: [],
  programs: [],
  pros: [],
  settings: {
    defaultAppointmentDuration: 60,
    workingHours: {
      start: '08:00',
      end: '20:00'
    },
    theme: 'light'
  },
  activeView: 'dashboard',
  isLoading: true
};
const AppContext = createContext<
  {
    state: AppState;
    dispatch: React.Dispatch<Action>;
    actions: {
      resetDemo: () => void;
    };
  } |
  undefined>(
  undefined);
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case 'SET_VIEW':
      return {
        ...state,
        activeView: action.payload
      };
    case 'SET_SELECTED_PATIENT':
      return {
        ...state,
        selectedPatientId: action.payload
      };
    case 'ADD_APPOINTMENT':
      db.appointments.add(action.payload);
      return {
        ...state,
        appointments: [...state.appointments, action.payload]
      };
    case 'UPDATE_APPOINTMENT':
      db.appointments.update(action.payload);
      return {
        ...state,
        appointments: state.appointments.map((a) =>
        a.id === action.payload.id ? action.payload : a
        )
      };
    case 'DELETE_APPOINTMENT':
      db.appointments.delete(action.payload);
      return {
        ...state,
        appointments: state.appointments.filter((a) => a.id !== action.payload)
      };
    case 'ADD_SESSION_NOTE':
      db.sessionNotes.add(action.payload);
      return {
        ...state,
        sessionNotes: [...state.sessionNotes, action.payload]
      };
    case 'UPDATE_SESSION_NOTE':
      db.sessionNotes.update(action.payload);
      return {
        ...state,
        sessionNotes: state.sessionNotes.map((n) =>
        n.id === action.payload.id ? action.payload : n
        )
      };
    case 'ADD_PATIENT':
      db.patients.add(action.payload);
      return {
        ...state,
        patients: [...state.patients, action.payload]
      };
    case 'UPDATE_PATIENT':
      db.patients.update(action.payload);
      return {
        ...state,
        patients: state.patients.map((p) =>
        p.id === action.payload.id ? action.payload : p
        )
      };
    case 'ADD_EPISODE':
      db.episodes.add(action.payload);
      return {
        ...state,
        episodes: [...state.episodes, action.payload]
      };
    case 'UPDATE_EPISODE':
      db.episodes.update(action.payload);
      return {
        ...state,
        episodes: state.episodes.map((e) =>
        e.id === action.payload.id ? action.payload : e
        )
      };
    case 'ADD_EXERCISE':
      db.exercises.add(action.payload);
      return {
        ...state,
        exercises: [...state.exercises, action.payload]
      };
    case 'ADD_PRESCRIPTION':
      db.prescriptions.add(action.payload);
      return {
        ...state,
        prescriptions: [...state.prescriptions, action.payload]
      };
    case 'UPDATE_PRESCRIPTION':
      db.prescriptions.update(action.payload);
      return {
        ...state,
        prescriptions: state.prescriptions.map((p) =>
        p.id === action.payload.id ? action.payload : p
        )
      };
    case 'ADD_PROGRAM':
      db.programs.add(action.payload);
      return {
        ...state,
        programs: [...state.programs, action.payload]
      };
    case 'UPDATE_PROGRAM':
      db.programs.update(action.payload);
      return {
        ...state,
        programs: state.programs.map((p) =>
        p.id === action.payload.id ? action.payload : p
        )
      };
    case 'DELETE_PROGRAM':
      db.programs.delete(action.payload);
      return {
        ...state,
        programs: state.programs.filter((p) => p.id !== action.payload)
      };
    case 'ADD_PRO':
      db.pros.add(action.payload);
      return {
        ...state,
        pros: [...state.pros, action.payload]
      };
    case 'UPDATE_SETTINGS':
      db.settings.set(action.payload);
      return {
        ...state,
        settings: action.payload
      };
    default:
      return state;
  }
}
export function AppProvider({ children }: {children: ReactNode;}) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    initializeStorage();
    const data = {
      patients: db.patients.getAll(),
      professionals: db.professionals.getAll(),
      boxes: db.boxes.getAll(),
      episodes: db.episodes.getAll(),
      appointments: db.appointments.getAll(),
      exercises: db.exercises.getAll(),
      sessionNotes: db.sessionNotes.getAll(),
      prescriptions: db.prescriptions.getAll(),
      programs: db.programs.getAll(),
      pros: db.pros.getAll(),
      settings: db.settings.get()
    };
    dispatch({
      type: 'LOAD_DATA',
      payload: data
    });
  }, []);
  const actions = {
    resetDemo: () => db.resetDemo()
  };
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        actions
      }}>

      {children}
    </AppContext.Provider>);

}
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}