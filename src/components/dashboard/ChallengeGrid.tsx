import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Code, 
  Zap, 
  Clock, 
  CheckCircle, 
  Play,
  Star,
  Users
} from 'lucide-react'
import type { Challenge } from '@/types/game'

export function ChallengeGrid() {
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Python Basics: Variables & Data Types',
      description: 'Master the fundamentals of Python variables, strings, numbers, and basic operations.',
      difficulty: 'Beginner',
      xpReward: 50,
      category: 'Basics',
      code: '',
      testCases: [],
      completedBy: ['user1', 'user2', 'user3'],
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'List Comprehensions Challenge',
      description: 'Create elegant one-liner solutions using Python list comprehensions.',
      difficulty: 'Intermediate',
      xpReward: 100,
      category: 'Data Structures',
      code: '',
      testCases: [],
      completedBy: ['user1', 'user2'],
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Binary Search Implementation',
      description: 'Implement an efficient binary search algorithm from scratch.',
      difficulty: 'Advanced',
      xpReward: 150,
      category: 'Algorithms',
      code: '',
      testCases: [],
      completedBy: ['user1'],
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Web Scraping with BeautifulSoup',
      description: 'Build a web scraper to extract data from websites using Python.',
      difficulty: 'Expert',
      xpReward: 200,
      category: 'Web Development',
      code: '',
      testCases: [],
      completedBy: [],
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Neural Network Basics',
      description: 'Create a simple neural network using NumPy for classification.',
      difficulty: 'Expert',
      xpReward: 250,
      category: 'Machine Learning',
      code: '',
      testCases: [],
      completedBy: [],
      createdAt: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Recursive Fibonacci',
      description: 'Solve the Fibonacci sequence using recursion and optimization.',
      difficulty: 'Intermediate',
      xpReward: 75,
      category: 'Algorithms',
      code: '',
      testCases: [],
      completedBy: ['user1', 'user2', 'user3', 'user4'],
      createdAt: new Date().toISOString()
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-neon-green/20 text-neon-green border-neon-green/30'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Advanced': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Basics': return <Star className="w-4 h-4" />
      case 'Data Structures': return <Code className="w-4 h-4" />
      case 'Algorithms': return <Zap className="w-4 h-4" />
      case 'Web Development': return <Code className="w-4 h-4" />
      case 'Machine Learning': return <Star className="w-4 h-4" />
      default: return <Code className="w-4 h-4" />
    }
  }

  const isCompleted = (challenge: Challenge) => {
    // Mock completion check - in real app, check against user's completed challenges
    return challenge.completedBy.length > 0 && Math.random() > 0.7
  }

  return (
    <Card className="bg-gradient-to-br from-primary to-accent border-gray-800 neon-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-neon-blue" />
            <span className="text-white">Python Challenges</span>
          </div>
          <Badge variant="outline" className="text-neon-blue border-neon-blue">
            {challenges.length} Available
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((challenge) => {
            const completed = isCompleted(challenge)
            
            return (
              <div 
                key={challenge.id}
                className={`bg-gray-900/50 rounded-lg p-4 border transition-all hover:scale-105 ${
                  completed 
                    ? 'border-neon-green/50 bg-neon-green/5' 
                    : 'border-gray-800 hover:border-neon-blue/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(challenge.category)}
                    <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  
                  {completed && (
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                  )}
                </div>

                <h3 className="font-semibold text-white mb-2 line-clamp-2">
                  {challenge.title}
                </h3>
                
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {challenge.description}
                </p>

                <div className="flex items-center justify-between mb-3 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>{challenge.xpReward} XP</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{challenge.completedBy.length} completed</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>~30 min</span>
                  </div>
                </div>

                {/* Progress bar for partially completed challenges */}
                {!completed && Math.random() > 0.5 && (
                  <div className="mb-3">
                    <Progress value={Math.floor(Math.random() * 60) + 20} className="h-2 bg-gray-800" />
                    <p className="text-xs text-text-secondary mt-1">In progress</p>
                  </div>
                )}

                <Button 
                  size="sm" 
                  className={`w-full ${
                    completed 
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green/30' 
                      : 'bg-neon-blue hover:bg-neon-blue/80 text-white'
                  }`}
                  variant={completed ? 'outline' : 'default'}
                >
                  {completed ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Review Solution
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" />
                      Start Challenge
                    </>
                  )}
                </Button>
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
          >
            Load More Challenges
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}