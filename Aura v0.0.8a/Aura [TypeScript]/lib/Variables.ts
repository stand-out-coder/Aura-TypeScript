import { NumberValue } from "../lib/NumberValue";
import { StringValue } from "../lib/StringValue";
import { Value } from "../lib/Value";

export class Variables {
    private static stack: Map<string, Value>[] = [];
    private static variables: Map<string, Value> = new Map();

    static {
        Variables.variables.set("true", new NumberValue(1));
        Variables.variables.set("false", new NumberValue(0));
        Variables.variables.set("none", new StringValue("none"));
    }

    public static add(): void {
        Variables.stack.push(new Map(Variables.variables));
    }

    public static del(): void {
        Variables.variables = Variables.stack.pop() || new Map();
    }

    public static isExists(key: string): boolean {
        return Variables.variables.has(key);
    }

    public static get(key: string): Value {
        if (!Variables.isExists(key)) return NumberValue.ZERO;
        return Variables.variables.get(key) || NumberValue.ZERO;
    }

    public static set(key: string, value: Value): void {
        Variables.variables.set(key, value);
    }
}
