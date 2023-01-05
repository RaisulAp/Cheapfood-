const config = require('../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

const user = require('./User');

module.exports = {
    createFood(req,res){
        const user_id = req.body.user_id
        const nama = req.body.nama
        const toko_id = req.body.toko_id
        const harga = req.body.harga
        const lokasi = req.body.lokasi

        if(nama.length === 0 || toko_id.length === 0 || harga.length === 0 || lokasi.length === 0){
            res.json({
                success: false,
                message: 'Data tidak boleh kosong!'
            })
        }else{
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `
                    SELECT * FROM user WHERE id=${user_id};
                    `
                , function (error, results) {
                    if(error) throw error;  
    
                    if(results[0].isSeller == 1){
                        pool.getConnection(function(err, connection) {
                            if (err) throw err;
                            connection.query(
                                `INSERT INTO food VALUES (NULL, '${toko_id}' ,'${nama}', ${harga}, '${lokasi}');`
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
                            message: 'User bukan pedangang!'
                        })
                    }
                });
                connection.release();
            })
        }

        
    },

    getFood(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM food;
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

    getFoodById(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM food WHERE id=${req.params.id};
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

    getFoodByTokoId(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM food WHERE toko_id=${req.params.toko_id};
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

    updateFood(req,res){
        const nama = req.body.nama
        const harga = req.body.harga
        const lokasi = req.body.lokasi

        if(nama.length === 0 || harga.length === 0 || lokasi.length === 0){
            res.json({
                success: false,
                message: 'Data tidak boleh kosong!'
            })
        }else{
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `
                    UPDATE food SET nama='${nama}', harga=${harga}, lokasi='${lokasi}' WHERE id=${req.params.id};
                    `
                , function (error, results) {
                    if(error) throw error;  
                    res.status(200).json({ 
                        success: true, 
                        message: 'Berhasil update data!',
                    });
                });
                connection.release();
            })
        }

    },

    deleteFood(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM food WHERE id=${req.params.id};
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!',
                });
            });
            connection.release();
        })
    }
}