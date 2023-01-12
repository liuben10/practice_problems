import {walk, recursive} from 'acorn-walk';

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
        console.log(` variable declaration statement VISITING: ${node.type} start: ${node.start} end ${node.end}; PC = ${this.program_state.pc}`);
        this.program_state.pc += 1;
        return null;
    }
    
    visitExpressionStatement(node) {
        console.log(` expression statement VISITING: ${node.type}; PC = ${this.program_state.pc}`);
        this.program_state.pc += 1;
        return null;
    }

    
    visitForStatement(node) {
        console.log(`for statement VISITING ${node.type}; PC = ${this.program_state.pc}`);
        this.program_state.pc += 1;
        this.program_state.loops.push(node);
        traverse(node.body, copyObject(this.program_state), copyObject(this.state));        
        return null;

    }

    visitWhileStatement(node) {
        console.log(`while statement VISITING ${node.type}; PC = ${this.program_state.pc}`);
        this.program_state.pc += 1;
        this.program_state.loops.push(node);
        traverse(node.body, copyObject(this.program_state), copyObject(this.state));        
        return null;
    }

    visitCallExpression(node) {
        console.log(`call statement VISITING ${node.type}; PC = ${this.program_state.pc}`);
        this.program_state.pc += 1;
        return null;
    }

    visitReturnStatement(node) {
        console.log(
            `return statement VISITING ${node.type}; PC = ${this.program_state.pc}`
        )
        this.program_state.pc += 1;
        return null;
    }

}

function copyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function traverse(ast, program_state, state) {
    let v = new Visitor({pc: 0, loops: []}, {});
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

export {Visitor, traverse};