import type { FC } from 'react';

interface ModalIntroProps {
  onContinue: () => void;
}

/**
 * Introduction modal shown at the start of the exam
 */
const ModalIntro: FC<ModalIntroProps> = ({ onContinue }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="intro-title" aria-modal="true">
      <div className="modal-content">
        <h2 id="intro-title">This is for education purpose</h2>
        <p>
          This MCQ exam contains 200 questions. You can navigate between questions,
          skip questions, and review your answers using the question tracker.
          Good luck!
        </p>
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          fontSize: '14px',
          color: '#666'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#333' }}>
            Made by Yash Dudhe
          </p>
          <p style={{ margin: 0 }}>
            For more details visit:{' '}
            <a 
              href="https://github.com/yashdudhe-28" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}
            >
              GitHub Profile
            </a>
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={onContinue}
          aria-label="Continue to exam"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ModalIntro;
