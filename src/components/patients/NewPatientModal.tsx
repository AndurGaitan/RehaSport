import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { useApp } from '../../context/AppContext';
import { Patient } from '../../lib/types';
interface NewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const NewPatientModal = ({ isOpen, onClose }: NewPatientModalProps) => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    sport: '',
    position: '',
    level: 'amateur',
    notes: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      level: formData.level as any
    };
    dispatch({
      type: 'ADD_PATIENT',
      payload: newPatient
    });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Paciente">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre Completo"
          value={formData.name}
          onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value
          })
          }
          required />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
            })
            }
            required />

          <Input
            label="Teléfono"
            value={formData.phone}
            onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value
            })
            }
            required />

        </div>
        <Input
          label="Fecha de Nacimiento"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) =>
          setFormData({
            ...formData,
            dateOfBirth: e.target.value
          })
          }
          required />


        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Deporte"
            value={formData.sport}
            onChange={(e) =>
            setFormData({
              ...formData,
              sport: e.target.value
            })
            } />

          <Input
            label="Posición"
            value={formData.position}
            onChange={(e) =>
            setFormData({
              ...formData,
              position: e.target.value
            })
            } />

          <Select
            label="Nivel"
            options={[
            {
              value: 'amateur',
              label: 'Amateur'
            },
            {
              value: 'semi-pro',
              label: 'Semi-Pro'
            },
            {
              value: 'professional',
              label: 'Profesional'
            }]
            }
            value={formData.level}
            onChange={(e) =>
            setFormData({
              ...formData,
              level: e.target.value
            })
            } />

        </div>

        <Textarea
          label="Notas Iniciales"
          value={formData.notes}
          onChange={(e) =>
          setFormData({
            ...formData,
            notes: e.target.value
          })
          }
          rows={3} />


        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Crear Paciente</Button>
        </div>
      </form>
    </Modal>);

};