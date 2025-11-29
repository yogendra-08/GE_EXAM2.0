import type { FC } from 'react';

interface ConfirmQuitProps {
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Confirmation modal for quitting the exam
 */
const ConfirmQuit: FC<ConfirmQuitProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="quit-title" aria-modal="true">
      <div className="modal-content">
        <h2 id="quit-title">Quit Exam?</h2>
        <p>
          Are you sure you want to quit the exam? Your progress will be saved
          and you can view your final score.
        </p>
        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            aria-label="Cancel and continue exam"
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            aria-label="Confirm quit exam"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmQuit;
