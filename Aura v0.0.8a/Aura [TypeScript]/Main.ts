import { VariablePrinter } from "./visitors/VariablePrinter";
import { AssignValidator } from "./visitors/AssignValidator";
import { FunctionAdder } from "./visitors/FunctionAdder";
import { Statement } from './ast/Statement';
import { Parser } from "./Parser";
import { Token } from "./Token";
import { Lexer } from "./Lexer";

import * as fs from 'fs';

const input = fs.readFileSync("program.ar", 'utf8');
// const input: string = '2 * (3 + 4 * (2 + 2))'; // 19 !38

let tokens: Token[] = new Lexer(input).tokenize()
if (tokens.length !== 0) {
    for (let token of tokens) {
        if (token.value != null)
            console.log(`${token.type}: ${token.value}`);
        else
            console.log(`${token.type}`);
    }
    console.log("");
}

let program: Statement = new Parser(tokens).parse();
if (program) {
    console.log(program.toString());
    program.accept(new FunctionAdder());
    program.accept(new VariablePrinter());
    program.accept(new AssignValidator());
    console.log("");
    program.execute();
}