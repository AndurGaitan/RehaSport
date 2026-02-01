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

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// 1. Professionals
export const seedProfessionals: Professional[] = [
{
  id: 'prof1',
  name: 'Dr. Alejandro Vega',
  specialty: 'Kinesiólogo Deportivo',
  color: 'blue'
},
{
  id: 'prof2',
  name: 'Lic. Sofia Martinez',
  specialty: 'Osteópata',
  color: 'emerald'
}];


// 2. Boxes
export const seedBoxes: Box[] = [
{ id: 'box1', name: 'Box 1 - Camilla' },
{ id: 'box2', name: 'Box 2 - Gimnasio' },
{ id: 'box3', name: 'Box 3 - Funcional' }];


// 3. Patients
export const seedPatients: Patient[] = [
{
  id: 'pat1',
  name: 'Carlos Mendez',
  email: 'carlos.m@example.com',
  phone: '+54 911 1234 5678',
  dateOfBirth: '1995-05-15',
  notes: 'Jugador de fútbol amateur. Motivado.',
  photoUrl:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  sport: 'Fútbol',
  position: 'Delantero',
  level: 'amateur'
},
{
  id: 'pat2',
  name: 'Laura Gomez',
  email: 'laura.g@example.com',
  phone: '+54 911 8765 4321',
  dateOfBirth: '1988-11-20',
  notes: 'Corredora de maratón.',
  photoUrl:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  sport: 'Running',
  level: 'amateur'
},
{
  id: 'pat3',
  name: 'Martin Rodriguez',
  email: 'martin.r@example.com',
  phone: '+54 911 5555 6666',
  dateOfBirth: '2000-02-10',
  notes: 'Post-operatorio reciente.',
  photoUrl:
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  sport: 'Rugby',
  position: 'Wing',
  level: 'semi-pro'
},
{
  id: 'pat4',
  name: 'Ana Torres',
  email: 'ana.t@example.com',
  phone: '+54 911 4444 3333',
  dateOfBirth: '1992-08-25',
  notes: 'Historial de inasistencias.',
  photoUrl:
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  sport: 'Crossfit',
  level: 'amateur'
}];


// 4. Episodes
export const seedEpisodes: Episode[] = [
{
  id: 'ep1',
  patientId: 'pat1',
  injury: 'Reconstrucción LCA Rodilla Derecha',
  status: 'active',
  startDate: '2023-11-10',
  phase: 'Fase 3: Fortalecimiento',
  diagnosis: 'Post-operatorio LCA + Menisco externo'
},
{
  id: 'ep2',
  patientId: 'pat2',
  injury: 'Tendinopatía Aquilea',
  status: 'active',
  startDate: '2024-01-15',
  phase: 'Fase 2: Carga progresiva',
  diagnosis: 'Tendinopatía media porción Aquiles izquierdo'
},
{
  id: 'ep3',
  patientId: 'pat3',
  injury: 'Luxación de Hombro',
  status: 'active',
  startDate: '2024-02-01',
  phase: 'Fase 1: Protección',
  diagnosis: 'Bankart repair post-op'
},
{
  id: 'ep4',
  patientId: 'pat4',
  injury: 'Esguince de Tobillo',
  status: 'on_hold',
  startDate: '2023-12-01',
  phase: 'Fase 2: ROM',
  diagnosis: 'Esguince G2 LLE'
}];


