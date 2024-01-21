export enum TokenType {
    // Data types
    HEX_NUMBER = "HEX_NUMBER",
    STRING = "STRING",           // [a-z, A-Z]
    NUMBER = "NUMBER",           // [0-9...]
    WORD = "WORD",               // [a-z, A-Z, 0-9]

    // Special symbols
    LPAREN = "LPAREN",           // (
    RPAREN = "RPAREN",           // )

    LBRACE = "LBRACE",           // {
    RBRACE = "RBRACE",           // }

    LBRACKET = "LBRACKET",       // [
    RBRACKET = "RBRACKET",       // ]

    STAR = "STAR",               // *
    SLASH = "SLASH",             // /

    PLUS = "PLUS",               // +
    MINUS = "MINUS",             // -

    EQ = "EQ",                   // =

    LT = "LT",                   // <
    GT = "GT",                   // >

    EXCL = "EXCL",               // !

    BAR = "BAR",                 // |
    AMP = "AMP",                 // &

    EQEQ = "EQEQ",               // ==

    LTEQ = "LTEQ",               // >=
    GTEQ = "GTEQ",               // <=

    EXCLEQ = "EXCLEQ",           // !=
    
    BARBAR = "BARBAR",           // ||
    AMPAMP = "AMPAMP",           // &&

    // Keywoards
    IF = "IF",                   // if
    ELSE = "ELSE",               // else

    WHILE = "WHILE",             // while
    FOR = "FOR",                 // for
    DO = "DO",                   // do

    DEF = "DEF",                 // def

    RETURN = "RETURN",           // return

    BREAK = "BREAK",             // break
    CONTINUE = "CONTINUE",       // continue

    // Other
    COMMA = "COMMA",             // ,

    EOF = "EOF",                 //
}