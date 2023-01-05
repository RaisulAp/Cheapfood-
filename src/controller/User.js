const config = require('../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    createUser(req,res){
        const email = req.body.email
        const username = req.body.username
        const password = req.body.password
        const isSeller = req.body.isSeller

        if(email.length == 0 || username.length == 0 || password.length == 0 || isSeller.length == 0){
            res.status(200).json({
                success: false,
                message: 'Data tidak boleh kosong!',
                email: email,
                username: username,
                password: password,
                isSeller: isSeller
            })
        }            

        pool.getConnection(function(err, connection) {
            if (err) {
                res.json({
                    success: false,
                    error: error
                })
            };
            connection.query(
                `INSERT INTO user VALUES (NULL, '${email}', '${username}', '${password}', ${isSeller});`
            , function (error, results) {
                if(error){
                    res.json({
                        success: false,
                        error: error
                    })
                };  
                res.status(200).json({ 
                    success: true, 
                    message: 'Berhasil tambah data!',
                });
            });
            connection.release();
        })
    },
    getUser(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM user;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },

    login(req,res){
        const email = req.body.email
        const password = req.body.password

        if(email.length == 0 || password.length == 0){
            res.json({
                success: false,
                message: 'Data tidak boleh kosong!'
            })
        }

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM user WHERE email='${email}' AND password='${password}';
                `
            , function (error, results) {
                if(error) throw error;  
                if(results[0] != null){
                    res.json({ 
                        success: true, 
                        message: 'Berhasil login!',
                        data: results 
                    });
                }else{
                    res.json({ 
                        success: false, 
                        message: 'Email atau password salah!',
                    });
                }
            });
            connection.release();
        })
    },

    getuserById(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM user WHERE id=${req.params.id};
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
    userUpdate(req,res){
        const email = req.body.email
        const username = req.body.username
        const password = req.body.password

        if(email.length == 0 || username.length == 0){
            res.json({
                success: false,
                message: 'Data tidak boleh kosong!'
            })
        }else{
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `select * from user where id = ${req.params.id}`
                , function (error, results) {
                    if(error) throw error;  
                    if(password == results[0].password){
                        pool.getConnection(function(err, connection) {
                            if (err) throw err;
                            connection.query(
                                `UPDATE user SET email = '${email}', username = '${username}' WHERE id = ${req.params.id}`
                            , function (error, results) {
                                if(error) throw error;  
                                res.status(200).json({ 
                                    success: true, 
                                    message: 'User berhasil diupdate!'
                                });
                            });
                            connection.release();
                        })
                    }else{
                        res.json(
                            {
                                success: false,
                                message: 'Password salah!'
                            }
                        )
                    }
                });
                connection.release();
            })


            
        }     
        
    },
    userDelete(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM user WHERE id=${req.params.id};
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'User berhasil dihapus!',
                    data: results 
                });
            });
            connection.release();
        })
    }
}