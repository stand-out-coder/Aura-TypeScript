import { StringValue } from "../lib/StringValue";
import { NumberValue } from "../lib/NumberValue";
import { Function } from "../lib/Function";
import { Value } from "../lib/Value";
import promptSync from "prompt-sync";

export class Functions {
    private static functions: Map<string, Function> = new Map();

    static {
        Functions.functions.set("sin", new (class implements Function {
            execute(...args: Value[]): Value {
                if (args.length !== 1) throw new Error("One arg expected!");
                return new NumberValue(Math.sin(args[0].asNumber()));
            }
        })());

        Functions.functions.set("cos", new (class implements Function {
            execute(...args: Value[]): Value {
                if (args.length !== 1) throw new Error("One arg expected!");
                return new NumberValue(Math.cos(args[0].asNumber()));
            }
        })());

        Functions.functions.set("output", new (class implements Function {
            execute(...args: Value[]): Value {
                args.forEach(arg => {
                    process.stdout.write(arg.asString());
                });
                return NumberValue.ZERO;
            }
        })());

        Functions.functions.set("input", new (class implements Function {
            execute(...args: Value[]): Value {
                let value: Value;
                if (args.length === 0) {
                    value = new StringValue("");
                } else {
                    value = new StringValue(args.map(arg => arg.asString()).join(""));
                }
        
                const prompt = promptSync();
                const userInput = prompt(`${value.asString()}`);
        
                return new StringValue(userInput);
            }
        }));
        
    }

    static isExists(key: string): boolean {
        return Functions.functions.has(key);
    }

    static get(key: string): Function {
        if (!Functions.isExists(key)) throw new Error("Unknown function " + key + "!");
        return Functions.functions.get(key)!;
    }

    static set(key: string, func: Function): void {
        Functions.functions.set(key, func);
    }
}