//MVC
// model: xử lý
// View: hiển thị
// Cotroller: điều hướng

// define
const courseAPI = 'http://localhost:3009/course'
const bodyElement = document.getElementById('course')
const submitElement = document.getElementById('submit')
const nameElement   = document.querySelector('input[name="name"]')
const contentElement   = document.querySelector('input[name="content"]')
// Cotroller
const main = ()=>{
    // code
    getCoure(renderCourse)

    handleSubmitForm()
}
main()

// model

    // get API
    function getCoure(cb){ 
        fetch(courseAPI)
            .then(res => res.json())
            .then(cb);
    }

    // render 
    function renderCourse (courses){
        var html = courses.map(course =>{
            return `
                <li>
                    <h2>${course.name}</h2>
                    <p>${course.content}</p>
                    <button onclick ="deleteHandle(${course.id})">Delete</button>
                    <button onclick ="editHandle(${course.id})">Edit</button>
                </li>
            `
        })
        bodyElement.innerHTML = html.join('')
    }
    
    // get data to form
    function handleSubmitForm(){
        submitElement.onclick = function(){
            courseName = nameElement.value
            courseContent = contentElement.value
        let data = {
            name: courseName,
            content: courseContent
           }
           saveCourse(data,function(){
            getCoure(renderCourse)
           })
        }}

// save data 

function saveCourse (data,cb){
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(courseAPI,option)
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
    fetch(courseAPI+"/"+id,option)
    .then(res => res.json())
    .then(function() {
        getCoure(renderCourse)
    })
}}
function editHandle(id){
    fetch(courseAPI+"/"+id)
    .then (res =>res.json())
    .then (edit =>{
        nameElement.value=edit.name
        contentElement.value=edit.content
        submitElement.innerText="Save"
        submitElement.onclick = function(){
            courseName = nameElement.value
            courseContent = contentElement.value
        let data = {
            name: courseName,
            content: courseContent
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
    fetch(courseAPI+"/"+id,option)
    .then(res => res.json())
    .then(function() {
        getCoure(renderCourse)
    })
}