import { sortDisplay,sortBtn } from "./domElement.js"
// import { getTask,renderTask,handleSubmitForm,deleteHandle,editHandle } from "./fetch.js"
// window.deleteHandle=deleteHandle
// window.editHandle=editHandle
let sortBtnDisplay=() =>{
    sortBtn.forEach((btn) =>{
        btn.onclick=() =>{
            if(btn.textContent==="Name - ASC") {
                sortDisplay.textContent="NAME - ASC"
                let taskAPI='http://localhost:3000/task?_sort=name&_order=asc'
                // getTask(renderTask,taskAPI)
                // handleSubmitForm(taskAPI)
            }
            else if (btn.textContent==="Name - DESC") {
                sortDisplay.textContent="NAME - DESC"
                let taskAPI='http://localhost:3000/task?_sort=name&_order=desc'
                // getTask(renderTask,taskAPI)
                // handleSubmitForm(taskAPI)
            }
            else if (btn.textContent==="Level - ASC") {
                sortDisplay.textContent="LEVEL - ASC"
                let taskAPI='http://localhost:3000/task?_sort=level&_order=asc'
                // getTask(renderTask,taskAPI)
                // handleSubmitForm(taskAPI)
            }
            else {
                sortDisplay.textContent="LEVEL - DESC"
                let taskAPI='http://localhost:3000/task?_sort=level&_order=desc'
                // getTask(renderTask,taskAPI)
                // handleSubmitForm(taskAPI)
}
    
        } 
    
    })
}
export {sortBtnDisplay}