import {
  type Token,
  TokenType,
  type Position,
  StringUtils,
  LexerException,
  UnexpectedCharacterException,
} from "@nepdai/shared";

/**
 * Nepdai Lexer - Tokenizes Nepdai source code
 */
export class NepdaiLexer {
  private input: string
  private position: Position
  private tokens: Token[]

  constructor(input: string) {
    this.input = input
    this.position = { line: 1, column: 1, index: 0 }
    this.tokens = []
  }

  /**
   * Tokenize the input source code
   */
  tokenize(): Token[] {
    // Check for "Namaste Dai" entry point
    this.checkEntryPoint()

    while (this.position.index < this.input.length) {
      this.skipWhitespace()

      if (this.position.index >= this.input.length) {
        break
      }

      const char = this.getCurrentChar()

      // Skip comments
      if (this.isCommentStart()) {
        this.skipComment()
        continue
      }

      // Process strings
      if (char === '"' || char === "'") {
        this.tokens.push(this.processString())
        continue
      }

      // Process identifiers and keywords
      if (StringUtils.isAlpha(char)) {
        this.tokens.push(this.processIdentifier())
        continue
      }

      // Process numbers
      if (StringUtils.isDigit(char)) {
        this.tokens.push(this.processNumber())
        continue
      }

      // Process operators and punctuation
      const token = this.processOperatorOrPunctuation()
      if (token) {
        this.tokens.push(token)
        continue
      }

      // Unknown character
      throw new UnexpectedCharacterException(char, { ...this.position })
    }

    // Add EOF token
    this.tokens.push({
      type: TokenType.EOF,
      position: { ...this.position },
    })

    return this.tokens
  }

  /**
   * Check for "Namaste Dai" entry point - REQUIRED
   */
  private checkEntryPoint(): void {
    const entryPoint = "Namaste Dai";

    // Skip any leading whitespace
    this.skipWhitespace()

    // Check if the input starts with "Namaste Dai"
    const inputStart = this.input.substring(this.position.index, this.position.index + entryPoint.length)

    if (inputStart !== entryPoint) {
      throw new LexerException("Namaste Dai Van Vai Suruma", { ...this.position })
    }

    // Skip the entry point
    for (let i = 0; i < entryPoint.length; i++) {
      this.advance()
    }

    // Skip any whitespace after the entry point
    this.skipWhitespace()
  }

  /**
   * Get the current character
   */
  private getCurrentChar(): string {
    return this.input[this.position.index] || ""
  }

  /**
   * Peek at the next character without advancing
   */
  private peekChar(offset = 1): string {
    return this.input[this.position.index + offset] || ""
  }

  /**
   * Advance the cursor by one character
   */
  private advance(): void {
    if (this.getCurrentChar() === "\n") {
      this.position.line++
      this.position.column = 1
    } else {
      this.position.column++
    }
    this.position.index++
  }

  /**
   * Skip whitespace characters
   */
  private skipWhitespace(): void {
    while (
      this.position.index < this.input.length &&
      StringUtils.isWhitespace(this.getCurrentChar())
    ) {
      this.advance()
    }
  }

  /**
   * Check if the current position is the start of a comment
   */
  private isCommentStart(): boolean {
    const char = this.getCurrentChar()
    const nextChar = this.peekChar()

    return char === "/" && nextChar === "/"
  }

  /**
   * Skip a comment
   */
  private skipComment(): void {
    // Skip the "//"
    this.advance()
    this.advance()

    // Skip until the end of the line
    while (this.position.index < this.input.length && this.getCurrentChar() !== "\n") {
      this.advance()
    }
  }

