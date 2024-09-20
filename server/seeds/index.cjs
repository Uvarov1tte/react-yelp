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

const seedDB = async () => {
    await Campground.deleteMany({})
    // const c = new Campground({ title: 'purple field' });
    // await c.save();
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        // temp price
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            // YOUR USER ID
            author: '6614fd296484998d2b1ad626',
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
                    url: 'https://res.cloudinary.com/dutixedzl/image/upload/v1714556571/YelpCamp/tpsnvmlpzucljblo77iv.jpg',
                    filename: 'YelpCamp/tpsnvmlpzucljblo77iv',
                },
                {
                    url: 'https://res.cloudinary.com/dutixedzl/image/upload/v1714556571/YelpCamp/p5z3zcpuaih0fkrhymfw.jpg',
                    filename: 'YelpCamp/p5z3zcpuaih0fkrhymfw',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});