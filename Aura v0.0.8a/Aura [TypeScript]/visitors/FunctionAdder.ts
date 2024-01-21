import { FunctionDefineStatement } from "../ast/FunctionDefineStatement";
import { AbstractVisitor } from "./AbstractVisitor";

export class FunctionAdder extends AbstractVisitor {
    
    visit(s: any): void {
        if (s instanceof FunctionDefineStatement) {
            // super.visit(s);
            s.execute();
        } else {
            super.visit(s);
        }
    }
}