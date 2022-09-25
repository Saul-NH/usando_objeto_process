import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import User from '../database/models/users.model.js';

const localOpts = {
    usernameField: 'email',
};

passport.use(
    new LocalStrategy(localOpts, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            } else {
                const passwordIsValid = user.checkPassword(password);

                if (passwordIsValid) {
                    return done(null, user);
                } else {
                    done(null, false, { message: 'Invalid credentials' });
                }
            }
        } catch (error) {
            done(error, false);
        }
    })
);

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
};

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);

        if (user) {
            done(null, user);
        }
    } catch (error) {
        console.log('passport.js error');
        done(error, false);
    }
});

export default passport;
