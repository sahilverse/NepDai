import {
  type ASTNode,
  NodeType,
  type ProgramNode,
  type VariableDeclarationNode,
  type ExpressionStatementNode,
  type PrintStatementNode,
  type IfStatementNode,
  type WhileStatementNode,
  type BlockStatementNode,
  type BreakStatementNode,
  type ContinueStatementNode,
  type BinaryExpressionNode,
  type UnaryExpressionNode,
  type UpdateExpressionNode,
  type AssignmentExpressionNode,
  type NumericLiteralNode,
  type StringLiteralNode,
  type BooleanLiteralNode,
  type NullLiteralNode,
  type IdentifierNode,
  type ArrayExpressionNode,
  type RuntimeValue,
  RuntimeException,
  BreakException,
  ContinueException,
} from "../../shared/src"
import { NepdaiEnvironment, createGlobalEnvironment } from "./environment"
import {
  createNumberValue,
  createStringValue,
  createBooleanValue,
  createNullValue,
  createArrayValue,
  valueToString,
  isTruthy,
} from "./values"
import {
  performBinaryOperation,
  performUnaryOperation,
  performUpdateOperation,
  performAssignmentOperation,
} from "./operations"

/**
 * Nepdai Interpreter
 */
export class NepdaiInterpreter {
  private environment: NepdaiEnvironment

  constructor(environment?: NepdaiEnvironment) {
    this.environment = environment || createGlobalEnvironment()
  }

  /**
   * Interpret an AST node
   */
  interpret(node: ASTNode): RuntimeValue {
    switch (node.type) {
      case NodeType.PROGRAM:
        return this.interpretProgram(node as ProgramNode)

      case NodeType.VARIABLE_DECLARATION:
        return this.interpretVariableDeclaration(node as VariableDeclarationNode)

      case NodeType.EXPRESSION_STATEMENT:
        return this.interpretExpressionStatement(node as ExpressionStatementNode)

      case NodeType.PRINT_STATEMENT:
        return this.interpretPrintStatement(node as PrintStatementNode)

      case NodeType.IF_STATEMENT:
        return this.interpretIfStatement(node as IfStatementNode)

      case NodeType.WHILE_STATEMENT:
        return this.interpretWhileStatement(node as WhileStatementNode)

      case NodeType.BLOCK_STATEMENT:
        return this.interpretBlockStatement(node as BlockStatementNode)

      case NodeType.BREAK_STATEMENT:
        return this.interpretBreakStatement(node as BreakStatementNode)

      case NodeType.CONTINUE_STATEMENT:
        return this.interpretContinueStatement(node as ContinueStatementNode)

      case NodeType.BINARY_EXPRESSION:
        return this.interpretBinaryExpression(node as BinaryExpressionNode)

      case NodeType.UNARY_EXPRESSION:
        return this.interpretUnaryExpression(node as UnaryExpressionNode)

      case NodeType.UPDATE_EXPRESSION:
        return this.interpretUpdateExpression(node as UpdateExpressionNode)

      case NodeType.ASSIGNMENT_EXPRESSION:
        return this.interpretAssignmentExpression(node as AssignmentExpressionNode)

      case NodeType.NUMERIC_LITERAL:
        return this.interpretNumericLiteral(node as NumericLiteralNode)

      case NodeType.STRING_LITERAL:
        return this.interpretStringLiteral(node as StringLiteralNode)

      case NodeType.BOOLEAN_LITERAL:
        return this.interpretBooleanLiteral(node as BooleanLiteralNode)

      case NodeType.NULL_LITERAL:
        return this.interpretNullLiteral(node as NullLiteralNode)

      case NodeType.IDENTIFIER:
        return this.interpretIdentifier(node as IdentifierNode)

      case NodeType.ARRAY_EXPRESSION:
        return this.interpretArrayExpression(node as ArrayExpressionNode)

      default:
        throw new RuntimeException(`Vai Node Type Milena ${(node as any).type}`)
    }
  }

  /**
   * Interpret a program node
   */
  private interpretProgram(node: ProgramNode): RuntimeValue {
    let result: RuntimeValue = createNullValue()

    for (const statement of node.body) {
      result = this.interpret(statement)
    }

    return result
  }

  /**
   * Interpret a variable declaration
   */
  private interpretVariableDeclaration(node: VariableDeclarationNode): RuntimeValue {
    const value = node.value ? this.interpret(node.value) : createNullValue()
    this.environment.define(node.identifier.name, value)
    return value
  }

  /**
   * Interpret an expression statement
   */
  private interpretExpressionStatement(node: ExpressionStatementNode): RuntimeValue {
    return this.interpret(node.expression)
  }

  /**
   * Interpret a print statement
   */
  private interpretPrintStatement(node: PrintStatementNode): RuntimeValue {
    const values = node.arguments.map((arg) => {
      const value = this.interpret(arg)
      return valueToString(value)
    })

    console.log(...values)
    return createNullValue()
  }

