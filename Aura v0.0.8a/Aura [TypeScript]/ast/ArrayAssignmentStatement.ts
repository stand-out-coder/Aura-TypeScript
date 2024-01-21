import { ArrayAccessExpression } from "../ast/ArrayAccessExpression";
import { Expression } from "../ast/Expression";
import { Statement } from "../ast/Statement";
import { Visitor } from "../ast/Visitor";

export class ArrayAssignmentStatement implements Statement {

    public array: ArrayAccessExpression;
    public expression: Expression;

    constructor(array: ArrayAccessExpression, expression: Expression) {
        this.array = array;
        this.expression = expression;
    }

    execute() {
        this.array.getArray().set(this.array.lastIndex(), this.expression.eval());
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString() {
        return `${this.array} = ${this.expression}`;
    }
}