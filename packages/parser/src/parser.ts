import {
  type Token,
  TokenType,
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
  type CallExpressionNode,
  type NumericLiteralNode,
  type StringLiteralNode,
  type BooleanLiteralNode,
  type NullLiteralNode,
  type IdentifierNode,
  type ArrayExpressionNode,
  UnexpectedTokenException,
} from "../../shared/src"

/**
 * Nepdai Parser - Parses tokens into an AST
 */
export class NepdaiParser {
  private tokens: Token[]
  private current: number

  constructor(tokens: Token[]) {
    this.tokens = tokens
    this.current = 0
  }

  /**
   * Parse tokens into an AST
   */
  parse(): ProgramNode {
    const body: ASTNode[] = []

    while (!this.isAtEnd()) {
      // Skip newlines at the top level
      if (this.check(TokenType.NEWLINE)) {
        this.advance()
        continue
      }

      const statement = this.parseStatement()
      if (statement) {
        body.push(statement)
      }
    }

    return {
      type: NodeType.PROGRAM,
      body,
    }
  }

  /**
   * Parse a statement
   */
  private parseStatement(): ASTNode | null {
    try {
      // Variable declaration: solti name = value;
      if (this.match(TokenType.SOLTI)) {
        return this.parseVariableDeclaration()
      }

      // Print statement: lekh expression1, expression2, ...;
      if (this.match(TokenType.LEKH)) {
        return this.parsePrintStatement()
      }

      // If statement: yadi condition bhane { ... } natra { ... }
      if (this.match(TokenType.YADI)) {
        return this.parseIfStatement()
      }

      // While statement: jaba samma condition { ... }
      if (this.match(TokenType.JABA_SAMMA)) {
        return this.parseWhileStatement()
      }

      // Break statement: vai vayo rokki;
      if (this.match(TokenType.VAI_VAYO_ROKKI)) {
        return this.parseBreakStatement()
      }

      // Continue statement: aghi badh vai;
      if (this.match(TokenType.AGHI_BADH_VAI)) {
        return this.parseContinueStatement()
      }

      // Block statement: { ... }
      if (this.check(TokenType.LEFT_BRACE)) {
        return this.parseBlockStatement()
      }

      // Expression statement
      return this.parseExpressionStatement()
    } catch (error) {
      // Synchronize on error
      this.synchronize()
      throw error
    }
  }

  /**
   * Parse variable declaration
   */
  private parseVariableDeclaration(): VariableDeclarationNode {
    const identifier = this.consume(TokenType.IDENTIFIER, "Expected variable name")

    let value: ASTNode | undefined

    if (this.match(TokenType.ASSIGN)) {
      value = this.parseExpression()
    }

    this.consume(TokenType.SEMICOLON, "Expected ';' after variable declaration")

    return {
      type: NodeType.VARIABLE_DECLARATION,
      identifier: {
        type: NodeType.IDENTIFIER,
        name: identifier.value,
      },
      value,
    }
  }

  /**
   * Parse print statement
   */
  private parsePrintStatement(): PrintStatementNode {
    const args: ASTNode[] = []

    if (!this.check(TokenType.SEMICOLON)) {
      do {
        args.push(this.parseExpression())
      } while (this.match(TokenType.COMMA))
    }

    this.consume(TokenType.SEMICOLON, "Expected ';' after print statement")

    return {
      type: NodeType.PRINT_STATEMENT,
      arguments: args,
    }
  }

  /**
   * Parse if statement
   */
  private parseIfStatement(): IfStatementNode {
    const test = this.parseExpression()

    this.consume(TokenType.BHANE, "Expected 'bhane' after if condition")

    const consequent = this.parseStatement()
    if (!consequent) {
      throw new UnexpectedTokenException("statement", "null", this.peek().position)
    }

    let alternate: ASTNode | undefined
    if (this.match(TokenType.NATRA)) {
      const alternateStatement = this.parseStatement()
      if (alternateStatement) {
        alternate = alternateStatement
      }
    }

    return {
      type: NodeType.IF_STATEMENT,
      test,
      consequent,
      alternate,
    }
  }

  /**
   * Parse while statement
   */
  private parseWhileStatement(): WhileStatementNode {
    const test = this.parseExpression()
    const body = this.parseStatement()

    if (!body) {
      throw new UnexpectedTokenException("statement", "null", this.peek().position)
    }

    return {
      type: NodeType.WHILE_STATEMENT,
      test,
      body,
    }
  }

  /**
   * Parse break statement
   */
  private parseBreakStatement(): BreakStatementNode {
    this.consume(TokenType.SEMICOLON, "Expected ';' after break statement")

    return {
      type: NodeType.BREAK_STATEMENT,
    }
  }

  /**
   * Parse continue statement
   */
  private parseContinueStatement(): ContinueStatementNode {
    this.consume(TokenType.SEMICOLON, "Expected ';' after continue statement")

    return {
      type: NodeType.CONTINUE_STATEMENT,
    }
  }

