/**
 * Nepdai Runtime Value Types
 */
export enum ValueType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  NULL = "NULL",
  ARRAY = "ARRAY",
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

