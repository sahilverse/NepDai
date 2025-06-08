<h1 align="center">🇳🇵 NepDai Programming Language</h1>

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

## 📖 Language Keywords

| NepDai | English | Description |
|--------|---------|-------------|
| `solti` | `let/var` | Variable declaration |
| `yadi (condition) bhane` | `if` | Conditional statement |
| `natra` | `else` | Else clause |
| `jaba samma` | `while` | While loop |
| `vai vayo rokki` | `break` | Break statement |
| `aghi badh vai` | `continue` | Continue statement |
| `lekh` | `print` | Print to console |
| `thik` | `true` | Boolean true |
| `galat` | `false` | Boolean false |
| `khali` | `null` | Null value |

<h2 align="center">Installation</h2>

```
npm i -g nepdai
```

<h2 align="center">Usage</h2>

<h4 align="left">Create a new file (<code>test.nepdai</code>)</h4>


<h4 align="left">Edit the file with a text editor.</h4>

```
Namaste Dai
  lekh "Namaste Dai";
```

<h4 align="left">Run</h4>

```
nepdai run test.nepdai
```

<h4 align="left">Output</h4>

```
 Namaste Dai
```

<h4 align="left">Other Commands</h4>

```
 tokens <file>         Show tokens for a Nepdai program
 ast <file>            Show AST for a Nepdai program
 repl                  Start Nepdai REPL
 help [command]        display help for command
```

<h2 align="center">Documentation</h2>

<h3 align="center">General</h3>
<p align="center">Every NepDai program must start with <code>Namaste Dai</code> as the first line. This traditional greeting serves as the program's entry point and is mandatory for all <code>.nepdai</code> files. Any code written before this greeting will result in a compilation error, emphasizing the cultural significance of proper greetings in Nepali tradition.</p>

```
// Error: If anything is present here, greeting above all
Namaste Dai
  // code here, and no semicolon after greeting
```

<h3 align="center">Variables</h3>
<p align="center">Variables can be declared using <code>solti</code> keyword.</p>

```
Namaste Dai
  solti a = 1;
  solti b = "sahil";
  a = a++;
  b = "sahilverse";
  c = a + 10;
```

<h3 align="center">Types</h3>
<p align="center">Nepdai supports various data types just like other programming languages. The special value <code>khali</code> represents null, while boolean logic uses <code>thik</code> for true conditions and <code>galat</code> for false conditions.</p>

```
Namaste Dai
  solti string = "string";
  solti number = 10;
  solti float = 10.2; // Also a number
  solti true = thik; 
  solti false = galat;
  solti null = khali; 
```

<h3 align="center">Arrays</h3>
<p align="center">Nepdai have support for <strong>Array</strong> as well.  To create an array, simply assign a list of values inside square brackets ([]) to a variable declared with solti. <strong>Array operations are very limited right now.</strong>.</p>

```
Namaste Dai

  // Array examples in Nepdai
  solti numbers = [1, 2, 3, 4, 5];
  solti names = ["Ram", "Shyam", "Gita"];
  solti mixed = [1, "hello", thik, khali];

  lekh "Numbers:", numbers;
  lekh "Names:", names;
  lekh "Mixed array:", mixed;

  // Empty array
  solti empty = [];
  lekh "Empty array:", empty;

  // Other Operations on Arrays are not supported right now
 
```

<h3 align="center">Conditionals</h3>
<p align="center">Nepdai supports conditional statements using <code>yadi (condition) bhane</code> for "if", <code>natra yadi (condition) bhane</code> for "else if", and <code>natra</code> for the final "else". If a <code>yadi</code> condition is <code>thik</code>, its block runs. If not, the next <code>natra yadi</code> (if any) is checked. If all fail, the <code>natra</code> block runs. Parentheses around conditions are optional!</p>

```
Namaste Dai

// Conditional statements in Nepdai
solti age = 25;
solti name = "Ram";

lekh "Name:", name;
lekh "Age:", age;

yadi (age >= 18) bhane {
    lekh name, "is an adult";
} natra {
    lekh name, "is a minor";
}

// Nested conditionals
solti score = 85;

yadi (score >= 90) bhane {
    lekh "Grade: A";
} natra yadi (score >= 80) bhane {
    lekh "Grade: B";
} natra yadi (score >= 70) bhane {
    lekh "Grade: C";
} natra {
    lekh "Grade: F";
}

```

<h3 align="center">Loops</h3>
<p align="center">To create loops, use <code>jaba samma</code>. This repeats code as long as the condition remains <code>thik</code>. Use <code>vai vayo rokki</code> to break out of the loop early, and <code>aghi badh vai</code> to skip to the next iteration.</p>


```
Namaste Dai

// While loop with break and continue
solti i = 1;

lekh "Counting with break and continue:";

jaba samma (i <= 10) {
    yadi (i == 5) bhane {
        lekh "Skipping", i;
        i++;
        aghi badh vai;
    }
    
    yadi (i == 8) bhane {
        lekh "Breaking at", i;
        vai vayo rokki;
    }
    
    lekh "Number:", i;
    i++;
}

lekh "Loop finished!";

```

<div align="center">

**Crafted in Sahilverse for the Nepali programming community**

### धन्यवाद (Thank you) for using NepDai! 🙏

</div>








