function setInProgramState(state, variableDeclaration) {
    // For now assume single declaration
    let decl = variableDeclaration.declarations[0];
    let init = variableDeclaration.declarations[0].init;
    state[decl.name] = init.raw;
}