  /**
   * Process a string token
   */
  private processString(): Token {
    const startPosition = { ...this.position }
    const delimiter = this.getCurrentChar()
    let value = ""

    // Skip the opening delimiter
    this.advance()

    // Collect the string
    while (this.position.index < this.input.length && this.getCurrentChar() !== delimiter) {
      // Handle escape sequences
      if (this.getCurrentChar() === "\\") {
        this.advance()

        switch (this.getCurrentChar()) {
          case "n":
            value += "\n"
            break
          case "t":
            value += "\t"
            break
          case "r":
            value += "\r"
            break
          case "\\":
            value += "\\"
            break
          case '"':
            value += '"'
            break
          case "'":
            value += "'"
            break
          default:
            value += this.getCurrentChar()
        }
      } else {
        value += this.getCurrentChar()
      }

      this.advance()
    }

    // Skip the closing delimiter
    if (this.position.index < this.input.length) {
      this.advance()
    } else {
      throw new LexerException("Unterminated string - Vai Majale Lekh", startPosition)
    }

    return {
      type: TokenType.STRING,
      value,
      lexeme: `${delimiter}${StringUtils.escapeString(value)}${delimiter}`,
      position: startPosition,
    }
  }

  /**
   * Process an identifier or keyword token
   */
  private processIdentifier(): Token {
    const startPosition = { ...this.position }
    let identifier = ""

    // Collect the identifier
    while (this.position.index < this.input.length && StringUtils.isAlphaNumeric(this.getCurrentChar())) {
      identifier += this.getCurrentChar()
      this.advance()
    }

    // Check if it's a Nepdai keyword
    const tokenType = this.getKeywordTokenType(identifier)

    return {
      type: tokenType,
      value: tokenType === TokenType.IDENTIFIER ? identifier : undefined,
      lexeme: identifier,
      position: startPosition,
    }
  }

  /**
   * Get the token type for a keyword or identifier
   */
  private getKeywordTokenType(identifier: string): TokenType {
    switch (identifier) {
      case "solti":
        return TokenType.SOLTI
      case "yadi":
        return TokenType.YADI
      case "bhane":
        return TokenType.BHANE
      case "natra":
        return TokenType.NATRA
      case "jaba":
        return TokenType.JABA
      case "lai":
        return TokenType.LAI
      case "kaam":
        return TokenType.KAAM
      case "pathau":
        return TokenType.PATHAU
      case "lekh":
        return TokenType.LEKH
      case "padh":
        return TokenType.PADH
      case "thik":
        return TokenType.THIK
      case "galat":
        return TokenType.GALAT
      case "khali":
        return TokenType.KHALI
      case "lyau":
        return TokenType.LYAU
      case "barga":
        return TokenType.BARGA
      case "naya":
        return TokenType.NAYA
      case "yo":
        return TokenType.YO
      default:
        return TokenType.IDENTIFIER
    }
  }

  /**
   * Process a number token
   */
  private processNumber(): Token {
    const startPosition = { ...this.position }
    let num = ""

    // Collect the number
    while (this.position.index < this.input.length && StringUtils.isDigit(this.getCurrentChar())) {
      num += this.getCurrentChar()
      this.advance()
    }

    // Check for decimal point
    if (this.getCurrentChar() === "." && StringUtils.isDigit(this.peekChar())) {
      num += "."
      this.advance()

      // Collect decimal digits
      while (this.position.index < this.input.length && StringUtils.isDigit(this.getCurrentChar())) {
        num += this.getCurrentChar()
        this.advance()
      }
    }

    return {
      type: TokenType.NUMBER,
      value: Number.parseFloat(num),
      lexeme: num,
      position: startPosition,
    }
  }

