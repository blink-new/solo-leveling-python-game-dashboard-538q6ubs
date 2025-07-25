import React, { useState } from 'react';
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
import { ChallengeModal } from '../modals/ChallengeModal'

export function ChallengeGrid() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerXP, setPlayerXP] = useState(1250); // Mock player XP

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Python Basics: Variables & Data Types',
      description: 'Master the fundamentals of Python variables, strings, numbers, and basic operations.',
      difficulty: 'Beginner',
      xpReward: 50,
      category: 'Basics',
      starterCode: '# Welcome to Python Basics!\n# Create variables and perform basic operations\n\n# TODO: Create a variable name with your name\n# TODO: Create a variable age with your age\n# TODO: Create a greeting message\n\nname = ""\nage = 0\ngreeting = ""\n\nprint(greeting)',
      expectedOutput: 'Hello, my name is John and I am 25 years old.',
      testCases: [
        { input: '', output: 'Hello, my name is John and I am 25 years old.' },
        { input: '', output: 'Variables created successfully' }
      ],
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
      starterCode: '# List Comprehensions Challenge\n# Create efficient one-liner solutions\n\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# TODO: Create a list of squares of even numbers\nsquares_of_evens = []\n\n# TODO: Create a list of numbers divisible by 3\ndivisible_by_three = []\n\nprint("Squares of evens:", squares_of_evens)\nprint("Divisible by 3:", divisible_by_three)',
      expectedOutput: 'Squares of evens: [4, 16, 36, 64, 100]\nDivisible by 3: [3, 6, 9]',
      testCases: [
        { input: '', output: 'Squares of evens: [4, 16, 36, 64, 100]' },
        { input: '', output: 'Divisible by 3: [3, 6, 9]' }
      ],
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
      starterCode: '# Binary Search Algorithm\n# Implement efficient search in sorted array\n\ndef binary_search(arr, target):\n    # Implement binary search logic\n    # Returns index of target if found, -1 otherwise\n    left = 0\n    right = len(arr) - 1\n    \n    # Your code here\n    \n    return -1\n\n# Test the function\nsorted_array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]\ntarget = 7\nresult = binary_search(sorted_array, target)\nprint(f"Target {target} found at index: {result}")',
      expectedOutput: 'Target 7 found at index: 3',
      testCases: [
        { input: '', output: 'Target 7 found at index: 3' },
        { input: '', output: 'Binary search working correctly' }
      ],
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
      starterCode: '# Web Scraping Challenge\n# Extract data from HTML using BeautifulSoup\n\nfrom bs4 import BeautifulSoup\n\n# Sample HTML content\nhtml_content = "<html><body><div class=\\"product\\"><h2>Laptop</h2><p class=\\"price\\">$999</p></div></body></html>"\n\n# TODO: Parse HTML and extract product names and prices\nsoup = BeautifulSoup(html_content, "html.parser")\n\n# Your code here\nproducts = []\n\nfor product in products:\n    print(f"Product: {product[\'name\']}, Price: {product[\'price\']}")',
      expectedOutput: 'Product: Laptop, Price: $999\nProduct: Phone, Price: $599',
      testCases: [
        { input: '', output: 'Product: Laptop, Price: $999' },
        { input: '', output: 'Product: Phone, Price: $599' }
      ],
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
      starterCode: '# Neural Network from Scratch\n# Build a simple neural network using NumPy\n\nimport numpy as np\n\nclass SimpleNeuralNetwork:\n    def __init__(self, input_size, hidden_size, output_size):\n        # TODO: Initialize weights and biases\n        self.W1 = np.random.randn(input_size, hidden_size) * 0.1\n        self.b1 = np.zeros((1, hidden_size))\n        self.W2 = np.random.randn(hidden_size, output_size) * 0.1\n        self.b2 = np.zeros((1, output_size))\n    \n    def sigmoid(self, x):\n        return 1 / (1 + np.exp(-x))\n    \n    def forward(self, X):\n        # TODO: Implement forward propagation\n        # Your code here\n        pass\n\n# Test the network\nnn = SimpleNeuralNetwork(2, 4, 1)\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])\noutput = nn.forward(X)\nprint("Neural network output:", output)',
      expectedOutput: 'Neural network output: [[0.5], [0.6], [0.4], [0.7]]',
      testCases: [
        { input: '', output: 'Neural network created successfully' },
        { input: '', output: 'Forward propagation working' }
      ],
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
      starterCode: '# Fibonacci Sequence Challenge\n# Implement both recursive and optimized versions\n\ndef fibonacci_recursive(n):\n    # Calculate nth Fibonacci number using recursion\n    if n <= 1:\n        return n\n    # Your code here\n    \ndef fibonacci_optimized(n, memo={}):\n    # Calculate nth Fibonacci number with memoization\n    # Your code here\n    pass\n\n# Test both functions\nn = 10\nrecursive_result = fibonacci_recursive(n)\noptimized_result = fibonacci_optimized(n)\n\nprint(f"Fibonacci({n}) recursive: {recursive_result}")\nprint(f"Fibonacci({n}) optimized: {optimized_result}")',
      expectedOutput: 'Fibonacci(10) recursive: 55\nFibonacci(10) optimized: 55',
      testCases: [
        { input: '', output: 'Fibonacci(10) recursive: 55' },
        { input: '', output: 'Fibonacci(10) optimized: 55' }
      ],
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

  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };

  const handleChallengeComplete = (success: boolean, xpGained: number) => {
    if (success) {
      setPlayerXP(prev => prev + xpGained);
      // In real app, update user's completed challenges
    }
  };

  return (
    <>
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
                  className={`bg-gray-900/50 rounded-lg p-4 border transition-all hover:scale-105 cursor-pointer ${
                    completed 
                      ? 'border-neon-green/50 bg-neon-green/5' 
                      : 'border-gray-800 hover:border-neon-blue/50'
                  }`}
                  onClick={() => handleChallengeClick(challenge)}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChallengeClick(challenge);
                    }}
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

      <ChallengeModal
        challenge={selectedChallenge}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleChallengeComplete}
      />
    </>
  )
}