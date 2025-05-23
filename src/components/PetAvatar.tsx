
import React from 'react';

interface Mood {
  type: 'happy' | 'anxious' | 'sad' | 'neutral' | 'philosophical';
  emoji: string;
}

interface PetAvatarProps {
  mood: Mood;
  onClick: () => void;
  energy: number; // Add energy prop
}

const PetAvatar: React.FC<PetAvatarProps> = ({ mood, onClick, energy }) => {
  const getAnimationClass = () => {
    // If energy is very low, override with tired animation
    if (energy < 20) {
      return 'pet-tired';
    }
    
    switch (mood.type) {
      case 'happy':
        return 'pet-happy';
      case 'anxious':
        return 'pet-anxious';
      case 'sad':
        return 'pet-sad';
      default:
        return 'pet-bounce';
    }
  };

  const getPetEmoji = () => {
    // If energy is very low, show tired face regardless of mood
    if (energy < 20) {
      return '😴';
    }
    
    // If energy is low but not critical, show tired version of current mood
    if (energy < 40) {
      switch (mood.type) {
        case 'happy':
          return '😊';
        case 'anxious':
          return '😰';
        case 'sad':
          return '😢';
        case 'philosophical':
          return '🤔';
        default:
          return '😑'; // tired neutral
      }
    }
    
    switch (mood.type) {
      case 'happy':
        return '😊';
      case 'anxious':
        return '😰';
      case 'sad':
        return '😢';
      case 'philosophical':
        return '🤔';
      default:
        return '😐';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer select-none
        w-32 h-32 rounded-full 
        bg-gradient-to-br from-yellow-200 via-orange-200 to-orange-300
        flex items-center justify-center
        transition-all duration-300 hover:scale-110
        pulse-glow
        ${getAnimationClass()}
        ${energy < 20 ? 'opacity-75' : ''}
      `}
    >
      {/* Pet Face */}
      <div className="text-6xl relative">
        {getPetEmoji()}
        
        {/* Energy indicators */}
        {energy < 20 && (
          <>
            <div className="absolute -top-2 -left-2 text-xs">💤</div>
            <div className="absolute -top-1 -right-3 text-xs">😴</div>
          </>
        )}
        
        {/* Floating particles for anxiety */}
        {mood.type === 'anxious' && energy >= 20 && (
          <>
            <div className="absolute -top-2 -left-2 text-xs floating animation-delay-100">💭</div>
            <div className="absolute -top-1 -right-3 text-xs floating animation-delay-300">😵‍💫</div>
            <div className="absolute -bottom-2 -left-3 text-xs floating animation-delay-500">💔</div>
          </>
        )}
        
        {/* Hearts for happiness */}
        {mood.type === 'happy' && energy >= 20 && (
          <>
            <div className="absolute -top-3 -left-1 text-sm floating animation-delay-200">💖</div>
            <div className="absolute -top-2 -right-2 text-sm floating animation-delay-400">✨</div>
            <div className="absolute -bottom-3 right-0 text-sm floating animation-delay-600">🌟</div>
          </>
        )}

        {/* Tears for sadness */}
        {mood.type === 'sad' && energy >= 20 && (
          <>
            <div className="absolute top-8 left-6 text-xs">💧</div>
            <div className="absolute top-8 right-6 text-xs">💧</div>
          </>
        )}
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
      
      {/* Click indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded-full opacity-75">
        {energy < 20 ? 'Está dormindo...' : 'Toque para carinho'}
      </div>
    </div>
  );
};

export default PetAvatar;
