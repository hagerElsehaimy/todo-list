#!/usr/bin/env node
const fs = require('fs');
let args = process.argv
let dict ={};
let todo_list =[];
let task_id = 1;
let mapped_list;

function readFile(fname)
{
    return fs.readFileSync(fname,'utf8');
}

function writeFile(fname,tasks)
{
    return fs.writeFileSync(fname,"[ " + tasks+" ]");
}

function stringifyTasks()
{
    mapped_list = todo_list.map(val => JSON.stringify(val));
}

function add (fname,new_task)
{
    task_id++;
    dict = { "id":task_id,"name":new_task,"checked":false }
    mapped_list.push(JSON.stringify(dict));
    writeFile(fname,mapped_list);
}
function filterWithStatus(status)
{
    mapped_list = todo_list.filter((element)=>{
       return element.checked === status

    });
    return mapped_list;
}

function remove(id)
{

}

function update(id,key,val)
{

}

function show()
{
    mapped_list.forEach(element => {
        console.log(element+"\n");
    });
}

function run(fname)
{
    if(fs.statSync(fname).size)
    {
        todo_list = JSON.parse(readFile(fname));
    }

    stringifyTasks();

        switch(args[2])
        {
            case 'add':
                add(fname,args[3]);
                break;
            case 'show':
                show();
                break;
            case 'checked':
                console.log(filterWithStatus(true));
                break;
            case 'unchecked':
                console.log(filterWithStatus(false));
                break;
            case 'remove':


        }
 
}

run('todo.txt');