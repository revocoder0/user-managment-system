const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit :100,
    host            : process.env.DATABASE_HOST,
    user            : process.env.DATABASE_USER,
    password        : process.env.DATABASE_PASSWORD,
    database        : process.env.DATABASE_NAME
});

exports.view = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' +connection.threadId);
        connection.query('SELECT * FROM user ORDER BY id DESC', (err,rows)=>{
            connection.release();
            if(!err){
                res.render('home', {rows});         
            }else{
                console.log(err);
            }
            console.log('The Data Form Table: \n', rows);
        })
    });
}

//Search Data
exports.find = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' +connection.threadId);
        let searchResult = req.body.search;
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%'+searchResult+'%','%'+searchResult+'%'], (err,rows)=>{
            connection.release();
            if(!err){
                res.render('home', {rows});         
            }else{
                console.log(err);
            }
            console.log('The Data Form Table: \n', rows);
        })
    });
}

exports.form = (req,res) => {
    res.render('add-user');
}
//Create
exports.create=(req,res) => {
    const {first_name,last_name,email,phone,comment}=req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' +connection.threadId);
        let searchResult = req.body.search;
        connection.query('INSERT INTO user SET first_name=?, last_name=?, email=?,phone=?, comments=?', [first_name,last_name,email,phone,comment], (err,rows)=>{
            connection.release();
            if(!err){
                res.render('add-user', {alert:'User Added Successfully!'});         
            }else{
                console.log(err);
            }
            console.log('The Data Form Table: \n', rows);
        })
    });
}
exports.count=(req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query('SELECT id FROM user WHERE ORDER BY id',(err,rows)=>{
            if(!err){
                res.render('home', {rows})
            }
        })
    });
}
//edit user
exports.edit = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' +connection.threadId);
        connection.query('SELECT * FROM user WHERE id =?',[req.params.id], (err,rows)=>{
            connection.release();
            if(!err){
                res.render('edit-user', {rows});         
            }else{
                console.log(err);
            }
            console.log('The Data Form Table: \n', rows);
        })
    });
}
//Update user
exports.update = (req,res) => {
    const {first_name,last_name,email,phone,comment}=req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' +connection.threadId);
        connection.query('UPDATE user SET first_name=?, last_name=?, email=?, phone=?, comments=? WHERE id=?',[first_name,last_name,email, phone, comment, req.params.id], (err,rows)=>{
            connection.release();
            if(!err){
                pool.getConnection((err,connection)=>{
                    if(err) throw err;
                    console.log('Connected as ID ' +connection.threadId);
                    connection.query('SELECT * FROM user WHERE id =?',[req.params.id], (err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render('edit-user', {rows,alert:`${first_name} Update Successfully!`});         
                        }else{
                            console.log(err);
                        }
                        // console.log('The Data Form Table: \n', rows);
                    })
                });         
            }else{
                console.log(err);
            }
            // console.log('The Data Form Table: \n', rows);
        })
    });
}
//delete user
exports.delete = (req, res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' +connection.threadId);

        connection.query('DELETE FROM user WHERE id =?', [req.params.id], (err,rows)=>{
            if(!err){
                res.redirect('/');
            }else{
                console.log(err);
            }
            console.log('The Data Form Table: \n', rows);
        });
    });

}

exports.view_user = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' +connection.threadId);
        connection.query('SELECT * FROM user WHERE id =?',[req.params.id], (err,rows)=>{
            connection.release();
            if(!err){
                res.render('view-user', {rows});         
            }else{
                console.log(err);
            }
            console.log('The Data Form Table: \n', rows);
        })
    });
}