// 5. Exercises
export const seedExercises: Exercise[] = [
{
  id: 'ex1',
  name: 'Sentadilla Copa',
  category: 'fuerza',
  description: 'Sentadilla con mancuerna al pecho',
  defaultSets: 3,
  defaultReps: '10-12',
  tags: ['rodilla', 'cuadriceps']
},
{
  id: 'ex2',
  name: 'Peso Muerto Rumano',
  category: 'fuerza',
  description: 'Bisagra de cadera con barra o mancuernas',
  defaultSets: 3,
  defaultReps: '8-10',
  tags: ['isquios', 'cadena posterior']
},
{
  id: 'ex3',
  name: 'Puente de Glúteos Unipodal',
  category: 'control_motor',
  description: 'Elevación de pelvis a una pierna',
  defaultSets: 3,
  defaultReps: '12-15',
  tags: ['gluteo', 'estabilidad']
},
{
  id: 'ex4',
  name: 'Monster Walk',
  category: 'control_motor',
  description: 'Caminata lateral con banda',
  defaultSets: 3,
  defaultReps: '15 pasos',
  tags: ['gluteo medio']
},
{
  id: 'ex5',
  name: 'Saltos al Cajón',
  category: 'pliometria',
  description: 'Salto bipodal a cajón de 60cm',
  defaultSets: 4,
  defaultReps: '6',
  tags: ['potencia']
},
{
  id: 'ex6',
  name: 'Bicicleta Estática',
  category: 'cardio',
  description: 'Pedaleo a cadencia media',
  defaultSets: 1,
  defaultReps: '10 min',
  tags: ['calentamiento']
},
{
  id: 'ex7',
  name: 'Plancha Frontal',
  category: 'control_motor',
  description: 'Isometría de core',
  defaultSets: 3,
  defaultReps: '45 seg',
  tags: ['core']
},
{
  id: 'ex8',
  name: 'Estocadas',
  category: 'fuerza',
  description: 'Zancada hacia adelante',
  defaultSets: 3,
  defaultReps: '10/pierna',
  tags: ['rodilla', 'fuerza']
},
{
  id: 'ex9',
  name: 'Press Militar',
  category: 'fuerza',
  description: 'Empuje vertical con mancuernas',
  defaultSets: 3,
  defaultReps: '10',
  tags: ['hombro', 'empuje']
},
{
  id: 'ex10',
  name: 'Remo con Anillas',
  category: 'fuerza',
  description: 'Tracción horizontal en suspensión',
  defaultSets: 3,
  defaultReps: '12',
  tags: ['espalda', 'traccion']
},
{
  id: 'ex11',
  name: 'YTWL',
  category: 'control_motor',
  description: 'Activación escapular',
  defaultSets: 2,
  defaultReps: '10',
  tags: ['hombro', 'escapula']
},
{
  id: 'ex12',
  name: 'Single Leg Balance',
  category: 'control_motor',
  description: 'Equilibrio unipodal en superficie inestable',
  defaultSets: 3,
  defaultReps: '30 seg',
  tags: ['tobillo', 'propiocepcion']
}];


// 6. Appointments (Past & Future)
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export const seedAppointments: Appointment[] = [
// Past appointments
{
  id: 'apt1',
  patientId: 'pat1',
  episodeId: 'ep1',
  professionalId: 'prof1',
  boxId: 'box2',
  date: '2024-02-01',
  time: '09:00',
  duration: 60,
  type: 'sesion',
  status: 'completed'
},
{
  id: 'apt2',
  patientId: 'pat1',
  episodeId: 'ep1',
  professionalId: 'prof1',
  boxId: 'box2',
  date: '2024-02-05',
  time: '09:00',
  duration: 60,
  type: 'sesion',
  status: 'completed'
},
{
  id: 'apt3',
  patientId: 'pat1',
  episodeId: 'ep1',
  professionalId: 'prof1',
  boxId: 'box2',
  date: '2024-02-08',
  time: '09:00',
  duration: 60,
  type: 'sesion',
  status: 'completed'
},

// Today
{
  id: 'apt4',
  patientId: 'pat1',
  episodeId: 'ep1',
  professionalId: 'prof1',
  boxId: 'box2',
  date: today,
  time: '10:00',
  duration: 60,
  type: 'sesion',
  status: 'confirmed'
},
{
  id: 'apt5',
  patientId: 'pat2',
  episodeId: 'ep2',
  professionalId: 'prof2',
  boxId: 'box1',
  date: today,
  time: '11:00',
  duration: 45,
  type: 'evaluacion',
  status: 'checked_in'
},
{
  id: 'apt8',
  patientId: 'pat3',
  episodeId: 'ep3',
  professionalId: 'prof1',
  boxId: 'box3',
  date: today,
  time: '14:00',
  duration: 60,
  type: 'sesion',
  status: 'scheduled'
},

// Future
{
  id: 'apt6',
  patientId: 'pat1',
  episodeId: 'ep1',
  professionalId: 'prof1',
  boxId: 'box2',
  date: tomorrow,
  time: '09:00',
  duration: 60,
  type: 'sesion',
  status: 'scheduled'
},
{
  id: 'apt7',
  patientId: 'pat2',
  episodeId: 'ep2',
  professionalId: 'prof2',
  boxId: 'box1',
  date: tomorrow,
  time: '15:00',
  duration: 45,
  type: 'sesion',
  status: 'scheduled'
},

// No Show History
{
  id: 'apt9',
  patientId: 'pat4',
  episodeId: 'ep4',
  professionalId: 'prof2',
  boxId: 'box1',
  date: yesterday,
  time: '16:00',
  duration: 45,
  type: 'control',
  status: 'no_show'
}];


