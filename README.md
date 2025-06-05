# 🇳🇵 NepDai Programming Language

<div align="center">
  
  # नेपदाइ
  ### A Programming Language with Nepali Keywords
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
  [![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
</div>

---

## About NepDai

NepDai is a programming language that uses Nepali keywords, making programming more accessible to Nepali speakers. The language combines familiar programming concepts with Nepali terminology, creating a unique and culturally relevant coding experience.

**"Namaste Dai"** - Every NepDai program begins with this traditional Nepali greeting!

## ✨ Features

- 🇳🇵 **Nepali Keywords**: Use familiar Nepali words for programming constructs
- 🚀 **Simple Syntax**: Easy to learn and understand
- 🔄 **Interactive REPL**: Test code snippets in real-time
- 🛠️ **Modern Tooling**: Built with TypeScript and modern development practices
- 📚 **Rich Examples**: Comprehensive example programs
- 🎯 **Educational Focus**: Perfect for learning programming concepts
- ⚡ **Fast Compilation**: Quick tokenization, parsing, and interpretation
- 🔧 **Debug Mode**: Inspect tokens and AST for learning

## 📖 Language Keywords

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

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm

### Setup

1. **Clone the repository:**
\`\`\`bash
git clone https://github.com/yourusername/nepdai.git
cd nepdai
\`\`\`

2. **Install dependencies:**
\`\`\`bash
pnpm install
\`\`\`

3. **Build the project:**
\`\`\`bash
pnpm build
\`\`\`

### NPM Package (Coming Soon)
\`\`\`bash
# Install globally (coming soon)
npm install -g nepdai

# Or use with npx (coming soon)
npx nepdai run program.nepdai
\`\`\`

## 💻 Usage

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

**Run the program:**
\`\`\`bash
pnpm nepdai run path/to/your/program.nepdai
\`\`\`

### Interactive Mode (REPL)

Start the interactive mode:
\`\`\`bash
pnpm nepdai repl
\`\`\`

> **Note:** In REPL mode, you can type NepDai code directly and see results immediately. The "Namaste Dai" greeting is not required in REPL mode.

### Debug Mode

To see tokens and AST:
\`\`\`bash
pnpm nepdai run path/to/your/program.nepdai -d
\`\`\`

## 📝 Language Syntax

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
solti mixed = [1, "hello", thik, khali];
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

### Loops with Break and Continue

\`\`\`nepdai
solti i = 1;

jaba samma i <= 10 {
    yadi i == 5 bhane {
        lekh "Skipping", i;
        i++;
        aghi badh vai;  // continue
    }
    
    yadi i == 8 bhane {
        lekh "Breaking at", i;
        vai vayo rokki;  // break
    }
    
    lekh "Number:", i;
    i++;
}
\`\`\`



## 🏗️ Project Structure

\`\`\`
nepdai/
├── packages/
│   ├── cli/            # Command-line interface
│   ├── core/           # Core compiler functionality  
│   ├── interpreter/    # NepDai interpreter
│   ├── lexer/          # Lexical analyzer
│   ├── parser/         # Syntax parser
│   ├── shared/         # Shared types and utilities
|   |── examples/       # Example NepDai programs
│   └── typescript-config/ # Shared TypeScript config
├── apps/docs           # Documentation (if created)
├── package.json        # Root package configuration
├── pnpm-workspace.yaml # pnpm workspace configuration
├── turbo.json          # Turbo build configuration
└── tsconfig.json       # TypeScript configuration
\`\`\`

## 🛠️ Development

### Building
\`\`\`bash
pnpm build
\`\`\`

### Development Mode
\`\`\`bash
pnpm dev
\`\`\`

### Clean Build
\`\`\`bash
pnpm clean
pnpm build
\`\`\`

## 🖥️ CLI Commands

| Command | Description |
|---------|-------------|
| `pnpm nepdai run <file>` | Run a NepDai program |
| `pnpm nepdai repl` | Start interactive mode |
| `pnpm nepdai tokens <file>` | Show tokens for a program |
| `pnpm nepdai ast <file>` | Show AST for a program |
| `pnpm nepdai run <file> -d` | Run with debug information |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- ✅ Follow TypeScript best practices
- ✅ Add tests for new features
- ✅ Update documentation as needed
- ✅ Use meaningful commit messages
- ✅ Ensure all packages build successfully

## 🗺️ Roadmap

- [ ] **NPM package publication**
- [ ] **Official website with documentation**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 🇳🇵 Inspired by the rich cultural heritage of Nepal
- ❤️ Built with love for the Nepali programming community
- 🌟 Thanks to all contributors and supporters
- 🚀 Powered by modern TypeScript and Node.js ecosystem

## 📞 Support

- 🌐 **Official Documentation** with interactive playground (launching soon)
- 🐛 **Open an issue** on GitHub
- 💬 **Join our community** discussions
- 📚 **Check the documentation** in the repository
- 📧 **Contact the maintainers** for support

---

<div align="center">

### धन्यवाद (Thank you) for using NepDai! 🙏

**Crafted in Sahilverse for the Nepali programming community**

</div>
