import { Statement } from "../ast/Statement";
import { Visitor } from "../ast/Visitor";

export class BlockStatement implements Statement {

    public statements: Statement[] = [];

    constructor() {
        this.statements = [];
    }

    public add(statement: Statement): void {
        this.statements.push(statement);
    }

    execute(): void {
        for (let statement of this.statements) {
            statement.execute();
        }
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        let result: string = "";
        for (let statement of this.statements) {
            result += statement.toString() + "\n";
        }
        return result.toString();
    }
}