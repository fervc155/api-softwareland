const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = async (req, res, next) => {

    // autorización por el header
    const token =  req.header('x-auth-token');


 

    if(!token) {
        res.status(402).json({msg:'No se envio un token'});
        return;
    }

    
    

    let tokenJson;
    try {
        tokenJson = jwt.verify(token, 'LLAVESECRETA');
    } catch (error) {
        res.status(402).json({msg:'No se envio un token valido'});
        return;
    }


   

    // Si es un token valido, pero hay algun error
    if(!tokenJson) {
        res.status(402).json({msg:'No se envio un token valido'});
        return;
    }

    if(Date.now() >= tokenJson.exp *1000) {
        res.status(402).json({msg:'Sesion expirada'});
        return;
    }


     try{
        const user = await User.findById(tokenJson.id);
        req.user = user;
        return next();

     }catch(error){
        res.status(402).json({msg:'No se encontro un usuario'});
        return;
       
     }
   
 



    next();
}