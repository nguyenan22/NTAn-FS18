import {submitTask,taskNameInput,levelSelect,bodyElement} from "./domElement.js"
let taskAPI='http://localhost:3000/task'

    // get API
    function getTask(cb){ 
        fetch(taskAPI)
            .then(res => res.json())
            .then(cb);
    }

        // render 
        function renderTask (tasks){
            var html = tasks.map(task =>{
                let dynamic=''
                if (task.level==="High"){
                     dynamic+= `<td><span class="badge bg-danger">${task.level}</span></td>`
                }
                else if (task.level==="Medium") {
                     dynamic+= `<td><span class="badge bg-info">${task.level}</span></td>`
                }
                else {
                     dynamic+= `<td><span class="badge bg-dark">${task.level}</span></td>`
                }
                return `
                            <tr>
                            <td>${task.id}</th>
                            <td>${task.name}</td>
                            ${dynamic}
                            <td>
                                <button class="btn btn-warning" onclick ="editHandle(${task.id})">Edit</button>
                                <button class="btn btn-danger" onclick="deleteHandle(${task.id})">Delete</button>
                            </td>
                        </tr>
                `
            })
            bodyElement.innerHTML = html.join('')
        }

    // get data to form
    function handleSubmitForm(){
        submitTask.onclick = function(){
            let taskName = taskNameInput.value
            let levelStatus = levelSelect.value
        let data = {
            name: taskName,
            level: levelStatus,
           }
           saveTask(data,function(){
            // getTask(renderTask)
           })
        }}



    // save data 
function saveTask(data,cb){
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(taskAPI,option)
    .then(res => res.json())
    .then(cb)
}

function deleteHandle (id){
    let isTrue=confirm("Bạn chắc chưa")
    console.log(isTrue)
    if (isTrue) {
    let option = {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    }
    fetch(taskAPI+"/"+id,option)
    .then(res => res.json())
    .then(function() {
        // getTask(renderTask)
    })
}}

function editHandle(id){
    fetch(taskAPI+"/"+id)
    .then (res =>res.json())
    .then (edit =>{
        submitTask.textContent="Save"
        rowTask.classList.remove("d-none")
        taskNameInput.value=edit.name
        levelSelect.value=edit.level
        submitTask.onclick = function(){
            let taskName = taskNameInput.value
            let levelStatus = levelSelect.value
            let data = {
                name: taskName,
                level: levelStatus
               }
           putHandle(id,data)
    }
})}

function putHandle (id,data){
    let option = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data)
    }
    fetch(taskAPI+"/"+id,option)
    .then(res => res.json())
    .then(function() {
        // getTask(renderTask)
    })
}




export {putHandle,editHandle,deleteHandle,saveTask,handleSubmitForm,renderTask,getTask}
