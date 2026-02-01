import React from 'react';
import { cn } from '../../lib/utils';
interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}
export const Tabs = ({ tabs, activeTab, onChange, className }: TabsProps) => {
  return (
    <div className={cn('border-b border-gray-200', className)}>
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors',
                isActive ?
                'border-blue-500 text-blue-600' :
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}>

              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>);

        })}
      </nav>
    </div>);

};