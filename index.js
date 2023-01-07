const express=require('express');
const cors=require('cors');
const mysql=require('mysql');


const app=express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());

// this is database connection 
var pool=mysql.createPool({
    connectionLimit:10,
    host:"localhost",
    user:"root",
    password:'',
    database:"hospital_management"
})


// api  routing 

app.get("/hospital",(req,res)=>{
   
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        console.log("Connection as id "+connextion.threadId);
        connextion.query('SELECT * FROM `hospital`',(err,rows)=>{
            connextion.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});

// adding data to the hospital
app.post("/hospital",(req,res)=>{
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        const params=req.body;
        connextion.query('INSERT INTO `hospital` SET ?',params,(err,rows)=>{
            connextion.release();
            if(!err){
                res.send("hospital data has been added");
            }else{
                console.log(err);
            }
        })
    })
});
// updating the value of database table 
app.patch("/hospital",(req,res)=>{
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        const {hos_id ,hos_name,hos_doc_id,hos_type,hos_desc}=req.body;
        connextion.query('UPDATE `hospital` SET hos_name=?,hos_doc_id= ?,hos_type= ?,hos_desc=? WHERE hos_id=?',[hos_name,hos_doc_id,hos_type,hos_desc,hos_id],(err,rows)=>{
            connextion.release();
            if(!err){
                res.send("hospital data has been updated");
            }else{
                console.log(err);
            }
        })
    })
});


// this is for the medicine 
app.get("/medicine",(req,res)=>{
   
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        console.log("Connection as id "+connextion.threadId);
        connextion.query('SELECT * FROM `medicines`',(err,rows)=>{
            connextion.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});

// adding data to the hospital
app.post("/medicine",(req,res)=>{
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        const params=req.body;
        connextion.query('INSERT INTO `medicines` SET ?',params,(err,rows)=>{
            connextion.release();
            if(!err){
                res.send("medicine data has been added");
            }else{
                console.log(err);
            }
        })
    })
});
// updating the value of database table 
app.patch("/medicine",(req,res)=>{
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        const {mdcn_id ,mdcn_type,mdcn_price,mdcn_decs}=req.body;
        connextion.query('UPDATE `medicines` SET mdcn_type=?,mdcn_price= ?,mdcn_decs= WHERE mdcn_id=?',[mdcn_type,mdcn_price,mdcn_decs,mdcn_id],(err,rows)=>{
            connextion.release();
            if(!err){
                res.send("medicine data has been updated");
            }else{
                console.log(err);
            }
        })
    })
});



// this is for the doctors

app.get("/doctors",(req,res)=>{
   
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        console.log("Connection as id "+connextion.threadId);
        connextion.query('SELECT * FROM `doctors`',(err,rows)=>{
            connextion.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});

// adding data to the doctors
app.post("/doctors",(req,res)=>{
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        const params=req.body;
        connextion.query('INSERT INTO `doctors` SET ?',params,(err,rows)=>{
            connextion.release();
            if(!err){
                res.send("doctors data has been added");
            }else{
                console.log(err);
            }
        })
    })
});
// updating the value of database table 
app.patch("/doctors",(req,res)=>{
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        const {doc_id ,doc_name,doc_mobile,doc_email,doc_add,doc_specification}=req.body;
        connextion.query('UPDATE `doctors` SET doc_name=?,doc_mobile= ?,doc_email= ?, doc_add=?,doc_specification=?, WHERE doc_id=?',[ doc_name,doc_mobile,doc_email,doc_add,doc_specification,doc_id],(err,rows)=>{
            connextion.release();
            if(!err){
                res.send("doctors data has been updated");
            }else{
                console.log(err);
            }
        })
    })
});


// this is for the patient 
app.get("/patient",(req,res)=>{
   
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        console.log("Connection as id "+connextion.threadId);
        connextion.query('SELECT * FROM `patient`',(err,rows)=>{
            connextion.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});

// adding data to the patient
app.post("/patient",(req,res)=>{
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        const params=req.body;
        connextion.query('INSERT INTO `patient` SET ?',params,(err,rows)=>{
            connextion.release();
            if(!err){
                res.send("patient data has been added");
            }else{
                console.log(err);
            }
        })
    })
});

// this is for getting the list of user whose email start with given param  use of like keyword
app.get("/patient/?:char",(req,res)=>{
   
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        console.log("Connection as id "+connextion.threadId);
        connextion.query('SELECT * FROM `patient` WHERE pat_email LIKE '+`'${req.params.char}%'`,(err,rows)=>{
            connextion.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});
// updating the value of database table 
app.patch("/patient",(req,res)=>{
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        const {pat_id ,pat_name,pat_email,pat_addr,pat_mbl}=req.body;
        connextion.query('UPDATE `patient` SET pat_name=?,pat_email= ?,pat_addr= ?, pat_mbl=?, WHERE pat_id=?',[ pat_name,pat_email,pat_addr,pat_mbl,pat_id],(err,rows)=>{
            connextion.release();
            if(!err){
                res.send("patient data has been updated");
            }else{
                console.log(err);
            }
        })
    })
});

// this is for the user 

app.get("/user",(req,res)=>{
   
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        console.log("Connection as id "+connextion.threadId);
        connextion.query('SELECT * FROM `user`',(err,rows)=>{
            connextion.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});

// adding data to the user
app.post("/user",(req,res)=>{
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        const params=req.body;
        connextion.query('INSERT INTO `user` SET ?',params,(err,rows)=>{
            connextion.release();
            if(!err){
                res.send("user data has been added");
            }else{
                console.log(err);
            }
        })
    })
});
// updating the value of database table 
app.patch("/user",(req,res)=>{
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        const {user_id ,user_name,user_mobile,user_email,user_addr}=req.body;
        connextion.query('UPDATE `user` SET user_name=?,user_mobile= ?,user_email= ?, user_addr=?, WHERE user_id=?',[user_name,user_mobile,user_email,user_addr],(err,rows)=>{
            connextion.release();
            if(!err){
                res.send("user data has been updated");
            }else{
                console.log(err);
            }
        })
    })
});


/// this is demo for join 
app.get("/demo/join",(req,res)=>{
   
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        console.log("Connection as id "+connextion.threadId);
        connextion.query('SELECT hospital.hos_name, doctors.doc_name FROM hospital INNER JOIN doctors ON hospital.hos_doc_id = doctors.doc_id',(err,rows)=>{
            connextion.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});

// used to select all the medicine whose price is greater then 100
app.get("/demo/operator",(req,res)=>{
   
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        console.log("Connection as id "+connextion.threadId);
        connextion.query('SELECT * FROM `medicines` WHERE medicines.mdcn_price>100;',(err,rows)=>{
            connextion.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});
// used to group all the medicine acording to their name
app.get("/demo/groupby",(req,res)=>{
   
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        console.log("Connection as id "+connextion.threadId);
        connextion.query('SELECT COUNT(medicines.mdcn_id), medicines.mdcn_type FROM medicines GROUP BY medicines.mdcn_type',(err,rows)=>{
            connextion.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});


// used toselect all the doctors with given specification 
app.get("/demo/in",(req,res)=>{
   
    pool.getConnection((err,connextion)=>{
        if(err) throw err
        console.log("Connection as id "+connextion.threadId);
        connextion.query('SELECT * FROM doctors WHERE doc_specification IN ("Physician", "surgery", "Dermatology")',(err,rows)=>{
            connextion.release();
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        })
    })
});
app.listen(5000,()=>{
console.log("server has sarted at port 3000");
});
