const express=require('express')
const app=express()
const http = require('http');
app.use(express.json()) 
const courses=[{
    id: 1,
    name:'Python'
},
{
    id: 2,
    name:'Javascrip'
},
{
    id: 3,
    name:'Typescript'
}
]
// const server = http.createServer((req,res) =>{
//     res.writeHead(404,{'content-type':'application/json','X-Power-By':'NodeJS'})
//     res.end(JSON.stringify({success:false,error:"NOT FOUND",data:null}))
// });
app.get('/api/course',(req,res) =>{
    res.json(courses)
})

app.get('/api/course/:id',(req,res) =>{
const getParams=courses.find(course => course.id===parseInt(req.params.id))
    if (!getParams) {
        res.statusCode=404
        res.json({error:'Not Found'},)
    }
    else {
        res.json(courses[parseInt(getParams.id)-1])
    }
})

app.post('/api/course/',(req,res) =>{
    if (req.body){
        res.statusCode=200
        courses.push(req.body)
        res.json(courses)
    }else {
        res.statusCode(404)
        res.json({error:"Not Found"})
    } 
})

app.put('/api/course/edit/:id',(req,res) =>{
    const getParams=courses.find(course => course.id===parseInt(req.params.id))
    courses[parseInt(getParams.id)-1].name = req.body.name
    res.statusCode=200
    res.send(JSON.stringify({success:true, notify:'Cập nhật thành công',data:courses[parseInt(getParams.id)-1]}))
})

app.delete('/api/course/delete/:id',(req,res) =>{
    const getParams=courses.find(course => course.id===parseInt(req.params.id))
    courses.splice(parseInt(getParams.id)-1,1)
    res.statusCode=200
    res.send(JSON.stringify({success:true, notify:'Xóa thành công',data:courses}))
})


const port=process.env.port || 3001
app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server is listening on port ${port}`)
})