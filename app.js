require('dotenv').config();
// if use this, can get rid of using try catch blog everywhere
require('express-async-errors');
const express = require('express');
const app = express();

// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');

const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// import routes
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');


// import db
const connectDB = require('./db/connect')

// import middlewares
// because if there no route 404 will be triggered. therefore it comes ahead of errorHandler
const notFoundMiddleware = require('./middleware/not-found');
// this error handler invoke from successful request(exisisting route)
const errorHandlerMiddleware = require('./middleware/error-handler');

// security packages
app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60
}))
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

// middlewares
app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
    // console.log(req.cookies);
    console.log(req.signedCookies);
    res.send('Ecommerce API')
})


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/orders', orderRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000 || process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server started listening on ${port} `))
    } catch (error) {
        console.log(error);
    }
}
start();