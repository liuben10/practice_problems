from typing import List, Dict
from collections import defaultdict

class DirectedGraph:

    def __init__(self, nodes: int, edges: List[List[int]]):
        self.graph = [[] for _ in range(nodes)]
        self.edges = edges 
        self.nodes = nodes
        self.convertAdjMatrix(edges)
        self.vertices = []
        self.assigned = {}

    def convertAdjMatrix(self,  edges: List[List[int]]):
        for edge in edges:
            if (edge[0] < len(self.graph)):
                self.graph[edge[0]].append(edge[1])
            else:
                print(f"ERROR invalid node. {edge[0]}")
        if (len(self.graph) < self.nodes):
            for _ in range(len(self.graph), self.nodes):
                self.graph.append([])
        

    def visit(self, node: int, outNodes: List[int], vertices: List[List[int]],  visited: List[bool]):
        if (not visited[node]):
            visited[node] = True
            for nextnode in outNodes:
                self.visit(nextnode, self.graph[nextnode], vertices, visited)
            vertices.insert(0, [])

    def assign(self, node: int, root: int, vertices: List[List[int]], assigned: Dict[int, List[int]]):
        if (node not in assigned):
            assigned[root] = [node]
            for nextnode in self.graph[node]:
                self.assign(nextnode, node, vertices, assigned)

    def __str__(self):
        return f"Graph={self.graph}, Assigned={self.assigned}"
    
        
    def kosaraju(self):
        visited = [False for _ in range(self.nodes)]
        vertices = []
        assigned = {}
        for i, out in enumerate(self.graph):
            self.visit(i, out, vertices, visited)
        for i, _ in enumerate(vertices):
            self.assign(i, i, vertices, assigned)
        self.assigned = assigned

    def sources(self):
        assert len(self.assigned), "ERROR, you need to first run Kosaraju to build assigned graph"
        sources = []
        assigncopy = self.assigned.copy()
        for v in self.assigned.values():
            if (len(v) and v[0] in self.assigned):
                assigncopy[v[0]] = []
        for i, v in assigncopy.items():
            if (len(v) > 0):
                sources.append(i)
        return sources

if __name__ == '__main__':
    g = DirectedGraph(10, 
        [[0,1],
         [1,2],
        [2,3],
        [3,4],
        [4,2],
        [4,5],
        [5,6],
        [6,7],
        [7,6],
        [6,5],
        [7,8],
        [8,9]]
    )
    print(g)
    g.kosaraju()
    print(g)
    print(g.sources())