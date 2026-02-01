# 🧠 RehabPerformance OS  
**Sistema integral de gestión y seguimiento en rehabilitación deportiva con asistencia inteligente**

---

## 🚀 Descripción general

**RehaSport OS** es una aplicación web diseñada para la **gestión integral de consultorios de rehabilitación deportiva**, enfocada en:

- Organización del flujo clínico
- Registro estructurado de sesiones
- Seguimiento del progreso del paciente
- Planificación y control de ejercicios
- Asistencia inteligente para la toma de decisiones

El proyecto funciona como un **MVP completamente funcional**, con persistencia local, orientado a demostración, validación de producto y futura escalabilidad.

---

## 🎯 Objetivos del proyecto

- Centralizar la gestión clínica y operativa
- Estandarizar el registro de sesiones y evolución
- Visualizar el progreso del paciente en el tiempo
- Incorporar **IA explicable** como soporte clínico
- Servir como base para un producto real o investigación aplicada

---

## 🧩 Funcionalidades principales

### 📅 Agenda inteligente
- Vista diaria y semanal
- Asignación de turnos
- Detección de conflictos
- Estados de turno:
  - scheduled
  - confirmed
  - checked-in
  - in-session
  - completed
  - cancelled / no-show
- Acceso directo a la sesión clínica

---

### 🧑‍⚕️ Gestión de pacientes
- Alta y edición de pacientes
- Episodios clínicos asociados
- Historial completo de sesiones
- Acceso rápido a progreso y métricas

---

### 🧠 Registro clínico por sesión
- Workspace estructurado
- Registro de:
  - dolor
  - ejercicios realizados
  - dosificación (series, repeticiones, carga, RPE)
  - observaciones clínicas
- Generación automática de evolución (IA asistida)
- Asociación directa con turno y episodio

---

### 🏋️‍♂️ Ejercicios y planes
- Biblioteca de ejercicios
- Plantillas de planes
- Asignación por episodio
- Seguimiento de adherencia
- Cálculo de volumen de entrenamiento

---

### 📊 Dashboard y seguimiento
- Indicadores clave (KPIs)
- Alertas automáticas
- Gráficos de evolución:
  - dolor
  - carga
  - sesiones completadas
- Lista de tareas pendientes

---

## 🤖 Funciones de IA (explicables)

### 1️⃣ Generador de evolución clínica
Genera automáticamente un borrador de evolución clínica basado en:
- Datos de la sesión
- Fase del episodio
- Carga y síntomas

> Siempre editable por el profesional.

---

### 2️⃣ Sistema de alertas clínicas
Detecta:
- Riesgo de sobrecarga
- Estancamiento
- Baja adherencia
- Datos incompletos

Presentado con semáforo y explicación clara.

---

### 3️⃣ Recomendador de progresión
Sugiere:
- progresar
- mantener
- descargar
- ajustar ejercicios

Siempre como **recomendación**, nunca como decisión automática.

---

## 🧱 Arquitectura del proyecto

### Stack
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Persistencia local (LocalStorage / IndexedDB)**
- Arquitectura preparada para backend

---

### Estructura del proyecto

```bash
src/
├── app/                 # Rutas y layouts
├── components/          # Componentes UI
├── store/               # Estado global (persistente)
├── services/            # Repositorios (LocalRepo / Api-ready)
├── domain/              # Tipos, modelos, reglas
├── lib/                 # Utilidades y helpers
├── data/                # Seed data (demo)
├── hooks/
└── styles/