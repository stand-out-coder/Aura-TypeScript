import { Visitor } from "./Visitor";

export interface Node {
    accept(visitor: Visitor): void;
}