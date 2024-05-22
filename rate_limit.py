import functools

db = {}
mq = []

def ratelimit(func):
    def wrapper(*args, **kwargs):
        if db[func.__name__] <= 0:
            print(f"{func.__name__} is being throttled")
            return 0
        else:
            db[func.__name__] -= 1
        return func(*args, **kwargs)
    if (func.__name__ not in db):
        print(f"Adding={func.__name__}")
        db[func.__name__] = 50
        print(db)
    return wrapper
    
@ratelimit
def fib(n):
    if (n < 2):
        return 1
    prev = 1
    cur = 1
    for _ in range(1, n):
        sum = cur + prev
        prev = cur
        cur = sum
    return cur

for i in range(100):
    print(fib(i))

