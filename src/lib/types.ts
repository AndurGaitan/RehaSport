export type AppointmentStatus =
'scheduled' |
'confirmed' |
'checked_in' |
'in_session' |
'completed' |
'cancelled' |
'no_show';

export type AppointmentType = 'evaluacion' | 'sesion' | 'control' | 'retorno';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  notes?: string;
  photoUrl?: string;
  sport?: string;
  position?: string;
  level?: 'amateur' | 'semi-pro' | 'professional';
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  color: string;
}

export interface Box {
  id: string;
  name: string;
}

export interface Episode {
  id: string;
  patientId: string;
  injury: string; // e.g., "ACL Reconstruction"
  status: 'active' | 'completed' | 'on_hold';
  startDate: string;
  phase: string; // e.g., "Phase 1: Protection", "Phase 2: ROM"
  diagnosis?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  episodeId?: string;
  professionalId: string;
  boxId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (24h)
  duration: number; // minutes
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'fuerza' | 'movilidad' | 'control_motor' | 'cardio' | 'pliometria';
  description: string;
  defaultSets?: number;
  defaultReps?: string;
  videoUrl?: string;
  tags: string[];
}

export interface ExerciseDose {
  exerciseId: string;
  sets: number;
  reps: string;
  load: number; // kg
  rpe: number; // 1-10
  tempo?: string; // e.g., "3-0-1"
  rest?: number; // seconds
  tolerance: 'bien' | 'regular' | 'mal';
  notes?: string;
}

export interface SessionNote {
  id: string;
  appointmentId: string;
  episodeId: string;
  patientId: string;
  date: string;
  painLevel: number; // 0-10
  readiness: number; // 1-5
  sessionGoal: string;
  soapNote: {
    subjective: string;
    objective: string;
    analysis: string;
    plan: string;
  };
  exerciseDoses: ExerciseDose[];
  createdAt: string;
}

export interface ExercisePrescription {
  id: string;
  episodeId: string;
  exercises: {
    exerciseId: string;
    targetSets: number;
    targetReps: string;
    targetLoad?: string;
    notes?: string;
  }[];
  weeklySchedule: number[]; // 0-6 (Sunday-Saturday)
  startDate: string;
  endDate?: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  phase: string;
  exercises: {
    exerciseId: string;
    day: number; // 1-7
    targetSets: number;
    targetReps: string;
    targetLoad?: string;
    notes?: string;
  }[];
  weeklyFrequency: number;
  progressionCriteria: string;
  createdAt: string;
}

export interface PRO {
  id: string;
  patientId: string;
  episodeId?: string;
  date: string;
  painLevel: number;
  sleepQuality: number; // 1-5
  readiness: number; // 1-5
  notes?: string;
}

export interface Settings {
  defaultAppointmentDuration: number;
  workingHours: {start: string;end: string;};
  theme: 'light' | 'dark';
}