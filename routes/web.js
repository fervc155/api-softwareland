
const express = require('express');
const web = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const photoController = require('../controllers/photoController')
const checkAuth = require('../middleware/auth');

module.exports = function() {
    // ruta para el home
    web.get('/',userController.index    );
    web.get('/cv/:email',userController.show    );
 
     web.post('/register',authController.register    );
     web.post('/login',authController.login    );


     web.put('/change-password',checkAuth,authController.changePassword);
     web.put('/update',checkAuth,userController.update);
     web.get('/cv',checkAuth,userController.cv);
     web.get('/search/:query',userController.search);
      web.post('/photo',checkAuth,photoController.update);


    return web;
}