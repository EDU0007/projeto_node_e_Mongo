const localStrategy = require('passport-local').Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


require("../models/usuario")
const Usuario = mongoose.model("usuarios")



module.exports = function(passport){

    passport.use( new localStrategy({usernameField:"nome",passwordField:"senha"},(nome,senha,done)=>{

        Usuario.findOne({nome:nome}).then((usuario)=>{

            if(!usuario){
                    return done(null,false,{message:"esta conta não existe"})
            }

            bcrypt.compare(senha,usuario.senha,(erro,batem)=>{
                if(batem){
                    return done(null,usuario)
                }else{
                    
                    return done(null,false,{message:"senha incorreta"})
                }
            })
        })

    }))
    passport.serializeUser((usuario,done)=>{
        done(null,usuario.id)
    })

    passport.deserializeUser((id,done)=>{
        Usuario.findById(id,(err,usuario)=>{
            done(err,usuario)

        })
    })


}