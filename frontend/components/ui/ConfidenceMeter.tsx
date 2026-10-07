import React from 'react';

export interface ConfidenceMeterProps {
  score: number; // 0.0 - 1.0
  confidenceInterval?: [number, number];
  className?: string;
}

export function ConfidenceMeter({
  score,
  confidenceInterval,
  className = '',
}: ConfidenceMeterProps) {
  // Bound score between 0 and 1
  const clamped = Math.max(0, Math.min(1, score));
  const percent = Math.round(clamped * 100);

  const getStrengthLabel = (val: number) => {
    if (val >= 0.85) return 'High Confidence';
    if (val >= 0.7) return 'Moderate-High Confidence';
    if (val >= 0.5) return 'Moderate Confidence';
    return 'Low Confidence';
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
          Confidence Metric
        </span>
        <div className="flex items-center gap-2">
          {confidenceInterval && (
            <span className="text-[11px] font-mono text-text-muted">
              CI [{confidenceInterval[0].toFixed(2)} - {confidenceInterval[1].toFixed(2)}]
            </span>
          )}
          <span className="text-sm font-mono font-semibold text-text-primary">
            {clamped.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Meter Bar */}
      <div className="relative w-full h-1.5 bg-canvas-card rounded-full overflow-hidden border border-border-subtle">
        <div
          className="h-full bg-accent-primary rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
        {/* Confidence Interval Band */}
        {confidenceInterval && (
          <div
            className="absolute top-0 bottom-0 bg-accent-primary/30 border-l border-r border-accent-primary"
            style={{
              left: `${confidenceInterval[0] * 100}%`,
              width: `${(confidenceInterval[1] - confidenceInterval[0]) * 100}%`,
            }}
          />
        )}
      </div>

      <div className="flex items-center justify-between text-[10px] text-text-muted">
        <span>0.00 (Uncertain)</span>
        <span className="text-text-secondary font-medium">{getStrengthLabel(clamped)}</span>
        <span>1.00 (Determined)</span>
      </div>
    </div>
  );
}
