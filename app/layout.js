'use client';

import Script from 'next/script';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" rel="stylesheet" />
      </head>
      <body>
        {children}

        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/js/all.min.js" />
        <Script src="https://code.jquery.com/jquery-3.7.0.min.js" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />
        <Script src="https://d3js.org/d3.v5.min.js" />
        <Script src="https://unpkg.com/viz.js@1.8.1/viz.js" type="javascript/worker" />
        <Script src="https://unpkg.com/d3-graphviz@2.6.1/build/d3-graphviz.js" />
      </body>
    </html>
  );
};

export default Layout;