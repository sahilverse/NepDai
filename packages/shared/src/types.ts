/**
 * Token types for the lexical analysis
 */
export enum TokenType {
    NUMBER = 'number',
    IDENTIFIER = 'identifier',
    STRING = 'string',
    TEMPLATE = 'template',
    COMMA = 'comma',
    KEYWORD = 'keyword',
    OPERATOR = 'operator',
    SEMICOLON = 'semicolon'
}

/**
 * Token interface representing a lexical token
 */
export interface Token {
    type: TokenType;
    value?: string | number;
    quasis?: string[];
    expressions?: string[];
    line?: number;
    column?: number;
}

/**
 * AST node types for the parser
 */
export enum NodeType {
    PROGRAM = 'Program',
    VARIABLE_DECLARATION = 'VariableDeclaration',
    PRINT_STATEMENT = 'PrintStatement',
    NUMERIC_LITERAL = 'NumericLiteral',
    STRING_LITERAL = 'StringLiteral',
    IDENTIFIER = 'Identifier',
    BINARY_EXPRESSION = 'BinaryExpression',
    UNARY_EXPRESSION = 'UnaryExpression',
    UPDATE_EXPRESSION = 'UpdateExpression',
    ASSIGNMENT_EXPRESSION = 'AssignmentExpression',
    TEMPLATE_LITERAL = 'TemplateLiteral',
    IF_STATEMENT = 'IfStatement',
    BLOCK_STATEMENT = 'BlockStatement'
}

/**
 * Base AST node interface
 */
export interface BaseNode {
    type: NodeType;
    line?: number;
    column?: number;
}

/**
 * Program node representing the entire program
 */
export interface ProgramNode extends BaseNode {
    type: NodeType.PROGRAM;
    body: ASTNode[];
}

/**
 * Variable declaration node
 */
export interface VariableDeclarationNode extends BaseNode {
    type: NodeType.VARIABLE_DECLARATION;
    name: string;
    value: string | number;
}

/**
 * Print statement node
 */
export interface PrintStatementNode extends BaseNode {
    type: NodeType.PRINT_STATEMENT;
    expressions: ASTNode[];
}

/**
 * Numeric literal node
 */
export interface NumericLiteralNode extends BaseNode {
    type: NodeType.NUMERIC_LITERAL;
    value: number;
}

/**
 * String literal node
 */
export interface StringLiteralNode extends BaseNode {
    type: NodeType.STRING_LITERAL;
    value: string;
}

/**
 * Identifier node
 */
export interface IdentifierNode extends BaseNode {
    type: NodeType.IDENTIFIER;
    name: string;
}

/**
 * Binary expression node
 */
export interface BinaryExpressionNode extends BaseNode {
    type: NodeType.BINARY_EXPRESSION;
    operator: string;
    left: ASTNode;
    right: ASTNode;
}

/**
 * Unary expression node
 */
export interface UnaryExpressionNode extends BaseNode {
    type: NodeType.UNARY_EXPRESSION;
    operator: string;
    argument: ASTNode;
}

/**
 * Update expression node (++, --)
 */
export interface UpdateExpressionNode extends BaseNode {
    type: NodeType.UPDATE_EXPRESSION;
    operator: string;
    argument: ASTNode;
    prefix: boolean;
}

/**
 * Assignment expression node
 */
export interface AssignmentExpressionNode extends BaseNode {
    type: NodeType.ASSIGNMENT_EXPRESSION;
    operator: string;
    left: ASTNode;
    right: ASTNode;
}

/**
 * Template literal node
 */
export interface TemplateLiteralNode extends BaseNode {
    type: NodeType.TEMPLATE_LITERAL;
    quasis: string[];
    expressions: ASTNode[];
}

/**
 * If statement node
 */
export interface IfStatementNode extends BaseNode {
    type: NodeType.IF_STATEMENT;
    test: ASTNode;
    consequent: ASTNode;
    alternate?: ASTNode;
}

/**
 * Block statement node
 */
export interface BlockStatementNode extends BaseNode {
    type: NodeType.BLOCK_STATEMENT;
    body: ASTNode[];
}

/**
 * Union type for all AST nodes
 */
export type ASTNode =
    | ProgramNode
    | VariableDeclarationNode
    | PrintStatementNode
    | NumericLiteralNode
    | StringLiteralNode
    | IdentifierNode
    | BinaryExpressionNode
    | UnaryExpressionNode
    | UpdateExpressionNode
    | AssignmentExpressionNode
    | TemplateLiteralNode
    | IfStatementNode
    | BlockStatementNode;

/**
 * Operator precedence map
 */
export const OPERATOR_PRECEDENCE: Record<string, number> = {
    '++': 5, // Increment
    '--': 5, // Decrement
    '**': 4, // Exponentiation
    '*': 3,  // Multiplication
    '/': 3,  // Division
    '%': 3,  // Modulo
    '+': 2,  // Addition
    '-': 2,  // Subtraction
    '<': 1,  // Less than
    '<=': 1, // Less than or equal
    '>': 1,  // Greater than
    '>=': 1, // Greater than or equal
    '==': 0, // Equal
    '!=': 0, // Not equal
};

/**
 * Assignment operators
 */
export const ASSIGNMENT_OPERATORS = ['=', '+=', '-=', '*=', '/='];

/**
 * Comparison operators
 */
export const COMPARISON_OPERATORS = ['==', '!=', '>', '<', '>=', '<='];

/**
 * Update operators
 */
export const UPDATE_OPERATORS = ['++', '--'];

/**
 * Keywords in the Nepdai language
 */
export const KEYWORDS = ['solti', 'lekh', 'yadi', 'bhane', 'natra'];

/**
 * Position interface for tracking line and column numbers
 */
export interface Position {
    line: number;
    column: number;
}

/**
 * Error interface for compiler errors
 */
export interface CompilerError extends Error {
    position?: Position;
}