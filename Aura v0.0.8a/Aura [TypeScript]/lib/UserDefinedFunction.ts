import { ReturnStatement } from "../ast/ReturnStatement";
import { NumberValue } from "../lib/NumberValue";
import { Statement } from "../ast/Statement";
import { Function } from "../lib/Function";
import { Value } from "../lib/Value";

export class UserDefinedFunction implements Function {
    private argNames: string[];
    private body: Statement;

    constructor(argNames: string[], body: Statement) {
        this.argNames = argNames;
        this.body = body;
    }

    public getArgsCount(): number {
        return this.argNames.length;
    }

    public getArgsName(index: number): string {
        if (index < 0 || index >= this.getArgsCount()) return "";
        return this.argNames[index];
    }

    execute(...args: Value[]): Value {
        try {
            this.body.execute();
            return NumberValue.ZERO;
        } catch (rt) {
            if (rt instanceof ReturnStatement) {
                return rt.getResult();
            } else {
                throw rt;
            }
        }
    }
}
