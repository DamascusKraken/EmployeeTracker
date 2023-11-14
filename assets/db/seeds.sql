INSERT INTO department(department_name)
VALUES("Asset Management"),
      ("Creative Services"),
      ("Engineering"),
      ("Legal"),
      ("Customer Service"),;

INSERT INTO role(role_title, salary)
VALUES("Investment Broker", 116728.00),
      ("Financial Advisor", 94170.00),
      ("Graphic Designer", 50265.00),
      ("Web Designer", 55078.00),
      ("Software Engineer", 105590.00),
      ("Computer Engineer", 114600.00),
      ("Legal Assistant", 55199.00),
      ("Complaince Manager", 145762.00),
      ("Customer Service Representative", 42733.00),
      ("Customer Service Manager", 98654.00);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Hareltila", "Frye", 10, NULL),
      ("Tineth", "Vash", 7, 13),
      ("Xylsea", "Dalaney", 2, NULL),
      ("Charix", "Thorsten", 4),
      ("Viokar", "Bryon", 9, 1),
      ("Krovras", "Bates", 6, NULL),
      ("Streghor", "Wise", 1, NULL),
      ("Graexir", "Gulliver", 3, NULL),
      ("Muror", "Peck", 9, 1),
      ("Zebrum", "Tremain", 2, 3),
      ("Līmos", "Rue", 1, 7),
      ("Derabo", "Malik", 5, NULL),
      ("Ethais", "Thayer", 8, NULL);