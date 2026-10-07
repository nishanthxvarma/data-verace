import React from 'react';
import { Search, X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, error, className = '', ...props }, ref) => {
    return (
      <div className="relative flex flex-col gap-1 w-full">
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-2.5 text-text-muted pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-canvas-card border border-border-subtle rounded text-xs text-text-primary placeholder:text-text-muted/60 px-3 py-2 transition-colors focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary disabled:opacity-50 disabled:cursor-not-allowed ${
              leftIcon ? 'pl-8' : ''
            } ${rightIcon ? 'pr-8' : ''} ${
              error ? 'border-semantic-critical focus:border-semantic-critical' : ''
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-2.5 text-text-muted flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-[11px] text-semantic-critical">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  onClear,
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-canvas-card border border-border-subtle rounded text-xs text-text-primary placeholder:text-text-muted/60 pl-8 pr-16 py-1.5 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
      />
      <div className="absolute right-2 flex items-center gap-1">
        {value && onClear && (
          <button
            onClick={onClear}
            className="text-text-muted hover:text-text-primary p-0.5 rounded cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        )}
        <kbd className="hidden sm:inline-block px-1 py-0.5 text-[10px] font-mono text-text-muted bg-canvas-panel border border-border-subtle rounded">
          /
        </kbd>
      </div>
    </div>
  );
}
