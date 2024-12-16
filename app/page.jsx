'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { RegexParser } from '@/src/logic';
import {
  Header,
  RegExInput,
  AutomataSection,
} from '@/src/components';

const Home = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    document.title = 'RegEx Automata';
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('beforeprint', () => {
      setIsPrinting(true);
    });

    window.addEventListener('afterprint', () => {
      setIsPrinting(false);
    });
  }, []);

  const [regex, setRegex] = useState('');
  const [error, setError] = useState('');
  const [nfa, setNfa] = useState(null);
  const [dfa, setDfa] = useState(null);
  const [minDfa, setMinDfa] = useState(null);
  const nfaSectionRef = useRef(null);
  const dfaSectionRef = useRef(null);
  const minDfaSectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && nfa && dfa && minDfa) {
      const d3 = window.d3;
      const graphOptions = {
        zoom: true,
        fit: true,
      };

      d3.select('.current-nfa')
        .graphviz(graphOptions)
        .renderDot(nfa.toDotString());

      d3.select('.current-dfa')
        .graphviz(graphOptions)
        .renderDot(dfa.toDotString());

      d3.select('.current-min-dfa')
        .graphviz(graphOptions)
        .renderDot(minDfa.toDotString());

      setTimeout(() => {
        const nfaSvg = nfaSectionRef.current?.querySelector("svg");
        const dfaSvg = dfaSectionRef.current?.querySelector("svg");
        const minDfaSvg = minDfaSectionRef.current?.querySelector("svg");

        if (nfaSvg) nfaSvg.setAttribute("width", "100%");
        if (dfaSvg) dfaSvg.setAttribute("width", "100%");
        if (minDfaSvg) minDfaSvg.setAttribute("width", "100%");
      }, 1500);
    }
  }, [nfa, dfa, minDfa]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const parser = new RegexParser(regex);
      const newNfa = parser.parse();
      const newDfa = newNfa.toDFA();
      const newMinDfa = newDfa.minimize();

      setError('');
      setNfa(newNfa);
      setDfa(newDfa);
      setMinDfa(newMinDfa);

      if (nfaSectionRef.current) nfaSectionRef.current.style.display = 'block';
      if (dfaSectionRef.current) dfaSectionRef.current.style.display = 'block';
      if (minDfaSectionRef.current) minDfaSectionRef.current.style.display = 'block';

      // to make first tab active
      const nfaTab = document.querySelector('[data-bs-target="#nfa"]');
      if (nfaTab) nfaTab.click();
    } catch (err) {
      setError(`Error: ${err.message}`);
      if (nfaSectionRef.current) nfaSectionRef.current.style.display = 'none';
      if (dfaSectionRef.current) dfaSectionRef.current.style.display = 'none';
      if (minDfaSectionRef.current) minDfaSectionRef.current.style.display = 'none';
    }
  };

  return (
    <>
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <RegExInput
          onSubmit={handleSubmit}
          regex={regex}
          setRegex={setRegex}
          error={error}
        />

        {(nfa || dfa || minDfa) && (
          <div className="container mb-3">
            <ul className="nav nav-tabs no-print" role={!isPrinting ? "tablist" : ""}>
              <li className="nav-item">
                <button className="nav-link" data-bs-toggle={!isPrinting ? "tab" : ""} data-bs-target="#nfa">
                  <i className="fas fa-project-diagram me-1"></i>ε-NFA
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" data-bs-toggle={!isPrinting ? "tab" : ""} data-bs-target="#dfa">
                  <i className="fas fa-sitemap me-1"></i>DFA
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" data-bs-toggle={!isPrinting ? "tab" : ""} data-bs-target="#min-dfa">
                  <i className="fas fa-compress-arrows-alt me-1"></i>Min-DFA
                </button>
              </li>
            </ul>

            <div className={`${!isPrinting ? 'tab-content' : ''} mt-3`}>
              {nfa && (
                <AutomataSection
                  title="ε-NFA (Non-deterministic Finite Automata with ε-transitions)"
                  id={isPrinting ? 'nfa-print' : 'nfa'}
                  tableData={nfa.generateTransitionTable()}
                  dotString={nfa.toDotString()}
                  titleClass="text-primary"
                  ref={nfaSectionRef}
                  isPrinting={isPrinting}
                />
              )}

              {dfa && (
                <AutomataSection
                  title="DFA (Deterministic Finite Automata)"
                  id={isPrinting ? 'dfa-print' : 'dfa'}
                  isPrinting={isPrinting}
                  tableData={dfa.generateTransitionTable()}
                  dotString={dfa.toDotString()}
                  titleClass="text-primary"
                  ref={dfaSectionRef}
                />
              )}

              {minDfa && (
                <AutomataSection
                  title="Minimized DFA"
                  id={isPrinting ? 'min-dfa-print' : 'min-dfa'}
                  tableData={minDfa.generateTransitionTable()}
                  dotString={minDfa.toDotString()}
                  titleClass="text-primary"
                  isPrinting={isPrinting}
                  ref={minDfaSectionRef}
                />
              )}
            </div>
          </div>
        )}

        <footer className="mt-0 pt-0 pb-3 text-center text-muted">
          <small>
            Made with <i className="fas fa-heart text-danger"></i> by{' '}
            <a href="https://github.com/hyphensaad" className="text-decoration-none">
              DS Solutions
            </a>
          </small>
        </footer>
      </div>
    </>
  );
};

export default Home;