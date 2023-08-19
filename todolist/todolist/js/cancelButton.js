export let cancelBtn= (element1,element2)=>{
    element1.onclick =() =>{
        element2.classList.add("d-none")
    }
}
