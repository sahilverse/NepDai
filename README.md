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


<h4 align="left">Edit the file with a text editor.

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
<p align="center"><code>Namaste Dai</code> is the entrypoint for the program. If anything is written above it, An error will occur. So Remember Greeting Dai Above all is must.</p>

```
// Error: If anything is present here, greeting above all
Namaste Dai
  // code here, and no semicolon after greeting
```

<h3 align="center">Variables</h3>
<p align="center">Variables can be declared using <code>solti</code>.</p>

```
Namaste Dai
  solti a = 1;
  solti b = "sahil";
  a = a++;
  b = "sahilverse";
  c = a + 10;
```

<h3 align="center">Types</h3>
<p align="center">Numbers and strings are like other languages. Null values can be denoted using <code>khali</code>. <code>thik</code> and <code>galat</code> are the boolean values.</p>

```
Namaste Dai
  solti true = thik;
  solti false = galat;
  solti null = khali; 
```

<h3 align="center">Built-ins</h3>
<p align="center">Use <code>lekh</code> to print anything to console.</p>
<p align="center">No need for "+" to concatenate the variables.</p>
```
Namaste Dai
  solti a = "Sahil";
  lekh "My name is", a;
```

<h3 align="center">Conditionals</h3>
<p align="center">Nepdai supports if-else-if ladder construct , <code>yadi (condition) bhane</code> block will execute if condition is <code>thik</code>, otherwise one of the subsequently added <code>natra yadi (condition) bhane</code> blocks will execute if their respective condition is <code>thik</code>, and the <code>natra</code> block will eventually execute if all of the above conditions are <code>galat</code>. The use of parenthesis for conditions are optional, just like python.</p>

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
<p align="center">Statements inside <code>jaba samma</code> blocks are executed as long as a specified condition evaluates to thik. If the condition becomes <code>galat</code>, statement within the loop stops executing and control passes to the statement following the loop. Use <code>vai vayo rokki</code> to break the loop and <code className="language-cpp">aghi badh vai</code> to continue within loop.</p>


```
Namaste Dai

// While loop with break and continue
solti i = 1;

lekh "Counting with break and continue:";

jaba samma i <= 10 {
    yadi i == 5 bhane {
        lekh "Skipping", i;
        i++;
        aghi badh vai;
    }
    
    yadi i == 8 bhane {
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








