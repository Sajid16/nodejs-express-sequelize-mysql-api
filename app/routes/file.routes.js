let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');

const fileWorker = require('../controllers/file.controller.js');

router.post('/api/file/upload', upload.single("file"), fileWorker.uploadFile);

router.get('/api/file/all', fileWorker.listAllFiles);

router.get('/api/file/:id', fileWorker.downloadFile);

module.exports = router;