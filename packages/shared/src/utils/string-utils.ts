/**
 * String utility functions for Nepdai
 */
export class StringUtils {
  /**
   * Check if a character is alphabetic
   */
  static isAlpha(char: string): boolean {
    return /[a-zA-Z_]/.test(char)
  }

  /**
   * Check if a character is numeric
   */
  static isDigit(char: string): boolean {
    return /[0-9]/.test(char)
  }

  /**
   * Check if a character is alphanumeric
   */
  static isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char)
  }

  /**
   * Check if a character is whitespace
   */
  static isWhitespace(char: string): boolean {
    return /\s/.test(char)
  }

  /**
   * Check if a string is a Nepdai keyword
   */
  static isNepdaiKeyword(str: string): boolean {
    const keywords = [
      "solti",
      "yadi",
      "bhane",
      "natra",
      "jaba",
      "lai",
      "kaam",
      "pathau",
      "lekh",
      "padh",
      "thik",
      "galat",
      "khali",
      "lyau",
      "barga",
      "naya",
      "yo",
    ]
    return keywords.includes(str)
  }

  /**
   * Escape string for output
   */
  static escapeString(str: string): string {
    return str
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
  }

  /**
   * Unescape string from input
   */
  static unescapeString(str: string): string {
    return str
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\")
  }
}
