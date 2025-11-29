/**
 * Core TypeScript types for the MCQ Exam Application
 */

export interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number; // zero-based index of correct option
}

export type QuestionStatus = 'unanswered' | 'correct' | 'wrong' | 'skipped';

export interface UserAnswer {
  questionId: number;
  selectedIndex: number | null;
  isCorrect: boolean | null;
  status: QuestionStatus;
}

export interface AppState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Map<number, UserAnswer>;
  showIntroModal: boolean;
  showQuitModal: boolean;
  examCompleted: boolean;
  selectedOption: number | null;
  answerSubmitted: boolean;
}

export interface ExamStats {
  totalQuestions: number;
  answered: number;
  correct: number;
  wrong: number;
  skipped: number;
  percentageCorrect: number;
}
