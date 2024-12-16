'use client';

import { useState } from 'react';
import Instructions from './Instructions';

const RegexInput = ({ onSubmit, regex, setRegex, error, setPrinting }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <section className="container mb-4 ">
      {regex && (
        <div className="print-only">
          <div className="d-flex align-items-center">
            <span className="text-primary me-2">
              <i className="fas fa-keyboard"></i>
            </span>
            <h6 className="mb-0">Regular Expression</h6>
          </div>
          <div className="mt-2 py-3 px-4 bg-light rounded-3 border border-2">
            <code className="fs-5">{regex}</code>
          </div>
          <div className="mt-2 text-muted small">
            <i className="fas fa-info-circle me-2"></i>
            This expression has been used to generate the following automata!
          </div>
        </div>
      )}
      <div className="bg-white p-4 shadow-sm border border-muted rounded-3 no-print">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h5 mb-0 d-flex align-items-center">
            <i className="fas fa-code text-primary me-2"></i>
            Enter Regular Expression
          </h2>
          <button
            className="btn text-muted border-0 position-relative hover-scale"
            onClick={() => setShowInstructions(true)}
            title="How to Use"
            style={{ transition: 'transform 0.2s' }}
          >
            <i className="fas fa-lightbulb fs-5"></i>
          </button>
        </div>

        <form onSubmit={onSubmit} className="needs-validation" noValidate>
          <div className="input-group input-group-lg mb-3">
            <input
              type="text"
              className="form-control bg-light "
              style={{ boxShadow: 'none', transition: 'background-color 0.2s' }}
              placeholder="e.g. (a|b)*abb"
              value={regex}
              onChange={(e) => {
                setRegex(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit(e);
                }
              }}
              required
            />
            <button
              type="submit"
              className="btn btn-primary px-4 border-0"
              style={{ transition: 'all 0.2s' }}
            >
              <i className="fa-solid fa-wand-magic-sparkles me-3"></i>Generate
            </button>
          </div>
          {error && (
            <div className="text-danger small py-2 d-flex align-items-center">
              <i className="fas fa-circle-exclamation me-2"></i>
              {error}
            </div>
          )}
        </form>

        <div className="d-flex gap-3 mt-4">
          <button
            className="btn text-muted border-0 d-flex align-items-center hover-primary"
            onClick={() => setRegex('')}
            style={{ transition: 'color 0.2s' }}
          >
            <i className="fas fa-rotate-left me-2"></i>Reset
          </button>
          <button
            className="btn text-muted border-0 d-flex align-items-center hover-primary"
            onClick={() => {
              setPrinting(true);
              window.print();
            }}
            style={{ transition: 'color 0.2s' }}
          >
            <i className="fas fa-file-arrow-down me-2"></i>Export PDF
          </button>
        </div>

        {regex && (
          <div className="mt-4">
            <div className="d-flex align-items-center">
              <span className="text-primary me-2">
                <i className="fas fa-keyboard"></i>
              </span>
              <h6 className="mb-0">Current Expression</h6>
            </div>
            <div className="mt-2 py-3 px-4 bg-light rounded-3 border border-2">
              <code className="fs-5">{regex}</code>
            </div>
            <div className="mt-2 text-muted small">
              <i className="fas fa-info-circle me-2"></i>
              This expression will be used to generate the automata
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .hover-scale:hover {
          transform: scale(1.1);
        }
        .hover-primary:hover {
          color: var(--bs-primary) !important;
        }
        input:focus {
          background-color: white !important;
        }
      `}</style>

      <Instructions isOpen={showInstructions} onClose={() => setShowInstructions(false)} />
    </section>
  );
};

export default RegexInput;