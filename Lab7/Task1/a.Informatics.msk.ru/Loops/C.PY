import math

a = int(input())
b = int(input())

start = int(math.ceil(math.sqrt(a)))
end = int(math.floor(math.sqrt(b)))

for i in range(start, end + 1):
    print(i * i, end=" ")