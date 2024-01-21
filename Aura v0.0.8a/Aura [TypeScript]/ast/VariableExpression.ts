import { Expression } from "../ast/Expression";
import { Variables } from "../lib/Variables";
import { Visitor } from "../ast/Visitor";
import { Value } from "../lib/Value";

export class VariableExpression implements Expression {

    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    eval(): Value {
        if (!Variables.isExists(this.name)) throw new Error(`Variable ${this.name} does not exists!`);
        return Variables.get(this.name);
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return this.name;
    }
}