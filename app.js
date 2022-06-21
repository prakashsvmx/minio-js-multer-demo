var minio = require("minio")
var fs = require('fs');


var express = require('express'),
app = express(),
multer = require('multer');

const upload = multer()

const mc = new minio.Client(
    {
            endPoint: "localhost",
            useSSL: false,
            port: 9000,
            accessKey: "minio",
            secretKey: "minio123"
    }
);




app.get('/upload', function (req, res) {
res.status(200)
    .send('<form method="POST" action="/upload" enctype="multipart/form-data">'
        + '<input type="file" name="file1"/><input type="submit"/>'
        + '</form>')
    .end();
})

app.post('/upload',upload.single('file1'), function (req, res) {

var file1 = req.file

mc.putObject("test-docker-bucket", "test-browser.zip", file1.buffer, (err, objInfo) => {
    console.log("Hello ... Done...")
})

})

app.listen(process.env.PORT || 3000, function () {
console.log('Example Server listening at port ' + (process.env.PORT || 3000));
});

