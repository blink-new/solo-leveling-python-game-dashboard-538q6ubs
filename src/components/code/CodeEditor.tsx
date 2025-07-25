import React, { useState } from 'react';
import { Play, Check, X, Trophy } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface CodeEditorProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    starterCode: string;
    expectedOutput: string;
    testCases: Array<{ input: string; output: string }>;
  };
  onComplete: (success: boolean, xpGained: number) => void;
}

const getDifficultyXP = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 50;
    case 'Intermediate': return 100;
    case 'Advanced': return 200;
    case 'Expert': return 500;
    default: return 50;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'text-green-400';
    case 'Intermediate': return 'text-yellow-400';
    case 'Advanced': return 'text-orange-400';
    case 'Expert': return 'text-red-400';
    default: return 'text-gray-400';
  }
};

export function CodeEditor({ challenge, onComplete }: CodeEditorProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; message: string }>>([]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate code execution
    setTimeout(() => {
      const results = challenge.testCases.map((testCase, index) => {
        // Simple simulation - in real app, this would execute Python code
        const passed = Math.random() > 0.3; // 70% pass rate for demo
        return {
          passed,
          message: passed 
            ? `Test ${index + 1}: ✅ Passed`
            : `Test ${index + 1}: ❌ Failed - Expected: ${testCase.output}`
        };
      });
      
      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      
      if (allPassed) {
        const xpGained = getDifficultyXP(challenge.difficulty);
        setOutput(`🎉 All tests passed! You gained ${xpGained} XP!`);
        onComplete(true, xpGained);
      } else {
        setOutput('❌ Some tests failed. Keep trying, Hunter!');
      }
      
      setIsRunning(false);
    }, 2000);
  };



  return (
    <div className="space-y-6">
      {/* Challenge Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 rounded-lg border border-accent/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{challenge.title}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)} bg-gray-800/50`}>
            {challenge.difficulty}
          </span>
        </div>
        <p className="text-gray-300 leading-relaxed">{challenge.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <Card className="bg-gray-900/50 border-accent/30">
          <div className="p-4 border-b border-accent/30">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Code Editor</h3>
              <Button 
                onClick={runCode} 
                disabled={isRunning}
                className="bg-accent hover:bg-accent/80 text-white"
              >
                {isRunning ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
            </div>
          </div>
          <div className="p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-gray-800 text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-accent focus:outline-none resize-none"
              placeholder="Write your Python code here..."
              spellCheck={false}
            />
          </div>
        </Card>

        {/* Output & Test Results */}
        <Card className="bg-gray-900/50 border-accent/30">
          <div className="p-4 border-b border-accent/30">
            <h3 className="text-lg font-semibold text-white">Output & Tests</h3>
          </div>
          <div className="p-4 space-y-4">
            {/* Output */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Output:</h4>
              <div className="bg-gray-800 p-3 rounded-lg min-h-[100px] font-mono text-sm">
                {output ? (
                  <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
                ) : (
                  <span className="text-gray-500">Run your code to see output...</span>
                )}
              </div>
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Test Results:</h4>
                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        result.passed ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {result.passed ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      <span className="text-sm font-mono">{result.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Expected Output */}
      <Card className="bg-gray-900/50 border-accent/30">
        <div className="p-4 border-b border-accent/30">
          <h3 className="text-lg font-semibold text-white">Expected Output</h3>
        </div>
        <div className="p-4">
          <pre className="bg-gray-800 p-3 rounded-lg text-green-400 font-mono text-sm whitespace-pre-wrap">
            {challenge.expectedOutput}
          </pre>
        </div>
      </Card>
    </div>
  );
}