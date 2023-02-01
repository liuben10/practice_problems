import {walk, recursive} from 'acorn-walk';

function traverse(ast, v) {
    recursive(ast, v.programState, {
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
        Literal: (node, state, c) => {
            v.visitLiteral(node);
        }

    });
    console.log("TRAVERSAL ORDER");
    console.log(v.traversal);
}

class Visitor {
    constructor(programState, state) {
        this.programState = programState;
        this.state = state;
        this.traversal = [];
    }

    resetPcToBeginningIfInLoop() {
        if (this.programState.loops) {
        }       
    }
    
    visitLiteral(node) {
        this.programState.currentStartLine = node.start;
        this.programState.currentEndLine = node.end;
        this.traversal.push(node);
        console.log(` literal VISITING: ${node.type} start: ${node.start} end ${node.end}; PC = ${this.programState.currentStartLine}, ${this.programState.currentEndLine}`);
        return null;
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
        this.programState.currentStartLine = node.start;
        this.programState.currentEndLine = node.end;
        this.traversal.push(node);
        console.log(` variable declaration statement VISITING: ${node.type} start: ${node.start} end ${node.end}; PC = ${this.programState.currentStartLine}, ${this.programState.currentEndLine}`);
        return null;
    }
    
    visitExpressionStatement(node) {
        this.programState.currentStartLine = node.start;
        this.programState.currentEndLine = node.end;
        this.traversal.push(node);
        console.log(` expression statement VISITING: ${node.type}; PC = ${this.programState.currentStartLine}, ${this.programState.currentEndLine}`);
        return null;
    }

    
    visitForStatement(node) {
        this.programState.currentStartLine = node.start;
        this.programState.currentEndLine = node.end;     
        this.traversal.push(node); 
        // this.programState.loops.push(node);
        console.log(`for statement VISITING ${node.type}; PC = ${this.programState.currentStartLine}, ${this.programState.currentEndLine}`);
        traverse(node.body, new Visitor(copyObject(this.programState), copyObject(this.state)));     
        return null;

    }

    visitWhileStatement(node) {
        console.log(`while statement VISITING ${node.type}; PC = ${this.programState.currentStartLine}, ${this.programState.currentEndLine}`);
        this.programState.currentStartLine = node.start;
        this.programState.currentEndLine = node.end;      
        this.traversal.push(node);
        traverse(node.body, new Visitor(copyObject(this.programState), copyObject(this.state)));     
        return null;
    }

    visitCallExpression(node) {
        this.programState.currentStartLine = node.start;
        this.programState.currentEndLine = node.end;      
        this.traversal.push(node);
        console.log(`call statement VISITING ${node.type}; PC = ${this.programState.currentStartLine}, ${this.programState.currentEndLine}`);
        return null;
    }

    visitReturnStatement(node) {
        this.programState.currentStartLine = node.start;
        this.programState.currentEndLine = node.end;      
        console.log(
            `return statement VISITING ${node.type}; PC = ${this.programState.currentStartLine}, ${this.programState.currentEndLine}`
        )
        this.traversal.push(node);
        return null;
    }
}

function copyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export {Visitor, traverse};