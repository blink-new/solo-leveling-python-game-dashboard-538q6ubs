import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { PlayerStatsCard } from '@/components/dashboard/PlayerStatsCard'
import { BattleArena } from '@/components/dashboard/BattleArena'
import { ChallengeGrid } from '@/components/dashboard/ChallengeGrid'
import { Leaderboard } from '@/components/dashboard/Leaderboard'
import { blink } from '@/blink/client'
import type { PlayerStats } from '@/types/game'

export function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Mock player stats - in real app, fetch from database
  const mockPlayerStats: PlayerStats = {
    totalXP: 3450,
    currentLevel: 12,
    xpToNextLevel: 550,
    rank: 'B',
    challengesCompleted: 23,
    battlesWon: 8,
    battlesLost: 3,
    winRate: 73,
    achievements: [
      {
        id: '1',
        title: 'First Steps',
        description: 'Complete your first challenge',
        icon: '🎯',
        xpReward: 50,
        unlockedBy: ['user1'],
        requirement: 'Complete 1 challenge'
      },
      {
        id: '2',
        title: 'Code Warrior',
        description: 'Win 5 battles',
        icon: '⚔️',
        xpReward: 100,
        unlockedBy: ['user1'],
        requirement: 'Win 5 battles'
      },
      {
        id: '3',
        title: 'Python Master',
        description: 'Complete 20 challenges',
        icon: '🐍',
        xpReward: 200,
        unlockedBy: ['user1'],
        requirement: 'Complete 20 challenges'
      }
    ]
  }

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-neon-blue rounded-lg flex items-center justify-center glow-effect mx-auto">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-text-secondary">Loading Solo Leveling Arena...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-neon-blue rounded-lg flex items-center justify-center glow-effect mx-auto">
            <span className="text-2xl">⚔️</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Solo Leveling</h1>
            <h2 className="text-xl text-neon-blue mb-4">Python Arena</h2>
            <p className="text-text-secondary mb-6">
              Level up your Python skills through epic coding battles and challenges. 
              Rise from E-Rank to S-Rank in this gamified learning experience!
            </p>
          </div>
          <button 
            onClick={() => blink.auth.login()}
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80 text-white font-medium py-3 px-6 rounded-lg transition-all hover:scale-105 glow-effect"
          >
            Enter the Arena
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-lg p-6 border border-neon-blue/30">
              <h1 className="text-2xl font-bold text-white mb-2">
                Welcome back, Hunter! 🎯
              </h1>
              <p className="text-text-secondary">
                Ready to level up your Python skills? Choose your next challenge or join a battle!
              </p>
            </div>

            {/* Battle Arena */}
            <BattleArena />

            {/* Challenges Grid */}
            <ChallengeGrid />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Player Stats */}
            <PlayerStatsCard stats={mockPlayerStats} />

            {/* Leaderboard */}
            <Leaderboard />
          </div>
        </div>
      </main>
    </div>
  )
}