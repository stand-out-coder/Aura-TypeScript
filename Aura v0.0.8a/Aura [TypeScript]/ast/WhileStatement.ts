import { ContinueStatement } from "./ContinueStatement";
import { BreakStatement } from "./BreakStatement";
import { Expression } from "./Expression";
import { Statement } from "./Statement";
import { Visitor } from "../ast/Visitor";

export class WhileStatement implements Statement {

    public condition: Expression;
    public statement: Statement;

    constructor(condition: Expression, statement: Statement) {
        this.condition = condition;
        this.statement = statement;
    }

    execute(): void {
        while (this.condition.eval().asNumber() != 0) {
            try {
                this.statement.execute();
            } catch (error) {
                if (error instanceof BreakStatement) {
                    break;
                } else if (error instanceof ContinueStatement) {
                    // continue
                }
            }
        }
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return "while " + this.condition + " " + this.statement;
    }
}