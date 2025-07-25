import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy, 
  Zap, 
  Settings, 
  LogOut,
  Crown,
  Sword
} from 'lucide-react'
import { blink } from '@/blink/client'
import type { Player } from '@/types/game'

export function Header() {
  const [user, setUser] = useState<any>(null)
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'S': return 'text-neon-purple'
      case 'A': return 'text-neon-blue'
      case 'B': return 'text-neon-green'
      case 'C': return 'text-yellow-400'
      case 'D': return 'text-orange-400'
      case 'E': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getRankIcon = (rank: string) => {
    if (rank === 'S') return <Crown className="w-4 h-4" />
    return <Sword className="w-4 h-4" />
  }

  if (!user) return null

  return (
    <header className="border-b border-gray-800 bg-gradient-to-r from-primary to-accent backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-neon-blue rounded-lg flex items-center justify-center glow-effect">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Solo Leveling</h1>
              <p className="text-xs text-text-secondary">Python Arena</p>
            </div>
          </div>

          {/* Player Stats */}
          <div className="flex items-center space-x-6">
            {player && (
              <>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-neon-blue" />
                  <span className="text-sm font-medium">{player.totalChallengesCompleted} Challenges</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-neon-green" />
                  <span className="text-sm font-medium">{player.xp} XP</span>
                </div>

                <Badge 
                  variant="outline" 
                  className={`${getRankColor(player.rank)} border-current neon-border`}
                >
                  {getRankIcon(player.rank)}
                  <span className="ml-1 font-bold">{player.rank}-Rank</span>
                </Badge>
              </>
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8 border-2 border-neon-blue">
                <AvatarFallback className="bg-accent text-white">
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-text-secondary hover:text-white">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-text-secondary hover:text-white"
                  onClick={() => blink.auth.logout()}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}