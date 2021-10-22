const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');
require('dotenv').config({ path : 'variables.env'});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }, 
   
    photo: {
        required:false,
        type:String
    },
    sex: {
        required:false,
        type:String
    },
    web: {
        required:false,
        type:String
    },
    profesion: {
        required:false,
        type:String
    },
    phone: {
        required:false,
        type:String
    },
    about: {
        required:false,
        type:String
    },
    skills: [String],
    experience: [{
        institution: String,
        job: String,
        start : String ,//deberia ser date pero si no se acuerda asi permite cualquier valor
        end : String,
    }],
    studies: [{
        institution: String,
        study: String,
        start : String,
        end : String,
    }],
});

// Método para hashear los passwords
userSchema.pre('save', async function(next) {
    // si el password ya esta hasheado
    if(!this.isModified('password')) {
        return next(); // deten la ejecución
    }
    // si no esta hasheado
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;

     
     
    next();
});

// Envia alerta cuando un usuario ya esta registrado
userSchema.post('save', function(error, doc, next) {
    
    if(error.name === 'MongoError' && error.code === 11000 ){
        next('Ese correo ya esta registrado');
    } else {
        next(error);
    }
});

// Autenticar Usuarios
userSchema.methods = {
    compararPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    },
   
}


module.exports = mongoose.model('User', userSchema);