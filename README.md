# RegEx Automata Visualizer

A project that implements Thompson's construction algorithm to convert regular expressions into Non-deterministic Finite Automata (NFA).

## Project Information

| Project Name | RegEx Automata                           |
| Author       | Saad Mansoor                             |
| Roll Number  | 24015919-003                             |
| Department   | Department of Computer Science           |
| University   | University of Gujrat, Hafiz Hayat Campus |
| Course       | Advanced Theory of Computation           |
| Type         | Term Project                             |

## Features

- Converts regular expressions to NFAs using Thompson's construction
- Supports basic regex operations:
  - Concatenation (ab)
  - Alternation (a+b)
  - Kleene star (a\*)
  - Grouping with parentheses ((a+b)\*)
- Error handling for invalid regex syntax

## Setup and Run

### Prerequisites

- [Node.js](https://nodejs.org/en) (v20 or later)

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/hyphensaad/regex-automata-visualizer.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd regex-automata-visualizer
   ```

3. **Install dependencies:**

   ```sh
    npm install
   ```

4. **Start the development server:**

   ```sh
   npm run dev
   ```

5. **Open the project in your browser:**

   Navigate to `http://localhost:8080` in your browser to view the project.

## Live Version

The live version of the project is hosted on GitHub Pages and can be accessed at the following link:

[RegEx Automata Visualizer](https://hyphensaad.github.io/regex-automata-visualizer/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
