
import React from 'react';

interface StatusBarProps {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const StatusBar: React.FC<StatusBarProps> = ({ label, value, color, icon }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className="text-sm font-bold text-gray-600">{value}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-500 ease-out rounded-full relative`}
          style={{ width: `${value}%` }}
        >
          <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
