n = int(input())

students = []
grades = []

for _ in range(n):
    name = input()
    grade = float(input())
    students.append([name, grade])
    grades.append(grade)

second = sorted(set(grades))[1]

names = [name for name, grade in students if grade == second]

for name in sorted(names):
    print(name)