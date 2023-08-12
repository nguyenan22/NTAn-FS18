const http = require('http');
const moduleOne=require('./myModule/config')
const helper=require("./myModule/helper")
// const course=[
//     { id:1, name:'test'},
//     {id:2, name:'test2'}
// ]


http.createServer(helper.onReq.listen(moduleOne.ports, moduleOne.hostnames, () => {
  console.log(`Server running at http://${moduleOne.hostnames}:${moduleOne.ports}/`);
}));