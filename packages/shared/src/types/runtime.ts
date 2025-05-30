/**
 * Nepdai Runtime Value Types
 */
export enum ValueType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  NULL = "NULL",
  FUNCTION = "FUNCTION",
  ARRAY = "ARRAY",
  OBJECT = "OBJECT",
}

/**
 * Runtime Value
 */
export interface RuntimeValue {
  type: ValueType
  value: any
}

/**
 * Number Value
 */
export interface NumberValue extends RuntimeValue {
  type: ValueType.NUMBER
  value: number
}

/**
 * String Value
 */
export interface StringValue extends RuntimeValue {
  type: ValueType.STRING
  value: string
}

/**
 * Boolean Value
 */
export interface BooleanValue extends RuntimeValue {
  type: ValueType.BOOLEAN
  value: boolean
}

/**
 * Null Value
 */
export interface NullValue extends RuntimeValue {
  type: ValueType.NULL
  value: null
}

/**
 * Function Value
 */
export interface FunctionValue extends RuntimeValue {
  type: ValueType.FUNCTION
  value: {
    parameters: string[]
    body: any // Placeholder for ASTNode, assuming it needs to be imported
    closure: Environment
  }
}

/**
 * Array Value
 */
export interface ArrayValue extends RuntimeValue {
  type: ValueType.ARRAY
  value: RuntimeValue[]
}

/**
 * Environment for variable storage
 */
export interface Environment {
  parent?: Environment
  variables: Map<string, RuntimeValue>
  define(name: string, value: RuntimeValue): void
  assign(name: string, value: RuntimeValue): void
  lookup(name: string): RuntimeValue
}

// Import ASTNode if it's needed from another module
// import { ASTNode } from './path-to-astnode';
