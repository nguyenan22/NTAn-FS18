module.exports= (res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTION'); // If needed
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
}