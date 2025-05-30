import { type Environment, type RuntimeValue, ValueType, UndefinedVariableException } from "@nepdai/shared"

/**
 * Nepdai Runtime Environment
 */
export class NepdaiEnvironment implements Environment {
  parent?: Environment
  variables: Map<string, RuntimeValue>

  constructor(parent?: Environment) {
    this.parent = parent
    this.variables = new Map()
  }

  /**
   * Define a variable in the current scope
   */
  define(name: string, value: RuntimeValue): void {
    this.variables.set(name, value)
  }

  /**
   * Assign a value to an existing variable
   */
  assign(name: string, value: RuntimeValue): void {
    // Check if the variable exists in the current scope
    if (this.variables.has(name)) {
      this.variables.set(name, value)
      return
    }

    // Check if the variable exists in a parent scope
    if (this.parent) {
      this.parent.assign(name, value)
      return
    }

    // Variable doesn't exist
    throw new UndefinedVariableException(name)
  }

  /**
   * Lookup a variable in the current scope or parent scopes
   */
  lookup(name: string): RuntimeValue {
    // Check if the variable exists in the current scope
    if (this.variables.has(name)) {
      return this.variables.get(name)!
    }

    // Check if the variable exists in a parent scope
    if (this.parent) {
      return this.parent.lookup(name)
    }

    // Variable doesn't exist
    throw new UndefinedVariableException(name)
  }
}

/**
 * Create a global environment with built-in values
 */
export function createGlobalEnvironment(): NepdaiEnvironment {
  const env = new NepdaiEnvironment()

  // Define built-in boolean values
  env.define("thik", { type: ValueType.BOOLEAN, value: true })
  env.define("galat", { type: ValueType.BOOLEAN, value: false })
  env.define("khali", { type: ValueType.NULL, value: null })

  return env
}
