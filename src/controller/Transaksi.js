const config = require('../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
})

module.exports = {
    createTransaksi(req,res){
        const user_id = req.body.user_id
        const food_id = req.body.food_id
        const jumlah = req.body.jumlah

        if(user_id.length == 0 || food_id.length == 0 || jumlah.length == 0){
            res.send({
                success: false,
                message: 'Data tidak boleh kosong!'
            })
        }

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM food WHERE id=${food_id};
                `
            , function (error, results) {
                if(error) throw error;
                if(results[0] != null){
                    pool.getConnection(function(err, connection) {
                        if (err) throw err;
                        connection.query(
                            `SELECT * FROM user WHERE id=${user_id};`
                        , function (error, results) {
                            if(error) throw error;  
                            if(results[0] != null){
                                pool.getConnection(function(err, connection) {
                                    if (err) throw err;
                                    connection.query(
                                        `INSERT INTO transaksi VALUES (NULL, '${user_id}', '${food_id}', '${jumlah}');`
                                    , function (error, results) {
                                        if(error) throw error;  
                                        res.send({ 
                                            success: true, 
                                            message: 'Berhasil tambah data!',
                                        });
                                    });
                                    connection.release();
                                })
                            }else{
                                res.send({
                                    success: false,
                                    message: 'ID user tidak valid!'
                                });
                            }
                        });
                        connection.release();
                    })
                    
                }else{
                    res.send({
                        success: false,
                        message: 'ID food tidak valid!'
                    });
                }
            })
            connection.release();
        })
    },
    getTransaksi(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT transaksi.id,food.user_id as seller_id, transaksi.user_id as buyer_id, food.nama, food.harga, transaksi.jumlah FROM transaksi inner join food on transaksi.food_id = food.id inner join user on transaksi.user_id = user.id;
                `
            , function (error, results) {
                if(error) throw error;
                res.send(results);
            })
            connection.release();
        })
    },
    getTransaksiById(req,res){
        const id = req.params.id

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT transaksi.id,food.user_id as seller_id, transaksi.user_id as buyer_id, food.nama, food.harga, transaksi.jumlah FROM transaksi inner join food on transaksi.food_id = food.id inner join user on transaksi.user_id = user.id WHERE transaksi.id=${id};
                `
            , function (error, results) {
                if(error) throw error;
                res.send(results);
            })
            connection.release();
        })
    },
    deleteTransaksi(req,res){
        const id = req.params.id

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM transaksi WHERE id=${id};
                `
            , function (error, results) {
                if(error) throw error;
                res.send({
                    success: true,
                    message: 'Berhasil hapus data!'
                });
            })
            connection.release();
        })
    }
}