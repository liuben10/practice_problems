from typing import List

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        if len(s) == 0:
            return True
        else:
            for word in wordDict:
                if (len(word) <= len(s) and s[:len(word)] == word):
                    has_valid = self.wordBreak(s[len(word):], wordDict)
                    if (has_valid):
                        return True
            return False
                    
                

s = Solution()
print(s.wordBreak("catsandog", ["cats", "cat", "dog", "sand"]))
print(s.wordBreak("leetcode", ["leet", "code"]))
print(s.wordBreak("applepenapple", ["apple","pen"]))
print(s.wordBreak("oby", ["bob"]))
print(s.wordBreak("oby", ["bob", "o", "by"]))
print(s.wordBreak("obyw", ["oby"]))
print(s.wordBreak("obyw", ["obyw"]))