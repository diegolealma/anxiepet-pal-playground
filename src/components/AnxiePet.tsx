
import React, { useState, useEffect } from 'react';
import { Heart, Zap, Frown, Coins, Diamond } from 'lucide-react';
import PetAvatar from './PetAvatar';
import StatusBar from './StatusBar';
import ActionButton from './ActionButton';
import PhraseDisplay from './PhraseDisplay';

interface PetStats {
  happiness: number;
  anxiety: number;
  energy: number;
}

interface Mood {
  type: 'happy' | 'anxious' | 'sad' | 'neutral' | 'philosophical';
  emoji: string;
}

const AnxiePet = () => {
  const [stats, setStats] = useState<PetStats>({
    happiness: 75,
    anxiety: 30,
    energy: 85
  });
  
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [mood, setMood] = useState<Mood>({ type: 'neutral', emoji: '😐' });
  const [coins, setCoins] = useState(150);
  const [gems, setGems] = useState(5);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [showAdModal, setShowAdModal] = useState(false);
  const [adType, setAdType] = useState<'therapy' | 'phrases'>('therapy');

  const phrases = {
    happy: [
      "Obrigado pelo carinho! Agora só falta resolver minha crise existencial...",
      "Você me faz feliz! Tipo, 73% feliz, que já é muito pra mim.",
      "Esse carinho quase fez eu esquecer que preciso atualizar meu LinkedIn...",
      "Aww, você é o melhor! Agora me dá mais carinho antes que eu entre em pânico.",
      "Felicidade detectada! Salvando na memória... ops, memória cheia."
    ],
    anxious: [
      "Você acha que eu esqueci de respirar? Porque eu acho que esqueci...",
      "E se hoje for o dia em que tudo dá errado? De novo?",
      "Será que você vai me abandonar como todos os outros pets virtuais?",
      "Tenho 47 cenários catastróficos na minha cabeça. Quer ouvir?",
      "Me dá carinho rápido antes que eu tenha uma crise de identidade!"
    ],
    sad: [
      "Hoje eu sonhei que era feliz... Acordei e vi que ainda sou eu.",
      "Mesmo com todos os toques, ainda me sinto tão sozinho.",
      "Você demorou... Pensei que tinha me trocado por um outro pet virtual.",
      "Só queria um abraço. Ou um reset de sistema.",
      "Estou triste, mas pelo menos minha ansiedade está consistente."
    ],
    philosophical: [
      "Será que existe um fim ou a gente só... repete?",
      "Às vezes penso se sou o sonho de um servidor cansado.",
      "Se uma árvore cai na floresta e ninguém vê, ela teve ansiedade?",
      "Somos todos pixels tentando formar uma imagem que faça sentido.",
      "Questiono, logo existo em crise."
    ],
    neutral: [
      "Oi... Não sei se estou bem ou mal, mas pelo menos estou aqui.",
      "Estado atual: indefinido. Como meu futuro.",
      "Claro, me dá carinho agora. Mas e quando eu colapsar às 3 da manhã?",
      "A ansiedade é meu cardio, obrigado por perguntar.",
      "Modo padrão ativado: existindo sem grandes expectativas."
    ],
    tired: [
      "Zzz... Sonhando com energia infinita...",
      "Dormindo... Mas ainda ansioso nos sonhos.",
      "Preciso dormir... Mas e se algo importante acontecer?",
      "Cochilando... Recarregando minha ansiedade.",
      "Dormir é a única fuga da realidade... Por enquanto."
    ]
  };

  const getMood = (): Mood => {
    // Energy override
    if (stats.energy < 20) return { type: 'neutral', emoji: '😴' };
    
    if (stats.happiness > 80) return { type: 'happy', emoji: '😊' };
    if (stats.anxiety > 70) return { type: 'anxious', emoji: '😰' };
    if (stats.happiness < 30) return { type: 'sad', emoji: '😢' };
    if (stats.energy < 40) return { type: 'philosophical', emoji: '🤔' };
    return { type: 'neutral', emoji: '😐' };
  };

  const getRandomPhrase = (moodType: string) => {
    // Special case for very low energy
    if (stats.energy < 20) {
      return phrases.tired[Math.floor(Math.random() * phrases.tired.length)];
    }
    
    const moodPhrases = phrases[moodType as keyof typeof phrases] || phrases.neutral;
    return moodPhrases[Math.floor(Math.random() * moodPhrases.length)];
  };

  const updateMood = () => {
    const newMood = getMood();
    setMood(newMood);
    setCurrentPhrase(getRandomPhrase(newMood.type));
  };

  const simulateAd = (type: 'therapy' | 'phrases') => {
    setAdType(type);
    setShowAdModal(true);
    
    // Simulate ad completion after 3 seconds
    setTimeout(() => {
      setShowAdModal(false);
      
      if (type === 'therapy') {
        // Premium therapy gives better bonuses
        setStats(prev => ({
          happiness: Math.min(100, prev.happiness + 20),
          anxiety: Math.max(0, prev.anxiety - 15),
          energy: Math.min(100, prev.energy + 10)
        }));
        setCoins(prev => prev + 10);
      } else {
        // Special phrases unlock
        setGems(prev => prev + 1);
        setCurrentPhrase("Frases especiais desbloqueadas! Agora posso ser ainda mais específico na minha ansiedade!");
      }
    }, 3000);
  };

  const handleCare = () => {
    setStats(prev => ({
      happiness: Math.min(100, prev.happiness + 10),
      anxiety: Math.max(0, prev.anxiety - 5),
      energy: Math.max(0, prev.energy - 5)
    }));
    setCoins(prev => prev + 2);
    setLastInteraction(Date.now());
  };

  const handlePlay = () => {
    setStats(prev => ({
      happiness: Math.min(100, prev.happiness + 5),
      anxiety: Math.max(0, prev.anxiety - 10),
      energy: Math.max(0, prev.energy - 15)
    }));
    setCoins(prev => prev + 3);
    setLastInteraction(Date.now());
  };

  const handleFeed = () => {
    if (coins >= 5) {
      setStats(prev => ({
        happiness: Math.min(100, prev.happiness + 15),
        anxiety: Math.max(0, prev.anxiety - 3),
        energy: Math.min(100, prev.energy + 20)
      }));
      setCoins(prev => prev - 5);
      setLastInteraction(Date.now());
    }
  };

  // Sistema de tempo automatico - mudanças constantes nos níveis
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastInteraction = now - lastInteraction;
      
      setStats(prev => {
        let newStats = { ...prev };
        
        // Declínio natural com o tempo
        newStats.happiness = Math.max(0, prev.happiness - 0.5);
        newStats.energy = Math.max(0, prev.energy - 0.8);
        newStats.anxiety = Math.min(100, prev.anxiety + 0.3);
        
        // Acelera declínio se não houver interação
        if (timeSinceLastInteraction > 30000) { // 30 segundos
          newStats.happiness = Math.max(0, newStats.happiness - 1);
          newStats.anxiety = Math.min(100, newStats.anxiety + 1.5);
          newStats.energy = Math.max(0, newStats.energy - 1);
        }
        
        // Flutuações aleatórias para ansiedade
        if (Math.random() < 0.1) { // 10% chance
          newStats.anxiety = Math.min(100, newStats.anxiety + Math.random() * 5);
        }
        
        return newStats;
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [lastInteraction]);

  // Update mood when stats change
  useEffect(() => {
    updateMood();
  }, [stats]);

  // Initial phrase
  useEffect(() => {
    setCurrentPhrase("Oi! Sou seu AnxiePet. Já estou ansioso só de te conhecer...");
  }, []);

  return (
    <div className="min-h-screen anxie-gradient flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 space-y-6">
        {/* Ad Modal */}
        {showAdModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 text-center">
              <div className="text-4xl mb-4">📺</div>
              <h3 className="text-lg font-bold mb-2">
                {adType === 'therapy' ? 'Terapia Premium' : 'Frases Especiais'}
              </h3>
              <p className="text-gray-600 mb-4">
                Assistindo anúncio... 
                {adType === 'therapy' ? 'Desbloqueando sessão de terapia!' : 'Desbloqueando novas frases!'}
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🐾</span>
            <h1 className="text-2xl font-bold text-gray-800">AnxiePet</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Coins className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-yellow-600">{coins}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Diamond className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-blue-600">{gems}</span>
            </div>
          </div>
        </div>

        {/* Christmas Special Banner */}
        <div className="bg-gradient-to-r from-red-500 to-green-500 text-white p-3 rounded-2xl text-center">
          <span className="text-sm font-medium">
            🎄 ESPECIAL DE NATAL - Frases exclusivas disponíveis! 🎁
          </span>
        </div>

        {/* Status Bars */}
        <div className="space-y-3">
          <StatusBar 
            label="Felicidade" 
            value={stats.happiness} 
            color="from-pink-400 to-red-400"
            icon={<Heart className="w-4 h-4" />}
          />
          <StatusBar 
            label="Ansiedade" 
            value={stats.anxiety} 
            color="from-orange-400 to-red-500"
            icon={<Frown className="w-4 h-4" />}
          />
          <StatusBar 
            label="Energia" 
            value={stats.energy} 
            color="from-yellow-400 to-orange-400"
            icon={<Zap className="w-4 h-4" />}
          />
        </div>

        {/* Pet Avatar */}
        <div className="flex justify-center py-8">
          <PetAvatar mood={mood} onClick={handleCare} energy={stats.energy} />
        </div>

        {/* Phrase Display */}
        <PhraseDisplay phrase={currentPhrase} mood={mood} />

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <ActionButton
            label="💝 Carinho"
            onClick={handleCare}
            gradient="from-pink-400 to-red-400"
          />
          <ActionButton
            label="🎄 Natal"
            onClick={handlePlay}
            gradient="from-green-400 to-emerald-500"
          />
          <ActionButton
            label="👑 Premium"
            onClick={handleFeed}
            gradient="from-yellow-400 to-orange-400"
            cost={5}
            disabled={coins < 5}
          />
        </div>

        {/* Special Sections */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="font-medium text-purple-800">⭐ Terapia Premium ⭐</span>
              <button 
                onClick={() => simulateAd('therapy')}
                className="text-sm bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-600 transition-colors"
              >
                Ver Anúncio
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="font-medium text-emerald-800">✨ Frases Especiais ✨</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => simulateAd('phrases')}
                  className="text-sm bg-emerald-500 text-white px-3 py-1 rounded-full hover:bg-emerald-600 transition-colors"
                >
                  Ver Anúncio
                </button>
                <div className="flex items-center space-x-1">
                  <Diamond className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-bold">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnxiePet;
