# NepDai Programming Language

<div align="center">
  <img src="https://via.placeholder.com/200x200?text=NepDai" alt="NepDai Logo" width="200"/>
  
  **A Programming Language with Nepali Keywords**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
</div>

## About NepDai

NepDai is a programming language that uses Nepali keywords, making programming more accessible to Nepali speakers. The language combines familiar programming concepts with Nepali terminology, creating a unique and culturally relevant coding experience.

**"Namaste Dai"** - Every NepDai program begins with this traditional Nepali greeting!

## Features

- 🇳🇵 **Nepali Keywords**: Use familiar Nepali words for programming constructs
- 🚀 **Simple Syntax**: Easy to learn and understand
- 🔄 **Interactive REPL**: Test code snippets in real-time
- 🛠️ **Modern Tooling**: Built with TypeScript and modern development practices
- 📚 **Rich Examples**: Comprehensive example programs
- 🎯 **Educational Focus**: Perfect for learning programming concepts

## Language Keywords

| NepDai | English | Description |
|--------|---------|-------------|
| `solti` | `let/var` | Variable declaration |
| `yadi` | `if` | Conditional statement |
| `bhane` | `then` | Then clause |
| `natra` | `else` | Else clause |
| `jaba samma` | `while` | While loop |
| `vai vayo rokki` | `break` | Break statement |
| `aghi badh vai` | `continue` | Continue statement |
| `lekh` | `print` | Print to console |
| `thik` | `true` | Boolean true |
| `galat` | `false` | Boolean false |
| `khali` | `null` | Null value |

## Installation

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/nepdai.git
cd nepdai
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
\`\`\`

3. Build the project:
\`\`\`bash
pnpm build
\`\`\`

## Usage

### Running Programs

Create a `.nepdai` file with your code:

\`\`\`nepdai
Namaste Dai

solti name = "Ram";
solti age = 25;

lekh "Name:", name;
lekh "Age:", age;

yadi age >= 18 bhane {
    lekh "You are an adult!";
} natra {
    lekh "You are a minor!";
}
\`\`\`

Run the program:

\`\`\`bash
pnpm nepdai run path/to/your/program.nepdai
\`\`\`

### Interactive Mode (REPL)

Start the interactive mode:

\`\`\`bash
pnpm nepdai repl
\`\`\`

In REPL mode, you can type NepDai code directly and see the results immediately. The "Namaste Dai" greeting is not required in REPL mode.

### Debug Mode

To see tokens and AST:

\`\`\`bash
pnpm nepdai run path/to/your/program.nepdai -d
\`\`\`

## Language Syntax

### Basic Structure

Every NepDai file must start with `Namaste Dai` (except in REPL mode).

### Variables

\`\`\`nepdai
solti name = "Ram";
solti age = 25;
solti isStudent = thik;  // true
solti nothing = khali;   // null
\`\`\`

### Arrays

\`\`\`nepdai
solti numbers = [1, 2, 3, 4, 5];
solti names = ["Ram", "Shyam", "Hari"];
\`\`\`

### Arithmetic Operations

\`\`\`nepdai
solti a = 10;
solti b = 5;

lekh "Sum:", a + b;        // 15
lekh "Difference:", a - b;  // 5
lekh "Product:", a * b;     // 50
lekh "Quotient:", a / b;    // 2
lekh "Remainder:", a % b;   // 0
lekh "Power:", a ** b;      // 100000
\`\`\`

### Conditionals

\`\`\`nepdai
solti age = 20;

yadi age >= 18 bhane {
    lekh "You are an adult";
} natra {
    lekh "You are a minor";
}
\`\`\`

### Loops

\`\`\`nepdai
solti count = 1;

jaba samma count <= 5 {
    lekh "Count:", count;
    count++;
}
\`\`\`

### Break and Continue

\`\`\`nepdai
jaba samma i <= 10 {
    yadi i == 5 bhane {
        i++;
        aghi badh vai;  // continue
    }
    
    yadi i == 8 bhane {
        vai vayo rokki;  // break
    }
    
    lekh "Number:", i;
    i++;
}
\`\`\`

## Examples

Check out the `examples/` directory for more sample programs:

- `hello.nepdai` - Basic hello world
- `arithmetic.nepdai` - Mathematical operations
- `conditionals.nepdai` - If-else statements
- `while-with-break.nepdai` - Loops with break and continue
- `arrays.nepdai` - Working with arrays

## Project Structure

\`\`\`
nepdai/
├── apps/
│   └── cli/            # Command-line interface
├── packages/
│   ├── core/           # Core compiler functionality
│   ├── interpreter/    # NepDai interpreter
│   ├── lexer/          # Lexical analyzer
│   ├── parser/         # Syntax parser
│   └── shared/         # Shared types and utilities
├── examples/           # Example NepDai programs
├── scripts/            # Build and utility scripts
└── docs/               # Documentation
\`\`\`

## Development

### Building

\`\`\`bash
pnpm build
\`\`\`

### Development Mode

\`\`\`bash
pnpm dev
\`\`\`

### Running Tests

\`\`\`bash
pnpm test
\`\`\`

## CLI Commands

- `nepdai run <file>` - Run a NepDai program
- `nepdai repl` - Start interactive mode
- `nepdai tokens <file>` - Show tokens for a program
- `nepdai ast <file>` - Show AST for a program
- `nepdai run <file> -d` - Run with debug information

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add tests for new features
- Update documentation as needed
- Use meaningful commit messages

## Roadmap

- [ ] Function declarations and calls
- [ ] Object-oriented programming features
- [ ] Module system
- [ ] Standard library
- [ ] Package manager
- [ ] IDE/Editor support
- [ ] More built-in functions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the rich cultural heritage of Nepal
- Built with love for the Nepali programming community
- Thanks to all contributors and supporters

## Support

If you have questions or need help:

- Open an issue on GitHub
- Join our community discussions
- Check the documentation in the `docs/` folder

---

**धन्यवाद (Thank you) for using NepDai!** 🙏
