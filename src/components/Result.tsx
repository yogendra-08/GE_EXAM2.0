import type { FC, CSSProperties } from 'react';
import { ExamStats } from '../types';

interface ResultProps {
  stats: ExamStats;
  onRestart: () => void;
}

/**
 * Result screen showing final exam statistics
 */
const Result: FC<ResultProps> = ({ stats, onRestart }) => {
  return (
    <div className="result-screen">
      <h2>Exam Completed!</h2>

      <div
        className="percentage-circle"
        style={{ '--percentage': `${stats.percentageCorrect}%` } as CSSProperties}
      >
        <div className="percentage-inner">
          <div className="percentage-value">{Math.round(stats.percentageCorrect)}%</div>
          <div className="percentage-label">Score</div>
        </div>
      </div>

      <div className="result-stats">
        <div className="result-stat">
          <div className="result-stat-label">Total Questions</div>
          <div className="result-stat-value">{stats.totalQuestions}</div>
        </div>
        <div className="result-stat">
          <div className="result-stat-label">Correct</div>
          <div className="result-stat-value correct">{stats.correct}</div>
        </div>
        <div className="result-stat">
          <div className="result-stat-label">Wrong</div>
          <div className="result-stat-value wrong">{stats.wrong}</div>
        </div>
        <div className="result-stat">
          <div className="result-stat-label">Skipped</div>
          <div className="result-stat-value">{stats.skipped}</div>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={onRestart}
        aria-label="Restart exam"
      >
        Restart Exam
      </button>
    </div>
  );
};

export default Result;
