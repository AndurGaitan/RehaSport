import React from "react";
import { Clock } from "lucide-react";
const appointments = [
{
  id: 1,
  patient: "John Doe",
  time: "09:00 AM",
  type: "Initial Assessment",
  status: "confirmed"
},
{
  id: 2,
  patient: "Jane Smith",
  time: "10:30 AM",
  type: "Follow-up",
  status: "pending"
},
{
  id: 3,
  patient: "Mike Johnson",
  time: "02:00 PM",
  type: "Therapy Session",
  status: "completed"
}];

const statusStyles = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  canceled: "bg-red-100 text-red-800"
};
export const AppointmentList = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Today's Appointments
        </h2>
        <div className="mt-6 space-y-4">
          {appointments.map((appointment) =>
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 border rounded-lg">

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {appointment.patient}
                  </p>
                  <p className="text-sm text-gray-500">
                    {appointment.time} - {appointment.type}
                  </p>
                </div>
              </div>
              <span
              className={`px-2 py-1 text-xs rounded-full ${statusStyles[appointment.status as keyof typeof statusStyles]}`}>

                {appointment.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>);

};