import { Value } from "../lib/Value";

export class NumberValue implements Value {
    public static ZERO: NumberValue = new NumberValue(0);
    private value: number | boolean;

    constructor(value: number | boolean) {
        this.value = value;
    }

    asNumber(): number {
        return this.value as number;
    }

    asString(): string {
        return this.value.toString();
    }

    toString(): string {
        return this.asString();
    }
}