// 7. Session Notes (History)
export const seedSessionNotes: SessionNote[] = [
{
  id: 'sn1',
  appointmentId: 'apt1',
  episodeId: 'ep1',
  patientId: 'pat1',
  date: '2024-02-01',
  painLevel: 6,
  readiness: 3,
  sessionGoal: 'Mejorar ROM',
  soapNote: {
    subjective: 'Refiere dolor al final de la flexión.',
    objective: 'ROM flexión 110°. Edema leve.',
    analysis: 'Buena tolerancia a la carga inicial.',
    plan: 'Continuar protocolo fase 2.'
  },
  exerciseDoses: [
  {
    exerciseId: 'ex6',
    sets: 1,
    reps: '10 min',
    load: 0,
    rpe: 3,
    tolerance: 'bien'
  },
  {
    exerciseId: 'ex3',
    sets: 3,
    reps: '12',
    load: 0,
    rpe: 5,
    tolerance: 'bien'
  }],

  createdAt: '2024-02-01T10:00:00Z'
},
{
  id: 'sn2',
  appointmentId: 'apt2',
  episodeId: 'ep1',
  patientId: 'pat1',
  date: '2024-02-05',
  painLevel: 4,
  readiness: 4,
  sessionGoal: 'Fuerza cuadriceps',
  soapNote: {
    subjective: 'Menos dolor matutino.',
    objective: 'ROM flexión 120°. Sin edema.',
    analysis: 'Progresión excelente.',
    plan: 'Aumentar carga en sentadilla.'
  },
  exerciseDoses: [
  {
    exerciseId: 'ex6',
    sets: 1,
    reps: '10 min',
    load: 0,
    rpe: 3,
    tolerance: 'bien'
  },
  {
    exerciseId: 'ex1',
    sets: 3,
    reps: '10',
    load: 10,
    rpe: 6,
    tolerance: 'bien'
  },
  {
    exerciseId: 'ex3',
    sets: 3,
    reps: '12',
    load: 5,
    rpe: 6,
    tolerance: 'bien'
  }],

  createdAt: '2024-02-05T10:00:00Z'
}];


// 8. Prescriptions
export const seedPrescriptions: ExercisePrescription[] = [
{
  id: 'pr1',
  episodeId: 'ep1',
  exercises: [
  {
    exerciseId: 'ex1',
    targetSets: 3,
    targetReps: '10-12',
    targetLoad: '15kg'
  },
  {
    exerciseId: 'ex2',
    targetSets: 3,
    targetReps: '10',
    targetLoad: '20kg'
  },
  { exerciseId: 'ex3', targetSets: 3, targetReps: '15', targetLoad: 'BW' }],

  weeklySchedule: [1, 3, 5], // Mon, Wed, Fri
  startDate: '2024-02-01'
}];


// 9. Programs
export const seedPrograms: Program[] = [
{
  id: 'prog1',
  name: 'Rodilla Fase 1 - Protección',
  description: 'Protocolo inicial post-quirúrgico LCA',
  phase: 'Fase 1',
  exercises: [
  {
    exerciseId: 'ex3',
    day: 1,
    targetSets: 3,
    targetReps: '15',
    targetLoad: 'BW'
  },
  {
    exerciseId: 'ex7',
    day: 1,
    targetSets: 3,
    targetReps: '30s',
    targetLoad: 'BW'
  },
  {
    exerciseId: 'ex6',
    day: 1,
    targetSets: 1,
    targetReps: '15min',
    targetLoad: 'L1'
  }],

  weeklyFrequency: 3,
  progressionCriteria: 'Dolor < 3/10, Extensión completa, Flexión > 90°',
  createdAt: '2023-01-01'
},
{
  id: 'prog2',
  name: 'Hombro Estabilidad',
  description: 'Para inestabilidad glenohumeral',
  phase: 'Fase 2',
  exercises: [
  {
    exerciseId: 'ex11',
    day: 1,
    targetSets: 3,
    targetReps: '10',
    targetLoad: 'BW'
  },
  {
    exerciseId: 'ex10',
    day: 1,
    targetSets: 3,
    targetReps: '12',
    targetLoad: 'BW'
  }],

  weeklyFrequency: 2,
  progressionCriteria: 'Sin dolor en reposo, ROM completo pasivo',
  createdAt: '2023-02-15'
}];


// 10. PROs
export const seedPROs: PRO[] = [
{
  id: 'pro1',
  patientId: 'pat1',
  episodeId: 'ep1',
  date: '2024-02-01',
  painLevel: 6,
  sleepQuality: 3,
  readiness: 3,
  notes: 'Molestia nocturna'
},
{
  id: 'pro2',
  patientId: 'pat1',
  episodeId: 'ep1',
  date: '2024-02-08',
  painLevel: 4,
  sleepQuality: 4,
  readiness: 4,
  notes: 'Mejor descanso'
}];


// 11. Settings
export const seedSettings: Settings = {
  defaultAppointmentDuration: 60,
  workingHours: { start: '08:00', end: '20:00' },
  theme: 'light'
};