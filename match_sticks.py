from typing import List

class Solution:
    def calculate_ms_part(self, matchsticks: List[int]) -> int:
        total = sum(matchsticks)
        if total % 4 != 0:
            return -1
        return total // 4
    
    def can_combine_matchsticks(self, matchsticks: List[int], last_non_partition_match_idx: int, ms_partition: int, num_slots: int) -> bool:
        while num_slots >= 0:
            single_edge = self.try_form_single_edge(matchsticks, last_non_partition_match_idx)
        
    
    def check_sorted_matchsticks(self, matchsticks: List[int], ms_partition: int) -> bool:
        snapshot = 0
        square_check = []
        last_non_partition_match_idx = 0
        for i in range(len(matchsticks)-1, -1, -1):
            if matchsticks[i] == ms_partition:
                square_check.append(matchsticks[i])
            else:
                last_non_partition_match_idx = i
                break
        if (len(square_check) < 4):
            return self.can_combine_matchsticks(matchsticks, last_non_partition_match_idx, ms_partition, 4 - len(square_check))
        else:
            return len(square_check) == 4
    
    def makesquare(self, matchsticks: List[int]) -> bool:
        ms_partition: int = self.calculate_ms_part(matchsticks)
        if (ms_partition < 0):
            return False
        matchsticks.sort()
        if matchsticks[-1] > ms_partition:
            return False
        return self.check_sorted_matchsticks(matchsticks, ms_partition)



