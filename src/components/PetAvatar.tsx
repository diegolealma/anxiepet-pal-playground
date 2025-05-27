
import React from 'react';

interface Mood {
  type: 'happy' | 'anxious' | 'sad' | 'neutral' | 'philosophical';
  emoji: string;
}

interface PetAvatarProps {
  mood: Mood;
  onClick: () => void;
  energy: number;
  happiness: number;
  anxiety: number;
  hunger: number;
  cleanliness: number;
  boredom: number;
}

const PetAvatar: React.FC<PetAvatarProps> = ({ 
  mood, 
  onClick, 
  energy, 
  happiness, 
  anxiety, 
  hunger, 
  cleanliness, 
  boredom 
}) => {
  const getAdvancedExpression = () => {
    // Estados extremos primeiro
    if (energy < 10) return '💀';
    if (anxiety > 90) return '🤯';
    if (happiness < 10 && anxiety > 70) return '😵‍💫';
    if (hunger > 90) return '🤮';
    if (cleanliness < 20) return '🤢';
    if (boredom > 90) return '😴';
    
    // Combinações específicas
    if (happiness > 80 && energy > 70) return '😏'; // sarcástico feliz
    if (happiness < 30 && anxiety > 60) return '🫠'; // derretendo
    if (energy < 30 && boredom > 60) return '😑'; // morto por dentro
    if (anxiety > 70 && energy > 50) return '😵‍💫'; // ansioso energético
    if (happiness < 40 && energy < 40) return '🙄'; // cansado e irritado
    if (hunger > 70 && happiness < 50) return '😤'; // irritado com fome
    if (cleanliness < 40 && anxiety > 50) return '🤨'; // questionando a vida
    if (boredom > 70 && anxiety < 30) return '😶‍🌫️'; // vazio
    
    // Estados normais por mood
    switch (mood.type) {
      case 'happy':
        return happiness > 60 ? '😈' : '😏';
      case 'anxious':
        return anxiety > 60 ? '😰' : '😵‍💫';
      case 'sad':
        return happiness < 30 ? '🖤' : '😔';
      case 'philosophical':
        return '🤔';
      default:
        return '😐';
    }
  };

  const getAnimationClass = () => {
    // Animações baseadas em múltiplos stats
    if (energy < 20) return 'pet-dying';
    if (anxiety > 90) return 'pet-panic';
    if (hunger > 90) return 'pet-starving';
    if (boredom > 90) return 'pet-bored-to-death';
    if (cleanliness < 20) return 'pet-disgusted';
    if (happiness > 80 && energy > 70) return 'pet-evil-happy';
    if (anxiety > 70) return 'pet-anxious-shake';
    if (happiness < 30) return 'pet-depressed-slow';
    if (energy < 40) return 'pet-tired-sway';
    
    switch (mood.type) {
      case 'happy':
        return 'pet-sarcastic-bounce';
      case 'anxious':
        return 'pet-nervous-twitch';
      case 'sad':
        return 'pet-melancholy';
      case 'philosophical':
        return 'pet-deep-thinking';
      default:
        return 'pet-existential-crisis';
    }
  };

  const getFloatingElements = () => {
    const elements = [];
    
    // Elementos baseados em stats extremos
    if (energy < 20) {
      elements.push(
        <div key="death1" className="absolute -top-3 -left-2 text-xs floating animation-delay-100">💀</div>,
        <div key="death2" className="absolute -top-2 -right-3 text-xs floating animation-delay-300">⚰️</div>,
        <div key="death3" className="absolute -bottom-2 left-1 text-xs floating animation-delay-500">🪦</div>
      );
    }
    
    if (anxiety > 80) {
      elements.push(
        <div key="panic1" className="absolute -top-2 -left-2 text-xs rapid-float animation-delay-100">📱</div>,
        <div key="panic2" className="absolute -top-1 -right-3 text-xs rapid-float animation-delay-200">💊</div>,
        <div key="panic3" className="absolute -bottom-2 -left-3 text-xs rapid-float animation-delay-300">☕</div>,
        <div key="panic4" className="absolute bottom-0 right-2 text-xs rapid-float animation-delay-400">🚨</div>
      );
    }
    
    if (hunger > 80) {
      elements.push(
        <div key="hunger1" className="absolute -top-2 left-0 text-xs bouncing animation-delay-100">🍕</div>,
        <div key="hunger2" className="absolute top-0 -right-2 text-xs bouncing animation-delay-300">🍔</div>
      );
    }
    
    if (boredom > 80) {
      elements.push(
        <div key="bored1" className="absolute -top-3 -left-1 text-xs slow-drift animation-delay-200">💤</div>,
        <div key="bored2" className="absolute -top-2 -right-2 text-xs slow-drift animation-delay-400">😴</div>
      );
    }
    
    if (cleanliness < 30) {
      elements.push(
        <div key="dirty1" className="absolute top-2 -left-3 text-xs wiggle animation-delay-100">🦠</div>,
        <div key="dirty2" className="absolute bottom-2 -right-2 text-xs wiggle animation-delay-300">🪰</div>
      );
    }
    
    // Elementos por mood (se não houver stats extremos)
    if (elements.length === 0) {
      switch (mood.type) {
        case 'happy':
          elements.push(
            <div key="happy1" className="absolute -top-3 -left-1 text-sm evil-glow animation-delay-200">💸</div>,
            <div key="happy2" className="absolute -top-2 -right-2 text-sm evil-glow animation-delay-400">📈</div>,
            <div key="happy3" className="absolute -bottom-3 right-0 text-sm evil-glow animation-delay-600">🎭</div>
          );
          break;
        case 'philosophical':
          elements.push(
            <div key="think1" className="absolute -top-2 -left-2 text-xs deep-thought animation-delay-100">🧠</div>,
            <div key="think2" className="absolute -top-1 -right-3 text-xs deep-thought animation-delay-300">💭</div>,
            <div key="think3" className="absolute bottom-0 left-0 text-xs deep-thought animation-delay-500">🌌</div>
          );
          break;
        case 'sad':
          elements.push(
            <div key="sad1" className="absolute top-8 left-6 text-xs">🖤</div>,
            <div key="sad2" className="absolute top-8 right-6 text-xs">💔</div>
          );
          break;
      }
    }
    
    return elements;
  };

  const getClickText = () => {
    if (energy < 20) return 'Ressuscitar...';
    if (anxiety > 90) return 'Acalmar pânico';
    if (hunger > 90) return 'Alimentar urgente';
    if (boredom > 90) return 'Acordar';
    return 'Toque para trauma';
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
        {getAdvancedExpression()}
        
        {getFloatingElements()}
      </div>
      
      {/* Dark glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-purple-500/10 to-transparent"></div>
      
      {/* Click indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 bg-black/70 border border-purple-500/30 px-3 py-1 rounded-full">
        {getClickText()}
      </div>
    </div>
  );
};

export default PetAvatar;
