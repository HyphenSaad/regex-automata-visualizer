'use client';

const Instructions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show no-print"></div>
      <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-lightbulb me-3 text-warning"></i>
                Quick Guide
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="card border-0">
                <div className="card-body m-0">
                  <h6 className="mb-3">Supported Operators</h6>
                  <ul className="list-unstyled m-0">
                    <li className="mb-2"><code>*</code> - Zero or more occurrences</li>
                    <li className="mb-2"><code>+</code> - One or more occurrences</li>
                    <li className="mb-2"><code>|</code> - Alternation (OR)</li>
                    <li className="mb-2"><code>()</code> - Grouping</li>
                    <li>Concatenation happens automatically between symbols</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructions;