'use client';

import { FormStep } from '@/types/resume';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: FormStep;
  onStepClick: (step: FormStep) => void;
}

const steps: { key: FormStep; label: string; number: number }[] = [
  { key: 'personal', label: 'Personal', number: 1 },
  { key: 'education', label: 'Education', number: 2 },
  { key: 'experience', label: 'Experience', number: 3 },
  { key: 'skills', label: 'Skills', number: 4 },
  { key: 'preview', label: 'Preview', number: 5 },
];

export function ProgressIndicator({ currentStep, onStepClick }: ProgressIndicatorProps) {
  const currentStepNumber = steps.find(step => step.key === currentStep)?.number || 1;

  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => {
        const isActive = step.key === currentStep;
        const isCompleted = step.number < currentStepNumber;
        const isClickable = step.number <= currentStepNumber;

        return (
          <div key={step.key} className="flex items-center">
            <button
              onClick={() => isClickable && onStepClick(step.key)}
              disabled={!isClickable}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all duration-300 transform",
                isActive && "bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110 shadow-lg",
                isCompleted && !isActive && "bg-green-500 text-white hover:bg-green-600",
                !isActive && !isCompleted && "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
                isClickable && "cursor-pointer hover:scale-105",
                !isClickable && "cursor-not-allowed opacity-50"
              )}
            >
              {isCompleted && !isActive ? '✓' : step.number}
            </button>
            <span className={cn(
              "ml-2 text-sm font-medium transition-colors duration-300",
              isActive && "text-blue-600 dark:text-blue-400",
              isCompleted && !isActive && "text-green-600 dark:text-green-400",
              !isActive && !isCompleted && "text-gray-500 dark:text-gray-400"
            )}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-16 h-0.5 mx-4 transition-colors duration-300",
                step.number < currentStepNumber ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}