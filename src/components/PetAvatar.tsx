
import React from 'react';

interface Mood {
  type: 'happy' | 'anxious' | 'sad' | 'neutral' | 'philosophical';
  emoji: string;
}

interface PetAvatarProps {
  mood: Mood;
  onClick: () => void;
  energy: number;
}

const PetAvatar: React.FC<PetAvatarProps> = ({ mood, onClick, energy }) => {
  const getAnimationClass = () => {
    if (energy < 20) {
      return 'pet-tired';
    }
    
    switch (mood.type) {
      case 'happy':
        return 'pet-sarcastic';
      case 'anxious':
        return 'pet-anxious';
      case 'sad':
        return 'pet-depressed';
      case 'philosophical':
        return 'pet-thinking';
      default:
        return 'pet-dead-inside';
    }
  };

  const getPetEmoji = () => {
    if (energy < 20) {
      return '💀';
    }
    
    if (energy < 40) {
      switch (mood.type) {
        case 'happy':
          return '😏';
        case 'anxious':
          return '😵‍💫';
        case 'sad':
          return '🖤';
        case 'philosophical':
          return '🤨';
        default:
          return '😑';
      }
    }
    
    switch (mood.type) {
      case 'happy':
        return '😏'; // sarcastic smile
      case 'anxious':
        return '😵‍💫'; // dizzy/overwhelmed
      case 'sad':
        return '🖤'; // black heart
      case 'philosophical':
        return '🤨'; // raised eyebrow
      default:
        return '😐'; // dead inside
    }
  };

  const getFloatingElements = () => {
    if (energy < 20) {
      return (
        <>
          <div className="absolute -top-3 -left-2 text-xs floating animation-delay-100">💀</div>
          <div className="absolute -top-2 -right-3 text-xs floating animation-delay-300">⚰️</div>
        </>
      );
    }

    switch (mood.type) {
      case 'anxious':
        return (
          <>
            <div className="absolute -top-2 -left-2 text-xs floating animation-delay-100">📱</div>
            <div className="absolute -top-1 -right-3 text-xs floating animation-delay-300">💊</div>
            <div className="absolute -bottom-2 -left-3 text-xs floating animation-delay-500">☕</div>
          </>
        );
      case 'happy':
        return (
          <>
            <div className="absolute -top-3 -left-1 text-sm floating animation-delay-200">💸</div>
            <div className="absolute -top-2 -right-2 text-sm floating animation-delay-400">📈</div>
            <div className="absolute -bottom-3 right-0 text-sm floating animation-delay-600">🎭</div>
          </>
        );
      case 'sad':
        return (
          <>
            <div className="absolute top-8 left-6 text-xs">🖤</div>
            <div className="absolute top-8 right-6 text-xs">💔</div>
          </>
        );
      case 'philosophical':
        return (
          <>
            <div className="absolute -top-2 -left-2 text-xs floating animation-delay-100">🧠</div>
            <div className="absolute -top-1 -right-3 text-xs floating animation-delay-300">💭</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer select-none
        w-32 h-32 rounded-full 
        bg-gradient-to-br from-gray-800 via-gray-900 to-black
        border-2 border-purple-500/30
        flex items-center justify-center
        transition-all duration-300 hover:scale-110 hover:border-purple-400/50
        shadow-lg shadow-purple-500/20
        ${getAnimationClass()}
        ${energy < 20 ? 'opacity-60' : ''}
      `}
    >
      {/* Pet Face */}
      <div className="text-6xl relative filter drop-shadow-lg">
        {getPetEmoji()}
        
        {getFloatingElements()}
      </div>
      
      {/* Dark glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-purple-500/10 to-transparent"></div>
      
      {/* Click indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 bg-black/70 border border-purple-500/30 px-3 py-1 rounded-full">
        {energy < 20 ? 'Morto por dentro...' : 'Toque para trauma'}
      </div>
    </div>
  );
};

export default PetAvatar;
