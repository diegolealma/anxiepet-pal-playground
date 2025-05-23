
import React from 'react';
import { Coins } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  gradient: string;
  cost?: number;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  label, 
  onClick, 
  gradient, 
  cost,
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        bg-gradient-to-r ${gradient}
        text-white font-medium text-sm
        px-4 py-3 rounded-2xl
        transition-all duration-200
        hover:scale-105 hover:shadow-lg
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${disabled ? '' : 'shadow-md'}
      `}
    >
      <div className="relative z-10 flex flex-col items-center space-y-1">
        <span>{label}</span>
        {cost && (
          <div className="flex items-center space-x-1 text-xs">
            <Coins className="w-3 h-3" />
            <span>{cost}</span>
          </div>
        )}
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
};

export default ActionButton;
