import { Statement } from "../ast/Statement";
import { Visitor } from "../ast/Visitor";

export class ContinueStatement extends Error implements Statement {

    execute(): void {
        throw this;
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return "continue";
    }
}