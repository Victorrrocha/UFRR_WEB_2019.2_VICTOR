const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    nome:{
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    data:{
        type: Date
    },
    tipo:{
        type: String,
        required: true
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Product', ProductSchema)