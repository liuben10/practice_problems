from typing import List 

class Solution:

    def nextToken(self, path, start) -> (str, int):
        if (start == len(path)):
            return "", len(path)
        c = path[start]
        seen_two_slashes = False
        assert c == '/'
        i = start + 1
        token = "/"
        while (i < len(path) and not seen_two_slashes):
            if (path[i] == "/"):
                seen_two_slashes = True
                token += "/"
                break
            elif(path[i] == "."):
                if (i+1 < len(path) and path[i+1] == "." and (i + 2 == len(path) or (i + 2 < len(path) and path[i+2] == "/"))):
                    token = "/../"
                    i += 2
                    break
                elif(i+1 == len(path) or path[i+1] == "/"):
                    token =  "/./"
                    i += 1
                    break
                else:
                    j = i
                    while (j < len(path) and path[j] != "/"):
                        token += path[j]
                        j += 1
                    i = j
                    continue
            j = i
            while (j < len(path) and path[j] != "/"):
                token += path[j]
                j += 1
            i = j
        return token, i
    
    def transformTokens(self, tokens: List[str]) -> str:
        if (len(tokens) == 0 or (len(tokens) == 1 and tokens[0] == "/")):
            return "/"
        tokenRet = ""
        for i, t in enumerate(tokens):
            if (t[-1] == "/"):
                tokenRet += t[:-1]
            else:
                tokenRet += t
        return tokenRet

    def simplifyPath(self, path: str) -> str:
        idx = 0
        simple_path = []
        while(idx < len(path)):
            token, i = self.nextToken(path, idx)
            if (token == "/../"):
                if (len(simple_path)):
                    simple_path.pop()
            elif(token == "/./" or token == "//"):
                idx = i
                continue
            else:
                simple_path.append(token)
            idx += (i - idx)
        return self.transformTokens(simple_path)
        



if __name__ == '__main__':
    s = Solution()
    print(s.simplifyPath("/home/foo"))
    print(s.simplifyPath("/../"))
    print(s.simplifyPath("//////home/..//foo/bar///baz"))
    print(s.simplifyPath("//////home/..//foo/bar//........./baz"))
    print(s.simplifyPath("/........"))
    print(s.simplifyPath("/hello../world"))