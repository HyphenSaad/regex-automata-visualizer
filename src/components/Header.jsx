'use client';

const Header = () => {
  return (
    <div className="container my-4 text-center">
      <div className="bg-white rounded-2 p-4 shadow-sm border border-muted">
        <h1 className="display-4 fw-bold mb-2">
          <i className="fas fa-project-diagram me-3" style={{ color: '#4a90e2' }}></i>
          <span style={{ color: '#2c3e50' }}>RegEx Automata</span>
        </h1>
        <p className="lead mb-2" style={{ color: '#34495e' }}>
          Convert regular expressions into visual automata representations
        </p>
        <div className="pt-1">
          <span className="badge me-1" style={{ backgroundColor: '#4a90e2' }}>Interactive</span>
          <span className="badge me-1" style={{ backgroundColor: '#27ae60' }}>Educational</span>
          <span className="badge" style={{ backgroundColor: '#8e44ad' }}>Real-time</span>
        </div>
      </div>
    </div>
  );
};

export default Header;