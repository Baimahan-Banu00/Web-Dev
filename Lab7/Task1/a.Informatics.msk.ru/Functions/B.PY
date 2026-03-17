def power(a, n):
    return a ** n

a, n = input().split()
a = float(a)
n = int(n)

print(power(a, n))