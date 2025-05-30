import type { Token, ASTNode, RuntimeValue } from "@nepdai/shared"
import { NepdaiLexer } from "@nepdai/lexer"
import { NepdaiParser } from "@nepdai/parser"
import { NepdaiInterpreter } from "@nepdai/interpreter"

/**
 * Nepdai Compiler - Main interface for compiling and running Nepdai code
 */
export class NepdaiCompiler {
  private lexer: NepdaiLexer
  private parser: NepdaiParser
  private interpreter: NepdaiInterpreter

  constructor() {
    this.lexer = new NepdaiLexer("")
    this.parser = new NepdaiParser([])
    this.interpreter = new NepdaiInterpreter()
  }

  /**
   * Tokenize source code
   */
  tokenize(source: string): Token[] {
    this.lexer = new NepdaiLexer(source)
    return this.lexer.tokenize()
  }

  /**
   * Parse tokens into an AST
   */
  parse(tokens: Token[]): ASTNode {
    this.parser = new NepdaiParser(tokens)
    return this.parser.parse()
  }

  /**
   * Interpret an AST
   */
  interpret(ast: ASTNode): RuntimeValue {
    return this.interpreter.interpret(ast)
  }

  /**
   * Compile and run source code
   */
  run(source: string): RuntimeValue {
    const tokens = this.tokenize(source)
    const ast = this.parse(tokens)
    return this.interpret(ast)
  }

  /**
   * Compile source code to AST
   */
  compile(source: string): ASTNode {
    const tokens = this.tokenize(source)
    return this.parse(tokens)
  }
}

/**
 * Create a new Nepdai compiler instance
 */
export function createNepdaiCompiler(): NepdaiCompiler {
  return new NepdaiCompiler()
}
