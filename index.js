const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.user,
        password: process.env.password,
        database: 'company_db'
    }, 
    console.log("Connected to the Company_db.")
    
);



function menu()
{
    const questions = [
        {
             type: 'list',
             name: 'userChoice',
             message: 'What would you like to do?',
             choices: ['View all departments', 
                        'Add department', 
                        'View all roles',   
                        'Add role',
                        'Update Employee role',
                        'View all Employees',
                        'Quit']
        }
    ];

    
    inquirer.prompt(questions)
            .then(function(data) {
             
                switch(`${data.userChoice}`) {
            
                    case "View all departments":
                        viewAllDepts();
                        break;
                    
                    case "Add department":
                        addDept();
                        break;

                    case "View all roles":
                        viewAllRoles();
                        break;
                    
                    case "Add role":
                        addRole();
                        break;

                    case "Update Employee role":
                        updateRole();
                        break;

                    case "View all Employees":
                        viewAllEmployees();
                        break;

                    case "Quit": 
                        process.exit(0);
                }
            });
};

function viewAllEmployees(){

    console.log();
    console.log(`id` + "\t"  + `first_name` + "\t\t"  + `last_name` + "\t  "  + `title` + "\t\t\t"  + `        department`);
    console.log(`--` + "\t"  + `----------` + "\t\t"  + `---------` + "\t  "  + `-------------` +  "\t\t\t"  +`--------------------`);

    db.query({sql: `SELECT employee.ID, employee.first_name, employee.last_name   FROM employee`, rowsAsArray: true}, function (err, crewInfo){
        let id = [];
        let first_name = []
        let last_name = []
        let salary = [];

        for(let k = 0; k < crewInfo.length;k++){
            let deconstruct = crewInfo[k];
            id[k] = deconstruct[0];
            first_name[k] = deconstruct[1];
            last_name[k] = deconstruct[2];
            
        }

        db.query({sql:'SELECT role.role_title AS title, departments.department_name AS Department FROM role RIGHT JOIN departments ON role.department_id = departments.id;',  rowsAsArray: true}, function (err, titleInfo){
            for(let x = 0; x < titleInfo.length; x++){
                
                let construct = titleInfo[x];
                let title = construct[0];
                let dept = construct[1];

               let ID = id[x];
                let fName = first_name[x];
                let lName= last_name[x];
                

                console.log(`  ${ID}  ` + "\t"  + `  ${fName}` + " \t\t"  +  `${lName}   ` + "  \t"  + `  ${title}  ` +  "\t\t  "  +` ${dept}`);


            }
            console.log();
            menu();
        });
    });
}

function updateRole(){
    db.query({sql: `SELECT employee.first_name, employee.last_name, employee.role_id FROM employee`, rowsAsArray: true}, function (err, names){
        let fullName = [];
        let role_id = [];
        
        for(let x = 0; x < names.length; x++){
            let deconstruct = names[x];
            fullName[x] = `${deconstruct[0]} ${deconstruct[1]}`
            role_id[x] = `${deconstruct[2]}`
        }

        db.query({sql:`SELECT role.role_title FROM role`, rowsAsArray: true}, function (err, titles){
            let roleTitles = [];
        
            for(let x = 0; x < titles.length; x++ ){
                let deconstruct = titles[x];
                roleTitles[x] = deconstruct[0];
            };

            const updateQs = [
                {
                    type: 'list',
                    name: 'chosenOne',
                    message: 'Which employee\'s role do you want to update?',
                    choices: fullName,
                },
                {
                    type:'list',
                    name: 'chosenRole',
                    message: 'Which role do you want to assign the selected employee?',
                    choices: roleTitles,
                },
            ];      
            
            inquirer.prompt(updateQs)
            .then(function(newJob){
      
        
            let count = 0;
            for(let j = 0; j < roleTitles.length; j++){
                if(newJob.chosenRole == roleTitles[j]){
                    count++;
                    
                    break;
                } else{
                    count++;
                } 
            }

            let nameCount = 0;
            for(let k = 0; k < fullName.length; k++){
                if(newJob.chosenOne == fullName[k]){
                    nameCount++;
                    console.log("name count is : " + nameCount);
                    break;
                } else{
                    nameCount++;
                } 
            }
                db.query(`UPDATE employee SET role_id = '${count}' WHERE role_id = '${role_id[nameCount - 1]}'`)
                menu();
            });
        });
    });
};

function addRole(){
    db.query({sql: `SELECT departments.department_name FROM departments`, rowsAsArray: true}, function ( err, data){
        
       let deptChoices = [];
      
    for(let x = 0; x < data.length; x++ ){
        let deconstruct = data[x];
        deptChoices[x] = deconstruct[0];
       
    };
    



    const newRole = [
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'roleDept',
            message: 'What department does the role belong to?',
            choices: deptChoices,
        },
    ];


    inquirer.prompt(newRole)
    .then(function(roleDts){
      
        
       let count = 0;
       for(let j = 0; j < deptChoices.length; j++){
           if(roleDts.roleDept == deptChoices[j]){
            count++;
               break;
           } else{
               count++;
           }
          
           
       }
        db.query(`INSERT INTO role (role.role_title, role.salary, role.department_id) VALUES ('${roleDts.roleName}', '${roleDts.roleSalary}', '${count}')`)
      
        menu();
    });
});
}


function viewAllRoles(){
    console.log();
    console.log(`id      title                     department     salary`);
    console.log(`--      --------------------      -----------    -------`);
    
    db.query({sql:'SELECT role.role_title AS title, departments.department_name AS Department FROM role RIGHT JOIN departments ON role.department_id = departments.id;',  rowsAsArray: true}, 
                    function (err, data)
    {
        db.query({sql:'SELECT * FROM role', rowsAsArray: true}, function (err, roleTable ){
            
            let idContainer = [];
            let salaryContainer = [];

            for (let k = 0; k < roleTable.length; k++){
                let construct = roleTable[k];
                idContainer[k] = construct[0];
                salaryContainer[k] = construct[2];
            }
            
            for( let x = 0; x < data.length; x++)
            {
            let deconstruct = data[x]
            let title = deconstruct[0];
            let deptName = deconstruct[1];
            
            let roleID = idContainer[x];
            let salary = salaryContainer[x];
            
            console.log( `${roleID}   ` + "\t" + ` ${title}   ` + " \t  " +  `${deptName}` + "\t" + ` ${salary}`);
            
            }
            console.log();
            menu();
        });
    })
}

function addDept(){
    console.log();
    const userAddDept = [
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the new department?"
        },
    ];
    inquirer.prompt(userAddDept)
        .then(function(dept){
            console.log();
            
            db.query(`INSERT INTO departments (department_name) VALUES ("${dept.deptName}")`,   function (err, data) {
                console.log(`Added ${dept.deptName} to the database.`);
                console.log();
                menu();
            });
            
        });
        
}

function viewAllDepts(){
     db.query({sql:'SELECT * FROM displayDEPT', rowsAsArray: true}, function (err, data ){
        console.log();
        console.log();
        console.log(`ID  DEPT_NAME`);
        console.log(`-- ------------------`);
       
        for( let x = 0; x < data.length; x++)
        {
           let deconstruct = data[x]
           let deptID = deconstruct[0];
           let deptName = deconstruct[1];

          console.log(`${deptID}  ${deptName}`);
        } 
        console.log();  
        menu();
    });
   
};

menu();