  /**
   * Interpret an if statement
   */
  private interpretIfStatement(node: IfStatementNode): RuntimeValue {
    const test = this.interpret(node.test)

    if (isTruthy(test)) {
      return this.interpret(node.consequent)
    } else if (node.alternate) {
      return this.interpret(node.alternate)
    }

    return createNullValue()
  }

  /**
   * Interpret a while statement
   */
  private interpretWhileStatement(node: WhileStatementNode): RuntimeValue {
    let result: RuntimeValue = createNullValue()

    try {
      while (isTruthy(this.interpret(node.test))) {
        try {
          result = this.interpret(node.body)
        } catch (error) {
          if (error instanceof ContinueException) {
            continue // Continue to next iteration
          }
          throw error // Re-throw other errors including BreakException
        }
      }
    } catch (error) {
      if (error instanceof BreakException) {
        // Break out of the loop
        return result
      }
      throw error // Re-throw other errors
    }

    return result
  }

  /**
   * Interpret a block statement
   */
  private interpretBlockStatement(node: BlockStatementNode): RuntimeValue {
    // Create a new environment for the block
    const blockEnv = new NepdaiEnvironment(this.environment)
    const prevEnv = this.environment
    this.environment = blockEnv

    let result: RuntimeValue = createNullValue()

    try {
      // Interpret each statement in the block
      for (const statement of node.body) {
        result = this.interpret(statement)
      }
    } finally {
      // Restore the previous environment
      this.environment = prevEnv
    }

    return result
  }

  /**
   * Interpret a break statement
   */
  private interpretBreakStatement(node: BreakStatementNode): RuntimeValue {
    throw new BreakException()
  }

  /**
   * Interpret a continue statement
   */
  private interpretContinueStatement(node: ContinueStatementNode): RuntimeValue {
    throw new ContinueException()
  }

  /**
   * Interpret a binary expression
   */
  private interpretBinaryExpression(node: BinaryExpressionNode): RuntimeValue {
    const left = this.interpret(node.left)
    const right = this.interpret(node.right)

    return performBinaryOperation(node.operator, left, right)
  }

  /**
   * Interpret a unary expression
   */
  private interpretUnaryExpression(node: UnaryExpressionNode): RuntimeValue {
    const operand = this.interpret(node.argument)

    return performUnaryOperation(node.operator, operand)
  }

  /**
   * Interpret an update expression
   */
  private interpretUpdateExpression(node: UpdateExpressionNode): RuntimeValue {
    if (node.argument.type !== NodeType.IDENTIFIER) {
      throw new RuntimeException("Left-hand Side Check Gara Solti Update Expression Ma")
    }

    const identifier = node.argument as IdentifierNode
    const variable = this.environment.lookup(identifier.name)
    const result = performUpdateOperation(node.operator, variable, node.prefix)

    // Update the variable in the environment
    this.environment.assign(identifier.name, variable)

    return result
  }

  /**
   * Interpret an assignment expression
   */
  private interpretAssignmentExpression(node: AssignmentExpressionNode): RuntimeValue {
    if (node.left.type !== NodeType.IDENTIFIER) {
      throw new RuntimeException("Left-hand Side Check Gara Solti Assignment Expression Ma")
    }

    const identifier = node.left as IdentifierNode
    const right = this.interpret(node.right)

    if (node.operator === "=") {
      this.environment.assign(identifier.name, right)
      return right
    } else {
      const left = this.environment.lookup(identifier.name)
      const result = performAssignmentOperation(node.operator, left, right)
      this.environment.assign(identifier.name, result)
      return result
    }
  }



  /**
   * Interpret a numeric literal
   */
  private interpretNumericLiteral(node: NumericLiteralNode): RuntimeValue {
    return createNumberValue(node.value)
  }

  /**
   * Interpret a string literal
   */
  private interpretStringLiteral(node: StringLiteralNode): RuntimeValue {
    return createStringValue(node.value)
  }

  /**
   * Interpret a boolean literal
   */
  private interpretBooleanLiteral(node: BooleanLiteralNode): RuntimeValue {
    return createBooleanValue(node.value)
  }

  /**
   * Interpret a null literal
   */
  private interpretNullLiteral(node: NullLiteralNode): RuntimeValue {
    return createNullValue()
  }

  /**
   * Interpret an identifier
   */
  private interpretIdentifier(node: IdentifierNode): RuntimeValue {
    return this.environment.lookup(node.name)
  }

  /**
   * Interpret an array expression
   */
  private interpretArrayExpression(node: ArrayExpressionNode): RuntimeValue {
    const elements = node.elements.map((element) => this.interpret(element))
    return createArrayValue(elements)
  }
}
