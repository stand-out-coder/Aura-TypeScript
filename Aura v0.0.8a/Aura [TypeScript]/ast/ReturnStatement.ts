import { Expression } from "../ast/Expression";
import { Statement } from "../ast/Statement";
import { Visitor } from "../ast/Visitor";
import { Value } from "../lib/Value";

export class ReturnStatement extends Error implements Statement {

    public expression: Expression;
    public result: any;

    constructor(expression: Expression) {
        super();
        this.expression = expression;
    }

    public getResult(): Value {
        return this.result;
    }

    execute(): void {
        this.result = this.expression.eval();
        throw this;
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return "return";
    }
}