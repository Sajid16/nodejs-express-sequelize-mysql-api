var stream = require('stream');
const db = require("../models");
const File = db.files;

exports.uploadFile = (req, res) => {
    File.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: req.file.buffer
    }).then(() => {
        res.json({
            msg: 'File uploaded successfully! -> filename = ' + req.file.originalname
        });
    })
}

exports.listAllFiles = (req, res) => {
    File.findAll({
        attributes: ['id', 'name']
    }).then(files => {
        res.json(files);
    });
}

exports.downloadFile = (req, res) => {
    File.findByPk(req.params.id).then(file => {
        var fileContents = Buffer.from(file.data, "base64");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        res.set('Content-disposition', 'attachment; filename=' + file.name);
        res.set('Content-Type', file.type);

        readStream.pipe(res);
    })
}