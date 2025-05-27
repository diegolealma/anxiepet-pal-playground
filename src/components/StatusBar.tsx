
import React from 'react';

interface StatusBarProps {
  symbol: string;
  value: number;
  color: string;
  maxWidth?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ symbol, value, color, maxWidth = false }) => {
  // Arredondar valores para não sair da tela
  const displayValue = Math.round(value);
  
  return (
    <div className={`space-y-1 ${maxWidth ? 'max-w-[80px]' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-lg">{symbol}</span>
        <span className="text-xs font-bold text-gray-300 min-w-[24px] text-right">{displayValue}</span>
      </div>
      
      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-500 ease-out rounded-full relative`}
          style={{ width: `${Math.min(100, displayValue)}%` }}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
