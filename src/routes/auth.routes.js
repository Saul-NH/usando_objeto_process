import Router from 'express';
import passport from 'passport';
import { isAuthenticated } from '../utils/passport.js';
import User from '../database/models/users.model.js';
const router = Router();

router.get('/signup', (req, res) => {
    res.render('signup', {});
});
router.get('/failsignup', (req, res) => {
    const error = req.session.error;
    req.session.error = null;
    res.render('failsignup', { error });
});

router.post('/signup', async (req, res, next) => {
    try {
        let newUser = User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            req.session.error = 'User alredy  exists';
            return res.redirect('/auth/failsignup');
        }
        newUser = await newUser.save();

        req.logIn(newUser, (err) => {
            if (err) {
                next(err);
            }
            res.redirect('/');
        });
    } catch (error) {
        next(error);
    }
});

router.get('/login', (req, res) => {
    res.render('login', {});
});

router.get('/faillogin', (req, res) => {
    const error = req.session.error;
    req.session.error = null;
    res.render('faillogin', {error});
});

router.post('/login', (req, res, next) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.session.error = info.message;
                return res.redirect('/auth/faillogin');
            }
            req.logIn(user, (err) => {
                if (err) {
                    next(err);
                }
                res.redirect('/');
            });
        })(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    const username = req.user.username;
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.render('logout', { username });
    });
});

export default router;
