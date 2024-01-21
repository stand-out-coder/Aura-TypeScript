import { ArrayAssignmentStatement } from "./ast/ArrayAssignmentStatement"; 
import { FunctionDefineStatement } from "./ast/FunctionDefineStatement"; 
import { ConditionalExpression } from "./ast/ConditionalExpression";
import { ArrayAccessExpression } from "./ast/ArrayAccessExpression"; 
import { FunctionalExpression } from "./ast/FunctionalExpression";
import { AssignmentStatement } from "./ast/AssignmentStatement";
import { VariableExpression } from "./ast/VariableExpression";
import { FunctionStatement } from "./ast/FunctionStatement";
import { ContinueStatement } from "./ast/ContinueStatement";
import { BinaryExpression } from "./ast/BinaryExpression";
import { DoWhileStatement } from "./ast/DoWhileStatement";
import { ValueExpression } from "./ast/ValueExpression"; 
import { UnaryExpression } from "./ast/UnaryExpression";
import { IfElseStatement } from "./ast/IfElseStatement";
import { ReturnStatement } from "./ast/ReturnStatement";
import { ArrayExpression } from "./ast/ArrayExpression"; 
import { BlockStatement } from "./ast/BlockStatement";
import { WhileStatement } from "./ast/WhileStatement";
import { BreakStatement } from "./ast/BreakStatement";
import { ForStatement } from "./ast/ForStatement";
import { Expression } from "./ast/Expression";
import { Statement } from "./ast/Statement";
import { TokenType } from "./TokenType";
import { Token } from "./Token";

export class Parser {
    private tokens: Token[];
    private size: number;

