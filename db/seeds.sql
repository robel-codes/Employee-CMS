INSERT INTO department
    (name) 
VALUES 
    ('Administration'),
    ('Marketing'),
    ('Purchasing'),
    ('Human Resources'),
    ('Shipping'),
    ('IT'),
    ('Public Relations'),
    ('Sales'),
    ('Executive'),
    ('Finance'),
    ('Accounting');

INSERT INTO role 
    (title, salary, department_id)
 VALUES
    ('Public Acoountant', 45000, 1),
    ('Accounting Manager', 65000, 2),
    ('Administration Assistant', 42400, 3),
    ('President', 32000, 4),
    ('Adminstration Vice President', 1, 2),
    ('Acountant', 71500, 9),
    ('Finance Manager', 71500, 7),
    ('Human Resources Representative', 71500, 8),
    ('Programmer', 71500, 9),
    ('Marketing Manager', 71500, 10),
    ('Marketing Representative', 71500, 11),
    ('Public Relations Rep', 71500, 8),
    ('Purchasing Clerk', 71500, 7),
    ('Purchasing Manager', 71500, 1),
    ('Sales Manager', 71500, 6),
    ('Sales Representative', 71500, 6),
    ('Shipping Clerk', 71500, 7),
    ('Stock Clerk', 71500, 4),
    ('Stock Manager', 71500, 2);


INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Steven','King', 1, NULL),
    ('Neena','Kochhar', 2, 1),
    ('Alexander','Hunold', 3, 1),
    ('Bruce','Ernst', 4, 1),
    ('David','Austin', 3, 4),
    ('Valli','Pataballa', 3, 4),
    ('Diana','Lorentz', 6, 1),
    ('Nancy','Greenberg', 6, 6),
    ('Daniel','Faviet', 17, 6),
    ('John','Chen', 14, 7),
    ('Ismael','Sciarra', 4, 4),
    ('Jose Manuel','Urman', 14, 4),
    ('Luis','Popp', 16, 11),
    ('Den','Raphaely', 1, 11),
    ('Alexander','Khoo', 3, 6),
    ('Guy','Himuro', 6, 10),
    ('Sigal','Tobias', 9, 8),
    ('Karen','Colmenares', 3, 4),
    ('Matthew','Weiss', 7, 1),
    ('Adam','Fripp', 8, 1),
    ('Payam','Kaufling', 14, 1),
    ('Shanta','Vollman', 6, 1),
    ('Irene','Mikkilineni', 14, 1),
    ('Shelley','Higgins', 8, 1);