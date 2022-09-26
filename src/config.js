import MongoStore from 'connect-mongo';

import parseArgs from 'minimist';
const args = parseArgs(process.argv.slice(2), { default: { PORT: 8080 } });

import dotenv from 'dotenv';
dotenv.config();

export const PORT = args.PORT;

export const PERSISTENCE_TYPE = process.env.PERSISTENCE_TYPE || 'MEMORY';

export const MONGO_DB = {
    URL: process.env.MONGODB_URL,
    config: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};

export const SESSION_CONFIG = {
    store: MongoStore.create({
        mongoUrl: MONGO_DB.URL,
        advancedOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 1000 * 60,
        autoRemove: 'native',
    }),
    cookie: { maxAge: 1000 * 60, httpOnly: false },
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    rolling: true,
};
