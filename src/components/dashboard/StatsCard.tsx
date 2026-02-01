import React from "react";
import { BoxIcon } from "lucide-react";
interface StatsCardProps {
  title: string;
  value: string;
  icon: BoxIcon;
  trend?: string;
  trendValue?: string;
}
export const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue
}: StatsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="ml-3 text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {trend &&
        <p className="mt-1 text-sm text-gray-500">
            <span
            className={trend === "up" ? "text-green-500" : "text-red-500"}>

              {trendValue}
            </span>
            {" vs last month"}
          </p>
        }
      </div>
    </div>);

};