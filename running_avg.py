class RunningAvg:

    def __init__(self):
        self.avg = 0
        self.n = 0

    #  avg_n = (x1 + x2 + x3 + ... xn) / n
    # avg_n+1 = (x1 + x2 + x3 + ... + xn + xn+1) / n+1
    # avg_n+1 * (n+1) = (x1 + x2 + x3 + ... + xn + xn+1)
    # avg_n+1 * n + avg_n+1 - xn+1 = (x1 + x2 + x3 + .. + xn)
    # avg_n+1 +avg_n+1 / n - xn+1 / n = (x1 + ... + xn) / n
    # 2avg_n+1 / n = (avg_n + (x_n+1 / n))
    # avg_n+1 = n/2(avg_n + x_n+1/n)
    def add(self, elem):
        if (self.avg == 0):
            self.avg = elem
            self.n += 1
        else:
            self.avg = (self.n / 2 ) * (self.avg + (elem / (self.n)))
            self.n += 1


if __name__ == '__main__':
    r = RunningAvg()
    r.add(3)
    r.add(4)
    print(r.avg)
            