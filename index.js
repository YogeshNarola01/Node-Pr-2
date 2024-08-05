const express = require('express')

const app = express()

const port = 8003

app.set('view engine','ejs')

let data = []

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    return res.render('view',{
        users : data
    })
})

app.get('/add',(req,res)=>{
    return res.render('add')
})

app.post('/insertRecord',(req,res)=>{
    const {username,userphone,userage} = req.body;
    let obj = {
        id : Date.now(),
        name : username,
        phone : userphone,
        age : userage
    }
    data.push(obj)
    return res.redirect('/')
})

app.get('/deletrecord',(req,res)=>{
    let id = req.query.id;
    let delet = data.filter(val => val.id != id);
    data = delet;
    console.log('record delete..');
    return res.redirect('/')
})

app.get('/editrecord',(req,res)=>{
    let id = req.query.id;
    let edit = data.find(val => val.id == id);
    console.log(edit);
    return res.render('edit',{
        edit
    })
})

app.post('/editedrecord', (req, res) => {
    let editid = req.body.editid; // Get the ID from the request body
    console.log(editid);
    

   
});




app.listen(port,(err)=>{
    if(err) {
        console.log(err)
       return false
    }
    console.log(`server is running on port ${port}`)
})