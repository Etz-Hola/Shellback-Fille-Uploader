const path = require('path');

const fileExtlimiter = (allowedExtArray) => {
    return(req, res, next) => {
        const files = req.files;

    const fileExtensions = [];

    Object.keys(files).forEach(key => {
        fileExtensions.push(path.extname(files[key].name))
    })

    // Are thr file extensions allowed?
    const allowed = fileExtensions.every(extension => allowedExtArray.includes(extension))

    if(!allowed) {
        const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed `.replaceAll(",", ",");

        //unprocessable content
        return res.status(422).json({status: "error", message}) 
    }
    next()        
    }
}

module.exports = fileExtlimiter