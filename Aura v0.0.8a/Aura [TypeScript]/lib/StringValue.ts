import { Value } from "../lib/Value";

export class StringValue implements Value {
    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    asNumber(): number {
        return parseFloat(this.value);
    }

    asString(): string {
        return this.value;
    }

    toString(): string {
        return this.asString();
    }
}
