import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { CodeEditor } from '../code/CodeEditor';
import { Challenge } from '../../types/game';

interface ChallengeModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (success: boolean, xpGained: number) => void;
}

export function ChallengeModal({ challenge, isOpen, onClose, onComplete }: ChallengeModalProps) {
  if (!challenge) return null;

  const handleComplete = (success: boolean, xpGained: number) => {
    onComplete(success, xpGained);
    setTimeout(() => {
      onClose();
    }, 2000); // Close modal after 2 seconds to show success message
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-background border-accent/30">
        <div className="flex items-center justify-between p-6 border-b border-accent/30">
          <h2 className="text-2xl font-bold text-white">Python Challenge</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <CodeEditor challenge={challenge} onComplete={handleComplete} />
        </div>
      </DialogContent>
    </Dialog>
  );
}