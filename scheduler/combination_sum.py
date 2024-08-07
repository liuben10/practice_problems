from typing import List, Tuple, Dict
import random
import math

class Solution:
    def hash(self, elems: List[int]):
        elems.sort()
        h = 1
        for e in elems:
            h *= e * 5 + 1
        return h
    
    def collectHelp(self, solution: List[List[int]], candidates: List[int], j: int, i: int, solutionSoFar: List[int], allSolutions: List[List[int]]):
        if (j == 0):
            allSolutions.append(solutionSoFar)
        if (j - candidates[i] >= 0):
            self.collectHelp(solution, candidates, j - candidates[i], i - 1, solutionSoFar + [candidates[i]], allSolutions)
        self.collectHelp(solution, candidates, j, i - 1, solutionSoFar, allSolutions)
            
        
            
    def collect(self, solution: List[List[int]], candidates: List[int]):
        self.collectHelp(solution, candidates, len(solution), len(solution[0]), [], [])
    
    def combinationSum2DP(self, candidates: List[int], target: int) -> List[List]:
        S = [[0 for i in range(len(candidates)+1)] for j in range(target+1)]
        for i in range(len(candidates)+1):
            S[0][i] = 1
        for j in range(1, target+1):
            for i in range(1, len(candidates)+1):
                if (j - candidates[i-1] >= 0):
                    S[j][i] += S[j-candidates[i-1]][i-1]
                S[j][i] += S[j][i-1]
        for r in S:
            print(r)

    def combHelp(self, candidates: List[int], target: int, idx: int, ret: Dict[int, List[int]], solSoFar: List[int]):
        if (target == 0):
            ret[self.hash(solSoFar)] = solSoFar
        for i in range(idx, len(candidates)):
            if (i - 1 >= 0 and candidates[i] == candidates[i-1]):
                continue
            if (candidates[i] > target):
                break
            solSoFar.append(candidates[i])
            self.combHelp(candidates, target - candidates[i], i+1, ret, solSoFar.copy())
            solSoFar.pop()

    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        dedup = {}
        self.combHelp(candidates, target, 0, dedup, [])
        solution = []
        for k, v in dedup.items():
            solution.append(v)
        return solution
    
    def computeComboSum(self, candidates: List[int], target: int, mask: int) -> Tuple[List[int], int]:
        mc = mask
        i = len(candidates)-1
        sumForCombo = 0
        combo = []
        while (i >= 0):
            if (mc & 1 == 1):
                sumForCombo += candidates[i]
                combo.insert(0, candidates[i])
            mc >>= 1
            i -= 1
        return combo, sumForCombo      
    
    def combinationSumIterative(self, candidates: List[int], target: int) -> List[List]:
        mask = 0
        ret = {}
        maxL = math.pow(2, len(candidates)+1)
        while (mask < maxL):
            combo, s = self.computeComboSum(candidates, target, mask)
            if (target == s):
                ret[self.hash(combo)] = combo
            mask += 1
        retdedup = []
        for _, v in ret.items():            
            retdedup.append(v)
        return retdedup

    
    def combinationSum2(self, candidates: List[int], target: int) -> List[List]:
        if (target == 0):
            return [[]]
        elif (target < 0):
            return []
        elif (len(candidates) == 0):
            return []
        elif (len(candidates) == 1):
            if (target == candidates[0]):
                return [[candidates[0]]]
            return []
        else:
            solution = {}
            for i, c in enumerate(candidates):
                c_removed  = candidates[:i] + candidates[i+1:] if i+1 < len(candidates) else []
                takenCombs = self.combinationSum2(c_removed, target - c)
                notTakenCombs = self.combinationSum2(c_removed, target)
                for s in takenCombs:
                    newSol = s + [c]
                    solution[self.hash(newSol)] = newSol
                for s in notTakenCombs:
                    solution[self.hash(s)] = s
            ret = []
            for _, v in solution.items():
                ret.append(v)
            dedup = {}
            for r in ret:
                dedup[self.hash(r)] = r
            dedupret = []
            for k, v in dedup.items():
                dedupret.append(v)
            return dedupret

                


if __name__ == '__main__':
    s = Solution()
    candidates = [10,1,2,7,6,1,5]
    target = 8
    print(s.combinationSum2(candidates, target))
def testHashing():
    s = Solution()
    test = []
    hashes = {}
    for i in range(1000):
        randomtest = random.randint(1, 44)
        testcase = []
        for _ in range(randomtest):
            randome = random.randint(1, 1000)
            testcase.append(randome)
        h = s.hash(testcase)
        if (h != 1 and h in hashes):
            print(f"ERROR collision in hash key: {testcase}, h={h}, hashed={hashes[h]}")
            hashes[h].append(testcase)
        elif(h != 1):
            hashes[h] = [testcase]

