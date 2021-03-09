//local strategy
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

//done - fucnction called when we are done using the user
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user === null) {
            return done(null, false, { message: 'No user with that email' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)

            } else {
                return done(null, false, { message: 'Password incorrect' })

            }
        } catch (e) {
            return done(e)

        }
    }
    //local strategy
    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id)) //to store user during the sessuion
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })

}
module.exports = initialize