  /**
   * Process operators and punctuation
   */
  private processOperatorOrPunctuation(): Token | null {
    const startPosition = { ...this.position }
    const char = this.getCurrentChar()
    const nextChar = this.peekChar()

    // Two-character operators
    if (char === "+" && nextChar === "+") {
      this.advance()
      this.advance()
      return { type: TokenType.INCREMENT, lexeme: "++", position: startPosition }
    }

    if (char === "-" && nextChar === "-") {
      this.advance()
      this.advance()
      return { type: TokenType.DECREMENT, lexeme: "--", position: startPosition }
    }

    if (char === "+" && nextChar === "=") {
      this.advance()
      this.advance()
      return { type: TokenType.PLUS_ASSIGN, lexeme: "+=", position: startPosition }
    }

    if (char === "-" && nextChar === "=") {
      this.advance()
      this.advance()
      return { type: TokenType.MINUS_ASSIGN, lexeme: "-=", position: startPosition }
    }

    if (char === "*" && nextChar === "=") {
      this.advance()
      this.advance()
      return { type: TokenType.MULTIPLY_ASSIGN, lexeme: "*=", position: startPosition }
    }

    if (char === "/" && nextChar === "=") {
      this.advance()
      this.advance()
      return { type: TokenType.DIVIDE_ASSIGN, lexeme: "/=", position: startPosition }
    }

    if (char === "*" && nextChar === "*") {
      this.advance()
      this.advance()
      return { type: TokenType.POWER, lexeme: "**", position: startPosition }
    }

    if (char === "=" && nextChar === "=") {
      this.advance()
      this.advance()
      return { type: TokenType.EQUAL, lexeme: "==", position: startPosition }
    }

    if (char === "!" && nextChar === "=") {
      this.advance()
      this.advance()
      return { type: TokenType.NOT_EQUAL, lexeme: "!=", position: startPosition }
    }

    if (char === "<" && nextChar === "=") {
      this.advance()
      this.advance()
      return { type: TokenType.LESS_EQUAL, lexeme: "<=", position: startPosition }
    }

    if (char === ">" && nextChar === "=") {
      this.advance()
      this.advance()
      return { type: TokenType.GREATER_EQUAL, lexeme: ">=", position: startPosition }
    }

    if (char === "&" && nextChar === "&") {
      this.advance()
      this.advance()
      return { type: TokenType.AND, lexeme: "&&", position: startPosition }
    }

    if (char === "|" && nextChar === "|") {
      this.advance()
      this.advance()
      return { type: TokenType.OR, lexeme: "||", position: startPosition }
    }

    // Single-character operators and punctuation
    this.advance()

    switch (char) {
      case "+":
        return { type: TokenType.PLUS, lexeme: "+", position: startPosition }
      case "-":
        return { type: TokenType.MINUS, lexeme: "-", position: startPosition }
      case "*":
        return { type: TokenType.MULTIPLY, lexeme: "*", position: startPosition }
      case "/":
        return { type: TokenType.DIVIDE, lexeme: "/", position: startPosition }
      case "%":
        return { type: TokenType.MODULO, lexeme: "%", position: startPosition }
      case "=":
        return { type: TokenType.ASSIGN, lexeme: "=", position: startPosition }
      case "<":
        return { type: TokenType.LESS_THAN, lexeme: "<", position: startPosition }
      case ">":
        return { type: TokenType.GREATER_THAN, lexeme: ">", position: startPosition }
      case "!":
        return { type: TokenType.NOT, lexeme: "!", position: startPosition }
      case ";":
        return { type: TokenType.SEMICOLON, lexeme: ";", position: startPosition }
      case ",":
        return { type: TokenType.COMMA, lexeme: ",", position: startPosition }
      case ".":
        return { type: TokenType.DOT, lexeme: ".", position: startPosition }
      case ":":
        return { type: TokenType.COLON, lexeme: ":", position: startPosition }
      case "(":
        return { type: TokenType.LEFT_PAREN, lexeme: "(", position: startPosition }
      case ")":
        return { type: TokenType.RIGHT_PAREN, lexeme: ")", position: startPosition }
      case "{":
        return { type: TokenType.LEFT_BRACE, lexeme: "{", position: startPosition }
      case "}":
        return { type: TokenType.RIGHT_BRACE, lexeme: "}", position: startPosition }
      case "[":
        return { type: TokenType.LEFT_BRACKET, lexeme: "[", position: startPosition }
      case "]":
        return { type: TokenType.RIGHT_BRACKET, lexeme: "]", position: startPosition }
      case "\n":
        return { type: TokenType.NEWLINE, lexeme: "\\n", position: startPosition }
      default:
        return null
    }
  }
}
