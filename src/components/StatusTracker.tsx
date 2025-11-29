import type { FC } from 'react';
import { Question, UserAnswer } from '../types';

interface StatusTrackerProps {
  questions: Question[];
  userAnswers: Map<number, UserAnswer>;
  currentQuestionIndex: number;
  onNavigate: (index: number) => void;
}

/**
 * Question status tracker grid component
 */
const StatusTracker: FC<StatusTrackerProps> = ({
  questions,
  userAnswers,
  currentQuestionIndex,
  onNavigate,
}) => {
  const getStatusClass = (questionId: number, index: number): string => {
    const answer = userAnswers.get(questionId);
    const classes = ['status-box'];

    if (index === currentQuestionIndex) {
      classes.push('current');
    }

    if (answer) {
      classes.push(answer.status);
    } else {
      classes.push('unanswered');
    }

    return classes.join(' ');
  };

  return (
    <div className="status-tracker">
      <h3>Question Navigator</h3>
      <div className="status-grid" role="navigation" aria-label="Question navigation grid">
        {questions.map((question, index) => (
          <button
            key={question.id}
            className={getStatusClass(question.id, index)}
            onClick={() => onNavigate(index)}
            aria-label={`Go to question ${index + 1}`}
            aria-current={index === currentQuestionIndex ? 'true' : 'false'}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="status-legend">
        <div className="legend-item">
          <div className="legend-box" style={{ background: '#28a745', borderColor: '#28a745' }} />
          <span>Correct</span>
        </div>
        <div className="legend-item">
          <div className="legend-box" style={{ background: '#dc3545', borderColor: '#dc3545' }} />
          <span>Wrong</span>
        </div>
        <div className="legend-item">
          <div className="legend-box" style={{ background: '#ffc107', borderColor: '#ffc107' }} />
          <span>Skipped</span>
        </div>
        <div className="legend-item">
          <div className="legend-box" style={{ background: '#f8f9fa' }} />
          <span>Unanswered</span>
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;
