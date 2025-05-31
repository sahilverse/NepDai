import type { Position } from "../types/token"

/**
 * Base Nepdai Exception
 */
export class NepdaiException extends Error {
  position?: Position

  constructor(message: string, position?: Position) {
    super(message)
    this.name = "NepdaiException"
    this.position = position
  }
}

/**
 * Lexer Exception
 */
export class LexerException extends NepdaiException {
  constructor(message: string, position?: Position) {
    super(message, position)
    this.name = "LexerException"
  }
}

/**
 * Parser Exception
 */
export class ParserException extends NepdaiException {
  constructor(message: string, position?: Position) {
    super(message, position)
    this.name = "ParserException"
  }
}

/**
 * Runtime Exception
 */
export class RuntimeException extends NepdaiException {
  constructor(message: string, position?: Position) {
    super(message, position)
    this.name = "RuntimeException"
  }
}

/**
 * Unexpected Character Exception
 */
export class UnexpectedCharacterException extends LexerException {
  constructor(character: string, position: Position) {
    super(`Unexpected character - K Lekhya Vai K Lekhya '${character}'`, position)
    this.name = "UnexpectedCharacterException"
  }
}

/**
 * Unexpected Token Exception
 */
export class UnexpectedTokenException extends ParserException {
  constructor(expected: string, actual: string, position?: Position) {
    super(`Unexpected token:\nTya "${expected}" Chahiyeko, Taile K Lekhis Vai`, position)
    this.name = "UnexpectedTokenException"
  }
}

/**
 * Undefined Variable Exception
 */
export class UndefinedVariableException extends RuntimeException {
  constructor(name: string, position?: Position) {
    super(`Undefined variable - Variable Define Garna Birsis Vai '${name}'`, position)
    this.name = "UndefinedVariableException"
  }
}

/**
 * Type Error Exception
 */
export class TypeErrorException extends RuntimeException {
  constructor(expected: string, actual: string, position?: Position) {
    super(`Type error - Yo Chahiyeko ${expected}, Yo Diyis Vai Taile ${actual}`, position)
    this.name = "TypeErrorException"
  }
}

/**
 * Break Exception - Used for control flow
 */
export class BreakException extends Error {
  constructor() {
    super("Break")
    this.name = "BreakException"
  }
}

/**
 * Continue Exception - Used for control flow
 */
export class ContinueException extends Error {
  constructor() {
    super("Continue")
    this.name = "ContinueException"
  }
}




