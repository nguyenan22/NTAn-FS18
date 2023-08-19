import {rowTask,addTask,submitTask,taskNameInput,levelSelect,btnCancel} from "./domElement.js"
import { cancelBtn } from "./cancelButton.js"
import { submitBtn } from "./submitButton.js"

addTask.onclick=() =>{
    rowTask.classList.remove("d-none")
    cancelBtn(btnCancel,rowTask)
    submitBtn(submitTask,taskNameInput,levelSelect)
}


