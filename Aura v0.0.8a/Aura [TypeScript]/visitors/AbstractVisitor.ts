import { Visitor } from "../ast/Visitor";
import { ArrayAssignmentStatement } from "../ast/ArrayAssignmentStatement"; 
import { FunctionDefineStatement } from "../ast/FunctionDefineStatement"; 
import { ConditionalExpression } from "../ast/ConditionalExpression";
import { ArrayAccessExpression } from "../ast/ArrayAccessExpression"; 
import { FunctionalExpression } from "../ast/FunctionalExpression";
import { AssignmentStatement } from "../ast/AssignmentStatement";
import { VariableExpression } from "../ast/VariableExpression";
import { FunctionStatement } from "../ast/FunctionStatement";
import { ContinueStatement } from "../ast/ContinueStatement";
import { BinaryExpression } from "../ast/BinaryExpression";
import { DoWhileStatement } from "../ast/DoWhileStatement";
import { ValueExpression } from "../ast/ValueExpression"; 
import { UnaryExpression } from "../ast/UnaryExpression";
import { IfElseStatement } from "../ast/IfElseStatement";
import { ReturnStatement } from "../ast/ReturnStatement";
import { ArrayExpression } from "../ast/ArrayExpression"; 
import { BlockStatement } from "../ast/BlockStatement";
import { WhileStatement } from "../ast/WhileStatement";
import { BreakStatement } from "../ast/BreakStatement";
import { ForStatement } from "../ast/ForStatement";

export abstract class AbstractVisitor implements Visitor {
    
    visit(s: ArrayAccessExpression | ArrayAssignmentStatement | ArrayExpression | AssignmentStatement |
        BinaryExpression | BlockStatement | BreakStatement | ConditionalExpression | ContinueStatement |
        DoWhileStatement | ForStatement | FunctionDefineStatement | FunctionStatement |
        FunctionalExpression | IfElseStatement | ReturnStatement | UnaryExpression |
        ValueExpression | VariableExpression | WhileStatement): void {
        if (s instanceof ArrayAccessExpression) {
            for (const index of s.indices) {
                index.accept(this);
            }
        } else if (s instanceof ArrayAssignmentStatement) {
            s.array.accept(this);
            s.expression.accept(this);
        } else if (s instanceof ArrayExpression) {
            for (const index of s.elements) {
                index.accept(this);
            }
        } else if (s instanceof AssignmentStatement) {
            s.expression.accept(this);
        } else if (s instanceof BinaryExpression) {
            s.expr1.accept(this);
            s.expr2.accept(this);
        } else if (s instanceof BlockStatement) {
            for (const statement of s.statements) {
                statement.accept(this);
            }
        } else if (s instanceof BreakStatement) {
        } else if (s instanceof ConditionalExpression) {
            s.expr1.accept(this);
            s.expr2.accept(this);
        } else if (s instanceof ContinueStatement) {
        } else if (s instanceof DoWhileStatement) {
            s.condition.accept(this);
            s.statement.accept(this);
        } else if (s instanceof ForStatement) {
            s.initialization.accept(this);
            s.termination.accept(this);
            s.increment.accept(this);
            s.statement.accept(this);
        } else if (s instanceof FunctionDefineStatement) {
            s.body.accept(this);
        } else if (s instanceof FunctionStatement) {
            s._function.accept(this);
        } else if (s instanceof FunctionalExpression) {
            for (const argument of s.arguments) {
                argument.accept(this);
            }
        } else if (s instanceof IfElseStatement) {
            s.expression.accept(this);
            s.ifStatement.accept(this);
            if (s.elseStatement !== null) {
                s.elseStatement.accept(this);
            }
        } else if (s instanceof ReturnStatement) {
            s.expression.accept(this);
        } else if (s instanceof UnaryExpression) {
            s.operand.accept(this);
        } else if (s instanceof ValueExpression) {
        } else if (s instanceof VariableExpression) {
        } else if (s instanceof WhileStatement) {
            s.condition.accept(this);
            s.statement.accept(this);
        }
    }
}