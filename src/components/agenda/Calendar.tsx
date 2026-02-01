import React from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "../ui/Button";
const timeSlots = Array.from(
  {
    length: 9
  },
  (_, i) => i + 9
); // 9 AM to 5 PM
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const appointments = [
{
  id: 1,
  day: "Monday",
  time: 10,
  patient: "John Doe",
  type: "Therapy",
  status: "confirmed"
},
{
  id: 2,
  day: "Wednesday",
  time: 14,
  patient: "Jane Smith",
  type: "Assessment",
  status: "pending"
}];

export const Calendar = () => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">
              February 2024
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-[100px_repeat(5,1fr)] border rounded-lg">
          {/* Time column */}
          <div className="border-r">
            <div className="h-12 border-b"></div>
            {timeSlots.map((time) =>
            <div
              key={time}
              className="h-20 border-b px-2 py-1 text-sm text-gray-500">

                {`${time}:00`}
              </div>
            )}
          </div>
          {/* Days columns */}
          {weekDays.map((day) =>
          <div key={day} className="border-r last:border-r-0">
              <div className="h-12 border-b p-2 text-sm font-medium text-gray-700">
                {day}
              </div>
              {timeSlots.map((time) => {
              const appointment = appointments.find(
                (apt) => apt.day === day && apt.time === time
              );
              return (
                <div key={time} className="h-20 border-b p-1">
                    {appointment &&
                  <div className="h-full p-2 rounded bg-blue-50 border border-blue-100">
                        <p className="text-sm font-medium text-blue-700">
                          {appointment.patient}
                        </p>
                        <p className="text-xs text-blue-600">
                          {appointment.type}
                        </p>
                      </div>
                  }
                  </div>);

            })}
            </div>
          )}
        </div>
      </div>
    </div>);

};