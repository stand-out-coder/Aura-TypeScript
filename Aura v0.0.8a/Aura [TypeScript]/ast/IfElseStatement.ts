import { Expression } from "../ast/Expression";
import { Statement } from "../ast/Statement";
import { Visitor } from "../ast/Visitor";

export class IfElseStatement implements Statement {

    public expression: Expression;
    public ifStatement: Statement;
    public elseStatement: Statement | null;

    constructor(expression: Expression, ifStatement: Statement, elseStatement: Statement | null) {
        this.expression = expression;
        this.ifStatement = ifStatement;
        this.elseStatement = elseStatement;
    }

    execute(): void {
        let result: number = this.expression.eval().asNumber();
        if (result !== 0) {
            this.ifStatement.execute();
        } else if (this.elseStatement !== null) {
            this.elseStatement.execute();
        }
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        let result: string = "if " + this.expression + ' ' + this.ifStatement;
        if (this.elseStatement !== null) {
            result += "\nelse " + this.elseStatement;
        }
        return result;
    }
}
