import { Node as NODE } from "./Node";

export interface Statement extends NODE {
    execute(): void;
}