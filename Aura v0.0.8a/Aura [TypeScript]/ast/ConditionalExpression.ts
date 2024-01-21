import { StringValue } from "../lib/StringValue";
import { NumberValue } from "../lib/NumberValue";
import { Expression } from "./Expression";
import { TokenType } from "../TokenType";
import { Visitor } from "../ast/Visitor";
import { Value } from "../lib/Value";

export class ConditionalExpression implements Expression {

    public expr1: Expression;
    public expr2: Expression;
    public operation: TokenType;

    constructor(operation: TokenType, expr1: Expression, expr2: Expression) {
        this.operation = operation;
        this.expr1 = expr1;
        this.expr2 = expr2;
    }

    eval(): Value {
        const value1 = this.expr1.eval();
        const value2 = this.expr2.eval();

        let number1: number, number2: number;
        if (value1 instanceof StringValue) {
            number1 = value1.asString().localeCompare(value2.asString());
            number2 = 0;
        } else {
            number1 = value1.asNumber();
            number2 = value2.asNumber();
        }

        let result: boolean;
        switch (this.operation) {
            case TokenType.LT: result = number1 < number2; break;
            case TokenType.LTEQ: result = number1 <= number2; break;
            case TokenType.GT: result = number1 > number2; break;
            case TokenType.GTEQ: result = number1 >= number2; break;
            case TokenType.EXCLEQ: result = number1 !== number2; break;
            case TokenType.AMPAMP: result = (number1 !== 0) && (number2 !== 0); break;
            case TokenType.BARBAR: result = (number1 !== 0) || (number2 !== 0); break;
            case TokenType.EQEQ:
            default: result = number1 === number2; break;
        }

        return new NumberValue(result ? 1 : 0);
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return `[${this.expr1.toString()} ${this.operation} ${this.expr2.toString()}]`;
    }
}