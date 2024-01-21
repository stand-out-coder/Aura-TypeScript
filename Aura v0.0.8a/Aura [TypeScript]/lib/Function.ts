import { Value } from "./Value";

export abstract class Function {
    abstract execute(...args: Value[]): Value;
}