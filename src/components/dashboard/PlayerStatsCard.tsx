import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Zap, 
  Trophy, 
  Target, 
  TrendingUp,
  Crown,
  Sword,
  Shield
} from 'lucide-react'
import type { PlayerStats } from '@/types/game'

interface PlayerStatsCardProps {
  stats: PlayerStats
}

export function PlayerStatsCard({ stats }: PlayerStatsCardProps) {
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
    switch (rank) {
      case 'S': return <Crown className="w-6 h-6" />
      case 'A': return <Sword className="w-6 h-6" />
      case 'B': return <Shield className="w-6 h-6" />
      default: return <Target className="w-6 h-6" />
    }
  }

  const xpProgress = (stats.totalXP % 1000) / 10 // Simplified XP calculation

  return (
    <Card className="bg-gradient-to-br from-primary to-accent border-gray-800 neon-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-neon-blue" />
            <span className="text-white">Player Stats</span>
          </div>
          <Badge 
            variant="outline" 
            className={`${getRankColor(stats.rank)} border-current neon-border pulse-neon`}
          >
            {getRankIcon(stats.rank)}
            <span className="ml-2 font-bold text-lg">{stats.rank}-RANK</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-secondary">Level {stats.currentLevel}</span>
            <span className="text-sm text-neon-blue">{stats.totalXP} XP</span>
          </div>
          <Progress 
            value={xpProgress} 
            className="h-3 bg-gray-800"
          />
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Current XP</span>
            <span>{stats.xpToNextLevel} XP to next level</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="flex items-center space-x-2 mb-1">
              <Trophy className="w-4 h-4 text-neon-green" />
              <span className="text-xs text-text-secondary">Challenges</span>
            </div>
            <p className="text-xl font-bold text-white">{stats.challengesCompleted}</p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="w-4 h-4 text-neon-blue" />
              <span className="text-xs text-text-secondary">Battles Won</span>
            </div>
            <p className="text-xl font-bold text-white">{stats.battlesWon}</p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="flex items-center space-x-2 mb-1">
              <Target className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-text-secondary">Win Rate</span>
            </div>
            <p className="text-xl font-bold text-white">{stats.winRate}%</p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-neon-purple" />
              <span className="text-xs text-text-secondary">Achievements</span>
            </div>
            <p className="text-xl font-bold text-white">{stats.achievements.length}</p>
          </div>
        </div>

        {/* Recent Achievements */}
        {stats.achievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-text-secondary">Recent Achievements</h4>
            <div className="flex flex-wrap gap-2">
              {stats.achievements.slice(0, 3).map((achievement) => (
                <Badge 
                  key={achievement.id}
                  variant="secondary"
                  className="bg-neon-blue/20 text-neon-blue border-neon-blue/30"
                >
                  {achievement.title}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}