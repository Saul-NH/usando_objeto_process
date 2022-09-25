import path from 'path';
import { SESSION_CONFIG } from './config.js';
const __dirname = path.resolve(path.dirname(''));


import express from 'express';
import socket from './utils/socket.js';
import session from 'express-session';

//DB connection
import db from './database/dbConection.js'

//Routers
import messagesRouter from './routes/messages.routes.js';
import productsRouter from './routes/products.routes.js';
import productsTestRouter from './routes/productsTest.routes.js';
import authRoutes from './routes/auth.routes.js'


//Middlewares
import passport,{isAuthenticated} from './utils/passport.js'


const app = express();


//Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use('/public', express.static( path.join( __dirname, '/public') ) );

app.use(session(SESSION_CONFIG));

app.use(passport.initialize());
app.use(passport.session());




//Routes
app.use('/auth',                authRoutes);
app.use('/api/messages',        messagesRouter);
app.use('/api/products',        productsRouter);
app.use('/api/products-test',   productsTestRouter);

app.get('/', isAuthenticated, (req, res) => {
    const username = req.user.username;
    res.render('index', { username });
});



//Socket server
const server = socket(app);

export default server;
