import { UserDefinedFunction } from "../lib/UserDefinedFunction";
import { Expression } from "../ast/Expression";
import { Functions } from "../ast/Functions";
import { Variables } from "../lib/Variables";
import { Visitor } from "../ast/Visitor";
import { Value } from "../lib/Value";

export class FunctionalExpression implements Expression {

    public name: string;
    public arguments: Expression[];

    constructor(name: string) {
        this.name = name;
        this.arguments = [];
    }

    public addArgument(arg: Expression): void {
        this.arguments.push(arg);
    }

    public eval(): Value {
        const size: number = this.arguments.length;
        const values: Value[] = [];

        for (let i = 0; i < size; i++) {
            values[i] = this.arguments[i].eval();
        }

        const _function = Functions.get(this.name);
        if (_function instanceof UserDefinedFunction) {
            const userFunction: UserDefinedFunction = _function as UserDefinedFunction;
            if (size !== userFunction.getArgsCount()) {
                throw new Error("Args count mismatch!");
            }

            Variables.add();
            for (let i = 0; i < size; i++) {
                Variables.set(userFunction.getArgsName(i), values[i]);
            }
            const result: Value = userFunction.execute(...values);
            Variables.del();
            return result;
        }

        return _function.execute(...values);
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    public toString(): string {
        return `${this.name}(${this.arguments.map(arg => arg.toString()).join(", ")})`;
    }
}
