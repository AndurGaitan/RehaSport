
# RehaSport - Arquitectura de la Aplicación

## 📋 Descripción General

RehaSport es una aplicación de gestión clínica para kinesiólogos y fisioterapeutas deportivos. Permite gestionar pacientes, episodios clínicos, turnos, sesiones de tratamiento y ejercicios terapéuticos.

## 🏗️ Stack Tecnológico

- **Framework**: React 18 con TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Gráficos**: Recharts
- **Estado**: React Context + useReducer
- **Persistencia**: localStorage (demo)

---

## 📁 Estructura de Carpetas

```
├── App.tsx                    # Componente raíz, routing de vistas
├── index.tsx                  # Entry point
├── index.css                  # Estilos globales (Tailwind)
├── tailwind.config.js         # Configuración de Tailwind
│
├── components/
│   ├── agenda/                # Vista de agenda (legacy)
│   │   └── Calendar.tsx
│   │
│   ├── auth/                  # Autenticación
│   │   └── LoginForm.tsx
│   │
│   ├── calendar/              # Gestión de turnos
│   │   ├── CalendarView.tsx       # Vista principal del calendario
│   │   ├── AppointmentCard.tsx    # Tarjeta de turno
│   │   └── NewAppointmentModal.tsx # Modal para crear turnos
│   │
│   ├── dashboard/             # Panel principal
│   │   ├── DashboardView.tsx      # Vista del dashboard
│   │   ├── KPICards.tsx           # Tarjetas de métricas
│   │   ├── TodayAppointments.tsx  # Lista de turnos del día
│   │   ├── Worklist.tsx           # Tareas pendientes
│   │   ├── ClinicalAlerts.tsx     # Alertas clínicas
│   │   ├── AppointmentList.tsx    # Lista de citas
│   │   └── StatsCard.tsx          # Tarjeta de estadísticas
│   │
│   ├── exercises/             # Biblioteca de ejercicios
│   │   ├── ExercisesView.tsx      # Vista principal
│   │   └── ProgramBuilder.tsx     # Constructor de programas
│   │
│   ├── layout/                # Componentes de layout
│   │   ├── Sidebar.tsx            # Navegación lateral
│   │   ├── Topbar.tsx             # Barra superior con búsqueda
│   │   └── DemoBanner.tsx         # Banner de modo demo
│   │
│   ├── patients/              # Gestión de pacientes
│   │   ├── PatientsView.tsx       # Vista principal
│   │   ├── PatientTable.tsx       # Tabla de pacientes
│   │   ├── PatientDetail.tsx      # Detalle del paciente
│   │   └── NewPatientModal.tsx    # Modal para crear paciente
│   │
│   ├── reports/               # Reportes y analytics
│   │   └── ReportsView.tsx
│   │
│   ├── session/               # Workspace de sesión clínica
│   │   ├── SessionWorkspace.tsx   # Contenedor principal
│   │   ├── SymptomsTab.tsx        # Tab de síntomas
│   │   ├── ExercisesTab.tsx       # Tab de ejercicios
│   │   └── NotesTab.tsx           # Tab de notas SOAP
│   │
│   ├── settings/              # Configuración
│   │   └── SettingsView.tsx
│   │
│   ├── treatments/            # Tratamientos
│   │   └── TreatmentList.tsx
│   │
│   └── ui/                    # Componentes UI reutilizables
│       ├── Badge.tsx              # Etiquetas/badges
│       ├── Button.tsx             # Botones
│       ├── CommandPalette.tsx     # Paleta de comandos (⌘K)
│       ├── Confetti.tsx           # Efecto de celebración
│       ├── Input.tsx              # Campos de texto
│       ├── Modal.tsx              # Modales
│       ├── Select.tsx             # Selectores
│       ├── Tabs.tsx               # Navegación por tabs
│       ├── Textarea.tsx           # Áreas de texto
│       └── Toast.tsx              # Notificaciones toast
│
├── context/
│   └── AppContext.tsx         # Estado global de la aplicación
│
└── lib/
    ├── types.ts               # Definiciones de TypeScript
    ├── seedData.ts            # Datos de ejemplo para demo
    ├── storage.ts             # Utilidades de localStorage
    └── utils.ts               # Funciones utilitarias (cn, etc.)
```

