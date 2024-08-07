from typing import Dict, List
from collections import defaultdict

def process(reports) -> Dict[int, List[int]]:
    graph = defaultdict(set)
    for r in reports:
        graph[r[0]].add(r[1])
        if (r[1] not in graph):
            graph[r[1]] = set()
    return graph

def compute_party_score(curnode, reportgraph, levels, partyscores, visited, taken):
    mydirects = reportgraph[curnode]
    visited.add(curnode)
    if (len(taken) == 0):
        taken.add(curnode)
    else: # only include nodes that do not match my criteria (of either being a dr of taken, or taken is one of my dr)
        should_include = True
        for t in taken:
            if (curnode in reportgraph[t] or t in reportgraph[curnode]):
                should_include = False
        if(should_include):
            taken.add(curnode)
    for report in mydirects: # visit my direct reports whom I have not yet visited
        if (report not in visited):
            compute_party_score(report, reportgraph, levels, partyscores, visited, taken)
    for k, v in reportgraph.items(): # visit my managers who I report to.
        if (curnode in v and k not in visited):
            compute_party_score(k, reportgraph, levels, partyscores, visited, taken)
    party_score = 0
    print(f"curnode {curnode} taken {taken}")
    for t in taken:
        party_score += levels[t]
    partyscores[curnode] = party_score

def get_max_party_score(levels, reports):
    reportgraph = process(reports)
    maxpartyscore = 0
    for i in range(len(levels)):
        taken = set()
        visited = set()
        partyscores = [0 for i in range(len(levels))]
        compute_party_score(i, reportgraph, levels, partyscores, visited, taken)
        maxpartyscore = max(maxpartyscore, partyscores[i])
    return maxpartyscore

print(get_max_party_score([10, 6, 6, 5, 5, 3], [
    [0,1],
    [0,2],
    [1,3],
    [1,4],
    [3,5]
]))