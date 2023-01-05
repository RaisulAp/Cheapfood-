const router = require('express').Router();
const {user, food, transaksi, toko} = require('../controller');

router.get('/user', user.getUser)
router.post('/login', user.login)
router.post('/user', user.createUser)
router.get('/user/:id', user.getuserById)
router.put('/user/:id', user.userUpdate)
router.delete('/user/:id', user.userDelete)

router.get('/food', food.getFood)
router.post('/food', food.createFood)
router.get('/food/:id', food.getFoodById)
router.get('/food/toko/:toko_id', food.getFoodByTokoId)
router.put('/food/:id', food.updateFood)
router.delete('/food/:id', food.deleteFood)

router.get('/transaksi', transaksi.getTransaksi)
router.post('/transaksi', transaksi.createTransaksi)
router.get('/transaksi/:id', transaksi.getTransaksiById)
router.delete('/transaksi/:id', transaksi.deleteTransaksi)

router.get('/toko', toko.getToko)
router.get('/toko/user/:user_id', toko.getTokoByUserId)
router.post('/toko', toko.createToko)
router.get('/toko/:id', toko.getTokoById)
router.put('/toko/:id', toko.updateToko)
router.delete('/toko/:id', toko.deleteToko)



module.exports = router;