import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Trophy, 
  Crown, 
  Sword, 
  Shield, 
  Target,
  TrendingUp,
  Zap
} from 'lucide-react'

interface LeaderboardPlayer {
  id: string
  username: string
  rank: 'S' | 'A' | 'B' | 'C' | 'D' | 'E'
  xp: number
  level: number
  challengesCompleted: number
  battleWins: number
}

export function Leaderboard() {
  const topPlayers: LeaderboardPlayer[] = [
    {
      id: '1',
      username: 'ShadowHunter',
      rank: 'S',
      xp: 15420,
      level: 47,
      challengesCompleted: 156,
      battleWins: 89
    },
    {
      id: '2',
      username: 'CodeNinja',
      rank: 'S',
      xp: 14890,
      level: 45,
      challengesCompleted: 142,
      battleWins: 78
    },
    {
      id: '3',
      username: 'PyMaster',
      rank: 'A',
      xp: 12340,
      level: 38,
      challengesCompleted: 128,
      battleWins: 65
    },
    {
      id: '4',
      username: 'AlgoWizard',
      rank: 'A',
      xp: 11750,
      level: 36,
      challengesCompleted: 119,
      battleWins: 58
    },
    {
      id: '5',
      username: 'DataMiner',
      rank: 'A',
      xp: 10980,
      level: 34,
      challengesCompleted: 105,
      battleWins: 52
    },
    {
      id: '6',
      username: 'DevHunter',
      rank: 'B',
      xp: 9850,
      level: 31,
      challengesCompleted: 98,
      battleWins: 45
    },
    {
      id: '7',
      username: 'ScriptKid',
      rank: 'B',
      xp: 8920,
      level: 28,
      challengesCompleted: 87,
      battleWins: 38
    },
    {
      id: '8',
      username: 'BugSlayer',
      rank: 'B',
      xp: 8340,
      level: 26,
      challengesCompleted: 79,
      battleWins: 34
    }
  ]

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
      case 'S': return <Crown className="w-4 h-4" />
      case 'A': return <Sword className="w-4 h-4" />
      case 'B': return <Shield className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />
      case 2: return <Trophy className="w-5 h-5 text-gray-400" />
      case 3: return <Trophy className="w-5 h-5 text-orange-600" />
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-text-secondary">#{position}</span>
    }
  }

  return (
    <Card className="bg-gradient-to-br from-primary to-accent border-gray-800 neon-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-neon-blue" />
            <span className="text-white">Global Leaderboard</span>
          </div>
          <Badge variant="outline" className="text-neon-blue border-neon-blue">
            <TrendingUp className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {topPlayers.map((player, index) => {
          const position = index + 1
          const isTopThree = position <= 3
          
          return (
            <div 
              key={player.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all hover:scale-[1.02] ${
                isTopThree 
                  ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30 glow-effect' 
                  : 'bg-gray-900/50 border-gray-800 hover:border-neon-blue/50'
              }`}
            >
              {/* Position */}
              <div className="flex-shrink-0">
                {getPositionIcon(position)}
              </div>

              {/* Avatar */}
              <Avatar className={`w-10 h-10 border-2 ${isTopThree ? 'border-yellow-500' : 'border-gray-700'}`}>
                <AvatarFallback className="bg-accent text-white font-bold">
                  {player.username[0]}
                </AvatarFallback>
              </Avatar>

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`font-semibold truncate ${isTopThree ? 'text-yellow-400' : 'text-white'}`}>
                    {player.username}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={`${getRankColor(player.rank)} border-current text-xs`}
                  >
                    {getRankIcon(player.rank)}
                    <span className="ml-1">{player.rank}</span>
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <span>Lv.{player.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>{player.xp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3" />
                    <span>{player.battleWins}W</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="text-right">
                <div className={`text-lg font-bold ${isTopThree ? 'text-yellow-400' : 'text-neon-blue'}`}>
                  {player.challengesCompleted}
                </div>
                <div className="text-xs text-text-secondary">challenges</div>
              </div>
            </div>
          )
        })}

        {/* Your Rank */}
        <div className="mt-6 p-3 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center text-sm font-bold">
                #42
              </div>
              <div>
                <p className="font-semibold text-white">Your Rank</p>
                <p className="text-xs text-text-secondary">Keep climbing!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-neon-blue font-bold">2,340 XP</div>
              <div className="text-xs text-text-secondary">to next rank</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}