const fs=require('fs')
const url=require('url')


let renderHTML=(type,typeURL) =>{
    fs.readFile(`./view${typeURL}.html`, function(err, data) {
      console.log(`./view${typeURL}`)
      if (err) {
        type.write("File not found!")
      }
      else {
        type.write(data)
      }
      return type.end()
  })}


let onReq=(req, res) => {
    let path=url.parse(req.url).pathname
    console.log(path)
    if (path==="/") {
      renderHTML(res,`${path}home`)
  }
  else if (path==="/about"){
      renderHTML(res,path)
  }
  else {
    renderHTML(res,path)
  }
  }
module.exports={
    onReq:onReq
}