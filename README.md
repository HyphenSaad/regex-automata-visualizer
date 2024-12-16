# RegEx Automata

A JavaScript implementation of Thompson's construction algorithm for converting regular expressions to Non-deterministic Finite Automata (NFA).

## Project Information

- **Project Name:** RegEx Automata
- **Author:** Saad Mansoor
- **Roll Number:** 24015919-003
- **Department:** Department of Computer Science
- **University:** University of Gujrat, Hafiz Hayat Campus
- **Course:** Advance Theory of Computation
- **Type:** Term Project

## Features

- Converts regular expressions to NFAs using Thompson's construction
- Supports basic regex operations:
  - Concatenation (ab)
  - Alternation (a+b)
  - Kleene star (a\*)
  - Grouping with parentheses ((a+b)\*)
- Error handling for invalid regex syntax

## Implementation Details

This project implements Thompson's construction algorithm to convert regular expressions into Non-deterministic Finite Automata (NFA). The implementation includes a recursive descent parser for processing regular expressions and constructing the corresponding NFA states and transitions.
