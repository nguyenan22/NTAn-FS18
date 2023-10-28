
const multer  = require('multer');
var randomstring = require("randomstring");
const path = require('path'); 
const fs=require('fs')
const notifyConfig=require('../configs/notify')
const uploadFile = (field,folderDes = 'users',fileNameLength = 10, fileSizeMb = 1, fileExtension = 'jpeg|jpg|png|gif|webp') =>{

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __path_uploads + folderDes +'/' )
    },
  
    filename: function (req, file, cb) {
      cb(null, randomstring.generate(fileNameLength) + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: fileSizeMb * 1024 * 1024 }, //bit --> 1MB
    fileFilter: function (req, file, cb) {
      const fileTypes = new RegExp(fileExtension)
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
      const mimetype = fileTypes.test(file.mimetype)
  
      if (mimetype && extname) {
        return cb(null, true)
      } else{
        return cb(notifyConfig.ERROR_UPLOAD_FILE)
      }
  }
   }).single(field)

   return upload
}

const removeFile= (folder,fileName) =>{
  if(fileName !='' && fileName!=undefined){
    let path=folder+fileName
    if (fs.existsSync(path)) fs.unlink(path,(err) => {if (err) console.log(err)})
  }
}

module.exports ={
  upload: uploadFile,
  remove:removeFile
}