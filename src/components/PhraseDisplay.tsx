
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
        return 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300';
      case 'anxious':
        return 'bg-gradient-to-r from-red-100 to-orange-100 border-red-300';
      case 'sad':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-300';
      case 'philosophical':
        return 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 border-gray-300';
    }
  };

  return (
    <div className="relative">
      {/* Speech bubble */}
      <div className={`
        ${getBubbleColor()}
        border-2 rounded-2xl p-4 
        relative animate-fade-in
        shadow-sm
      `}>
        <p className="text-sm text-gray-700 leading-relaxed text-center">
          {mood.emoji} {phrase}
        </p>
        
        {/* Bubble tail */}
        <div className={`
          absolute top-full left-1/2 transform -translate-x-1/2
          w-0 h-0 border-l-8 border-r-8 border-t-8
          border-l-transparent border-r-transparent 
          ${mood.type === 'happy' ? 'border-t-green-300' : 
            mood.type === 'anxious' ? 'border-t-red-300' :
            mood.type === 'sad' ? 'border-t-blue-300' :
            mood.type === 'philosophical' ? 'border-t-purple-300' :
            'border-t-gray-300'}
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
