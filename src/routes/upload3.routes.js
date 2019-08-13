const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const Image = require('../models/image.model');

module.exports = function upload(req, res) {
  const form = new IncomingForm();

  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log('file', file);
    const image = new Image({
        title: file.name,
        image : file.path
    });

    image.save((err, imageNew)=> {
        if (err)
                return res.status(500).send(err);
        return res.json();
    });
    
    const readStream = fs.createReadStream(file.path);
  });

  form.on('end', () => {
    // res.json();
  });
  form.parse(req);
};