---

## 🗃️ Modelo de Datos

### Entidades Principales

```typescript
// Paciente
interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  sport?: string
  position?: string
  team?: string
  photoUrl?: string
  createdAt: string
}

// Episodio Clínico (caso/lesión)
interface Episode {
  id: string
  patientId: string
  injury: string              // Diagnóstico principal
  injuryDate: string
  mechanism?: string          // Mecanismo de lesión
  phase: 'acute' | 'subacute' | 'remodeling' | 'return_to_sport'
  status: 'active' | 'discharged' | 'on_hold'
  createdAt: string
}

// Turno/Cita
interface Appointment {
  id: string
  patientId: string
  episodeId: string
  date: string                // YYYY-MM-DD
  time: string                // HH:MM
  duration: number            // minutos
  type: 'evaluation' | 'follow_up' | 'discharge'
  status: 'scheduled' | 'confirmed' | 'checked_in' | 'in_session' | 'completed' | 'cancelled' | 'no_show'
  notes?: string
}

// Nota de Sesión
interface SessionNote {
  id: string
  appointmentId: string
  episodeId: string
  patientId: string
  date: string
  painLevel: number           // 0-10
  readiness: number           // 1-5
  sessionGoal: string
  exerciseDoses: ExerciseDose[]
  soapNote: {
    subjective: string
    objective: string
    analysis: string
    plan: string
  }
  createdAt: string
}

// Ejercicio
interface Exercise {
  id: string
  name: string
  category: string
  description: string
  videoUrl?: string
  imageUrl?: string
}

// Prescripción de Ejercicios
interface Prescription {
  id: string
  episodeId: string
  exercises: PrescribedExercise[]
  createdAt: string
}

// PRO (Patient-Reported Outcome)
interface PRO {
  id: string
  patientId: string
  episodeId: string
  type: string
  score: number
  date: string
}
```

---

## 🔄 Gestión de Estado

### AppContext

El estado global se maneja con React Context + useReducer:

```typescript
interface AppState {
  // Datos
  patients: Patient[]
  episodes: Episode[]
  appointments: Appointment[]
  exercises: Exercise[]
  prescriptions: Prescription[]
  sessionNotes: SessionNote[]
  pros: PRO[]
  
  // UI State
  activeView: ViewType
  selectedPatient: string | null
  selectedEpisode: string | null
}

type ViewType = 'dashboard' | 'agenda' | 'patients' | 'exercises' | 'reports' | 'settings'
```

### Actions Disponibles

```typescript
type AppAction =
  | { type: 'SET_VIEW'; payload: ViewType }
  | { type: 'SET_SELECTED_PATIENT'; payload: string | null }
  | { type: 'SET_SELECTED_EPISODE'; payload: string | null }
  | { type: 'ADD_PATIENT'; payload: Patient }
  | { type: 'UPDATE_PATIENT'; payload: Patient }
  | { type: 'ADD_EPISODE'; payload: Episode }
  | { type: 'UPDATE_EPISODE'; payload: Episode }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'UPDATE_APPOINTMENT'; payload: Appointment }
  | { type: 'ADD_SESSION_NOTE'; payload: SessionNote }
  | { type: 'ADD_PRESCRIPTION'; payload: Prescription }
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'RESET_DEMO' }
```

---

## 🎯 Flujos Principales

### 1. Flujo de Sesión Clínica

