import { btnSearch } from "./domElement.js"
import { getTaskFilter,renderTask,getTask,handleSubmitForm } from "./fetch.js"
let taskFilter =() =>{
    btnSearch.onclick=() =>{
        let inputSearch=document.querySelector("#input-search").value
        if (inputSearch !==""){
            let getURL=`http://localhost:3000/task?name=${inputSearch}`
            console.log(getURL)
            getTaskFilter(renderTask,getURL)
        }
        else {
            getTask(renderTask)
            handleSubmitForm()
        }
    
    }
}
export {taskFilter}
