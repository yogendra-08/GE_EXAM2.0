import { useState, useEffect } from 'react';
import './App.css';
import { Question, UserAnswer, ExamStats, QuestionStatus } from './types';
import ModalIntro from './components/ModalIntro';
import ConfirmQuit from './components/ConfirmQuit';
import ProgressBar from './components/ProgressBar';
import StatusTracker from './components/StatusTracker';
import QuestionCard from './components/QuestionCard';
import Result from './components/Result';

/**
 * Main App Component
 */
function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Map<number, UserAnswer>>(new Map());
  const [showIntroModal, setShowIntroModal] = useState<boolean>(true);
  const [showQuitModal, setShowQuitModal] = useState<boolean>(false);
  const [examCompleted, setExamCompleted] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load questions from JSON file
  useEffect(() => {
    fetch('/questions.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load questions');
        }
        return response.json();
      })
      .then((data: Question[]) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading questions:', err);
        setError('Failed to load questions. Please ensure questions.json exists.');
        setLoading(false);
      });
  }, []);

  // Calculate exam statistics
  const calculateStats = (): ExamStats => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    userAnswers.forEach((answer) => {
      if (answer.status === 'correct') correct++;
      else if (answer.status === 'wrong') wrong++;
      else if (answer.status === 'skipped') skipped++;
    });

    const answered = correct + wrong;
    const percentageCorrect = answered > 0 ? (correct / answered) * 100 : 0;

    return {
      totalQuestions: questions.length,
      answered,
      correct,
      wrong,
      skipped,
      percentageCorrect,
    };
  };

  // Handle intro modal continue
  const handleContinue = () => {
    setShowIntroModal(false);
  };

  // Handle option selection
  const handleSelectOption = (index: number) => {
    if (!answerSubmitted) {
      setSelectedOption(index);
    }
  };

  // Handle answer submission
  const handleSubmit = () => {
    if (selectedOption === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answerIndex;
    const status: QuestionStatus = isCorrect ? 'correct' : 'wrong';

    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedIndex: selectedOption,
      isCorrect,
      status,
    };

    setUserAnswers(new Map(userAnswers.set(currentQuestion.id, answer)));
    setAnswerSubmitted(true);
  };

  // Handle skip question
  const handleSkip = () => {
    const currentQuestion = questions[currentQuestionIndex];

    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedIndex: null,
      isCorrect: null,
      status: 'skipped',
    };

    setUserAnswers(new Map(userAnswers.set(currentQuestion.id, answer)));
    moveToNextQuestion();
  };

  // Move to next question
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswerSubmitted(false);
    } else {
      setExamCompleted(true);
    }
  };

  // Handle next button
  const handleNext = () => {
    moveToNextQuestion();
  };

  // Handle question navigation from status tracker
  const handleNavigate = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(null);
    setAnswerSubmitted(false);
  };

  // Handle quit button
  const handleQuit = () => {
    setShowQuitModal(true);
  };

  // Handle quit confirmation
  const handleConfirmQuit = () => {
    setShowQuitModal(false);
    setExamCompleted(true);
  };

  // Handle quit cancellation
  const handleCancelQuit = () => {
    setShowQuitModal(false);
  };

  // Handle restart exam
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Map());
    setSelectedOption(null);
    setAnswerSubmitted(false);
    setExamCompleted(false);
    setShowIntroModal(true);
  };

  // Loading state
  if (loading) {
    return (
      <div className="app">
        <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
          <h2>Loading questions...</h2>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="app">
        <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // No questions loaded
  if (questions.length === 0) {
    return (
      <div className="app">
        <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
          <h2>No questions available</h2>
        </div>
      </div>
    );
  }

  const stats = calculateStats();
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers.get(currentQuestion.id);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {showIntroModal && <ModalIntro onContinue={handleContinue} />}
      {showQuitModal && (
        <ConfirmQuit onConfirm={handleConfirmQuit} onCancel={handleCancelQuit} />
      )}

      {!showIntroModal && !examCompleted && (
        <>
          <header className="exam-header">
            <h1 className="exam-title">MCQ Exam</h1>
            <button
              className="quit-btn"
              onClick={handleQuit}
              aria-label="Quit exam"
            >
              Quit
            </button>
          </header>

          <ProgressBar stats={stats} />

          <StatusTracker
            questions={questions}
            userAnswers={userAnswers}
            currentQuestionIndex={currentQuestionIndex}
            onNavigate={handleNavigate}
          />

          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedOption={selectedOption}
            answerSubmitted={answerSubmitted}
            userAnswer={currentAnswer}
            onSelectOption={handleSelectOption}
            onSubmit={handleSubmit}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        </>
      )}

      {examCompleted && <Result stats={stats} onRestart={handleRestart} />}
    </div>
  );
}

export default App;
