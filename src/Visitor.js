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
        BinaryExpression: (node, state, c) => {
            v.visitBinaryExpression(node);
        }

    });
    console.log("TRAVERSAL ORDER");
    console.log(v.traversal);
}

class Visitor {
    constructor(traversal) {
        this.traversal = traversal;
    }

    resetPcToBeginningIfInLoop() {
        if (this.programState.loops) {
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
        this.traversal.push(node);
        return null;
    }
    
    visitExpressionStatement(node) {
        this.traversal.push(node);
        console.log(` expression statement VISITING: ${node.type}`);
        return null;
    }

    visitBinaryExpression(node) {
        this.traversal.push(node);
        console.log(` binary expression VISITING: ${node.type}`);
        return null;
    }

    
    visitForStatement(node) {  
        // this.traversal.push(node); 
        // this.programState.loops.push(node);
        console.log(`for statement VISITING ${node.type}; `);
        this.traversal.push(node.init);
        this.traversal.push(node.test);
        let forloopStart = this.traversal.length - 1;

        if (node.update.prefix) {
            this.traversal.push({start: node.update.start, end: node.update.end});
        }
        traverse(node.body, new Visitor(this.traversal));    
        if(!node.update.prefix) {
            this.traversal.push({start: node.update.start, end: node.update.end});
        }
        this.traversal.push({resetProgramCounter: forloopStart});

        return null;
    }

    visitWhileStatement(node) {
        console.log(`while statement VISITING ${node.type};`);    
        // this.traversal.push(node);
        this.traversal.push(node);
        let whileLoopStart = this.traversal.length - 1;
        traverse(node.body, new Visitor(this.traversal));  
        this.traversal.push({resetProgramCounter: whileLoopStart});
        return null;
    }

    visitCallExpression(node) {     
        this.traversal.push(node);
        console.log(`call statement VISITING ${node.type};`);
        return null;
    }

    visitReturnStatement(node) { 
        console.log(
            `return statement VISITING ${node.type};`
        )
        this.traversal.push(node);
        return null;
    }
}


export {Visitor, traverse};