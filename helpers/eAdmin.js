module.exports = {
    eAdmin: function(req,res,next){
        if(req.isAuthenticated()){
         return next();

        }
        req.flash("error_msg","vode deve esta logado para entrar aqui")
        res.redirect("/")
    }
}