import { Node as NODE } from "./Node";
import { Value } from "../lib/Value";

export interface Expression extends NODE {
    eval(): Value;
}