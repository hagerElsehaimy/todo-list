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

function stringifyTasks(arr1,arr2)
{
    arr1 = arr2.map(val => JSON.stringify(val));
    return arr1;
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
    mapped_list = todo_list.filter(element=>{
        return element.id != id;
        
    });
    mapped_list = stringifyTasks(mapped_list,mapped_list)
    return mapped_list;
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

    mapped_list= stringifyTasks(mapped_list,todo_list);

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
                writeFile(fname,remove(args[3]));


        }
 
}

run('todo.txt');