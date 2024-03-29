var express = require('express');
var router = express.Router();


const controllerName= 'items'
const mainModel=require(__path_models  + controllerName)
const setHeader=require(__path_configs + 'header' )
const asyncHandler = require(__path_middlewares +'async')
router.get('/',asyncHandler(async (req,res,next)=>{
    console.log(req.params)
        let param=[]
        param.sortField=req.query.sortBy
        param.sortType=req.query.sortType
        param.keyword=req.query.keyword
        let data =await mainModel.listItem(param,{'task':'all'})
        res.status(200).json({
            success:true,
            data:data}) 
}))

router.get('/:id',asyncHandler(async (req,res,next)=>{
        let data =await mainModel.listItem({id:req.params.id},{'task':'one'})
        res.status(200).json({
            success:true,
            data:data}) 
}))

router.post('/add',asyncHandler(async (req,res,next)=>{
    let params=[]
    // setHeader(res)
    console.log(req.body)
    params.task=req.body.task
    params.level=req.body.level
    let data=await mainModel.create(params)
    res.status(201).json({
        success:true,
        data:data
    })
}))

router.put('/update/:id',asyncHandler(async(req,res,next)=>{
        let body=req.body
        let data=await mainModel.editItem({id:req.params.id,'body':body},{'task':'edit'})
        // setHeader(res)
        res.status(201).json({
            success:true,
            data:data
        })
}))

router.delete("/delete/:id",asyncHandler(async (req,res,next)=>{
        console.log(req.params)
        let data =await mainModel.deleteItem({id:req.params.id},{'task':'one'})
        // setHeader(res)
        res.status(200).json({
            success:true,
            data:data}) 
}))

module.exports = router;