    private pos: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.size = this.tokens.length;
    }

    public parse(): Statement {
    let result: BlockStatement = new BlockStatement();

        while (!(this.match(TokenType.EOF))) {
            result.add(this.statement());
        }
        return result;
    }

    private block(): Statement {
        let block: BlockStatement = new BlockStatement();
        this.consume(TokenType.LBRACE);
        while (!this.match(TokenType.RBRACE)) {
            block.add(this.statement());
        }
        return block;
    }

    private statementOrBlock(): Statement {
        if (this.lookMatch(0, TokenType.LBRACE)) return this.block();
        return this.statement();
    }

    private statement(): Statement {
        if (this.match(TokenType.IF)) {
            return this.ifElse();
        }
        if (this.match(TokenType.WHILE)) {
            return this.whileStatement();
        }
        if (this.match(TokenType.RETURN)) {
            return new ReturnStatement(this.expression());
        }
        if (this.match(TokenType.FOR)) {
            return this.forStatement();
        }
        if (this.match(TokenType.DEF)) {
            return this.functionDefine();
        }
        if (this.match(TokenType.DO)) {
            return this.doWhileStatement();
        }
        if (this.match(TokenType.BREAK)) {
            return new BreakStatement();
        }
        if (this.match(TokenType.CONTINUE)) {
            return new ContinueStatement();
        }
        if (this.lookMatch(0, TokenType.WORD) && this.lookMatch(1, TokenType.LPAREN)) {
            return new FunctionStatement(this.function());
        }
        return this.assignmentStatement();
    }

    private assignmentStatement() {
        const current: Token = this.get(0);
        if (this.lookMatch(0, TokenType.WORD) && this.lookMatch(1, TokenType.EQ)) {
            const variable: string = this.consume(TokenType.WORD).value;
            this.consume(TokenType.EQ);
            return new AssignmentStatement(variable, this.expression());
        }
        if (this.lookMatch(0, TokenType.WORD) && this.lookMatch(1, TokenType.LBRACKET)) {
            let array: ArrayAccessExpression = this.element();
            this.consume(TokenType.EQ);
            return new ArrayAssignmentStatement(array, this.expression());
        }
        for (let token of this.tokens) {
            if (token.value != null)
                console.log(`${token.type}: ${token.value}`);
            else
                console.log(`${token.type}`);
        }
        throw new Error(`Parser[assignmentStatement] Unknown expression: ${this.get(0)}!`);
    }

    private ifElse(): Statement {
        let condition: Expression = this.expression();
        let ifStatement: Statement = this.statementOrBlock()
        let elseStatement: Statement | null;
        if (this.match(TokenType.ELSE)) {
            elseStatement = this.statementOrBlock();
        } else {
            elseStatement = null;
        }
         return new IfElseStatement(condition, ifStatement, elseStatement);
    }

    private functionDefine(): FunctionDefineStatement {
        let name: string = this.consume(TokenType.WORD).value;
        this.consume(TokenType.LPAREN);
        let argNames: string[] = [];
        while (!this.match(TokenType.RPAREN)) {
            argNames.push(this.consume(TokenType.WORD).value);
            this.match(TokenType.COMMA);
        }
        let body: Statement = this.statementOrBlock();
        return new FunctionDefineStatement(name, argNames, body);
    }

    private function(): FunctionalExpression {
        let name: string = this.consume(TokenType.WORD).value;
        this.consume(TokenType.LPAREN);
        let _function: FunctionalExpression = new FunctionalExpression(name);
        while (!this.match(TokenType.RPAREN)) {
            _function.addArgument(this.expression());
            this.match(TokenType.COMMA);
        }
        return _function;
    }

    private array(): Expression {
        this.consume(TokenType.LBRACKET);
        let elements: Expression[] = [];
        while (!this.match(TokenType.RBRACKET)) {
            elements.push(this.expression());
            this.match(TokenType.COMMA);
        }
        return new ArrayExpression(elements);
    }

    private element(): ArrayAccessExpression {
        let variable: string = this.consume(TokenType.WORD).value;
        let indices: Expression[] = [];
        do {
            this.consume(TokenType.LBRACKET);
            indices.push(this.expression());
            this.consume(TokenType.RBRACKET);
        } while(this.lookMatch(0, TokenType.LBRACKET));
        return new ArrayAccessExpression(variable, indices);
    }

    private expression(): Expression {
        return this.logicalOr();
    }

    private logicalOr(): Expression {
        let result: Expression = this.logicalAnd();

        while (true) {
            if (this.match(TokenType.BARBAR)) {
                result = new ConditionalExpression(TokenType.BARBAR, result, this.logicalAnd());
                continue;
            }
            break;
        }

        return result;
    }

    private whileStatement(): Statement {
        let condition: Expression = this.expression();
        let statement: Statement = this.statementOrBlock();
        return new WhileStatement(condition, statement);
    }

    private doWhileStatement(): Statement {
        let statement: Statement = this.statementOrBlock();
        this.consume(TokenType.WHILE);
        let condition: Expression = this.expression();
        return new DoWhileStatement(condition, statement);
    }

    private forStatement(): Statement {
        this.match(TokenType.LPAREN)
        let initialization: Statement = this.assignmentStatement();
        this.consume(TokenType.COMMA);
        let termination: Expression = this.expression();
        this.consume(TokenType.COMMA);
        let increment: Statement = this.assignmentStatement();
        this.match(TokenType.RPAREN)
        let statement: Statement = this.statementOrBlock();
        return new ForStatement(initialization, termination, increment, statement);
    }

    private logicalAnd():  Expression {
        let result: Expression = this.equality();

        while (true) {
            if (this.match(TokenType.AMPAMP)) {
                result = new ConditionalExpression(TokenType.AMPAMP, result, this.equality());
                continue;
            }
            break;
        }

        return result;
    }

    private equality(): Expression {
        let result: Expression = this.conditional();

        if (this.match(TokenType.EQEQ)) {
            return new ConditionalExpression(TokenType.EQEQ, result, this.conditional());
        }
        if (this.match(TokenType.EXCLEQ)) {
            return new ConditionalExpression(TokenType.EXCLEQ, result, this.conditional());
        }

        return result;
    }

    private conditional(): Expression {
        let result: Expression = this.additive();
        
        while (true) {
            if (this.match(TokenType.LT)) {
                result = new ConditionalExpression(TokenType.LT, result, this.additive());
                continue;
            }
            if (this.match(TokenType.LTEQ)) {
                result = new ConditionalExpression(TokenType.LTEQ, result, this.additive());
                continue;
            }
            if (this.match(TokenType.GT)) {
                result = new ConditionalExpression(TokenType.GT, result, this.additive());
                continue;
            }
            if (this.match(TokenType.GTEQ)) {
                result = new ConditionalExpression(TokenType.GTEQ, result, this.additive());
                continue;
            }
            break;
        }
        
        return result;
    }

    private additive(): Expression {
        let result: Expression = this.multiplicative();

        while (true) {
            if (this.match(TokenType.PLUS)) {
                result = new BinaryExpression(result, "+", this.multiplicative());
                continue;
            }
            if (this.match(TokenType.MINUS)) {
                result = new BinaryExpression(result, "-", this.multiplicative());
                continue;
            }
            break;
        }

        return result;
    }

    private multiplicative(): Expression {
        let result: Expression = this.unary();

        while (true) {
            if (this.match(TokenType.STAR)) {
                result = new BinaryExpression(result, "*", this.unary());
                continue;
            }
            if (this.match(TokenType.SLASH)) {
                result = new BinaryExpression(result, "/", this.unary());
                continue;
            }
            break;
        }

        return result;
    }

    private unary(): Expression {
        if (this.match(TokenType.MINUS)) {
            return new UnaryExpression("-", this.primary());
        }
        if (this.match(TokenType.PLUS)) {
            return this.primary();
        }
        return this.primary();
    }

    private primary(): Expression {
        let current: Token = this.get(0);
        if (this.match(TokenType.NUMBER)) {
            return new ValueExpression(parseFloat(current.value));
        }
        if (this.match(TokenType.HEX_NUMBER)) {
            return new ValueExpression(parseInt(current.value, 16));
        }
        if (this.lookMatch(0, TokenType.WORD) && this.lookMatch(1, TokenType.LPAREN)) {
            return this.function();
        }
        if (this.lookMatch(0, TokenType.WORD) && this.lookMatch(1, TokenType.LBRACKET)) {
            return this.element();
        }
        if (this.lookMatch(0, TokenType.LBRACKET)) {
            return this.array();
        }
        if (this.match(TokenType.WORD)) {
            return new VariableExpression(current.value);
        }
        if (this.match(TokenType.STRING)) {
            return new ValueExpression(current.value);
        }
        if (this.match(TokenType.LPAREN)) {
            let result: Expression = this.expression();
            this.match(TokenType.RPAREN);
            return result;
        }
        
        for (let token of this.tokens) {
            if (token.value != null)
                console.log(`${token.type}: ${token.value}`);
            else
                console.log(`${token.type}`);
        }
        throw new Error(`Parser[primary] Unknown expression: ${this.get(0)}!`);
    }

    private consume(type: TokenType): Token {
        let current: Token = this.get(0);
        if (type !== current.type) {
            for (let token of this.tokens) {
                if (token.value != null)
                    console.log(`${token.type}: ${token.value}`);
                else
                    console.log(`${token.type}`);
            }
            throw new Error("Parser[consume] Token " + current + " doesn't match " + type + "!");
        }
        this.pos++;
        return current;
    }

    private match(type: TokenType): boolean {
        let current: Token = this.get(0);
        if (type !== current.type) return false;
        this.pos++;
        return true;
    }

    private lookMatch(pos: number, Type: TokenType): boolean {
        return this.get(pos).type == Type;
    }

    private get(relPos: number): Token {
        let position: number = this.pos + relPos;
        if (position >= this.size) { return new Token(TokenType.EOF); }
        return this.tokens[position];
    }
}
