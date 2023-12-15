
const fs=require('fs')
const mongoose = require('mongoose');
const pathConfig        = require('./path');
const { dirname } = require('path');
global.__base           = __dirname + '/';
global.__path_app       = __base + pathConfig.folder_app + '/';
global.__path_schemas   = __path_app + pathConfig.folder_schemas + '/';
global.__path_configs   = __path_app + pathConfig.folder_configs + '/';



const databaseConfig  = require(__path_configs + 'database');
const itemsSchemas=require('./app/schemas/items.schema')
const careersSchemas=require('./app/schemas/careers.schema')
const usersSchemas=require('./app/schemas/users.schema')
// Local variable

mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.ubyknfq.mongodb.net/${databaseConfig.database}?retryWrites=true&w=majority`)
const items=JSON.parse(fs.readFileSync(`${__dirname}/app/_data/items.json`,'utf-8'))
const careers=JSON.parse(fs.readFileSync(`${__dirname}/app/_data/careers.json`,'utf-8'))
const users=JSON.parse(fs.readFileSync(`${__dirname}/app/_data/user.json`,'utf-8'))
const importData = async() =>{
    try {
       await itemsSchemas.create(items)
       await careersSchemas.create(careers)
       await usersSchemas.create(users)
        process.exit()
    } catch (error) {
        console.log(error)
    }
    
}

const deleteData = async() =>{
    try {
        await itemsSchemas.deleteMany({})
        await careersSchemas.deleteMany({})
        await usersSchemas.deleteMany({})
        process.exit()
    } catch (error) {
        console.log(error)
    }
    
}

if(process.argv[2]=='-i') {
    importData()
}
else if (process.argv[2]=='-d') {
    deleteData()
}