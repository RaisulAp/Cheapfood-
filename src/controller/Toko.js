const config = require('../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    createToko(req,res){
        const user_id = req.body.user_id
        const nama = req.body.nama
        const alamat = req.body.alamat
        const hari_tutup = req.body.hari_tutup
        const jam_buka = req.body.jam_buka
        const jam_tutup = req.body.jam_tutup
        const maps = req.body.maps

        if(nama.length == 0 || alamat.length == 0 || user_id.length == 0 || hari_tutup.length == 0 || jam_buka.length == 0 || jam_tutup.length == 0 || maps.length == 0){
            res.status(200).json({
                success: false,
                message: 'Data tidak boleh kosong!',
                nama: nama,
                alamat: alamat,
                user_id: user_id,
                hari_tutup: hari_tutup,
                jam_buka: jam_buka,
                jam_tutup: jam_tutup,
                maps: maps
            })
        }else{
            pool.getConnection(function(err, connection) {
                if (err) {
                    res.status(200).json({
                        success: false,
                        error: error
                    })
                };
                connection.query(
                    `SELECT * FROM toko WHERE user_id = ${user_id}`
                , function (error, results) {
                    console.log(results);
                    if(results.length == 0){
                        pool.getConnection(function(err, connection) {
                            if (err) {
                                res.status(200).json({
                                    success: false,
                                    error: error
                                })
                            };
                            connection.query(
                                `INSERT INTO toko VALUES (NULL, ${user_id}, '${nama}', '${alamat}', '${hari_tutup}', '${jam_buka}', '${jam_tutup}', '${maps}');`
                            , function (error, results) {
                                if(error){
                                    res.status(200).json({
                                        success: false,
                                        error: error
                                    })
                                };
                                pool.getConnection(function(err, connection) {
                                    if (err) {
                                        res.status(200).json({
                                            success: false,
                                            error: error
                                        })
                                    };
                                    connection.query(
                                        `UPDATE user SET isSeller = 1 WHERE id = ${user_id}`
                                    , function (error, results) {
                                    });
                                    connection.release();
                                })
                                res.status(200).json({ 
                                    success: true, 
                                    message: 'Berhasil tambah data!',
                                });
                            });
                            connection.release();
                        })
                    }else{
                        res.status(200).json({
                            success: false,
                            message: 'Anda sudah memiliki toko!'
                        })
                    }
                });
                connection.release();
            })
        }            

    },

    getToko(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM toko;
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

    getTokoById(req,res){
        const id = req.params.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM toko WHERE id = ${id};
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

    getTokoByUserId(req,res){
        const user_id = req.params.user_id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM toko WHERE user_id = ${user_id};
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

    updateToko(req,res){
        const id = req.params.id
        const nama = req.body.nama
        const alamat = req.body.alamat
        const hari_tutup = req.body.hari_tutup
        const jam_buka = req.body.jam_buka
        const jam_tutup = req.body.jam_tutup
        const maps = req.body.maps

        if(nama.length == 0 || alamat.length == 0  || hari_tutup.length == 0 || jam_buka.length == 0 || jam_tutup.length == 0 || maps.length == 0){
            res.status(200).json({
                success: false,
                message: 'Data tidak boleh kosong!'
            })
        }else{
            pool.getConnection(function(err, connection) {
                if (err) {
                    res.json({
                        success: false,
                        error: error
                    })
                };
                connection.query(
                    `UPDATE toko SET nama = '${nama}', alamat = '${alamat}', hari_tutup = '${hari_tutup}', jam_buka = '${jam_buka}', jam_tutup = '${jam_tutup}', maps = '${maps}' WHERE id = ${id};`
                , function (error, results) {
                    if(error){
                        res.json({
                            success: false,
                            error: error
                        })
                    };  
                    res.status(200).json({ 
                        success: true, 
                        message: 'Berhasil update data!',
                    });
                });
                connection.release();
            })
        } 

    },

    deleteToko(req,res){
        const id = req.params.id
        pool.getConnection(function(err, connection) {
            if (err) {
                res.json({
                    success: false,
                    error: error
                })
            };
            connection.query(
                `DELETE FROM toko WHERE id = ${id};`
            , function (error, results) {
                if(error){
                    res.json({
                        success: false,
                        error: error
                    })
                };  
                res.status(200).json({ 
                    success: true, 
                    message: 'Berhasil hapus data!',
                });
            });
            connection.release();
        })
    }
}