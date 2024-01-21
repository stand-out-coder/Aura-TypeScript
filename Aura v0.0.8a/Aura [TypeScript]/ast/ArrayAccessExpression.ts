import { Expression } from "../ast/Expression";
import { ArrayValue } from "../lib/ArrayValue";
import { Variables } from "../lib/Variables";
import { Visitor } from "../ast/Visitor";
import { Value } from "../lib/Value";

export class ArrayAccessExpression implements Expression {

    public variable: string;
    public indices: Expression[];

    constructor(variable: string, indices: Expression[]) {
        this.variable = variable;
        this.indices = indices;
    }

    eval(): Value {
        return this.getArray().get(this.lastIndex());
    }

    public getArray(): ArrayValue {
        let array: ArrayValue = this.consumeArray(Variables.get(this.variable));
        let last: number = this.indices.length - 1;
        for (let i = 0; i < last; i++) {
            array = this.consumeArray( array.get(this.index(i)) );
        }
        return array;
    }

    public lastIndex(): number {
        return this.index(this.indices.length - 1);
    }

    private index(index: number): number {
        return <number> this.indices[index].eval().asNumber();
    }

    private consumeArray(value: Value): ArrayValue {
        if (value instanceof ArrayValue) {
            return <ArrayValue> value;
        } else {
            throw new Error("Array expected!");
        }
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return this.variable + this.indices;
    }
}