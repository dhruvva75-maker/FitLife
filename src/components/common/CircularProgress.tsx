import React from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  bgColor?: string;
  label?: string;
  valueText?: string;
  subText?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
  strokeColor = '#10b981', // emerald-500
  bgColor = 'rgba(148, 163, 184, 0.15)',
  valueText,
  subText,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Progress Value Stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Center Label / Value */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1">
        {valueText ? (
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {valueText}
          </span>
        ) : (
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {Math.round(clampedPercentage)}%
          </span>
        )}
        {subText && (
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate max-w-[80px]">
            {subText}
          </span>
        )}
      </div>
    </div>
  );
};
