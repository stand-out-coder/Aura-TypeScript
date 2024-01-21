import { TokenType } from "./TokenType"

export class Token {
    public type: TokenType;
    public value: any;

    constructor(type: TokenType, value: any = null) {
        this.type = type;
        this.value = value;
    }

    toString(): string {
        return this.type + " " + this.value;
    }
}