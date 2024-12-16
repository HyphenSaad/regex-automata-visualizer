import { DFA } from "./DFA.class.js";
import { SetsEqual } from "@/src/utils/helpers.js";

class NFA {
  constructor() {
    this.states = new Set();
    this.transitions = new Map();
    this.startState = null;
    this.acceptStates = new Set();
    this.stateCounter = 0;
    this.alphabet = new Set();
  }

  createState() {
    const state = `q${this.stateCounter++}`;
    this.states.add(state);
    this.transitions.set(state, new Map());
    return state;
  }

  setStartState(state) {
    this.startState = state;
  }

  addAcceptState(state) {
    this.acceptStates.add(state);
  }

  addTransition(from, to, symbol) {
    if (symbol !== '') {
      this.alphabet.add(symbol);
    }
    if (!this.transitions.get(from).has(symbol)) {
      this.transitions.get(from).set(symbol, new Set());
    }
    this.transitions.get(from).get(symbol).add(to);
  }

  generateTransitionTable() {
    const sortedAlphabet = Array.from(this.alphabet).sort();
    let tableData = [];

    this.states.forEach(state => {
      const transitions = this.transitions.get(state);
      const epsilonTrans = transitions.get('') ?
        Array.from(transitions.get('')).join(', ') : '-';

      let row = {
        state: `${state}${this.startState === state ? ' (start)' : ''}${this.acceptStates.has(state) ? ' (accept)' : ''}`,
        'ε-transitions': epsilonTrans
      };

      sortedAlphabet.forEach(symbol => {
        const trans = transitions.get(symbol);
        row[symbol] = trans ? Array.from(trans).join(', ') : '-';
      });

      tableData.push(row);
    });

    return { headers: ['State', 'ε-transitions', ...sortedAlphabet], data: tableData };
  }

  toDotString() {
    let dot = 'digraph {\n  rankdir=LR;\n';
    dot += '  start [shape=point];\n';
    dot += `  start -> ${this.startState};\n`;

    if (this.acceptStates.size > 0) {
      dot += '  node [shape=doublecircle] ';
      this.acceptStates.forEach(state => {
        dot += `${state} `;
      });
      dot += ';\n';
    }

    dot += '  node [shape=circle];\n';

    this.transitions.forEach((transMap, from) => {
      transMap.forEach((toSet, symbol) => {
        toSet.forEach(to => {
          const label = symbol === '' ? 'ε' : symbol;
          dot += `  ${from} -> ${to} [label="${label}"];\n`;
        });
      });
    });

    dot += '}';
    return dot;
  }

  toDFA() {
    const dfa = new DFA();
    const epsilonClosure = new Map();
    const dfaStates = new Map();
    let stateCounter = 0;

    const getEpsilonClosure = (states) => {
      const closure = new Set(states);
      const stack = [...states];

      while (stack.length > 0) {
        const state = stack.pop();
        const transitions = this.transitions.get(state);
        if (transitions.has('')) {
          transitions.get('').forEach(nextState => {
            if (!closure.has(nextState)) {
              closure.add(nextState);
              stack.push(nextState);
            }
          });
        }
      }

      return closure;
    };

    const initialClosure = getEpsilonClosure([this.startState]);
    const initialState = `D${stateCounter++}`;
    dfaStates.set(initialState, initialClosure);
    dfa.addState(initialState);
    dfa.setStartState(initialState);

    const unprocessedStates = [initialState];
    while (unprocessedStates.length > 0) {
      const currentState = unprocessedStates.pop();
      const currentNFAStates = dfaStates.get(currentState);

      for (const nfaState of currentNFAStates) {
        if (this.acceptStates.has(nfaState)) {
          dfa.addAcceptState(currentState);
          break;
        }
      }

      this.alphabet.forEach(symbol => {
        const nextStates = new Set();
        currentNFAStates.forEach(state => {
          const transitions = this.transitions.get(state);
          if (transitions.has(symbol)) {
            transitions.get(symbol).forEach(nextState => {
              getEpsilonClosure([nextState]).forEach(s => nextStates.add(s));
            });
          }
        });

        if (nextStates.size > 0) {
          let nextDFAState = null;
          for (const [state, nfaStates] of dfaStates.entries()) {
            if (SetsEqual(nfaStates, nextStates)) {
              nextDFAState = state;
              break;
            }
          }

          if (!nextDFAState) {
            nextDFAState = `D${stateCounter++}`;
            dfaStates.set(nextDFAState, nextStates);
            dfa.addState(nextDFAState);
            unprocessedStates.push(nextDFAState);
          }

          dfa.addTransition(currentState, nextDFAState, symbol);
        }
      });
    }

    return dfa;
  }
}

export { NFA };