graph = [[1,2], [0,2],[0,1]]

recstack=[False, False, False,False]
visited=[False,False,False,False]

def detect_cycle(graph, i, recstack, visited):
    print(f"G{graph} i{i} recstack{recstack} visited{visited}")
    if (not visited[i]):
        recstack[i] = True
        visited[i] = True
        for node in graph[i]:
            if not visited[node] and detect_cycle(graph, node, recstack, visited):
                return True
            elif recstack[node]:
                return True
    recstack[i] = False
    return False

def detectCycle2(graph):
    explore = []
    explore.append((0, {}))
    while(explore):
        node, pathsofar = explore.pop(0)
        nextnodes = graph[node]
        for n in nextnodes:
            if (n in pathsofar):
                return True
            else:
                newpathsofar = pathsofar
                newpathsofar[node] = 1
                explore.insert(0, ((n, newpathsofar)))
    return False
        
if __name__ == '__main__':
    print(f"Has cycle {detectCycle2(graph)}")