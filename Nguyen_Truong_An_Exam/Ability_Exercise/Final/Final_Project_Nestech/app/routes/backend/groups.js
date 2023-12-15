var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');

const colName = 'groups'

const groupsServices = require(__path_services + colName)
const usersServices = require(__path_services + 'users')
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');

let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Groups Manager`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views_backend +`pages/${colName}/`

// list Items
router.get('(/status/:status)?', async function(req, res, next) {
  let params = {}
  params.currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')
  params.keyword = paramsHelpers.getParam(req.query, 'keyword', '')
  let statusFilters = await utilsHelpers.createStatusFilter(params.currentStatus, 'groups')
  params.sortFied = paramsHelpers.getParam(req.session, 'sort_fied', 'name')
  params.sortType = paramsHelpers.getParam(req.session, 'sort_type', 'asc')

  params.pagination = {
    totalItems: 1,
    totalItemsPerPage: 7,
    currentPage: parseInt(paramsHelpers.getParam(req.query, 'page', 1)),
    pageRange: 3
  }

  await groupsServices.countItems(params).then((data) => {
    params.pagination.totalItems = data
  })

  groupsServices.listItems(params)
    .then((items) => {
      res.render(`${folderView}list`, {
        pageTitle: pageTitle,
        items: items,
        statusFilters: statusFilters,
        params: params
      })
    })
});

// change status single
router.get('/change-status/:status/:id', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active');
  let id = paramsHelpers.getParam(req.params, 'id', '');
  groupsServices.changeStatus(currentStatus, id, { task: 'changeStatus-one' }).then((result) => {
    req.flash('success', notifyConfig.CHANGE_STATUS_SUCCESS, linkIndex)
  });
});

// delete single
router.get('/delete/:id', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params, 'id', '');
  groupsServices.deleteItems(id, { task: 'delete-one' }).then((result) => {
    req.flash('success', notifyConfig.DELETE_SUCCESS, linkIndex)
  });
});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  let cids = req.body.cid
  let oderings = req.body.ordering
  groupsServices.changeOrdering(cids, oderings).then((result) => {
    req.flash('success', notifyConfig.CHANGE_ORDERING_SUCCESS, linkIndex)
  })
});

// change status multi
router.post('/change-status/:status', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active');
  groupsServices.changeStatus(currentStatus, req.body.cid, { task: 'changeStatus-multi' }).then((result) => {
    req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
  })
});

// delete multi
router.post('/delete/', async function(req, res, next) {
  groupsServices.deleteItems(req.body.cid, { task: 'delete-multi' }).then((result) => {
    req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS, result.deletedCount), linkIndex)
  });
});

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let item = {name: '', ordering: 0, status:'novalue'}
  let showError = null
  if (id === '') { //add
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, showError });
  } else { //edit
    await groupsServices.getItems(id).then((item)=>{
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, showError });
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
    let taskCurrent = (typeof item !== 'undefined' && item.id !== '') ? 'edit' : 'add'
    if (!errors.isEmpty()) {
      let pageTitle = (taskCurrent == 'add') ? pageTitleAdd : pageTitleEdit
        res.render(`${folderView}form`, { pageTitle, item, showError: errors.errors
        })
    } else {
      let message = (taskCurrent == 'add') ? notifyConfig.ADD_SUCCESS : notifyConfig.EDIT_SUCCESS
      groupsServices.saveItems(item,{task: taskCurrent}).then((result)=>{
        if (taskCurrent == 'add') {
          req.flash('success', message , linkIndex)
        } else if (taskCurrent == 'edit') usersServices.saveItems(item, {task: 'change-group-name' }).then((result)=>{
        req.flash('success', notifyConfig.EDIT_SUCCESS , linkIndex)
        })
      });
    }
});


// sort
router.get('/sort/:sort_field/:sort_type', async function(req, res, next) {
  req.session.sort_field  = paramsHelpers.getParam(req.params,'sort_field', 'ordering')
  req.session.sort_type = paramsHelpers.getParam(req.params,'sort_type', 'asc')
  res.redirect(linkIndex)
});

router.get('/change-group/:id/:groups_acp', async function(req, res, next) {
  let currentGroups = paramsHelpers.getParam(req.params, 'groups_acp', 'yes');
  let id = paramsHelpers.getParam(req.params, 'id', '');
  groupsServices.changeGroup(currentGroups, id).then((result) => {
    req.flash('success', notifyConfig.CHANGE_GROUPS_SUCCESS, linkIndex)
  });

});


module.exports = router;
