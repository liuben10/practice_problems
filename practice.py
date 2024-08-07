def encode(countAndSayString):
    if (len(countAndSayString) == 0):
        return ""
    prev = countAndSayString[0]
    count = 0
    newCountAndSay = ""
    for i in range(len(countAndSayString)):
        if countAndSayString[i] != prev:
            newCountAndSay += str(count) + prev
            count = 1
            prev = countAndSayString[i]
        else:
            count += 1
    if (count > 0):
        newCountAndSay += str(count) + prev
    return newCountAndSay

class Solution:
    def countAndSay(self, n: int) -> str:
        if n == 1:
            return "1"
        else:
            prevCountAndSay = self.countAndSay(n-1)
            return encode(prevCountAndSay)

    
if __name__ == '__main__':
    s = Solution()
    # print(encode("21"))
    print(s.countAndSay(6))