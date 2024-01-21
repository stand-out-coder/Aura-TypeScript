import { StringValue } from "../lib/StringValue";
import { NumberValue } from "../lib/NumberValue";
import { Expression } from "./Expression";
import { Visitor } from "../ast/Visitor";
import { Value } from "../lib/Value";

export class ValueExpression implements Expression {

    public value: Value;

    constructor(value: string | number) {
        this.value = typeof value === 'number' ? new NumberValue(value) : new StringValue(value);
    }

    eval(): Value {
        return this.value;
    }

    accept(visitor: Visitor): void {
        visitor.visit(this);
    }

    toString(): string {
        return `${this.value}`;
    }
}