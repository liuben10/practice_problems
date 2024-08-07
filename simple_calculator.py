def eval(expression):
    expression += "+"
    nums = []
    i = 0
    current_sign = "+"
    curnum = ""
    while(i < len(expression)):
        if (expression[i].isdigit()):
            curnum += expression[i]
        elif (expression[i] == "+" or expression[i] == "-" or expression[i] == "*" or expression[i] == "/"):
            if (current_sign == "+"):
                nums.append(int(curnum))
            if (current_sign == "-"):
                nums.append(-1 * int(curnum))
            if (current_sign == "*"):
                lastNum = nums.pop()
                nums.append(lastNum * int(curnum))
            if (current_sign == "/"):
                lastNum = nums.pop()
                nums.append(lastNum / int(curnum))
            curnum = ""
            current_sign = expression[i]
        i += 1
    ans = 0
    while(len(nums)):
        ans += nums.pop()
    return ans

if __name__ == '__main__':
    expr = "1+2*3+18/9"
    print(eval(expr))