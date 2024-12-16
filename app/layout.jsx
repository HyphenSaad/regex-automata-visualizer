'use client';

import Script from 'next/script';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <title>RegEx Automata | DS Solutions</title>
        <meta name="description" content="RegEx Automata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Saad Mansoor" />
        <meta name="roll-number" content="24015919-003" />
        <meta name="department" content="Computer Science" />
        <meta name="university" content="University of Gujrat, Hafiz Hayat Campus" />
        <meta name="course" content="Advance Theory of Computation" />
        <meta name="type" content="Term Project" />

        <meta property="og:title" content="RegEx Automata" />
        <meta property="og:description" content="RegEx Automata | By DS Solutions" />

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