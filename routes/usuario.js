const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")


router.get("/registro",(req,res)=>{
        res.render("usuarios/registro")
})

router.post("/registro",(req,res)=>{
     //   res.render("usuarios/registro")
        const novoUsuario = {
                nome: req.body.nome,
                senha: req.body.senha
            }
            bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(novoUsuario.senha,salt,(err,hash)=>{
                        if(err){
                                req.flash("error_msg","houve um erro")
                                res.redirect("/")
                        }
                        novoUsuario.senha = hash

                        new Usuario(novoUsuario).save().then(() => {
                                res.redirect("/admin/categorias")
                                console.log("passou!!")
                            }).catch((err) => {
                                req.flash("error_msg", "houve um erro ao salvar dados")
                                res.redirect("/admin")
                        })

                    })

            })
        
        
})

router.get("/login",(req,res)=>{
        res.render("usuarios/login")
    
})

    router.post("/login",(req,res,next)=>{
   
        passport.authenticate("local",{
                successRedirect:"/",
                failureRedirect:"/usuarios/login",
                failureFlash:true    
        })(req,res,next)
})
router.get("/logout",(req,res)=>{
        req.logout()
        res.redirect("/")
})


module.exports = router;