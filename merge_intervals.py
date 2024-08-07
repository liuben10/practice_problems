def overlap(a, b):
    return max(a[1], b[1]) - min(a[0], b[0]) < (a[1] - a[0]) + (b[1] - b[0])

def overlap2(a, b):
    return a[0] < b[1] and b[0] < a[1]

def binary_search(intervals, interval):
    low = 0
    high = len(intervals)-1
    while(low <= high):
        mid = low + (high - low) // 2
        if (overlap(intervals[mid], interval)):
            return mid
        elif (intervals[mid][0] > interval[1]):
            high = mid-1
        else:
            low = mid+1
    return mid

def binary_search_high(intervals, interval):
    low = 0
    high = len(intervals)-1
    while(low <= high):
        mid = low + (high - low) // 2
        if (overlap(intervals[mid], interval)):
            return mid
        elif (intervals[mid][1] < interval[0]):
            high = mid-1
        else:
            low = mid+1
    return mid

def combine(intervals, ins):
    insert_pos = binary_search(intervals, ins)
    print(f"insertPos={insert_pos}")
    if (overlap(ins, intervals[insert_pos])):
        ins[0] = min(ins[0], intervals[insert_pos][0])
    end_pos = insert_pos
    while(end_pos < len(intervals) and overlap(intervals[end_pos], ins)):
        ins[1] = max(ins[1], intervals[end_pos][1])
        end_pos += 1
    combined = []
    appended = False
    for i, interval in enumerate(intervals):
        if (i < insert_pos):
            combined.append(interval)
        if (i > end_pos):
            combined.append(interval)
        elif (not appended):
            combined.append(ins)
            appended = True
    return combined
    


print(overlap2([1,4], [3,4]))