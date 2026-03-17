class Employee:
    def __init__(self, name, age, salary):
        self.name = name
        self.age = age
        self.salary = salary

    def work(self):
        return "Employee is working"

    def info(self):
        return f"{self.name}, Age: {self.age}, Salary: {self.salary}$"

    def __str__(self):
        return f"Employee: {self.name}, Age: {self.age}, Salary: {self.salary}$"


class Teacher(Employee):
    def __init__(self, name, age, salary, subject):
        super().__init__(name, age, salary)
        self.subject = subject

    def work(self):
        return f"Teacher {self.name} is teaching {self.subject}"


class Developer(Employee):
    def __init__(self, name, age, salary, language):
        super().__init__(name, age, salary)
        self.language = language

    def work(self):
        return f"Developer {self.name} is coding in {self.language}"