import { sortDisplay,sortBtn } from "./domElement.js"
import { getTask,renderTask,handleSubmitForm,deleteHandle,editHandle,getApiUrl } from "./fetch.js"
window.deleteHandle=deleteHandle
window.editHandle=editHandle
let sortBtnDisplay=() =>{
    sortBtn.forEach((btn) =>{
        btn.onclick=() =>{
            if(btn.textContent==="Name - ASC") {
                sortDisplay.textContent="NAME - ASC"
                console.log("name_asc")
                getTask(renderTask)
                handleSubmitForm()
            }
            else if (btn.textContent==="Name - DESC") {
                sortDisplay.textContent="NAME - DESC"
                console.log("name_desc")
                getTask(renderTask)
                handleSubmitForm()
            }
            else if (btn.textContent==="Level - ASC") {
                sortDisplay.textContent="LEVEL - ASC"
                console.log("level_asc")
                getTask(renderTask)
                handleSubmitForm()
            }
            else {
                sortDisplay.textContent="LEVEL - DESC"
                console.log("level_desc")
                getTask(renderTask)
                handleSubmitForm()
}
    
        } 
    
    })
}
export {sortBtnDisplay}