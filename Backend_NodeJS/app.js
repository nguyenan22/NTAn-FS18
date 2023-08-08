const http = require('http');
const moduleOne=require('./config')
const course=[
    { id:1, name:'test'},
    {id:2, name:'test2'}
]
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    success:true,
    data:course
  }));
}).listen(moduleOne.ports, moduleOne.hostnames, () => {
  console.log(`Server running at http://${moduleOne.hostnames}:${moduleOne.ports}/`);
});