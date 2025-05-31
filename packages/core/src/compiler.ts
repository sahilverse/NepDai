import type { Token, ASTNode, RuntimeValue } from "../../shared/src"
import { NepdaiLexer } from "../../lexer/src"
import { NepdaiParser } from "../../parser/src"
import { NepdaiInterpreter } from "../../interpreter/src"

/**
 * Nepdai Compiler - Main interface for compiling and running Nepdai code
 */
export class NepdaiCompiler {
  private lexer: NepdaiLexer
  private parser: NepdaiParser
  private interpreter: NepdaiInterpreter

  constructor() {
    this.lexer = new NepdaiLexer("", true)
    this.parser = new NepdaiParser([])
    this.interpreter = new NepdaiInterpreter()
  }

  /**
   * Tokenize source code
   */
  tokenize(source: string, requireNamesteDai = true): Token[] {
    this.lexer = new NepdaiLexer(source, requireNamesteDai)
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
  run(source: string, requireNamesteDai = true): RuntimeValue {
    const tokens = this.tokenize(source, requireNamesteDai)
    const ast = this.parse(tokens)
    return this.interpret(ast)
  }

  /**
   * Compile source code to AST
   */
  compile(source: string, requireNamesteDai = true): ASTNode {
    const tokens = this.tokenize(source, requireNamesteDai)
    return this.parse(tokens)
  }
}

/**
 * Create a new Nepdai compiler instance
 */
export function createNepdaiCompiler(): NepdaiCompiler {
  return new NepdaiCompiler()
}
