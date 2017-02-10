var express = require('express');
var jobCtrl = require('../controllers/job_ctrl');
var router = express.Router();

router.get('/', jobCtrl.home);
router.post('/createQue', jobCtrl.createQue);
router.get('/getStatus', jobCtrl.getStatus);
router.get('/updateStatus', jobCtrl.updateStatus);

module.exports = router;
