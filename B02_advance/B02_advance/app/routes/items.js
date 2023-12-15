var express = require('express');
var router = express.Router();


const controllerName= 'items'
const mainModel=require(__path_models  + controllerName)
const setHeader=require(__path_configs + 'header' )
const asyncHandler = require(__path_middlewares +'async')
const {validator} = require(__path_validates +'items.validate')
const ErrorResponse= require('../ultis/errorResponse')
const {validateReq}=require('../helpers/validateReq')
router.get('/',asyncHandler(async (req,res,next)=>{
        let data =await mainModel.listItem(req.query,{'task':'all'})
        res.status(200).json({
            success:true,
            count:data.length,
            data:data}) 
}))

router.get('/:id',asyncHandler(async (req,res,next)=>{
    console.log(req.params.id)
        let data =await mainModel.listItem({id:req.params.id},{'task':'one'})
        res.status(200).json({
            success:true,
            data:data}) 
}))

router.post('/add',asyncHandler(async (req,res,next)=>{
            const err=validateReq(validator,req,res,next)
            if(!err) {
                let params=req.body
                // setHeader(res)
                let data=await mainModel.create(params)
                res.status(201).json({
                    success:true,
                    data:data
                })
            }

        }
)
)

router.put('/update/:id',asyncHandler(async(req,res,next)=>{
    const err=validateReq(validator,req,res,next)
    if(!err) {
        let body=req.body
        let data=await mainModel.editItem({id:req.params.id,'body':body},{'task':'edit'})
        res.status(201).json({
            success:true,
            data:data
        })
    }
}))

router.delete("/delete/:id",asyncHandler(async (req,res,next)=>{
        console.log(req.params)
        let data =await mainModel.deleteItem({id:req.params.id},{'task':'one'})
        res.status(200).json({
            success:true,
            data:data}) 
}))

module.exports = router;