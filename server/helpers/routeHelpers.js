const Joi = require('joi')

module.exports = {
    validateBody: (schema) =>{
        
        return(req, res, next ) => {
            
            const result = Joi.validate(req.body, schema)
            console.log(result)
            if(result.error){
                return res.status(400).json(result.error)
            }

            if(!req.value) { req.value = {} }
            req.value['body'] = result.value
            next()
        }
    },

    schemas:{
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),

        prodSchema: Joi.object().keys({
            nome: Joi.string().required(),
            tipo: Joi.string().required(),
            preco: Joi.number().required(),
            image: Joi.string()
        }),

        bidSchema: Joi.object().keys({
            lance: Joi.number().required()
        })
    }
}