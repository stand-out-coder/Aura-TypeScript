import { ArrayAccessExpression } from "../ast/ArrayAccessExpression";
import { AssignmentStatement } from "../ast/AssignmentStatement";
import { VariableExpression } from "../ast/VariableExpression";
import { AbstractVisitor } from "../visitors/AbstractVisitor";

export class VariablePrinter extends AbstractVisitor {

    visit(s: any): void {
        // super.visit(s);
        if (s instanceof ArrayAccessExpression) {
            console.log(s.variable);
        } else if (s instanceof AssignmentStatement) {
            console.log(s.variable);
        } else if (s instanceof VariableExpression) {
            console.log(s.name);
        } else {
            super.visit(s);
        }
    }
}