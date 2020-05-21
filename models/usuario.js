const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nome:{
        type: String,
    
    },
    
    nivel:{
        type:Number,
        default:1
    },

    senha:{
        type:String,
      
    }
})
mongoose.model("usuarios",Usuario)