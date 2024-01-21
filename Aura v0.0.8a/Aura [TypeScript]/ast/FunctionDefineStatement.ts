import { UserDefinedFunction } from "../lib/UserDefinedFunction";
import { Functions } from "../ast/Functions";
import { Statement } from "../ast/Statement";
import { Visitor } from "../ast/Visitor";

export class FunctionDefineStatement implements Statement {

    public name: string;
    public argNames: string[];
    public body: Statement;

    constructor(name: string, argNames: string[], body: Statement) {
        this.name = name;
        this.argNames = argNames;
        this.body = body;
    }

    execute(): void {
        Functions.set(this.name, new UserDefinedFunction(this.argNames, this.body));
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return "def (" + this.argNames.toString() + ") " + this.body.toString();
    }
}
