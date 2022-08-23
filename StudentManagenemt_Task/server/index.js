const exp = require('express');
const mys = require('mysql');
const app = exp();
const cors = require('cors');
const { response } = require('express');
app.use(cors());
app.use(exp.json());

const c = mys.createConnection({
    host : "localhost",
    user : "root",
    password : "sabariz31",
    database : "task"
});
 
c.connect(function(err){
    if(err){console.log('error');}
    else{console.log('Data Base Connected');}
});

app.get("/",(request,response)=>{
    c.query('select * from pages',(err,result,field)=> {
        if (err) throw err;
        response.send(result);
        
    });

})

app.post("/employee_view/:id",(request,response)=>{
    const {id} = request.params;
    c.query('select * from pages where id=?',[id],(err,result,field)=> {
        if (err) throw err;
        response.send(result);
    });

})

app.post("/employee",(request,response)=>{
    const f_name2 = request.body.firstName;
    const l_name2 = request.body.lastName;
    const location2 = request.body.location;
    const email2 = request.body.emailId;
    const dob2 = request.body.dob;
    const education2 = request.body.education;

    c.query("INSERT INTO pages ( firstname, lastname, location, email, dob, education) values (?,?,?,?,?,?)",[f_name2,l_name2,location2,email2,dob2,education2],function(error,result){
        if(result){console.log("Inserted Successfully");}
        else{console.log(error);}
    });

})

app.post("/employee_update",(request,response)=>{
    const id = request.body.id;
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const location = request.body.location;
    const emailId = request.body.emailId;
    const dob =request.body.dob;
    const education=request.body.education;

    c.query("update pages set firstname=?,lastname=?,location=?,email=?,dob=?,education=? where id=?",[firstName,lastName,location,emailId,dob,education,id],function(error,result){
        if(result){console.log("Updated Successfully");}
        else{console.log(error);}
    });

})

app.post("/employee_delete/:id",(request,response)=>{
    const {id} = request.params;
    c.query('delete from pages where id=?',[id],(err,result,field)=> {
        if (err) throw err;
        response.send(result);
    });

})

app.listen(3015);