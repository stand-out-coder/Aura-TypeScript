import { NumberValue } from "../lib/NumberValue";
import { Expression } from "../ast/Expression";
import { Visitor } from "../ast/Visitor";
import { Value } from "../lib/Value";

export class UnaryExpression implements Expression {

    public oper: string;
    public operand: Expression;

    constructor(oper: string, operand: Expression) {
        this.oper = oper;
        this.operand = operand;
    }

    eval(): Value {
        switch (this.oper) {
            case "-": return new NumberValue(-this.operand.eval().asNumber());
            case "+":
            default: return new NumberValue(+this.operand.eval().asNumber());
        }
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return `${this.oper} ${this.operand}`;
    }
}