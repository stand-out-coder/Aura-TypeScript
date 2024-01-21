import { TokenType } from "./TokenType";
import { Token } from "./Token";

export class Lexer {
    private input: string;

    constructor(input: string) {
        this.input = input;
    }

    public tokenize(): Token[] {
        let chars: string[] = [...this.input];
        let tokens: Token[] = [];

        while (chars.length > 0) {
            if (chars[0] === "/" && chars[1] === "/") {
                // One line comment
                chars.splice(0, 2); // delete "//"
                while (chars.length > 0 && "\r\n\0".indexOf(chars[0]) === -1) {
                    chars.shift();
                }
            }
            else if (chars[0] === "/" && chars[1] === "*") {
                // Multiline comment
                chars.splice(0, 2); // delete "/*"
                while (chars.length > 1 && !(chars[0].toString() === "*" && chars[1].toString() === "/")) {
                    chars.shift();
                }
                if (chars.length > 1) {
                    chars.splice(0, 2); // delete "*/"
                } else {
                    throw new Error("Missing close tag!");
                }
            }
            
            else if (this.isDigit(chars[0])) {
                let number = "";

                while (chars.length > 0 && (this.isDigit(chars[0]) || (chars[0] == "."))) {
                    number += chars[0];
                    chars.shift();
                }

                if (number.includes(".")) {
                    tokens.push(new Token(TokenType.NUMBER, parseFloat(number)));
                } else {
                    tokens.push(new Token(TokenType.NUMBER, parseInt(number)));
                }
            }
            else if (this.isAlpha(chars[0])) {
                let word = "";

                while (chars.length > 0 && (this.isAlnum(chars[0]) || chars[0] == "_" || chars[0] == "$")) {
                    word += chars[0];
                    chars.shift();
                }

                switch (word) {
                    case "if": tokens.push(new Token(TokenType.IF)); break;
                    case "elif": tokens.push(new Token(TokenType.ELSE)); tokens.push(new Token(TokenType.IF)); break;
                    case "else": tokens.push(new Token(TokenType.ELSE)); break;
                    case "and": tokens.push(new Token(TokenType.AMPAMP)); break;
                    case "or": tokens.push(new Token(TokenType.BARBAR)); break;
                    case "while": tokens.push(new Token(TokenType.WHILE)); break;
                    case "for": tokens.push(new Token(TokenType.FOR)); break;
                    case "do": tokens.push(new Token(TokenType.DO)); break;
                    case "break": tokens.push(new Token(TokenType.BREAK)); break;
                    case "continue": tokens.push(new Token(TokenType.CONTINUE)); break;
                    case "def": tokens.push(new Token(TokenType.DEF)); break;
                    case "return": tokens.push(new Token(TokenType.RETURN)); break;
                    default:
                        tokens.push(new Token(TokenType.WORD, word)); break;
                }
            }
            else if (chars[0] == '"' || chars[0] == "'") {
                const quoteType = chars[0];
                chars.shift();
                let string = "";
            
                while (chars.length > 0) {
                    if (chars[0] == quoteType) {
                        chars.shift();
                        break;
                    } else if (chars[0].toString() == "\\") {
                        chars.shift();
                        if (chars.length > 0) {
                            switch (chars[0].toString()) {
                                case "n": string += "\n"; break;
                                case "t": string += "\t"; break;
                                case "r": string += "\r"; break;
                                case "\"": string += "\""; break;
                                case "'": string += "'"; break;
                                case "\\": string += "\\"; break;
                                case 'b': string += "\b"; break;
                                case 'f': string += "\f"; break;
                                case 'v': string += "\v"; break;
                                default: string += "\\" + chars[0]; break;
                            }
                            chars.shift();
                        }
                    } else {
                        string += chars[0];
                        chars.shift();
                    }
                }
            
                tokens.push(new Token(TokenType.STRING, string));
            }
            
            else if (chars[0] == "#") {
                let hexNumber = "";
                
                while (chars.length > 0 && (this.isDigit(chars[0]) || this.isHexNumber(chars[0]))) {
                    hexNumber += chars[0];
                    chars.shift();
                }
                tokens.push(new Token(TokenType.HEX_NUMBER, hexNumber));                
            }

            else if (chars.length > 1 && (chars[0] == "=" && chars[1] == "=")) {
                tokens.push(new Token(TokenType.EQEQ));
                chars.shift();
                chars.shift();
            }
            else if (chars.length > 1 && (chars[0] == "&" && chars[1] == "&")) {
                tokens.push(new Token(TokenType.AMPAMP));
                chars.shift();
                chars.shift();
            }
            else if (chars.length > 1 && (chars[0] == "|" && chars[1] == "|")) {
                tokens.push(new Token(TokenType.BARBAR));
                chars.shift();
                chars.shift();
            }
            else if (chars.length > 1 && (chars[0] == "!" && chars[1] == "=")) {
                tokens.push(new Token(TokenType.EXCLEQ));
                chars.shift();
                chars.shift();
            }
            else if (chars.length > 1 && (chars[0] == "<" && chars[1] == "=")) {
                tokens.push(new Token(TokenType.LTEQ));
                chars.shift();
                chars.shift();
            }
            else if (chars.length > 1 && (chars[0] == ">" && chars[1] == "=")) {
                tokens.push(new Token(TokenType.GTEQ));
                chars.shift();
                chars.shift();
            }
            else if (chars[0] == "=") {
                tokens.push(new Token(TokenType.EQ));
                chars.shift();
            }
            else if (chars[0] == "{") {
                tokens.push(new Token(TokenType.LBRACE));
                chars.shift();
            }
            else if (chars[0] == "}") {
                tokens.push(new Token(TokenType.RBRACE));
                chars.shift();
            }
            else if (chars[0] == "[") {
                tokens.push(new Token(TokenType.LBRACKET));
                chars.shift();
            }
            else if (chars[0] == "]") {
                tokens.push(new Token(TokenType.RBRACKET));
                chars.shift();
            }
            else if (chars[0] == ",") {
                tokens.push(new Token(TokenType.COMMA));
                chars.shift();
            }
            else if (chars[0] == "<") {
                tokens.push(new Token(TokenType.LT));
                chars.shift();
            }
            else if (chars[0] == ">") {
                tokens.push(new Token(TokenType.GT));
                chars.shift();
            }
            else if (chars[0] == "!") {
                tokens.push(new Token(TokenType.EXCL));
                chars.shift();
            }
            else if (chars[0] == "&") {
                tokens.push(new Token(TokenType.AMP));
                chars.shift();
            }
            else if (chars[0] == "|") {
                tokens.push(new Token(TokenType.BAR));
                chars.shift();
            }
            else if (chars[0] == "+") {
                tokens.push(new Token(TokenType.PLUS));
                chars.shift()
            }
            else if (chars[0] == "-") {
                tokens.push(new Token(TokenType.MINUS));
                chars.shift();
            }
            else if (chars[0] == "*") {
                tokens.push(new Token(TokenType.STAR));
                chars.shift();
            }
            else if (chars[0] == "/") {
                tokens.push(new Token(TokenType.SLASH));
                chars.shift();
            }
            else if (chars[0] == "(") {
                tokens.push(new Token(TokenType.LPAREN));
                chars.shift();
            }
            else if (chars[0] == ")") {
                tokens.push(new Token(TokenType.RPAREN));
                chars.shift();
            }
            else if (chars[0] === " ") {
                chars.shift();
            }
            else {
                chars.shift();
            }
        }

        return tokens;
    }

    private isHexNumber(char: string): boolean {
        return /^[0-9a-fA-F]+$/.test(char);
    }

    private isDigit(char: string): boolean {
        return /^\d$/.test(char);
    }

    private isAlpha(char: string): boolean {
        return /^[a-zA-Z]$/.test(char);
    }

    private isAlnum(char: string): boolean {
        return /^[a-zA-Z0-9_]+$/.test(char);
    }
}