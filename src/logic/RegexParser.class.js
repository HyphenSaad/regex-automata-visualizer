import { NFA } from "./NFA.class.js";

class RegexParser {
  constructor(regex) {
    this.regex = regex;
    this.pos = 0;
  }

  parse() {
    const nfa = new NFA();
    const [startState, acceptState] = this.parseExpression(nfa);
    nfa.setStartState(startState);
    nfa.addAcceptState(acceptState);
    return nfa;
  }

  parseExpression(nfa) {
    let [leftStart, leftEnd] = this.parseTerm(nfa);

    while (this.pos < this.regex.length && this.regex[this.pos] === '+') {
      this.pos++;
      const [rightStart, rightEnd] = this.parseTerm(nfa);
      const newStart = nfa.createState();
      const newEnd = nfa.createState();

      nfa.addTransition(newStart, leftStart, '');
      nfa.addTransition(newStart, rightStart, '');
      nfa.addTransition(leftEnd, newEnd, '');
      nfa.addTransition(rightEnd, newEnd, '');

      leftStart = newStart;
      leftEnd = newEnd;
    }

    return [leftStart, leftEnd];
  }

  parseTerm(nfa) {
    let [leftStart, leftEnd] = this.parseFactor(nfa);

    while (this.pos < this.regex.length &&
      this.regex[this.pos] !== ')' &&
      this.regex[this.pos] !== '+') {
      const [rightStart, rightEnd] = this.parseFactor(nfa);
      nfa.addTransition(leftEnd, rightStart, '');
      leftEnd = rightEnd;
    }

    return [leftStart, leftEnd];
  }

  parseFactor(nfa) {
    let [start, end] = this.parseBase(nfa);

    while (this.pos < this.regex.length && this.regex[this.pos] === '*') {
      this.pos++;
      const newStart = nfa.createState();
      const newEnd = nfa.createState();

      nfa.addTransition(newStart, start, '');
      nfa.addTransition(newStart, newEnd, '');
      nfa.addTransition(end, start, '');
      nfa.addTransition(end, newEnd, '');

      start = newStart;
      end = newEnd;
    }

    return [start, end];
  }

  parseBase(nfa) {
    if (this.regex.length === 0) {
      throw new Error("Empty regex!");
    }

    if (this.pos >= this.regex.length) {
      throw new Error("Unexpected end of regex!");
    }

    if (this.regex[this.pos] === '(') {
      this.pos++;
      const [start, end] = this.parseExpression(nfa);
      if (this.pos >= this.regex.length || this.regex[this.pos] !== ')') {
        throw new Error("Missing closing parenthesis");
      }
      this.pos++;
      return [start, end];
    }

    const start = nfa.createState();
    const end = nfa.createState();
    nfa.addTransition(start, end, this.regex[this.pos]);
    this.pos++;
    return [start, end];
  }
}

export { RegexParser };