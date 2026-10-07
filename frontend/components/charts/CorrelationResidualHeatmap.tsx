'use client';

import React, { useState } from 'react';

interface Cell {
  row: string;
  col: string;
  residual: number; // expected - observed
}

const FEATURES = ['age', 'income', 'credit_score', 'debt_to_income'];

const MATRIX: Cell[] = [
  { row: 'age', col: 'age', residual: 0.0 },
  { row: 'age', col: 'income', residual: 0.44 },
  { row: 'age', col: 'credit_score', residual: 0.04 },
  { row: 'age', col: 'debt_to_income', residual: 0.28 },

  { row: 'income', col: 'age', residual: 0.44 },
  { row: 'income', col: 'income', residual: 0.0 },
  { row: 'income', col: 'credit_score', residual: 0.03 },
  { row: 'income', col: 'debt_to_income', residual: 0.15 },

  { row: 'credit_score', col: 'age', residual: 0.04 },
  { row: 'credit_score', col: 'income', residual: 0.03 },
  { row: 'credit_score', col: 'credit_score', residual: 0.0 },
  { row: 'credit_score', col: 'debt_to_income', residual: 0.06 },

  { row: 'debt_to_income', col: 'age', residual: 0.28 },
  { row: 'debt_to_income', col: 'income', residual: 0.15 },
  { row: 'debt_to_income', col: 'credit_score', residual: 0.06 },
  { row: 'debt_to_income', col: 'debt_to_income', residual: 0.0 },
];

export function CorrelationResidualHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);

  const getCellBg = (res: number) => {
    if (res === 0) return '#111821';
    if (res > 0.3) return 'rgba(245, 158, 11, 0.4)';
    if (res > 0.15) return 'rgba(245, 158, 11, 0.2)';
    return 'rgba(56, 189, 248, 0.12)';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-5 gap-1.5 font-mono text-xs max-w-lg w-full">
        {/* Top-left empty cell */}
        <div className="h-10 flex items-center justify-center text-[10px] text-text-muted">
          Δ (Exp-Obs)
        </div>

        {/* Column Headers */}
        {FEATURES.map((col) => (
          <div
            key={col}
            className="h-10 flex items-center justify-center text-[10px] text-text-muted font-medium text-center truncate px-1"
          >
            {col}
          </div>
        ))}

        {/* Matrix Rows */}
        {FEATURES.map((row) => (
          <React.Fragment key={row}>
            {/* Row Header */}
            <div className="h-12 flex items-center justify-end pr-2 text-[10px] text-text-muted font-medium truncate">
              {row}
            </div>

            {/* Matrix Cells */}
            {FEATURES.map((col) => {
              const cell = MATRIX.find((c) => c.row === row && c.col === col)!;
              const isHovered =
                hoveredCell?.row === row && hoveredCell?.col === col;

              return (
                <div
                  key={`${row}-${col}`}
                  onMouseEnter={() => setHoveredCell(cell)}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{ backgroundColor: getCellBg(cell.residual) }}
                  className={`h-12 rounded border border-border-subtle flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isHovered
                      ? 'border-accent-primary scale-105 z-10 shadow-md'
                      : cell.residual > 0.2
                      ? 'border-amber-700/50'
                      : ''
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      cell.residual > 0.3
                        ? 'text-amber-300'
                        : cell.residual > 0.1
                        ? 'text-amber-400/90'
                        : 'text-text-secondary'
                    }`}
                  >
                    {cell.residual.toFixed(2)}
                  </span>
                  {cell.residual > 0.2 && (
                    <span className="text-[8px] text-amber-400/80 uppercase">drift</span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {hoveredCell && (
        <div className="mt-4 p-2.5 rounded bg-canvas-card border border-border-muted text-xs font-mono text-center">
          <span className="text-text-muted">Interaction: </span>
          <span className="text-text-primary font-semibold">
            {hoveredCell.row} × {hoveredCell.col}
          </span>
          <span className="text-text-muted mx-2">|</span>
          <span className="text-text-muted">Residual Drift: </span>
          <span className="text-amber-300 font-semibold">
            +{hoveredCell.residual.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
