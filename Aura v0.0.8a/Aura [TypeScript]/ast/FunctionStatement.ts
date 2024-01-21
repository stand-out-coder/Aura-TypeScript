import { FunctionalExpression } from "../ast/FunctionalExpression";
import { Statement } from "../ast/Statement";
import { Visitor } from "../ast/Visitor";

export class FunctionStatement implements Statement {

    public _function: FunctionalExpression;

    constructor(_function: FunctionalExpression) {
        this._function = _function;
    }


    execute(): void {
        this._function.eval();
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return this._function.toString();
    }
}