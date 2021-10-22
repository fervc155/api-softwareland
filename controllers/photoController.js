const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.update = async (req, res, next) => {

    const configuracionMulter = {
        limits : { fileSize :   1024 * 1024 * 2   },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}` );
            }
        })
    }
    
    const upload = multer(configuracionMulter).single('photo');


    upload( req, res, async (error) => {
      
        if(!error) {
            if(req.user.photo){
                this.remove(req.user);
            }

             req.user.photo =req.file.filename;
                await req.user.save();

                console.log(req.user);
                res.json(req.user);
        } else {
            console.log(error);
            return next();
        }
    });
}


exports.remove =   ( user) => {
   

    try {
        fs.unlinkSync(__dirname + `/../uploads/${user.photo}`);
        console.log('Archivo Eliminado');
    } catch (error) {
        console.log(error);
    }
}