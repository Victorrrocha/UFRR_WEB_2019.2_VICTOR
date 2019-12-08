const express = require('express')
const expressRouter = express.Router()
const router = require('express-promise-router')()
const passport = require('passport')
const passportConf = require('../passport')

const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users')

const passportGoogle = passport.authenticate('googleToken', { session: false })
const passportFacebook = passport.authenticate('facebookToken', { session: false })

router.route('/signup')
    .post( validateBody(schemas.authSchema), UsersController.signUp )

router.route('/signin')
    .post(validateBody(schemas.authSchema), passport.authenticate('local', {session: false}), UsersController.signIn)

router.route('/oauth/google')
    .post(passportGoogle, UsersController.googleOAuth)

router.route('/oauth/facebook')
    .post(passportFacebook, UsersController.facebookOAuth)

router.route('/myproducts')
    .get(passport.authenticate('jwt', {session: false}), UsersController.myproducts)

router.route('/myproducts/:id')
    .get(passport.authenticate('jwt', {session: false}) , UsersController.showProduct)

router.route('/myproducts/addnewproduct')
    .post(validateBody(schemas.prodSchema), passport.authenticate('jwt', {session: false}), UsersController.addnewproduct)

router.route('/products/:tipo')
    .get(UsersController.myproductsTipos)

router.route('/:prodID&:lance&:nome')
    .post(passport.authenticate('jwt', {session: false}), UsersController.makeBid)

router.route('/myproducts/delete/:prodID')
    .delete(passport.authenticate('jwt', {session: false}), UsersController.deleteProd)

router.route('/meuslances')
    .get(passport.authenticate('jwt', {session: false}), UsersController.meusLances)

//falta aceitar o lance
router.route('/aceitarlance/:prodID&:userID')
    .put(passport.authenticate('jwt', {session: false}), UsersController.aceitarLance)

    
module.exports = router 