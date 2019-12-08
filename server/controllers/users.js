const User = require('../models/User')
const Bid = require('../models/Bid')
const Product = require('../models/Product')

const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../configuration/index')

signToken = user => {
    return JWT.sign({
        iss: 'Raggle',
        sub: user.id,
        iat: new Date().getTime(), 
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET )
}

module.exports = {
    signUp: async(req, res, next) => {
        const {email, password } = req.value.body
        console.log(req.value.body) 
        //check if there is already a user present
        const foundUser = await User.findOne({'local.email': email}) 
        if(foundUser){
            return res.status(403).json({error: 'Email already being used'})  
        }

        const newUser = new User({
            method: 'local',
            local:{
                email : email,
                password : password
            }
        })
        await newUser.save()

        //generate token
        const token = signToken(newUser)

        res.status(200).json({token})
    },

    signIn: async(req, res, next) => {
        //generate tokens
        const token = signToken(req.user)
        console.log(req.user.local)
        res.status(200).json({token})
    },

    googleOAuth: async(req, res,next) =>{
        console.log('req.user', req.user)
        const token = signToken(req.user)
        res.status(200).json({token})
    },

    facebookOAuth: async(req, res, next) =>{
        console.log('req.user', req.user)
        const token =  signToken(req.user)
        res.status(200).json({token})
    },
    
    addnewproduct: async(req, res, next) => {
        const { email } = req.user.local
        const foundUser = await User.findOne({'local.email': email})
        console.log('user is :', foundUser)

        const { nome, preco, tipo, image } = req.value.body
        console.log('req.body: ', req.value.body)

        const newProduct = new Product({
            nome,
            preco,
            tipo,
            image,
            data: new Date,
            user: foundUser._id
        })

        const saved = await newProduct.save()

        if(saved){
            res.json({adding : "products" })
        }else{
            res.json({couldNotAdd : "products" })
        }
    },
    //Listagem dos produtos a venda pelo usuário 
    myproducts: async(req, res, next) => {
        const { email } =  req.user.local
        const foundUser = await User.findOne({'local.email': email})
        
        const products = await Product.find({user: foundUser})

        
        return res.status(200).json(products)
    },

    
    showProduct: async(req, res, next) => {
        const { email } =  req.user.local
        const foundUser = await User.findOne({'local.email': email})
        const userID = foundUser._id

        const { id } = req.params;
        const foundProd = await Product.findById({_id: id})

        console.log('UserId',userID)
        console.log('prodId-user', foundProd.user)
        if(userID.equals(foundProd.user)){
            console.log('THIS IS MY PRODUCT')
            //GET THE BID FOR THIS PRODUCT
            const bids = await Bid.find({ prodID: id})
            //console.log('OS LANCES DESSE', bids)
            return res.status(200).json({ response : [foundProd, bids] })
        }else{
            //console.log('THIS IS SOMEONE ELSE\'S')
            return res.status(200).json({ response : [foundProd, [] ] })
        }

    },

    deleteProduct: async(req, res, next) => {
        const { id } = req.params;
        const foundProd = await Product.deleteOne({_id: id })
        //console.log(foundProd)
        res.json({deleting: "a product"})
    },

    myproductsTipos: async(req, res, next) =>{
        const { tipo } = req.params
        const findByTipo = await Product.find({tipo: tipo})
        //console.log(findByTipo)
        return res.status(200).json(findByTipo)
    },

    //we need ObjectID and UserID
    makeBid: async(req, res, next) => {
        const { email } =  req.user.local
        const foundUser = await User.findOne({'local.email': email})
        const { prodID, lance, nome } = req.params
        
        const newBid = new Bid({
            lance,
            ProdNome: nome,
            status: false,
            prodID,
            userID: foundUser._id
        })

        const saved = await newBid.save()

        if(saved){
            console.log(newBid)
        }
    },

    deleteProd: async (req, res, next) => {
        const { prodID } = req.params
        const deleting = await Product.deleteOne({ _id : prodID})
        deleting ? console.log('success') : console.log('failure')
    },

    myProductsBids: async (req, res, next) => {
        const { email } =  req.user.local
        const foundUser = await User.findOne({'local.email': email})
        
        const { id } = req.params;
        //checked user
    },

    meusLances: async (req, res, next) => {
        const { email } =  req.user.local
        const foundUser = await User.findOne({'local.email': email})

        const lances = await Bid.find({userID: foundUser._id})
        console.log(lances)
        return res.status(200).json(lances)
    },

    aceitarLance: async (req, res, next) => {
        const {prodID, userID} = req.params

        const acceptBid =await Bid.findOneAndUpdate({
            prodID,
            userID
        }, {status : true})

        console.log('updated file: ', acceptBid)
    }

}