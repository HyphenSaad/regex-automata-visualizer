class DFA {
  constructor() {
    this.states = new Set();
    this.transitions = new Map();
    this.startState = null;
    this.acceptStates = new Set();
    this.alphabet = new Set();
  }

  addState(state) {
    this.states.add(state);
    if (!this.transitions.has(state)) {
      this.transitions.set(state, new Map());
    }
  }

  setStartState(state) {
    this.startState = state;
  }

  addAcceptState(state) {
    this.acceptStates.add(state);
  }

  addTransition(from, to, symbol) {
    this.alphabet.add(symbol);
    this.transitions.get(from).set(symbol, to);
  }

  generateTransitionTable() {
    const sortedAlphabet = Array.from(this.alphabet).sort();
    let tableData = [];

    this.states.forEach(state => {
      const transitions = this.transitions.get(state);
      let row = {
        state: `${state}${this.startState === state ? ' (start)' : ''}${this.acceptStates.has(state) ? ' (accept)' : ''}`
      };

      sortedAlphabet.forEach(symbol => {
        const toState = transitions.get(symbol);
        row[symbol] = toState || '-';
      });

      tableData.push(row);
    });

    return { headers: ['State', ...sortedAlphabet], data: tableData };
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
      transMap.forEach((to, symbol) => {
        dot += `  ${from} -> ${to} [label="${symbol}"];\n`;
      });
    });

    dot += '}';
    return dot;
  }

  minimize() {
    let partitions = [
      Array.from(this.states).filter(state => !this.acceptStates.has(state)),
      Array.from(this.acceptStates)
    ].filter(partition => partition.length > 0);

    let changed = true;
    while (changed) {
      changed = false;
      const newPartitions = [];

      for (const partition of partitions) {
        if (partition.length <= 1) {
          newPartitions.push(partition);
          continue;
        }

        const splits = new Map();
        for (const state of partition) {
          const transitions = Array.from(this.alphabet).map(symbol => {
            const toState = this.transitions.get(state).get(symbol);
            if (!toState) return -1;
            return partitions.findIndex(p => p.includes(toState));
          }).join(',');

          if (!splits.has(transitions)) {
            splits.set(transitions, []);
          }
          splits.get(transitions).push(state);
        }

        if (splits.size > 1) {
          changed = true;
          newPartitions.push(...splits.values());
        } else {
          newPartitions.push(partition);
        }
      }

      partitions = newPartitions;
    }

    const minDFA = new DFA();
    const stateMap = new Map();

    partitions.forEach((partition, i) => {
      const newState = `M${i}`;
      partition.forEach(oldState => {
        stateMap.set(oldState, newState);
      });
      minDFA.addState(newState);
    });

    minDFA.setStartState(stateMap.get(this.startState));
    this.acceptStates.forEach(state => {
      minDFA.addAcceptState(stateMap.get(state));
    });

    this.states.forEach(state => {
      const from = stateMap.get(state);
      this.transitions.get(state).forEach((to, symbol) => {
        minDFA.addTransition(from, stateMap.get(to), symbol);
      });
    });

    return minDFA;
  }
}

export { DFA };