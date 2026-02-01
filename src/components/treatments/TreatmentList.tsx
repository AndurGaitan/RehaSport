import React from "react";
import { Search, Plus, Play, Clock, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";
const treatments = [
{
  id: 1,
  name: "Lower Back Rehabilitation",
  exercises: ["Lumbar Stretching", "Core Strengthening", "Posture Training"],
  duration: "45 min",
  progress: 75
},
{
  id: 2,
  name: "ACL Recovery Protocol",
  exercises: ["Range of Motion", "Strength Training", "Balance Exercises"],
  duration: "60 min",
  progress: 45
}];

export const TreatmentList = () => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Treatment Plans
          </h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Treatment
          </Button>
        </div>
      </div>
      <div className="p-6 grid gap-6">
        {treatments.map((treatment) =>
        <div key={treatment.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {treatment.name}
                </h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {treatment.duration}
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Start Session
              </Button>
            </div>
            <div className="space-y-2">
              {treatment.exercises.map((exercise, index) =>
            <div
              key={index}
              className="flex items-center text-sm text-gray-600">

                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  {exercise}
                </div>
            )}
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{treatment.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${treatment.progress}%`
                }}>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

};