import {walk, recursive} from 'acorn-walk';

function traverse(ast, program_state, state) {
    let v = new Visitor(program_state, state);
    recursive(ast, {}, {
        VariableDeclaration: (node, state, c) => {
            v.visitVariableDeclaration(node);
        },
        ExpressionStatement: (node, state, c) => {
            v.visitExpressionStatement(node);
        },
        CallExpression: (node, state, c) => {
            v.visitCallExpression(node);
        },
        ForStatement:(node, state, c) => {
            v.visitForStatement(node);
        },
        WhileStatement: (node, state, c) => {
            v.visitWhileStatement(node);
        },
        ReturnStatement: (node, state, c) => {
            v.visitReturnStatement(node);
        },

    });
}

class Visitor {
    constructor(program_state, state) {
        this.program_state = program_state;
        this.state = state;
    }

    resetPcToBeginningIfInLoop() {
        if (this.program_state.loops) {
        }       
    }

    /*
    *
    * Node {
    *  body | declarations
    *  start
    *  end
    *
    * */
    visitVariableDeclaration(node) {
        this.program_state.pc_start = node.start;
        this.program_state.pc_end = node.end;
        console.log(` variable declaration statement VISITING: ${node.type} start: ${node.start} end ${node.end}; PC = ${this.program_state.pc_start}, ${this.program_state.pc_end}`);
        return null;
    }
    
    visitExpressionStatement(node) {
        this.program_state.pc_start = node.start;
        this.program_state.pc_end = node.end;
        console.log(` expression statement VISITING: ${node.type}; PC = ${this.program_state.pc_start}, ${this.program_state.pc_end}`);
        return null;
    }

    
    visitForStatement(node) {
        this.program_state.pc_start = node.start;
        this.program_state.pc_end = node.end;      
        this.program_state.loops.push(node);
        console.log(`for statement VISITING ${node.type}; PC = ${this.program_state.pc_start}, ${this.program_state.pc_end}`);
        traverse(node.body, copyObject(this.program_state), copyObject(this.state));     
        return null;

    }

    visitWhileStatement(node) {
        console.log(`while statement VISITING ${node.type}; PC = ${this.program_state.pc_start}, ${this.program_state.pc_end}`);
        this.program_state.pc_start = node.start;
        this.program_state.pc_end = node.end;      
        this.program_state.loops.push(node);         
        traverse(node.body, copyObject(this.program_state), copyObject(this.state));     
        return null;
    }

    visitCallExpression(node) {
        this.program_state.pc_start = node.start;
        this.program_state.pc_end = node.end;      
        console.log(`call statement VISITING ${node.type}; PC = ${this.program_state.pc_start}, ${this.program_state.pc_end}`);
        this.program_state.loops.push(node);  
        return null;
    }

    visitReturnStatement(node) {
        this.program_state.pc_start = node.start;
        this.program_state.pc_end = node.end;      
        console.log(
            `return statement VISITING ${node.type}; PC = ${this.program_state.pc_start}, ${this.program_state.pc_end}`
        )
        this.program_state.loops.push(node);  
        return null;
    }
}

function copyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export {Visitor, traverse};