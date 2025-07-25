import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  Clock, 
  Trophy, 
  Zap, 
  Play, 
  Pause,
  Crown,
  Target,
  Code
} from 'lucide-react';
import { CodeEditor } from '../code/CodeEditor';
import { Challenge } from '../../types/game';

interface BattleParticipant {
  id: string;
  username: string;
  progress: number;
  score: number;
  rank: number;
  isCompleted: boolean;
}

interface BattleRoomProps {
  battleId: string;
  challenge: Challenge;
  onExit: () => void;
}

export function BattleRoom({ battleId, challenge, onExit }: BattleRoomProps) {
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [participants, setParticipants] = useState<BattleParticipant[]>([
    { id: '1', username: 'CodeNinja', progress: 85, score: 850, rank: 1, isCompleted: false },
    { id: '2', username: 'PythonMaster', progress: 72, score: 720, rank: 2, isCompleted: false },
    { id: '3', username: 'AlgoHunter', progress: 68, score: 680, rank: 3, isCompleted: false },
    { id: '4', username: 'You', progress: 0, score: 0, rank: 4, isCompleted: false },
  ]);
  const [battleStatus, setBattleStatus] = useState<'active' | 'completed'>('active');
  const [playerCompleted, setPlayerCompleted] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setBattleStatus('completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate other players' progress
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setParticipants(prev => prev.map(p => {
        if (p.id !== '4' && !p.isCompleted && battleStatus === 'active') {
          const newProgress = Math.min(100, p.progress + Math.random() * 3);
          const newScore = Math.floor(newProgress * 10);
          const isCompleted = newProgress >= 100;
          
          return {
            ...p,
            progress: newProgress,
            score: newScore,
            isCompleted
          };
        }
        return p;
      }));
    }, 2000);

    return () => clearInterval(progressTimer);
  }, [battleStatus]);

  // Update rankings
  useEffect(() => {
    setParticipants(prev => {
      const sorted = [...prev].sort((a, b) => b.score - a.score);
      return sorted.map((p, index) => ({ ...p, rank: index + 1 }));
    });
  }, [participants]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChallengeComplete = (success: boolean, xpGained: number) => {
    if (success) {
      setPlayerCompleted(true);
      setParticipants(prev => prev.map(p => 
        p.id === '4' 
          ? { ...p, progress: 100, score: 1000, isCompleted: true }
          : p
      ));
    }
  };

  const getStatusColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400 bg-yellow-400/20';
      case 2: return 'text-gray-300 bg-gray-300/20';
      case 3: return 'text-orange-400 bg-orange-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-4 h-4" />;
      case 2: return <Trophy className="w-4 h-4" />;
      case 3: return <Target className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Battle Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">Battle Arena</h1>
            <Badge variant="outline" className="text-neon-blue border-neon-blue">
              Battle #{battleId}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-800">
              <Clock className="w-5 h-5 text-neon-blue" />
              <span className="text-white font-mono text-lg">
                {formatTime(timeRemaining)}
              </span>
            </div>
            
            <Button 
              variant="outline" 
              onClick={onExit}
              className="border-red-500 text-red-400 hover:bg-red-500/10"
            >
              Exit Battle
            </Button>
          </div>
        </div>

        {/* Battle Status */}
        <div className="flex items-center justify-between bg-gradient-to-r from-primary/20 to-accent/20 p-4 rounded-lg border border-accent/30">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-neon-blue" />
              <span className="text-white">{participants.length} Hunters</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white">{challenge.xpReward} XP Prize</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {battleStatus === 'active' ? (
              <>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">Battle Active</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-400 rounded-full" />
                <span className="text-red-400 font-medium">Battle Ended</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Challenge Area */}
        <div className="lg:col-span-3">
          <CodeEditor 
            challenge={challenge} 
            onComplete={handleChallengeComplete}
          />
        </div>

        {/* Live Leaderboard */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900/50 border-accent/30 sticky top-6">
            <div className="p-4 border-b border-accent/30">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Live Rankings
              </h3>
            </div>
            
            <div className="p-4 space-y-3">
              {participants.map((participant) => (
                <div 
                  key={participant.id}
                  className={`p-3 rounded-lg border transition-all ${
                    participant.id === '4' 
                      ? 'border-neon-blue bg-neon-blue/10' 
                      : 'border-gray-700 bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded-full ${getStatusColor(participant.rank)}`}>
                        {getRankIcon(participant.rank)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">
                          {participant.username}
                          {participant.id === '4' && ' (You)'}
                        </p>
                        <p className="text-xs text-gray-400">
                          Rank #{participant.rank}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">
                        {participant.score}
                      </p>
                      <p className="text-xs text-gray-400">points</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{Math.round(participant.progress)}%</span>
                    </div>
                    <Progress 
                      value={participant.progress} 
                      className="h-2"
                    />
                  </div>
                  
                  {participant.isCompleted && (
                    <div className="mt-2 flex items-center justify-center">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        ✅ Completed
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Battle Stats */}
            <div className="p-4 border-t border-accent/30">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Your Best Rank:</span>
                  <span className="text-white font-medium">
                    #{Math.min(...participants.filter(p => p.id === '4').map(p => p.rank))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed:</span>
                  <span className="text-white font-medium">
                    {participants.filter(p => p.isCompleted).length}/{participants.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Prize Pool:</span>
                  <span className="text-yellow-400 font-medium">
                    {challenge.xpReward * participants.length} XP
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Battle Completion Modal */}
      {playerCompleted && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-gradient-to-br from-primary to-accent border-accent/30 p-8 max-w-md mx-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-green-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-white">Challenge Completed!</h2>
              
              <div className="space-y-2">
                <p className="text-gray-300">
                  You finished the challenge and earned:
                </p>
                <p className="text-3xl font-bold text-yellow-400">
                  +{challenge.xpReward} XP
                </p>
                <p className="text-sm text-gray-400">
                  Final Rank: #{participants.find(p => p.id === '4')?.rank || 4}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={onExit}
                  className="flex-1 bg-neon-blue hover:bg-neon-blue/80"
                >
                  Return to Dashboard
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-neon-blue text-neon-blue hover:bg-neon-blue/10"
                >
                  Next Battle
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}