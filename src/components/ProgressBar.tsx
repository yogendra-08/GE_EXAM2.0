import type { FC } from 'react';
import { ExamStats } from '../types';

interface ProgressBarProps {
  stats: ExamStats;
}

/**
 * Progress bar component showing exam statistics
 */
const ProgressBar: FC<ProgressBarProps> = ({ stats }) => {
  const progressPercentage = (stats.answered / stats.totalQuestions) * 100;

  return (
    <div className="progress-container">
      <div className="progress-stats">
        <div className="stat-item">
          <div className="stat-label">Total</div>
          <div className="stat-value">{stats.totalQuestions}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Answered</div>
          <div className="stat-value">{stats.answered}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Correct</div>
          <div className="stat-value" style={{ color: '#28a745' }}>
            {stats.correct}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Wrong</div>
          <div className="stat-value" style={{ color: '#dc3545' }}>
            {stats.wrong}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Skipped</div>
          <div className="stat-value" style={{ color: '#ffc107' }}>
            {stats.skipped}
          </div>
        </div>
      </div>
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${Math.round(progressPercentage)}%`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
