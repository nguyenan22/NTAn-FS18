var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');

const colName = 'items'

const ItemServer = require(__path_shemas + colName)
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');

let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Items Manager`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views +`pages/${colName}/`
const itemsModel=require('../../models/items')
// list Items
router.get('(/status/:status)?', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params,'status', 'all')
  let keyword       = paramsHelpers.getParam(req.query,'keyword','')
  let statusFillters = await utilsHelpers.createStatusFilter(currentStatus, colName)
  const sortField = paramsHelpers.getParam(req.session,'sort_field','ordering')
  const sortType = paramsHelpers.getParam(req.session,'sort_type','asc')
  let sort = {}
  sort[sortField] = sortType
  let pagination = {
    totalItems: 1,
    totalItemsPerPage: 9,
    currentPage: 1,
    pageRange: 3
  }
  let objwhere = {}
  pagination.currentPage = parseInt(paramsHelpers.getParam(req.query,'page',1)) 
  let object={keyword,statusFillters,sort,pagination,objwhere,currentStatus}

// hàm xử lý
  const objectsFinal= await itemsModel.statusModels(ItemServer,object)

  await ItemServer
  .find(objectsFinal.objwhere)
  .sort(objectsFinal.sort)
  .limit(objectsFinal.pagination.totalItemsPerPage)
  .skip((objectsFinal.pagination.currentPage - 1) * objectsFinal.pagination.totalItemsPerPage)
  .then((items)=>{
      res.render(`${folderView}list`, { 
      pageTitle: pageTitle,
      items,
      statusFillters,
      currentStatus,
      keyword,
      pagination:objectsFinal.pagination,
      sortField,
      sortType
      });
      }) 
});

// change status single
router.get('/change-status/:status/:id', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params,'status', 'active')
  let id = paramsHelpers.getParam(req.params,'id', '')

  //hàm xử lý
  let data = await itemsModel.changeStatusModels(currentStatus)

  await ItemServer.updateOne({_id:id},data).then(()=>{
    req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
})
});

// delete single
router.get('/delete/:id', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  await ItemServer.deleteOne({_id:id}).then((data)=>{
    req.flash('warning',notifyConfig.DELETE_SUCCESS ,linkIndex)
   })
});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  let cids = req.body.cid
  let ordering = req.body.ordering
  //hàm xử lý
  await itemsModel.changeOrderingModels(ItemServer,cids,ordering)

  req.flash('warning',notifyConfig.CHANGE_ORDERING_SUCCESS ,linkIndex)
});

// change status multi
router.post('/change-status/:status', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params,'status', 'active')
  //hàm xử lý
  let data=await itemsModel.changeMultiStatusModels(currentStatus)

  await ItemServer.updateMany({_id:{$in: req.body.cid}},data ).then((data)=>{
    req.flash('warning', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS,data.matchedCount) ,linkIndex)
})
});

// delete multi
router.post('/delete/', async function(req, res, next) {
      await ItemServer.deleteMany({_id:{$in: req.body.cid}}).then((data)=>{
        req.flash('warning',util.format( notifyConfig.DELETE_MULTI_SUCCESS,data.deletedCount),linkIndex)
    })
});

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let data= await itemsModel.formModels()
  if (id === '') { //add
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item:data.item, showError:data.showError });
  } else { //edit
    await ItemServer.findById(id).then((item)=>{
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, showError:data.showError});
   })
  }
});

// save
router.post('/save/', 
body('name')
  .isLength({ min: 5, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_NAME,5,100)),
body('ordering')
  .isInt({ min: 1, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_ORDERING,1,100)),
body('status')
  .not()
  .isIn(['novalue'])
  .withMessage(util.format(notifyConfig.ERROR_STATUS)),
async function(req, res, next) {
  const errors = validationResult(req);
    req.body = JSON.parse(JSON.stringify(req.body));
    let item = Object.assign(req.body)
    if (item.id !=='' && item !== undefined) { //edit
      if (!errors.isEmpty()) { // có lỗi
        res.render(`${folderView}form`, { 
          pageTitle: pageTitleEdit, 
          item, 
          showError:errors.errors 
        });
      }else{ // kh lỗi
        //hàm xử lý
        await itemsModel.saveEditModels(ItemServer,item)
        req.flash('success', notifyConfig.EDIT_SUCCESS,linkIndex)
      }
    } else { //add
      if (!errors.isEmpty()) { // có lỗi
        res.render(`${folderView}form`, { 
          pageTitle: pageTitleAdd, 
          item, 
          showError:errors.errors 
        });
      } else { // không lỗi

        //hàm xử lý
        let items= await itemsModel.createNewItemModels(item)
        new ItemServer(items).save().then((result)=>{
          req.flash('success', notifyConfig.ADD_SUCCESS,linkIndex)
        })
      }
    }
});


// sort
router.get('/sort/:sort_field/:sort_type', async function(req, res, next) {
  req.session.sort_field  = paramsHelpers.getParam(req.params,'sort_field', 'ordering')
  req.session.sort_type = paramsHelpers.getParam(req.params,'sort_type', 'asc')
  res.redirect(linkIndex)
});


module.exports = router;
