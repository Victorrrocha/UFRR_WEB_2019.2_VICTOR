const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const FacebookTokenStrategy = require('passport-facebook-token')
const {JWT_SECRET, oauth } = require('./configuration/index')
const User = require('./models/User')

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // find the user specified in token
          const user = await User.findById(payload.sub)
        //if user doesn't exist, handle it
        if(!user){
            return done(null, false)
        }
        //otherwise, return the user
        done(null, user)
    } catch(error) {
        done( error, false )
    }
}));

//GOOGLE AUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: oauth.google.clientID,
    clientSecret: oauth.google.clientSecret
}, async (accessToken, refreshToken, profile, done)=>{

    try{
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        console.log('profile', profile)
        //Check whether ig this user exists in out db
        const existingUser = await User.findOne({"google.id": profile.id})
        if(existingUser){
            console.log('User already exists')
            return done(null, existingUser)
        }

        console.log('new user detected, creating new document')
        //if there isn't, create it
        const newUser = new User({
            method: 'google',
            google:{
                id: profile.id,
                email: profile.emails[0].value
            }
        })
        await newUser.save()
        done(null, newUser)
    } catch{
        done(error, false, error.message)
    }

}))

//FACEBOOK STRATEGY
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: oauth.facebook.clientID,
    clientSecret: oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try{   
        console.log('profile', profile)
        console.log('access Token', accessToken)
        console.log('refresh Token', refreshToken)

        const existingUser = await User.findOne({"facebook.id": profile.id})
        if(existingUser){
            console.log("user already here")
            return done(null, existingUser)
        }

        console.log("new user detected, creating new document")

        const newUser = new User({
            method: 'facebook',
            facebook:{
                id: profile.id,
                email: profile.emails[0].value
            }
        })  
        await newUser.save()
        done(null, newUser)

    } catch{
        done(error, false, error.message)
    }
})
)

//LOCAL STRATEGY
passport.use('local', new LocalStrategy({
    //how you want to authorize
    usernameField: 'email'
}, async (email, password, done)=>{
    try{
        // find user given the email
        const user = await User.findOne({"local.email": email})
        //if not handle it
        if(!user) {
            return done(null, false)
        }
        //check if password is correct
        const isMatch = await user.isValidPassword(password)

        //if not, handle it
        if(!isMatch){
            return done(null, false)
        }
        //otherwise, return the user
        done(null, user)
    } catch(error) {
        done(error, false)
    }
    

}))