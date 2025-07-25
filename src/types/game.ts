export interface Player {
  id: string
  username: string
  email: string
  level: number
  xp: number
  rank: PlayerRank
  totalChallengesCompleted: number
  battleWins: number
  battleLosses: number
  createdAt: string
  lastActive: string
}

export type PlayerRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S'

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  xpReward: number
  category: 'Basics' | 'Data Structures' | 'Algorithms' | 'Web Development' | 'Machine Learning'
  code: string
  testCases: TestCase[]
  completedBy: string[]
  createdAt: string
}

export interface TestCase {
  input: string
  expectedOutput: string
  description: string
}

export interface Battle {
  id: string
  title: string
  description: string
  participants: string[]
  maxParticipants: number
  status: 'waiting' | 'active' | 'completed'
  challenge: Challenge
  startTime: string
  endTime?: string
  winner?: string
  leaderboard: BattleParticipant[]
}

export interface BattleParticipant {
  playerId: string
  username: string
  score: number
  completionTime?: number
  rank: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  xpReward: number
  unlockedBy: string[]
  requirement: string
}

export interface PlayerStats {
  totalXP: number
  currentLevel: number
  xpToNextLevel: number
  rank: PlayerRank
  challengesCompleted: number
  battlesWon: number
  battlesLost: number
  winRate: number
  achievements: Achievement[]
}