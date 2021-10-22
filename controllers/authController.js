const mongoose = require('mongoose');

const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {


    // leer los datos del usuario y colocarlos en User
    const usuario = new User(req.body);
    try {
        await usuario.save();
        res.status(200).json({msg : 'Usuario Creado Correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : 'Hubo un error'});
    }
    
}

exports.login = async (req, res, next) => {
    // buscar el usuario

  
    const { email, password } = req.body;

  

    const usuario = await User.findOne({ email });


    if(!usuario) {
        // Si el usuario no existe
        await res.status(401).json({msg : 'Ese usuario no existe'});
        next();
    } else {

        result =usuario.compararPassword(password);
   
        // El usuario existe, verificar si el password es correcto o incorrecto
        if(!result) {
            // si el password es incorrecto
            await res.status(401).json({ msg : 'Password Incorrecto'});
            next();
        } else {
            // password correcto, firmar el token
            const token = jwt.sign({
                email : usuario.email, 
                nombre: usuario.nombre, 
                id : usuario._id
            }, 
            'LLAVESECRETA', 
            {
                expiresIn : '2h'
            }); 

            // retornar el TOKEN
            res.json({ token });
        }


    }
}


exports.changePassword = async (req,res)=>{
  const {user} = req;

  const {password,password_new} = req.body;
  result =user.compararPassword(password);

  if(result){
      user.password= password_new;
      await user.save();
      res.json({msg:'exito'});
  }
  else{
    res.status(400).json({msg:'La contraseña no es valida'});
  }
   


}