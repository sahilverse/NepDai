/**
 * Nepdai AST Node Types
 */
export enum NodeType {
  // Program
  PROGRAM = "PROGRAM",

  // Statements
  VARIABLE_DECLARATION = "VARIABLE_DECLARATION",
  EXPRESSION_STATEMENT = "EXPRESSION_STATEMENT",
  PRINT_STATEMENT = "PRINT_STATEMENT",
  IF_STATEMENT = "IF_STATEMENT",
  WHILE_STATEMENT = "WHILE_STATEMENT",
  FOR_STATEMENT = "FOR_STATEMENT",
  FUNCTION_DECLARATION = "FUNCTION_DECLARATION",
  RETURN_STATEMENT = "RETURN_STATEMENT",
  BLOCK_STATEMENT = "BLOCK_STATEMENT",

  // Expressions
  BINARY_EXPRESSION = "BINARY_EXPRESSION",
  UNARY_EXPRESSION = "UNARY_EXPRESSION",
  UPDATE_EXPRESSION = "UPDATE_EXPRESSION",
  ASSIGNMENT_EXPRESSION = "ASSIGNMENT_EXPRESSION",
  CALL_EXPRESSION = "CALL_EXPRESSION",
  MEMBER_EXPRESSION = "MEMBER_EXPRESSION",

  // Literals
  NUMERIC_LITERAL = "NUMERIC_LITERAL",
  STRING_LITERAL = "STRING_LITERAL",
  BOOLEAN_LITERAL = "BOOLEAN_LITERAL",
  NULL_LITERAL = "NULL_LITERAL",
  IDENTIFIER = "IDENTIFIER",

  // Array and Object
  ARRAY_EXPRESSION = "ARRAY_EXPRESSION",
  OBJECT_EXPRESSION = "OBJECT_EXPRESSION",
  PROPERTY = "PROPERTY",
}

/**
 * Base AST Node
 */
export interface ASTNode {
  type: NodeType
  position?: any // Placeholder for Position type
}

/**
 * Program Node
 */
export interface ProgramNode extends ASTNode {
  type: NodeType.PROGRAM
  body: ASTNode[]
}

/**
 * Variable Declaration Node
 */
export interface VariableDeclarationNode extends ASTNode {
  type: NodeType.VARIABLE_DECLARATION
  identifier: IdentifierNode
  value?: ASTNode
}

/**
 * Expression Statement Node
 */
export interface ExpressionStatementNode extends ASTNode {
  type: NodeType.EXPRESSION_STATEMENT
  expression: ASTNode
}

/**
 * Print Statement Node
 */
export interface PrintStatementNode extends ASTNode {
  type: NodeType.PRINT_STATEMENT
  arguments: ASTNode[]
}

/**
 * If Statement Node
 */
export interface IfStatementNode extends ASTNode {
  type: NodeType.IF_STATEMENT
  test: ASTNode
  consequent: ASTNode
  alternate?: ASTNode
}

/**
 * While Statement Node
 */
export interface WhileStatementNode extends ASTNode {
  type: NodeType.WHILE_STATEMENT
  test: ASTNode
  body: ASTNode
}

/**
 * Block Statement Node
 */
export interface BlockStatementNode extends ASTNode {
  type: NodeType.BLOCK_STATEMENT
  body: ASTNode[]
}

/**
 * Binary Expression Node
 */
export interface BinaryExpressionNode extends ASTNode {
  type: NodeType.BINARY_EXPRESSION
  left: ASTNode
  operator: string
  right: ASTNode
}

/**
 * Unary Expression Node
 */
export interface UnaryExpressionNode extends ASTNode {
  type: NodeType.UNARY_EXPRESSION
  operator: string
  argument: ASTNode
  prefix: boolean
}

/**
 * Update Expression Node
 */
export interface UpdateExpressionNode extends ASTNode {
  type: NodeType.UPDATE_EXPRESSION
  operator: string
  argument: ASTNode
  prefix: boolean
}

/**
 * Assignment Expression Node
 */
export interface AssignmentExpressionNode extends ASTNode {
  type: NodeType.ASSIGNMENT_EXPRESSION
  left: ASTNode
  operator: string
  right: ASTNode
}

/**
 * Call Expression Node
 */
export interface CallExpressionNode extends ASTNode {
  type: NodeType.CALL_EXPRESSION
  callee: ASTNode
  arguments: ASTNode[]
}

/**
 * Numeric Literal Node
 */
export interface NumericLiteralNode extends ASTNode {
  type: NodeType.NUMERIC_LITERAL
  value: number
}

/**
 * String Literal Node
 */
export interface StringLiteralNode extends ASTNode {
  type: NodeType.STRING_LITERAL
  value: string
}

/**
 * Boolean Literal Node
 */
export interface BooleanLiteralNode extends ASTNode {
  type: NodeType.BOOLEAN_LITERAL
  value: boolean
}

/**
 * Null Literal Node
 */
export interface NullLiteralNode extends ASTNode {
  type: NodeType.NULL_LITERAL
  value: null
}

/**
 * Identifier Node
 */
export interface IdentifierNode extends ASTNode {
  type: NodeType.IDENTIFIER
  name: string
}

/**
 * Array Expression Node
 */
export interface ArrayExpressionNode extends ASTNode {
  type: NodeType.ARRAY_EXPRESSION
  elements: ASTNode[]
}
