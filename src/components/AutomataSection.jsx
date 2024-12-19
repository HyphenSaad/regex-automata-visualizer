'use client';

import { useRef } from 'react';
import TransitionTable from './TransitionTable';
import { downloadImage } from '../utils/helpers';

const AutomataSection = ({ title, id, tableData, dotString, titleClass, isPrinting }) => {
  const graphRef = useRef(null);

  return (
    <div className="tab-pane fade show p-1" id={id} role={!isPrinting ? 'tabpanel' : ''}>
      <div className="card border-0 shadow-sm hover-shadow">
        <div className="card-body p-4 pb-2">
          <h3 className={`h4 ${titleClass} mb-4 fw-bold border-bottom pb-2`}>{title}</h3>

          <div className="mb-2">
            <TransitionTable headers={tableData.headers} data={tableData.data} />
          </div>

          <div className="mb-0">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="h5 mb-0 d-flex align-items-center pb-0">
                <i className="fas fa-project-diagram me-2 text-primary"></i>
                State Diagram
              </h4>
              <div className="download-buttons no-print">
                <button
                  className="btn btn-sm btn-outline-primary me-2 hover-scale"
                  onClick={() => downloadImage(`current-${id}`, 'png', id)}
                >
                  <i className="fas fa-download me-2"></i>
                  PNG
                </button>
                <button
                  className="btn btn-sm btn-outline-primary hover-scale"
                  onClick={() => downloadImage(`current-${id}`, 'svg', id)}
                >
                  <i className="fas fa-download me-2"></i>
                  SVG
                </button>
              </div>
            </div>
            <div
              id={`current-${id}`}
              ref={graphRef}
              className={`current-${id} graph-container rounded p-4 border`}
              style={{
                minHeight: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomataSection;