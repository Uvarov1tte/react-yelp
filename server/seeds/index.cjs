// can run on its own whenever we need see/ randomsize the DB
const mongoose = require('mongoose');
const cities = require('./cities.cjs')
const { places, descriptors } = require('./seedHelpers.cjs')
const Campground = require('../models/campground.cjs');

mongoose.connect('mongodb://localhost:27017/yelp-camp-react');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const imageSample = [
    "https://res.cloudinary.com/dutixedzl/image/upload/v1727016003/Yelp-Camp-React/kerensa-pickett-LKQGNBZAWU8-unsplash_dlmxrp.jpg",
    "https://res.cloudinary.com/dutixedzl/image/upload/v1727016093/Yelp-Camp-React/karl-hedin-TqzpsSqyy4I-unsplash_qrpuh5.jpg",
    "https://res.cloudinary.com/dutixedzl/image/upload/v1727016001/Yelp-Camp-React/julian-bialowas-ilkTnuMunP8-unsplash_ufvrxl.jpg",
    "https://res.cloudinary.com/dutixedzl/image/upload/v1727015999/Yelp-Camp-React/fabian-moller-sGReLsWGfC0-unsplash_tj1vxy.jpg",
    "https://res.cloudinary.com/dutixedzl/image/upload/v1727015839/Yelp-Camp-React/2.another_tree_vzalsq.png"
]

const seedDB = async () => {
    await Campground.deleteMany({})
    // const c = new Campground({ title: 'purple field' });
    // await c.save();
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        // temp price
        const price = Math.floor(Math.random() * 20) + 10
        const randomImage1 = Math.floor(Math.random() * 5)
        let randomImage2 = Math.floor(Math.random() * 5)
        while (randomImage1 == randomImage2) {
            randomImage2 = Math.floor(Math.random() * 5)
        }
        const camp = new Campground({
            // YOUR USER ID
            // author: '6614fd296484998d2b1ad626',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            // random location
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vero illum assumenda optio corporis alias deleniti! Odio assumenda, voluptas ipsum minima veniam fugiat atque amet perspiciatis at debitis rerum nulla!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            image: [
                {
                    url: imageSample[randomImage1],
                    filename: 'YelpCamp/p5z3zcpuaih0fkrhymfw',
                },
                {
                    url: imageSample[randomImage2],
                    filename: 'YelpCamp/tpsnvmlpzucljblo77iv',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});