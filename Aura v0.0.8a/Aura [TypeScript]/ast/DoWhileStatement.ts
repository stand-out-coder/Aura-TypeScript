import { ContinueStatement } from "./ContinueStatement";
import { BreakStatement } from "./BreakStatement";
import { Expression } from "./Expression";
import { Visitor } from "../ast/Visitor";
import { Statement } from "./Statement";

export class DoWhileStatement implements Statement {

    public condition: Expression;
    public statement: Statement;

    constructor(condition: Expression, statement: Statement) {
        this.condition = condition;
        this.statement = statement;
    }

    execute(): void {
        do {
            try {
                this.statement.execute();
            } catch (error) {
                if (error instanceof BreakStatement) {
                    break;
                } else if (error instanceof ContinueStatement) {
                    // continue
                }
            }
        } while (this.condition.eval().asNumber() != 0);
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return "do " + this.statement + " while " + this.condition;
    }
}