/**
 * Helper function to check if a character can start an operator
 */
export function isOperatorStart(char: string): boolean {
    return /[+\-*/%=<>!]/.test(char);
}

/**
 * Helper function to check if a character can be the second character in a multi-character operator
 */
export function isSecondOperatorChar(char: string, firstChar: string): boolean {
    const operatorPairs: Record<string, string[]> = {
        '+': ['+', '='],
        '-': ['-', '='],
        '*': ['*', '='],
        '/': ['='],
        '=': ['='],
        '!': ['='],
        '<': ['='],
        '>': ['=']
    };

    return operatorPairs[firstChar]?.includes(char) || false;
}

/**
 * Creates a compiler error with position information
 */
export function createError(message: string, line: number, column: number): Error {
    const error = new Error(`${message} (${line}:${column})`);
    (error as any).position = { line, column };
    return error;
}