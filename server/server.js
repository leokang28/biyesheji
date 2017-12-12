const path=require('path');
const fs =require('fs');
const express = require("express")

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const logger = require('morgan')


const app = express()

app.use('/api',require('./api/data'))


app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/js/bundle.js'), 'utf-8')
    res.send(html)
})
app.listen(3000, function () {
    console.log(`Server running in port 3000`)
})
