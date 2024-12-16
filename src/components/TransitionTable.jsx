'use client';

const TransitionTable = ({ headers, data }) => {
  const exportToCsv = () => {
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header =>
          row[header.toLowerCase()] || row[header] || '-'
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transition_table.csv';
    link.click();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="h5 mb-0 d-flex align-items-center">
          <i className="fas fa-table me-2 text-primary"></i>
          Transition Table
        </h4>
        <div className="d-flex justify-content-end no-print">
          <button
            className="btn btn-outline-primary btn-sm no-print"
            onClick={exportToCsv}
          >
            <i className="fas fa-file-csv me-2"></i>
            Export CSV
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="transition-table table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className={header === 'ε-transitions' ? 'epsilon' : ''}>
                    {row[header.toLowerCase()] || row[header] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransitionTable;