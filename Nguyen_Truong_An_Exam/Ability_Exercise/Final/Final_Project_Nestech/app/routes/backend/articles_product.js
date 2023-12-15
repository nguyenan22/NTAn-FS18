var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');


const fs=require('fs')
const colName = 'articles_product'
const articles_productServices = require(__path_services + colName)
const categories_productServices = require(__path_services + 'categories_product')
const groupsServer = require(__path_models + 'groups')
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');
const uploadHelpers = require(__path_helpers+'file')
const uploadImage = uploadHelpers.uploadFileMulti('thumb',colName)
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
  
  let category = []
  await articles_productServices.listItemsInSelecbox().then(items=>{
    category = items;
    category.unshift({id: 'allvalue', name: 'All categories'})
  })
  params.pagination = {
        totalItems: 1,
        totalItemsPerPage: 9,
        currentPage: parseInt(paramsHelpers.getParam(req.query, 'page', 1)) ,
        pageRange: 3
  }
  // console.log(category)
  await  articles_productServices.countItems(params).then((data)=>{
    params.pagination.totalItems = data
    })
 
    articles_productServices.listItems(params)
    .then((items)=>{
      // console.log(params)
       res.render(`${folderView}list`, { 
         pageTitle: pageTitle, 
         items: items,
         statusFilters: statusFilters,
         category,
         params:params
       })
     })
});

// change status single
// router.get('/change-status/:status/:id', async function(req, res, next) {
//   let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active');
//   let id = paramsHelpers.getParam(req.params, 'id', '');
//   articlesServices.changeStatus(id,currentStatus,{task:'update-one'}).then((result)=>{
//     req.flash('success', notifyConfig.CHANGE_STATUS_SUCCESS, linkIndex)
//   });
// });

// change category
router.get('/change-category/:category_id/:id', async function(req, res, next) {
  req.session.change_categoryID = paramsHelpers.getParam(req.params, 'category_id','')
  let id = paramsHelpers.getParam(req.params, 'id', '');
  articles_productServices.changeCategory(id,req.session.change_categoryID,{task:'update-one'}).then((result)=>{
    req.flash('success', notifyConfig.CHANGE_CATEGORY_SUCCESS, linkIndex)
  });
});
router.get('/change-position/:position/:id', async function(req, res, next) {
  let currentPosition = paramsHelpers.getParam(req.params, 'position', 'Top-Post');
  let id = paramsHelpers.getParam(req.params, 'id', '');
  articles_productServices.changePosition(id,currentPosition,{task:'update-one'}).then((result)=>{
    req.flash('success', notifyConfig.CHANGE_POSITION_SUCCESS, linkIndex)
  });
});

// delete single/multi
router.post('/delete/(:id)?', async function(req, res, next) {

  if (req.params.id==='multi'){
    let arrId=req.body.id.split(',')
    let arrPhoto = req.body.img.split(",")
			let deletePhoto = await arrPhoto.forEach((value)=>{
				FileHelpers.remove(`public/uploads/${colName}/`, value)
			})
    articles_productServices.deleteItems(arrId, {task:'delete-multi'}).then((result)=>{
      // req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS, result.deletedCount), linkIndex)
      res.send({success:true})
    });
  }
  else {
    let id = req.body.id
    let item = await articles_productServices.getItems(id)
    await item.thumb.forEach(value=>{
      FileHelpers.remove(`public/uploads/${colName}/`, value);
    })
    articles_productServices.deleteItems(id,{task:'delete-one'}).then((result)=>{
      // req.flash('success', notifyConfig.DELETE_SUCCESS, linkIndex)
      res.send({success:true})
    });
  }
  // await articlesModels.getItems(id).then((item) =>{
  //   fs.unlink(`public/uploads/users/${item.avatar}`,(err) => {if (err) console.log(err)})
  // })
  // articlesServices.deleteItems(id,{task:'delete-one'}).then((result)=>{
  //   req.flash('success', notifyConfig.DELETE_SUCCESS, linkIndex)
  // });
});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  const {id,ordering}=req.body
  // let cids = req.body.cid
  // let ordering = req.body.ordering
  articles_productServices.changeOrdering(id, ordering).then((result)=>{
    // req.flash('success',notifyConfig.CHANGE_ORDERING_SUCCESS , linkIndex)
    res.send({success:true})
   })
});

// change status single/multi
router.post('/change-status/(:status)?', async function(req, res, next) {
  let {status}=req.params
  if (status=='multi'){
    articles_productServices.changeStatus(req.body.id.split(','),req.body.status,{task:'update-multi'}).then((result)=>{
    // req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
    res.send({success:true})
 })
}
else {
    let {status, id}=req.body
    articles_productServices.changeStatus(id,status,{task:'update-one'}).then((result)=>{
 //     // req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
     res.send({success: true})
  })
}
}
);

router.post('/change-position/:position', async function(req, res, next) {
  let currentPosition = paramsHelpers.getParam(req.params, 'position', 'Top-Post');
  articles_productServices.changeStatus(req.body.cid, currentPosition,{task:'update-multi'}).then((result)=>{
   req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
 })
});

router.post('/change-status/:status', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active');
  articles_productServices.changeStatus(req.body.cid, currentStatus,{task:'update-multi'}).then((result)=>{
   req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
 })
});


// delete multi
// router.post('/delete/', async function(req, res, next) {
//   articlesServices.deleteItems(req.body.cid, {task:'delete-multi'}).then((result)=>{
//     req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS, result.deletedCount), linkIndex)
//   });
// });

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let item = {name: '', ordering: 0, status:'novalue' }
  let showError = null
  let categoriesItems=await articles_productServices.listItemsInSelecbox()
    categoriesItems.unshift({id: 'allValue', name: 'Choose Category'})
  if (id === '') { //add
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, Error:showError,category:categoriesItems });
  } else { //edit
    await articles_productServices.getItems(id).then((item)=>{
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, Error:showError,category:categoriesItems });
   })
  }
});

// save
router.post('/save/(:id)?', uploadImage,
body('name')
.isLength({min: 5, max: 100})
.withMessage(util.format(notifyConfig.ERROR_NAME,5,100))
.custom(async (val, {req}) => {
  let paramId = await(req.params.id != undefined) ? req.params.id : 0
  let data		= await articles_productServices.checkDuplicated({name: val})
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
body('slug')
.isSlug()
.withMessage(notifyConfig.ERROR_SLUG)
.custom(async (val, {req}) => {
let paramId = await(req.params.id != undefined) ? req.params.id : 0
let data		= await articles_productServices.checkDuplicated({slug: val})
let length = data.length
data.forEach((value, index) => {
  if (value.id == paramId) 
    length = length - 1;
})
  if (length > 0) {
    return Promise.reject(notifyConfig.ERROR_SLUG_DUPLICATED)
  }
  return
}),
body('description')
.not()
.isEmpty()
.withMessage(notifyConfig.ERROR_DESCRIPTION),
body('content')
.not()
.isEmpty()
.withMessage(notifyConfig.ERROR_DETAIL),
body('categoryId')
.custom(async (val, {req}) => {
if ( val == undefined) {
  return Promise.reject(notifyConfig.ERROR_CATEGORY)
} else {
  try {
    let data = await categories_productServices.getCategoryById(val)
    return data;
  } catch (error) {
    return Promise.reject(notifyConfig.ERROR_CATEGORY_INVALID)
  }
}
}),
body('ordering')
.isInt({min: 0, max: 99})
.withMessage(util.format(notifyConfig.ERROR_ORDERING,0,99)),
body('quantity')
.isInt({min: 0})
.withMessage(util.format(notifyConfig.ERROR_QUANITY,0)),
body('price')
.isInt({min: 500})
.withMessage(util.format(notifyConfig.ERROR_QUANITY,500)),
body('status').not().isIn(['novalue']).withMessage(notifyConfig.ERROR_STATUS),
body('thumb').custom((value,{req}) => {
const {image_uploaded , image_old} = req.body;
if(!image_uploaded && !image_old) {
return Promise.reject(notifyConfig.ERROR_FILE_EMPTY);
}
if(!req.files && image_uploaded) {
  return Promise.reject(notifyConfig.ERROR_FILE_EXTENSION);
}
return true;
}),
async function(req, res, next) {
  try {
    let item = req.body;
    item.dailydeals = !item.dailydeals ? false : true
    item.fearturedproduct = !item.fearturedproduct ? false : true
    let itemData
    if(req.params.id != undefined){
      itemData = await articles_productServices.getItems(req.params.id)
    }
    let errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()) {
      let category = await categories_productServices.getCategoryList('active')
      if(req.files != undefined) {
        req.files.forEach(value=>{
          FileHelpers.remove(`public/uploads/${colName}/`, value.filename);
        })
      }// xóa tấm hình khi form không hợp lệ
      if (req.params.id !== undefined){
          res.render(`${folderView}form`, {
            pageTitle,
            category, Error: errors.errors,
            item: itemData,
            id: req.params.id
            
          })
      } else {
        res.render(`${folderView}form`, {
          pageTitle,
          category, Error: errors.errors,
          item: req.body
        })
      }
      return
    } else {
      console.log(req.params.id)
      console.log(item)
      if (req.params.id && item.image_delete){ 
        itemData.thumb = await DeletePhotosHelpers.deletePhoto(req.params.id, item.image_delete, colName)
      }
      if(req.files.length == 0){ // không có upload lại hình
        item.thumb = itemData.thumb;
      }else {
        if(itemData != undefined){
          item.thumb = req.files.map(obj => obj.filename).concat(itemData.thumb);
        } else{
          item.thumb = req.files.map(obj => obj.filename);
        }
      }
    }
      item.category = req.body.categoryId
      if (req.params.id !== undefined) {
        await articles_productServices.saveItems(item,{task:'edit'}).then(() =>{
          req.flash('success', notifyConfig.EDIT_SUCCESS,linkIndex);
        })
        
      } else {
        let data = await articles_productServices.saveItems(item,{task:'add'}).then(() =>{
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

// filter
router.get('/filter-category/:category_id', async function(req, res, next) {
  req.session.categoryID = paramsHelpers.getParam(req.params, 'category_id','')
  res.redirect(linkIndex)
});


// upload

router.get('/uploads', async function(req, res, next) {
  res.render(`${folderView}uploads`, { pageTitle: pageTitleEdit });
});

router.post('/uploads/',uploadImage, async function (req,res,next){
  res.render(`${folderView}uploads`, { pageTitle: pageTitleEdit });
});

module.exports = router;
