import {rowTask,addTask,btnCancel} from "./domElement.js"
import { cancelBtn } from "./cancelButton.js"
import { getTask,handleSubmitForm,renderTask,deleteHandle,editHandle } from "./fetch.js"
// import { sortBtnDisplay} from "./sort.js"
window.deleteHandle=deleteHandle
window.editHandle=editHandle
window.rowTask=rowTask
addTask.onclick=() =>{
    rowTask.classList.remove("d-none")
    cancelBtn(btnCancel,rowTask)
}
// sortBtnDisplay()
getTask(renderTask)
handleSubmitForm()





