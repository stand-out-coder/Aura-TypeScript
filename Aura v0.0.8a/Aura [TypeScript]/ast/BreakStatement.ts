import { Statement } from "../ast/Statement";
import { Visitor } from "./Visitor";

export class BreakStatement extends Error implements Statement {

    execute(): void {
        throw this;
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return "break";
    }
}
