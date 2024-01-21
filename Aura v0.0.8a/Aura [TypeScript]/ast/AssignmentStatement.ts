import { Expression } from "../ast/Expression";
import { Statement } from "../ast/Statement";
import { Variables } from "../lib/Variables";
import { Visitor } from "../ast/Visitor";
import { Value } from "../lib/Value";

export class AssignmentStatement implements Statement {

    public variable: string;
    public expression: Expression;

    constructor(variable: string, expression: Expression) {
        this.variable = variable;
        this.expression = expression;
    }

    execute(): void {
        let result: Value = this.expression.eval();
        Variables.set(this.variable, result);
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return `${this.variable} = ${this.expression}`;
    }
}