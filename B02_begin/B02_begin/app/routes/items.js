var express = require('express');
var router = express.Router();


const controllerName= 'items'
const mainModel=require(__path_models  + controllerName)


let makeId = (number) =>{
    let text = ''
    let possible = "ABCDEFGHJMNOPQSTUVWXYZ0123456789"
    for (let i = 0; i < number; i++) {
         text += possible.charAt(Math.floor(Math.random() * possible.length))
        
    }
    return text
}
router.get('/',async (req,res,next)=>{
    try {
        let data =await mainModel.listItem({},{'task':'all'})
        res.status(200).json({
            success:true,
            data:data}) 
    } catch (error) {
        res.status(400).json({
            success:false
        })
    }

    
})
router.get('/:id',async (req,res,next)=>{
    try {
        let data =await mainModel.listItem({id:req.params.id},{'task':'one'})
        res.status(200).json({
            success:true,
            data:data}) 
    } catch (error) {
        res.status(400).json({
            success:false
        })
    }

    
})
router.post('/add',async (req,res,next)=>{
    let params=[]
    params.id=makeId(8)
    params.name=req.body.name
    params.status=req.body.status
    let data=await mainModel.create(params)
    res.status(201).json({
        success:true,
        data:data
    })
})

router.put('/update/:id', async(req,res,next)=>{
    try {
        let body=req.body
        let data=await mainModel.editItem({id:req.params.id,'body':body},{'task':'edit'})
        res.status(201).json({
            success:true,
            data:data
        })
    } catch (error) {
        res.status(400).json({
            success:false
    })
}})
router.delete("/delete/:id",async (req,res,next)=>{
    try {
        console.log('try')
        let data =await mainModel.deleteItem({id:req.params.id},{'task':'one'})
        res.status(200).json({
            success:true,
            data:data}) 
    } catch (error) {
        res.status(400).json({
            success:false
        })
    }
})

module.exports = router;