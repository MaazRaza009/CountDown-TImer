#! /usr/bin/env node
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";

const res = await inquirer.prompt({
    type: "number",
    name: "input",
    message: "Enter amount of seconds:",
    validate: (input)=>{
        if(isNaN(input)){
            return "PLease enter valid number"
        }else if(input > 60){
            return "Seconds must be in 60"
        }else {
            return true;
        }
    }
});

let input = res.input;

function startTime(val:number){
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval((()=>{
        const currTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currTime);

        if(timeDiff <= 0){
            console.log(chalk.yellowBright("Timer has expired"));
            process.exit()
        }
        const min = Math.floor((timeDiff % (3600*24))/3600)
        const sec = Math.floor(timeDiff % 60)
        console.log(`${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}`);
    }),1000)
}
startTime(input)