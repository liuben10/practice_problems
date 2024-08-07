from typing import List, Set

def find_palindrome(strin: str) -> Set[str]:
    ans = set()
    for i in range(len(strin)):
        right = i
        left = i
        while(right < len(strin) and left >= 0 and strin[right] == strin[left]):
            left -= 1
            right += 1
        ans.add(strin[left+1:right])
        if (i + 1 < len(strin)):
            left = i
            right = i + 1
            while(right < len(strin) and left >= 0 and strin[right] == strin[left]):
                left -= 1
                right += 1
            if (right != i + 1):
                ans.add(strin[left+1:right])
            else:
                if (strin[right] == strin[left]):
                    ans.add(strin[left+1:right])
    return ans

print(find_palindrome("abba"))