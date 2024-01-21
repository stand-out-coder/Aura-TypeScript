import { Value } from "../lib/Value";

export class ArrayValue implements Value {

    private elements: Value[];

    constructor(sizeOrElements?: number | Value[]) {
        if (typeof sizeOrElements === 'number') {
            this.elements = new Array(sizeOrElements);
        }
        else if (Array.isArray(sizeOrElements)) {
            this.elements = [...sizeOrElements];
        }
        else {
            this.elements = [];
        }
    }

    public get(index: number): Value {
        return this.elements[index];
    }

    public set(index: number, value: Value): void {
        this.elements[index] = value;
    }

    public asNumber(): number {
        throw new Error("Cannot cast array to number!");
    }

    public asString(): string {
        return "[" + this.elements.map(element => element.asString()).join(", ") + "]";
    }

    public toString(): string {
        return this.asString();
    }
}
