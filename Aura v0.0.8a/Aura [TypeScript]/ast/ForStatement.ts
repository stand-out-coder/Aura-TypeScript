import { ContinueStatement } from "./ContinueStatement";
import { BreakStatement } from "./BreakStatement";
import { Expression } from "../ast/Expression";
import { Statement } from "../ast/Statement";
import { Visitor } from "../ast/Visitor";

export class ForStatement implements Statement {

    public initialization: Statement;
    public termination: Expression;
    public increment: Statement;
    public statement: Statement;

    constructor(initialization: Statement, termination: Expression, increment: Statement, block: Statement) {
        this.initialization = initialization;
        this.termination = termination;
        this.increment = increment;
        this.statement = block;
    }

    execute(): void {
        for (this.initialization.execute(); this.termination.eval().asNumber() != 0; this.increment.execute()) {
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
        return "for " + this.initialization + ", " + this.termination + ", " + this.increment + " " + this.statement;
    }
}