```
Dashboard → Ver turnos del día
    ↓
Click "Check-in" → Paciente en sala de espera
    ↓
Click "Iniciar Sesión" → Abre SessionWorkspace
    ↓
Tab 1: Síntomas → Registrar dolor, readiness, objetivo
    ↓
Tab 2: Ejercicios → Seleccionar y dosificar ejercicios
    ↓
Tab 3: Nota SOAP → Documentar sesión
    ↓
"Finalizar Sesión" → Confetti + Toast + Cierre
```

### 2. Flujo de Nuevo Paciente

```
Sidebar/Topbar → Click "Nuevo Paciente"
    ↓
Modal → Completar datos básicos
    ↓
Guardar → Crear paciente + Episodio inicial
    ↓
Redirigir → Vista de detalle del paciente
```

### 3. Flujo de Búsqueda

```
Topbar → Click en buscador o ⌘K
    ↓
Escribir nombre → Filtrado en tiempo real
    ↓
Click resultado → Navegar a detalle de paciente
```

---

## 🎨 Sistema de Diseño

### Componentes UI Base

| Componente | Uso |
|------------|-----|
| `Button` | Acciones primarias/secundarias |
| `Input` | Campos de formulario |
| `Select` | Selectores dropdown |
| `Textarea` | Texto multilínea |
| `Modal` | Diálogos y formularios |
| `Tabs` | Navegación por pestañas |
| `Badge` | Estados y etiquetas |
| `Toast` | Notificaciones |

### Paleta de Colores

```
Primary:    blue-600    (#2563EB)
Success:    emerald-600 (#059669)
Warning:    amber-600   (#D97706)
Error:      red-600     (#DC2626)
Neutral:    gray-*      (escala completa)
```

### Animaciones (Framer Motion)

- **Page transitions**: Fade + slide vertical
- **Sidebar indicator**: Layout animation con spring
- **Cards**: Hover lift effect
- **Lists**: Staggered children
- **Modals**: Scale + fade
- **Toasts**: Slide from right
- **Confetti**: Particle system

---

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `⌘K` / `Ctrl+K` | Abrir Command Palette |
| `↑` `↓` | Navegar en Command Palette |
| `Enter` | Seleccionar comando |
| `Escape` | Cerrar modal/palette |

---

## 💾 Persistencia

### localStorage Keys

```javascript
'rehasport_state'  // Estado completo de la aplicación
```

### Estrategia

1. **Carga inicial**: Intenta cargar de localStorage
2. **Fallback**: Si no existe, carga datos de demo (seedData)
3. **Guardado**: Cada cambio de estado se persiste automáticamente
4. **Reset**: Botón en DemoBanner para reiniciar datos

---

## 🚀 Características Destacadas

### Para Demo/MVP

1. **Command Palette (⌘K)** - Navegación rápida estilo Linear
2. **Búsqueda de pacientes** - En tiempo real desde Topbar
3. **Session Workspace** - Flujo completo de sesión clínica
4. **Celebración** - Confetti al completar sesiones
5. **Toast notifications** - Feedback visual de acciones
6. **Animaciones pulidas** - Transiciones suaves entre vistas
7. **Responsive** - Adaptado a diferentes tamaños de pantalla

### Próximos Pasos Sugeridos

- [ ] Autenticación real (Firebase/Supabase)
- [ ] Backend API (Node.js/Python)
- [ ] Base de datos (PostgreSQL)
- [ ] Exportación de reportes (PDF)
- [ ] Integración con calendario externo
- [ ] App móvil (React Native)
- [ ] Notificaciones push
- [ ] Videollamadas integradas

---

## 📝 Notas de Desarrollo

### Convenciones

- **Componentes**: PascalCase, un componente por archivo
- **Hooks**: camelCase, prefijo `use`
- **Types**: PascalCase, sufijo descriptivo
- **Archivos**: kebab-case para utilidades, PascalCase para componentes

### Testing (Pendiente)

- Unit tests con Vitest
- Component tests con Testing Library
- E2E tests con Playwright

---

*Última actualización: Enero 2025*
