var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');


const fs=require('fs')
const colName = 'slider_product'
const slider_productServices = require(__path_services + colName)
const categories_productServices = require(__path_services + 'categories_product')
const groupsServer = require(__path_models + 'groups')
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');
const uploadHelpers = require(__path_helpers+'file')
const uploadImage = uploadHelpers.upload('thumb',colName)
const articlesModels = require(__path_models + 'articles')
let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Product Management`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views_backend +`pages/${colName}/`
const FileHelpers = require(__path_helpers + 'file');

// list Items
router.get('(/status/:status)?', async function(req, res, next) {
  let params = {}
  params.currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')
  params.currentPosition = paramsHelpers.getParam(req.params, 'position', 'all')
  params.keyword = paramsHelpers.getParam(req.query, 'keyword', '')
  let statusFilters = await utilsHelpers.createStatusFilter(params.currentStatus, colName)
  params.sortFied = paramsHelpers.getParam(req.session, 'sort_fied', 'fullName')
  params.sortType = paramsHelpers.getParam(req.session, 'sort_type', 'asc')
  params.categoryID = paramsHelpers.getParam(req.session, 'categoryID', '')
  

  params.pagination = {
        totalItems: 1,
        totalItemsPerPage: 9,
        currentPage: parseInt(paramsHelpers.getParam(req.query, 'page', 1)) ,
        pageRange: 3
  }
  // console.log(category)
  await  slider_productServices.countItems(params).then((data)=>{
    params.pagination.totalItems = data
    })
 
    slider_productServices.listItems(params)
    .then((items)=>{
      // console.log(params)
       res.render(`${folderView}list`, { 
         pageTitle: pageTitle, 
         items: items,
         statusFilters: statusFilters,

         params:params
       })
     })
});


// delete single/multi
router.post('/delete/(:id)?', async function(req, res, next) {

  if (req.params.id==='multi'){
    let arrId=req.body.id.split(',')
    let arrPhoto = req.body.img.split(",")
			let deletePhoto = await arrPhoto.forEach((value)=>{
				FileHelpers.remove(`public/uploads/${colName}/`, value)
			})
      slider_productServices.deleteItems(arrId, {task:'delete-multi'}).then((result)=>{
      // req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS, result.deletedCount), linkIndex)
      res.send({success:true})
    });
  }
  else {
    let id = req.body.id
    let item = await slider_productServices.getItems(id)
      FileHelpers.remove(`public/uploads/${colName}/`, item.thumb);
    slider_productServices.deleteItems(id,{task:'delete-one'}).then((result)=>{
      // req.flash('success', notifyConfig.DELETE_SUCCESS, linkIndex)
      res.send({success:true})
    });
  }
});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  const {id,ordering}=req.body
  slider_productServices.changeOrdering(id, ordering).then((result)=>{
    res.send({success:true})
   })
});

// change status single/multi
router.post('/change-status/(:status)?', async function(req, res, next) {
  let {status}=req.params
  if (status=='multi'){
    slider_productServices.changeStatus(req.body.id.split(','),req.body.status,{task:'update-multi'}).then((result)=>{
    // req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
    res.send({success:true})
 })
}
else {
    let {status, id}=req.body
    slider_productServices.changeStatus(id,status,{task:'update-one'}).then((result)=>{
 //     // req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
     res.send({success: true})
  })
}
}
);

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let item = {name: '', ordering: 0, status:'novalue' }
  let showError = null
  let categoriesItems=await slider_productServices.listItemsInSelecbox()
    categoriesItems.unshift({id: 'allValue', name: 'Choose Category'})
  if (id === '') { //add
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, Error:showError,category:categoriesItems });
  } else { //edit
    await slider_productServices.getItems(id).then((item)=>{
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, Error:showError,category:categoriesItems });
   })
  }
});

// save
router.post('/save/(:id)?', uploadImage,
  body('name')
    .isLength({ min: 5, max: 100 })
    .withMessage(util.format(notifyConfig.ERROR_NAME, 5, 100))
    .custom(async (val, { req }) => {
      let paramId = await (req.params.id != undefined) ? req.params.id : 0
      let data = await slider_productServices.checkDuplicated({ name: val })
      let length = data.length
      data.forEach((value, index) => {
        if (value.id == paramId)
          length = length - 1;
      })
      if (length > 0) {
        return Promise.reject(notifyConfig.ERROR_NAME_DUPLICATED)
      }
      return
    }),
  body('textbutton')
    .isLength({ min: 5, max: 20 })
    .withMessage(util.format(notifyConfig.ERROR_SLIDER_TEXTBUTTON, 5, 20)),
  body('headertitle')
    .isLength({ min: 5, max: 30 })
    .withMessage(util.format(notifyConfig.ERROR_SLIDER_HEADERTITLE, 5, 30)),
  body('title')
    .isLength({ min: 5, max: 40 })
    .withMessage(util.format(notifyConfig.ERROR_SLIDER_TITLE, 5, 40)),
  body('description')
    .not()
    .isEmpty()
    .withMessage(notifyConfig.ERROR_DESCRIPTION),
  body('link')
    .isURL()
    .withMessage(notifyConfig.ERROR_SLIDER_URL),
  body('ordering')
    .isInt({ min: 0, max: 99 })
    .withMessage(util.format(notifyConfig.ERROR_ORDERING, 0, 99)),
  body('status').not().isIn(['novalue']).withMessage(notifyConfig.ERROR_STATUS),
  body('thumb').custom((value, { req }) => {
    const { image_uploaded, image_old } = req.body;
    if (!image_uploaded && !image_old) {
      return Promise.reject(notifyConfig.ERROR_FILE_EMPTY);
    }
    if (!req.file && image_uploaded) {
      return Promise.reject(notifyConfig.ERROR_FILE_EXTENSION);
    }
    return true;
  }),
async function(req, res, next) {
  try {
    let item = req.body;
    console.log(item)
    let itemData
    if(req.params.id != undefined){
      itemData = await slider_productServices.getItems(req.params.id)
    }
    let errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()) {
      if(req.file != undefined) {
          FileHelpers.remove(`public/uploads/${colName}/`, req.file.filename);
      }// xóa tấm hình khi form không hợp lệ
      if (req.params.id !== undefined){
          res.render(`${folderView}form`, {
            pageTitle,
             Error: errors.errors,
            item: itemData,
            id: req.params.id
            
          })
      } else {
        res.render(`${folderView}form`, {
          pageTitle,
          Error: errors.errors,
          item: req.body
        })
      }
      return
    } else {
      if (req.params.id && req.file){ 
        item.thumb = req.file.filename;
        FileHelpers.remove(`public/uploads/${colName}/`, `${itemData.thumb}`)
      }
      if(!req.file){ // không có upload lại hình
        item.thumb = itemData.thumb;
      }
    }
      if (req.params.id !== undefined) {
        item.id=req.params.id
        await slider_productServices.saveItems(item,{task:'edit'}).then(() =>{
          req.flash('success', notifyConfig.EDIT_SUCCESS,linkIndex);
        })
        
      } else {
        item.thumb=req.file.filename
        console.log(item)
        let data = await slider_productServices.saveItems(item,{task:'add'}).then(() =>{
          req.flash('success', notifyConfig.ADD_SUCCESS,linkIndex);
          
        })
        
      }
    } catch (error) {
      console.log(error)
      req.flash('success', "Có lỗi xảy ra");
      res.redirect(linkIndex);
    }
});


// sort
router.get('/sort/:sort_field/:sort_type', async function(req, res, next) {
  req.session.sort_field  = paramsHelpers.getParam(req.params,'sort_field', 'ordering')
  req.session.sort_type = paramsHelpers.getParam(req.params,'sort_type', 'asc')
  res.redirect(linkIndex)
});


module.exports = router;
