
const fs = require('fs');
const path = require('path');

cleanTmpFile = (targetFile)=>{
   fs.unlink(targetFile.tempFilePath, function (err) {
        if (err) { console.log(err) }
    });
}

fileStoreUpload = (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        const err = 'No files were uploaded.'
        return res.status(400).json({ succes: false, mess: err, payload: { error: err } })
    }
    try {

        let targetFile = req.files.file;
        let extName = path.extname(targetFile.name);
        let baseName = path.basename(targetFile.name, extName);
        let uploadDir = path.join(__dirname, '/../../data/store/', targetFile.name);

        //Check the allowed extension
        const allowedExtension = ['.png', '.jpg', '.jpeg', '.pdf', '.PDF'];

        if (!allowedExtension.includes(extName)) {
            const err = {
                err: 'Invalid file type',
                mess: "You are trying to upload an unauthorized file. The authorized files are: /".gif / ", /".jpg / ", /".jpeg / ", and /".pdf / ""
            }
            cleanTmpFile(targetFile);
            return res.status(422).json({ succes: false, mess: mess, payload: { error: err } })
        }


        /*let num = 1;
        while (fs.existsSync(uploadDir)) {
            uploadDir = path.join(__dirname, './../../data/store/', baseName + '-' + num + extName);
            num++;
        }*/

        targetFile.mv(uploadDir, (err) => {
            if (err){
                //cleanTmpFile();
                return res.json({succes: false, mess: "Error moving book", payload: {error:err, store:uploadDir}});
            }
            //cleanTmpFile(targetFile);
            
            req.targetFile = targetFile;
            req.uploadDir = uploadDir;
            
            next();
        });

    } catch (err) {
        console.log('error', err);
    }
}

const fileStore = {
    fileStoreUpload: fileStoreUpload,
};
module.exports = fileStore;