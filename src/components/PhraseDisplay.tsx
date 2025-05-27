
import React from 'react';

interface Mood {
  type: 'happy' | 'anxious' | 'sad' | 'neutral' | 'philosophical';
  emoji: string;
}

interface PhraseDisplayProps {
  phrase: string;
  mood: Mood;
}

const PhraseDisplay: React.FC<PhraseDisplayProps> = ({ phrase, mood }) => {
  const getBubbleColor = () => {
    switch (mood.type) {
      case 'happy':
        return 'bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-gray-500/50 text-gray-100';
      case 'anxious':
        return 'bg-gradient-to-r from-red-900/60 to-orange-900/60 border-red-500/50 text-red-100';
      case 'sad':
        return 'bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border-blue-500/50 text-blue-100';
      case 'philosophical':
        return 'bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-purple-500/50 text-purple-100';
      default:
        return 'bg-gradient-to-r from-gray-900/80 to-black/80 border-gray-600/50 text-gray-200';
    }
  };

  const getTailColor = () => {
    switch (mood.type) {
      case 'happy':
        return 'border-t-gray-500/50';
      case 'anxious':
        return 'border-t-red-500/50';
      case 'sad':
        return 'border-t-blue-500/50';
      case 'philosophical':
        return 'border-t-purple-500/50';
      default:
        return 'border-t-gray-600/50';
    }
  };

  return (
    <div className="relative">
      {/* Speech bubble */}
      <div className={`
        ${getBubbleColor()}
        border-2 rounded-2xl p-4 
        relative animate-fade-in
        shadow-lg backdrop-blur-sm
      `}>
        <p className="text-sm leading-relaxed text-center font-medium">
          {phrase}
        </p>
        
        {/* Bubble tail */}
        <div className={`
          absolute top-full left-1/2 transform -translate-x-1/2
          w-0 h-0 border-l-8 border-r-8 border-t-8
          border-l-transparent border-r-transparent 
          ${getTailColor()}
        `}></div>
      </div>
      
      {/* Typing indicator when phrase changes */}
      <div className="absolute top-2 right-2">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default PhraseDisplay;
