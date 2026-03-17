from models import Employee, Teacher, Developer


def main():
    employee1 = Teacher("Banu", 30, 1200, "Math")
    employee2 = Developer("Erdauyt", 25, 1500, "Python")
    employee3 = Employee("Ayan", 40, 1000)

    employees = [employee1, employee2, employee3]

    for e in employees:
        print(e)
        print(e.info())
        print(e.work())
        print()


if __name__ == "__main__":
    main()