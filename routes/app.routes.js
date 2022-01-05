const express = require('express');
const errCods = require('../configs/speeches.config');
const authRouts = require('./auth.routes');
const userRoutes = require('./user.routes');
const atmRoutes = require('./atm.routes');


const router = express.Router();

router.all('/', (req, res, next)=>{
    res.status(200).json({
        "msg": "Hello World!"
    })
    next()
})

router.use('/errlist',(req, res, next)=>{
    delete errCods.ACCESS_TOKEN_TYPE;
    delete errCods.REFRESH_TOKEN_TYPE;
    res.status(200).json(errCods);
    next();
});

router.use('',authRouts);
router.use('/users',userRoutes);
router.use('/atm',atmRoutes);

module.exports = router;