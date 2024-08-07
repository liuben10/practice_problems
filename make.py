from typing import List, Dict
from collections import defaultdict

"""

Given a dependency list.
[
    [a, b]
    [b, c]
    [c, d]
    [d, e]
    [e, f]
    [f, c]
]

determine build order

----

1. process dependency list into graph
2. run kahns on graph to see if we can clear graph or get into a cycle.

"""


class Make:

    def process(self, dependencyList: List[List[str]]) -> Dict[str, List[str]]:
        g = defaultdict(list)
        for l in dependencyList:
            dep, src = l[0], l[1]
            g[src].append(dep)
            if (dep not in g):
                g[dep] = []
        return g
    
    def zeroes(self, indegree: Dict[str, int]) -> List[str]:
        return [x for x, v in indegree.items() if v == 0]
    
    def kahns(self, depgraph: Dict[str, List[str]]) -> List[str]:
        order = []
        indegree = {}
        for d in depgraph.keys():
            indegree[d] = 0
        for outedges in depgraph.values():
            for n in outedges:
                indegree[n] += 1
        zeroes = self.zeroes(indegree)
        while len(zeroes):
            for z in zeroes:
                del indegree[z]
                order.append(z)
                for e in depgraph[z]:
                    indegree[e] -= 1
            zeroes = self.zeroes(indegree)
        if (len(indegree) > 0):
            print(f"ERROR, Failed to make {depgraph} -- cycle detected")
            return []
        return order
    
    def make(self, dependencyList: List[List[int]]) -> List[str]:
        depgraph: Dict[str, List[int]] = self.process(dependencyList)
        return self.kahns(depgraph)
    
def test_make(indeps, expectorder) -> List[str]:
    m = Make()
    outorder = m.make(indeps)
    assert outorder == expectorder, f"Expected {outorder} == {expectorder} given inorder {indeps}"
    print(f"Passed make {indeps}")

if __name__ == '__main__':
    test_make([
        ["A", "B",],
        ["B", "C",],
        ["C", "D"]
    ], ["D", "C", "B", "A"])
    test_make([
        ["A", "B",],
        ["B", "C",],
        ["C", "D"],
        ["D", "A"]
    ], [])
    test_make([
        ["A", "B",],
        ["B", "C",],
        ["C", "D"],
        ["A", "C"],
        ["A", "D"]
    ], ["D", "C", "B", "A"])