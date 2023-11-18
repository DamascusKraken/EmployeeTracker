INSERT INTO departments(department_name)
VALUES("Finance"),
      ("Creative"),
      ("Engineering"),
      ("Legal Sector"),
      ("Customer");

INSERT INTO role(role_title, salary, department_id)
VALUES("Investment Broker", 116728, 001),
      ("Financial Advisor", 94170.00, 001),
      ("Graphic Designer", 50265.00, 002),
      ("Web Designer", 55078.00, 002),
      ("Software Engineer", 105590.00, 003),
      ("Computer Engineer", 114600.00, 003),
      ("Legal Assistant", 55199.00, 004),
      ("Complaince Manager", 145762.00, 004),
      ("Customer  Rep", 42733.00, 005),
      ("Customer  MGR", 98654.00, 005);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Hareltila", "Frye", 010, NULL),
      ("Tineth", "Vash", 007, 013),
      ("Xylsea", "Dalaney", 002, NULL),
      ("Charix", "Thorsten", 004,NULL),
      ("Viokar", "Bryon", 009, 001),
      ("Krovras", "Bates",006, NULL),
      ("Streghor", "Wise", 001, NULL),
      ("Graexir", "Gulliver", 003, NULL),
      ("Muror", "Peck", 009, 001),
      ("Zebrum", "Tremain", 002, 003),
      ("Līmos", "Rue", 001, 007),
      ("Derabo", "Malik", 005, NULL),
      ("Ethais", "Thayer", 008, NULL);