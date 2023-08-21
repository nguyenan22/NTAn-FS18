import {rowTask,addTask,btnCancel,btnSearch} from "./domElement.js"
import { cancelBtn } from "./cancelButton.js"
import { getTask,handleSubmitForm,renderTask,deleteHandle,editHandle,getTaskFilter } from "./fetch.js"
import { sortBtnDisplay} from "./sort.js"
import { taskFilter } from "./filter.js"
window.deleteHandle=deleteHandle
window.editHandle=editHandle
window.rowTask=rowTask
addTask.onclick=() =>{
    rowTask.classList.remove("d-none")
    cancelBtn(btnCancel,rowTask)
}
sortBtnDisplay()
getTask(renderTask)
handleSubmitForm()
taskFilter()





