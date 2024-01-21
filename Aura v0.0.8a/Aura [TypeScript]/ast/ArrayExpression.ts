import { ArrayValue } from "../lib/ArrayValue";
import { Expression } from "../ast/Expression";
import { Visitor } from "../ast/Visitor";
import { Value } from "../lib/Value";

export class ArrayExpression implements Expression {

    public elements: Expression[];

    constructor(_arguments: Expression[]) {
        this.elements = _arguments;
    }

    eval(): Value {
        let size: number = this.elements.length;
        let array: ArrayValue = new ArrayValue(size);
        for (let i = 0; i < size; i++) {
            array.set(i, this.elements[i].eval());
        }
        return array;
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return this.elements.toString();
    }
}