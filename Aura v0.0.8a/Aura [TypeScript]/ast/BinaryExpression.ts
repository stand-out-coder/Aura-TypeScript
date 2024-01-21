import { NumberValue } from "../lib/NumberValue";
import { StringValue } from "../lib/StringValue";
import { Expression } from "../ast/Expression";
import { ArrayValue } from "../lib/ArrayValue";
import { Visitor } from "../ast/Visitor";
import { Value } from "../lib/Value";

export class BinaryExpression implements Expression {

    public expr1: Expression;
    public oper: string;
    public expr2: Expression;

    constructor(expr1: Expression, oper: string, expr2: Expression) {
        this.expr1 = expr1;
        this.oper = oper;
        this.expr2 = expr2;
    }

    eval(): Value {
        const value1: Value = this.expr1.eval()
        const value2: Value = this.expr2.eval()

        if ( (value1 instanceof StringValue) || (value1 instanceof ArrayValue) ) {
            let string1 = value1.asString();
            switch (this.oper) {
                case "*":
                    let iters = <number> value2.asNumber();
                    let buffer: string = "";
                    for (let i = 0; i < iters; i++) {
                        buffer += string1;
                    }
                    return new StringValue(buffer.toString());
                case "+":
                default:
                    return new StringValue(string1 + value2.toString());
            }
        }

        const number1 = value1.asNumber()
        const number2 = value2.asNumber()

        switch (this.oper) {
            case "*": return new NumberValue(number1 * number2);
            case "/": return new NumberValue(number1 / number2);
            case "-": if (Number(number2) !== 0) return new NumberValue(number1 / number2);
            case "+":
            default: return new NumberValue(number1 + number2);
        }
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return `${this.expr1} ${this.oper} ${this.expr2}`;
    }
}