  /**
   * Parse block statement
   */
  private parseBlockStatement(): BlockStatementNode {
    this.consume(TokenType.LEFT_BRACE, "Expected '{'")

    const body: ASTNode[] = []

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      // Skip newlines inside blocks
      if (this.check(TokenType.NEWLINE)) {
        this.advance()
        continue
      }

      const statement = this.parseStatement()
      if (statement) {
        body.push(statement)
      }
    }

    this.consume(TokenType.RIGHT_BRACE, "Expected '}'")

    return {
      type: NodeType.BLOCK_STATEMENT,
      body,
    }
  }

  /**
   * Parse expression statement
   */
  private parseExpressionStatement(): ExpressionStatementNode {
    const expression = this.parseExpression()
    this.consume(TokenType.SEMICOLON, "Expected ';' after expression")

    return {
      type: NodeType.EXPRESSION_STATEMENT,
      expression,
    }
  }

  /**
   * Parse expression
   */
  private parseExpression(): ASTNode {
    return this.parseAssignment()
  }

  /**
   * Parse assignment expression
   */
  private parseAssignment(): ASTNode {
    const expr = this.parseLogicalOr()

    if (
      this.match(
        TokenType.ASSIGN,
        TokenType.PLUS_ASSIGN,
        TokenType.MINUS_ASSIGN,
        TokenType.MULTIPLY_ASSIGN,
        TokenType.DIVIDE_ASSIGN,
      )
    ) {
      const operator = this.previous().lexeme!
      const right = this.parseAssignment()

      return {
        type: NodeType.ASSIGNMENT_EXPRESSION,
        left: expr,
        operator,
        right,
      } as AssignmentExpressionNode
    }

    return expr
  }

  /**
   * Parse logical OR expression
   */
  private parseLogicalOr(): ASTNode {
    let expr = this.parseLogicalAnd()

    while (this.match(TokenType.OR)) {
      const operator = this.previous().lexeme!
      const right = this.parseLogicalAnd()

      expr = {
        type: NodeType.BINARY_EXPRESSION,
        left: expr,
        operator,
        right,
      } as BinaryExpressionNode
    }

    return expr
  }

  /**
   * Parse logical AND expression
   */
  private parseLogicalAnd(): ASTNode {
    let expr = this.parseEquality()

    while (this.match(TokenType.AND)) {
      const operator = this.previous().lexeme!
      const right = this.parseEquality()

      expr = {
        type: NodeType.BINARY_EXPRESSION,
        left: expr,
        operator,
        right,
      } as BinaryExpressionNode
    }

    return expr
  }

  /**
   * Parse equality expression
   */
  private parseEquality(): ASTNode {
    let expr = this.parseComparison()

    while (this.match(TokenType.EQUAL, TokenType.NOT_EQUAL)) {
      const operator = this.previous().lexeme!
      const right = this.parseComparison()

      expr = {
        type: NodeType.BINARY_EXPRESSION,
        left: expr,
        operator,
        right,
      } as BinaryExpressionNode
    }

    return expr
  }

  /**
   * Parse comparison expression
   */
  private parseComparison(): ASTNode {
    let expr = this.parseTerm()

    while (this.match(TokenType.GREATER_THAN, TokenType.GREATER_EQUAL, TokenType.LESS_THAN, TokenType.LESS_EQUAL)) {
      const operator = this.previous().lexeme!
      const right = this.parseTerm()

      expr = {
        type: NodeType.BINARY_EXPRESSION,
        left: expr,
        operator,
        right,
      } as BinaryExpressionNode
    }

    return expr
  }

  /**
   * Parse term expression (addition/subtraction)
   */
  private parseTerm(): ASTNode {
    let expr = this.parseFactor()

    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.previous().lexeme!
      const right = this.parseFactor()

      expr = {
        type: NodeType.BINARY_EXPRESSION,
        left: expr,
        operator,
        right,
      } as BinaryExpressionNode
    }

    return expr
  }

  /**
   * Parse factor expression (multiplication/division/modulo)
   */
  private parseFactor(): ASTNode {
    let expr = this.parsePower()

    while (this.match(TokenType.MULTIPLY, TokenType.DIVIDE, TokenType.MODULO)) {
      const operator = this.previous().lexeme!
      const right = this.parsePower()

      expr = {
        type: NodeType.BINARY_EXPRESSION,
        left: expr,
        operator,
        right,
      } as BinaryExpressionNode
    }

    return expr
  }

  /**
   * Parse power expression
   */
  private parsePower(): ASTNode {
    let expr = this.parseUnary()

    while (this.match(TokenType.POWER)) {
      const operator = this.previous().lexeme!
      const right = this.parseUnary()

      expr = {
        type: NodeType.BINARY_EXPRESSION,
        left: expr,
        operator,
        right,
      } as BinaryExpressionNode
    }

    return expr
  }

  /**
   * Parse unary expression
   */
  private parseUnary(): ASTNode {
    if (this.match(TokenType.NOT, TokenType.MINUS)) {
      const operator = this.previous().lexeme!
      const right = this.parseUnary()

      return {
        type: NodeType.UNARY_EXPRESSION,
        operator,
        argument: right,
        prefix: true,
      } as UnaryExpressionNode
    }

    return this.parsePostfix()
  }

  /**
   * Parse postfix expression (increment/decrement)
   */
  private parsePostfix(): ASTNode {
    const expr = this.parseCall()

    if (this.match(TokenType.INCREMENT, TokenType.DECREMENT)) {
      const operator = this.previous().lexeme!

      return {
        type: NodeType.UPDATE_EXPRESSION,
        operator,
        argument: expr,
        prefix: false,
      } as UpdateExpressionNode
    }

    return expr
  }

  /**
   * Parse call expression
   */
  private parseCall(): ASTNode {
    let expr = this.parsePrimary()

    while (true) {
      if (this.match(TokenType.LEFT_PAREN)) {
        expr = this.finishCall(expr)
      } else {
        break
      }
    }

    return expr
  }

  /**
   * Finish parsing a call expression
   */
  private finishCall(callee: ASTNode): CallExpressionNode {
    const args: ASTNode[] = []

    if (!this.check(TokenType.RIGHT_PAREN)) {
      do {
        args.push(this.parseExpression())
      } while (this.match(TokenType.COMMA))
    }

    this.consume(TokenType.RIGHT_PAREN, "Expected ')' after arguments")

    return {
      type: NodeType.CALL_EXPRESSION,
      callee,
      arguments: args,
    }
  }

  /**
   * Parse primary expression
   */
  private parsePrimary(): ASTNode {
    // Boolean literals
    if (this.match(TokenType.THIK)) {
      return {
        type: NodeType.BOOLEAN_LITERAL,
        value: true,
      } as BooleanLiteralNode
    }

    if (this.match(TokenType.GALAT)) {
      return {
        type: NodeType.BOOLEAN_LITERAL,
        value: false,
      } as BooleanLiteralNode
    }

    // Null literal
    if (this.match(TokenType.KHALI)) {
      return {
        type: NodeType.NULL_LITERAL,
        value: null,
      } as NullLiteralNode
    }

    // Number literal
    if (this.match(TokenType.NUMBER)) {
      return {
        type: NodeType.NUMERIC_LITERAL,
        value: this.previous().value,
      } as NumericLiteralNode
    }

    // String literal
    if (this.match(TokenType.STRING)) {
      return {
        type: NodeType.STRING_LITERAL,
        value: this.previous().value,
      } as StringLiteralNode
    }

    // Identifier
    if (this.match(TokenType.IDENTIFIER)) {
      return {
        type: NodeType.IDENTIFIER,
        name: this.previous().value,
      } as IdentifierNode
    }

    // Grouped expression
    if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.parseExpression()
      this.consume(TokenType.RIGHT_PAREN, "Expected ')' after expression")
      return expr
    }

    // Array literal
    if (this.match(TokenType.LEFT_BRACKET)) {
      const elements: ASTNode[] = []

      if (!this.check(TokenType.RIGHT_BRACKET)) {
        do {
          elements.push(this.parseExpression())
        } while (this.match(TokenType.COMMA))
      }

      this.consume(TokenType.RIGHT_BRACKET, "Expected ']' after array elements")

      return {
        type: NodeType.ARRAY_EXPRESSION,
        elements,
      } as ArrayExpressionNode
    }

    throw new UnexpectedTokenException("expression", this.peek().lexeme || this.peek().type, this.peek().position)
  }

  /**
   * Check if current token matches any of the given types
   */
  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance()
        return true
      }
    }
    return false
  }

  /**
   * Check if current token is of given type
   */
  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false
    return this.peek().type === type
  }

  /**
   * Advance to next token
   */
  private advance(): Token {
    if (!this.isAtEnd()) this.current++
    return this.previous()
  }

  /**
   * Check if we're at the end of tokens
   */
  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF
  }

  /**
   * Get current token
   */
  private peek(): Token {
    return this.tokens[this.current]! || this.tokens[this.tokens.length - 1]
  }

  /**
   * Get previous token
   */
  private previous(): Token {
    return this.tokens[this.current - 1]! || this.tokens[0]
  }

  /**
   * Consume a token of given type or throw error
   */
  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance()

    throw new UnexpectedTokenException(type, this.peek().lexeme || this.peek().type, this.peek().position)
  }

  /**
   * Synchronize after a parse error
   */
  private synchronize(): void {
    this.advance()

    while (!this.isAtEnd()) {
      if (this.previous().type === TokenType.SEMICOLON) return

      switch (this.peek().type) {
        case TokenType.SOLTI:
        case TokenType.LEKH:
        case TokenType.YADI:
        case TokenType.JABA_SAMMA:
        case TokenType.VAI_VAYO_ROKKI:
        case TokenType.AGHI_BADH_VAI:
          return
      }

      this.advance()
    }
  }
}
