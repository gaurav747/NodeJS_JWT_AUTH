require('dotenv').config()

const config = {
    app: {
        port: process.env.SERVER_PORT,
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
    }
};

module.exports = config;