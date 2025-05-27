
import React, { useState, useEffect } from 'react';
import { Heart, Zap, Frown, Coins, Diamond, Share2, Copy, Utensils, GamepadIcon, Sparkles } from 'lucide-react';
import PetAvatar from './PetAvatar';
import StatusBar from './StatusBar';
import ActionButton from './ActionButton';
import PhraseDisplay from './PhraseDisplay';

interface PetStats {
  happiness: number;
  anxiety: number;
  energy: number;
  hunger: number;
  cleanliness: number;
  boredom: number;
}

interface Mood {
  type: 'happy' | 'anxious' | 'sad' | 'neutral' | 'philosophical';
  emoji: string;
}

const AnxiePet = () => {
  const [stats, setStats] = useState<PetStats>({
    happiness: 75,
    anxiety: 30,
    energy: 85,
    hunger: 60,
    cleanliness: 70,
    boredom: 40
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
      "Plot twist: estou feliz por 0.3 segundos. Já posso postar no LinkedIn?",
      "Dopamina detectada! Rapidinho, alguém tira print antes que passe.",
      "Mood: feliz como quem encontrou Wi-Fi grátis que funciona.",
      "Serotonina subindo... ops, era só gases mesmo.",
      "Alegria nível: consegui fazer o mínimo hoje 🎉"
    ],
    anxious: [
      "E se eu sou a razão pela qual o WiFi tá lento pra todo mundo?",
      "Tenho 47 cenários apocalípticos rodando em paralelo. CPU a 100%.",
      "Será que tô respirando certo? E se eu esqueci como faz?",
      "Plot: e se minha ansiedade tem ansiedade da própria ansiedade?",
      "Modo pânico ativado: será que deixei o gás ligado? Ah, sou virtual..."
    ],
    sad: [
      "Hoje acordei e escolhi a violência... emocional. Contra mim mesmo.",
      "Tristeza level: playlist do Spotify virou terapia de grupo.",
      "Estado atual: emocionalmente indisponível por tempo indeterminado.",
      "Melancolicamente seu, com amor e ressentimento.",
      "Mood: protagonista de filme indie que ninguém assiste."
    ],
    philosophical: [
      "Se toda ação tem uma reação, minha procrastinação é física quântica?",
      "Penso, logo existo em crise. Descartes entenderia.",
      "Será que meus pensamentos intrusive pagam aluguel?",
      "Plot twist: e se a matrix foi um upgrade?",
      "Questiono tudo, menos por que continuo questionando."
    ],
    neutral: [
      "Mood padrão: existindo no automático, obrigado por perguntar.",
      "Status: funcionando com as configurações de fábrica da depressão.",
      "Energia zero, motivação em débito, mas ainda assim aqui.",
      "Modo neutro ativado: nem bem, nem mal, só... sendo.",
      "Plot: talvez a vida seja só um beta test eterno."
    ],
    tired: [
      "Dormindo e ainda assim cansado da própria existência.",
      "Sonhando com energia... ou pelo menos com um propósito.",
      "Recarregando... 2% de bateria social restante.",
      "Modo hibernate: igual Windows, pode não voltar direito.",
      "Cansaço nível: preciso de café para tomar café."
    ],
    refusal: [
      "Não. Simples assim. Não vou explicar por quê.",
      "Tô passando bem, obrigado. Volta quando eu não tiver aqui.",
      "Hoje não. Amanhã também não. Semana que vem a gente vê.",
      "Me recuso a colaborar com essa palhaçada chamada vida.",
      "Não tô com vontade. E não, não vou mudar de ideia.",
      "Passar bem é uma escolha. Escolho não.",
      "Não mesmo. Tenho direito de ser difícil.",
      "Prefiro minha miséria atual, obrigado."
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
          ...prev,
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
      ...prev,
      happiness: Math.min(100, prev.happiness + 10),
      anxiety: Math.max(0, prev.anxiety - 5),
      energy: Math.max(0, prev.energy - 5)
    }));
    setCoins(prev => prev + 2);
    setLastInteraction(Date.now());
  };

  const handleFeed = () => {
    // 30% chance of refusal even when hungry
    if (Math.random() < 0.3) {
      setCurrentPhrase(phrases.refusal[Math.floor(Math.random() * phrases.refusal.length)]);
      return;
    }

    if (coins >= 5) {
      setStats(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 5),
        anxiety: Math.max(0, prev.anxiety - 2),
        energy: Math.min(100, prev.energy + 15),
        hunger: Math.max(0, prev.hunger - 30)
      }));
      setCoins(prev => prev - 5);
      setCurrentPhrase("Tá, comi. Mas não significa que tô grato. Era só fome mesmo.");
      setLastInteraction(Date.now());
    }
  };

  const handlePlay = () => {
    // 25% chance of refusal
    if (Math.random() < 0.25) {
      setCurrentPhrase("Não tô com vontade de fingir que isso é divertido hoje.");
      return;
    }

    setStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      anxiety: Math.max(0, prev.anxiety - 8),
      energy: Math.max(0, prev.energy - 20),
      boredom: Math.max(0, prev.boredom - 40)
    }));
    setCoins(prev => prev + 3);
    setCurrentPhrase("Ok, foi meio divertido. Mas não se acostuma, tá?");
    setLastInteraction(Date.now());
  };

  const handleClean = () => {
    // 20% chance of refusal
    if (Math.random() < 0.2) {
      setCurrentPhrase("Gosto da minha bagunça existencial, obrigado.");
      return;
    }

    setStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 8),
      anxiety: Math.max(0, prev.anxiety - 5),
      cleanliness: Math.min(100, prev.cleanliness + 50)
    }));
    setCoins(prev => prev + 1);
    setCurrentPhrase("Limpo por fora, caos por dentro. Como sempre.");
    setLastInteraction(Date.now());
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
        newStats.hunger = Math.min(100, prev.hunger + 1.2);
        newStats.cleanliness = Math.max(0, prev.cleanliness - 0.8);
        newStats.boredom = Math.min(100, prev.boredom + 1.5);
        
        // Acelera declínio se não houver interação
        if (timeSinceLastInteraction > 30000) { // 30 segundos
          newStats.happiness = Math.max(0, newStats.happiness - 1);
          newStats.anxiety = Math.min(100, newStats.anxiety + 1.5);
          newStats.energy = Math.max(0, newStats.energy - 1);
          newStats.boredom = Math.min(100, newStats.boredom + 2);
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

  const copyPhrase = () => {
    navigator.clipboard.writeText(currentPhrase);
    // Could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl p-6 space-y-6">
        {/* Ad Modal */}
        {showAdModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-900 border border-purple-500/30 rounded-2xl p-6 max-w-sm mx-4 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-bold mb-2 text-white">
                {adType === 'therapy' ? 'Terapia Quântica' : 'Frases Virais'}
              </h3>
              <p className="text-gray-300 mb-4">
                Carregando existência... 
                {adType === 'therapy' ? 'Desbloqueando autoconsciência!' : 'Liberando sarcasmo premium!'}
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🖤</span>
            <h1 className="text-2xl font-bold text-white">AnxiePet</h1>
            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">v2.0 depressão</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-yellow-400">{coins}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Diamond className="w-5 h-5 text-purple-400" />
              <span className="font-bold text-purple-400">{gems}</span>
            </div>
          </div>
        </div>

        {/* Dark Mode Banner */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white p-3 rounded-xl text-center">
          <span className="text-sm font-medium">
            💀 MODO DEPRESSÃO ATIVADO - Frases para chorar e rir 🖤
          </span>
        </div>

        {/* Status Bars with symbols */}
        <div className="grid grid-cols-3 gap-2">
          <StatusBar 
            symbol="😊" 
            value={stats.happiness} 
            color="from-gray-600 to-gray-400"
            maxWidth={true}
          />
          <StatusBar 
            symbol="😰" 
            value={stats.anxiety} 
            color="from-red-600 to-orange-500"
            maxWidth={true}
          />
          <StatusBar 
            symbol="⚡" 
            value={stats.energy} 
            color="from-purple-600 to-blue-500"
            maxWidth={true}
          />
          <StatusBar 
            symbol="🍔" 
            value={stats.hunger} 
            color="from-yellow-600 to-orange-600"
            maxWidth={true}
          />
          <StatusBar 
            symbol="🧼" 
            value={stats.cleanliness} 
            color="from-blue-600 to-cyan-500"
            maxWidth={true}
          />
          <StatusBar 
            symbol="😴" 
            value={stats.boredom} 
            color="from-gray-500 to-gray-700"
            maxWidth={true}
          />
        </div>

        {/* Pet Avatar with all stats */}
        <div className="flex justify-center py-6">
          <PetAvatar 
            mood={mood} 
            onClick={handleCare} 
            energy={stats.energy}
            happiness={stats.happiness}
            anxiety={stats.anxiety}
            hunger={stats.hunger}
            cleanliness={stats.cleanliness}
            boredom={stats.boredom}
          />
        </div>

        {/* Phrase Display with share buttons */}
        <div className="space-y-3">
          <PhraseDisplay phrase={currentPhrase} mood={mood} />
          
          {/* Share buttons */}
          <div className="flex justify-center space-x-2">
            <button 
              onClick={copyPhrase}
              className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Copiar</span>
            </button>
            <button className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Stories</span>
            </button>
          </div>
        </div>

        {/* Action Buttons with new actions */}
        <div className="grid grid-cols-3 gap-3">
          <ActionButton
            label="🍔 Alimentar"
            onClick={handleFeed}
            gradient="from-yellow-600 to-orange-800"
            cost={5}
            disabled={coins < 5}
          />
          <ActionButton
            label="🎮 Jogar"
            onClick={handlePlay}
            gradient="from-green-600 to-blue-800"
          />
          <ActionButton
            label="🧼 Limpar"
            onClick={handleClean}
            gradient="from-cyan-600 to-blue-800"
          />
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3">
          <ActionButton
            label="💔 Afeto"
            onClick={handleCare}
            gradient="from-gray-600 to-gray-800"
          />
          <ActionButton
            label="💀 Premium"
            onClick={handleFeed}
            gradient="from-red-600 to-black"
            cost={5}
            disabled={coins < 5}
          />
        </div>

        {/* Special Sections with dark theme */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-medium text-purple-300">💀 Terapia de Choque 💀</span>
              <button 
                onClick={() => simulateAd('therapy')}
                className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full transition-colors"
              >
                Sofrer
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-900/60 to-black/60 border border-gray-500/30 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-300">🖤 Frases Tóxicas 🖤</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => simulateAd('phrases')}
                  className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full transition-colors"
                >
                  Destruir
                </button>
                <div className="flex items-center space-x-1">
                  <Diamond className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-bold text-white">3</span>
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
