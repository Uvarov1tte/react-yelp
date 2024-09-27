const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
//environment variable
//means if we running in development mode (not production), require dotenv package

const cors = require('cors');
//probably only development, fix later
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const ejsMate = require('ejs-mate');


const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError.cjs');
const methodOverride = require('method-override');
// to allow full CRUD

const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')

const User = require('./models/user.cjs');


const userRoutes = require('./routes/users.cjs')
const campgroundRoutes = require('./routes/campgrounds.cjs');
const reviewRoutes = require('./routes/reviews.cjs');
// const dbUrl = process.env.DB_URL
const dbUrl = 'mongodb://localhost:27017/yelp-camp-react'
const multer = require('multer')


mongoose.connect(dbUrl);
// https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
// => the following no longer necessary
// mongoose.connect('mongodb://localhost:27017/yelp-camp-react', {
//      useNewUrlParser: true,
//      useCreateIndex: true,
//      useUnifiedTopology: true,
// });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const app = express();


// app.engine('ejs', ejsMate);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
//*** */
// app.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // "*"
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
// });

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// see the request body
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(express.static(path.resolve(__dirname, "../dist")));
// app.use(express.static(path.resolve(__dirname, "..")));
// app.use(express.static("public"));
//serving static assets
app.use(mongoSanitize());
// sanitize, doesnt allow keys that contain dollar sign or period.

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret: 'thisshouldbeabettersecret!',
    touchAfter: 24 * 60 * 60

})

store.on("error", function (e) {
    console.log("Session store error", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        // will break, this cookie only work with https. local host is NOT.
        // cant log in
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://cdn.jsdelivr.net/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dutixedzl/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
//app.use(session...) should be before passport.session
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
//how do we store data in session
passport.deserializeUser(User.deserializeUser());


//middleware for flash, BEFORE routers
app.use("*", (req, res, next) => {
    // console.log(req.query)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

const campgrounds =
    [{
        title: "Roaring Hollow",
        image:
            [
                {
                    url: "https://res.cloudinary.com/dutixedzl/image/upload/v1714556571/YelpCamp/p5z3zcpuaih0fkrhymfw.jpg",
                    filename: "YelpCamp / tpsnvmlpzucljblo77iv",
                },
                {
                    url: "https://res.cloudinary.com/dutixedzl/image/upload/v1714556571/YelpCamp/tpsnvmlpzucljblo77iv.jpg",
                    filename: "YelpCamp/p5z3zcpuaih0fkrhymfw",
                }
            ],
        geometry:
        {
            type: "Point",
            coordinates: [-120.5058987, 46.6020711]
        },
        price: 26,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vero illum assumenda optio corporis alias deleniti! Odio assumenda, voluptas ipsum minima veniam fugiat atque amet perspiciatis at debitis rerum nulla!",
        location: "Yakima, Washington",
        reviews: [],
        __v: 0
    },
    {
        title: "Roaring Hollow 2",
        image:
            [

            ],
        geometry:
        {
            type: "Point",
            coordinates: [-120.5058987, 46.6020711]
        },
        price: 26,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vero illum assumenda optio corporis alias deleniti! Odio assumenda, voluptas ipsum minima veniam fugiat atque amet perspiciatis at debitis rerum nulla!",
        location: "Yakima, Washington",
        reviews: [],
        __v: 0
    }]

// app.get('/api/campgrounds', (req, res) => {

//     // const parsedCampground = JSON.parse(campground)
//     // res.send({ campgrounds });
// });


/////////////////////////////
// app.use('/', userRoutes)
app.use('/api/campgrounds', campgroundRoutes)
// app.use('/campgrounds/:id/reviews', reviewRoutes)
// //theres :id in the route, but we wont have access to id by default -> merge params:true (see headers (?) in routes->reviews)


// app.get('/', (req, res) => {
//     res.render('home')
// })
// //////////////////////////////
app.use('*', (req, res, next) => {
    // res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
    // res.sendFile(path.resolve(__dirname, "..", "index.html"));
});

app.all('*', (req, res, next) => {
    // for every single requests
    next(new ExpressError('Page Not Found', 404))
    // will only run if nothing else runs first
})

app.use('*', (err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!'
    // res.status(statusCode).render('error', { err });
    res.status(statusCode).send({ err })
})



app.listen(3000, () => {
    console.log('Serving on port 3000')
})
