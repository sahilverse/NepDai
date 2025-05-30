import {
  type RuntimeValue,
  ValueType,
  type NumberValue,
  type StringValue,
  type BooleanValue,
  type NullValue,
  type ArrayValue,
} from "@nepdai/shared"

/**
 * Create a number value
 */
export function createNumberValue(value: number): NumberValue {
  return { type: ValueType.NUMBER, value }
}

/**
 * Create a string value
 */
export function createStringValue(value: string): StringValue {
  return { type: ValueType.STRING, value }
}

/**
 * Create a boolean value
 */
export function createBooleanValue(value: boolean): BooleanValue {
  return { type: ValueType.BOOLEAN, value }
}

/**
 * Create a null value
 */
export function createNullValue(): NullValue {
  return { type: ValueType.NULL, value: null }
}

/**
 * Create an array value
 */
export function createArrayValue(elements: RuntimeValue[]): ArrayValue {
  return { type: ValueType.ARRAY, value: elements }
}

/**
 * Convert a runtime value to string for output
 */
export function valueToString(value: RuntimeValue): string {
  switch (value.type) {
    case ValueType.NUMBER:
      return value.value.toString()
    case ValueType.STRING:
      return value.value
    case ValueType.BOOLEAN:
      return value.value ? "thik" : "galat"
    case ValueType.NULL:
      return "khali"
    case ValueType.ARRAY:
      return "[" + value.value.map(valueToString).join(", ") + "]"
    default:
      return "unknown"
  }
}

/**
 * Check if a value is truthy in Nepdai
 */
export function isTruthy(value: RuntimeValue): boolean {
  switch (value.type) {
    case ValueType.NULL:
      return false
    case ValueType.BOOLEAN:
      return value.value
    case ValueType.NUMBER:
      return value.value !== 0
    case ValueType.STRING:
      return value.value.length > 0
    case ValueType.ARRAY:
      return value.value.length > 0
    default:
      return true
  }
}

/**
 * Check if two values are equal
 */
export function isEqual(left: RuntimeValue, right: RuntimeValue): boolean {
  if (left.type !== right.type) {
    return false
  }

  switch (left.type) {
    case ValueType.NUMBER:
    case ValueType.STRING:
    case ValueType.BOOLEAN:
      return left.value === right.value
    case ValueType.NULL:
      return true
    case ValueType.ARRAY:
      if (left.value.length !== right.value.length) {
        return false
      }
      for (let i = 0; i < left.value.length; i++) {
        if (!isEqual(left.value[i], right.value[i])) {
          return false
        }
      }
      return true
    default:
      return false
  }
}
