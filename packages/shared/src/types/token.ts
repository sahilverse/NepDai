/**
 * Nepdai Token Types
 */
export enum TokenType {
  // Literals
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  NULL = "NULL",

  // Identifiers
  IDENTIFIER = "IDENTIFIER",

  // Nepdai Keywords
  SOLTI = "SOLTI", // variable declaration
  YADI = "YADI", // if
  BHANE = "BHANE", // then
  NATRA = "NATRA", // else
  JABA = "JABA", // while
  LAI = "LAI", // for
  KAAM = "KAAM", // function
  PATHAU = "PATHAU", // return
  LEKH = "LEKH", // print
  PADH = "PADH", // input
  THIK = "THIK", // true
  GALAT = "GALAT", // false
  KHALI = "KHALI", // null
  LYAU = "LYAU", // import
  BARGA = "BARGA", // class
  NAYA = "NAYA", // new
  YO = "YO", // this

  // Operators
  PLUS = "PLUS", // +
  MINUS = "MINUS", // -
  MULTIPLY = "MULTIPLY", // *
  DIVIDE = "DIVIDE", // /
  MODULO = "MODULO", // %
  POWER = "POWER", // **

  // Assignment Operators
  ASSIGN = "ASSIGN", // =
  PLUS_ASSIGN = "PLUS_ASSIGN", // +=
  MINUS_ASSIGN = "MINUS_ASSIGN", // -=
  MULTIPLY_ASSIGN = "MULTIPLY_ASSIGN", // *=
  DIVIDE_ASSIGN = "DIVIDE_ASSIGN", // /=

  // Comparison Operators
  EQUAL = "EQUAL", // ==
  NOT_EQUAL = "NOT_EQUAL", // !=
  LESS_THAN = "LESS_THAN", // <
  GREATER_THAN = "GREATER_THAN", // >
  LESS_EQUAL = "LESS_EQUAL", // <=
  GREATER_EQUAL = "GREATER_EQUAL", // >=

  // Logical Operators
  AND = "AND", // &&
  OR = "OR", // ||
  NOT = "NOT", // !

  // Increment/Decrement
  INCREMENT = "INCREMENT", // ++
  DECREMENT = "DECREMENT", // --

  // Punctuation
  SEMICOLON = "SEMICOLON", // ;
  COMMA = "COMMA", // ,
  DOT = "DOT", // .
  COLON = "COLON", // :

  // Brackets
  LEFT_PAREN = "LEFT_PAREN", // (
  RIGHT_PAREN = "RIGHT_PAREN", // )
  LEFT_BRACE = "LEFT_BRACE", // {
  RIGHT_BRACE = "RIGHT_BRACE", // }
  LEFT_BRACKET = "LEFT_BRACKET", // [
  RIGHT_BRACKET = "RIGHT_BRACKET", // ]

  // Special
  NEWLINE = "NEWLINE",
  EOF = "EOF",

  // Comments
  COMMENT = "COMMENT",
}

/**
 * Position in source code
 */
export interface Position {
  line: number
  column: number
  index: number
}

/**
 * Token representation
 */
export interface Token {
  type: TokenType
  value?: any
  lexeme?: string
  position: Position
}
