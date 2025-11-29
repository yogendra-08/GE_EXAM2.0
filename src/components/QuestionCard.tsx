import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { Question, UserAnswer } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | null;
  answerSubmitted: boolean;
  userAnswer: UserAnswer | undefined;
  onSelectOption: (index: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  onSkip: () => void;
}

/**
 * Question card component displaying a single question with options
 */
const QuestionCard: FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  answerSubmitted,
  userAnswer,
  onSelectOption,
  onSubmit,
  onNext,
  onSkip,
}) => {
  const firstOptionRef = useRef<HTMLLabelElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (answerSubmitted) return;

      // Number keys 1-4 for option selection
      if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (index < question.options.length) {
          onSelectOption(index);
        }
      }

      // Arrow keys for option selection
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (selectedOption === null) {
          onSelectOption(0);
        } else {
          const newIndex =
            e.key === 'ArrowDown'
              ? Math.min(selectedOption + 1, question.options.length - 1)
              : Math.max(selectedOption - 1, 0);
          onSelectOption(newIndex);
        }
      }

      // Enter key to submit
      if (e.key === 'Enter' && selectedOption !== null && !answerSubmitted) {
        onSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, answerSubmitted, question.options.length, onSelectOption, onSubmit]);

  const renderFeedback = () => {
    if (!answerSubmitted || !userAnswer) return null;

    const isCorrect = userAnswer.isCorrect;
    const correctOption = question.options[question.answerIndex];

    return (
      <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`} role="alert">
        <div>{isCorrect ? '✓ Correct!' : '✗ Wrong'}</div>
        {!isCorrect && (
          <div className="correct-answer">
            Correct answer: {correctOption}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="question-card" id="main-content">
      <div className="question-header">
        <div className="question-number">
          Question {questionNumber} of {totalQuestions}
        </div>
        <h2 className="question-text">{question.question}</h2>
      </div>

      <div className="options-container" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, index) => (
          <label
            key={index}
            ref={index === 0 ? firstOptionRef : null}
            className={`option ${selectedOption === index ? 'selected' : ''} ${
              answerSubmitted ? 'disabled' : ''
            }`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!answerSubmitted) {
                  onSelectOption(index);
                }
              }
            }}
          >
            <input
              type="radio"
              name="option"
              value={index}
              checked={selectedOption === index}
              onChange={() => onSelectOption(index)}
              disabled={answerSubmitted}
              aria-label={`Option ${index + 1}: ${option}`}
            />
            <span className="option-text">
              {String.fromCharCode(65 + index)}. {option}
            </span>
          </label>
        ))}
      </div>

      {renderFeedback()}

      <div className="action-buttons">
        {!answerSubmitted ? (
          <>
            <button
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={selectedOption === null}
              aria-label="Submit answer"
            >
              Submit Answer
            </button>
            <button
              className="btn btn-secondary"
              onClick={onSkip}
              aria-label="Skip question"
            >
              Skip
            </button>
          </>
        ) : (
          <button
            className="btn btn-success"
            onClick={onNext}
            aria-label="Next question"
          >
            {questionNumber < totalQuestions ? 'Next Question' : 'Finish Exam'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
