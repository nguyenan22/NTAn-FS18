
const orders_productModels = require(__path_models + 'orders_product')
module.exports = {
    listItems: (params, options = null)=>{
        let objWhere = {};
        let sort = {}
        sort[params.sortFied] = params.sortType
        if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
        if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
     return orders_productModels
            .find(objWhere)
            .sort(sort)
            .limit(params.pagination.totalItemsPerPage)
            .skip((params.pagination.currentPage - 1)*params.pagination.totalItemsPerPage)
    },
  countItems: (params, options = null)=>{
      return  orders_productModels.count(params.objWhere)
    },
  getItems: (id, option = null) => {
    return categories_productModels.findById(id)
  },

  saveItems: (item, options = null) => {
    if (options.task == 'add') {
      delete item.id
      item.created = {
        user_name: 'admin',
        user_id: 0
      }
      return new categories_productModels(item).save()
    }
    if (options.task == 'edit') {
      return categories_productModels.updateOne({ _id: item.id }, {
        name: item.name,
        ordering: parseInt(item.ordering),
        status: item.status,
        modify: {
          user_name: 'admin',
          user_id: 0
        }
      })
    }
  },
  getOrderByTrackingCode: async (code) =>{
    let result = await modelOrder.findOne({trackingCode: code})
    return result
  },
  getOrderById: async (id) =>{
    let result = await modelOrder.findOne({_id: id}).populate({
      path:'address',
      populate:{
        path: 'province'
      }
    })
    return result
  },
  
  addOrder: async (obj) =>{
    let trackingCode = CodeHelpers.generateAZ(3) + CodeHelpers.generateOTP(6)
    let errorObj = {success: false,errors:[{
      msg: notify.PRESS_F5
    }]}
    let saveOrder = {}
                  saveOrder.name    = obj.name
                  saveOrder.userId  = obj.userId
                  saveOrder.address = {
                    info: obj.infoAddress,
                    province: obj.province,
                  }
                  saveOrder.phoneNumber = obj.phoneNumber
                  saveOrder.notes = obj.notes
                  saveOrder.trackingCode = trackingCode
    let costShip = await serviceDelivery.getOneByID(obj.province)
    if(costShip.cost == obj.costShip){
      saveOrder.costShip = costShip.cost
    }else{
      return Promise.reject(errorObj)
    }
    let listProduct  =  JSON.parse(obj.productOrder)
    let listProductNews = []
    let priceProduct = 0
    let data = await Promise.all(listProduct.map(async (item,index) => {
              let product      = await serviceProduct.getProductByIdForOrder(item.id)
              product          = JSON.parse(JSON.stringify(product))
              let findDiscount = await CalculatorHelpers.findDiscount(product.discountProduct, product.price)
              let priceFinal   = await CalculatorHelpers.productPrice(product.price, findDiscount)
              priceProduct       +=  priceFinal*item.quantity
              product.quantity   =  item.quantity
              product.priceFinal   =  priceFinal
              return product
       })).then((values) => {
        saveOrder.productList = JSON.stringify(values)
      })
      .catch((error) => {
          console.log(error)
          return Promise.reject(errorObj)
      });

    if(priceProduct != obj.priceProduct) {
      return errorObj
    } else{
      saveOrder.priceProduct = priceProduct
    }
    let newturnused
    if(obj.couponCode){
      let findCode = await serviceCoupon.getCodeCoupon({status:"active", couponcode: obj.couponCode})
      if(findCode) 
      {   
          let turnused = findCode.turnused || 0
          newturnused = turnused + 1
          let minTotal = findCode.couponValue.minTotal
          if(!obj.priceProduct >= minTotal && !CheckTimeInRangeHelper.checkTimeInRange(findCode.time)){
              return errorObj
          } else{
            saveOrder.couponCode = JSON.stringify(findCode)
            let couponMoney = 0
            if(findCode.couponValue.unit == "money"){
              couponMoney = findCode.couponValue.value 
            } else{
              let couponMoneyPercent = findCode.couponValue.value*priceProduct/100
              couponMoney = (couponMoneyPercent >= findCode.couponValue.maxDown) ? findCode.couponValue.maxDown : couponMoneyPercent
            }
            let priceAfterCoupon = priceProduct - couponMoney + costShip.cost
            if(priceAfterCoupon == obj.totalMoney){
              saveOrder.totalMoney  = obj.totalMoney
              saveOrder.couponValue = couponMoney
            } else{
              return errorObj
            }
          }
      } 
    } else{
      let price = priceProduct + costShip.cost
      if(price == obj.totalMoney){
        saveOrder.totalMoney  = obj.totalMoney
      } else{
        return errorObj
      }
    }
    await serviceCoupon.editTurnUsed({status:"active", couponcode: obj.couponCode}, newturnused)
    await module.exports.saveItems(saveOrder)
    await module.exports.sendMailOrderSuccess(obj, trackingCode)
    return {success: true, trackingCode: trackingCode }
  },

  sendMailOrderSuccess: async function (params, trackingCode) {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
      let setting = await serviceSetting.getOne()
      let settingObj = JSON.parse(setting.setting)
      let listReceiversObj = settingObj.main_email + ',' + settingObj.sub_email
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail" ,
      //   host: "smtp.gmail.com",
      //   port: 587,
      //   secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_SMTP, // generated ethereal user
          pass: process.env.PASSWORD_SMTP, // generated ethereal password
        },
      });
      // send mail with defined transport object
      let infoForClient = await transporter.sendMail({
        from: `"${settingObj.title}" <${settingObj.main_email}>`, // sender address
        to: `${params.email}`, // list of receivers
        subject: notify.EMAIL_ORDER_SUCCESS_SUBJECT, // Subject line
        // text: settingObj.content_email, // plain text body
        html: notify.EMAIL_ORDER_SUCCESS_CONTENT + trackingCode, // html body
      });

      let infoForMember = await transporter.sendMail({
        from: `"${params.name}" <${params.email}>`, // sender address
        to: `${listReceiversObj}`, // list of receivers
        subject: notify.EMAIL_INFORM_ORDER_SUCCESS_SUBJECT, // Subject line
        html: notify.EMAIL_INFORM_ORDER_SUCCESS_CONTENT + trackingCode, // html body
      });
    },

  lastestOrder: async (number) =>{
      let data = await modelOrder.find({}).sort({createdAt: 'desc'}).limit(number)
      return data
  }


}