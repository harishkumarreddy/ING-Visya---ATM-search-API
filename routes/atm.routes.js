const express = require('express');
const router = express.Router();
const atmController = require('../controllers/atm.controller');

router.post('/create', atmController.createAtm)
router.get('/search/:city?', atmController.search )
router.get('/get/:id', atmController.getAtm )
router.put('/update/:id', atmController.updateAtm)
router.delete('/delete/:id', atmController.deleteAtm)

module.exports = router;