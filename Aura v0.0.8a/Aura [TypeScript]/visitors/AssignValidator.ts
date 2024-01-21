import { AssignmentStatement } from "../ast/AssignmentStatement";
import { AbstractVisitor } from "../visitors/AbstractVisitor";
import { Variables } from "../lib/Variables";

export class AssignValidator extends AbstractVisitor {
    
    visit(s: any): void {
        if (s instanceof AssignmentStatement) {
            // super.visit(s);
            if (Variables.isExists(s.variable)) {
                throw new Error("Cannot assign value to constant!");
            }
        } else {
            super.visit(s);
        }
    }
}