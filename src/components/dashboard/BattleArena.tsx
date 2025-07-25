import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Swords, 
  Users, 
  Clock, 
  Zap, 
  Play,
  Eye,
  Trophy
} from 'lucide-react'
import type { Battle } from '@/types/game'

export function BattleArena() {
  const [activeBattles] = useState<Battle[]>([
    {
      id: '1',
      title: 'Python Algorithms Showdown',
      description: 'Solve sorting and searching challenges faster than your opponents',
      participants: ['player1', 'player2'],
      maxParticipants: 4,
      status: 'waiting',
      challenge: {
        id: 'c1',
        title: 'Quick Sort Implementation',
        description: 'Implement quicksort algorithm',
        difficulty: 'Intermediate',
        xpReward: 150,
        category: 'Algorithms',
        code: '',
        testCases: [],
        completedBy: [],
        createdAt: new Date().toISOString()
      },
      startTime: new Date(Date.now() + 300000).toISOString(), // 5 minutes from now
      leaderboard: []
    },
    {
      id: '2',
      title: 'Data Structure Battle',
      description: 'Master linked lists, trees, and graphs in this intense competition',
      participants: ['player1', 'player2', 'player3', 'player4'],
      maxParticipants: 4,
      status: 'active',
      challenge: {
        id: 'c2',
        title: 'Binary Tree Traversal',
        description: 'Implement tree traversal methods',
        difficulty: 'Advanced',
        xpReward: 200,
        category: 'Data Structures',
        code: '',
        testCases: [],
        completedBy: [],
        createdAt: new Date().toISOString()
      },
      startTime: new Date(Date.now() - 600000).toISOString(), // Started 10 minutes ago
      leaderboard: [
        { playerId: '1', username: 'CodeNinja', score: 85, rank: 1 },
        { playerId: '2', username: 'PyMaster', score: 72, rank: 2 },
        { playerId: '3', username: 'AlgoWiz', score: 68, rank: 3 },
        { playerId: '4', username: 'DevHunter', score: 45, rank: 4 }
      ]
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'active': return 'bg-neon-green/20 text-neon-green border-neon-green/30'
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-neon-green'
      case 'Intermediate': return 'text-yellow-400'
      case 'Advanced': return 'text-orange-400'
      case 'Expert': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <Card className="bg-gradient-to-br from-primary to-accent border-gray-800 neon-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Swords className="w-5 h-5 text-neon-blue" />
          <span className="text-white">Battle Arena</span>
          <Badge variant="outline" className="ml-auto text-neon-blue border-neon-blue">
            {activeBattles.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {activeBattles.map((battle) => (
          <div 
            key={battle.id}
            className="bg-gray-900/50 rounded-lg p-4 border border-gray-800 hover:border-neon-blue/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">{battle.title}</h3>
                <p className="text-sm text-text-secondary mb-2">{battle.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{battle.participants.length}/{battle.maxParticipants}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span className={getDifficultyColor(battle.challenge.difficulty)}>
                      {battle.challenge.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3" />
                    <span>{battle.challenge.xpReward} XP</span>
                  </div>
                </div>
              </div>
              
              <Badge variant="outline" className={getStatusColor(battle.status)}>
                {battle.status.toUpperCase()}
              </Badge>
            </div>

            {/* Battle Status */}
            {battle.status === 'waiting' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span>Starts in 5 minutes</span>
                </div>
                <Button size="sm" className="bg-neon-blue hover:bg-neon-blue/80 text-white">
                  <Play className="w-4 h-4 mr-1" />
                  Join Battle
                </Button>
              </div>
            )}

            {battle.status === 'active' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-neon-green">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                    <span>Battle in progress</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-neon-blue text-neon-blue">
                    <Eye className="w-4 h-4 mr-1" />
                    Spectate
                  </Button>
                </div>

                {/* Live Leaderboard */}
                <div className="bg-gray-800/50 rounded p-3">
                  <h4 className="text-xs font-medium text-text-secondary mb-2">Live Leaderboard</h4>
                  <div className="space-y-1">
                    {battle.leaderboard.slice(0, 3).map((participant, index) => (
                      <div key={participant.playerId} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-500 text-black' :
                            index === 1 ? 'bg-gray-400 text-black' :
                            'bg-orange-600 text-white'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="text-white">{participant.username}</span>
                        </div>
                        <span className="text-neon-blue font-medium">{participant.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <Button 
          className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80 text-white font-medium"
        >
          <Swords className="w-4 h-4 mr-2" />
          Create New Battle
        </Button>
      </CardContent>
    </Card>
  )
}