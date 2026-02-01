import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { useApp } from '../../context/AppContext';
import { Appointment, AppointmentType } from '../../lib/types';
import { AlertTriangle } from 'lucide-react';
interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
  initialTime?: string;
  initialProfessionalId?: string;
  initialBoxId?: string;
}
export const NewAppointmentModal = ({
  isOpen,
  onClose,
  initialDate,
  initialTime,
  initialProfessionalId,
  initialBoxId
}: NewAppointmentModalProps) => {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    patientId: '',
    episodeId: '',
    professionalId: initialProfessionalId || '',
    boxId: initialBoxId || '',
    date: initialDate || new Date().toISOString().split('T')[0],
    time: initialTime || '09:00',
    duration: 60,
    type: 'sesion' as AppointmentType,
    notes: ''
  });
  const [conflict, setConflict] = useState<string | null>(null);
  // Update form when props change
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        date: initialDate || prev.date,
        time: initialTime || prev.time,
        professionalId: initialProfessionalId || prev.professionalId,
        boxId: initialBoxId || prev.boxId
      }));
    }
  }, [isOpen, initialDate, initialTime, initialProfessionalId, initialBoxId]);
  // Check for conflicts
  useEffect(() => {
    if (
    !formData.date ||
    !formData.time ||
    !formData.professionalId ||
    !formData.boxId)

    return;
    const start = parseInt(formData.time.replace(':', ''));
    const end = start + formData.duration / 60 * 100; // Rough approximation for demo
    const hasConflict = state.appointments.some((apt) => {
      if (apt.date !== formData.date || apt.status === 'cancelled') return false;
      const aptStart = parseInt(apt.time.replace(':', ''));
      const aptEnd = aptStart + apt.duration / 60 * 100;
      // Check overlap
      const overlap = start < aptEnd && end > aptStart;
      if (overlap) {
        if (apt.professionalId === formData.professionalId) return true;
        if (apt.boxId === formData.boxId) return true;
      }
      return false;
    });
    setConflict(
      hasConflict ?
      'Conflicto de horario: El profesional o box ya está ocupado.' :
      null
    );
  }, [formData, state.appointments]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (conflict) return;
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'scheduled'
    };
    dispatch({
      type: 'ADD_APPOINTMENT',
      payload: newAppointment
    });
    onClose();
  };
  const patientOptions = state.patients.map((p) => ({
    value: p.id,
    label: p.name
  }));
  const professionalOptions = state.professionals.map((p) => ({
    value: p.id,
    label: p.name
  }));
  const boxOptions = state.boxes.map((b) => ({
    value: b.id,
    label: b.name
  }));
  // Filter episodes by selected patient
  const episodeOptions = state.episodes.
  filter((e) => e.patientId === formData.patientId && e.status === 'active').
  map((e) => ({
    value: e.id,
    label: e.injury
  }));
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Turno">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Paciente"
          options={[
          {
            value: '',
            label: 'Seleccionar paciente...'
          },
          ...patientOptions]
          }
          value={formData.patientId}
          onChange={(e) =>
          setFormData({
            ...formData,
            patientId: e.target.value
          })
          }
          required />


        {formData.patientId &&
        <Select
          label="Episodio / Lesión"
          options={[
          {
            value: '',
            label: 'Seleccionar episodio...'
          },
          ...episodeOptions]
          }
          value={formData.episodeId}
          onChange={(e) =>
          setFormData({
            ...formData,
            episodeId: e.target.value
          })
          }
          required />

        }

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Profesional"
            options={[
            {
              value: '',
              label: 'Seleccionar...'
            },
            ...professionalOptions]
            }
            value={formData.professionalId}
            onChange={(e) =>
            setFormData({
              ...formData,
              professionalId: e.target.value
            })
            }
            required />

          <Select
            label="Box / Consultorio"
            options={[
            {
              value: '',
              label: 'Seleccionar...'
            },
            ...boxOptions]
            }
            value={formData.boxId}
            onChange={(e) =>
            setFormData({
              ...formData,
              boxId: e.target.value
            })
            }
            required />

        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            type="date"
            label="Fecha"
            value={formData.date}
            onChange={(e) =>
            setFormData({
              ...formData,
              date: e.target.value
            })
            }
            required />

          <Input
            type="time"
            label="Hora"
            value={formData.time}
            onChange={(e) =>
            setFormData({
              ...formData,
              time: e.target.value
            })
            }
            required />

          <Select
            label="Duración"
            options={[
            {
              value: 30,
              label: '30 min'
            },
            {
              value: 45,
              label: '45 min'
            },
            {
              value: 60,
              label: '60 min'
            },
            {
              value: 90,
              label: '90 min'
            }]
            }
            value={formData.duration}
            onChange={(e) =>
            setFormData({
              ...formData,
              duration: Number(e.target.value)
            })
            } />

        </div>

        <Select
          label="Tipo de Turno"
          options={[
          {
            value: 'sesion',
            label: 'Sesión de Tratamiento'
          },
          {
            value: 'evaluacion',
            label: 'Evaluación Inicial'
          },
          {
            value: 'control',
            label: 'Control / Seguimiento'
          },
          {
            value: 'retorno',
            label: 'Retorno Deportivo'
          }]
          }
          value={formData.type}
          onChange={(e) =>
          setFormData({
            ...formData,
            type: e.target.value as AppointmentType
          })
          } />


        <Textarea
          label="Notas internas"
          value={formData.notes}
          onChange={(e) =>
          setFormData({
            ...formData,
            notes: e.target.value
          })
          }
          rows={2} />


        {conflict &&
        <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <p className="text-sm text-red-700">{conflict}</p>
          </div>
        }

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!!conflict}>
            Agendar Turno
          </Button>
        </div>
      </form>
    </Modal>);

};