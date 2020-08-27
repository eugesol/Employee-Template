const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const allEmployees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)




const mainQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter your name: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email: "
        },
        {
            type: "number",
            name: "id",
            message: "Enter your ID number: "
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter manager's office number:",
        },

    ])
}

const engineerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter engineer's name: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter engineer's email: "
        },
        {
            type: "number",
            name: "id",
            message: "Enter engineer's ID number: "
        },
        {
            type: "input",
            name: "github",
            message: "Enter engineer's github username: "
        },

    ])
}

const internQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter intern's name: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter intern's email: "
        },
        {
            type: "number",
            name: "id",
            message: "Enter intern's ID number: "
        },
        {
            type: "input",
            name: "school",
            message: "Enter intern's school: "
        },

    ])
}
const selection = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Would you like to add a new employee?",
            choices: ['Add Engineer', 'Add Intern', 'Done'],
        },
    ])

}

mainQuestions().then((answers) => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    allEmployees.push(manager);
    selectLoop();

});

const selectLoop = () => {

    console.log("SELECT EMPLOYEE TO ADD")
    selection().then((answers) => {
        if (answers.choice === "Add Engineer") {
        
            engineerQuestions().then((answers) => {
            storeEng(answers);
            
        });
        } else if (answers.choice === "Add Intern") {
            internQuestions().then((answers) => {
            storeIntern(answers);
            });
        } else if (answers.choice === "Done") {


            fs.writeFileSync(outputPath, render(allEmployees));
            console.log("You created the employee page!")


        }
    });
}

const storeEng = (answers) => {
    
        allEmployees.push(new Engineer(answers.name, answers.id, answers.email, answers.github))
        selectLoop();
    
}

const storeIntern = (answers) => {

    
        allEmployees.push(new Intern(answers.name, answers.id, answers.email, answers.school))
        selectLoop();
    
}
