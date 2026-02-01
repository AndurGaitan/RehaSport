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
'./types';
import {
  seedPatients,
  seedProfessionals,
  seedBoxes,
  seedEpisodes,
  seedAppointments,
  seedExercises,
  seedSessionNotes,
  seedPrescriptions,
  seedPrograms,
  seedPROs,
  seedSettings } from
'./seedData';

const KEYS = {
  PATIENTS: 'rehasport_patients',
  PROFESSIONALS: 'rehasport_professionals',
  BOXES: 'rehasport_boxes',
  EPISODES: 'rehasport_episodes',
  APPOINTMENTS: 'rehasport_appointments',
  EXERCISES: 'rehasport_exercises',
  SESSION_NOTES: 'rehasport_session_notes',
  PRESCRIPTIONS: 'rehasport_prescriptions',
  PROGRAMS: 'rehasport_programs',
  PROS: 'rehasport_pros',
  SETTINGS: 'rehasport_settings'
};

// Generic storage helper
const storage = {
  get: <T,>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage`, e);
      return defaultValue;
    }
  },
  set: <T,>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing ${key} to localStorage`, e);
    }
  },
  reset: () => {
    localStorage.clear();
    window.location.reload();
  }
};

// Initialize with seed data if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(KEYS.PATIENTS)) {
    storage.set(KEYS.PATIENTS, seedPatients);
    storage.set(KEYS.PROFESSIONALS, seedProfessionals);
    storage.set(KEYS.BOXES, seedBoxes);
    storage.set(KEYS.EPISODES, seedEpisodes);
    storage.set(KEYS.APPOINTMENTS, seedAppointments);
    storage.set(KEYS.EXERCISES, seedExercises);
    storage.set(KEYS.SESSION_NOTES, seedSessionNotes);
    storage.set(KEYS.PRESCRIPTIONS, seedPrescriptions);
    storage.set(KEYS.PROGRAMS, seedPrograms);
    storage.set(KEYS.PROS, seedPROs);
    storage.set(KEYS.SETTINGS, seedSettings);
    console.log('Storage initialized with seed data');
  }
};

// Data Access Object
export const db = {
  patients: {
    getAll: () => storage.get<Patient[]>(KEYS.PATIENTS, []),
    add: (item: Patient) => {
      const items = db.patients.getAll();
      storage.set(KEYS.PATIENTS, [...items, item]);
    },
    update: (item: Patient) => {
      const items = db.patients.getAll();
      storage.set(
        KEYS.PATIENTS,
        items.map((i) => i.id === item.id ? item : i)
      );
    }
  },
  appointments: {
    getAll: () => storage.get<Appointment[]>(KEYS.APPOINTMENTS, []),
    add: (item: Appointment) => {
      const items = db.appointments.getAll();
      storage.set(KEYS.APPOINTMENTS, [...items, item]);
    },
    update: (item: Appointment) => {
      const items = db.appointments.getAll();
      storage.set(
        KEYS.APPOINTMENTS,
        items.map((i) => i.id === item.id ? item : i)
      );
    },
    delete: (id: string) => {
      const items = db.appointments.getAll();
      storage.set(
        KEYS.APPOINTMENTS,
        items.filter((i) => i.id !== id)
      );
    }
  },
  sessionNotes: {
    getAll: () => storage.get<SessionNote[]>(KEYS.SESSION_NOTES, []),
    add: (item: SessionNote) => {
      const items = db.sessionNotes.getAll();
      storage.set(KEYS.SESSION_NOTES, [...items, item]);
    },
    update: (item: SessionNote) => {
      const items = db.sessionNotes.getAll();
      storage.set(
        KEYS.SESSION_NOTES,
        items.map((i) => i.id === item.id ? item : i)
      );
    }
  },
  episodes: {
    getAll: () => storage.get<Episode[]>(KEYS.EPISODES, []),
    add: (item: Episode) => {
      const items = db.episodes.getAll();
      storage.set(KEYS.EPISODES, [...items, item]);
    },
    update: (item: Episode) => {
      const items = db.episodes.getAll();
      storage.set(
        KEYS.EPISODES,
        items.map((i) => i.id === item.id ? item : i)
      );
    }
  },
  exercises: {
    getAll: () => storage.get<Exercise[]>(KEYS.EXERCISES, []),
    add: (item: Exercise) => {
      const items = db.exercises.getAll();
      storage.set(KEYS.EXERCISES, [...items, item]);
    }
  },
  professionals: {
    getAll: () => storage.get<Professional[]>(KEYS.PROFESSIONALS, [])
  },
  boxes: {
    getAll: () => storage.get<Box[]>(KEYS.BOXES, [])
  },
  prescriptions: {
    getAll: () => storage.get<ExercisePrescription[]>(KEYS.PRESCRIPTIONS, []),
    add: (item: ExercisePrescription) => {
      const items = db.prescriptions.getAll();
      storage.set(KEYS.PRESCRIPTIONS, [...items, item]);
    },
    update: (item: ExercisePrescription) => {
      const items = db.prescriptions.getAll();
      storage.set(
        KEYS.PRESCRIPTIONS,
        items.map((i) => i.id === item.id ? item : i)
      );
    }
  },
  programs: {
    getAll: () => storage.get<Program[]>(KEYS.PROGRAMS, []),
    add: (item: Program) => {
      const items = db.programs.getAll();
      storage.set(KEYS.PROGRAMS, [...items, item]);
    },
    update: (item: Program) => {
      const items = db.programs.getAll();
      storage.set(
        KEYS.PROGRAMS,
        items.map((i) => i.id === item.id ? item : i)
      );
    },
    delete: (id: string) => {
      const items = db.programs.getAll();
      storage.set(
        KEYS.PROGRAMS,
        items.filter((i) => i.id !== id)
      );
    }
  },
  pros: {
    getAll: () => storage.get<PRO[]>(KEYS.PROS, []),
    add: (item: PRO) => {
      const items = db.pros.getAll();
      storage.set(KEYS.PROS, [...items, item]);
    }
  },
  settings: {
    get: () => storage.get<Settings>(KEYS.SETTINGS, seedSettings),
    set: (item: Settings) => storage.set(KEYS.SETTINGS, item)
  },
  resetDemo: storage.reset
};