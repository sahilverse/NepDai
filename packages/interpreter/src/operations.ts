import { type RuntimeValue, ValueType, TypeErrorException } from "@nepdai/shared"
import { createNumberValue, createStringValue, createBooleanValue, isTruthy, isEqual } from "./values"

/**
 * Perform binary operations
 */
export function performBinaryOperation(operator: string, left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  switch (operator) {
    case "+":
      return performAddition(left, right)
    case "-":
      return performSubtraction(left, right)
    case "*":
      return performMultiplication(left, right)
    case "/":
      return performDivision(left, right)
    case "%":
      return performModulo(left, right)
    case "**":
      return performPower(left, right)
    case "==":
      return createBooleanValue(isEqual(left, right))
    case "!=":
      return createBooleanValue(!isEqual(left, right))
    case "<":
      return performLessThan(left, right)
    case ">":
      return performGreaterThan(left, right)
    case "<=":
      return performLessEqual(left, right)
    case ">=":
      return performGreaterEqual(left, right)
    case "&&":
      return createBooleanValue(isTruthy(left) && isTruthy(right))
    case "||":
      return createBooleanValue(isTruthy(left) || isTruthy(right))
    default:
      throw new TypeErrorException(`Unknown binary operator: ${operator}`, "binary operation")
  }
}

/**
 * Perform unary operations
 */
export function performUnaryOperation(operator: string, operand: RuntimeValue): RuntimeValue {
  switch (operator) {
    case "-":
      if (operand.type !== ValueType.NUMBER) {
        throw new TypeErrorException("number", operand.type)
      }
      return createNumberValue(-operand.value)
    case "!":
      return createBooleanValue(!isTruthy(operand))
    default:
      throw new TypeErrorException(`Unknown unary operator: ${operator}`, "unary operation")
  }
}

/**
 * Perform update operations (++ and --)
 */
export function performUpdateOperation(operator: string, operand: RuntimeValue, prefix: boolean): RuntimeValue {
  if (operand.type !== ValueType.NUMBER) {
    throw new TypeErrorException("number", operand.type)
  }

  const oldValue = operand.value
  const newValue = operator === "++" ? oldValue + 1 : oldValue - 1

  // Update the operand
  operand.value = newValue

  // Return the appropriate value based on prefix/postfix
  return createNumberValue(prefix ? newValue : oldValue)
}

/**
 * Perform assignment operations
 */
export function performAssignmentOperation(operator: string, left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  switch (operator) {
    case "=":
      return right
    case "+=":
      return performAddition(left, right)
    case "-=":
      return performSubtraction(left, right)
    case "*=":
      return performMultiplication(left, right)
    case "/=":
      return performDivision(left, right)
    default:
      throw new TypeErrorException(`Unknown assignment operator: ${operator}`, "assignment operation")
  }
}

/**
 * Perform addition
 */
function performAddition(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  // String concatenation
  if (left.type === ValueType.STRING || right.type === ValueType.STRING) {
    const leftStr = left.type === ValueType.STRING ? left.value : left.value.toString()
    const rightStr = right.type === ValueType.STRING ? right.value : right.value.toString()
    return createStringValue(leftStr + rightStr)
  }

  // Numeric addition
  if (left.type === ValueType.NUMBER && right.type === ValueType.NUMBER) {
    return createNumberValue(left.value + right.value)
  }

  throw new TypeErrorException("number or string", `${left.type} and ${right.type}`)
}

/**
 * Perform subtraction
 */
function performSubtraction(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  if (left.type !== ValueType.NUMBER || right.type !== ValueType.NUMBER) {
    throw new TypeErrorException("number", `${left.type} and ${right.type}`)
  }

  return createNumberValue(left.value - right.value)
}

/**
 * Perform multiplication
 */
function performMultiplication(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  if (left.type !== ValueType.NUMBER || right.type !== ValueType.NUMBER) {
    throw new TypeErrorException("number", `${left.type} and ${right.type}`)
  }

  return createNumberValue(left.value * right.value)
}

/**
 * Perform division
 */
function performDivision(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  if (left.type !== ValueType.NUMBER || right.type !== ValueType.NUMBER) {
    throw new TypeErrorException("number", `${left.type} and ${right.type}`)
  }

  if (right.value === 0) {
    throw new TypeErrorException("Division by zero", "division operation")
  }

  return createNumberValue(left.value / right.value)
}

/**
 * Perform modulo
 */
function performModulo(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  if (left.type !== ValueType.NUMBER || right.type !== ValueType.NUMBER) {
    throw new TypeErrorException("number", `${left.type} and ${right.type}`)
  }

  if (right.value === 0) {
    throw new TypeErrorException("Division by zero", "modulo operation")
  }

  return createNumberValue(left.value % right.value)
}

/**
 * Perform power operation
 */
function performPower(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  if (left.type !== ValueType.NUMBER || right.type !== ValueType.NUMBER) {
    throw new TypeErrorException("number", `${left.type} and ${right.type}`)
  }

  return createNumberValue(Math.pow(left.value, right.value))
}

/**
 * Perform less than comparison
 */
function performLessThan(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  if (left.type !== ValueType.NUMBER || right.type !== ValueType.NUMBER) {
    throw new TypeErrorException("number", `${left.type} and ${right.type}`)
  }

  return createBooleanValue(left.value < right.value)
}

/**
 * Perform greater than comparison
 */
function performGreaterThan(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  if (left.type !== ValueType.NUMBER || right.type !== ValueType.NUMBER) {
    throw new TypeErrorException("number", `${left.type} and ${right.type}`)
  }

  return createBooleanValue(left.value > right.value)
}

/**
 * Perform less than or equal comparison
 */
function performLessEqual(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  if (left.type !== ValueType.NUMBER || right.type !== ValueType.NUMBER) {
    throw new TypeErrorException("number", `${left.type} and ${right.type}`)
  }

  return createBooleanValue(left.value <= right.value)
}

/**
 * Perform greater than or equal comparison
 */
function performGreaterEqual(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
  if (left.type !== ValueType.NUMBER || right.type !== ValueType.NUMBER) {
    throw new TypeErrorException("number", `${left.type} and ${right.type}`)
  }

  return createBooleanValue(left.value >= right.value)
}
