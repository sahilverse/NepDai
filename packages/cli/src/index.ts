#!/usr/bin/env node
import { Command } from "commander"
import * as fs from "fs/promises"
import * as path from "path"
import chalk from "chalk"

// Import from source during development
import { createNepdaiCompiler } from "../../core/src/index"

const program = new Command()

program.name("nepdai").description("Nepdai Programming Language Compiler and Interpreter").version("1.0.0")

program
  .command("run <file>")
  .description("Run a Nepdai program")
  .option("-d, --debug", "Enable debug mode")
  .action(async (file, options) => {
    try {
      const filePath = path.resolve(process.cwd(), file)

      // Check if file exists
      try {
        await fs.access(filePath)
      } catch {
        console.error(chalk.red(`Error: File '${file}' not found.`))
        process.exit(1)
      }

      // Check file extension
      if (!file.endsWith(".nepdai")) {
        console.error(chalk.red(`Error: File must have .nepdai extension.`))
        process.exit(1)
      }

      const source = await fs.readFile(filePath, "utf-8")
      const compiler = createNepdaiCompiler()

      if (options.debug) {
        console.log(chalk.blue("=== Nepdai Debug Mode ==="))
        console.log()

        console.log(chalk.blue("Source Code:"))
        console.log(chalk.gray(source))
        console.log()

        console.log(chalk.blue("Tokens:"))
        const tokens = compiler.tokenize(source, true) // Require "Namaste Dai" for files
        tokens.forEach((token, index) => {
          const position = `${token.position.line}:${token.position.column}`
          const value = token.value !== undefined ? ` (${token.value})` : ""
          const lexeme = token.lexeme ? ` "${token.lexeme}"` : ""
          console.log(
            chalk.gray(`${index.toString().padStart(3)}: ${token.type.padEnd(15)} ${lexeme}${value} at ${position}`),
          )
        })
        console.log()

        console.log(chalk.blue("AST:"))
        const ast = compiler.parse(tokens)
        console.log(chalk.gray(JSON.stringify(ast, null, 2)))
        console.log()

        console.log(chalk.blue("Output:"))
      }

      compiler.run(source, true) // Require "Namaste Dai" for files
    } catch (error: any) {
      console.error(chalk.red("Error:"), error.message)
      if (error.position) {
        console.error(chalk.red(`At line ${error.position.line}, column ${error.position.column}`))
      }
      process.exit(1)
    }
  })

program
  .command("tokens <file>")
  .description("Show tokens for a Nepdai program")
  .action(async (file) => {
    try {
      const filePath = path.resolve(process.cwd(), file)
      const source = await fs.readFile(filePath, "utf-8")
      const compiler = createNepdaiCompiler()
      const tokens = compiler.tokenize(source, true) // Require "Namaste Dai" for files

      console.log(chalk.blue("=== Nepdai Tokens ==="))
      console.log()

      tokens.forEach((token, index) => {
        const position = `${token.position.line}:${token.position.column}`
        const value = token.value !== undefined ? ` (${token.value})` : ""
        const lexeme = token.lexeme ? ` "${token.lexeme}"` : ""
        console.log(`${index.toString().padStart(3)}: ${token.type.padEnd(15)} ${lexeme}${value} at ${position}`)
      })
    } catch (error: any) {
      console.error(chalk.red("Error:"), error.message)
      process.exit(1)
    }
  })

program
  .command("ast <file>")
  .description("Show AST for a Nepdai program")
  .action(async (file) => {
    try {
      const filePath = path.resolve(process.cwd(), file)
      const source = await fs.readFile(filePath, "utf-8")
      const compiler = createNepdaiCompiler()
      const tokens = compiler.tokenize(source, true) // Require "Namaste Dai" for files
      const ast = compiler.parse(tokens)

      console.log(chalk.blue("=== Nepdai AST ==="))
      console.log()
      console.log(JSON.stringify(ast, null, 2))
    } catch (error: any) {
      console.error(chalk.red("Error:"), error.message)
      process.exit(1)
    }
  })

program
  .command("repl")
  .description("Start Nepdai REPL")
  .action(() => {
    console.log(chalk.blue("=== Nepdai REPL ==="))
    console.log(chalk.gray('Type "exit" to quit'))
    console.log()

    const readline = require("readline")
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.green("nepdai> "),
    })

    const compiler = createNepdaiCompiler()

    rl.prompt()

    rl.on("line", (line: string) => {
      const input = line.trim()

      if (input === "exit" || input === "quit") {
        console.log(chalk.blue("Goodbye!"))
        rl.close()
        return
      }

      if (input === "") {
        rl.prompt()
        return
      }

      try {
        const result = compiler.run(input, false) // Don't require "Namaste Dai" for REPL
        if (result.type !== "NULL") {
          console.log(chalk.green("=> "), result.value)
        }
      } catch (error: any) {
        console.error(chalk.red("Error:"), error.message)
      }

      rl.prompt()
    })

    rl.on("close", () => {
      process.exit(0)
    })
  })

program.parse()
