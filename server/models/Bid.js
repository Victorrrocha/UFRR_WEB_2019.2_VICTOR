const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BidSchema = new Schema({
    lance: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean
    },
    ProdNome:{
        type: String
    },
    prodID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Bid', BidSchema)