const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Postagem")
const Postagem = mongoose.model("postagens")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get("/",(req, res) => {
    Postagem.find().populate("categoria").sort({ data: "desc" }).then((postagens) => {
        res.render("index", { postagens: postagens })
    }).catch((err) => {
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/404")
    })

})

router.get("/postagens/:slug",(req, res) => {
    Postagem.findOne({ slug: req.params.slug }).then((postagem) => {
        if (postagem) {
            res.render("postagem/index", { postagem: postagem })
        } else {
            req.flash("error_msg", "Houve um erro ")
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/")
    })

})
router.get("/categorias", (req, res) => {

    Categoria.find().then((categorias) => {
        res.render("categorias/index", { categorias: categorias })

    }).catch((erro) => {
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/")
    })
})

router.get("/categorias/:slug",(req, res) => {
    Categoria.findOne({ slug: req.params.slug }).then((categoria) => {
        if (categoria) {
            Postagem.find({ categoria: categoria._id }).then((postagens) => {
                res.render("categorias/postagens", { postagens: postagens, categoria: categoria})

            }).catch((err) => {
                req.flash("error_msg", "houve um erro ao listar")
                res.redirect("/")

            })

        } else {
            req.flash("error_msg", "esta categoria não existe")
            res.redirect("/")
        }

    }).catch((erro) => {
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/")
    })

})



module.exports = router;