import React from 'react';
import { Check } from 'lucide-react';

export interface Step {
  id: number;
  label: string;
  sublabel?: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number; // 1-based index
  onStepClick?: (stepId: number) => void;
  className?: string;
}

export function StepIndicator({
  steps,
  currentStep,
  onStepClick,
  className = '',
}: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className={`w-full ${className}`}>
      <ol className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <li
              key={step.id}
              className={`flex-1 flex items-center ${index !== steps.length - 1 ? 'pr-2' : ''}`}
            >
              <div
                onClick={() => onStepClick && isCompleted && onStepClick(step.id)}
                className={`group flex items-center gap-3 w-full p-2 rounded transition-colors ${
                  isCompleted && onStepClick ? 'cursor-pointer hover:bg-canvas-card' : ''
                }`}
              >
                {/* Step Number or Check */}
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono transition-colors shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                      : isCurrent
                      ? 'bg-accent-primary text-canvas-base font-semibold'
                      : 'bg-canvas-card text-text-muted border border-border-subtle'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : `0${step.id}`}
                </div>

                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-xs font-medium truncate ${
                      isCurrent
                        ? 'text-text-primary'
                        : isCompleted
                        ? 'text-text-secondary'
                        : 'text-text-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                  {step.sublabel && (
                    <span className="text-[10px] text-text-muted truncate">
                      {step.sublabel}
                    </span>
                  )}
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={`hidden md:block flex-1 h-px ml-3 ${
                      isCompleted ? 'bg-border-muted' : 'bg-border-subtle'
                    }`}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
